//          NAVIGATION          //


// Mobile Hamburger Navbar: opening on click
const hamburgerMenu = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".nav");
// Hamburger Menu opens and closes when clicked 
hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// When on mobile, once user clicked the menu point they want to go to, it closes
const navLinks = document.querySelectorAll('.nav-link a');
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    nav.classList.remove('active');
  });
});





//      LANGUAGE DROPDOWN SELECTION BUTTON       //


// Language Dropdown 
const dropdownBtn = document.getElementById("dropbtn");
const dropdownMenu = document.getElementById("dropdown-content");
const toggleArrow = document.getElementById("arrow");

// Toggle dropdown function
const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

// Toggle dropdown open/close when dropdown button is clicked
dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

// Close dropdown when dom element is clicked 
document.documentElement.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});




//      LANGUAGE SELECT/SAVE/CHANGE FUNCTIONALITY       //





// Function to save the language preference in localStorage
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}




// Function to update the site content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[lang-attribute]').forEach(element => {
        const key = element.getAttribute('lang-attribute');
        element.textContent = langData[key];
    });
}



// Function to fetch language data from json files
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}


// Function to change language from one to another 
async function changeLanguage(lang) {
    setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateContent(langData);

    // Update language displayed in the dropdown button 
    const languageNames = {
        'en': 'English',
        'fr': 'French',
        'ar': 'Arabic'
    };
    document.getElementById('dropbtn').innerHTML = `${languageNames[lang]} <i class="fa fa-caret-down" id="arrow"></i>`;
    
    // Change text direction based on the selected language
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        } else {
        document.body.setAttribute('dir', 'ltr');
        }
}


// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

    // Update language displayed in the dropdown button
    const languageNames = {
        'en': 'English',
        'fr': 'French',
        'ar': 'Arabic'
    };
    document.getElementById('dropbtn').innerHTML = `${languageNames[userPreferredLanguage]} <i class="fa fa-caret-down" id="arrow"></i>`;
    // Change text direction based on the preferred language
    if (userPreferredLanguage === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
});




