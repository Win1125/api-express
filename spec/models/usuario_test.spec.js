var Reserva = require('../../model/reserva.model');

describe('Testing Usuarios',function(){
    beforeEach(function(done){
        var mongoDB = //LINK DEL MONGODB :D
        mongoose.connect(mongoDB,{useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error'));
        db.once('open',function(){
            console.log('We are connected to test database');
            done();
        })
    })

    afterEach(function(done){
        Reserva.deleteMany({},function(err,succes){
            if(err) console.log(err);
            Usuario.deleteMany({},function(err,succes){
                if(err) console.log(err);
                Bicicleta.deleteMany({},function(err,succes){
                    if(err) console.log(err);
                    done();
                })

            })
        })
    });

    describe('Cuando un usuario reserva una bici',()=>{
        it('desde existir la reserva', (done) => {
            const usuario = new Usuario({nombre:"Ezequiel"});
            usuario.save();
            const bicicleta = new Bicicleta({code: 1, color:"verde",modelo:"urbana"});
            bicicleta.save();
            var hoy= new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id,hoy,mañana,function(err,reserva){
                Reserva.find({}).populated('bicicleta').populated('usuario').exec(function(err,reserva){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                })
            })
        })
    })
})