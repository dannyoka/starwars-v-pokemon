var starWarsShuffleBtn = document.querySelector("#star-wars-shuffle-btn");
var starWarsCharContainer = document.querySelector("#star-wars-char-container");
var starWarsVoteBtn = document.querySelector("#star-wars-vote-btn");
var pokemonShuffleBtn = document.querySelector("#pokemon-shuffle-btn");
var pokemonCharContainer = document.querySelector("#pokemon-char-container");
var pokemonVoteBtn = document.querySelector("#pokemon-vote-btn");

var SWAPI_URL = "https://swapi.dev/api/people/";
var SWAPI_COUNT = 82;
var POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";
var POKEMON_COUNT = 1281;

function generateRandomNumber(num) {
  return Math.ceil(num * Math.random());
}

function fetchResource(url, num, cb) {
  fetch(url + num)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cb(data);
    });
}

function addPoint(winner) {
  var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || {
    starWars: 0,
    pokemon: 0,
  };

  scoreboard[winner]++;
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

function handleVote(event) {
  if (!starWarsCharContainer.textContent || !pokemonCharContainer.textContent) {
    console.log("Must pick two characters first!");
    return;
  }
  var id = event.target.id;

  if (id === "star-wars-vote-btn") {
    addPoint("starWars");
    console.log("star wars wins!");
  } else {
    addPoint("pokemon");
    console.log("pokemon wins");
  }
}

function renderStarWarsCharacter(character) {
  starWarsCharContainer.textContent = "";
  var characterTitle = document.createElement("h3");
  characterTitle.textContent = character.name;
  starWarsCharContainer.append(characterTitle);
}

function renderPokemon(pokemon) {
  pokemonCharContainer.textContent = "";
  var pokemonTitle = document.createElement("h3");
  var capitalizedPokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  pokemonTitle.textContent = capitalizedPokemonName;
  pokemonCharContainer.append(pokemonTitle);
}

starWarsShuffleBtn.addEventListener("click", function () {
  var randomNumber = generateRandomNumber(SWAPI_COUNT);
  fetchResource(SWAPI_URL, randomNumber, renderStarWarsCharacter);
});

starWarsVoteBtn.addEventListener("click", handleVote);

pokemonShuffleBtn.addEventListener("click", function () {
  var randomNumber = generateRandomNumber(POKEMON_COUNT);
  fetchResource(POKEAPI_URL, randomNumber, renderPokemon);
});

pokemonVoteBtn.addEventListener("click", handleVote);
