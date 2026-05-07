import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Produits } from './produits/produits';
import { Panier } from './panier/panier';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'produits', component: Produits },
  { path: 'panier', component: Panier }
];