class PokemonsController < ApplicationController

	def create
		trainer = Trainer.find_by(id: params["trainer_id"])
		

		if trainer.pokemons.length < 6
			name = Faker::Name.first_name
    		species = Faker::Games::Pokemon.name
    		pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    		render json: pokemon.to_json(:except => [:created_at, :updated_at])
    	end
	end

	def destroy
	  	Pokemon.find_by(id: params["pokemon_id"]).destroy
  	end
end
