const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

//Define Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bars engine and views directory
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) =>{
    res.render('index',{
        title: "Weather",
        name: "Andrew Mead"
    });
});

app.get('/about', (req,res) =>{
    res.render('about',{
        title: "About Me",
        name: "Chang Chi"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Matanda Hillary Phiri"
    })
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must include an address',
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

   
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must include a search term',
        });
    }

    console.log(req.query)
    res.send({
        products:[],
    })
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "Error 404",
        errorMessage: "Help article not found",
        name: "Matanda Hillary Phiri"

    });
});

app.get('*', (req,res)=>{
    res.render('404',{
        title: "Error 404",
        errorMessage: "Page not found",
        name: "Matanda Hillary Phiri"

    });
});

app.listen(3000, () => {
    console.log(`Server is up on port 3000`);
});

console.log(publicDirectoryPath);