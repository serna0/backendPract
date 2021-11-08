const path = require('path');
const { v4:uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionValida = ['png','jpg','jpeg'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        /* Validar extension */
        if( !extensionValida.includes( extension ) ) {
            return reject('El tipo de archivo no es valido'); 
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => { 
            if ( err ) {
                console.log(err);
                reject('Error al subir el archivo');
            }

            resolve( nombreTemp );
        });
    })

}

module.exports = {
    subirArchivo
}