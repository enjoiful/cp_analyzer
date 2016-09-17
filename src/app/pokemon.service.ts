import { Injectable } from '@angular/core';
import { PokemonGameFile } from './pokemonGameFile'
import { POKEMON_DATA } from './pokemonGameFileData'

@Injectable()
export class PokemonService {

	getPokemon(): Promise<PokemonGameFile[]> {
		return Promise.resolve(POKEMON_DATA);
	}

	getStardustPerLevel(): number[] {
		return STARDUST_PER_LEVEL;
	}

	constructor() { }

}

export class stardust_per_level {
	dust: number;
	level: number
}

export const STARDUST_PER_LEVEL: number[] = [200, 400, 600, 800, 1000, 1300, 1600, 1900, 2200, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000];

