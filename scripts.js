document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');

    function updateCart() {
        cartItems.innerHTML = ''; // Clear current cart items
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function addToCart(product) {
        const productId = product.dataset.productId;
        const productName = product.dataset.productName;
        const productPrice = parseFloat(product.dataset.productPrice);

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            addToCart(product);
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const cartDetails = cart.map(item => `${item.name} - $${item.price} x ${item.quantity}`).join('\n');
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

        alert(`Your order:\n${cartDetails}\nTotal: $${total}\n\nThank you for your purchase!`);
        cart.length = 0; // Clear cart
        updateCart();
    });
});
