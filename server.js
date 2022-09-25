const express = require('express');
const methodOverride  = require('method-override');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const Packlists = require('./models/packlist.js');
const Outfits = require('./models/outfits.js');

const cors = require('cors');
const db = mongoose.connection;


//middleware//
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3003;
const MONGODB_URI  = process.env.MONGODB_URI 

// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongo disconnected'));

//PackLists BELOW//
//create route
app.post('/pack', (req, res) => {
    Packlists.create(req.body, (err, createdList) => {
        res.json(createdList);
    });
});
app.get('/' , (req, res) => {
    res.send('Express Backend for Heroku');
  });
//index route
app.get('/pack', (req, res) => {
    Packlists.find({}, (err, foundList) => {
        res.json(foundList);
    });
});
//delete route
app.delete('/pack/:id', (req, res) => {
    Packlists.findByIdAndRemove(req.params.id, (err, deleted) => {
        res.json(deleted);
    });
});
//edit route
app.put('/pack/:id', (req, res) => {
    Packlists.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updated) => {
        res.json(updated);
    });
});

//Outfits//
//create route
app.post('/outfit', (req, res) => {
    Outfits.create(req.body, (err, created) => {
        res.json(created);
    });
});

//index route
app.get('/outfit', (req, res) => {
    Outfits.find({}, (err, found) => {
        res.json(found);
    });
});
//delete route
app.delete('/outfit/:id', (req, res) => {
    Outfits.findByIdAndRemove(req.params.id, (err, deleted) => {
        res.json(deleted);
    });
});
//edit route
app.put('/outfit/:id', (req, res) => {
    Outfits.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updated) => {
        res.json(updated);
    });
});

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
mongoose.connect(MONGODB_URI, () => {
    console.log('whatever')
})
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
})
