const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function createTrainers(trainers) {
	console.log(trainers)
	const trainers_main = document.getElementById("trainers")
	trainers.forEach((trainer) => {
		const trainer_div = document.createElement('div')
		trainer_div.className = "card"
		trainer_div.setAttribute("data-id", trainer.id)
		let trainer_para = document.createElement('p')
		trainer_para.innerText = trainer.name
		let add_pokemon_button = document.createElement('button')
		add_pokemon_button.setAttribute("data-trainer-id", trainer.id)
		add_pokemon_button.innerText = "Add Pokemon"
		let ul = generatePokemonList(trainer.pokemons)
		trainer_div.append(trainer_para, add_pokemon_button, ul)
		trainers_main.append(trainer_div)
		add_pokemon_button.addEventListener("click", function() {
			fetch(POKEMONS_URL, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({trainer_id: trainer.id})
				})
			.then(function(response) {
				return response.json()
			})
			.then(function(pokemon) {
				createPokemon(pokemon, ul)
			})
		})
	})
}

function generatePokemonList(pokemons) {
	let ul = document.createElement('ul')
	pokemons.forEach((pokemon) => {
		createPokemon(pokemon, ul)
	})
	return ul
}

function createPokemon(pokemon, ul) {
	const li = document.createElement('li')
		li.innerText = `${pokemon.nickname} (${pokemon.species})`
		const release_button = document.createElement('button')
		release_button.innerText = "Release"
		release_button.className = "release"
		release_button.setAttribute("data-pokemon-id", pokemon.id)
		li.append(release_button)
		ul.append(li)
		release_button.addEventListener("click", function() {
			fetch(`${BASE_URL}/pokemons/${pokemon.id}`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({pokemon_id: pokemon.id})
				})
			ul.removeChild(li)
		})
}

document.addEventListener('DOMContentLoaded', function() {   
   fetch(TRAINERS_URL)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(trainers) {
	  	createTrainers(trainers)
	  })
	  .catch(function(error) {
	    alert("There was an error!");
	    console.log(error)
	  }) 

})