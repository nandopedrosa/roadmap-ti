const DisciplinaDAO = require('./dao.js');
const Disciplina = require('./model.js');
const Validation = require('../util/validation.js');

const dao = new DisciplinaDAO();

function validate(params) {
    if (!Validation.isFilled(params)) {
        return new Validation(Validation.STATUS_ERROR, "Por favor, preencha todos os campos obrigatórios");
    }
    return new Validation(Validation.STATUS_OK);
}

async function create(req) {
    ({ nome, descricao, autor, mostrar } = req.body);

    v = validate([nome, descricao, autor, mostrar]);

    if (v.status == Validation.STATUS_OK) {
        const disciplina = new Disciplina(nome, descricao, autor, mostrar);
        const { lastId } = await dao.insert(disciplina);
        v.msg = "Disciplina inserida com sucesso";
        v.payload = lastId;
    }

    return v;
}

async function update(req) {
    ({ id, nome, descricao, autor, mostrar } = req.body);

    v = validate([id, nome, descricao, autor, mostrar]);

    if (v.status == Validation.STATUS_OK) {
        const disciplina = new Disciplina(nome, descricao, autor, mostrar, id);
        const { lastId } = await dao.update(disciplina);
        v.msg = "Disciplina atualizada com sucesso";
    }
    return v;
}

async function getById(req) {
    ({ idDisciplina } = req.params);
    const disciplina = await dao.getById(idDisciplina);
    return disciplina;
}

async function getAll(req) {
    const disciplinas = await dao.getAll();
    return disciplinas;
}

async function del(req) {
    ({ id } = req.body);
    await dao.delete(id);
    v = new Validation(Validation.STATUS_OK, "Registro excluído com sucesso");
    return v;
}


async function getCardsDisciplinas() {
    const disciplinaCountAssuntos = await dao.getCardsDisciplinas();
    return disciplinaCountAssuntos;
}

module.exports = { create, update, getById, getAll, del, getCardsDisciplinas }