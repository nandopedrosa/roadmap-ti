function Spinner() {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" style={{ color: "#4141c8" }}>
                <span className="visually-hidden">Carregando...</span>
            </div>
        </div>
    );
}
export default Spinner;