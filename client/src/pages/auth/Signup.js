import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Validation from '../../util/Validation';
import { showError, showSuccess } from '../../util/Globals';
import { Toast } from 'primereact/toast';

function Signup() {
    const toast = useRef(null);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setSenhaConfirm] = useState('');
    const [contaCriada, setContaCriada] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha !== senhaConfirm) {
            showError(toast, "As senhas não conferem");
            return;
        }
        try {
            const response = await axios.post('/api/auth/signup', { nome, email, senha });
            if (response.data.status === Validation.STATUS_OK) {
                showSuccess(toast, "Conta criada com sucesso. Faça o login para começar a usar a aplicação.");
                setContaCriada(true);
                setNome('');
                setEmail('');
                setSenha('');
                setSenhaConfirm('');
            } else {
                showError(toast, response.data.msg);
            }
        } catch (error) {
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
                            {
                                contaCriada ?
                                    <h1>Conta criada com sucesso!</h1>
                                    :
                                    <h1>Criar conta</h1>
                            }
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                contaCriada ?
                                    <Link className="btn btn-secondary" to="/auth/login" role="button">Fazer Login</Link>
                                    :
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">Nome*</label>
                                            <input name="nome" minLength="3" maxLength="128" type="text"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                className="form-control" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email*</label>
                                            <input name="email" type="email" minLength="3" maxLength="128"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control" id="email" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Senha*</label>
                                            <input name="password" type="password" minLength="6"
                                                maxLength="128" className="form-control" id="password"
                                                placeholder="Pelo menos seis caracteres alfanuméricos"
                                                value={senha}
                                                onChange={(e) => setSenha(e.target.value)}
                                                required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Confirme senha*</label>
                                            <input name="password" type="password" minLength="6"
                                                maxLength="128" className="form-control" id="password"
                                                placeholder="Pelo menos seis caracteres alfanuméricos"
                                                value={senhaConfirm}
                                                onChange={(e) => setSenhaConfirm(e.target.value)}
                                                required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Criar nova conta</button>
                                    </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;