const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoibWF0YW5kYSIsImEiOiJjbHk2OTVjNTAwOGRpMmtvaXdtczhxczAzIn0.P01uwf3-pCZY6fxiBjCoqQ&limit=1`;

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback(`Unable to connect to geocoder.`, undefined);
        }else if(!body.features.length){
            callback(`Unable to find location. Try another place`, undefined);
        }else{
            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude : body.features[0].geometry.coordinates[1],              
                location: body.features[0].properties.full_address
            });
        }
    });

}

module.exports =  geocode;