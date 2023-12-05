const express = require('express');
const path = require('path');
// const morgan = require('morgan');

let score = 0;

// const mongoose = require('mongoose');

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const app = express();

// mongoose.connect('mongodb://localhost:27017/trialdb')
//     .then(() => {
//         console.log("Mongo Connection OPEN!")
//     })
//     .catch(err => {
//         console.log("Oh no Mongo connection ERROR!")
//         console.log(err)
//     })


app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

// app.use(morgan('tiny'));
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next();
// })

// app.use((req, res, next) => {
//     console.log('this is my first middleware');
//     next();
// })

app.get('/', (req, res) => {

    res.render('pages/Home',{path:req.path});
})

app.get('/About', (req, res) => {
    res.render('pages/About',{path:req.path});
})

app.get('/IT%20Services', (req, res) => {
    res.render('pages/ITServices',{path:req.path});
})

app.get('/New%20Hire%20Information', (req, res) => {
    res.render('pages/NewHireInf',{path:req.path});
})

app.get('/Travel%20Support', (req, res) => {
    res.render('pages/TravelSupp',{path:req.path});
})

app.get('/HR%20Portal', (req, res) => {
    res.render('pages/HRPortal',{path:req.path});
})

// getting the response from the Chatbot
app.post('/chat', async(req, res) => {
    
})

app.use((req, res, next) => {
    res.send('error 404, page not found!');
})

app.listen(8000, () =>{
    console.log("listening on port 8000");
})