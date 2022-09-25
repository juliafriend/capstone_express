const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    type: String,
    items: String,
    image: String,
});

const Outfits = mongoose.model('Outfit', outfitSchema);

module.exports = Outfits;