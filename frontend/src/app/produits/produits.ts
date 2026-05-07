import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PanierService } from '../services/panier';

@Component({
  selector: 'app-produits',
  standalone: true,
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {
  listeFruits = signal<any[]>([]);
  messageToast = signal<string | null>(null);

  constructor(private http: HttpClient, private panierService: PanierService) {}

  ngOnInit(): void {
    //this.http.get<any[]>('http://localhost:8080/api/produits').subscribe(data => {
    this.http.get<any[]>('https://api-produits.leducl.3il-rodez-projets.site/api/produits').subscribe(data => {
      this.listeFruits.set(data);
    });
  }

  ajouter(fruit: any) {
    const articlePourPanier = { ...fruit };
    delete articlePourPanier._id;
    this.panierService.ajouter(articlePourPanier).subscribe(() => {
      this.afficherToast(`${fruit.nom} ajouté au panier !`);
    });
  }

  afficherToast(message: string) {
    this.messageToast.set(message);
    setTimeout(() => {
      this.messageToast.set(null); 
    }, 3000);
  }
}