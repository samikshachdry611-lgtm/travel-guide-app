// --- 1. Tab Switching Logic ---
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
  });
});

// --- 2. Destination Search Simulation ---
const searchBtn = document.getElementById("search-btn");
const citySearch = document.getElementById("city-search");
const destName = document.getElementById("dest-name");
const destDesc = document.getElementById("dest-desc");
const destImg = document.getElementById("dest-img");

const cities = {
  tokyo: {
    name: "Tokyo, Japan",
    desc: "A neon-lit metropolis blending ultramodern technology with ancient shrines.",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
  },
  paris: {
    name: "Paris, France",
    desc: "The global capital of art, fashion, gastronomy, and culture.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
  },
  goa: {
    name: "Goa, India",
    desc: "Sun-drenched beaches, Portuguese heritage, and vibrant coastal nightlife.",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
  },
  delhi: {
    name: "New Delhi, India",
    desc: "The vibrant capital blending ancient history with bustling modern energy.",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
  }
};

searchBtn.addEventListener("click", () => {
  const query = citySearch.value.trim().toLowerCase();
  if (cities[query]) {
    destName.textContent = cities[query].name;
    destDesc.textContent = cities[query].desc;
    destImg.src = cities[query].img;
    citySearch.value = "";
  } else {
    alert("City preview not found. Try searching: Tokyo, Paris, Goa, or Delhi");
  }
});

// --- 3. Packing Checklist with LocalStorage ---
const packingForm = document.getElementById("packing-form");
const packInput = document.getElementById("pack-input");
const packingList = document.getElementById("packing-list");

let items = JSON.parse(localStorage.getItem("voyage_packing")) || [
  { id: 1, text: "Passport & Visas", checked: true },
  { id: 2, text: "Universal Power Adapter", checked: false },
  { id: 3, text: "Noise-cancelling Headphones", checked: false }
];

function renderPacking() {
  packingList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.checked) li.classList.add("checked");

    const span = document.createElement("span");
    span.textContent = item.text;
    span.style.cursor = "pointer";
    span.onclick = () => {
      items[index].checked = !items[index].checked;
      saveAndRenderPacking();
    };

    const del = document.createElement("button");
    del.className = "del-btn";
    del.textContent = "✕";
    del.onclick = () => {
      items.splice(index, 1);
      saveAndRenderPacking();
    };

    li.append(span, del);
    packingList.appendChild(li);
  });
}

function saveAndRenderPacking() {
  localStorage.setItem("voyage_packing", JSON.stringify(items));
  renderPacking();
}

packingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  items.push({ id: Date.now(), text: packInput.value.trim(), checked: false });
  packInput.value = "";
  saveAndRenderPacking();
});

renderPacking();