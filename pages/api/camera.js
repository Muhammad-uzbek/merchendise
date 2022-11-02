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
        const form = new formidable.IncomingForm();
        console.log(req.body|| req.query || req.data);
        form.parse(req, (err, fields, files) => {
            console.log(req.body);
            console.log(fields);
            // upload file to the server with axios
            axios.post("http://164.92.248.91:3096/imageserver/image", files, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                }).then((res) => {
                    console.log(res);
                }
            );
            if(err) {
                console.log(err);
            }
        });
        res.status(200).json({message: 'ok'});
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
