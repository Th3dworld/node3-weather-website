const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=651dba0fc67a0636d92f8b20be598c1e&query=${encodeURIComponent(longitude)}, ${encodeURIComponent(latitude)}&units=f`;

    request({url:url, json:true}, (error,{body}) =>{
        if(error){
            callback(`Unable to connect to network.`, undefined)
        }else if(body.error){
            callback(`You made an invalid request`, undefined);
        }else{
            const place = body.location.name;
            const desc = body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const tempFeelslike = body.current.feelslike;
            const windSpeed = body.current.wind_speed;

            callback(undefined, `It is ${desc} in ${place} with a temperature of ${temp}, and it feels like ${tempFeelslike}.
            with a wind speed of ${windSpeed}`);
        }
    })
}

module.exports = forecast;