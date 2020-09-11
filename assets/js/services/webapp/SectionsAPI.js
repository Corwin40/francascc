import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/sections")                 // Requete en GET
        .then(response => response.data['hydra:member'])        // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/sections/" + id )
        .then(response => response.data);
}
function updateOne(id, section) {
    return axios
        .put("http://localhost:8000/api/sections/" + id, section);
}

function newOne(section) {
    return axios
        .post("http://localhost:8000/api/sections", section);
}

function findbyPage(id) {
    return axios
        .get("http://localhost:8000/api/pages/" + id +"/sections");
}

function deletePage(id) {
    axios
        .delete("http://localhost:8000/api/sections/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    findbyPage,
    updateOne,
    delete:deletePage
};