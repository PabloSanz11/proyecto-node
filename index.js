//Dependencias
const morgan = require('morgan');
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app
//Routers
const pokemon = require('./routes/pokemon'); //Asignar el recurso
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/

//req es la petición del cliente navegador, res es la respuesta que nosotros mandaremos
app.get("/",index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon); // cada que se detecte al pokemon se manda al js, es acceder a los recursos

// Cuando se entre a algun recurso inexistentes, <--------------------- siempre se pone al final --------------------->
app.use(notFound);

//Encender el servidor para que escuche
app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
});

/*
const x = 0;
let y = 0;
var z = 0;*/
