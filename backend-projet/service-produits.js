const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb'); // Utilisation du client natif du cours

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
let db;

// Le MIDDLEWARE exact demandé dans le cours
async function getMongoDb(req, res, next) {
    try {
        if (!db) {
            await client.connect();
            db = client.db('projet_sap');
        }
        req.db = db;
        next();
    } catch (err) {
        console.error('Erreur MongoDB:', err);
        res.status(500).json({ erreur: "Erreur de connexion MongoDB" });
    }
}

// ROUTAGE avec le Middleware
app.get('/api/produits', getMongoDb, async function (req, res) {
    try {
        const produits = await req.db.collection('produits').find().toArray(); // Lecture selon le cours
        res.json(produits);
    } catch (err) {
        res.status(500).json({ erreur: "Erreur de lecture", details: err.message });
    }
});

// Démarrage du serveur
app.listen(8080, function(){
    console.log('Service Produits écoute sur le port 8080');
});