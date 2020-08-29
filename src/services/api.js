import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://rocketseat-node.herokuapp.com/api'
    baseURL: 'https://api.jsonbin.io/b'
});

export default api;