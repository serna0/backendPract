const { response, request } = require('express');

const Entrega = require('../models/entrega');


const entregaGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, entrega ] = await Promise.all([
        Entrega.countDocuments(query),
        Entrega.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        ip,
        total,
    });
}

const entregaPost = async(req, res = response) => {
    
    const { comid, cordid, telefono, cordinadorasuplente, telefonosuplente, beneid } = req.body;
    const entrega = new Entrega({ comid, cordid, telefono, cordinadorasuplente, telefonosuplente, beneid });

    // Guardar en BD
    await entrega.save();

    res.json({
        entrega
    });
}

const entregaPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id,  password, usuario, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const cordinadora = await Cordinadora.findByIdAndUpdate( id, resto );

    res.json(cordinadora);
}

const entregaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - cordinadorasPatch'
    });
}

const entregaDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Cordinadora.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}




module.exports = {
    entregaGet,
    entregaPost,
    entregaPut,
    entregaPatch,
    entregaDelete,
}