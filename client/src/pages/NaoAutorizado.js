import { Link } from 'react-router-dom';

function NaoAutorizado() {
    return (
        <div className="container">
            <div className="p-3 m-3">
                <div className="row mb-2">
                    <div className="col-sm-12">
                        <h3>401 - Não autorizado.</h3>
                        <Link to="/admin/auth/login">Ir ao Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NaoAutorizado;