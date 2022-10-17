const AppDAO = require('../appdao.js');

class DisciplinaDAO {
    constructor() {
        this.db = new AppDAO();
    }

    insert(disciplina) {
        return this.db.run(
            'INSERT INTO disciplina (nome, descricao) VALUES (?,?)',
            [disciplina.nome, disciplina.descricao]);
    }

    update(disciplina) {
        return this.db.run(
            'UPDATE disciplina SET nome = ?, descricao = ? WHERE id = ?',
            [disciplina.nome, disciplina.descricao, disciplina.id]);
    }

    delete(id) {
        return this.db.run(
            'DELETE from disciplina WHERE id = ?',
            [id]);
    }

    getById(id) {
        return this.db.get(
            `SELECT * FROM disciplina WHERE id = ?`,
            [id]);
    }

    getAll() {
        return this.db.all(`SELECT * FROM disciplina`);
    }

}

module.exports = DisciplinaDAO 
