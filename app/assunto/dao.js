const AppDAO = require('../appdao.js');

class AssuntoDAO {
    constructor() {
        this.db = new AppDAO();
    }

    insert(assunto) {
        return this.db.run(
            'INSERT INTO assunto (id_disciplina, nome, descricao) VALUES (?,?,?)',
            [assunto.id_disciplina, assunto.nome, assunto.descricao]);
    }

    update(assunto) {
        return this.db.run(
            'UPDATE assunto SET nome = ?, descricao = ? WHERE id = ?',
            [assunto.nome, assunto.descricao, assunto.id]);
    }

    delete(id) {
        return this.db.run(
            'DELETE from assunto WHERE id = ?',
            [id]);
    }

    getById(id) {
        return this.db.get(
            `SELECT * FROM assunto WHERE id = ?`,
            [id]);
    }

    getAll() {
        return this.db.all(`SELECT * FROM assunto`);
    }

}

module.exports = AssuntoDAO 
