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
        console.log(fields);
        console.log(files);
    });
    res.status(200).json({ message: "OK" });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file);
  fs.writeFileSync(`./public/images/${file.name}`, data);
  fs.unlinkSync(file.path);
  return;
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