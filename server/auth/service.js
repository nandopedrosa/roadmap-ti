const UsuarioDAO = require('./dao.js');
const Usuario = require('./model.js');
const Validation = require('../util/validation.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const UnauthenticatedError = require('../util/errors/unathenticated');

const dao = new UsuarioDAO();

async function authenticate(email, senha) {
    const usuario = await dao.find(email);
    if (!usuario) {
        return false;
    }

    //Agora que sabemos que o usuário existe, comparamos o input do Login com o Hash salvo na base para verificar a senha
    const isPasswordCorrect = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordCorrect) {
        return false;
    }

    return usuario;
}

async function login(req) {
    ({ email, senha } = req.body);

    //Validate input
    if (!email || !senha) {
        return new Validation(Validation.STATUS_ERROR, "Por favor, digite seu login e senha");
    }

    const usuario = await authenticate(email, senha);
    if (!usuario) {
        return new Validation(Validation.STATUS_ERROR, "Usuário ou senha inválidos");
    }

    //Se tudo ocorreu bem, criamos o JWT Token e retornamos ao cliente
    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return new Validation(Validation.STATUS_OK, "Login realizado com sucesso", { usuario: usuario, token: token });
}

async function signup(req) {
    ({ nome, email, senha } = req.body);

    //Validate mandatory fields
    if (!nome || !email || !senha) {
        return new Validation(Validation.STATUS_ERROR, "Por favor, digite todos os campos obrigatórios");
    }

    //Validate email
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return new Validation(Validation.STATUS_ERROR, "Digite um email válido");
    }

    //Validate min password length
    if (senha.length < 6) {
        return new Validation(Validation.STATUS_ERROR, "A senha deve ter pelo menos 6 caracteres");
    }

    //Validate if user already exists
    if (await userExists(email)) {
        return new Validation(Validation.STATUS_ERROR, "Este usuário já existe");
    }

    //Generate password hash and create user
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const usuario = new Usuario(nome, email, senhaHash);
    const { lastId } = await dao.insert(usuario);

    return new Validation(Validation.STATUS_OK, "Usuário criado com sucesso", lastId);
}

async function userExists(email) {
    const response = await dao.getCount(email);
    if (response.count == 0) {
        return false;
    } else {
        return true;
    }
}

async function isLoggedIn(req) {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, nome, email } = decoded;
        return { isLoggedIn: true, usuario: { id, nome, email } };
    } catch (error) {
        return { isLoggedIn: false, usuario: null }
    };
}

module.exports = { signup, login, isLoggedIn }