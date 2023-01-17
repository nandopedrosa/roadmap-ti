const AppDAO = require('../appdao.js');

class AssuntoDAO {
    constructor() {
        this.db = new AppDAO();
    }

    insert(assunto) {
        return this.db.run(
            'INSERT INTO assunto (id_disciplina, nome, descricao, ordem, referencia) VALUES (?,?,?,?,?)',
            [assunto.id_disciplina, assunto.nome, assunto.descricao, assunto.ordem, assunto.referencia]);
    }

    update(assunto) {
        return this.db.run(
            'UPDATE assunto SET nome = ?, descricao = ?, ordem = ?, referencia = ? WHERE id = ?',
            [assunto.nome, assunto.descricao, assunto.ordem, assunto.referencia, assunto.id]);
    }

    reorder(assuntos) {
        for (let i = 0; i < assuntos.length; i++) {
            this.db.run(
                'UPDATE assunto SET ordem = ? WHERE id = ?',
                [i + 1, assuntos[i].id]);
        }
        return '';
    }

    delete(id) {
        return this.db.run(
            'DELETE from assunto WHERE id = ?',
            [id]);
    }

    getNextOrdem(idDisciplina) {
        return this.db.get(
            `SELECT (max(ordem)+1) as nextOrdem FROM assunto WHERE id_disciplina = ?`,
            [idDisciplina]);
    }

    getById(id) {
        return this.db.get(
            `SELECT * FROM assunto WHERE id = ?`,
            [id]);
    }

    getAll(idDisciplina) {
        return this.db.all(`SELECT * FROM assunto where id_disciplina = ? ORDER BY ordem`, [idDisciplina]);
    }

}

module.exports = AssuntoDAO 
