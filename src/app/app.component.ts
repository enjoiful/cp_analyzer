import { Component } from '@angular/core';
import { PokemonInputComponent } from './pokemon-input/pokemon-input.component';
import { PokemonGameFile } from './pokemonGameFile'


export class Hero {
  id: number;
  name: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [PokemonInputComponent]
})



export class AppComponent {
  title = 'app works!';

  pokemon: Hero = { id: 1, name: 'squirtle' };

  customTrainerLevel = 24;



}
