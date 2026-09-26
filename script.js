const products = [
  {
    id: 1,
    name: 'AeroFlex Pro Tee',
    category: 'Performance top',
    price: 49,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Core Motion Legging',
    category: 'Training',
    price: 69,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'LiftMax Hoodie',
    category: 'Warm-up',
    price: 89,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Velocity Shorts',
    category: 'Run',
    price: 54,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Peak Drive Bra',
    category: 'Support',
    price: 46,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Summit Zip Jacket',
    category: 'Outerwear',
    price: 128,
    rating: 5.0,
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Flexform Tank',
    category: 'Essentials',
    price: 39,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Pulse Recovery Set',
    category: 'Recovery',
    price: 99,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
  },
];

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartPanel = document.getElementById('cartPanel');
const subtotalEl = document.getElementById('subtotal');
const closeCartBtn = document.getElementById('closeCart');
const cartButton = document.querySelector('.cart-btn');

let cart = [];

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-meta">
            <div class="product-top">
              <div>
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
              </div>
              <span class="rating">★ ${product.rating}</span>
            </div>
            <div class="product-bottom">
              <span class="price">${formatPrice(product.price)}</span>
              <button class="add-btn" type="button" data-id="${product.id}">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  cartPanel.classList.add('open');
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = String(totalItems);
  subtotalEl.textContent = formatPrice(subtotal);

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <span>${item.quantity} × ${formatPrice(item.price)}</span>
          </div>
          <button type="button" data-id="${item.id}">Remove</button>
        </div>
      `
    )
    .join('');

  cartItems.querySelectorAll('button[data-id]').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.id)));
  });
}

cartButton.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

closeCartBtn.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

renderProducts();
updateCart();
