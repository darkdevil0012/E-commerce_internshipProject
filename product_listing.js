import { items } from "./products.js";

const itemsPerPage = 10; // Number of items per page
let currentPage = 1;

// Function to display items of the current page
function displayItems() {
	const container = document.getElementById("item-container");
	container.innerHTML = ""; // Clear previous items

	// Calculate start and end indexes
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Slice items for the current page
	const itemsToDisplay = items.slice(startIndex, endIndex);

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
	document.getElementById("next-button").disabled = endIndex >= items.length;
}

// // Event listeners for navigation buttons
document.getElementById("prev-button").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		displayItems();
	}
});

document.getElementById("next-button").addEventListener("click", () => {
	if (currentPage * itemsPerPage < items.length) {
		currentPage++;
		displayItems();
	}
});

// Initial display
displayItems();

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
