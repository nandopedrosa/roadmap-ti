const AppDAO = require('../appdao.js');

class UsuarioDAO {
    constructor() {
        this.db = new AppDAO();
    }

    insert(usuario) {
        return this.db.run(
            'INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)',
            [usuario.nome, usuario.email, usuario.senha]);
    }

    find(email) {
        return this.db.get(
            `SELECT * FROM usuario WHERE email = ?`,
            [email]);
    }

    getCount(email) {
        return this.db.get(
            `SELECT count(*) as count FROM usuario WHERE email = ?`,
            [email]);
    }
}

module.exports = UsuarioDAO 
