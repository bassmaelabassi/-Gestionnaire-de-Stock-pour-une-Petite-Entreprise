
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

const inven = new Inventory();
let choix;

do {
    console.log("\n*** Gestionnaire de Stock ***\n");
    console.log("1. Ajouter un produit.");
    console.log("2. Afficher tous les produits.");
    console.log("3. Mettre à jour un produit.");
    console.log("4. Supprimer un produit.");
    console.log("5. Quitter");

    choix = parseInt(prompt("Choisissez une option : "));

    switch (choix) {
        case 1:
            const name = prompt("Nom du produit : ");
            const description = prompt("Description : ");
            const quantity = prompt("Quantité : ");
            const price = prompt("Prix : ");
            if (name && description && !isNaN(quantity) && !isNaN(price)) {
                inven.addProduct(name, description, quantity, price);
            } else {
                console.log("Entrées invalides.");
            }
            break;
        case 2:
            inven.listProducts();
            break;
        case 3:
            const idToUpdate = prompt("ID du produit à mettre à jour : ");
            const newQuantity = prompt("Nouvelle quantité (laisser vide pour ne pas changer) : ");
            const newPrice = prompt("Nouveau prix (laisser vide pour ne pas changer) : ");
            inven.updateProduct(
                idToUpdate,
                newQuantity ? parseInt(newQuantity) : undefined,
                newPrice ? parseFloat(newPrice) : undefined
            );
            break;
        case 4:
            const idToDelete = prompt("ID du produit à supprimer : ");
            inven.deleteProduct(idToDelete);
            break;
        case 5:
            console.log("see you !");
            break;
        default:
            console.log("Choix invalide.");
    }
} while (choix !== 5);