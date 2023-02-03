/*
    AUTHOR: Nicholas Shaffer
    DATE: 3/19/2021
    UPDATED: 1/24/2023
*/

// ------------- HAMBURGER MENU ------------- //
let hamburger = document.querySelector("#hamburger_button");
let menu = document.querySelector("#menu");
menu.dataset.collapsed = "true";

window.onresize = e =>
{
    if (screen.width > 650)
    {
        menu.style.display = "flex";
        menu.innerHTML =
            "<a href=\"./\"><img src=\"./media/images/icon.svg\" alt=\"\"></a>" +
            "<a href=\"#\">Home</a>" +
            "<a href=\"#about\">About</a>" +
            "<a href=\"#projects\">Projects</a>" +
            "<a href=\"#contact\">Contact</a>";
    }
    else
    {
        menu.style.display = "none";
        menu.innerHTML =
            "<a href=\"#\">Home</a>" +
            "<a href=\"#about\">About</a>" +
            "<a href=\"#projects\">Projects</a>" +
            "<a href=\"#contact\">Contact</a>";
    }
}

let toggleMenu = (e) =>
{
    let collapsed = menu.dataset.collapsed;
    if (collapsed == "true")
    {
        menu.style.display = "flex";
        collapsed = "false";
    }
    else
    {
        menu.style.display = "none";
        collapsed = "true";
    }
    menu.dataset.collapsed = collapsed;
}

hamburger.addEventListener("click", toggleMenu);
// END ------------- HAMBURGER MENU ------------- END //

// START ------------- PROJECT INFO TOGGLE ------------- START //
let projects = document.querySelectorAll(".project");
let toggleSymbol = document.querySelectorAll(".project_info_symbol");

let project1Info = document.querySelector("#project_1_info");
let project2Info = document.querySelector("#project_2_info");
let project3Info = document.querySelector("#project_3_info");
let project4Info = document.querySelector("#project_4_info");

let toggleProjectInfo = (e) =>
{
    let selected = e.currentTarget;

    // Toggle icon change between ellipsis and downward chevron
    let symbol = document.querySelector("#" + selected.id + "_symbol");
    for (let elem of toggleSymbol)
    {
        if (elem.classList.contains("fas") && elem.id != symbol.id)
        {
            elem.classList.add("fa-ellipsis-h");
            elem.classList.remove("fa-chevron-down");
        }
    }
    symbol.classList.toggle("fa-ellipsis-h");
    symbol.classList.toggle("fa-chevron-down");

    // Reveal the current project's info and hide all others
    for (let elem of projects)
    {
        let info = document.querySelector("#" + elem.id + "_info");

        if(elem.id == selected.id)
        {
            info.classList.toggle("hidden");
        }
        else
        {
            info.classList.add("hidden");
        }
    }
}

let brightenProject = (e) =>
{
    let image = document.querySelector("#" + e.currentTarget.id + " .project_image");
    let title = document.querySelector("#" + e.currentTarget.id + " .project_title");
    image.style.filter = "brightness(100%)";
    title.style.color = "#FFF";
    title.style.opacity = "80%";
}
let darkenProject = (e) =>
{
    let image = document.querySelector("#" + e.currentTarget.id + " .project_image");
    let title = document.querySelector("#" + e.currentTarget.id + " .project_title");
    image.style.filter = "brightness(70%)";
    title.style.color = "#EEE";
    title.style.opacity = "75%";
}

for (let elem of projects)
{
    elem.addEventListener("click", toggleProjectInfo);
    elem.addEventListener("mouseenter", brightenProject);
    elem.addEventListener("mouseleave", darkenProject);
}
// END ------------- PROJECT INFO TOGGLE ------------- END //