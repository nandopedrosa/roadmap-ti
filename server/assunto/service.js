const AssuntoDAO = require('./dao.js');
const Assunto = require('./model.js');
const Validation = require('../util/validation.js');

const dao = new AssuntoDAO();

function validate(params) {
    if (!Validation.isFilled(params)) {
        return new Validation(Validation.STATUS_ERROR, "Por favor, preencha todos os campos obrigatórios");
    }
    return new Validation(Validation.STATUS_OK);
}

async function create(req) {
    ({ idDisciplina, nome, descricao } = req.body);

    v = validate([idDisciplina, nome, descricao]);

    if (v.status == Validation.STATUS_OK) {
        const assunto = new Assunto(nome, descricao, idDisciplina);
        const {lastId} = await dao.insert(assunto);
        v.msg = "Assunto inserido com sucesso";
        v.payload = lastId;
    }

    return v;
}

async function update(req) {
    ({id, idDisciplina, nome, descricao } = req.body);

    v = validate([id, nome, descricao]);

    if (v.status == Validation.STATUS_OK) {
        const assunto = new Assunto(nome, descricao, idDisciplina, id);
        const {lastId} = await dao.update(assunto);
        v.msg = "Assunto atualizado com sucesso";
    }    
    return v;
}

async function getById(req) {
    ({id} = req.params);
    const assunto = await dao.getById(id);
    return assunto;
}

async function getAll(req) {
    const assuntos = await dao.getAll();
    return assuntos;
}

async function del(req) {
    ({id} = req.body);
    await dao.delete(id);
    v = new Validation(Validation.STATUS_OK, "Registro excluído com sucesso");
    return v;
}

module.exports = { create, update, getById, getAll, del}