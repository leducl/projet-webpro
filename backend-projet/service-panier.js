const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // On ajoute ObjectId ici

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
let db;

async function getMongoDb(req, res, next) {
    try {
        if (!db) {
            await client.connect();
            db = client.db('projet_sap');
        }
        req.db = db;
        next();
    } catch (err) {
        res.status(500).json({ erreur: "Erreur de connexion MongoDB" });
    }
}

// 1. Lire le panier
app.get('/api/panier', getMongoDb, async function (req, res) {
    try {
        const panier = await req.db.collection('panier').find().toArray();
        res.json(panier);
    } catch (err) {
        res.status(500).json({ erreur: "Erreur de lecture" });
    }
});

// 2. Ajouter au panier (MÉTHODE PRO)
app.post('/api/panier', getMongoDb, async function (req, res) {
    try {
        const produit = req.body;
        const nomProduit = produit.nom || produit.nomDuProduit;

        // On cherche si le fruit est DÉJÀ dans la base de données
        const existant = await req.db.collection('panier').findOne({ nom: nomProduit });

        if (existant) {
            // S'il existe : On ajoute juste +1 à la quantité
            await req.db.collection('panier').updateOne(
                { _id: existant._id },
                { $inc: { quantite: 1 } }
            );
        } else {
            // S'il n'existe pas : On le crée avec une quantité de 1
            produit.quantite = 1;
            produit.nom = nomProduit;
            await req.db.collection('panier').insertOne(produit);
        }

        res.json({ message: "Panier mis à jour !" });
    } catch (err) {
        res.status(500).json({ erreur: "Erreur d'insertion" });
    }
});

// 3. Supprimer du panier (MÉTHODE PRO)
app.delete('/api/panier/:id', getMongoDb, async function (req, res) {
    try {
        const idToDelete = req.params.id;
        // On récupère l'article
        const item = await req.db.collection('panier').findOne({ _id: new ObjectId(idToDelete) });

        if (item && item.quantite > 1) {
            // Si on en a plusieurs, on enlève juste 1 à la quantité (-1)
            await req.db.collection('panier').updateOne(
                { _id: new ObjectId(idToDelete) },
                { $inc: { quantite: -1 } }
            );
        } else {
            // S'il n'en reste qu'un seul, on supprime carrément la ligne
            await req.db.collection('panier').deleteOne({ _id: new ObjectId(idToDelete) });
        }

        res.json({ message: "Produit retiré !" });
    } catch (err) {
        res.status(500).json({ erreur: "Erreur de suppression" });
    }
});

app.listen(8000, function(){
    console.log('Service Panier écoute sur le port 8000');
});