const pokemonCount = 152;
var pokedex = {}; // {1: {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."}}

window.onload = async function() {
    // getPokemon(1);
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i)
        // <div></div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon)
        document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
}

function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
    //clear prev types
    let typesDiv = document.getElementById("pokemon-types");
    while(typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // add bkg colour and font colour
        typesDiv.append(type);
    }

    //update desc
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}
