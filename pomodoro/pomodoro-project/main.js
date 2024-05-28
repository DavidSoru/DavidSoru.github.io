let kindMessages25 = 
[
    "Se está fundiendo el queso... Ten paciencia",
    "Lo estás haciendo genial",
    "Ya queda poquito",
    "Cuando la masa se hace con cariño, se nota",
    "Tienes madera de chef, sigue así",
    "El secreto de una buena pizza es practicar mucho",
    "No pasa nada si la pizza no es perfecta, tu esfuerzo lo vale",
    "No hace falta que estés pendiente del reloj, yo te aviso",
    "La espera es ardua, pero piensa en la deliciosa recompensa",
    "¡Ánimo, ya casi lo tienes!",
    "¡Cocina siempre con la espalda recta!",
]

let kindMessagesBreak = 
[
    "¿Por qué no aprovechas para estirar las piernas un poco?",
    "Te has ganado un pequeño descanso",
    "Acuérdate de hidratarte bien",
    "Igual te da tiempo a dar un paseo",
    "Ahora hay que dejar que la pizza se enfríe un poquito",
    "Te da tiempo a poner algo de música",
    "Recuerda mantener la cocina limpia y ordenada",
    "No te saltes los descansos. Tu bienestar es más importante que la pizza",
]

let kindMessageDisplayer = document.querySelector(".timer-col-p");
let chosenMessage;

let fiveMinBtn = document.getElementById("5-min-btn");
let fifteenMinBtn = document.getElementById("15-min-btn");
let twentyfiveMinBtn = document.getElementById("25-min-btn");

let startBtn = document.getElementById("start-btn");
let startBtnIcon = document.querySelector("#start-btn > i")
let stopBtn = document.getElementById("stop-btn");


let timerDisplayer = document.getElementById("timer");

let distance_seconds = 0,
    distance,
    time_left,
    animation_id = null,
    timerPlaying = false,
    firstPaused = false,
    porcentajeAnim = 0,
    propertyCSSAnim;

fiveMinBtn.addEventListener("click", function () {
    if(!timerPlaying && !firstPaused) {
        timerDisplayer.innerHTML = "05:00";
        distance_seconds = 5 * 60;
        chosenMessage = kindMessagesBreak[Math.floor(Math.random() * kindMessagesBreak.length)];
    }
})

fifteenMinBtn.addEventListener("click", function () {
    if(!timerPlaying && !firstPaused) {
        timerDisplayer.innerHTML = "15:00";
        distance_seconds = 15 * 60;
        chosenMessage = kindMessagesBreak[Math.floor(Math.random() * kindMessagesBreak.length)];
    }
})

twentyfiveMinBtn.addEventListener("click", function () {
    if(!timerPlaying && !firstPaused) {
        timerDisplayer.innerHTML = "25:00";
        distance_seconds = 25 * 60;
        chosenMessage = kindMessages25[Math.floor(Math.random() * kindMessages25.length)];
    }
})

startBtn.addEventListener("click", function () {
    if (!timerPlaying) {
        startBtnIcon.classList.remove("bi-play-fill");
        startBtnIcon.classList.add("bi-pause-fill");
        start_timer();
    } else {
        startBtnIcon.classList.remove("bi-pause-fill");
        startBtnIcon.classList.add("bi-play-fill");
        pause_timer();
    }
    
})

stopBtn.addEventListener("click", function () {
    stop_timer();
    
})



function stop_timer() {
    document.title = "Pomodoro Task Manager";
    kindMessageDisplayer.innerHTML = "";
    firstPaused = false;
    startBtnIcon.classList.remove("bi-pause-fill");
    startBtnIcon.classList.add("bi-play-fill");
    timerPlaying = false;
    window.cancelAnimationFrame(animation_id);
    animation_id = null;
    distance_seconds = 0;
    document.documentElement.style.setProperty('--porcentaje-timer', "0%");
    timerDisplayer.innerHTML = "00:00";
}

function start_timer() {
    kindMessageDisplayer.innerHTML = chosenMessage;
    timerPlaying = true;
    let dt = new Date();
    if(firstPaused) {
        let minutosRem = Number(timerDisplayer.innerHTML.slice(0, 2)) * 60;
        let segundosRem = Number(timerDisplayer.innerHTML.slice(3, 5));
        distance_seconds = minutosRem + segundosRem;
    }
    
    distance = dt.setSeconds(dt.getSeconds() + distance_seconds);
    process_timer(distance);
}

function pause_timer() {
    firstPaused = true;
    timerPlaying = false;
    window.cancelAnimationFrame(animation_id);
    animation_id = null;
    propertyCSSAnim = document.documentElement.style.getPropertyValue('--porcentaje-timer');
    porcentajeAnim = Number(propertyCSSAnim.substring(0, propertyCSSAnim.length - 1));
}

function process_timer(distance) {

    document.title = timerDisplayer.innerHTML;
    time_left = distance - new Date();
    if (time_left > 0) {
        let seconds_left = Math.floor((time_left % (1000 * 60)) / 1000),
            minutes_left = Math.floor(time_left / (1000 * 60)),
            progress_pers = 1 - time_left / (1000 * distance_seconds);

        let timer_str = timer_string(minutes_left, seconds_left);
        timerDisplayer.innerHTML = timer_str;
        

        if (firstPaused) {
            document.documentElement.style.setProperty('--porcentaje-timer', porcentajeAnim + Math.round(100 * 100 * progress_pers) / 100 + "%");
        } else {
            document.documentElement.style.setProperty('--porcentaje-timer', Math.round(100 * 100 * progress_pers) / 100 + "%");
        }
        
        
        

        animation_id = window.requestAnimationFrame(function () {
            process_timer(distance);
        });
    } else {
        document.querySelector("audio").play();
        stop_timer();
    }

}

function timer_string(minutes, seconds) {
    let str_minutes,
        str_seconds;
    if (minutes < 10) {
        str_minutes = `0${minutes}`
    } else {
        str_minutes = `${minutes}`
    }
    if (seconds < 10) {
        str_seconds = `0${seconds}`
    } else {
        str_seconds = `${seconds}`
    }
    return `${str_minutes}:${str_seconds}`
}



//aquí pillo los botones de los modales de crear tarea nueva y y borrar tarea y eso para abrirlos y ocultarlos
let newTaskBtn = document.getElementById("new-task-btn");
let modalNewTask = document.getElementById("modal-container-new");
newTaskBtn.addEventListener("click", function () {
    if(modalNewTask.style.display == "none") {
        modalNewTask.style.display = "block";
        taskTitle.focus();
    }
})

modalNewTask.addEventListener("click", function (event) {
    if(event.target === modalNewTask) {
        modalNewTask.style.display = "none";
    }
    
})

let closeModalBtn = document.querySelector(".modal-header > i");
closeModalBtn.addEventListener("click", function () {
    modalNewTask.style.display = "none";
})

//ahora los de borrar tarea (y su debida funcionalidad)
let modalDeleteTask = document.getElementById("modal-container-delete");
let modalDeleteTitle = document.querySelector("#modal-delete-content > p");
modalDeleteTask.addEventListener("click", function (event) {
    if(event.target === modalDeleteTask) {
        modalDeleteTask.style.display = "none";
    }
})

let cancelDeleteBtn = document.getElementById("btn-cancel-delete");
cancelDeleteBtn.addEventListener("click", function() {
    modalDeleteTask.style.display = "none";
})

function deleteTask (taskId, taskTitle) {
    modalDeleteTask.style.display = "block";
    modalDeleteTitle.innerHTML = "¿Seguro que quieres borrar la tarea <b><i>" + taskTitle + "</i></b>?<br>Esta acción no se puede deshacer."
    let taskToDelete = document.getElementById(taskId);

    let confirmDeleteBtn = document.getElementById("btn-confirm-delete");
    confirmDeleteBtn.addEventListener("click", function () {
        if (taskToDelete) {
            taskToDelete.remove();
            modalDeleteTask.style.display = "none";
        }
    })
    
}



//crear tarea

let saveTaskBtn = document.getElementById("save-task-btn");
let newTaskForm = document.getElementById("new-task-form");

let taskTitle = document.getElementById("task-title");
let taskDesc = document.getElementById("task-desc");
let selectCat = document.getElementById("select-cat");

let toDoColumn = document.getElementById("todo-tasks");


saveTaskBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (taskTitle.value.trim()) {
        createTask(taskTitle.value, taskDesc.value, selectCat.value);
        taskTitle.value = "";
        taskDesc.value = "";
        selectCat.value = "no-cat";
        modalNewTask.style.display = "none";
    } else {
        alert("No puedes crear una tarea sin título");
    }
});

function createTask(titulo, descripcion, categoria) {
    // Crear el elemento div
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.draggable = true;
    let taskId = "task-" + new Date();
    taskDiv.setAttribute("id", taskId);

    // Crear el elemento div para el encabezado
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("task-header");
    headerDiv.textContent = titulo;
    taskDiv.appendChild(headerDiv);
    // Crear el párrafo para la descripción de la tarea
    if(descripcion.trim()) {
        let descPara = document.createElement("p");
        descPara.classList.add("task-desc");
        descPara.textContent = descripcion;
        taskDiv.appendChild(descPara);
    }
    

    // Crear el div para el pie de la tarea
    let footerDiv = document.createElement("div");
    

    if(categoria != "no-cat") {

        footerDiv.classList.add("task-footer");
        

        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("task-category");

        // Crear el span dentro del div de categoría
        let categorySpan = document.createElement("span");

        // Crear el párrafo para la categoría de la tarea
        let categoryPara = document.createElement("p");

        switch (categoria) {
            case "fe-cat":
                categoryPara.textContent = "Front-End";
                categorySpan.style.background = "#100ced"
            break;
            case "be-cat":
                categoryPara.textContent = "Back-End";
                categorySpan.style.background = "#ed0cc7"
            break;
            case "de-cat":
                categoryPara.textContent = "Design";
                categorySpan.style.background = "#a60ced"
            break;
            default:
                break;
        }

        categoryDiv.appendChild(categorySpan);
        categoryDiv.appendChild(categoryPara);
        footerDiv.appendChild(categoryDiv);
        
    } else {
        footerDiv.classList.add("task-footer-alone");
    }

    

    // Crear el ícono de basura
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("bi", "bi-trash");
    trashIcon.addEventListener("click", function () {
        deleteTask(taskId, titulo);
    })

    // Crear la imagen
    let img = document.createElement("img");
    img.src = "src/img/correcto.png";
    img.classList.add("check-img-none");

    // Adjuntar los elementos secundarios al div de la tarea
    
    footerDiv.appendChild(trashIcon);

    // Adjuntar todos los elementos secundarios al div de la tarea principal
    
    
    taskDiv.appendChild(footerDiv);
    taskDiv.appendChild(img);

    toDoColumn.appendChild(taskDiv);


    taskDiv.addEventListener("dragstart", dragStart);
}


function dragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

let columnas = 
[
    document.getElementById("todo-tasks"),
    document.getElementById("doing-tasks"),
    document.getElementById("done-tasks"),
]

columnas.forEach(columna => {
    columna.addEventListener("dragenter", dragEnter);
    columna.addEventListener("dragover", dragOver);
    columna.addEventListener("dragleave", dragLeave);
    columna.addEventListener("drop", drop);

    Array.from(columna.children).forEach(hijo => {
        hijo.addEventListener("dragenter", stopPropagation);
        hijo.addEventListener("dragover", stopPropagation);
        hijo.addEventListener("dragleave", stopPropagation);
        hijo.addEventListener("drop", stopPropagation);
    });
})

function stopPropagation(e) {
    e.stopPropagation();
}

function dragEnter (e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver (e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
    
}

function dragLeave (e) {
    e.target.classList.remove('drag-over');
}

function drop (e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');

    
    let doneTasks = document.querySelectorAll("#done-tasks > .task > img");

    if (e.target.id == "done-tasks") {
        draggable.removeEventListener("dragstart", dragStart);

        doneTasks.forEach(imagen => {
            imagen.classList.remove("check-img-none");
            imagen.classList.add("check-img");
        })


        
        
    }
    
    columnas =
        [
            document.getElementById("todo-tasks"),
            document.getElementById("doing-tasks"),
            document.getElementById("done-tasks"),
        ]

    columnas.forEach(columna => {
        columna.addEventListener("dragenter", dragEnter);
        columna.addEventListener("dragover", dragOver);
        columna.addEventListener("dragleave", dragLeave);
        columna.addEventListener("drop", drop);

        Array.from(columna.children).forEach(hijo => {
            hijo.addEventListener("dragenter", stopPropagation);
            hijo.addEventListener("dragover", stopPropagation);
            hijo.addEventListener("dragleave", stopPropagation);
            hijo.addEventListener("drop", stopPropagation);
        });
    })
}