
const fs = require('fs');
const prompt = require('prompt-sync')(); // Initialize prompt-sync

const DATA_FILE = 'inventaire.json';
class Inventory {
    constructor() {
        this.products = [];
        this.loadProducts(); 
    }

    // charger les produits a partir du fichier JSON
    loadProducts() {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE);
            this.products = JSON.parse(data);
        }
    }

    // enregistrer products to the JSON file
    saveProducts() {
        fs.writeFileSync(DATA_FILE, JSON.stringify(this.products, null, 2));
    }

    // Pour ajouter un produit.
    addProduct(name, description, quantite, prix) {
        const id = this.products.length + 1;
        const newProduct = { id, name, description, quantite: parseInt(quantite), prix: parseFloat(prix) }; // creer de nouveaux produits
        this.products.push(newProduct);
        this.saveProducts(); // enregistrer la liste de produits mise a jour
        console.log("L'opération a été réussie !");
    }

    // Pour afficher les produits
    listProducts() {
        if (this.products.length === 0) {
            console.log("Aucun produit disponible.");
        } else {
            console.log("Liste des produits :");
            this.products.forEach(product => {
                console.log(`ID: ${product.id}, Nom: ${product.name}, Description: ${product.description}, Quantité: ${product.quantite}, Prix: ${product.prix}`);
            });
        }
    }

    // Pour mettre à jour un produit
    updateProduct(id, quantite, prix) {
        const product = this.products.find(p => p.id === parseInt(id));
        if (product) {
            if (quantite !== undefined) product.quantite = parseInt(quantite);
            if (prix !== undefined) product.prix = parseFloat(prix);
            this.saveProducts();
            console.log("Produit mis à jour!");
        } else {
            console.log("Produit non disponible actuellement.");
        }
    }

    // Pour supprimer un produit.
    deleteProduct(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== parseInt(id));
        if (this.products.length < initialLength) {
            this.saveProducts(); // 
            console.log("Produit supprimé !");
        } else {
            console.log("Produit non disponible actuellement.");
        }
    }
}