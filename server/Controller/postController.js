const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports.createpost = (req, res) => {
  //for image
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    //fields er moddhe title,des,body aiguai ase
    console.log({ fields });
    console.log({ files });

    //destructure fields
    const { title, description, body, slug, _id, name } = fields;

    //validation
    const errors = [];
    if (title === "") {
      error.push({ msg: "Title is Required" });
    }
    if (body === "") {
      error.push({ msg: "Body is Required" });
    }

    if (description === "") {
      error.push({ msg: "Description is Required" });
    }

    if (slug === "") {
      error.push({ msg: "slug is Required" });
    }

    if (Object.keys(files).length === 0) {
      error.push({ msg: "Image is Required" });
    } else {
      //amra just jpeg and png k allow korbo image a
      const { type } = files.image;
      const split = type.split("/");
      //split means image/jpeg like that
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        imageErrors.push({ msg: `${extension} is not a valid extension` });
      } else {
        //jdi extension match kore thn amra ekta uuid te image store korbo
        //unique name
        files.image.name = uuidv4() + "." + extension;
        //directory replace kora

        const newPath =
          __dirname + `./../../client/public/images${files.image.name}`;

        //ekhn image k ekta specific jaygay save korbo
        //means directory change korte hobe
        fs.copyFile(files.image.path, newPath, (error) => {
          if (!error) {
            console.log("Image Uploaded");
          }
        });
      }

      if (errors.length != 0) {
        return res.staus(400).json({ errors, flies });
      } else {
      }
    }

    //now amra client er postmethods a giye console.log(error.rsponse)kori

    //aikhn a amra express validator use kortee parbo na cz
    //express validator amra pass korte pari req.body te

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
};

//express a image upload handle korar jonno amra package formidable install korbo
