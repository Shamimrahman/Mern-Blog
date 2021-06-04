const mongoose = require("mongoose");

//to avoid problem when we use validation
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

// validation problem end
//schema start ->
//scehma holo field er val ki type hbe ta define korar nam ai

const UserSchema = new mongoose.Schema({
  name: {
    //must be string hoite hobe
    //validation
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,

    required: true,
  },

  cpassword: {
    type: String,

    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//password hash
//password hash
const bcrypt = require("bcryptjs");
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`Password before hashing ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`Password after hashing ${this.password}`);

    this.cpassword = await bcrypt.hash(this.password, 10);
    //database a tahole r confirm password dekhabe na
  }
  next();
});

//jsonweb token
//jwt auth
const jwt = require("jsonwebtoken");
UserSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    res.send("The error part is" + e);
    console.log("The error part is" + e);
  }
};

module.exports = mongoose.models.USER || mongoose.model("USER", UserSchema);
