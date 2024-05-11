const request = require('request')
var Bicicleta = require('../../model/bicicleta.model')
var server = require('../../bin/www')
var mongoose = require('mongoose')

var base_url = "http://localhost:3000/api/bicicletas";

describe('Bicicleta API', () => {
  beforeEach(function(done){
    var mongoDB = 'mongodb://localhost:5000/api/bicicletas';
    mongoose.connect(mongoDB,{useNewUrlParser:true})

    const db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open',function(){
      console.log("We are connect to test database");
      done();
    })
  });
  afterEach(function(done){
    Bicicleta.deleteMany({},function(err,success){
      if(err) console.log(err);
      done();
    })
  });

  describe('GET BICICLETAS /',()=>{
    it("Status 200",(done)=>{
      request.get(base_url,function(error,response,body){
        var result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.bicicletas.length).toBe(0);
        done();
      })
    })
  })
  describe('GET BICICLETAS/',()=>{
    it('Status 200', ()=>{
      expect(Bicicleta.allBicis.length).toBe(0);

      var a = new Bicicleta(1,'negra','urbana',[45.45643,48.5645])
      Bicicleta.add(a);
      

      request.get('http://localhost/3000/api/bicicletas', function(error,response,body){
        expect(response.statusCode).toBe(200);
      })
    })
  })
  //COMPLETAR?

  describe('POST BICICLETAS /create',() =>{
    it('STATUS 200', (done) => {
      var headers = {'content-type':'application/json'};
      var aBici = '{"id":10,"color":"rojo","modelo":"urbana","lat":-34,"lng":-54}';
      request.post({
        headers: headers,
        url: base_url+'/create',
        body: aBici
      }, function(error,response,body){
          expect(response.statusCode).toBe(200);
          var bici = JSON.parse(body).bicicleta;
          console.log(bici);
          expect(bici.color).toBe("rojo");
          expect(bici.ubicacion[0]).toBe(-34);
          expect(bici.ubicacion[1]).toBe(-54);
          done();
      })
    })
  })

})