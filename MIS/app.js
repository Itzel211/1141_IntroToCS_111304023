// js/app.js
// 載入 sample data, render product grid, 支援簡單搜尋 + 點擊開啟 product.html (使用 query string id)

async function loadData(){
  const res = await fetch('data/sample-data.json');
  const db = await res.json();
  return db;
}

function createCard(prod){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${prod.image || 'images/placeholder.png'}" alt="${prod.name}">
    <h4>${prod.name}</h4>
    <p>${prod.merchantName} · 評價 ${prod.merchantRating || '—'}</p>
    <div class="price">
      <span>$${prod.price.toFixed(2)}</span>
      <a class="btn" href="product.html?id=${prod.id}">查看</a>
    </div>
  `;
  return div;
}

function renderGrid(products){
  const grid = document.getElementById('productGrid') || document.getElementById('merchantProducts');
  if(!grid) return;
  grid.innerHTML = '';
  products.forEach(p => grid.appendChild(createCard(p)));
}

// show product detail when on product.html
async function renderProductDetail(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return;
  const db = await loadData();
  const prod = db.products.find(p => p.id === id);
  if(!prod){ document.getElementById('productDetail').innerText = '找不到商品'; return; }
  const detail = document.getElementById('productDetail');
  detail.innerHTML = `
    <div class="hero-img"><img src="${prod.image}" alt="${prod.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px"></div>
    <div class="product-meta">
      <h2>${prod.name}</h2>
      <p>${prod.description}</p>
      <p style="margin-top:14px;">商家： <a href="merchant.html?id=${prod.merchantId}" style="color:var(--neon)">${prod.merchantName}</a></p>
      <p class="price" style="margin-top:18px"><strong>$${prod.price.toFixed(2)}</strong>
        <button id="buyBtn" class="btn">下單</button>
      </p>
    </div>
  `;

  document.getElementById('buyBtn').addEventListener('click', () => {
    alert('模擬下單成功 — 這裡可以串接付款 API 或顯示付款流程');
  });
}

// merchant page
async function renderMerchant(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return;
  const db = await loadData();
  const merchant = db.merchants.find(m => m.id === id);
  if(!merchant){ document.getElementById('merchantInfo').innerText = '找不到商家'; return;}
  document.getElementById('merchantInfo').innerHTML = `
    <h2 style="color:var(--neon)">${merchant.name}</h2>
    <p style="color:var(--muted)">評價：${merchant.rating} · 商家 ID：${merchant.id}</p>
    <p style="margin-top:12px;color:var(--muted)">${merchant.description}</p>
  `;
  const prods = db.products.filter(p => p.merchantId === id);
  renderGrid(prods);
}

// init on index.html
async function initIndex(){
  const db = await loadData();
  renderGrid(db.products);

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    const q = (searchInput.value || '').toLowerCase().trim();
    const results = db.products.filter(p => p.name.toLowerCase().includes(q) || p.merchantName.toLowerCase().includes(q));
    renderGrid(results);
  });

  // modal
  const modal = document.getElementById('modal');
  const loginBtn = document.getElementById('loginBtn');
  const closeModal = document.getElementById('closeModal');
  loginBtn && loginBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModal && closeModal.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('authForm')?.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('模擬登入成功（不會真的傳到後端）');
    modal.classList.add('hidden');
  });
}

// auto-run appropriate renderer depending on page
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('productGrid')) initIndex();
  if(document.getElementById('productDetail')) renderProductDetail();
  if(document.getElementById('merchantInfo')) renderMerchant();
});
