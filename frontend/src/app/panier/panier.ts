import { Component, OnInit, signal, computed } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { PanierService } from '../services/panier';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier implements OnInit {
  contenuPanier = signal<any[]>([]);

  // calcul du total : (Prix * Quantité) pour chaque article
  totalPanier = computed(() => {
    return this.contenuPanier().reduce((total, item) => total + ((item.prix || 0) * (item.quantite || 1)), 0);
  });

  constructor(private http: HttpClient, private panierService: PanierService) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier() {
    //this.http.get<any[]>('http://localhost:8000/api/panier').subscribe(data => {
    this.http.get<any[]>('https://api-panier.leducl.3il-rodez-projets.site/api/panier').subscribe(data => {
      this.contenuPanier.set(data);
    });
  }

  supprimerItem(id: string) {
    this.panierService.supprimer(id).subscribe(() => {
      this.chargerPanier(); 
    });
  }
}