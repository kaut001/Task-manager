/**************
 * DOM
 **************/
const viewTaskTitleDiv = document.getElementById("viewTaskTitleDiv");
const viewTaskDescriptionDiv = document.getElementById("viewTaskDescriptionDiv");
const viewTaskCheckpointsDiv = document.getElementById("viewTaskCheckpointsDiv");
const viewTaskMembersDiv = document.getElementById("viewTaskMembersDiv");
const viewTaskEditTaskButton = document.getElementById("viewTaskEditTaskButton");

/*********************
 * Local Storage (getter/setter)
 *********************/

function setLocalStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}

function renderTaskCard(task) {
    const taskCard = task;
    viewTaskTitleDiv.innerHTML = taskCard.name;
    viewTaskDescriptionDiv.innerHTML = taskCard.description;
    for (var i = 0; i < taskCard.checkpoints.length; i++) {
        viewTaskCheckpointsDiv.innerHTML +=`${taskCard.checkpoints[i]} <input type="checkbox" id="CP-${i}" name="CP-${i}" value="CP-${i}"><br>`;
    }
    viewTaskMembersDiv.innerHTML = taskCard.members.join(", ");
}

let thisTask = getLocalStorage("task")[0];

renderTaskCard(thisTask);