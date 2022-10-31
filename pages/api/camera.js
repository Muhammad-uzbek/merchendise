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
    if(req.method == 'POST') {
        console.log(req.data);
        var data = req.body || req.data;
        var resp = [{status: "waiting"}];
        var configimg = {
        method: 'post',
        url: 'http://164.92.248.91:3096/imageserver/image',
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
            data : data
        };
        console.log(data);
        console.log(configimg || "wttff");
        axios(configimg)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resp[0] = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        res.status(200).json(resp);
    }
    else {
        res.status(200).json({"status": "not get"});
    }
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
