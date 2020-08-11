import axios from 'axios';

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/configs/" + id )
        .then(response => response.data);
}

function updateOne(id, config) {
    return axios
        .put("http://localhost:8000/api/configs/" + id, config);
}

function newOne(config) {
    return axios
        .post("http://localhost:8000/api/configs", config);
}

export default {
    findOne,
    newOne,
    updateOne
};