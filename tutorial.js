/* *******************
 * GLOBAL VARIABLES 
 *********************/
const infoText = document.getElementById("infoText");
let numberOfClicks = 0;


// Array with objects of text and actions acting as 'pages' in the tutorial
let textObjArr = [
    {
        text: "Your soon to come favorite planning application!",
        action: null 
    },
    {
        text: "We will make your teamwork much easier.",
        action: null
    },
    {
        text: "Here you can open up the menu.",
        action: showArrow
    },
    {
        text: "If you want to create a member or group, you could do that here.",
        action: changeArrow
    },
    {
        text: "This is where you add new tasks to your project. You can add as many as you like!",
        action: showSquare
    },
    {
        text: "And here you can delete them if you ever do something wrong.",
        action: moveSquare
    },
    {
        text: "When you have created a task it will appear here",
        action: showTodo
    },
    {
        text: "Then, you can move it to 'In progress' while working on it",
        action: showInProgress
    },
    {
        text: "When you are completely done with the task, you can move it to finished",
        action: showFinished
    },
    {
        text: "See how the progress bar moves a little? This means you are one step closer to finishing your group project!",
        action: showProgressBar
    },
    {
        text: "Now, I think you are ready to start planning on your own! And if you ever were to forget how to do it, you can re-watch this tutorial by pressing the questionmark over there!",
        action: showQuestionMark
    },
    {
        text: "Head on planning!",
        action: exitTutorial
    }
];


/***********************
 * TUTORIAL BEGINNING
 ***********************/

// Opening tutorial pop-up
function openTutorial() {
    tutorialContainer.style.display = "block";
    shadedBackground.style.display = "block";
}

// When clicking [continue], the tutorial will update based on the amount of clicks
function clickingTutorialBtn() {
    numberOfClicks ++;
    updateTutorialPage()
}

function updateTutorialPage() {
    
    infoText.innerHTML = textObjArr[numberOfClicks].text;
    if(textObjArr[numberOfClicks].action != null) {
        textObjArr[numberOfClicks].action();
    }
}


/* ******************************
 * FUNCTIONS FOR TUTORIAL PAGES
 ********************************/

//Index = 2
function showArrow() {
    arrow.style.visibility = "visible";
}
//Index = 3
function changeArrow() {  //Should be able to do dynamically? With parameter... but it doesnt
    arrow.style.top = "200px";
    arrow.style.left = "330px"
    openSidebar();
}
//Index = 4
function showSquare() {
    openSidebar();
    arrow.style.visibility = "hidden";
    square.style.visibility = "visible";
}
//Index = 5
function moveSquare() {
    square.style.transform = "translate(0, 100px)";
}
//Index = 6
function showTodo() {
    square.style.visibility = "hidden"; /*SQUARE WAITS BEFORE INVISIBLE */
    tutorialContainer.style.transform = "translate(60%, 0)";
    arrow.style.visibility = "visible";
    arrow.style.left = "800px";
}
//Index = 7
function showInProgress() {
    arrow.style.top = "400px";
}
//Index = 8
function showFinished() {
    arrow.style.top = "650px";
}
//Index = 9
function showProgressBar() {
    arrow.style.visibility = "hidden";
    square.style.transform = "translate(0, 0)";
    square.style.top = "65px";
    square.style.left = "210px";
    square.style.width = "1840px";
    square.style.visibility = "visible";
}
//Index = 10
function showQuestionMark() {
    square.style.visibility = "hidden"
}
//Index = 11
function exitTutorial() {
    reloadPage();
}

function reloadPage() {
    location.reload();
}


/* ******************
 * VISITING PAGE 
 *******************/

function automaticTutorialStart() {
    if(screen.width < 1000) {
        tutorialQuestionmark.style.display = "none";
    } else if(checkingForVisit()) {
    } else {
        visitingPage();
        openTutorial();
    }

}

function checkingForVisit() {
    let isVisited = window.localStorage.getItem("isVisited") || false;

    if(!isVisited) {
        return false;
    } else {
        return true;
    }
}


function visitingPage() {
    let array = [ true ];
    window.localStorage.setItem("isVisited", array);
}



/* ********************
 * INIT FUNCTIONS
 *********************/
function initializeTutorial() {
    automaticTutorialStart();
    updateTutorialPage();
}

initializeTutorial();