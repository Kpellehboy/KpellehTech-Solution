
// JavaScript to toggle mobile menu
function toggleMenu() {
    var links = document.getElementById("navbar-links");
    if (links.classList.contains("active")) {
        links.classList.remove("active");
    } else {
        links.classList.add("active");
    }
}