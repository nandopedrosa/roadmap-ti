class Disciplina {
    constructor(nome, descricao, autor, mostrar, id = null) {
        this.nome = nome;
        this.descricao = descricao;
        this.autor = autor;
        this.mostrar = mostrar;
        this.id = id;
    }
}

module.exports = Disciplina;