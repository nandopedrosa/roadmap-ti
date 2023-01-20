import { Link } from 'react-router-dom';

function Admin({ usuario }) {
    return (
        <div className="container">
            <div className="bg-light p-5 rounded-lg m-3">
                <h1 className="display-4">Roadmap de TI</h1>
                <p className="lead">Gerenciador de roteiro de estudos para Concursos de TI</p>
                <hr className="my-4" />
                {
                    usuario ?
                        <p>Bem vindo(a) <b>{`${usuario.nome}`}!</b></p>
                        :
                        <p>Faça o login ou crie uma nova conta para usar o aplicativo.</p>

                }
                <Link className="btn btn-success btn-lg mb-3 me-3" to="/admin/disciplinas" role="button">Gerenciar Disciplinas e Assuntos</Link>
            </div>
        </div>
    );
}

export default Admin;