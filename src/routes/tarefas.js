const express = require('express');
const router = express.Router();
const { authenticationMiddleware } = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

const validateBody = {
    titulo: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Digite o titulo."
    },
    descricao: {
    	in: "body",
    	isString: true,
    	notEmpty: true,
    	errorMessage: "Digite a descrição."
    }
}


router.get('/',
    authenticationMiddleware,
    controller.listagem
);

router.post('/',
    authenticationMiddleware,
    validateSchema(validateBody),
    controller.cadastro
);

router.get('/:tarefaId',
    authenticationMiddleware,
    controller.buscaPorId
);

router.put('/:tarefaId',
    authenticationMiddleware,
    controller.edicao
);

router.delete('/:tarefaId',
    authenticationMiddleware,
    controller.remocao
);

router.put('/:tarefaId/concluida',
    authenticationMiddleware,
    controller.marcarConcluida
);

router.delete('/:tarefaId/concluida',
    authenticationMiddleware,
    controller.desmarcarConcluida
);


module.exports = router;
