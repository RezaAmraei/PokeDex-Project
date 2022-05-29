const pokeList = document.getElementById("main-pokemon");
const pokeList2 = document.getElementById("side-pokemon");
const move1 = document.getElementById("move1");
const move2 = document.getElementById("move2");
const move3 = document.getElementById("move3");
const move4 = document.getElementById("move4");

async function getFavs() {
  try {
    const res = await fetch("/battle/api");
    // const res = await fetch("/api/favs");
    return res.json();
  } catch (err) {
    console.log(err);
  }
}
async function getPokemon(id) {
  console.log(id);
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}
async function getMove(id) {
  console.log(id);
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

async function getEach() {
  try {
    const favsRes = await getFavs();
    let promises = [];

    for (const d of favsRes) {
      const promise = getPokemon(d.pokemon_index);
      promises.push(promise);
    }

    return await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
}

async function displayPokemon() {
  try {
    const data = await getEach();
    const test = Math.floor(Math.random() * 898) + 1;
    let sidePokemon = await getPokemon(test);
    // let move = await getMove("knock-off");
    // console.log(move);
    for (const poke of data) {
      pokeList.innerHTML += `     
            
            <img class='battle-pokemon' src="${poke.sprites.back_default}" >       
            `;

      move1.innerHTML += `
      <h2>${
        poke.moves[Math.floor(Math.random() * poke.moves.length - 1) + 1].move
          .name
      }</h2>
      `;
      move2.innerHTML += `
      <h2>${
        poke.moves[Math.floor(Math.random() * poke.moves.length - 1) + 1].move
          .name
      }</h2>
      `;
      move3.innerHTML += `
      <h2>${
        poke.moves[Math.floor(Math.random() * poke.moves.length - 1) + 1].move
          .name
      }</h2>
      `;
      move4.innerHTML += `
      <h2>${
        poke.moves[Math.floor(Math.random() * poke.moves.length - 1) + 1].move
          .name
      }</h2>
      `;
      pokeList2.innerHTML += `
            
            <img class='battle-pokemon' src="${sidePokemon.sprites.front_default}" >
            `;
    }
    // pokeList2.innerHTML += `
    // <img class='battle-pokemon' src="${sidePokemon.sprites.front_default}" >
    // `;
  } catch (err) {
    console.log(err);
  }
}
displayPokemon();
// let test = Math.floor(Math.random() * 898) + 1;
// let sidePokemon = getPokemon(test);
// console.log(test);
// console.log(sidePokemon);
// pokeList2.innerHTML += `
// <img class='battle-pokemon' src="${sidePokemon.sprites.front_default}" >
// `;
function displayAttack() {
  document.getElementById("main-pokemon").style.cssText =
    "animation-name: attack; animation-duration: 1.5s;";
  setTimeout(function () {
    document.getElementById("main-pokemon").style.cssText =
      "animation-name: none; animation-duration: none;";
  }, 1500);
  console.log();
}

function attack(otherPokemonHealth) {
  otherPokemonHealth -= 10;
  console.log(otherPokemonHealth);
  return otherPokemonHealth;
}
