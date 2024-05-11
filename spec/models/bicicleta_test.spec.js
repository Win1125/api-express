var Bicicleta = require('../../model/bicicleta.model')
const mongoose = require('mongoose');

describe('Bicicleta', function () {
  beforeEach(function () {
    var mongoDB = 'mongodb+srv://edwineladio73:EqsbZSDilDptMr6k@redbicicletas.w1bjjbt.mongodb.net/'
    mongoose.connect(mongoDB);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongoose Error Connection: '));
    db.once('open', function() {
      console.log('mongodb connected successfully');
      done();
    })
  })

  afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success){
      if(err) console.log(err);
      done();
    })
  })

  describe('Bicicleta.createInstance', () => {
    it('Crea una instancia', () => {
      var b1 = Bicicleta.createInstance(1,	'Rojo', 'Urbano',	[4.607466,-74.216151]);

      expect(b1.code).toBe(1);
      expect(b1.color).toBe('Rojo');
      expect(b1.modelo).toBe('Urbano');
      expect(b1.ubicacion[0]).toEqual(4.607466);
      expect(b1.ubicacion[1]).toEqual(-74.216151);
    })
  })

  describe('Bicicleta.allBicis', () => {
    it('Comienza vacía', (done) => {
      Bicicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0);
        done();
      })
    })
  })

  describe('Bicicleta.add', () => {
    it('Agrega solo una bici', (done) => {
      var aBici = new Bicicleta({code: 1, color: 'verde',modelo:"urbana"});
      Bicicleta.add(aBici, function(err,newBici){
        if (err) console.log(err);
        Bicicleta.allBicis(function(err, bicis){
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);

          done();
        })

      })
    })
  })

  describe('Bicicleta.findByCode',() => {
    it('debe devolver la bici con code 1', (done) =>{
      Bicicleta.allBicis(function(err,bicis){
        expect(bicis.length).toBe(0);

        var aBici = new Bicicleta({code:1, color:'verde', modelo:'urbana'});
        Bicicleta.add(aBici,function(error,newBici){
          if(err) console.log(err);

          var abici2 = new Bicicleta({code:2, color:'roja', modelo:'urbana'});
          Bicicleta.add(abici2,function(err,newBici){
            if(err) console.log(err);
            Bicicleta.findByCode(1,function(err,targetBici){
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);

              done();
            })
          })
        })
      })
    })
  })


})

/*
beforeEach(() => {
  Bicicleta.allBicis.length = [];
})

describe('Bicicleta.allBicis', () => {
  it('comienza vacia', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  })
})

describe('Bicicleta.add', () => {
  it('Agregar bicicleta', () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var b1 = new Bicicleta(1,	'Rojo', 'Urbano',	[4.607466,-74.216151]);
    Bicicleta.add(b1);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(b1);
  })
})

describe('Bicicleta FindBy', () =>{
  it('Debe devolver el id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var b1 = new Bicicleta(1,	'Rojo', 'Urbano',	[4.607466,-74.216151]);
    var b2 = new Bicicleta(2,	'Azul', 'montaña',	[4.606443,-74.218524]);
    Bicicleta.add(b1);
    Bicicleta.add(b2);

    targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe(b1.color);
    expect(targetBici.modelo).toBe(b1.modelo);
  })
})
*/