import axios from 'axios';

async function getSecure(endpoint) {
    const token = localStorage.getItem('token');
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}


async function postSecure(endpoint, data = {}) {
    const token = localStorage.getItem('token');

    const response = await axios.post(endpoint, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export { getSecure, postSecure };