const mongoose = require('mongoose');

const packlistSchema = new mongoose.Schema({
    day: String,
    date: String,
    outfitOne: String,
    outfitTwo: String,
    outfitThree: String
});

const Packlists = mongoose.model('Pack', packlistSchema);

module.exports = Packlists;