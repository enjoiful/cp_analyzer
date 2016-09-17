/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';

describe('Service: Pokemon', () => {
  beforeEach(() => {
    addProviders([PokemonService]);
  });

  it('should ...',
    inject([PokemonService],
      (service: PokemonService) => {
        expect(service).toBeTruthy();
      }));
});
