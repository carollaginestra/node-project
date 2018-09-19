const jwt = require('jsonwebtoken');

/**
 * Chave de validação do JWT.
 */
const SECRET_KEY = 'VhMdGIZ3Tf-uv3wEVqEg84tlNUKZm3NBrU0-twwrPOo';

/**
 * Middleware que verifica a validade e decodifica o token de autenticação presente no header 'x-access-token'.
 * 
 * @param {request} request
 * @param {response} response
 * @param {next} next
 */
function authenticationMiddleware(request, response, next) {
	const { cookies: {token} } = request;

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log('Token válido', payload);
        request.usuarioLogado = payload;
        next();
    }
    catch (exception) {
        console.error('Token inválido', exception);
        response.status(403).send('Acesso negado');
    }

}

function generateToken (usuario){
	const { id, nome, email, cpf, nascimento } = usuario
	const payload = { id, nome, email, cpf, nascimento}
	return jwt.sign(payload, SECRET_KEY);
}


module.exports = {
    authenticationMiddleware,
    generateToken,
};