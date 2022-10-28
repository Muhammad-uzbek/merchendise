import axios from "axios";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error", err);
            throw err;
        }
        let result = await axios.post("http://164.92.248.91:3096/imageserver/image", files);
        res.status(200).json(result);
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

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};