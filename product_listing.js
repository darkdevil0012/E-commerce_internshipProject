import { items } from "./products.js";
const category_select = document.getElementById("category_select");
let products = [];
let query;
let filteredProducts = [];
let conditionProducts = [];
const mobile_nav_heading = document.getElementById("mobile_nav_heading");
const product_search = document.getElementById("product_search");
const mobile_product_search = document.getElementById("mobile_product_search");
const search_btn = document.getElementById("search_btn");
const category_defining_span = document.getElementById(
	"category_defining_span"
);
let search_value;
let mobile_search_value;
let check_searchbtn_clicked = false;
let check_conditionbtn_clicked = false;
const condition_checkbox_new = document.getElementById(
	"condition_checkbox_new"
);
const condition_checkbox_used = document.getElementById(
	"condition_checkbox_used"
);

const mobile_category_search_all = document.getElementById(
	"mobile_category_search_all"
);

const mobile_category_search_ladiesaccessories = document.getElementById(
	"mobile_category_search_ladiesaccessories"
);

const mobile_category_search_menclothing = document.getElementById(
	"mobile_category_search_menclothing"
);

const mobile_category_search_menaccessories = document.getElementById(
	"mobile_category_search_menaccessories"
);

const mobile_category_search_electronicaccessories = document.getElementById(
	"mobile_category_search_electronicaccessories"
);

const web_category_search_ladiesaccessories = document.getElementById(
	"web_category_search_ladiesaccessories"
);

const web_category_search_menclothing = document.getElementById(
	"web_category_search_menclothing"
);

const web_category_search_menaccessories = document.getElementById(
	"web_category_search_menaccessories"
);

const web_category_search_electronicaccessories = document.getElementById(
	"web_category_search_electronicaccessories"
);

const web_category_shower = document.getElementById("web_category_shower");
const web_category_itemsno_shower = document.getElementById(
	"web_category_itemsno_shower"
);

const rating_1 = document.getElementById("rating_1");
const rating_2 = document.getElementById("rating_2");
const rating_3 = document.getElementById("rating_3");
const rating_4 = document.getElementById("rating_4");
const rating_5 = document.getElementById("rating_5");

product_search.addEventListener("input", (e) => {
	search_value = e.target.value.toLowerCase();
});

mobile_category_search_all.onclick = () => {
	category_defining_span.innerText = "Home > all";
	web_category_shower.innerText = "All products";
	web_category_itemsno_shower.innerText = products.length + " items in";
	mobile_nav_heading.innerText = "All products";
	displayItems(products);
	filteredProducts = [];
	check_conditionbtn_clicked = false;
	check_searchbtn_clicked = false;
};
mobile_category_search_ladiesaccessories.onclick = () =>
	category_display("ladies accessories");
mobile_category_search_menclothing.onclick = () =>
	category_display("men's clothing");
mobile_category_search_menaccessories.onclick = () =>
	category_display("men's accessories");
mobile_category_search_electronicaccessories.onclick = () =>
	category_display("electonics accessories");

web_category_search_ladiesaccessories.onclick = () =>
	category_display("ladies accessories");
web_category_search_menclothing.onclick = () =>
	category_display("men's clothing");
web_category_search_menaccessories.onclick = () =>
	category_display("men's accessories");
web_category_search_electronicaccessories.onclick = () =>
	category_display("electonics accessories");

function category_display(category) {
	category_defining_span.innerText = "Home > " + category;
	mobile_nav_heading.innerText = category;
	web_category_shower.innerText = category;

	filteredProducts = [];
	for (let i = 0; i < products.length; i++) {
		if (category == products[i].category) {
			filteredProducts.push(products[i]);
		}
	}
	web_category_itemsno_shower.innerText = filteredProducts.length + " items in";
	displayItems(filteredProducts);
	check_searchbtn_clicked = true;
	check_conditionbtn_clicked = false;
}

condition_checkbox_new.onclick = () => conditionNew();
condition_checkbox_used.onclick = () => conditionUsed();

function conditionNew() {
	if (condition_checkbox_new.checked == true) {
		conditionProducts = [];
		condition_checkbox_used.checked = false;
		if (filteredProducts.length == 0) {
			for (let i = 0; i < products.length; i++) {
				if ("New" == products[i].condition) {
					conditionProducts.push(products[i]);
				}
			}
			displayItems(conditionProducts);
			check_searchbtn_clicked = false;
			check_conditionbtn_clicked = true;
		} else {
			for (let i = 0; i < filteredProducts.length; i++) {
				if ("New" == filteredProducts[i].condition) {
					conditionProducts.push(filteredProducts[i]);
				}
			}
			displayItems(conditionProducts);
			check_searchbtn_clicked = false;
			check_conditionbtn_clicked = true;
		}
	}
}

function conditionUsed() {
	if (condition_checkbox_used.checked == true) {
		conditionProducts = [];
		condition_checkbox_new.checked = false;
		if (filteredProducts.length == 0) {
			for (let i = 0; i < products.length; i++) {
				if ("used" == products[i].condition) {
					conditionProducts.push(products[i]);
				}
			}
			displayItems(conditionProducts);
			check_searchbtn_clicked = false;
			check_conditionbtn_clicked = true;
		} else {
			for (let i = 0; i < filteredProducts.length; i++) {
				if ("used" == filteredProducts[i].condition) {
					conditionProducts.push(filteredProducts[i]);
				}
			}
			displayItems(conditionProducts);
			check_searchbtn_clicked = false;
			check_conditionbtn_clicked = true;
		}
	}
}

rating_1.onclick = () => {
	selectOnlyThisRating("rating_1");
	rating(1);
};

rating_2.onclick = () => {
	selectOnlyThisRating("rating_2");
	rating(2);
};

rating_3.onclick = () => {
	selectOnlyThisRating("rating_3");
	rating(3);
};

rating_4.onclick = () => {
	selectOnlyThisRating("rating_4");
	rating(4);
};

rating_5.onclick = () => {
	selectOnlyThisRating("rating_5");
	rating(5);
};

function selectOnlyThisRating(id) {
	for (var i = 1; i <= 5; i++) {
		document.getElementById("rating_" + i).checked = false;
	}
	document.getElementById(id).checked = true;
}

function rating(num) {
	conditionProducts = [];
	// condition_checkbox_new.checked = false;
	if (filteredProducts.length == 0) {
		for (let i = 0; i < products.length; i++) {
			if (num >= products[i].rating.rate) {
				conditionProducts.push(products[i]);
			}
		}
		displayItems(conditionProducts);
		check_searchbtn_clicked = false;
		check_conditionbtn_clicked = true;
	} else {
		for (let i = 0; i < filteredProducts.length; i++) {
			if (num >= filteredProducts[i].rating.rate) {
				conditionProducts.push(filteredProducts[i]);
			}
		}
		displayItems(conditionProducts);
		check_searchbtn_clicked = false;
		check_conditionbtn_clicked = true;
	}
}

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
	mobile_nav_heading.innerText = mobile_search_value;
	check_searchbtn_clicked = true;
	check_conditionbtn_clicked = false;
	displayItems(filteredProducts);
});

search_btn.onclick = () => {
	web_search_function();
};

function web_search_function() {
	filteredProducts = [];
	if (search_value == null) {
		displayItems(products);
		category_defining_span.innerText = "Home > all";
		web_category_shower.innerText = "All products";
		web_category_itemsno_shower.innerText = products.length + " items in";
	} else {
		products.forEach((product) => {
			category_defining_span.innerText = "Home > " + search_value;

			const visible = product.title.toLowerCase().includes(search_value);
			if (visible) {
				filteredProducts.push(product);
			}
		});
		web_category_shower.innerText = search_value;
		web_category_itemsno_shower.innerText =
			filteredProducts.length + " items in";
		check_searchbtn_clicked = true;
		check_conditionbtn_clicked = false;
		displayItems(filteredProducts);
	}
}

category_select.addEventListener("change", () => {
	category_defining_span.innerText = "Home > " + category_select.value;
	web_category_shower.innerText = category_select.value;
	filteredProducts = [];
	if (category_select.value == "all") {
		displayItems(products);
		web_category_itemsno_shower.innerText = products.length + " items in";
	} else {
		for (let i = 0; i < products.length; i++) {
			if (category_select.value == products[i].category) {
				filteredProducts.push(products[i]);
			}
		}
		displayItems(filteredProducts);
		web_category_itemsno_shower.innerText =
			filteredProducts.length + " items in";
		check_searchbtn_clicked = true;
		check_conditionbtn_clicked = false;
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
		image.className = "mt-5 ml-auto mr-auto xl:w-auto size-40 xl:size-60 px-2 ";

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
	if (check_searchbtn_clicked) {
		if (currentPage > 1) {
			currentPage--;
			displayItems(filteredProducts);
		}
	} else if (check_conditionbtn_clicked) {
		if (currentPage > 1) {
			currentPage--;

			displayItems(conditionProducts);
		}
	} else {
		if (currentPage > 1) {
			currentPage--;

			displayItems(products);
		}
	}
});

document.getElementById("next-button").addEventListener("click", () => {
	if (check_searchbtn_clicked) {
		if (currentPage * itemsPerPage < filteredProducts.length) {
			currentPage++;

			displayItems(filteredProducts);
		}
	} else if (check_conditionbtn_clicked) {
		if (currentPage * itemsPerPage < conditionProducts.length) {
			currentPage++;
			displayItems(conditionProducts);
		}
	} else {
		if (currentPage * itemsPerPage < products.length) {
			currentPage++;
			displayItems(products);
		}
	}
});

// Initial display
window.onload = () => {
	fetchAllProducts();
	displaySearchResults();
	console.log(query);
	if (query == null) {
		displayItems(products);
		web_category_shower.innerText = "All products";
		mobile_nav_heading.innerText = "All products";
		web_category_itemsno_shower.innerText = products.length + " items in";
	} else {
		switch (query) {
			case "all":
				category_defining_span.innerText = "Home > all";
				web_category_shower.innerText = "All products";
				web_category_itemsno_shower.innerText = products.length + " items in";
				mobile_nav_heading.innerText = "All products";
				displayItems(products);
				filteredProducts = [];
				check_conditionbtn_clicked = false;
				check_searchbtn_clicked = false;
				break;
			case "ladies accessories":
				category_display("ladies accessories");
				break;
			case "men's clothing":
				category_display("men's clothing");
				break;
			case "men's accessories":
				category_display("men's accessories");
				break;
			case "electonics accessories":
				category_display("electonics accessories");
				break;
			default:
				search_value = query;
				web_search_function();
		}
	}
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
	conditionProducts = [];
	if (filteredProducts.length == 0) {
		for (let i = 0; i < products.length; i++) {
			if (slider.value >= products[i].price) {
				conditionProducts.push(products[i]);
			}
		}
		displayItems(conditionProducts);
		check_searchbtn_clicked = false;
		check_conditionbtn_clicked = true;
	} else {
		for (let i = 0; i < filteredProducts.length; i++) {
			if (slider.value >= filteredProducts[i].price) {
				conditionProducts.push(filteredProducts[i]);
			}
		}
		displayItems(conditionProducts);
		check_searchbtn_clicked = false;
		check_conditionbtn_clicked = true;
	}
};

function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

function displaySearchResults() {
	query = getQueryParam("query");
}
