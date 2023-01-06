class Disciplina {
    constructor(nome, descricao, id = null) {
        this.nome = nome;
        this.descricao = descricao;
        this.id = id;
    }
}

module.exports = Disciplina;