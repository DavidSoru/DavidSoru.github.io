let goodPoints = 0;
let badPoints = 0;
let vidas = 3;
var frequency = 1500;
var ranBulb = 55;
var timerr;
let allowmove = true;
let totalTime = 0;
var countDownDate = new Date();
let audioIntro = document.getElementById("audioIntro");
let finalSquare = document.getElementById("finalSquare");
finalSquare.classList.add("finalSquare-none");
audioIntro.play();
audioIntro.loop = true;
let arcadeBanner = document.getElementById("arcade");
    let introDiv = document.getElementById("intro");
const vidasrc = ["img/sinvidas.png", "img/unavida.png", "img/dosvidas.png", "img/tresvidas.png"];
function fallLoop(frequencyy) {
    timerr = setInterval(displayRandomPic, frequencyy);
}

function startGame() {
    
    if(allowmove == true) {
        arcadeBanner.classList.add("arcade-run-anim-slide");
        introDiv.classList.add("run-anim-fade-out");

        fallLoop(frequency);
        startCountdown();

        audioIntro.src = "";
    }
    
}




function displayRandomPic() {
    //
    let ancho = window.outerWidth - 57;
    let alto = window.outerHeight;

    //console.log(`ancho: ${ancho}`);
    //console.log(`alto: ${alto}`);
    
    let img = document.createElement("img");
    
    img.draggable = false;

    let typeBulb = Math.floor(Math.random() * (101 - 1) + 1);

    if(typeBulb >= ranBulb) {
        img.src= "img/bombilla.png";
        img.classList.add("bulb-yellow");
    } else if (typeBulb < ranBulb) {
        img.src= "img/bombillamala.png";
        img.classList.add("bulb-red");
    }
    
    img.width = 57;
    img.height = 90;
    img.alt = "bombilla";

    img.style.position = 'absolute';
    img.style.left = ancho * Math.random() + 'px';
  
    document.body.appendChild(img);

    

    let pos = 0;
    const randomVelo = Math.random() * (2 - 1) + 1;

    
    
    const timer = setInterval(function() {
        

        if(pos >= alto - img.height) {
            img.remove();
            clearInterval(timer);
            
        } else {
            pos += randomVelo;
            img.style.top = pos+"px";
        }

        

        
        if(pos >= altoo - img.height / 2 
        && Number(img.style.left.substring(0, img.style.left.length - 2)) + 35 > findPlayer(EL_img) 
        && Number(img.style.left.substring(0, img.style.left.length - 2)) + 15 < findPlayer(EL_img) + 100) {
            img.remove();
            clearInterval(timer);
            if (img.classList.contains("bulb-yellow")) {
                var audioBueno = document.getElementById("audioBueno");
                audioBueno.play();
                addTime(1);
                goodPoints++;
                EL_img.classList.remove("run-anim-amarilla");
                EL_img.classList.remove("run-anim-roja");
                void EL_img.offsetWidth;
                EL_img.classList.add("run-anim-amarilla");
                
                if (frequency >= 200) {
                    frequency -= 50;
                    clearInterval(timerr);
                    fallLoop(frequency);
                } else if (ranBulb < 80) {
                    ranBulb++;
                }
                document.getElementById("puntgood").innerHTML=`Puntos: ${goodPoints}`;
            } else if (img.classList.contains("bulb-red")) {
                var audioMalo = document.getElementById("audioMalo");
                audioMalo.play();
                EL_img.classList.remove("run-anim-roja");
                EL_img.classList.remove("run-anim-amarilla");
                void EL_img.offsetWidth;
                EL_img.classList.add("run-anim-roja");
                addTime(-10);
                badPoints++;
                vidas--;
                if(vidas > 0) {
                    document.getElementById("vidas-img").src=vidasrc[vidas];
                } else {
                    allowmove = false;
                    document.getElementById("vidas-img").src=vidasrc[0];
                    clearInterval(timerr);
                    samba.src="";

                    var audioPerder = document.getElementById("audioPerder");
                    audioPerder.play();
                    endGame();
                }
                
            }
            
            
        }

        //console.log(pos);
    })

    
}

function findPlayer (player) {
    const style = window.getComputedStyle(player);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;

    
}

function addTime(seconds) {
    countDownDate = new Date(countDownDate.getTime() + seconds * 1000);
}


function startCountdown () {
    countDownDate = new Date((date = new Date()).setSeconds(date.getSeconds() + 100));
    let interval = setInterval(function() {
        if(allowmove == true) {
            totalTime++;
            var samba = document.getElementById("samba");
            samba.loop = true;
            samba.play();
        } else {
            var totalMinutes = Math.floor((totalTime % (60 * 60)) / (60));
            var totalSeconds = Math.floor((totalTime % (60)));
            document.getElementById("finalTime").innerHTML=`: ${totalMinutes}m ` + `${totalSeconds}s`;
            clearInterval(interval);
        }
        
        let now = new Date().getTime();
        // Find the distance between now and the count down date
        
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        

        // Display the result in the element with id="demo"
        document.getElementById("time").innerHTML = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(timerr);
            document.getElementById("time").innerHTML = "00:00";
            allowmove = false;
            clearInterval(interval);
            clearInterval(timerr);
            samba.src="";

            var audioFinal = document.getElementById("audioFinal");
            audioFinal.play();
            endGame();
        }

    }, 1000);
}




const EL_img = document.getElementById("player");
let anchoo = window.outerWidth - EL_img.width * 1.5;
let altoo = window.outerHeight - EL_img.height * 2.2;



document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event;

    
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    if (allowmove == true) {
        EL_img.style.transform = `translate(${event.pageX - 50}px, ${altoo}px)`
    }

    
}

function endGame () {
    audioIntro.src = "/sounds/intro.mp3";
    audioIntro.play();
    
    finalSquare.classList.remove("finalSquare-none");
    finalSquare.classList.add("finalSquare");

    introDiv.classList.add("run-anim-fade-in");
    document.getElementById("start-text").classList.add("finalSquare-none");
    audioIntro.loop = true;

    document.getElementById("finalPoints").innerHTML = `: ${goodPoints} pts`;
}

function playAgain() {
    location.reload();
}

function closeTab() {
    window.close();
}