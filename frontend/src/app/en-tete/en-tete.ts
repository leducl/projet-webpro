import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PanierService } from '../services/panier'; 

@Component({
  selector: 'app-en-tete',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './en-tete.html',
  styleUrl: './en-tete.css'
})
export class EnTete {
  panierService = inject(PanierService);
}