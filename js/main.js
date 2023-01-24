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
    // Toggle icon change between ellipsis and downward chevron
    let selected = document.querySelector("#" + e.currentTarget.id + "_symbol");
    for (let elem of toggleSymbol)
    {
        if (elem.classList.contains("fas") && elem.id != selected.id)
        {
            elem.classList.add("fa-ellipsis-h");
            elem.classList.remove("fa-chevron-down");
        }
    }
    selected.classList.toggle("fa-ellipsis-h");
    selected.classList.toggle("fa-chevron-down");

    // Hide or remove project info based on what was selected
    switch (e.currentTarget.id)
    {
        case "project_1":
            project1Info.classList.toggle("hidden");
            project2Info.classList.add("hidden");
            project3Info.classList.add("hidden");
            project4Info.classList.add("hidden");
            break;
        case "project_2":
            project1Info.classList.add("hidden");
            project2Info.classList.toggle("hidden");
            project3Info.classList.add("hidden");
            project4Info.classList.add("hidden");
            break;
        case "project_3":
            project1Info.classList.add("hidden");
            project2Info.classList.add("hidden");
            project3Info.classList.toggle("hidden");
            project4Info.classList.add("hidden");
            break;
        case "project_4":
            project1Info.classList.add("hidden");
            project2Info.classList.add("hidden");
            project3Info.classList.add("hidden");
            project4Info.classList.toggle("hidden");
            break;
    }
}

for (let elem of projects)
{
    elem.addEventListener("click", toggleProjectInfo);
}
// END ------------- PROJECT INFO TOGGLE ------------- END //