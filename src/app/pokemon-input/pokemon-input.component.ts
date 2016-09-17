
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonGameFile } from '../pokemonGameFile'

export class InputStats {
	attackIV: number;
	defenseIV: number;
	staminaIV: number;
	stardust: number;
}

export class PokemonResults {
	cpLevelCustom: number;
	cpLevel30: number;
	cpLevel40: number;
	stardustLevelCustom: number;
	stardustLevel30: number;
	stardustLevel40: number;
}

@Component({
	moduleId: module.id,
	selector: 'pokemon-input',
	templateUrl: 'pokemon-input.component.html',
	styleUrls: ['pokemon-input.component.css'],
	providers: [PokemonService]
})
export class PokemonInputComponent implements OnInit {

	@Input() customTrainerLevel: number;

	allPokemon: PokemonGameFile[];
	stardust: number[];
	selectedMon: PokemonGameFile = {
		name: null,
		baseAttack: null,
		baseDefense: null,
		baseStamina: null
	}

	inputStats: InputStats = {
		attackIV: null,
		defenseIV: null,
		staminaIV: null,
		stardust: null,
	}

	ngOnInit() {
		this.getPokemon();
		this.stardust = this.pokemonService.getStardustPerLevel();
	}

	ngOnChanges() {
		this.calculateMaxCP(this.inputStats);
		// this.calculateRequiredStardust(this.inputStats);
	}


	constructor(private pokemonService: PokemonService) { }

	getPokemon(): void {
		this.pokemonService.getPokemon().then(pokemon => this.allPokemon = pokemon).then(result => this.selectedMon = this.allPokemon[0]);
	}


	pokemonResults: PokemonResults = {
		cpLevel30: null,
		cpLevel40: null,
		cpLevelCustom: null,

		stardustLevel30: null,
		stardustLevel40: null,
		stardustLevelCustom: null
	}



	setPokemon(monName: string) {

		var Ctrl = this;
		console.log('monname', monName)
		this.allPokemon.forEach(function(mon) {  //standard select so shitty. only gives you a string, not full object
			if (mon.name === monName) {
				Ctrl.selectedMon = mon;
			}
		});

		this.calculateMaxCP(this.inputStats);
	}
	setAttack(attack: string) {
		this.inputStats.attackIV = parseInt(attack);
		this.calculateMaxCP(this.inputStats);
	}

	setDefense(defense: string) {
		this.inputStats.defenseIV = parseInt(defense);
		this.calculateMaxCP(this.inputStats);
	}

	setStamina(stamina: string) {
		this.inputStats.staminaIV = parseInt(stamina);
		this.calculateMaxCP(this.inputStats);
	}

	setStardust(stardust: string) {
		this.inputStats.stardust = parseInt(stardust);
		this.calculateRequiredStardust(this.inputStats);
	}


	maxPokemonLevel(trainerLevel: number): number {
		return (trainerLevel + 1.5) * 2
	}

	calculateCP(trainerLevel: number, individualValues: InputStats): number {

		var totalCpMultiplier = 0.095 * Math.sqrt(this.maxPokemonLevel(trainerLevel));
		var attack = (this.selectedMon.baseAttack + individualValues.attackIV) * totalCpMultiplier;
		var defense = (this.selectedMon.baseDefense + individualValues.defenseIV) * totalCpMultiplier;
		var stamina = (this.selectedMon.baseStamina + individualValues.staminaIV) * totalCpMultiplier;
		var cp = attack * Math.sqrt(defense) * Math.sqrt(stamina) / 10;

		return Math.floor(cp);
	}

	calculateMaxCP(inputStats: InputStats) {
		this.pokemonResults.cpLevel30 = this.calculateCP(30, inputStats);
		this.pokemonResults.cpLevel40 = this.calculateCP(40, inputStats);
		this.pokemonResults.cpLevelCustom = this.calculateCP(this.customTrainerLevel, inputStats);
	}

	stardustCalc(trainerLevel: number, requiredStardust: number): number {
		var Ctrl = this;

		function calcMinPokemonLevel(stardust: number): number {
			var stardustIndex = Ctrl.stardust.indexOf(stardust);
			return 2 * stardustIndex + 1;
		}

		function calcDustRequirementsForPokemonLevel(pokemonLevel: number): number {
			return Ctrl.stardust[Math.floor((pokemonLevel - 1) / 2)];
		}

		function minimumDustAlreadySpent(dustRequirement: number): number {

			var stardustIndex = Ctrl.stardust.indexOf(dustRequirement);
			var total = 0;

			Ctrl.stardust.forEach(function(stardust, index) {
				if (index < stardustIndex) {
					total += stardust * 4;
				}
			});

			return total;

		}

		function dustAmountForPokemonLevel(pokemonLevel:number){

			var allLevels = [];

			Ctrl.stardust.forEach(function(stardust){
				allLevels.push(stardust)
				allLevels.push(stardust)
				allLevels.push(stardust)
				allLevels.push(stardust)
			});

			console.log('alllevels', allLevels)


			var total = 0;
			allLevels.forEach(function(stardust, index){
				if ((index + 1) < (pokemonLevel)){
					console.log('sd', stardust)
					total += stardust;
				}
			})	

			return total;

		}

		var maxPokemonLevel = this.maxPokemonLevel(trainerLevel);
		console.log('max pkmn level', maxPokemonLevel, trainerLevel)
		var maxTotal = dustAmountForPokemonLevel(maxPokemonLevel);


		var minPokemonLevel = calcMinPokemonLevel(requiredStardust);
		var minReq = calcDustRequirementsForPokemonLevel(minPokemonLevel);
		var dustAlreadySpent = minimumDustAlreadySpent(minReq);

		console.log('max', maxTotal)
		console.log('already spent', dustAlreadySpent)

		return maxTotal - dustAlreadySpent;

	}

	calculateRequiredStardust(inputStats: InputStats) {
		this.pokemonResults.stardustLevel30 = this.stardustCalc(30, inputStats.stardust);
		this.pokemonResults.stardustLevelCustom = this.stardustCalc(this.customTrainerLevel, inputStats.stardust);
	}



}
