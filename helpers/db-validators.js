const Role = require('../models/role');
const Cordinadora = require('../models/cordinadoras');
const Beneficiario = require('../models/beneficiarios');
const Comunidad = require('../models/comunidad');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const cordinadoraExiste = async( cordinadora = '' ) => {

    // Verificar si el cordinadora existe
    const existecordinadora = await Cordinadora.findOne({ cordinadora });
    if ( existecordinadora ) {
        throw new Error(`La cordinadora: ${ cordinadora }, ya está registrado`);
    }
}

const existeCordinadoraPorId = async( id ) => {

    // Verificar si el cordinadora existe
    const existeCordinadora = await Cordinadora.findById(id);
    if ( !existeCordinadora ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeBeneficiarioPorId = async( id ) => {

    // Verificar si el cordinadora existe
    const existeBeneficiario = await Beneficiario.findById(id);
    if ( !existeBeneficiario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeComunidadPorId = async( id ) => {

    // Verificar si el cordinadora existe
    const existeComunidad = await Comunidad.findById(id);
    if ( !existeComunidad ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    esRoleValido,
    cordinadoraExiste,
    existeCordinadoraPorId,
    existeBeneficiarioPorId,
    existeComunidadPorId
}


