// public/main.js
async function addToCart(productId) {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: productId })
  });

  const result = await res.json();
  if (result.success) {
    updateCart(result.cart);
    showToast(`Added to cart!`, 'success');
  } else {
    showToast('Failed: ' + result.message, 'error');
  }
}

function updateCart(cart) {
  const cartList = document.getElementById('cart-list');
  const emptyMsg = document.getElementById('empty-msg');
  const footer   = document.getElementById('cart-footer');
  const totalEl  = document.getElementById('cart-total');

  cartList.innerHTML = '';

  if (cart.length === 0) {
    const li = document.createElement('li');
    li.id = 'empty-msg';
    li.className = 'cart-empty';
    li.textContent = 'Your cart is empty';
    cartList.appendChild(li);
    footer.style.display = 'none';
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="item-name">${item.name}</span><span class="item-price">$${item.price}</span>`;
    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = '$' + total.toLocaleString();
  footer.style.display = 'flex';
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
  