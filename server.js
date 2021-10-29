const express = require('express');
const router = require('./router');
require('./config/mongoose')

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true})) 
app.use(router)



app.listen(2021,() => {
    console.log('connected to port 2021 (Tweeter)...');
});
