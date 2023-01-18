import { Navigate } from 'react-router-dom';

function ProtectedRoute({ usuario, children }) {

    // const isLoggedIn = async function () {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await axios.get('/api/auth/is-logged', { params: { token: token } });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // isLoggedIn().then(result => {
    //     if (!result) {
    //         navigate("/not-authorized");
    //     } else {
    //         return children;
    //     }
    // });


    if (!usuario) {
        return <Navigate to='/admin/not-authorized' />;
    }
    return children;

}

export default ProtectedRoute;