const formidable = require("formidable");
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

    if (errors.length != 0) {
      return res.staus(400).json({ errors });
    }

    //now amra client er postmethods a giye console.log(error.rsponse)kori

    //aikhn a amra express validator use kortee parbo na cz
    //express validator amra pass korte pari req.body te

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
};

//express a image upload handle korar jonno amra package formidable install korbo
