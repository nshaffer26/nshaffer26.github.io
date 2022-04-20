/**
 * AUTHOR: Nicholas Shaffer
 * DATE: 4/19/2021
 */

"use strict";

// Save previous ingredient search
const PREFIX = "njs7772-";
const INGREDIENT_SEARCH_KEY = PREFIX + "ingredients";

let searchIngredientsField;
// Get the stored value, if it exists
const PREVIOUS_SEARCH_INGREDIENTS = localStorage.getItem(INGREDIENT_SEARCH_KEY);

// Error messages
let error;

// Search results
let searchResultsText = "";
let searchResults;

// Advanced search options
let searchCuisine;
let searchHealth;

// Toggle Advanced Search
let advancedSeachTools;
let toggleAdvancedSeachTools;

/*
    Run this when the window loads to initialize variables and set things up
*/
window.onload = (e) => {
    searchResults = document.querySelector("#search_results");
    
    error = document.querySelector("#error");
    searchIngredientsField = document.querySelector("#search_ingredients");
    
    // Set value of search box to the last query that was submitted, if available
    if (PREVIOUS_SEARCH_INGREDIENTS)
    {
        searchIngredientsField.value = PREVIOUS_SEARCH_INGREDIENTS;
    }
    else
    {
        searchIngredientsField.value = "";
    }
    searchIngredientsField.select();
    
    document.querySelector("#search_button").onclick = searchButtonClicked;

    advancedSeachTools = document.querySelector(".search_tools_advanced");
    toggleAdvancedSeachTools = document.querySelector("#toggle_search_tools_advanced");

    // Select "All" options in advance search by default
    document.querySelector("#meal-All").checked = true;
    searchCuisine = document.querySelectorAll("input[name='cuisine']");
    searchCuisine[0].checked = true;
    searchHealth = document.querySelectorAll("input[name='health']");
    searchHealth[0].checked = true;
    // Deselect "All" option when any other value is checked, or deselect all others if "All" is selected
    for(let elem of searchCuisine)
    {
        elem.addEventListener("click", checkboxToggle);
    }
    for(let elem of searchHealth)
    {
        elem.addEventListener("click", checkboxToggle);
    }

    // Hide Advanced Search options initially
    advancedSeachTools.classList.add("hidden");

    // Set event listener to toggle visibility
    toggleAdvancedSeachTools.addEventListener("click", toggle);
};

/**
 * The search button was clicked, begin building the API call
 */
function searchButtonClicked()
{
    // EDAMAM search endpoint
    // Note, API is throttled to 10 calls per minute and 10000 calls per month
    // Example URL: https://api.edamam.com/search?q=chicken&app_id=f0bb21b8&app_key=1665fddbd840f0a7cbc44bf4ccf5b9ab&from=0&to=3&calories=591-722&health=alcohol-free
    const BASE_URL = "https://api.edamam.com/search?";
    
    // API id and key required to make queries
    const APP_ID = "f0bb21b8";
    const APP_KEY = "1665fddbd840f0a7cbc44bf4ccf5b9ab";

    let url = BASE_URL;
    url += "app_id=" + APP_ID;
    url += "&app_key=" + APP_KEY;

    // Include more ingredients in the search
    url += "&to=30";
    
    // ------------- INGREDIENTS ------------- //
    let ingredients = [];
    
    // Get the ingredients entered by the user
    searchIngredientsField = document.querySelector("#search_ingredients");
    // Replace multiple spaces with one and any non-alphabetic characters
    ingredients = searchIngredientsField.value.replace(/[^a-z,]/gmi, " ").replace(/\s\s+/g, " ");
    // Create array from comma separated values
    ingredients = ingredients.split(",");
    // Remove leading and trailing whitespace, convert to lowercase, and url encode
    ingredients = ingredients.map(e => {
        return encodeURIComponent(e.trim().toLowerCase());
    });
    // Remove empty elements
    ingredients = ingredients.filter(e => e.length > 0);
    
    // Must include at least one ingredient in search
    if(ingredients.length == 0)
    {
        error.innerHTML = "<p>Please enter at least one ingredient</p>";
        return;
    }
    
    // Update value of search box with this search query
    let localIngredients = ingredients.map(e => {
        // Capitalize the first letter of each word and add a space at the end
        e = decodeURIComponent(e);
        let words = e.split(" ");
        for(let i = 0; i < words.length; i++)
        {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        e = words.toString().replace(/[^a-z]/gmi, " ");
        e = " " + e;
        return e;
    });
    localStorage.setItem(INGREDIENT_SEARCH_KEY, localIngredients.toString().trim());
    
    // Add ingredients to query
    url += "&q=" + ingredients.toString();
    
    // ------------- MAX CALORIES ------------- //
    let maxCalories;
    
    // Remove everything but numeric values
    maxCalories = document.querySelector("#search_calories").value.replace(/[^0-9]/gmi, "");
    // Check to see if a value was specified
    if(maxCalories)
    {
        // Add max calories to query
        url += "&calories=" + maxCalories;
    }
    
    // ------------- MEAL TYPE ------------- //
    let meal = "";
    
    // Find which meal is selected
    let mealSearch = document.querySelectorAll("input[name='meal']");
    for(let elem of mealSearch)
    {
        if(elem.checked)
        {
            // If "All" is selected, do not filter by meal type
            if(elem.id != "meal-All")
            {
                meal = "&mealType=" + encodeURIComponent(elem.value);
            }
        }
    }
    // Add meal type to query
    url += meal;
    
    // ------------- CUISINE TYPE ------------- //
    let cuisine = "";
    
    // Find which options are selected
    searchCuisine = document.querySelectorAll("input[name='cuisine']");
    for(let elem of searchCuisine)
    {
        if(elem.checked)
        {
            // If "All" is selected, do not filter by cuisine type
            if(elem.id != "cuisine-All")
            {
                cuisine += "&cuisineType=" + encodeURIComponent(elem.value);
            }
        }
    }
    // Add cuisine types to query
    url += cuisine;
    
    // ------------- HEALTH LABELS ------------- //
    let health = "";
    
    // Find which options are selected
    searchHealth = document.querySelectorAll("input[name='health']");
    for(let elem of searchHealth)
    {
        if(elem.checked)
        {
            // If "All" is selected, do not filter by health options
            if(elem.id != "health-All")
            {
                health += "&health=" + encodeURIComponent(elem.value);
            }
        }
    }
    // Add health labels to query
    url += health;
    
    // Check URL
    // console.log(url);
    
    // Reset previous results
    error.innerHTML = "";
    searchResultsText = "";
    searchResults.innerHTML = `<img id="search_spinner" src="./media/images/spinner.svg" alt="">`;

    getData(url);

    // Refocus on the search bar to prepare for more searches
    searchIngredientsField.focus();
    searchIngredientsField.select();
}

/**
 * Send a request using the specified URL
 * @param {*} url The URL to send to the API
 */
function getData(url)
{
    // Create a new XHR object
    let xhr = new XMLHttpRequest();
    
    // Set the onload handler
    xhr.onload = dataLoaded;
    
    // Set the onerror handler
    xhr.onerror = dataError;
    
    // Open the connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

/**
 * Callback function to load and display data received from the server
 * @param {*} e The response from the server
 */
function dataLoaded(e)
{
    let xhr = e.target;

    // TODO: update to ensure not error
    let obj = {"hits": []};

    // Make sure an error is not returned if the API request limit has been reached
    try
    {
        obj = JSON.parse(xhr.responseText);
    }
    catch
    {
        // console.log("Error: Number of requests may have exceeded API limit");
        error.innerHTML = "<p>Number of requests may have exceeded API limit, please try again later</p>";
        return;
    }

    let results = obj.hits;

    if(!results || results.length == 0)
    {
        // No results found
        searchResultsText = "<p>No recipes found, please try again</p>";
    }
    else
    {
        // Build results from search
        for(let elem of results)
        {
            // Check for missing or invalid image URL
            let image = elem.recipe.image;
            
            // Legacy from API v1
            // if(!image || (image[image.length - 4] != "." && image[image.length - 5] != "."))
            // {
            //     image = "./media/images/No-Image-Found.svg";
            // }
            let calories = Math.round(elem.recipe.calories);
            let servings = elem.recipe.yield;
            searchResultsText += `
                <div class="result">
                    <a href="${elem.recipe.url}"><img src="${image}" alt=""></a>
                    <div class="result_info">
                        <h3>${elem.recipe.label}</h3>
                        <div class="result_nutrition">
                            <p><span class="bold">Calories:</span> ${calories}</p>
                            <p><span class="bold">Servings:</span> ${servings}</p>
                            <p><span class="bold">Calories Per Serving:</span> ~${Math.round(calories/servings)}</p>
                        </div>
                        <p class="result_link">View Recipe:<br><a href="${elem.recipe.url}">${elem.recipe.source}</a></p>
                    </div>
                </div>
            `;
        }
    }
    
    // Display results
    searchResults.innerHTML = searchResultsText;
}
/**
 * Callback function to handle any errors in receiving data from the server
 * @param {*} e The response from the server
 */
function dataError(e)
{
    // console.log("Error: Request could not be fulfilled");
    error.innerHTML = "<p>Number of requests may have exceeded API limit, please try again later</p>";
}

/**
 * Event listener to toggle the advanced search dropdown
 * @param {*} e The element that was selected
 */
let toggle = e =>
{
    let targetElem;
    // Check for whether a child element was selected instead
    e.target == e.currentTarget ? targetElem = e.target : targetElem = e.target.parentElement;

    // Toggle ellipsis and down chevron
    targetElem.children[targetElem.children.length - 1].classList.toggle("fa-ellipsis-h");
    targetElem.children[targetElem.children.length - 1].classList.toggle("fa-chevron-down");

    // Toggle advanced search
    advancedSeachTools.classList.toggle("hidden");
}

/**
 * Event listener to handle checkbox functionality
 * @param {*} e The element that was selected
 */
let checkboxToggle = e =>
{
    // Determine if a cuisine or health option was selected
    if(e.target.name == "cuisine")
    {
        checkboxHelper(e, searchCuisine);
    }
    else
    {
        checkboxHelper(e, searchHealth);
    }
}
/**
 * Helper method for checkboxToggle
 * @param {*} selectedCheckbox The checkbox that was selected
 * @param {*} checkboxSet The checkbox set to which selectedCheckbox belongs
 */
function checkboxHelper(selectedCheckbox, checkboxSet)
{
    // Determine if "All" was selected
    if(selectedCheckbox.target.value == "All")
    {
        for(let i = 1; i < checkboxSet.length; i++)
        {
            // Uncheck all other boxes except "All"
            checkboxSet[i].checked = false;
        }
    }
    else
    {
        // Deselect "All" (the first index of the array)
        checkboxSet[0].checked = false
    }

    // If nothing else is selected, "All" should be selected, otherwise it should be deselected
    let checkboxChecked = false;
    for(let i = 1; i < checkboxSet.length; i++)
    {
        if(checkboxSet[i].checked)
        {
            checkboxChecked = true;
            break;
        }
    }

    // Deselect "All" (the first index of the array) if there is another box that is selected
    checkboxChecked ? checkboxSet[0].checked = false : checkboxSet[0].checked = true;
}