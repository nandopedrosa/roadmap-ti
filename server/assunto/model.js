class Assunto {
    constructor(nome, descricao, id_disciplina, ordem, referencia, id = null) {
        this.nome = nome;
        this.descricao = descricao;
        this.id_disciplina = id_disciplina;
        this.ordem = ordem;
        this.referencia = referencia;
        this.id = id;
    }
}

module.exports = Assunto;