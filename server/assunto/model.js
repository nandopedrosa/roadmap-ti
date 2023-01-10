class Assunto {
    constructor(nome, descricao, id_disciplina, ordem, id = null) {
        this.nome = nome;
        this.descricao = descricao;
        this.id_disciplina = id_disciplina;
        this.ordem = ordem;
        this.id = id;
    }
}

module.exports = Assunto;