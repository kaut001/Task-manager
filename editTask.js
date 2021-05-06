/**************
 * Form inputs
 **************/
const taskNameInput = document.getElementById("titleText");
const taskDescriptionInput = document.getElementById("descText");
const memberDropdown = document.getElementById("memberList");
const memberListDiv = document.getElementById("memberDisplay");

const checkpointsDiv = document.getElementById("checkpointsDiv");
let checkpointInput = document.getElementById("checkpointText");

const createMemberInput = document.getElementById("createMemberInput");
const addNewMemberButton = document.getElementById("addNewMemberButton");


/*********************
 * Local Storage (getter/setter)
 *********************/

function setLocalStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}


//Members to be added to the task
let memberList = [];
let checkpointArray = [];
let nameDuplicate = false;

function submitTask(event) {
    event.preventDefault();

    createTask();
    if (nameDuplicate) {
        nameDuplicate = false;
        return;
    }
    event.target.reset();
    popUpAdd.style.display = "none";
    renderTaskCards();
}

// Fill dropdownlist with members from localStorage
function renderMemberDropdown() {
    let member = getLocalStorage("member");
    let group = getLocalStorage("group");

    memberDropdown.innerHTML = "";
    for (var i = 0; i < group.length; i++) {
        memberDropdown.innerHTML += `<option>${group[i].name}</option>`;
    }
    for (var i = 0; i < member.length; i++) {
        memberDropdown.innerHTML += `<option>${member[i].name}</option>`;
    }
}

function createTask() {
    let localStorageArray = getLocalStorage("task");
    // Check if name exists
    localStorageArray.forEach(task => {
        if (task.name === taskNameInput.value) nameDuplicate = true;
    });
    if (nameDuplicate) {
        alert("A task named: " + '"' + taskNameInput.value + '"' + ' already exist. Please choose a different name.');
        taskNameInput.value = "";
        return;
    }

    // Get input from form
    // Get Checkpoints
    // Get members
    // Create task object
    obj = {
        name: taskNameInput.value,
        description: taskDescriptionInput.value,
        members: memberList,
        checkpoints: checkpointArray,
        phase: "todo"
    }

    // Store task object in localStorage
    localStorageArray.push(obj);
    setLocalStorage("task", localStorageArray);
}

/********************
 * Member/Group 
 ********************/

function addMemberOrGroup() {
    // Get selected member/group
    const selectedMember = memberDropdown[memberDropdown.selectedIndex].value;
    console.log('selected: ' + selectedMember);
    let localStorageGroupArray = getLocalStorage("group");
    console.log(localStorageGroupArray)

    for (var i = 0; i < localStorageGroupArray.length; i++) {
        // Check if group then add members of that group
        if (localStorageGroupArray[i].name === selectedMember) {
            console.log('group:' + selectedMember);
            for (var j = 0; j < localStorageGroupArray[i].groupMembers.length; j++) {
                //check if member of group is in list
                if (memberList.includes(localStorageGroupArray[i].groupMembers[j])) {
                    alert(localStorageGroupArray[i].groupMembers[j] + ' has already been selected.');
                } else {
                    memberList.push(localStorageGroupArray[i].groupMembers[j]);
                }
            }
            renderMemberList();
            return;
        } else {
            console.log(localStorageGroupArray[i].name + ' is not selected');
        }
    }
    console.log('no return trigger');
    // Check if its already there
    if (memberList.includes(selectedMember)) return alert(selectedMember + ' has already been selected.');

    // Add to memberList
    memberList.push(selectedMember);

    renderMemberList();
}

function renderMemberList() {
    memberListDiv.firstElementChild.innerHTML = "Members:";
    memberList.forEach(member => {
        memberListDiv.firstElementChild.innerHTML += `<li>${member}</li>`;
    });

}
// Type in member to be added to task
function addNewMemberToTask() {
    // Check if member is already there
    if (memberList.includes(createMemberInput.value)) return alert(createMemberInput.value + ' has already been selected.');

    // Add member to memberList array (to be added to task)
    memberList.push(createMemberInput.value);
    createMemberInput.value = "";
    // Render members in MemberList in add/edit-task pop up
    renderMemberList();
}

/********************
 * Checkpoints
 ********************/
function addCheckpoint() {
    // Check if empty
    if (checkpointInput.value.length) {
        checkpointArray.push({ name: checkpointInput.value, isChecked: 0 });
    } else {
        return alert('You need to write a checkpoint.');
    }
    renderCheckpoints();
    checkpointInput.value = "";
}

function renderCheckpoints() {
    checkpointsDiv.innerHTML = "Checkpoints:";
    checkpointArray.forEach(checkpoint => {
        checkpointsDiv.innerHTML += `<li>${checkpoint.name} <span class="removeEditCheckPoints" onclick="deleteCheckpoint(event, ${checkpointArray.indexOf(checkpoint)})">[X]</span></li>`;
    });
}

function deleteCheckpoint(event, index) {
    const thisCheckpoint = event.target.parentElement;
    thisCheckpoint.remove();
    checkpointArray.splice(index, 1);
}

/******************
 * Initialization
 *****************/
renderMemberDropdown();