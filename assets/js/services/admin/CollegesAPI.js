import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/colleges")                 // Requete en GET
        .then(response => response.data['hydra:member'])        // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/colleges/" + id )
        .then(response => response.data);
}
function updateOne(id, college) {
    return axios
        .put("http://localhost:8000/api/colleges/" + id, college);
}

function newOne(college) {
    return axios
        .post("http://localhost:8000/api/colleges", college);
}

function deletecolleges(id) {
    axios
        .delete("http://localhost:8000/api/colleges/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deletecolleges
};