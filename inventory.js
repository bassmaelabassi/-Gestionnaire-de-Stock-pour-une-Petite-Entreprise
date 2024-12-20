
const fs = require('fs');
const prompt = require('prompt-sync')(); // Initialize prompt-sync

const DATA_FILE = 'inventaire.json';
class Inventory {
    constructor() {
        this.products = [];
        this.loadProducts(); 
    }