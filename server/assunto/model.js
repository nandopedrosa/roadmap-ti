class Assunto {
    constructor(nome, descricao, id_disciplina, id = null) {
        this.nome = nome;
        this.descricao = descricao;
        this.id_disciplina = id_disciplina;
        this.id = id;
    }
}

module.exports = Assunto;