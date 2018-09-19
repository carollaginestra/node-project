const { Usuario } = require ('../models');
const {generateToken} = require('../utils/token');

function cadastro(request, response, next) {

    const { body:{ nome, email, cpf, nascimento, senha } } = request

    Usuario.create({
        nome, email, cpf, nascimento, senha
    })
    .then( usuario => {
        response.status(201).json(usuario)
    })
    .catch( ex => {
        console.error(ex);
        response.status(412).send('Falha ao incluir o registro')
    })
}

function buscaPorId(request, response, next) {
    const { params:{usuarioId} } = request

    Usuario.findById(usuarioId)
    .then(usuario => {
        if (!usuario){
            response.status(404).send('Usuário inválido')
        }else{
            response.status(200).json(usuario)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Falha ao consultar o banco de dados')
    })

}

function edicao(request, response, next) {

    const {params:{usuarioId}, body:{nome, email, cpf, nascimento, senha}} = request

    Usuario.findById(usuarioId)
    .then( usuario => {
        if (!usuario){
            response.status(404).send('usuário não encontrado')
        }else{
            return usuario.update({
                nome, email, cpf, nascimento, senha
            })
            .then(()=>{
                response.status(200).json(usuario)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Falha ao consultar o banco de dados (insira todos os dados)')
    })
}

function login(request, response, next) {
    
    const {body:{ email, senha }} = request

    Usuario.findOne({
        where:{
            email
        }
    })
    .then(usuario => {
        if( (usuario !== null) || (senha, usuario.senha))
        {
            const token = generateToken(usuario);
            response.status(200).cookie('token',token).send('Usuário ativo');
        }
        else
        {
            response.status(401).send('login inválido');
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Falha ao consultar o banco de dados')
    })
}

function usuario(request, response, next){
    Usuario.findAll({})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Nenhum Usuário Cadastrado'));
}

module.exports = {
    cadastro,
    buscaPorId,
    usuario,
    edicao,
    login
};
