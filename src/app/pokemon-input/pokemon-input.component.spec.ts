/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { PokemonInputComponent } from './pokemon-input.component';

describe('Component: PokemonInput', () => {
  it('should create an instance', () => {
    let component = new PokemonInputComponent();
    expect(component).toBeTruthy();
  });
});
