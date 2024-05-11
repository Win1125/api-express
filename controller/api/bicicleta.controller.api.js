// Edwin Fandiño Salazar
// 20221978016

const Bicicleta = require ('../../model/bicicleta.model')

exports.bicicleta_list = async function (req, res) {
  try {
    const bicicletas = await Bicicleta.allBicis();
    res.status(200).json({ bicicletas: bicicletas });
  } catch (error) {
    console.error("Error al obtener bicicletas:", error);
    res.status(500).json({ error: "Error al obtener bicicletas" });
  }
}

exports.bicicleta_create = function (req, res) {
  var bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]);

  Bicicleta.add(bici)
    .then(newBici => {
      res.status(200).json({
        success: true,
        message: 'Bicicleta created successfully',
        bici: newBici
      });
    })
    .catch(err => {
      console.error("Error al crear bicicleta:", err);
      res.status(500).json({ error: "Error al crear bicicleta" });
    });
}


exports.bicicleta_delete = function(req, res) {
  Bicicleta.removeById(req.body.id)
    .then(result => {
      if (!result) {
        return { success: false, message: "Bicicleta not found" };
      }
      return { success: true, message: "Bicicleta deleted successfully" };
    })
    .catch(err => {
      console.error("Error removing bicicleta:", err);
      throw err;
    });

  res.status(200).json({
    success: true,
    message: 'Bicicleta deleted successfully'
  })
}
