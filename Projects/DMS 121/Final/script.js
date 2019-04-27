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

let ans;
let image;
let description;

function getRandomIds() {
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
    $('#choices').css({
        "display": "flex"
    });
    ans = Math.floor(Math.random() * ids.length);
    for(let i = 0; i < ids.length; i++) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${ids[i]}`,
            type: 'GET',
            data: {
                format: 'json',
            },
            success: function(response) {
                let name = response.names[2].name;
                name = name.toUpperCase();
                if(i == ans) {
                    let entries = response.flavor_text_entries;
                    description = entries[entries.length-1].flavor_text;
                    description = description.replace(/[\u0000-\u001f]/g," ");
                    getPicture(ids[i]);
                }
                $('#choice' + i).text(name);
            },
            error: function() {
                $('#error').text("There was an error processing your request. Please try again.");
            }
        });
    }
}

function getPicture(id) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        type: 'GET',
        data: {
            format: 'json',
        },
        success: function(response) {
            image = response.sprites.front_default;
            $('#image').html(`<img id="pokemon" src=${image}>`);
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