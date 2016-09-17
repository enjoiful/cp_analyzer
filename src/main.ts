import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FormsModule, NgModel} from '@angular/forms';
import { Component} from '@angular/core'

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent);
