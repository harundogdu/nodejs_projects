const express = require('express')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

/* connect to Database */
mongoose.connect('mongodb://localhost/pcat-test-db',
    { useNewUrlParser: true }).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Not connected to database', err);
    });

/* Template Engine */
app.set('view engine', 'ejs')

/* middlewares */
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

/* routes */
app.get('/', photoController.getAllPhotos);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/details/:id', photoController.getPhotoDetails);
app.post('/photos', photoController.createPhoto);

app.listen(3000)