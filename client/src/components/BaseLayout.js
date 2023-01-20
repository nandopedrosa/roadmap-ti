// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import Footer from "./Footer";
import { useEffect } from "react";


function BaseLayout({ usuario, setUsuario }) {
    useEffect(() => {
        document.title = "Roadmap de TI - Admin";
    }, []);

    return (
        <>
            <Nav usuario={usuario} setUsuario={setUsuario} />
            <Outlet />
            <Footer />
        </>

    );
}

export default BaseLayout;