import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Validation from '../../util/Validation';
import { Toast } from 'primereact/toast';
import { showSuccess, showError } from '../../util/Globals';
import { OrderList } from 'primereact/orderlist';
import './OrderList.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { stripHtml } from 'string-strip-html';
import { getSecure, postSecure } from '../../util/SecureRequest';

function EditarDisciplina() {
    const toast = useRef(null);
    const navigate = useNavigate();
    var { idParam } = useParams();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [assuntos, setAssuntos] = useState([]);

    // Page Load
    const getDisciplina = async function () {
        if (idParam !== "new") {
            const responseDisciplina = await getSecure(`/api/disciplina/${idParam}`);
            if (!responseDisciplina.data.id) {
                navigate('/not-found');
            }
            setId(idParam);
            setNome(responseDisciplina.data.nome);
            setDescricao(responseDisciplina.data.descricao);

            //Fetch assuntos
            const responseAssuntos = await getSecure(`/api/assunto/list/${idParam}`);
            setAssuntos(responseAssuntos.data);
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
                const response = await postSecure('/api/disciplina/create', { nome, descricao });
                if (response.data.status === Validation.STATUS_OK) {
                    showSuccess(toast, "Registro criado com sucesso");
                    setId(response.data.payload);
                } else {
                    showError(toast, response.data.msg);
                }
            } else {
                //Update
                const response = await postSecure('/api/disciplina/update', { id, nome, descricao });
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

    const confirm = (id) => {
        confirmDialog({
            message: 'Deseja realmente deletar?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                postSecure("/api/assunto/delete", { id });
                const filtered = assuntos.filter((assunto) => assunto.id !== id);
                setAssuntos(filtered);

            },
            onHide: (result) => {
                if (result === "accept") {
                    showSuccess(toast, "Registro excluído com sucesso");
                }
            },
            acceptLabel: "Sim",
            rejectLabel: "Não",
        });
    }

    const assuntoTemplate = (assunto) => {
        return (
            <div className="assunto-item">
                <div className="assunto-list-detail">
                    <h6 className="mb-2">{assunto.nome}</h6>
                    <span className="assunto-descricao">{stripHtml(assunto.descricao).result}</span>
                </div>
                <div className="assunto-list-action">
                    <button type="button" title="Deletar" onClick={() => { confirm(assunto.id) }} className="btn btn-sm btn-danger  mt-1"><i className="bi bi-trash"></i></button>
                    <ConfirmDialog />
                    <Link className="btn btn-primary btn-sm mt-1 " to={`/assuntos/${id}/${assunto.id}`} role="button"><i className="bi bi-pencil"></i></Link>
                </div>
            </div>
        );
    }

    function reorder(event) {
        const novaOrdemAssuntos = event.value;
        setAssuntos(novaOrdemAssuntos);
        postSecure('/api/assunto/reorder', { novaOrdemAssuntos }); //id = idDisciplina
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
                                <button type="submit" className="btn btn-primary me-3">Salvar</button>
                                <Link className="btn btn-light" to="/disciplinas" role="button">Voltar</Link>
                            </form>
                        </div>
                    </div>

                    <br /><br />

                    {
                        id ?
                            <div>
                                <hr />
                                <br />
                                <div className="row mb-4">
                                    <div className="col-sm-12">
                                        <Link to={`/assuntos/${id}/new`} role="button" className="btn btn-success ">Adicionar assunto</Link>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-sm-12">
                                        <div className="orderlist-assuntos">
                                            <OrderList value={assuntos} header="Assuntos" dragdrop listStyle={{ height: 'auto' }} dataKey="id"
                                                itemTemplate={assuntoTemplate} onChange={(e) => reorder(e)}>
                                            </OrderList>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div></div> // Não renderiza nada se a disciplina não existir
                    }
                </div>
            </div>
        </>
    );
}

export default EditarDisciplina;