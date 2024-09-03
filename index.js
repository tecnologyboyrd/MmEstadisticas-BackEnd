const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Connection
const {dbConnexion} = require('./database/config').dbConnexion();


//App de express
const app = express();

//Lectura del body de una peticion hhtp (llamada de servicio)
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/soket');

//Path Publico
 const publicPath = path.resolve(__dirname, 'public');

 app.use(express.static(publicPath));


 //Definicion de rutas
 app.use('/api/login', require('./routes/auth_route'));

 app.use('/api/pastor', require('./routes/pastor_route'));

app.use('/api/country', require('./routes/country_route'));

app.use('/api/state', require('./routes/state_route'));

app.use('/api/city', require('./routes/city_route'));





server.listen(process.env.PORT, (err)=>{
    if(err) throw new error(err);

    console.log('Servidor corriendo satisfactoriamente en puerto !!!', process.env.PORT);

});