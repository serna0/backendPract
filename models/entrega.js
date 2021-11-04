const { Schema, model } = require('mongoose');

const EntregaSchema = Schema({

    /* Este debe ser ID */
    comid: {
        type: String,
        required: [true, 'La comunidad es obligatorio']
    },
    fecharegistro: {
        type: String,
        default: new Date()
    },
    cordid: {
        type: String,
        required: [true, 'La cordinadora es obligatorio'],
    },
    telefono: {
        type: String,
        required: [true, 'El numero telefonico es obligatorio']
    },
    cordinadorasuplente: {
        type: String,
    },
    telefonosuplente: {
      type: String  
    },
    beneid: {
        type: String,
        required: [true, 'El beneficiario es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }

});



EntregaSchema.methods.toJSON = function() {
    const { __v, _id, ...entrega } = this.toObject();
    entrega.uid = _id;
    return entrega;
}

module.exports =  model('Entregas', EntregaSchema);