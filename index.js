//Importa Mongoose de los node modules 
const mongoose = require('mongoose');

//Conecta con MongoDB a traves de Mongoose 
mongoose.connect('mongodb://localhost:27017/sam_nr', {useNewUrlParser: true});

//Crea una conexion a la BD relacionada a Mongoose 
var db = mongoose.connection;

//Conecta la consola de errores con la conexion de Mongoose
db.on('error', console.error.bind(console, 'connection error:'));

//Prueba la conexion
db.once('open', function() {
  console.log('Se conecto exitosamente a la BD de Mongo')
});

//Crea la constante esquema utilizando el objeto Mongoose 
const Schema = mongoose.Schema;

//Define el esquema plantilla y sus valores
const plantillaSchema = new Schema({
    idMedico: Number,
    nombre:  String,
    atributos: [{ nombre: String, valor: String }]
});

//Se crean metodos asociados al esquema de la plantilla
//Este metodo muestra todos los atributos relacionados a una Plantilla
plantillaSchema.methods.mostrarAtributos = function(){
    this.atributos.forEach( (atr) => {
        console.log(atr['nombre'] + ': ' + atr['valor']);
    });
}

//Se crea un modelo vinculado al esquema de la plantilla 
var Plantilla = mongoose.model('Plantilla', plantillaSchema);

//Se crea una nueva plantilla a insertar
let nuevaPlantilla = new Plantilla ({
    idMedico: 2,
    nombre: 'nueva Plantilla2',
    atributos: [
        { nombre: 'Temperatura', valor: '30.5º' },
        { nombre: 'Consultorio', valor: '4' }
    ]
});

//Se guarda la nuevaPlantilla en la BD de Mongo 
//Y se utiliza el metodo mostrarAtributos
nuevaPlantilla.save(function(err,nuevaPlantilla){
    //Si hay errrores los manda a la console de errores
    if (err) return console.error(err);

    //Si no, utiliza el metodo mostrarAtributos
    //Y sale del proceso de Node.js 
    else{ 
        nuevaPlantilla.mostrarAtributos(); 
        process.exit();
    }
})
