const opennav_btn = document.getElementById("opennav_btn");
const closenav_btn = document.getElementById("closenav_btn");
const homePage_web_categorySelector = document.getElementById(
	"homePage_web_categorySelector"
);
const home_web_mobile_category_ladies_accessories = document.getElementById(
	"home_web_mobile_category_ladies_accessories"
);
const home_web_mobile_category_men_clothing = document.getElementById(
	"home_web_mobile_category_men_clothing"
);
const home_web_mobile_category_men_accessories = document.getElementById(
	"home_web_mobile_category_men_accessories"
);
const home_web_mobile_category_electonics_accessories = document.getElementById(
	"home_web_mobile_category_electonics_accessories"
);

// banner section category functionality
const home_web_category_ladies_accessories = document.getElementById(
	"home_web_category_ladies_accessories"
);
const home_web_category_men_clothing = document.getElementById(
	"home_web_category_men_clothing"
);
const home_web_category_men_accessories = document.getElementById(
	"home_web_category_men_accessories"
);
const home_web_category_electonics_accessories = document.getElementById(
	"home_web_category_electonics_accessories"
);

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}
opennav_btn.onclick = () => openNav();
closenav_btn.onclick = () => closeNav();

window.toggleDropdown = function (id) {
	const dropdown = document.getElementById(id);
	const icon = document.getElementById(`icon-${id}`);
	dropdown.classList.toggle("hidden");
	icon.classList.toggle("rotate-180");
};

const web_search_btn = document.getElementById("web_search_btn");
web_search_btn.onclick = () => {
	redirectToProductPage();
};
function redirectToProductPage() {
	const searchInput = document.getElementById("searchInput").value;
	if (searchInput.trim()) {
		// Redirect to the product listing page with the search query
		window.location.href = `product_listing_page.html?query=${encodeURIComponent(
			searchInput
		)}`;
	} else {
		alert("Please enter a search term.");
	}
}

homePage_web_categorySelector.addEventListener("change", () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		homePage_web_categorySelector.value
	)}`;
});

home_web_mobile_category_ladies_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"ladies accessories"
	)}`;
};

home_web_mobile_category_men_clothing.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"men's clothing"
	)}`;
};

home_web_mobile_category_men_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"men's accessories"
	)}`;
};

home_web_mobile_category_electonics_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"electonics accessories"
	)}`;
};

home_web_category_ladies_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"ladies accessories"
	)}`;
};
home_web_category_men_clothing.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"men's clothing"
	)}`;
};
home_web_category_men_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"men's accessories"
	)}`;
};

home_web_category_electonics_accessories.onclick = () => {
	window.location.href = `product_listing_page.html?query=${encodeURIComponent(
		"electonics accessories"
	)}`;
};
