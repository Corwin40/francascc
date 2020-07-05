import axios from 'axios';

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/sites/" + id )
        .then(response => response.data);
}
function updateOne(id, site) {
    return axios
        .put("http://localhost:8000/api/sites/" + id, site);
}

function newOne(site) {
    return axios
        .post("http://localhost:8000/api/sites", site);
}

export default {

    findOne,
    newOne,
    updateOne
};