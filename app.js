require('dotenv').config();
const Server = require('./models/server');


const server = new Server();



server.listen();

/* 
    login        - true  -  terminado
    cordinadoras - true  -  validar que tenga relacion con beneficiario, comunidad y entregas
    Beneficios   - true  -  vincularlo con las comunidades y cordinadoras
    comunidad    - true  -  vincularlo con las cordinadoras y beneficiarios
    Entregas     - false -  falta put y delete y que solo la cordinadora pueda crearlos ademas vincularlos cordinadoras y beneficiarios y el Router falta de ello
    PathImagen   - false -  crear carpetas con las fotos para guardar
*/