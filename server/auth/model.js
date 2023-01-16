class Usuario {
    constructor(nome, email, senha, id = null) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.id = id;
    }
}

module.exports = Usuario;