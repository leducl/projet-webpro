import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  compteur = signal<number>(0);

  constructor(private http: HttpClient) {
    this.rafraichirCompteur();
  }
    
  rafraichirCompteur() {
    //this.http.get<any[]>('http://localhost:8000/api/panier').subscribe(data => {
    this.http.get<any[]>('/api/panier').subscribe(data => {
      const totalArticles = data.reduce((total, item) => total + (item.quantite || 1), 0);
      this.compteur.set(totalArticles);
    });
  }

  ajouter(produit: any) {
    //return this.http.post('http://localhost:8000/api/panier', produit).pipe(
    return this.http.post('/api/panier', produit).pipe(
      tap(() => this.rafraichirCompteur())
    );
  }

  supprimer(id: string) {
    //return this.http.delete(`http://localhost:8000/api/panier/${id}`).pipe(
    return this.http.delete(`/api/panier/${id}`).pipe(
      tap(() => this.rafraichirCompteur()) 
    );
  }
}