const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
const userList = [
    {id: 1, name: "aaa", address: "bbb"},
    {id: 2, name: "ccc", address: "ddd"},
    {id: 3, name: "bbb", address: "eee"}
]
app.get('/user', (req, res) => {
    res.json(userList);
})
app.listen(5000);