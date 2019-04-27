/*
Author: Nicholas Shaffer
Date: 4/23/19

APIs:
    https://pokeapi.co/
Links:
    Colors: https://www.schemecolor.com/pokemon-colors.php
    Font: https://fonts.googleapis.com/css?family=Press+Start+2P
*/

const genI = 151;
const genII = 100;
const genIII = 135;
const genIV = 107;
const numPokemon = genI + genII + genIII + genIV;
//TODO: Add tool to choose generations?

let ans;
let description;
let image;

function getRandomIds() {
    $('#choices').css({
        "display": "flex"
    });
    $('#feedback').css({
        "display": "none"
    });
    if($(window).width() <= 600) {
        $('#image-container').html("<div id=\"image\"></div>");
    }
    else {
        $('#image-container').html("<img src=\"Images/pokeball.png\"><div id=\"image\"></div><img src=\"Images/pokeball.png\">");
    }
    let ids = [];
    for(let i = 0; i < 4; i++) {
        let id = Math.floor(Math.random() * numPokemon) + 1;
        for(let j = 0; j < ids.length; j++) {
            while(id == ids[j]) {
                id = Math.floor(Math.random() * numPokemon) + 1;
            }
        }
        ids.push(id);
    }
    getPokemon(ids);
}

function getPokemon(ids) {
    $('#image-container').css({
        "display": "flex"
    });
    for(let i = 0; i < ids.length; i++) {
        let j = Math.floor(Math.random() * ids.length);
        while(ids[j] == -1) {
            j = Math.floor(Math.random() * ids.length);
        }
        let id = ids[j];
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            type: 'GET',
            data: {
                format: 'json',
            },
            success: function(response) {
                if(i == 0) {
                    image = response.sprites.front_default;
                    $('#image').html(`<img id="pokemon" src=${image}>`);
                    getDescription(id);
                    ans = j;
                }
                let name = response.name;
                name = name.toUpperCase();
                $('#choice' + j).text(name);
            },
            error: function() {
                $('#error').text("There was an error processing your request. Please try again.");
            }
        });
        ids.splice(j,1,-1);
    }
}

function getDescription(id) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        type: 'GET',
        data: {
            format: 'json',
        },
        success: function(response) {
            let entries = response.flavor_text_entries
            description = entries[entries.length-1].flavor_text;
            description = description.replace(/[\u0000-\u001f]/g," ");
        },
        error: function() {
            $('#error').text("There was an error processing your request. Please try again.");
        }
    });
}

function selectChoice(i) {
    if(i == ans) {
        $('#image-container').html(`<div id=\"image\"></div><div id=\"description\"></div>`);
        $('#image').html(`<img id="pokemon" src=${image}>`);
        $('#description').html(description);
        $('#feedback').css({
            "display": "flex",
            "background": "rgb(180,255,180)"
        });
        $('#image img').css({
            "-webkit-filter": "contrast(100%)",
            "filter": "contrast(100%)"
        });
        $('#feedback').html("Correct!");
    }
    else {
        $('#feedback').css({
            "display": "flex",
            "background": "rgb(255,180,180)"
        });
        $('#feedback').html("Incorrect");
    }
}