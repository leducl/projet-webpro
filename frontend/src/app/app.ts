import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnTete } from './en-tete/en-tete';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnTete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}