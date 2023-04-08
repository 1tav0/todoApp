const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();

app.use(express.urlencoded({ extended: true }));
const mongodb = 'mongodb+srv://1tav0:Legendary1010@cluster0.v8wc8xz.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true).connect(mongodb).then( () => { 
    console.log('connected');
    app.listen(5000, () => {
    });
    }).catch( err => console.log(err));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    // const items = [
    //     { name: 'mobile phone', price: 1000 },
    //     { name: 'book', price: 30 },
    //     { name: 'computer', price: 2000 },
    // ]
    // res.render('index',{items});
    res.redirect('/get-items');
});

app.get('/get-items',(req,res) => {
    Item.find().then(result => {
        // res.send(result);
        res.render('index', {items: result});
    }).catch( err => console.log(err));
});

// app.get('/add-item', (req,res) => {
//     res.sendFile('./views/add-item.html',{root:__dirname});
// });
app.get('/add-item', (req,res) => {
    res.render('add-item');
});

app.post('/add-item', (req,res) => {
    console.log(req.body);
    const item = Item(req.body);
    item.save().then(()=>{
        res.redirect('/get-items');
    }).catch(err => console.log(err));
    
});

app.get('/items/:id', (req,res) => {
    console.log(req.params);
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log('result', result);
        res.render('item-detail', { item: result });
    });
});

app.delete('/items/:id', (req,res) => {
    // console.log(req.params);
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({redirect: '/get-items'});
    });
});

app.put('/items/:id', (req,res) => {
    // console.log(req.params);
    const id = req.params.id;
    Item.findByIdAndUpdate(id,req.body).then(result => {
        res.json({ msg: 'Updated Succesfully'});
    });
});

// defines a route that creates a new Item object and saves it to the database, 
// and return the result of the save operation to the client.
// app.get('/create-item',(req,res) => {
//     const item = new Item({
//         name: 'cputer',
//         price: 2000
//     });
//     item.save().then(result=>res.send(result));
// });

app.use((req,res) => {
    res.render('error');
});