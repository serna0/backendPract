require('dotenv').config();
const Server = require('./models/server');


const server = new Server();



server.listen();

/* 
    login        - true
    cordinadoras - true 
    Beneficios   - true
    comunidad    - true
    Entregas     - true
    PathImagen   - false -  crear carpetas con las fotos para guardar fotos
*/