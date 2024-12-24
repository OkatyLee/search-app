const fs = require('fs');
const path = require('path');

const documentsPath = path.join(__dirname, '../documents');

function readDocuments() {
    const files = fs.readdirSync(documentsPath); 
    return files.map(file => {
        const content = fs.readFileSync(path.join(documentsPath, file), 'utf-8');
        return { id: file, content };
    });
}


const documents = readDocuments();

const invertedIndex = {};

function buildInvertedIndex() {
    documents.forEach(doc => {
        const words = doc.content.toLowerCase().split(/\W+/);
        words.forEach(word => {
            if (!invertedIndex[word]) {
                invertedIndex[word] = [];
            }
            if (!invertedIndex[word].includes(doc.id)) {
                invertedIndex[word].push(doc.id);
            }
        });
    });
}

function searchInvertedIndex(query) {
    const words = query.toLowerCase().split(/\W+/);
    const results = words.reduce((acc, word) => {
        if (invertedIndex[word]) {
            if (acc.length === 0) {
                return invertedIndex[word];
            }
            return acc.filter(id => invertedIndex[word].includes(id));
        }
        return [];
    }, []);

    return documents.filter(doc => results.includes(doc.id));
}

buildInvertedIndex();

module.exports = { searchInvertedIndex };