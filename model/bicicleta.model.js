var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// VERSIÓN MEJORADA CON MONGO_DB
const bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number], index: { type: '2dsphere', sparse: true}
  }
},{timestamps: true});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
  return new this ({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  })
}

bicicletaSchema.methods.toString = function () {
  return 'code: ' + this.code + ', color: ' + this.color;
}

bicicletaSchema.statics.allBicis = function () {
  return this.find({}).exec();
};

bicicletaSchema.statics.add = function (aBici) {
  return this.create(aBici);
};


bicicletaSchema.statics.findByCode = function (aCode,cb){
  return this.findOne({code: aCode},cb);
};

bicicletaSchema.statics.removeById = function (id) {
  return this.findByIdAndDelete(id);
};


module.exports = mongoose.model('Bicicleta',bicicletaSchema);


// PRIMERA VERSIÓN CON DATOS EN MEMORIA
// var Bicicleta = function (id, color, modelo, ubicacion) {
//   this.id = id;
//   this.color = color;
//   this.modelo = modelo;
//   this.ubicacion = ubicacion;
// }

// Bicicleta.prototype.toString = function () {
//   return 'id: ' + this.id + ' color: ' + this.color;
// }

// Bicicleta.allBicis = [];

// Bicicleta.add = function(aBici){
//   Bicicleta.allBicis.push(aBici)
// }

// Bicicleta.findById = function (aBiciId) {
//   var aBici = Bicicleta.allBicis.find(x => x.id === aBiciId);

//   if(aBici){
//     return aBici;
//   }else{
//     throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
//   }
// }

// Bicicleta.removeById = function (aBiciId) {
//   for (let i = 0; i < Bicicleta.allBicis.length; i++) {
//     if (Bicicleta.allBicis[i].id == aBiciId) {
//       Bicicleta.allBicis.splice(i, 1);
//       break;
//     }
//   }
// }

// var b1 = new Bicicleta(1,	'Rojo', 'Urbano',	[4.607466,-74.216151]);
// var b2 = new Bicicleta(2,	'Azul', 'Urbano',	[4.606443,-74.218524]);
// var b3 = new Bicicleta(3,	'Blanco',	'Urbano',	[4.609319,-74.220006]);

// Bicicleta.add(b1);
// Bicicleta.add(b2);
// Bicicleta.add(b3);

//module.exports = Bicicleta;