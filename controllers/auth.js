const { response } = require('express');
const bcryptjs = require('bcryptjs');

/* Geolocalizar a quienes inicien seccion - https://devcode.la/tutoriales/geolocalizacion-nodejs/ */
// const geoip = require('geoip-lite');
/* Fin Geolocalizacion */

const Cordinadora = require('../models/cordinadoras');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response ) => {

    const { usuario, password } = req.body;

    try{

        // Verificar la cordinadora 
        const cordinadora =  await Cordinadora.findOne({ usuario });
        if( !cordinadora ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos'
            });
        }
        // estado === true
        // console.log(cordinadora.estado);
        if( !cordinadora.estado ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos'
            });
        }
        // verficar pass
        const validaPassword = bcryptjs.compareSync( password, cordinadora.password );
        // console.log(validaPassword);
        if( !validaPassword ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - password'
            });
        }

        // Generar JWT
        const token = await generarJWT( cordinadora.id );

        res.json({
            cordinadora,
            token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Algo salio mal :('
        });
    }

    res.json({
        usuario,
        password
    });

}

module.exports = {
    login
}


/*
    Este o el generar-jwt.js

    (node:6424) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:561:11)
    at ServerResponse.header (C:\Users\MSI\Desktop\Practicas Backend\node_modules\express\lib\response.js:771:10)
    at ServerResponse.send (C:\Users\MSI\Desktop\Practicas Backend\node_modules\express\lib\response.js:170:12)
    at ServerResponse.json (C:\Users\MSI\Desktop\Practicas Backend\node_modules\express\lib\response.js:267:15)
    at login (C:\Users\MSI\Desktop\Practicas Backend\controllers\auth.js:52:9)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)

    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:6424) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). 
    (rejection id: 1)
    (node:6424) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/