const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c965b7b559106aa1b32a3e2d2118e779&query=37.8267'+latitude+','+longitude+'&units=f'
    request({url,json:true}, (error,{body}) => {
    if(error){
    callback('Unable to connect to weather service!',undefined)
    } else if(body.error) {
    callback('Unable to find location,Try another search',undefined)
    } else {
        //callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.'); 
        callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
   
       }
    })
    
    }


module.exports = forecast;
