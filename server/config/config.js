//-----------
// PUERTO
// ----------
process.env.PORT = process.env.PORT || 3000;

//-----------
// ENTORNO
// ----------

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; // Variable que establece heroku, para saber si estoy en produccion o desarrollo(dev)


//-----------
// BASE DE DATOS
// ----------

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/socketCola'
} else {
    urlDB = process.env.MONGO_URL
}

process.env.URLDB = urlDB;