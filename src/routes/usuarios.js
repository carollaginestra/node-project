const express = require('express');
const router = express.Router();
const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');
const { isCPF, isDate } = require('../utils/customValidators');
const { authenticationMiddleware } = require('../utils/token');


/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

const validateBody = {
    nome: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Digite o nome"
    },
    cpf: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isCPF(value))
        },
        errorMessage: "CPF Inválido"
    },

    nascimento: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isDate(value, "YYYY-MM-DD"))
        },
        errorMessage: "Data inválida"
    },
    email: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Digite o e-mail"
    },
    senha: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Senha Inválida"
    }
}

router.get('/',
    authenticationMiddleware,
    controller.usuario
);

router.post('/',
    validateSchema(validateBody),
    controller.cadastro
);

router.post('/login',
    controller.login
);

router.get('/:usuarioId',
    controller.buscaPorId
);

router.put('/:usuarioId',
    authenticationMiddleware,
    controller.edicao
)

module.exports = router;
