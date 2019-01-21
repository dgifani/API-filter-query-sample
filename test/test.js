const chai     = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server').app;
const isDiseaseResistant = require('../server').isDiseaseResistant;
const hasCountry = require('../server').hasCountry;
     
chai.use(chaiHttp);      
const expect = chai.expect;

let queryString =  { 
    name: 'b',
    bean_size: 'g',
    quality_potential: 'good',
    yield: 'm',
    leaf_rust: 'sus',
    coffee_berry_disease: 'sus',
    nematodes: 'sus',
    producing_countries: [ 'bur', 'rwa' ]
 } 
/**
  *  Expected Response for all filters based on queryString
  * [
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
 */

 /**
  * In this test we are going to test without query and each query string params
  * At end test all the queries together  
  */
describe('Test the Coffee API, assume API running on ../server.js', () => {
    
    it('Test GET request on Path  / to return all the varieties',  (done) => {
       
        chai.request(server)        
        .get('/')
        .then((res) => {  
            
            try{
            
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.be.true;  
                
                done();    
            
            }catch(err){                
                done(err);
                throw err;
            }
        }).catch(function(err){
            done(err);                           
        })
    });

    it('Test GET request on Path  /?name=value to return response based on name filter', (done) => {
        /**
          * @param {String} name - Query string for name filter 
        */     
        chai.request(server)        
        .get('/')
        .query(
            {'name' : queryString['name']}
        )
        .then((res) => { 
        
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                expect(res.body[0].name).to.match(new RegExp(queryString['name'], 'gi'))      
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })

    });

    it('Test GET request on Path  /?bean_size=value to return response based on bean_size filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'bean_size' : queryString['bean_size']}
        )
        .then((res) => { 
         /**
          * @param {String} bean_size - Query string for bean_size filter
         */   
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                expect(res.body[0].bean_size).to.match(new RegExp(queryString['bean_size'], 'gi'));      
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })

    });

    it('Test GET request on Path  /?quality_potential=value to return response based on quality_potential filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'quality_potential' : queryString['quality_potential']}
        )
        .then((res) => { 
        /**
          * @param {String} quality_potential - Query string for quality_potential filter
         */
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                expect(res.body[0].quality_potential).to.match(new RegExp(queryString['quality_potential'], 'gi'));      
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    });

    it('Test GET request on Path  /?yield=value  to return response based on yield filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'yield' : queryString['yield']}
        )
        .then((res) => { 
        /**
          * @param {String} yield - Query string for yield filter
         */
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                expect(res.body[0].yield).to.match(new RegExp(queryString['yield'], 'gi'));      
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    });

    it('Test GET request on Path  /?leaf_rust=value to return response based on leaf_rust filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'leaf_rust' : queryString['leaf_rust']}
        )
        .then( async(res) => { 
        /**
          * @param {String} leaf_rust - Query string for leaf_rust filter
         */
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
               
                let isMatch =  isDiseaseResistant(res.body[0], queryString['leaf_rust'] ,'leaf_rust' )               
                expect(isMatch).to.be.true;
               
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    })
    it('Test GET request on Path  /?coffee_berry_disease=value to return response based on coffee_berry_disease filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'coffee_berry_disease' : queryString['coffee_berry_disease']}
        )
        .then( async(res) => { 
         /**
          * @param {String} coffee_berry_disease - Query string for coffee_berry_disease filter
         */
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                
                let isMatch =  isDiseaseResistant(res.body[0], queryString['coffee_berry_disease'] ,'coffee_berry_disease' );                
                expect(isMatch).to.be.true;
                
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    })
    it('Test GET request on Path  /?nematodes=value to return response based on nematodes filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'nematodes' : queryString['nematodes']}
        )
        .then( async(res) => { 
            /**
              *  @param {String} nematodes - Query string for nematodes filter            
            */
           try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                
                let isMatch =  isDiseaseResistant(res.body[0], queryString['nematodes'] ,'nematodes' );
                expect(isMatch).to.be.true;
                
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    })
    it('Test GET request on Path  /?producing_countries=value to return response based on producing_countries filter', (done) => {
        chai.request(server)        
        .get('/')
        .query(
            {'producing_countries' : queryString['producing_countries']}
        )
        .then( async(res) => { 
            /**
              *  @param {String} neproducing_countriesmatodes - Query string for producing_countries filter            
            */
            try{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                
                let isMatch =  hasCountry(res.body[0], queryString['producing_countries'])             
                expect(isMatch).to.be.true;
                
                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })  
    })
    it('Test GET request on Path  /?name=b&bean_size=g&quality_potential=good&yield=m&leaf_rust=sus&coffee_berry_disease=sus&nematodes=sus&producing_countries=bra&producing_countries=rwa to return response based on all filters', (done) => {
        chai.request(server)        
        .get('/')
        .query(queryString)
        .then(async (res) => {                
            try{
                /**
                 * Returns the array of varieties, or a filtred array of varieties based on query String params
                 *
                 * @param {String} name - Query string for name filter
                 * @param {String} bean_size - Query string for bean_size filter
                 * @param {String} quality_potential - Query string for quality_potential filter
                 * @param {String} yield - Query string for yield filter
                 * @param {String} leaf_rust - Query string for leaf_rust filter
                 * @param {String} coffee_berry_disease - Query string for coffee_berry_disease filter
                 * @param {String} nematodes - Query string for nematodes filter
                 * @param {String} producing_countries - Query string for producing_countries filter
                 * 
                 * sample request: http://localhost:3000/?name=b&bean_size=g&quality_potential=good&yield=m&leaf_rust=sus&coffee_berry_disease=sus&nematodes=sus&producing_countries=bra&producing_countries=rwa
                */
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').does.not.empty;
                expect(res.body[0].name).to.match(new RegExp(queryString['name'], 'gi'));
                expect(res.body[0].bean_size).to.match(new RegExp(queryString['bean_size'], 'gi'));
                expect(res.body[0].quality_potential).to.match(new RegExp(queryString['quality_potential'], 'gi'));  
                expect(res.body[0].yield).to.match(new RegExp(queryString['yield'], 'gi'));                      
                
                let isMatch = await isDiseaseResistant(res.body[0], queryString['leaf_rust'] ,'leaf_rust' )               
                expect(isMatch).to.be.true;
                
                isMatch = await  isDiseaseResistant(res.body[0], queryString['coffee_berry_disease'] ,'coffee_berry_disease' ) 
                expect(isMatch).to.be.true;
                
                isMatch = await isDiseaseResistant(res.body[0], queryString['nematodes'] ,'nematodes' )
                expect(isMatch).to.be.true;

                isMatch = await hasCountry(res.body[0], queryString['producing_countries']);         
                expect(isMatch).to.be.true;

                done();

            }catch(err){                               
                throw err
            }               

        }).catch(function(err){
            done(err)   
            throw err        
        })
    })
  
})

/**
  * In this test we are going to test invalid request like Post method or any not match API call with GET "/"
  * 
  */
describe('Test the Coffee API for Invalid request, assume API running on ../server.js', () => {

    it('should return 404 if requested URL does not exist', (done) => {
        /**
             * If request to any other methods than GET, or pathname not equal to be '/' it returns 404   
        */
        
        chai.request(server)        
        .post('/')
        .then((res) => {  
            
            expect(res).to.have.status(404);                  
            done();    

        }).catch(function(err){
            throw err        
        })
    })
})


