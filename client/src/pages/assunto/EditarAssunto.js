import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Validation from '../../util/Validation';
import { Toast } from 'primereact/toast';
import { showSuccess, showError } from '../../util/Globals';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { getSecure, postSecure } from '../../util/SecureRequest';

function EditarAssunto() {
    const toast = useRef(null);
    const navigate = useNavigate();
    var { idDisciplina, idParam } = useParams();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ordem, setOrdem] = useState('');
    const [referencia, setReferencia] = useState('');

    // Page Load
    const getAssunto = async function () {
        if (idParam !== "new") {
            const response = await getSecure(`/api/assunto/${idParam}`);
            if (!response.data.id) {
                navigate('/not-found');
            }
            setId(idParam);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setOrdem(response.data.ordem);
            setReferencia(response.data.referencia);
        }
    }

    useEffect(() => {
        getAssunto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Create
            if (idParam === 'new' && !id) {
                const response = await postSecure('/api/assunto/create', { nome, descricao, idDisciplina, referencia });
                if (response.data.status === Validation.STATUS_OK) {
                    showSuccess(toast, "Registro criado com sucesso");
                    setId(response.data.payload.id);
                    setOrdem(response.data.payload.ordem);
                } else {
                    showError(toast, response.data.msg);
                }
            } else {
                //Update
                const response = await postSecure('/api/assunto/update', { id, nome, descricao, ordem, referencia });
                if (response.data.status === Validation.STATUS_OK) {
                    showSuccess(toast, "Registro atualizado com sucesso");
                } else {
                    showError(toast, response.data.msg);
                }
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
                            {id ? <h1>Editar Assunto</h1> : <h1>Criar Assunto</h1>}
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome*</label>
                                    <input placeholder="Digite o nome do assunto" name="nome"
                                        type="text" minLength="3" maxLength="128" className="form-control"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Tópicos*</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={descricao}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescricao(data);
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="referencia" className="form-label">Referências*</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={referencia}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setReferencia(data);
                                        }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary me-3">Salvar</button>
                                <Link className="btn btn-light" to={`/disciplinas/${idDisciplina}`} role="button">Voltar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarAssunto;