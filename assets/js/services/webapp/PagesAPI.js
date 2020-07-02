import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/pages")                 // Requete en GET
        .then(response => response.data['hydra:member'])        // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/pages/" + id )
        .then(response => response.data);
}
function updateOne(id, page) {
    return axios
        .put("http://localhost:8000/api/pages/" + id, page);
}

function newOne(page) {
    return axios
        .post("http://localhost:8000/api/pages", page);
}

function deletePage(id) {
    axios
        .delete("http://localhost:8000/api/pages/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deletePage
};