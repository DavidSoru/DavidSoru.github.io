window.scrollTo(0, 0);
history.scrollRestoration = "manual";
const links = document.querySelectorAll ('a');
const astros = document.querySelectorAll ('.astros');
const ufo = document.querySelector('.ufo-cursor');
const ufoSrc = document.getElementById('ufo-img');

const universe = document.querySelector('.universe');

const leftZone = document.querySelector('.left-zone');
const rightZone = document.querySelector('.right-zone');

let mouseX = 0;
let mouseY = 0;

let speed = 0;

let currentXOvni = 0;
let currentYOvni = 0;

let targetX = 0;

let animovni = false;

const maxScroll = universe.scrollWidth - window.innerWidth;

let currentXWorld = 0;
let direction = 0;
let worldOffsetX = 0;


const rect = ufo.getBoundingClientRect();
const offsetX = rect.width / 2;
const offsetY = rect.height / 2;

const sections = {
    presentation: 0,
    aboutme: 1,
    programs: 2,
    daw: 3,
    marp: 4,
    contact: 5
};

function goTo(section) {
    targetX = window.innerWidth * sections[section];
}
document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goTo(link.dataset.section);
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        ufoSrc.classList.add('ufo-glow');
    });

    link.addEventListener('mouseleave', () => {
        ufoSrc.classList.remove('ufo-glow');
    });
});

astros.forEach(astro => {
    astro.addEventListener('mouseenter', () => {
        ufoSrc.classList.add('ufo-glow');
    });

    astro.addEventListener('mouseleave', () => {
        ufoSrc.classList.remove('ufo-glow');
    });
});

window.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateOvni() {

    currentXOvni += (mouseX - currentXOvni) * 0.08;
    currentYOvni += (mouseY - currentYOvni + 50) * 0.08;

    // DIRECCIÓN
    const deltaX = mouseX - currentXOvni;

    // ROTACIÓN
    const rotation = deltaX * 0.05;

    ufo.style.transform = `
        translate3d(
            ${currentXOvni - offsetX}px,
            ${currentYOvni - offsetY}px,
            0
        )
        rotate(${rotation}deg)
    `;

    requestAnimationFrame(animateOvni);
}

animateOvni ();

leftZone.addEventListener('mouseenter', () => {
    direction = -1;
});

rightZone.addEventListener('mouseenter', () => {
    direction = 1;
});

leftZone.addEventListener('mouseleave', () => {
    direction = 0;
});

rightZone.addEventListener('mouseleave', () => {
    direction = 0;
});

function animateBG() {

    // mover target
    targetX += direction * 20;

    // límites
    targetX = Math.max(0, Math.min(targetX, maxScroll));

    // suavizado
    currentXWorld += (targetX - currentXWorld) * 0.08;

    worldOffsetX = currentXWorld;

    universe.style.transform =
        `translate3d(${-currentXWorld}px,0,0)`;

    document.querySelector('.stars-back').style.transform =
    `translate3d(${-currentXWorld * 0.2}px, 0, 0)`;

    document.querySelector('.stars-mid').style.transform =
        `translate3d(${-currentXWorld * 0.5}px, 0, 0)`;

    document.querySelector('.stars-front').style.transform =
        `translate3d(${-currentXWorld * 0.8}px, 0, 0)`;

    requestAnimationFrame(animateBG);
}

animateBG();

//cambiar al gif cuando mantienes pulsado el espacio
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !animovni) {
        animovni = true;
        ufoSrc.src = 'src/img/gifovni.gif';
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        animovni = false;
        ufoSrc.src = 'src/img/ovni.png';
    }
});

function createStars(layer, count, size) {

    for (let i = 0; i < count; i++) {

        const star = document.createElement('div');

        star.style.position = 'absolute';

        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';

        const s = Math.random() * size + 1;

        star.style.width = s + 'px';
        star.style.height = s + 'px';

        star.style.background = 'white';
        star.style.borderRadius = '50%';

        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
        layer.appendChild(star);
    }
}

createStars(document.querySelector('.stars-back'), 120, 1);
createStars(document.querySelector('.stars-mid'), 80, 2);
createStars(document.querySelector('.stars-front'), 50, 3);

document.getElementById("bulbcatcher").addEventListener('click', () => {
  window.open('../../../game/index.html', "_blank"); // Reemplaza con la URL de tu página
});