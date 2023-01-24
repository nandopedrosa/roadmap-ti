const AppDAO = require('../appdao.js');

class DisciplinaDAO {
    constructor() {
        this.db = new AppDAO();
    }

    insert(disciplina) {
        return this.db.run(
            'INSERT INTO disciplina (nome, descricao, autor, mostrar) VALUES (?,?,?,?)',
            [disciplina.nome, disciplina.descricao, disciplina.autor, disciplina.mostrar]);
    }

    update(disciplina) {
        return this.db.run(
            'UPDATE disciplina SET nome = ?, descricao = ?, autor = ?, mostrar = ? WHERE id = ?',
            [disciplina.nome, disciplina.descricao, disciplina.autor, disciplina.mostrar, disciplina.id]);
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
        return this.db.all(`SELECT * FROM disciplina order by nome`);
    }

    // Retorna o numero de assuntos agrupados por disciplina
    getCardsDisciplinas() {
        return this.db.all(`SELECT disciplina.id as id, disciplina.nome as nome, disciplina.descricao as descricao, COUNT(*) as qtd FROM disciplina, assunto where disciplina.id = assunto.id_disciplina AND disciplina.mostrar ='ativo' GROUP BY disciplina.nome ORDER BY disciplina.nome`)
    }

}

module.exports = DisciplinaDAO 
