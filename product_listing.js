import { items } from "./products.js";
const category_select = document.getElementById("category_select");
let products = [];
let filteredProducts = [];
const product_search = document.getElementById("product_search");
const mobile_product_search = document.getElementById("mobile_product_search");
const search_btn = document.getElementById("search_btn");
const category_defining_span = document.getElementById(
	"category_defining_span"
);
let search_value;
let mobile_search_value;
let check_searchbtn_clicked = false;
product_search.addEventListener("input", (e) => {
	search_value = e.target.value.toLowerCase();
});

mobile_product_search.addEventListener("input", (e) => {
	filteredProducts = [];
	mobile_search_value = e.target.value.toLowerCase();
	products.forEach((product) => {
		category_defining_span.innerText = "Home > " + mobile_search_value;
		const visible = product.title.toLowerCase().includes(mobile_search_value);
		if (visible) {
			filteredProducts.push(product);
		}
	});
	check_searchbtn_clicked = true;
	displayItems(filteredProducts);
});

search_btn.onclick = () => {
	filteredProducts = [];
	if (search_value == null) {
		displayItems(products);
		category_defining_span.innerText = "Home > all";
	} else {
		products.forEach((product) => {
			category_defining_span.innerText = "Home > " + search_value;
			const visible = product.title.toLowerCase().includes(search_value);
			if (visible) {
				filteredProducts.push(product);
			}
		});
		check_searchbtn_clicked = true;
		displayItems(filteredProducts);
	}
};

category_select.addEventListener("change", () => {
	category_defining_span.innerText = "Home > " + category_select.value;
	filteredProducts = [];
	if (category_select.value == "all") {
		displayItems(products);
	} else {
		for (let i = 0; i < products.length; i++) {
			if (category_select.value == products[i].category) {
				filteredProducts.push(products[i]);
				console.log(filteredProducts);
			}
		}
		displayItems(filteredProducts);
		check_searchbtn_clicked = true;
	}
});
const itemsPerPage = 10; // Number of items per page
let currentPage = 1;

function fetchAllProducts() {
	products = items.slice();
}

// Function to display items of the current page
function displayItems(product) {
	const container = document.getElementById("item-container");
	container.innerHTML = ""; // Clear previous items

	// Calculate start and end indexes
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Slice items for the current page
	const itemsToDisplay = product.slice(startIndex, endIndex);
	if (product.length == 0) {
		const noProduct_div = document.createElement("div");
		const h1 = document.createElement("h1");
		h1.innerText =
			"We're sorry. We cannot find any matches for your search term.";
		h1.className = "text-2xl font-semibold";
		noProduct_div.appendChild(h1);
		container.appendChild(noProduct_div);
		return;
	}
	// Append items to the container
	itemsToDisplay.forEach((item) => {
		const div = document.createElement("div");
		div.id = item.id;
		div.className =
			"shadow-md transition-all hover:shadow-slate-500 bg-white xl:border-2 xl:border-solid xl:border-slate-200";

		// Add click event to pass the id
		div.addEventListener("click", () => {
			// Pass the item.id to another function
			navigateToProductPage(item.id);
		});

		container.appendChild(div);
		const gettingDiv = document.getElementById(item.id);

		const image = document.createElement("img");
		image.src = item.image;
		image.className = "mt-5 ml-auto mr-auto xl:w-full size-40 px-2 ";

		const sub_div = document.createElement("div");
		sub_div.className = "py-1 px-4 mt-4 mb-2";

		const price = document.createElement("h3");
		price.textContent = item.price + "$";
		price.className = "font-bold";

		const rating_stars_span = document.createElement("span");
		for (let i = 0; i < item.rating.rate; i++) {
			const rating_stars_i = document.createElement("i");
			rating_stars_i.className = "fa-solid fa-star text-orange-500";
			rating_stars_span.appendChild(rating_stars_i);
		}

		const rating_words = document.createElement("span");
		rating_words.textContent = item.rating.rate;
		rating_words.className = "text-orange-500";

		const title = document.createElement("p");
		title.textContent = item.title;
		title.className = "text-sm text-gray-500";

		gettingDiv.appendChild(image);
		gettingDiv.appendChild(sub_div);
		const getting_Subdiv = document.getElementById(item.id).lastChild;
		getting_Subdiv.appendChild(price);
		getting_Subdiv.appendChild(rating_stars_span);

		getting_Subdiv.appendChild(rating_words);
		getting_Subdiv.appendChild(title);
	});

	// Function in another file to handle navigation
	function navigateToProductPage(productId) {
		// Save the productId in sessionStorage or pass it via URL
		sessionStorage.setItem("selectedProductId", productId);

		// Redirect to the product description page
		window.location.href = "product_description_page.html";
	}

	const page_info = document.getElementById("pagination-info");
	page_info.innerHTML = "";
	page_info.textContent = currentPage;

	// Enable/Disable buttons
	document.getElementById("prev-button").disabled = currentPage === 1;
	document.getElementById("next-button").disabled = endIndex >= product.length;
}

// // Event listeners for navigation buttons
document.getElementById("prev-button").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		if (check_searchbtn_clicked) {
			displayItems(filteredProducts);
		} else {
			displayItems(products);
		}
	}
});

document.getElementById("next-button").addEventListener("click", () => {
	if (currentPage * itemsPerPage < items.length) {
		currentPage++;
		if (check_searchbtn_clicked) {
			displayItems(filteredProducts);
		} else {
			displayItems(products);
		}
	}
});

// Initial display
window.onload = () => {
	fetchAllProducts();
	displayItems(products);
};

window.toggleDropdown = function (id) {
	const dropdown = document.getElementById(id);
	const icon = document.getElementById(`icon-${id}`);
	dropdown.classList.toggle("hidden");
	icon.classList.toggle("rotate-180");
};

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
	output.innerHTML = this.value;
	console.log(slider.value);
};
