const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
res.render('index', {
  title: 'Weather',
  name: 'Felix Curiel'  
})
})
app.get('/about', (req,res)=>{
res.render('About',{
    title: 'About Me',
    name: 'Felix Curiel'
})
})

app.get('/help', (req,res)=>{
    res.render('Help',{
        title: 'Information ',
        Help: 'Helpful information',
        title2: 'Help',
        name: 'Felix Curiel'
    })
    })
/*
app.get('',(req, res)=>{
res.send('<h1>Weather</h1>')
})*/

/*
app.get('/help', (req, res)=>{
  res.send([{
      name: 'Andrew'
      
  },{
      name:'Sara'
  }])
})
*/
/*
app.get('/about',(req, res)=>{
    res.send('<h1>Information</h1>')
    })*/

    app.get('/weather', (req, res)=>{

        if(!req.query.address){
            return res.send({
                error: 'You must provide an address'
            })
                }
                geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
if(error){
    return res.send({error})
}

forecast(latitude, longitude, (error, forecastData)=>{
if(error){
    return res.send({error})
}
res.send({
    forecast: forecastData,
    location,
    address: req.query.address
})
})
                })
       /*         
        res.send({
           forecast: 'It is snowing',
           location: 'Caracas',
           address: req.query.address
    })*/

})


app.get('/products',(req, res)=>{
    if(!req.query.search){
return res.send({
    error: 'You must provide a search term'
})
    }

    console.log(req.query.search)
    res.send({
    products:[]
    })
})

app.get('/help/*',(req, res)=>{
 //   res.send('Help article not found')
res.render('404',{
    title: '404',
    name: 'Felix Curiel',
    errorMessage: 'Help article not found'

})   
})

app.get('*',(req, res)=>{
//res.send('My 404 page')
res.render('404',{
    title: '404',
    name: 'Felix Curiel',
    errorMessage: 'Page not found'

})  
})

app.listen(port, ()=>{
   console.log('Server is up on port '+ port) 
})