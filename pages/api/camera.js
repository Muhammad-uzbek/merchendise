import axios from "axios";
import formidable from "formidable";
import fs from "fs";
import { runInNewContext } from "vm";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res) => {
    // import api call from front-end and send it to the server
    var data = req.body;
    var config = {
    method: 'post',
    url: 'http://164.92.248.91:3096/imageserver/image',
    headers: { 
        'Content-Type': 'multipart/form-data'
    },
        data : data
    };
    axios(config)
    .then(function (response) {
        res.status(200).json(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file);
  axios.post("http://164.92.248.91:3096/imageserver/image", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }).then((res) => {
        console.log(res);
    });
};
