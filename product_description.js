import { items } from "./products.js";
const productId = sessionStorage.getItem("selectedProductId");
const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dots = document.querySelectorAll("#dots button");
const rating = document.getElementById("rating");
let currentIndex = 0;

if (productId) {
	// Fetch or filter the product data using the productId
	const selectedProduct = items.find((item) => item.id == productId);
	console.log(selectedProduct);
	if (selectedProduct) {
		// Render the selected product's data (images, details, etc.)
		displayProductDetails(selectedProduct);
	}
}

function displayProductDetails(product) {
	carousel.innerHTML = ""; // Clear previous items
	const imageArray = Object.values(product.images); // Converts to an array
	for (let i = 0; i < imageArray.length; i++) {
		const image = document.createElement("img");
		image.src = imageArray[i]; // Use the current image URL
		image.className = "w-96 object-cover flex-shrink-0 mt-2 customcss";
		carousel.appendChild(image); // Append the image to the carousel
	}

	const web_product_name = document.createElement("h1");
	web_product_name.innerText = product.title;
	web_product_name.className = "py-2 hidden xl:block font-bold text-3xl";
	rating.appendChild(web_product_name);
	for (let i = 0; i < product.rating.rate; i++) {
		const stars = document.createElement("i");
		stars.className = "fa-solid fa-star text-orange-500";
		rating.appendChild(stars);
	}

	const order = document.createElement("span");
	order.innerText = product.rating.count + " sold";
	order.className = "px-5 text-gray-500 ";
	rating.appendChild(order);

	const product_name = document.createElement("h1");
	product_name.innerText = product.title;
	product_name.className = "py-3 xl:hidden";
	rating.appendChild(product_name);

	const price = document.createElement("span");
	price.innerText = "$" + product.price + " (50-100 pcs)";
	price.className = "py-3 xl:hidden";
	rating.appendChild(price);

	const web_price_div = document.createElement("div");
	web_price_div.className =
		"hidden py-3 xl:flex bg-red-100 px-2 rounded-lg mt-2";
	web_price_div.id = "web_price_div";
	rating.appendChild(web_price_div);

	const find_web_price_div = document.getElementById("web_price_div");

	const web_price1 = document.createElement("span");
	web_price1.innerText = "$" + product.price + " (50-100 pcs)";
	web_price1.className =
		"hidden py-3 xl:flex text-red-600 font-bold border-r-2 border-slate-300 pr-14 ";
	find_web_price_div.appendChild(web_price1);

	const web_price2 = document.createElement("span");
	web_price2.innerText = "$" + product.price + " (50-100 pcs)";
	web_price2.className =
		"hidden py-3 xl:flex border-r-2 border-slate-300 pr-14 pl-2";
	find_web_price_div.appendChild(web_price2);

	const web_price3 = document.createElement("span");
	web_price3.innerText = "$" + product.price + " (50-100 pcs)";
	web_price3.className = "hidden py-3 xl:flex pl-2";
	find_web_price_div.appendChild(web_price3);

	const inquiry_btn = document.createElement("button");
	inquiry_btn.innerText = "Send inquiry";
	inquiry_btn.className =
		" mt-4 rounded-lg py-3 w-full text-white bg-blue-500 xl:hidden";
	rating.appendChild(inquiry_btn);

	const condition = document.createElement("h1");
	condition.innerText = "Condition: " + product.condition;
	condition.className = " mt-7 text-xl xl:py-2";
	rating.appendChild(condition);

	const matterial = document.createElement("h1");
	matterial.innerText = "Material: " + product.matterial;
	matterial.className = "text-xl xl:py-2";
	rating.appendChild(matterial);

	const category = document.createElement("h1");
	category.innerText = "Category: " + product.category;
	category.className = "text-xl xl:py-2";
	rating.appendChild(category);

	const item_num = document.createElement("h1");
	item_num.innerText = "Item Number: " + product.id;
	item_num.className = "text-xl mb-4 xl:py-2";
	rating.appendChild(item_num);

	const description = document.createElement("span");
	description.innerText = product.description;
	description.className = "text-lg xl:hidden";
	rating.appendChild(description);
}

// Update carousel position
function updateCarousel() {
	const width = carousel.offsetWidth;
	carousel.style.transform = `translateX(-${currentIndex * width}px)`;

	// Update dots
	dots.forEach((dot, index) => {
		dot.classList.remove("bg-gray-800");
		if (index === currentIndex) {
			dot.classList.add("bg-gray-800");
		}
	});
}

// Next Slide
nextButton.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % dots.length;
	updateCarousel();
});

// Previous Slide
prevButton.addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + dots.length) % dots.length;
	updateCarousel();
});

// Dot Navigation
dots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		currentIndex = index;
		updateCarousel();
	});
});
window.addEventListener("resize", updateCarousel);

window.showTab = function (event, tabId) {
	// Hide all tab contents
	document.querySelectorAll(".tab-pane").forEach((pane) => {
		pane.classList.add("hidden");
	});

	// Remove active styles from all tab buttons
	document.querySelectorAll(".tab-btn").forEach((btn) => {
		btn.classList.remove("text-blue-500", "border-blue-500");
		btn.classList.add("text-gray-500", "border-transparent");
	});

	// Show the selected tab content
	document.getElementById(tabId).classList.remove("hidden");

	// Add active styles to the clicked button
	event.currentTarget.classList.add("text-blue-500", "border-blue-500");
	event.currentTarget.classList.remove("text-gray-500", "border-transparent");
};
