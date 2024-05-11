// Edwin Fandiño Salazar
// 20221978016
/*
//Instancia del modelo Bicicleta
const Bicicleta = require ('../../model/bicicleta.model')


//Crear una lista de todas las bicicletas
export function bicicleta_list (req, res) {
  res.render('bicicletas/index', {bicis: allBicis})
}

export function bicicleta_create_get (req, res) {
  res.render('bicicletas/create');
}

export function bicicleta_create_post (req, res) {
  let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  add(bici)

  res.redirect('/bicicletas');
}

export function bicicleta_update_get (req, res) {
  let bici = findById(req.params.id);

  res.render('bicicletas/update', {bici});
}

export function bicicleta_update_post (req, res) {
  let bici = findById(req.params.id);

  bici.id = req.body.id
  bici.color = req.body.color
  bici.modelo= req.body.modelo
  bici.ubicacion = [req.body.lat, req.body.lng];

  res.redirect('/bicicletas');
}

export function bicicleta_delete_post(req, res) {
  removeById(req.body.id);

  res.redirect('/bicicletas');
}
*/