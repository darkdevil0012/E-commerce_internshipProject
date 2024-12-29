const opennav_btn = document.getElementById("opennav_btn");
const closenav_btn = document.getElementById("closenav_btn");
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

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
	output.innerHTML = this.value;
	console.log(slider.value);
};
