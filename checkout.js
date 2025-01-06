import { items } from "./products.js";
const storedCart = localStorage.getItem("cart");
let cart_items = [];
const placeorder = document.getElementById("placeorder");
const placeorder_mobile = document.getElementById("placeorder_mobile");

placeorder_mobile.onclick = () => {
	if (cart_items.length == 0) {
		alert("Your cart is empty plz add items in cart");
		window.location.href = "product_listing_page.html";
	} else {
		alert("Your order has been received");
		removeAllProducts();
		window.location.href = "index.html";
	}
};

placeorder.onclick = () => {
	if (cart_items.length == 0) {
		alert("Your cart is empty plz add items in cart");
		window.location.href = "product_listing_page.html";
	} else {
		alert("Your order has been received");
		removeAllProducts();
		window.location.href = "index.html";
	}
};

const removeAllProducts = () => {
	while (cart_items.length) {
		cart_items.pop();
		saveCartToStorage();
	}
	location.reload();
};

//moving cart items if present form local storage to cart_items array
if (storedCart) {
	cart_items = JSON.parse(storedCart); // Parse the JSON string into an array
}

function displayCheckoutItems() {
	const web_cart_items = document.getElementById("web_cart_items");
	web_cart_items.innerHTML = "";
	let subtotal_price = 0;
	if (cart_items.length == 0) {
		const noProduct_div = document.createElement("div");
		const h1 = document.createElement("h1");
		h1.innerText = "We're sorry. We cannot find any items in cart.";
		h1.className = "text-2xl font-semibold";
		noProduct_div.appendChild(h1);
		web_cart_items.appendChild(noProduct_div);
		return;
	}
	for (let i = 0; i < cart_items.length; i++) {
		const selectedProduct = items.find(
			(item) => item.id == cart_items[i].product_id
		);
		const container_div = document.createElement("div");
		container_div.className = "flex";
		web_cart_items.appendChild(container_div);

		const image = document.createElement("img");
		image.src = selectedProduct.image;
		image.className = "h-56 w-auto";
		container_div.appendChild(image);

		const details_div = document.createElement("div");
		details_div.className = "px-2";
		container_div.appendChild(details_div);

		const price = document.createElement("h1");
		price.innerText = "$" + selectedProduct.price;
		price.className = "font-bold text-lg";
		details_div.appendChild(price);

		const title = document.createElement("h1");
		title.innerText = selectedProduct.title;
		title.className = "font-semibold text-lg";
		details_div.appendChild(title);

		const quantity = document.createElement("h1");
		quantity.innerText = "Qty: " + cart_items[i].quantity;
		quantity.className = "xl:font-semibold text-lg";
		details_div.appendChild(quantity);

		const remove_button = document.createElement("button");
		remove_button.onclick = () => removeFormCart_item(selectedProduct.id);
		const remove_logo = document.createElement("i");
		remove_logo.className = "fa-solid fa-trash mr-2 text-gray-400";

		const remove_text = document.createElement("span");
		remove_text.className = "font-semibold text-lg";

		remove_text.innerText = "Remove";
		remove_button.appendChild(remove_logo);
		remove_button.appendChild(remove_text);
		details_div.appendChild(remove_button);
		subtotal_price = subtotal_price + selectedProduct.price;
	}

	const totalPrice_div = document.createElement("div");
	totalPrice_div.className = "mt-6";
	web_cart_items.appendChild(totalPrice_div);

	const subtotal_div = document.createElement("div");
	subtotal_div.className = "flex justify-between";
	totalPrice_div.appendChild(subtotal_div);

	const subtotal_heading = document.createElement("h1");
	subtotal_heading.innerText = "Subtotal: ";
	subtotal_heading.className = "text-lg xl:font-bold";
	subtotal_div.appendChild(subtotal_heading);

	const subtotal = document.createElement("h1");
	subtotal.innerText = "$" + subtotal_price;
	subtotal.className = "font-semibold text-lg";
	subtotal_div.appendChild(subtotal);

	const deliveryCharges_div = document.createElement("div");
	deliveryCharges_div.className = "flex justify-between";
	totalPrice_div.appendChild(deliveryCharges_div);

	const deliveryCharges_heading = document.createElement("h1");
	deliveryCharges_heading.innerText = "Delivery Charges: ";
	deliveryCharges_heading.className = "text-lg xl:font-bold";
	deliveryCharges_div.appendChild(deliveryCharges_heading);

	const deliveryCharges = document.createElement("h1");
	deliveryCharges.innerText = "$" + 20;
	deliveryCharges.className = "font-semibold text-lg";
	deliveryCharges_div.appendChild(deliveryCharges);

	const total_div = document.createElement("div");
	total_div.className = "flex justify-between";
	totalPrice_div.appendChild(total_div);

	const total_heading = document.createElement("h1");
	total_heading.innerText = "Total: ";
	total_heading.className = "text-lg xl:font-bold";
	total_div.appendChild(total_heading);

	const total = document.createElement("h1");
	total.innerText = subtotal_price + 20;
	total.className = "text-lg font-semibold";
	total_div.appendChild(total);
}

// Initial display
window.onload = () => {
	displayCheckoutItems();
};

//saving cart items to local storage
const saveCartToStorage = () => {
	localStorage.setItem("cart", JSON.stringify(cart_items)); // Convert the array to a JSON string
};

const removeFormCart_item = (product_id) => {
	let positionThisProductInCart = cart_items.findIndex(
		(value) => value.product_id == product_id
	);

	cart_items.splice(positionThisProductInCart, 1);
	saveCartToStorage();
	location.reload();
};
