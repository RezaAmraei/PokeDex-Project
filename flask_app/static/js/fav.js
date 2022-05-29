// const pokeList = document.getElementById("fav-pokemon");
// function getFavs() {
//   return fetch("/api/favs")
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((err) => console.log(err));
// }
// function getPokemon(id) {
//   return (
//     fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//       // JS Promise
//       .then((response) => response.json())
//       .then((data) => data)
//       .catch((err) => console.log(err))
//   );
// }
// function getEach() {
//   return getFavs()
//     .then((data) => {
//       let promises = data.map((d) => getPokemon(d.id));
//       return Promise.all(promises)
//         .then((pData) => pData)
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// }

// function displayPokemon() {
//   getEach()
//     .then((data) => {
//       for (const poke of data) {
//         pokeList.innerHTML += `
//                 <h1> ${poke.name}</h1>
//                 `;
//       }
//     })
//     .catch((err) => console.log(err));
// }
// displayPokemon();

const pokeList = document.getElementById("fav-pokemon");

async function getFavs() {
  try {
    const res = await fetch("/api/favs");
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
    for (const poke of data) {
      pokeList.innerHTML += `
            <div class='js-fav'>
            <img src="${poke.sprites.front_default}" >
            <h2> ${poke.name}</h2>
            </div>
            `;
    }
  } catch (err) {
    console.log(err);
  }
}
displayPokemon();
