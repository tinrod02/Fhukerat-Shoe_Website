// niketoh
const nikeImage = document.createElement('img');
nikeImage.src = 'img/NIKE.gif';
nikeImage.alt = 'NIKE';
nikeImage.style.padding = '17px';
nikeImage.style.marginTop = '10px';
nikeImage.style.width = '300px';
nikeImage.style.marginLeft = '-10px';
nikeImage.style.height = '220px';

const nikePlaceholder = document.querySelector('.nike-placeholder');
nikePlaceholder.appendChild(nikeImage);

// Function to toggle menu
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Slider functionality
let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {

    // Image viewer functionality itech
    document.querySelectorAll('.featured-image-1').forEach(image_1 => {
        image_1.addEventListener('click', () => {
            var src = image_1.getAttribute('src');
            document.querySelector('.big-image-1').src = src;
        });
    });

    document.querySelectorAll('.featured-image-2').forEach(image_2 => {
        image_2.addEventListener('click', () => {
            var src = image_2.getAttribute('src');
            document.querySelector('.big-image-2').src = src;
        });
    });

    document.querySelectorAll('.featured-image-3').forEach(image_3 => {
        image_3.addEventListener('click', () => {
            var src = image_3.getAttribute('src');
            document.querySelector('.big-image-3').src = src;
        });
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-share')) {
            event.preventDefault();

            let shareBtn = event.target;
            if (navigator.share) {
                try {
                    navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                    console.log('Shared successfully');
                } catch (error) {
                    console.error('Error sharing:', error);
                }
            } else {
                shareCustom();
            }
        }
    });

    // Share function
    function shareCustom() {
        const title = document.title;
        const url = window.location.href;

        alert(`Share ${title} via custom method: ${url}`);
    }

    // Function to toggle visibility of shoes section
    function toggleShoesVisibility(button) {
        var box = button.closest('.box');

        if (box) {
            box.classList.add('flashlight');

            setTimeout(function () {
                box.classList.remove('flashlight');
            }, 1000);

            box.classList.toggle('grayscale');
        }
    }

    // Eye buttons
    document.querySelectorAll('.fa-eye').forEach(button => {
        button.addEventListener('click', function () {
            toggleShoesVisibility(this);
        });
    });

});

// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add item to cart
function addToCart(itemName, itemImage, itemPrice) {
    const item = {
        name: itemName,
        image: itemImage,
        price: itemPrice
    };
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartTab();
    updateCartIcon();
}

// Function to update the cart icon
function updateCartIcon() {
    const cartButton = document.getElementById('cartButton');
    if (cartItems.length > 0) {
        cartButton.innerHTML = `<i class="fa fa-shopping-cart"></i> (${cartItems.length})`;
    } else {
        cartButton.innerHTML = `<i class="fa fa-shopping-cart"></i>`;
    }
}

// Function to update the cart tab display
function updateCartTab() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">₱${item.price}</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Event listener for "add to cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const itemName = this.parentElement.querySelector('h3').textContent;
        const itemImage = this.parentElement.nextElementSibling.querySelector('.shoe').getAttribute('src');
        const itemPrice = parseFloat(this.parentElement.nextElementSibling.querySelector('.price span').textContent.replace('₱', '').replace(',', '')); 
        addToCart(itemName, itemImage, itemPrice);
    });
});

// Event listener to show/hide cart tab (if needed)
document.getElementById('cartButton').addEventListener('click', function (event) {
    event.preventDefault();
    const cartTab = document.querySelector('.cart-tab');
    cartTab.classList.toggle('show');
});

// Event listener to close cart tab (if needed)
document.querySelector('.close-tab').addEventListener('click', function () {
    document.querySelector('.cart-tab').classList.remove('show');
});

updateCartIcon();

// Function to handle checkout
function checkout() {
    console.log('Checkout clicked');
    console.log('Items in cart:', cartItems);
    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartTab();
    updateCartIcon();

    alert('Checkout successful! Your items have been processed.');
}

// Array to hold favorite shoes
let favoriteShoes = JSON.parse(localStorage.getItem('favoriteShoes')) || [];

// Function to toggle favorite status of a shoe
function toggleFavorite(button) {
    button.classList.toggle('active');
    var shoeBox = button.closest('.box');
    var shoeName = shoeBox.querySelector('h3').textContent;
    var shoeImage = shoeBox.querySelector('img').src;

    if (button.classList.contains('active')) {
        if (!favoriteShoes.some(shoe => shoe.name === shoeName)) {
            favoriteShoes.push({ name: shoeName, image: shoeImage });
            localStorage.setItem('favoriteShoes', JSON.stringify(favoriteShoes));
            addToFavoritesList(shoeName, shoeImage);
        }
    } else {
        favoriteShoes = favoriteShoes.filter(shoe => shoe.name !== shoeName);
        localStorage.setItem('favoriteShoes', JSON.stringify(favoriteShoes));
        removeFromFavoritesList(shoeName);
    }
}

// Function to add shoe to favorites list
function addToFavoritesList(name, image) {
    var favoritesList = document.getElementById('favoriteItems');
    var shoeElement = document.createElement('div');
    shoeElement.classList.add('favorite-item');
    shoeElement.innerHTML = `
        <img src="${image}" alt="${name}">
        <p>${name}</p>
    `;
    favoritesList.appendChild(shoeElement);
}

// Function to remove shoe from favorites list
function removeFromFavoritesList(name) {
    var favoritesList = document.getElementById('favoriteItems');
    var shoes = favoritesList.getElementsByClassName('favorite-item');
    for (var i = 0; i < shoes.length; i++) {
        var shoeName = shoes[i].querySelector('p').textContent;
        if (shoeName === name) {
            favoritesList.removeChild(shoes[i]);
            break;
        }
    }
}

// Event listener for "add to favorites" buttons
document.querySelectorAll('.add-to-favorites-btn').forEach(button => {
    button.addEventListener('click', function () {
        toggleFavorite(this);
    });
});

// Function to show/hide favorites tab
function toggleFavoritesTab() {
    var favoritesTab = document.getElementById('favoritesTab');
    favoritesTab.classList.toggle('show');
}

updateCartIcon();

function checkout() {
    console.log('Checkout clicked');
    console.log('Items in cart:', cartItems);

    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartTab();
    updateCartIcon();

    alert('Checkout successful!');
}

// Function to handle form submission
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('emailInput').value;

    alert('Thank you! Your email (' + email + ') has been saved.');

    document.getElementById('emailForm').reset();
});
