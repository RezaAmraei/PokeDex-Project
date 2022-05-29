let pokeName = "";
//------------------------------------------------FIX COLOR VALUES FOR POISON GROUND AND FLYING-----------------------------------------------
var colors = {
  Normal: "rgb(168,168,120)",
  Fire: "rgb(240, 128, 48)",
  Water: "rgb(104,144,240)",
  Grass: "rgb(120,200,80)",
  Electric: "rgb(248,208,48)",
  Ice: "rgb(152,216,216)",
  Fighting: "rgb(192,48,40)",
  Poison: "rgb(160,64,160)",
  Ground: "rgb(224,192,104)",
  Flying: "rgb(168,144,240)",
  Psychic: "rgb(248,88,136)",
  Bug: "rgb(168,184,32)",
  Rock: "rgb(184,160,56)",
  Ghost: "rgb(184,160,56)",
  Dark: "rgb(112,88,72)",
  Dragon: "rgb(112,56,248)",
  Steel: "rgb(184,184,208)",
  Fairy: "rgb(240,182,188)",
};

function setName(elem) {
  pokeName = elem.value.toLowerCase();
  console.log(pokeName);
}

function getPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    // JS Promise
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const displayImg = document.querySelector("#displayImg");
      const displayName = document.querySelector("#displayName");
      const displayType = document.querySelector("#displayType");
      const poke_id = document.getElementById("poke_id");
      const battle_pokemon = document.getElementById("battle_pokemon");
      //   const displayMove = document.querySelector("#displayMove");
      //   const displayEvo = document.querySelector("#displayEvo");

      let nameCapitalized =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);

      displayImg.innerHTML = `
            <img src="${data.sprites.front_default}" >
            <img src="${data.sprites.front_shiny}">
          `;

      displayName.innerHTML = `
      <p>Name: ${nameCapitalized}</p>`;

      let typeCapitalized =
        data.types[0].type.name.charAt(0).toUpperCase() +
        data.types[0].type.name.slice(1);

      var twoColors = `linear-gradient(to right, ${colors[typeCapitalized]}, red)`;
      console.log(twoColors);
      if (data.types.length == 1) {
        document.body.style.background = colors[typeCapitalized];
      } else {
        twoColors = `linear-gradient(to right, ${colors[typeCapitalized]}, ${
          colors[
            data.types[1].type.name.charAt(0).toUpperCase() +
              data.types[1].type.name.slice(1)
          ]
        }`;

        document.body.style.background = twoColors;
      }

      let pokeTypes = "";
      for (let i = 0; i < data.types.length; i++) {
        pokeTypes += data.types[i].type.name + " ";
        console.log(pokeTypes);
      }
      displayType.innerHTML = `
      <p>Type(s): ${pokeTypes}</p>`;
      // -----------------------------ADD FEATURE TO DISPLAY RANDOM MOVES IT CAN LEARN EACH TIME-------------------------------------
      displayMoves.innerHTML = `
      <p>Possible Moves: ${data.moves[0].move.name} , ${data.moves[1].move.name}, ${data.moves[2].move.name}, ${data.moves[3].move.name}</p>
       `;

      //Hidden Poke_id form
      poke_id.setAttribute("value", `${data.id}`);
      //Hidden battle_pokemon form
      battle_pokemon.setAttribute("value", `${data.id}`);
    });
}
document.querySelector("#search-btn").onclick = function () {
  const btn = document.querySelector("#content-buttons");
  console.log(btn.style);
  btn.style.display = "contents";
};
