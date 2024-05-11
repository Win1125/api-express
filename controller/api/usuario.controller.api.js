var Usuario = require("../../model/usuario.model");
var Reserva = require("../../model/reserva.model");
const moment = require('moment');

exports.usuarios_list = function(req, res) {
    Usuario.find({})
        .then(usuarios => {
            res.status(200).json({ usuarios: usuarios });
        })
        .catch(err => {
            console.error("Error al obtener usuarios:", err);
            res.status(500).json({ error: "Error al obtener usuarios" });
        });
};

exports.usuarios_create = function(req, res) {
    var usuario = new Usuario({ nombre: req.body.nombre });

    usuario.save()
        .then(savedUsuario => {
            res.status(200).json(savedUsuario);
        })
        .catch(err => {
            console.error("Error al crear usuario:", err);
            res.status(500).json({ error: "Error al crear usuario" });
        });
};


exports.usuario_reservar = async function(req, res) {
    try {
        const usuario = await Usuario.findById(req.body.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        //const desde = moment(req.body.desde);
        //const hasta = moment(req.body.hasta);

        const reserva = new Reserva({
            usuario: usuario._id,
            bicicleta: req.body.bici_id,
            desde: req.body.desde,
            hasta: req.body.hasta
        });

        await reserva.save();

        console.log('Reserva realizada!!!');
        res.status(200).json({ message: "Reserva realizada!!!" });
    } catch (error) {
        console.error("Error al realizar reserva:", error);
        res.status(500).json({ error: "Error al realizar reserva" });
    }
};