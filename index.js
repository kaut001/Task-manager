/*************
 * SETTINGS
 * *********/

function openSettings(){
    document.getElementById("settingsDiv").style.display = "block";
}
function closeSettings(){
    document.getElementById("settingsDiv").style.display = "none";
}

/* **************
 * VISITING PAGE
 ***************/

// Called when clicking 'Get Started' button 
function checkingForVisit() {
    let isVisited = window.localStorage.getItem("isVisited") || false;

    if(!isVisited) {
        return false;
    } else {
        return true;
    }
}

function decideRedirect() {
    if(checkingForVisit()) {
        window.location.href = "projectOverview.html";
    }
}


/* ***************
 * INITIALIZATION
 ****************/

decideRedirect();