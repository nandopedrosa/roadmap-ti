import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Validation from '../../util/Validation';
import { Toast } from 'primereact/toast';
import { showSuccess, showError } from '../../util/Globals';

function EditarDisciplina() {
    const toast = useRef(null);
    const navigate = useNavigate();
    var { idParam } = useParams();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    // Page Load
    const getDisciplina = async function () {
        if (idParam !== "new") {
            const response = await axios(`/api/disciplina/${idParam}`);
            if (!response.data.id) {
                navigate('/not-found');
            }
            setId(idParam);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
        }
    }

    useEffect(() => {
        getDisciplina();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Create
            if (idParam === 'new' && !id) {
                const response = await axios.post('/api/disciplina/create', { nome, descricao });
                if (response.data.status === Validation.STATUS_OK) {
                    showSuccess(toast, "Registro criado com sucesso");
                    setId(response.data.payload);
                } else {
                    showError(toast, response.data.msg);
                }
            } else {
                //Update
                const response = await axios.post('/api/disciplina/update', { id, nome, descricao });
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
                            {id ? <h1>Editar Disciplina</h1> : <h1>Criar Disciplina</h1>}
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome*</label>
                                    <input placeholder="Digite o nome da disciplina" name="nome"
                                        type="text" minLength="3" maxLength="128" className="form-control"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição*</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={descricao}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescricao(data);
                                        }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                                <Link className="btn btn-light" to="/disciplinas" role="button">Voltar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default EditarDisciplina;