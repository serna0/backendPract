const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            cordinadora: "/api/cordinadoras",
            beneficiario: '/api/beneficiario',
            comunidad: '/api/comunidad',
            entregas: "/api/entregas",
            uploads: "/api/uploads"
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Subir arhicos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.cordinadora, require('../routes/cordinadoras'));
        this.app.use( this.paths.beneficiario, require('../routes/beneficiario'));
        this.app.use( this.paths.comunidad, require('../routes/comunidad'));
        this.app.use( this.paths.entregas, require('../routes/entregas'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
