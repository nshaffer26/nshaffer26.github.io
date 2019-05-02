/*
Author: Nicholas Shaffer
Date: 4/23/19

APIs:
    https://pokeapi.co/
*/

const gens = {
    gen1: {num: 151, min: 1, max: 151, selected: true},
    gen2: {num: 100, min: 152, max: 251, selected: false},
    gen3: {num: 135, min: 252, max: 386, selected: false},
    gen4: {num: 107, min: 387, max: 493, selected: false},
};
const numPokemon = gens.gen1.num + gens.gen2.num + gens.gen3.num + gens.gen4.num;

let ans;
let image;
let description;

function getRandomIds() {
    if(!(gens.gen1.selected || gens.gen2.selected || gens.gen3.selected || gens.gen4.selected)) {
        $('#gen1').addClass('gen-selected');
        gens.gen1.selected = true;
    }
    $('#choices div').removeClass('gen-selected');
    $('#feedback').css({
        "display": "none"
    });
    if($(window).width() <= 750) {
        $('#image-container').html("<div id=\"image\"></div>");
    }
    else {
        $('#image-container').html("<img src=\"Images/pokeball.png\"><div id=\"image\"></div><img src=\"Images/pokeball.png\">");
    }
    let ids = [];
    for(let i = 0; i < 4; i++) {
        let id = Math.floor(Math.random() * numPokemon) + 1;
        while(!checkValid(id,ids)) {
            id = Math.floor(Math.random() * numPokemon) + 1;
        }
        ids.push(id);
    }
    getPokemon(ids);
}

function checkValid(id,ids) {
    for(let j = 0; j < ids.length; j++) {
        if(id == ids[j]) {
            return false;
        }
    }
    if(gens.gen1.selected && (id >= gens.gen1.min) && (id <= gens.gen1.max)) {
        return true;
    }
    else if(gens.gen2.selected && (id >= gens.gen2.min) && (id <= gens.gen2.max)) {
        return true;
    }
    else if(gens.gen3.selected && (id >= gens.gen3.min) && (id <= gens.gen3.max)) {
        return true;
    }
    else if(gens.gen4.selected && (id >= gens.gen4.min) && (id <= gens.gen4.max)) {
        return true;
    }
    else {
        return false;
    }
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

function selectGen(gen) {
    $('#gen' + gen).toggleClass('gen-selected');
    switch(gen) {
        case 1:
            gens.gen1.selected = !gens.gen1.selected;
            break;
        case 2:
            gens.gen2.selected = !gens.gen2.selected;
            break;
        case 3:
            gens.gen3.selected = !gens.gen3.selected;
            break;
        case 4:
            gens.gen4.selected = !gens.gen4.selected;
            break;
        default:
            gens.gen1.selected = !gens.gen1.selected;
            break;
    }
}

function selectChoice(i) {
    $('#choices div').removeClass('gen-selected');
    $('#choice' + i).addClass('gen-selected');
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