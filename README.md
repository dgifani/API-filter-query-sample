# Arabica Coffee Varieties of the World ☕️

Coffee, that liquid black gold that most developers are completely hooked on and
without it would not be able to function properly. Coffea arabica, or Arabica
coffee, is known all around the world for it great taste. Lesser known is the
fact that Arabica coffee is not just one type of bean, but that it’s a species
that has many, many varieties.

## API Filter query Sample without using Database 

Build a small API using Node.js to Filter Varieties


**Live URL**:   https://coffee2019.herokuapp.com/

# Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [How to use API](#how-to-use)
- [How API works](#how-API-works)
- [Deployment](#deployment)
- [Docker](#docker)
- [License](#license)

## Features
--------
- Return a list with all varieties;
- Return a list filtering varieties based on any and all of the values of any and all of their properties. Filters must be applied
using the AND operator;

## Prerequisites
-------------

- [Node.js 10.13.0+](http://nodejs.org)
 
## Getting Started
---------------
To get start clone the repository:


### Get the latest snapshot
git clone https://github.com/dgifani/API-filter-query-sample 

### Change directory
cd API-filter-query-sample

### Install NPM dependencies
npm install

### Then simply start App
npm start

### For Testing
npm test 

    Test the Coffee API, assume API running on   ../server.js    √ Test GET request on Path  / to return all the varieties
        √ Test GET request on Path  /?name=value to return response based on name filter    √ Test GET request on Path  /?bean_size=value to return response based on bean_size filter    √ Test GET request on Path  /?quality_potential=value to return response based on
    quality_potential filter
        √ Test GET request on Path  /?yield=value  to return response based on yield filter
        √ Test GET request on Path  /?leaf_rust=value to return response based on leaf_rust filter
        √ Test GET request on Path  /?coffee_berry_disease=value to return response based
    on coffee_berry_disease filter
        √ Test GET request on Path  /?nematodes=value to return response based on nematodes filter
        √ Test GET request on Path  /?producing_countries=value to return response based on producing_countries filter
        √ Test GET request on Path  /?name=b&bean_size=g&quality_potential=good&yield=m&leaf_rust=sus&coffee_berry_disease=sus&nematodes=sus&producing_countries=bra&producing_countries=rwa to return response based on all filters

    Test the Coffee API for Invalid request, assume API running on ../server.js
        √ should return 404 if requested user does not exist


    11 passing (113ms

## Project Structure
-----------------

    | Name                               | Description                             |
    | ---------------------------------- | --------------------------------------- |
    | **test**/test.js                   | Test Script                             |
    | coffea-arabica.json                | Data input                              |
    | server.js                          | The Node Express server file.           |
    | package.json                       | NPM dependencies.                       |
    | Dockerfile                         | Build Docker Container.                 |



## List of Packages
----------------

    | Package                         | Description                                |
    | ------------------------------- | ------------------------------------------ |
    | express                         | Minimalist web framework Version "^4.16.4" |
    | mocha                           | Test framework. Version "^5.2.0"           |
    | chai                            | BDD/TDD assertion library. Version "^4.2.0"|
    | chai-http                       | BDD/TDD assertion library. Version "^4.2.1"|


## How to use API

   Returns the array of varieties, or a filtered  array of varieties based on query String params

* **URL**

       The URL Structure (base url, port, /)
       Example  http://localhost:3000/

* **Method:**
       `GET` 
       This API only supprrt GET method

  
  
*  **URL Query**

       * @param {String} (optional) name - Query string for name filter
       * @param {String} (optional) bean_size - Query string for bean_size filter
       * @param {String} (optional) quality_potential - Query string for quality_potential filter
       * @param {String} (optional) yield - Query string for yield filter
       * @param {String} (optional) leaf_rust - Query string for leaf_rust filter
       * @param {String} (optional) coffee_berry_disease - Query string for coffee_berry_disease filter
       * @param {String} (optional) nematodes - Query string for nematodes filter
       * @param {String} (optional) producing_countries - Query string for producing_countries filter
    sample request: https://coffee2019.herokuapp.com/?name=b&quality_potential=good&yield=m&leaf_rust=sus&coffee_berry_disease=sus&nematodes=sus&producing_countries=bur&producing_countries=rwa

   **Optional:**
    `All queries are optional` 

* **Success Response:**
  
   `return the JSON Array included find items`
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "name": "Bourbon",
            "bean_size": "AVERAGE",
            "quality_potential": "VERY_GOOD",
            "yield": "MEDIUM",
            "disease_resistancy": [
                {
                    "leaf_rust": "SUSCEPTIBLE"
                },
                {
                    "coffee_berry_disease": "SUSCEPTIBLE"
                },
                {
                    "nematodes": "SUSCEPTIBLE"
                }
            ],
            "producing_countries": [
                "Burundi",
                "Colombia",
                "Costa Rica",
                "Ethiopia",
                "Honduras",
                "Indonesia",
                "Mexico",
                "Panama",
                "Papua New Guinea",
                "Rwanda",
                "Tanzania",
                "Thailand",
                "Vietnam"
            ]
        }
    ]
    ```
* **Error Response**
  * **Code:** 404 <br />
    **Content:** 

            <!DOCTYPE html>
             <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Error</title>
            </head>
            <body>
                <pre>Cannot PUT /assas</pre>
            </body>
            </html>



# How API Works

`Please refer to Server.js and ./tests/test.js to see code comments for each section of code`


# Deployment

#### Heroku
    The below information valid for gitlab CI/CD to deploy in Heroku
* Add yml file to root directory of the project
* Create a new App in Heroku
* Add API-Key to gitlab Env file
* Give it a shot    
         


#### Docker
       Docker allows the code deployable to any docker compatible platform
#### Build image 
* docker build -t your-image-name>/coffeeimg01 .

#### run image in container
* docker run -p 3000:3000 -d your-image-name>/coffeeimg01:latest

#### Get container ID
* $ docker ps

#### Print app output
* $ docker logs `container id` 


#### Enter the container
* $ docker exec -it `container id` /bin/bash
  
### Test
* curl -i localhost:3000  

# License
MIT
