import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/articles")                 // Requete en GET
        .then(response => response.data['hydra:member'])        // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/articles/" + id )
        .then(response => response.data);
}
function updateOne(id, article) {
    return axios
        .put("http://localhost:8000/api/articles/" + id, article);
}

function newOne(article) {
    return axios
        .post("http://localhost:8000/api/articles", article);
}

function deleteArticle(id) {
    axios
        .delete("http://localhost:8000/api/articles/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deleteArticle
};