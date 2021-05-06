/****************
 * Drag and drop
 ****************/
const allTaskCard = document.querySelector('.taskCard');
const toDoDiv = document.getElementById("toDoContainerDiv");
const inProgressDiv = document.getElementById("inProgressContainerDiv")
const finishedDiv = document.getElementById("finishedContainerDiv")
const phaseDivs = document.querySelector('.phaseContainerDiv');
const trashDiv = document.getElementById('trashContainerDiv');

const mainFormDiv = document.getElementById("mainForm");

// allow drop on element
function allowDrop(ev) {
    ev.preventDefault();
}

// Drag function, get dragged element id
function drag(ev) {
    setTimeout(() => (ev.target.style.opacity = "0", 0));
    ev.dataTransfer.setData("text", ev.target.id);
}

// Drop function
function drop(ev) {
    ev.preventDefault();
    // Get dragged element
    var dataInput = ev.dataTransfer.getData("text");
    // Check drop place
    if (ev.target === trashDiv || ev.target === trashDiv.firstElementChild) {
        // Delete task
        deleteTaskFromLocalStorage(dataInput);
        document.getElementById(dataInput).remove();
    } else if (ev.target === inProgressDiv || ev.target === inProgressDiv.children) {
        // Move task card and change local storage
        inProgressDiv.appendChild(document.getElementById(dataInput));
        document.getElementById(dataInput).style.opacity = 100;
        upDateTaskPhaseInLocalStorage(dataInput, "inProgress");
    } else if (ev.target === toDoDiv || ev.target === toDoDiv.children) {
        // Move task card and change local storage
        toDoDiv.appendChild(document.getElementById(dataInput));
        document.getElementById(dataInput).style.opacity = 100;
        upDateTaskPhaseInLocalStorage(dataInput, "todo");
    } else if (ev.target === finishedDiv || ev.target === finishedDiv.children) {
        // Move task card and change local storage
        finishedDiv.appendChild(document.getElementById(dataInput));
        document.getElementById(dataInput).style.opacity = 100;
        upDateTaskPhaseInLocalStorage(dataInput, "finished");
    }

    // Sync border on padding with phase borders
    syncPadding();

    // Update progress bar
    checkProgress();
}

// Update task phase in local storage
function upDateTaskPhaseInLocalStorage(taskToUpdate, phase) {
    let LocalStorageTaskArray = getLocalStorage("task");
    let taskTitle = document.getElementById(taskToUpdate).firstElementChild.innerHTML;
    let index = LocalStorageTaskArray.findIndex(obj => obj.name === taskTitle);
    LocalStorageTaskArray[index].phase = phase;
    setLocalStorage("task", LocalStorageTaskArray);
}

// Delete task from local storage
function deleteTaskFromLocalStorage(task) {
    let LocalStorageTaskArray = getLocalStorage("task");
    let taskTitle = document.getElementById(task).firstElementChild.innerHTML;
    let index = LocalStorageTaskArray.findIndex(obj => obj.name === taskTitle);
    LocalStorageTaskArray.splice(index, 1);
    setLocalStorage("task", LocalStorageTaskArray);
}

// Turn task card visible after being dragged
document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "1";
});




/*********************
 * Local Storage (getter/setter)
 *********************/

function setLocalStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}


/******************
 * Task Cards
 ******************/

// Render Task card
function renderTaskCards() {
    // Clear task cards before rendering
    toDoDiv.innerHTML = `<h2>To do</h2>`;
    inProgressDiv.innerHTML = `<h2>In Progress</h2>`;
    finishedDiv.innerHTML = `<h2>Finished</h2>`;

    // Get tasks
    const taskArray = getLocalStorage("task");

    // Create task card
    // Fill task card with info from task obj
    let number = 0;
    taskArray.forEach(task => {
        number++;
        let taskHtml = `
        
        <div class="taskCard" id="taskDiv-${number}" draggable="true" ondragstart="drag(event)">
        <div id="taskTitle">${task.name}</div>
        <div id="taskDescription">${task.description}</div>
        <div id="taskCardClickTarget" onclick="clickTaskCard(event)">
        </div></div>`;
        if (task.phase === "todo") {
            toDoDiv.innerHTML += taskHtml;
        } else if (task.phase === "inProgress") {
            inProgressDiv.innerHTML += taskHtml;
        } else {
            finishedDiv.innerHTML += taskHtml;
        }
        
        // Update progress bar
        checkProgress();
    });




}

/******************
 * CSS stuff
 ******************/
// Expand/minimize sidebar menu
function openSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
    syncPaddingWithSidebar();
}

// Expand/minimize padding
function syncPaddingWithSidebar() {
    if (document.getElementById("sidebar").classList.value === "active") {
        // ekspandert
        document.getElementById("phasesDiv").style.gridTemplateColumns = "205px auto";
        document.querySelector(".phasePadding").style.width = "205px";
    } else {
        // minimert
        document.getElementById("phasesDiv").style.gridTemplateColumns = "80px auto";
        document.querySelector(".phasePadding").style.width = "80px";
    }
}

// Sync padding with sidebar
function syncPadding() {
    toDoDiv.previousElementSibling.style.height = "200px";
    inProgressDiv.previousElementSibling.style.height = "200px";
    finishedDiv.previousElementSibling.style.height = "200px";
    toDoDiv.previousElementSibling.style.height = toDoDiv.offsetHeight + 'px';
    inProgressDiv.previousElementSibling.style.height = inProgressDiv.offsetHeight + 'px';
    finishedDiv.previousElementSibling.style.height = finishedDiv.offsetHeight + 'px';
}

/******************
 * Pop-ups
 ******************/
const popUpAdd = document.getElementById("addTaskPopup");
const closeTask = document.getElementById("closeAdd")
const popUpView = document.getElementById("newTaskPopup");
const closeView = document.getElementById("closeView");
const membersView = document.getElementById("membersPopup");
const closeMembers = document.getElementById("closeMembers");


// Open edit version of create task
function openTaskWindow() {
    clearEditTaskValues();
    button.value = "Add Task";
    mainFormDiv.onsubmit = submitTask;
    popUpAdd.style.display = "block";
    let output = window.getComputedStyle(popUpAdd, null).getPropertyValue("display");
}

// Display view task
function openMembersWindow() {
    membersView.style.display = "block";
}

// Close pop-up
closeTask.onclick = function () {
    popUpAdd.style.display = "none";
}

// Close pop-up
closeView.onclick = function () {
    popUpView.style.display = "none";
}

// Close pop-up
closeMembers.onclick = function () {
    membersView.style.display = "none";
}

// Close pop-up
window.onclick = function (event) {
    if (event.target == popUpAdd) {
        popUpAdd.style.display = "none";
    }
    else if (event.target == popUpView) {
        popUpView.style.display = "none";
    }
    else if (event.target == membersView) {
        membersView.style.display = "none";
    }

}



/******************
 * Progress Bar
 ******************/
// Update progress bar 
function checkProgress() {

    let progressBar = document.getElementById("progressBarDiv");
    let totalFinished = finishedDiv.getElementsByClassName("taskCard");
    let totalFinishedAmmount = totalFinished.length;
    let totalCards = document.getElementsByClassName("taskCard");
    let totalCardAmmount = totalCards.length;

    let progress;

    if (totalCardAmmount === 0) {
        progress = 0;
    } else {
        progress = (totalFinishedAmmount / totalCardAmmount) * 100;
    }
    progressBar.style.width = Math.round(progress) + "%";
    progressBar.innerHTML = Math.round(progress) + "%";
}

/************
 * ViewTask
 ************/

const viewTaskTitleDiv = document.getElementById("viewTaskTitleDiv");
const viewTaskDescriptionDiv = document.getElementById("viewTaskDescriptionDiv");
const viewTaskCheckpointsDiv = document.getElementById("viewTaskCheckpointsDiv");
const viewTaskMembersDiv = document.getElementById("viewTaskMembersDiv");
const viewTaskEditTaskButton = document.getElementById("viewTaskEditTaskButton");
const viewTaskPhaseDiv = document.getElementById("viewTaskPhaseDiv");

// Render task card
function renderTaskCard(task) {
    const taskCard = task;
    viewTaskTitleDiv.innerHTML = taskCard.name;
    viewTaskDescriptionDiv.innerHTML = taskCard.description;
    viewTaskCheckpointsDiv.innerHTML = "";
    for (var i = 0; i < taskCard.checkpoints.length; i++) {
        viewTaskCheckpointsDiv.innerHTML += `${taskCard.checkpoints[i].name} <input type="checkbox" id="${taskCard.checkpoints[i].name}" class="viewTaskCheckpoints" name="CP-${i}" value="CP-${i}" onclick="clickCheckbox(event, '${taskCard.name}')"><br>`;
    }

    // Check av checkpoints avhengig av localstorageverdi
    taskCard.checkpoints.forEach(checkpoint => {
        if (checkpoint.isChecked === 1) {
            document.getElementById(checkpoint.name).checked = 1;
        } else {
            document.getElementById(checkpoint.name).checked = 0;
        }
    });

    // Render Members if any
    if (taskCard.members.length < 1) {
        viewTaskMembersDiv.innerHTML = "Members: No members added";
    } else {
        viewTaskMembersDiv.innerHTML = "Members: " + taskCard.members.join(", ");
    }

    // Render task card position depending on phase
    let taskPhase = "";
    if (taskCard.phase === "todo") {
        taskPhase = "To do";
    } else if (taskCard.phase === "inProgress") {
        taskPhase = "In Progress";
    } else if (taskCard.phase === "finished") {
        taskPhase = "Finished";
    }
    viewTaskPhaseDiv.innerHTML = `Move to: <input type="button" id="${taskCard.name}-phase" class="changePhaseButton" value="${taskPhase}" onclick="changeTaskPhase(event, '${taskCard.name}')">`;
}

// Edit task phase
function changeTaskPhase(event, taskName) {
    // Get localstorage
    const taskname = taskName;
    const localStorageArray = getLocalStorage("task");
    const taskIndex = localStorageArray.findIndex(obj => obj.name === taskname);

    if (localStorageArray[taskIndex].phase === "todo") {
        localStorageArray[taskIndex].phase = "inProgress";
        event.target.value = "In Progress";
    } else if (localStorageArray[taskIndex].phase === "inProgress") {
        localStorageArray[taskIndex].phase = "finished";
        event.target.value = "Finished";
    } else if (localStorageArray[taskIndex].phase === "finished") {
        localStorageArray[taskIndex].phase = "todo";
        event.target.value = "To do";
    } else {
        console.log("Error: cant fint task phase");
    }
    // update phase in local storage
    setLocalStorage("task", localStorageArray);
}

// Check/uncheck checkpoint box
function clickCheckbox(event, task) {
    // Get localstorage
    const taskname = task;
    const localStorageArray = getLocalStorage("task");

    // find checkpoint with same name as target id
    const taskIndex = localStorageArray.findIndex(obj => obj.name === taskname);
    const checkpointIndex = localStorageArray[taskIndex].checkpoints.findIndex(name => name.name === event.target.id);

    // Update checked value
    if (localStorageArray[taskIndex].checkpoints[checkpointIndex].isChecked === 1) {
        localStorageArray[taskIndex].checkpoints[checkpointIndex].isChecked = 0;
    } else {
        localStorageArray[taskIndex].checkpoints[checkpointIndex].isChecked = 1;
    }
    // update localstorage
    setLocalStorage("task", localStorageArray);

    // Change phase is all is checked or unchecked
    for (var i = 0; i < localStorageArray[taskIndex].checkpoints.length; i++) {
        if (localStorageArray[taskIndex].checkpoints[i].isChecked === 0) {
            localStorageArray[taskIndex].phase = "inProgress";
            break;
        }
        if (i + 1 === localStorageArray[taskIndex].checkpoints.length) {
            localStorageArray[taskIndex].phase = "finished";
        }
    }
    // update local storage
    setLocalStorage("task", localStorageArray);
    // update progress bar
    checkProgress();

}


// Function when taskcard is clicked
function clickTaskCard(event) {
    // Display view task
    popUpView.style.display = "block";

    // get local storage
    let LocalStorageTaskArray = getLocalStorage("task");
    // Get index of taskcard clicked
    let index = LocalStorageTaskArray.findIndex(obj => obj.name === event.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
    let thisTask = getLocalStorage("task")[index];
    // Render clicked task in view task
    renderTaskCard(thisTask);
}

// close popup
function closeViewTask() {
    popUpView.style.display = "none";
    renderTaskCards();
}

let tempTask = {};
let TempLocalStorageTaskArray = [];
let tempIndex = 0;


const ExsitingtaskNameInput = document.getElementById("titleText");
const ExsitingtaskDescriptionInput = document.getElementById("descText");
const ExsitingmemberListDiv = document.getElementById("memberDisplay");
const ExsitingcheckpointsDiv = document.getElementById("checkpointsDiv");

const button = document.getElementById("addTaskBtn");

function clearEditTaskValues() {
    ExsitingtaskNameInput.value = "";
    ExsitingtaskDescriptionInput.innerHTML = ""
    ExsitingmemberListDiv.firstElementChild.innerHTML = "Members:";
    ExsitingcheckpointsDiv.innerHTML = "Checkpoints:";
    checkpointArray = [];
    memberList = [];
}

// Edit task in create task popup window
function editExistingTask() {
    // Get taskobject === clicked taskCard
    TempLocalStorageTaskArray = getLocalStorage("task");
    tempIndex = TempLocalStorageTaskArray.findIndex(obj => obj.name === viewTaskTitleDiv.innerHTML);
    let thisTask = TempLocalStorageTaskArray[tempIndex];

    // Open popup
    openTaskWindow();

    // Fill in values from object
    ExsitingtaskNameInput.value = thisTask.name;
    ExsitingtaskDescriptionInput.innerHTML = thisTask.description;

    // Get members and render them
    ExsitingmemberListDiv.firstElementChild.innerHTML = "Members:";
    thisTask.members.forEach(member => {
        ExsitingmemberListDiv.firstElementChild.innerHTML += `<li>${member}</li>`;
        memberList.push(member);
    });
    // Get Checkpoints and render them
    ExsitingcheckpointsDiv.innerHTML = "Checkpoints:";
    thisTask.checkpoints.forEach(checkpoint => {
        ExsitingcheckpointsDiv.innerHTML += `<li>${checkpoint.name} <span class="editTaskCheckpoints" onclick="deleteCheckpoint(event, ${checkpointArray.indexOf(checkpoint)})">[X]</span></li>`;
        checkpointArray.push({ name: checkpoint.name, isChecked: 0 });
    });

    // change button
    mainFormDiv.onsubmit = updateTaskInLocalStorage;
    button.value = "Edit Task";
}

// Delete taskcard and task from local storage from button on view task
function viewTaskdeleteThisTask() {
    if (confirm("You are about to delete this task?")) {
        // Get taskobject === clicked taskCard
        TempLocalStorageTaskArray = getLocalStorage("task");
        tempIndex = TempLocalStorageTaskArray.findIndex(obj => obj.name === viewTaskTitleDiv.innerHTML);
        //delete from localstorage where thisTask === "task".name
        // finn index og splice fra array
        TempLocalStorageTaskArray.splice(tempIndex, 1);
        setLocalStorage("task", TempLocalStorageTaskArray);
    } else {
        console.log('no task was deleted');
    }


}

// update task in local storage
function updateTaskInLocalStorage(event) {
    event.preventDefault();
    // get this task
    let thisTask = TempLocalStorageTaskArray[tempIndex];
    thisTask.name = ExsitingtaskNameInput.value
    thisTask.description = ExsitingtaskDescriptionInput.value;
    TempLocalStorageTaskArray[tempIndex].members = memberList;
    TempLocalStorageTaskArray[tempIndex].checkpoints = checkpointArray;

    // update local storage
    setLocalStorage("task", TempLocalStorageTaskArray);

    // Render and sync
    renderTaskCards();
    syncPadding();

    event.target.reset();
    // close popup
    popUpAdd.style.display = "none";

    // Change back button
    mainFormDiv.onsubmit = submitTask;
    button.value = "Add Task";
}

// init
renderTaskCards();
syncPadding();
checkProgress();

