let dawPlanet = document.getElementById("right-planet");
let projectHeader = document.getElementById("project-header");
let projectContent = document.getElementById("project-content");
dawPlanet.addEventListener("click", function () {
    projectHeader.classList.remove("overflow-temp");
    projectContent.scrollIntoView();
})

let leftCards = document.querySelectorAll(".left-sect > .proj-card");
let rightCards = document.querySelectorAll(".right-sect > .proj-card");
let cont = 0;
leftCards.forEach(element => {
    let computedHeight = window.getComputedStyle(element).height;
    rightCards[cont].style.height = computedHeight;
    cont++;
});