import { Navigate } from 'react-router-dom';

function ProtectedRoute({ usuario, children }) {

    if (!usuario) {
        return <Navigate to='/admin/not-authorized' />;
    }
    return children;
}

export default ProtectedRoute;