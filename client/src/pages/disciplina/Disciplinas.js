import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from 'axios';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { showSuccess } from '../../util/Globals';
import { stripHtml } from "string-strip-html";

function Disciplinas() {
    const [disciplinas, setDisciplinas] = useState([]);
    const toast = useRef(null);

    const getDisciplinas = async function () {
        const response = await axios('/api/disciplina/list');
        setDisciplinas(response.data);
    }

    useEffect(() => {
        getDisciplinas();
    }, []);

    const confirm = (id) => {
        confirmDialog({
            message: 'Deseja realmente deletar?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                axios.post("/api/disciplina/delete", { id });
                const filtered = disciplinas.filter((disciplina) => disciplina.id !== id);
                setDisciplinas(filtered);

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

    const actionsColumnTemplate = (rowData) => {
        return <>
            <button type="button" title="Deletar" onClick={() => { confirm(rowData.id) }} className="btn btn-sm btn-danger me-2 mt-1"><i className="bi bi-trash"></i></button>
            <ConfirmDialog />
            <Link className="btn btn-primary btn-sm mt-1 " to={`./${rowData.id}`} role="button"><i className="bi bi-pencil"></i></Link>
        </>;
    }

    const descricaoColumnTemplate = (rowData) => {
        return <>
            {stripHtml(rowData.descricao).result}
        </>;
    }
    return (
        <>
            <Toast ref={toast} />
            <div className="container">
                <div className="p-3 m-3">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1>Disciplinas</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-sm-12">
                            <Link to="/disciplinas/new" role="button" className="btn btn-primary">Adicionar Disciplina</Link>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <DataTable value={disciplinas}>
                                <Column field="nome" header="Nome"></Column>
                                <Column body={descricaoColumnTemplate} header="Descrição"></Column>
                                <Column header="Ações" body={actionsColumnTemplate}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Disciplinas;