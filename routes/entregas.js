const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { esRoleValido, cordinadoraExiste, existeCordinadoraPorId } = require('../helpers/db-validators');

const { 
    entregaGet,
    entregaPut,
    entregaPost,
    entregaDelete,
    entregaPatch 
} = require('../controllers/entregas');

const router = Router();

/* Obtener todas las entregas */
router.get('/', [
    validarCampos
], entregaGet);

/* Crear */
router.post('/', [
    check('comid','La comunidad es obligatorio').not().isEmpty(),
    check('cordid','La cordinadora es obligatorio').not().isEmpty(),
    check('telefono','El numero telefonico es obligatorio').not().isEmpty(),
    check('beneid','El beneficiario es obligatorio').not().isEmpty(),
    validarCampos
], entregaPost);

/* Actualizar entregas */
router.put('/', [
    validarCampos
], entregaPut);

/* Borrar entegas */
router.delete('/:id', [
    validarCampos
], entregaDelete );

router.patch('/', entregaPatch );

module.exports = router;