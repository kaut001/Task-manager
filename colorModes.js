/******************
 * CHANGING COLORS 
 ******************/

// Changing color to 'ORIGINAL' color scheme & Saves to localstorage
function originalMode() {
    var theme = document.getElementById('theme');
    if(window.location.href.toString().includes("index.html")) {
        theme.href = "./CSS/indexoriginal.css";
    } else if(window.location.href.toString().includes("projectOverview.html")) {
        theme.href = "./CSS/projectOverviewOriginal.css";
    }   
    saveColorOption("original");
}

// Changing color to 'DARK' color scheme & Saves to localstorage
function darkMode() {
    var theme = document.getElementById('theme');
    if(window.location.href.toString().includes("index.html")) {
        theme.href = "./CSS/indexdarkmode.css";
    } else if(window.location.href.toString().includes("projectOverview.html")) {
        theme.href = "./CSS/projectOverviewDarkMode.css";
    }
    saveColorOption("dark");
}

// Changing color to 'COLORBLIND' color scheme & Saves to localstorage
function colorblindMode() {
    var theme = document.getElementById('theme');
    if(window.location.href.toString().includes("index.html")) {
        theme.href = "./CSS/indexcolorblind.css";
    } else if(window.location.href.toString().includes("projectOverview.html")) {
        theme.href = "./CSS/projectOverviewColorBlind.css";
    }
    saveColorOption("colorblind");
}


/************************************
 * LOCAL STORAGE HANDLING OF COLORS
 ***********************************/
    
// Saves color option to Local Storage
function saveColorOption(color) {
    let colorMode = [ color ];
    window.localStorage.setItem("colorMode", colorMode);
}

// Gets chosen color from LocalStorage and sets the colorscheme
function setColor() {
    let colorMode = window.localStorage.getItem("colorMode") || [];
    if(colorMode === "dark") {
        darkMode();
    } else if(colorMode === "colorblind") {
        colorblindMode();
    } else {
        originalMode();
    }
}

/* *******************************
 * Functions starting at page load 
 *********************************/

setColor();