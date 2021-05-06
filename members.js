/**********************
 * Members
 **********************/
const nameInput = document.getElementById("memberNameInput");
const descriptionTextarea = document.getElementById("descriptionTextbox");
const memberListe = document.getElementById("memberListUl");

// Submit function
function addMember(event) {
    event.preventDefault();

    createMember("member");

    event.target.reset();
    renderMemberDropdown();
}

function createMember(key) {
    // Get local storage
    let localStorageArray = getLocalStorage(key);
    if (key === "member") {
        // Check input
        if (nameInput.value === "") {
            alert('Please enter a name');
            return;
        }


        // Check if name exists
        if (doesMemberExist(nameInput.value)) {
            alert('Member name "' + nameInput.value + '" already exists');
            return;
        }
        // Create object
        obj = {
            name: nameInput.value,
            memberDescription: descriptionTextarea.value,
            tasks: []
        };
    } else if (key === "group") {
        // Check iinput
        if (groupNameInput.value === "") {
            alert('Please enter a group name');
            return;
        }

        // Check if name exists
        for (var i = 0; i < localStorageArray.length; i++) {
            if (localStorageArray[i].name === groupNameInput.value) {
                alert('Group name already exists');
                return;
            }
        }
        // Create object
        obj = {
            name: groupNameInput.value,
            groupMembers: [],
            groupDescription: groupDescriptionTextarea.value,
            tasks: []
        };
    } else {
        console.log("invalid key");
    }

    // Add to array going to local storage
    localStorageArray.push(obj);

    // Update local storage
    setLocalStorage(key, localStorageArray);

    // Render lists
    _renderMemberList();
    renderGroupList();
    _renderMemberDropdown();
    renderGroupDropdown();
}

function deleteMemberOrGroup(event, key) {
    // Get "this" name
    let thisMemberOrGroup = event.target.parentNode.innerHTML.split(" <")[0];

    // Remove it from localstorage
    let localStorageArray = getLocalStorage(key);
    for (var i = 0; i < localStorageArray.length; i++) {
        if (localStorageArray[i].name === thisMemberOrGroup) {
            console.log('"' + thisMemberOrGroup + '" has been deleted from Local Storage');
            localStorageArray.splice(i, 1);
        } else {
            console.log("Error 404: " + thisMemberOrGroup + " is not found.");
        }
    }
    setLocalStorage(key, localStorageArray);
    // Render lists
    _renderMemberList();
    _renderMemberDropdown();
    renderGroupList();
    renderGroupDropdown();
}
// Render member list in add members list
function _renderMemberList() {
    // Set title
    memberListe.innerHTML = "<span class='membersListTitle'> Members:</span>";

    // Get local storage
    let member = getLocalStorage("member");

    // Render existing members from local storage
    for (var i = 0; i < member.length; i++) {
        memberListe.innerHTML += `<li class="list">${member[i].name} <span onclick="deleteMemberOrGroup(event, 'member')" class="delete"> &emsp; X </span></li>`;

    }
}

/**********************
 * Groups
 **********************/

const groupNameInput = document.getElementById("groupNameInput");
const groupDescriptionTextarea = document.getElementById("groupDescriptionTextbox");
const groupList = document.getElementById("groupListUl");

// Submit function
function addGroup(event) {
    event.preventDefault();
    
    createMember("group");

    event.target.reset();
}

// Render group list
function renderGroupList() {
    // Set title
    groupList.innerHTML = "<span class='membersListTitle'>Groups:</span>";

    // Get local storage
    let group = getLocalStorage("group");

    // Render all groups and members in groups
    for (var i = 0; i < group.length; i++) {
        groupList.innerHTML += `<li class="list">${group[i].name} <span class="deleteGroupSpan" onclick="deleteMemberOrGroup(event, 'group')">X</span></li>`;
        groupList.innerHTML += `Members:`;

        groupList.innerHTML += ` ${group[i].groupMembers.join(', ')}`;
    }
}

/*********************
 * Local Storage (getter/setter)
 *********************/

function setLocalStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}


/********************************
 * Add member to group
 ********************************/
const members = document.getElementById("members");
const groups = document.getElementById("groups");

function _renderMemberDropdown() {
    let member = getLocalStorage("member")

    members.innerHTML = "";
    for (var i = 0; i < member.length; i++) {
        members.innerHTML += `<option>${member[i].name}</option>`;
    }
}

function renderGroupDropdown() {
    let group = getLocalStorage("group");

    groups.innerHTML = "";
    for (var i = 0; i < group.length; i++) {
        groups.innerHTML += `<option>${group[i].name}</option>`;
    }
}

function addMemeberToGroup() {
    // Get localstorage
    let localStorageMemberArray = getLocalStorage("member");
    let localStorageGroupArray = getLocalStorage("group");

    // get selected member
    let selectedMember = members[members.selectedIndex].value;
    let selectedGroup = groups[groups.selectedIndex].value;

    let memberToPush = "";

    // bruker findIndex() for å finne indexen til arrayet der object.name er det samme som selectedMember 
    const index = localStorageMemberArray.findIndex(obj => obj.name === selectedMember);
    // Hvis indexen ikke finnes, returnerer den false. 
    // Dersom den finnes, bruk den for å velge samme navn i localstorage arrayet som selectedMember
    if (index !== -1) memberToPush = localStorageMemberArray[index].name;

    // filter itererer gjennom objektene i "localstoragearray" 
    // returnerer et array med objekter som matcher: gruppenavn og har et member som matcher memberToPush
    const groupInArray = localStorageGroupArray
        .filter(group => group.name === selectedGroup && group.groupMembers.includes(memberToPush));

    if (!groupInArray.length) {
        localStorageGroupArray.find(group => group.name === selectedGroup).groupMembers.push(memberToPush)
    } else {
        alert(memberToPush + " is already in that group");
        return;
    }

    // Update local storage
    setLocalStorage("group", localStorageGroupArray);

    renderGroupList();
}

// Function to check if a member exist 
function doesMemberExist(_name) {
    let localStorageMemberArray = getLocalStorage("member");
    for (var i = 0; i < localStorageMemberArray.length; i++) {
        if (localStorageMemberArray[i].name === _name) {
            return true;
        } else {
            return false
        }
    }
}


/************
 * Init
 ************/
function init() {
    _renderMemberList();
    renderGroupList();
    _renderMemberDropdown();
    renderGroupDropdown();
}
init();
