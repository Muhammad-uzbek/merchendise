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
        console.log("Fields", fields);
        console.log("Files", files);
        await saveFile(files.image);
        res.status(200).end();
    });
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