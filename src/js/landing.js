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

document.addEventListener('DOMContentLoaded', () => {
    const observerLeft = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('left-card-anim');
          return;
        }

        entry.target.classList.remove('left-card-anim');
      });
    });
  
    const elements = document.querySelectorAll('.left-sect > .proj-card');
    elements.forEach(element => observerLeft.observe(element));

    const observerRight = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('right-card-anim');
            return;
          }

          entry.target.classList.remove('right-card-anim');
        });
      });
    
      const elementsr = document.querySelectorAll('.right-sect > .proj-card');
      elementsr.forEach(element => observerRight.observe(element));
  });
  

document.getElementById("pomodoro").addEventListener('click', () => {
  window.open('pomodoro/pomodoro-project/index.html', "_blank"); // Reemplaza con la URL de tu página
});

document.getElementById("game").addEventListener('click', () => {
  window.open('game/index.html', "_blank"); // Reemplaza con la URL de tu página
});

let fletxa = document.getElementById("fletxa");
const myTimeout = setTimeout(function () {
  fletxa.style.display = "block";
}, 5000);