'use strict'
const express = require('express');
const varieties = require('./coffea-arabica');
const app = express();
const port = process.env.PORT || 3000;


/**
   * Returns the array of varieties, or a filtred array of varieties based on query String params
   * This API using Array.Filter Prototype and String.Match Prototype to find and filter the records
   * Based on query string params, check the field and then use RegExp to find globally and case insensetive for match
   * Using functional programming and pure functions make code optimized and efficent  
   * First assign the varieties to result incase there is no filter applied 
   * Filter function will include record if match function return true. Result will be updated accordingly (referenced)  
   * 
   * @param {String} (optional) name - Query string for name filter
   * @param {String} (optional) bean_size - Query string for bean_size filter
   * @param {String} (optional) quality_potential - Query string for quality_potential filter
   * @param {String} (optional) yield - Query string for yield filter
   * @param {String} (optional) leaf_rust - Query string for leaf_rust filter
   * @param {String} (optional) coffee_berry_disease - Query string for coffee_berry_disease filter
   * @param {String} (optional) nematodes - Query string for nematodes filter
   * @param {String} (optional) producing_countries - Query string for producing_countries filter
   * 
   * sample request: http://localhost:3000/?name=b&bean_size=g&quality_potential=good&yield=m&leaf_rust=sus&coffee_berry_disease=sus&nematodes=sus&producing_countries=bra&producing_countries=rwa
   */
app.get('/', (req, res) => {
  let result = varieties;

  if (req.query.name) {
    result = result.filter((variety) => variety.name.match(new RegExp(req.query.name, 'gi')));
  }

  if (req.query.bean_size) {
    result = result.filter((variety) => variety.bean_size.match(new RegExp(req.query.bean_size, 'gi')));
  }

  if (req.query.quality_potential) {
    result = result.filter((variety) => variety.quality_potential.match(new RegExp(req.query.quality_potential, 'gi')));
  }

  if (req.query.yield) {
    result = result.filter((variety) => variety.yield.match(new RegExp(req.query.yield, 'gi')));
  }

  if (req.query.leaf_rust) {
    result = result.filter((variety) => isDiseaseResistant(variety, req.query.leaf_rust, 'leaf_rust'));
  }

  if (req.query.coffee_berry_disease) {
    result = result.filter((variety) => isDiseaseResistant(variety, req.query.coffee_berry_disease, 'coffee_berry_disease'));
  }

  if (req.query.nematodes) {
    result = result.filter((variety) => isDiseaseResistant(variety, req.query.nematodes, 'nematodes'));
  }

  if (req.query.producing_countries) {
    result = result.filter((variety) => hasCountry(variety, req.query.producing_countries));
  }

  res.send(result);
})

app.listen( port, () => console.log(`Server running on port ${port}!`));



/**
   * Returns true or false after checking if the query value is in any of the disease resistancy objects 
   * This function handle filtering three type of disease_resistancy
   * It check which prop going to match and then use String Match Prototype to return true for found match and false for not found
   * This is effecinet to not repeating code and re-use 
   * 
   * @param {Object} variety - The variety object
   * @param {String} query - The query string
   * @param {String} prop - The property or key being queried
   */
function isDiseaseResistant (variety, query, prop) {
  let status = false;
  variety.disease_resistancy.map((resistancy) => {
    Object.keys(resistancy).forEach((key) => {
      if (key === prop && resistancy[key].match(new RegExp(query, 'gi'))) {
        status = true;
      }
    });
  })

  return status;
}


/**
   * Returns true or false after checking if the query value or values are in the producing_countries array of the variety
   * This function optimized for one or multiple entries of query
   * This function check if input is Array going to map through query and use Array filter to filter countries. 
   * If any of result of filter is empty then this query will not match totally and return false.   
   * 
   * 
   * @param {Object} variety - The variety object
   * @param {String} query - The query string or query array
   */
 function hasCountry(variety, query) {
  let status = false; 
    if (Array.isArray(query)) {   
      status = true;  
      query.map((q) => {        
        if(variety.producing_countries.filter(country =>
          country.match(new RegExp(q, 'gi'))).length == 0) {
            status = false;  
        }; 
      })
    } else {
      variety.producing_countries.map((country) => {
      if (country.match(new RegExp(query, 'gi'))) {
        status = true;
      }
     })
    }
 
  return status
}


module.exports.isDiseaseResistant  = isDiseaseResistant;
module.exports.hasCountry  = hasCountry;

module.exports.app =  app 