const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose specific stuff
var contactschema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
});
var contact = mongoose.model('contact', contactschema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname,'views')) // Set the views directory

app.get('/', (req, res)=>{
    
const params = { }
    
    res.status(200).render('home.pug', params);

})
app.get('/contact', (req, res)=>{
    
const params = { }
    
    res.status(200).render('contact.pug', params);

})
app.post('/contact', (req, res)=>{
    var myData = new contact(res.body);
    myData.save().then(()=>{
        res.send("this iteam has been saved in the database")
    }).catch(()=>{
        res.status(400).send("iteam was not sent")
    });
    


})
//START THE SERVER
app.listen(port,()=>{
    console.log(`the applicition is started successfully on ${port}`);
})