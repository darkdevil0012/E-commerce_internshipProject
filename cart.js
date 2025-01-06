import { items } from "./products.js";
let cart_items = [];
let saveforlater_items = [];
let productdiv = document.getElementById("cartitems_display");
let saveforlaterdiv = document.getElementById("saveforlateritems_display");
let item_heading = document.getElementById("item_heading");
let items_total = document.getElementById("items_total");
let overall_total_cost = document.getElementById("overall_total_cost");
let shipping_price = document.getElementById("shipping_price");
let tax_price = document.getElementById("tax_price");
let checkout_btn = document.getElementById("checkout_btn");
let my_cart_heading = document.getElementById("my_cart_heading");
const storedCart = localStorage.getItem("cart");
const storedSavedForLater = localStorage.getItem("saveforlater");

//saving cart items to local storage
const saveCartToStorage = () => {
	localStorage.setItem("cart", JSON.stringify(cart_items)); // Convert the array to a JSON string
};

//moving cart items if present form local storage to cart_items array
if (storedCart) {
	cart_items = JSON.parse(storedCart); // Parse the JSON string into an array
}

//saving saveforlater items to local storage
const saveForLaterToStorage = () => {
	localStorage.setItem("saveforlater", JSON.stringify(saveforlater_items)); // Convert the array to a JSON string
};

//moving save for later items if present form local storage to saveforlater array
if (storedSavedForLater) {
	saveforlater_items = JSON.parse(storedSavedForLater); // Parse the JSON string into an array
	console.log("Save For Later loaded:", saveforlater_items);
}

function displayCartItems() {
	let total_price = 0;
	for (let i = 0; i < cart_items.length; i++) {
		const selectedProduct = items.find(
			(item) => item.id == cart_items[i].product_id
		);
		const main_div = document.createElement("div");
		main_div.className = "xl:flex xl:justify-between ";
		productdiv.appendChild(main_div);
		productdiv.className =
			"xl:border-b-2 xl:border-gray-200 xl:pb-4 xl:py-12 xl:px-4";

		const img_div = document.createElement("div");
		img_div.className = "flex gap-5 ";

		const image = document.createElement("img");
		image.src = selectedProduct.image;
		image.alt = "error";
		image.className = "max-w-24 py-4 px-1 max-h-32 xl:max-w-40 xl:max-h-48";
		img_div.appendChild(image);
		main_div.appendChild(img_div);

		const cartitem_details = document.createElement("div");
		img_div.appendChild(cartitem_details);

		const item_title = document.createElement("h1");
		item_title.innerHTML = selectedProduct.title;
		item_title.className = "pt-3 text-2xl font-semibold";
		cartitem_details.appendChild(item_title);

		const item_condition = document.createElement("span");
		item_condition.innerHTML = selectedProduct.condition;
		item_condition.className = "text-xl text-gray-400";
		cartitem_details.appendChild(item_condition);

		const item_material = document.createElement("h1");
		item_material.innerHTML = selectedProduct.matterial;
		item_material.className = "text-xl text-gray-400";
		cartitem_details.appendChild(item_material);

		const quantity_price_div = document.createElement("div");
		quantity_price_div.className = "flex justify-between mt-4 xl:block ";
		main_div.appendChild(quantity_price_div);

		const quantity_div = document.createElement("div");
		quantity_div.className = "flex gap-4 px-2 border border-gray-300";
		quantity_price_div.appendChild(quantity_div);

		const subtractbtn = document.createElement("button");
		subtractbtn.className = "border-r border-gray-400 pr-3";
		const subtractbtn_icon = document.createElement("i");
		subtractbtn_icon.className = "fa-solid fa-minus text-gray-400 fa-xl ";
		subtractbtn.appendChild(subtractbtn_icon);
		subtractbtn.addEventListener("click", () => {
			decreaseQuantity(selectedProduct.id);
		});
		quantity_div.appendChild(subtractbtn);

		const quantity = document.createElement("span");
		quantity.innerHTML = cart_items[i].quantity;
		quantity.className = "text-lg py-1";
		quantity_div.appendChild(quantity);

		const addbtn = document.createElement("button");
		addbtn.className = "border-l border-gray-400 pl-3";
		const addbtn_icon = document.createElement("i");
		addbtn_icon.className = "fa-solid fa-plus text-gray-400 fa-xl";
		addbtn.appendChild(addbtn_icon);
		addbtn.addEventListener("click", () => {
			increaseQuantity(selectedProduct.id);
		});

		quantity_div.appendChild(addbtn);

		const price_div = document.createElement("div");
		price_div.className = "xl:mt-5 xl:font-bold";
		quantity_price_div.appendChild(price_div);

		const price = document.createElement("span");
		let each_item_total = selectedProduct.price * cart_items[i].quantity;
		total_price = total_price + each_item_total;
		price.innerText = "$" + each_item_total.toFixed(2);
		price.className = "text-base xl:text-xl";
		price_div.appendChild(price);

		const web_remove_savelater_div = document.createElement("div");
		web_remove_savelater_div.className = "hidden xl:flex xl:gap-4 xl:ml-36 ";
		productdiv.appendChild(web_remove_savelater_div);

		const web_removebtn = document.createElement("button");
		web_removebtn.innerText = "Remove";
		web_removebtn.className =
			"text-red-500 border border-gray-400 py-2 px-2 rounded-lg text-base";
		web_removebtn.onclick = () => removeFormCart_item(selectedProduct.id);
		web_remove_savelater_div.appendChild(web_removebtn);

		const web_saveLaterbtn = document.createElement("button");
		web_saveLaterbtn.innerText = "Save for later";
		web_saveLaterbtn.className =
			"text-blue-500 border border-gray-400 py-2 px-2 rounded-lg text-base";
		web_saveLaterbtn.onclick = () => moveToSaveLater_item(selectedProduct.id);
		web_remove_savelater_div.appendChild(web_saveLaterbtn);

		const web_back_removeall_div = document.createElement("div");
		web_back_removeall_div.className =
			"hidden xl:flex xl:justify-between xl:pt-4 ";
		productdiv.appendChild(web_back_removeall_div);

		const web_backbtn = document.createElement("button");
		web_backbtn.innerText = "Back to shop";
		web_backbtn.className =
			"text-white bg-blue-500 py-2 px-2 rounded-lg text-base";
		web_backbtn.onclick = () => navigateToProductPage();
		web_back_removeall_div.appendChild(web_backbtn);

		const web_removeAll_btn = document.createElement("button");
		web_removeAll_btn.innerText = "Remove all";
		web_removeAll_btn.className =
			"text-blue-500 border border-gray-400 py-2 px-2 rounded-lg text-base";
		web_removeAll_btn.onclick = () => removeAllProducts();
		web_back_removeall_div.appendChild(web_removeAll_btn);
	}
	item_heading.innerText = "Items(" + cart_items.length + "):";
	items_total.innerText = total_price.toFixed(2);
	if (total_price == 0) {
		overall_total_cost.innerText = 0;
		shipping_price.innerText = 0;
		tax_price.innerText = 0;
	} else {
		overall_total_cost.innerText = (total_price + 10.0 + 7.0).toFixed(2);
	}
	checkout_btn.innerText = "Checkout (" + cart_items.length + " items)";
	checkout_btn.onclick = () => {
		window.location.href = "checkout.html";
	};
	my_cart_heading.innerText = "My cart (" + cart_items.length + ")";
}

const navigateToProductPage = () => {
	window.location.href = "product_description_page.html";
};

const removeAllProducts = () => {
	while (cart_items.length) {
		cart_items.pop();
		saveCartToStorage();
	}
	location.reload();
};

const increaseQuantity = (product_id) => {
	let positionThisProductInCart = cart_items.findIndex(
		(value) => value.product_id == product_id
	);

	cart_items[positionThisProductInCart].quantity =
		cart_items[positionThisProductInCart].quantity + 1;
	location.reload();
	saveCartToStorage();
};

const decreaseQuantity = (product_id) => {
	let positionThisProductInCart = cart_items.findIndex(
		(value) => value.product_id == product_id
	);
	console.log(positionThisProductInCart);

	if (cart_items[positionThisProductInCart].quantity == 1) {
		cart_items.splice(positionThisProductInCart, 1);
	} else {
		cart_items[positionThisProductInCart].quantity =
			cart_items[positionThisProductInCart].quantity - 1;
	}
	saveCartToStorage();
	location.reload();
};

const removeFormCart_item = (product_id) => {
	let positionThisProductInCart = cart_items.findIndex(
		(value) => value.product_id == product_id
	);

	cart_items.splice(positionThisProductInCart, 1);
	saveCartToStorage();
	location.reload();
};

//add to save for later function
const addSaveToLater = (product_id) => {
	let positionThisProductInSaveToLater = saveforlater_items.findIndex(
		(value) => value.product_id == product_id
	);

	if (positionThisProductInSaveToLater < 0) {
		saveforlater_items.push({
			product_id: product_id,
		});
	} else {
		console.log("Product already in Save For Later");
		return;
	}

	saveForLaterToStorage(); // Save the updated saveforlater array
	console.log("Updated Save For Later:", saveforlater_items);
};

const moveToSaveLater_item = (product_id) => {
	addSaveToLater(product_id);
	removeFormCart_item(product_id);
};

function displaySaveForLaterItems() {
	for (let i = 0; i < saveforlater_items.length; i++) {
		const selectedProduct = items.find(
			(item) => item.id == saveforlater_items[i].product_id
		);
		const main_div = document.createElement("div");
		saveforlaterdiv.className = "xl:grid xl:grid-cols-4 xl:px-4";
		saveforlaterdiv.appendChild(main_div);

		// const img_div = document.createElement("div");
		main_div.className = "flex gap-5 xl:block xl:justify-items-center";

		const image = document.createElement("img");
		image.src = selectedProduct.image;
		image.alt = "error";
		image.className = "w-24 py-4 px-1 h-32 xl:w-52 xl:h-52";
		main_div.appendChild(image);

		const cartitem_details = document.createElement("div");
		main_div.appendChild(cartitem_details);

		const item_title = document.createElement("h1");
		item_title.innerHTML = selectedProduct.title;
		item_title.className = "pt-3 text-lg font-semibold text-gray-400";
		cartitem_details.appendChild(item_title);

		const price = document.createElement("h1");
		price.innerText = "$" + selectedProduct.price.toFixed(2);
		price.className = "text-base xl:mt-1 xl:font-semibold";
		cartitem_details.appendChild(price);

		const saveforlater_btnsdiv = document.createElement("div");
		saveforlater_btnsdiv.className = "flex gap-4";
		cartitem_details.appendChild(saveforlater_btnsdiv);

		const moveToCart_btn = document.createElement("button");
		moveToCart_btn.innerText = "Move to cart";
		moveToCart_btn.className =
			" text-blue-500 border border-gray-400 py-2 px-2 rounded-lg xl:mt-3";
		moveToCart_btn.onclick = () => moveToCart_item(selectedProduct.id);
		saveforlater_btnsdiv.appendChild(moveToCart_btn);

		const remove_btn = document.createElement("button");
		remove_btn.innerText = "Remove";
		remove_btn.className =
			"text-red-500 border border-gray-400 py-2 px-2 rounded-lg xl:hidden ";
		remove_btn.onclick = () => removeSaveForLater_item(selectedProduct.id);
		saveforlater_btnsdiv.appendChild(remove_btn);
	}
}

const removeSaveForLater_item = (product_id) => {
	let positionThisProductInCart = saveforlater_items.findIndex(
		(value) => value.product_id == product_id
	);

	saveforlater_items.splice(positionThisProductInCart, 1);
	saveForLaterToStorage();
	location.reload();
};

const addToCart = (product_id) => {
	let positionThisProductInCart = cart_items.findIndex(
		(value) => value.product_id == product_id
	);
	if (cart_items.length <= 0) {
		cart_items = [
			{
				product_id: product_id,
				quantity: 1,
			},
		];
	} else if (positionThisProductInCart < 0) {
		cart_items.push({
			product_id: product_id,
			quantity: 1,
		});
	} else {
		alert("item already in the cart");
	}
	saveCartToStorage(); // Save the updated cart
};

const moveToCart_item = (product_id) => {
	addToCart(product_id);
	removeSaveForLater_item(product_id);
};

window.onload = () => {
	displayCartItems();
	displaySaveForLaterItems();
};
