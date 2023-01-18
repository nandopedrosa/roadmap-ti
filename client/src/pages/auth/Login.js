import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../../util/Validation';
import { showError } from '../../util/Globals';
import { Toast } from 'primereact/toast';

function Login({ setUsuario }) {
    const navigate = useNavigate();
    const toast = useRef(null);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Retorna um objeto Validation -> token no campo payload
            const response = await axios.post('/api/auth/login', { email, senha });

            if (response.data.status === Validation.STATUS_OK) {
                localStorage.setItem('token', response.data.payload.token);
                setUsuario(response.data.payload.usuario);
                navigate("/admin");
            } else {
                localStorage.removeItem('token');
                showError(toast, response.data.msg);
            }
        } catch (error) {
            localStorage.removeItem('token');
            console.log(error);
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="container">
                <div className="p-3 m-3">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1>Login</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email*</label>
                                    <input name="email" type="email" className="form-control" id="email"
                                        minLength="3" maxLength="128"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha*</label>
                                    <input name="password" type="password" className="form-control" id="password" minLength="6" maxLength="128"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Login;