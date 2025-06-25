const bcrypt = require("bcrypt");
const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const signToken = require("../helpers/signToken");
const fs = require("fs");
const path = require("path");
const usersController = {
  signIn: async (req, res) => {
    try {
      const db = await getDatabase();
      var user = null;
      console.log(req.body);
      //وقتی یکی میخواد وارد سایت بشه اولین کاری که میکنیم اینه که چک کنیم ایا قبلا همچین یوزری داشتیم یا ن
      // check if the email is the admin email, or doctor email because only admin and doctor can sign in.
      const admin = await db
        .collection("admin")
        .findOne({ email: req.body.email });
      const doctor = await db
        .collection("doctors")
        .findOne({ email: req.body.email });
      // findone is a function of mongodb
      if (!admin && !doctor) {
        return returnStatus(res, 404, true, "Not Found");
      }
      if (admin) {
        user = admin;
      }
      if (doctor) {
        user = doctor;
      }

      // compare passwords , password is what is sent to the server and user. password is the hashed passwrod from the database.

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return returnStatus(res, 401, true, "Invalid email or password");
        }

        // Generate JWT
        const newJWT = signToken({
          email: user.email,
        });

        //send Token
        return returnStatus(res, 200, false, `Welcome ${user.username}`, {
          token: newJWT,
          username: user.username,
        });
      });
    } catch (error) {
      console.log(error);
      return returnStatus(res, 500, true, "Internal server error");
    } finally {
      // finally is a block of code that means no matter what happens in try and catch block i want to run this code (inside of finally block)
      if (client) {
        await client.close();
      }
    }
  },
  checkifloggedin: async (req, res) => {
    try {
      const db = await getDatabase();
      // remember decodedtoken is coming from verifyToken middleware,
      const admin = await db.collection("admin").findOne({
        email: req.decodedtoken.email,
      });
      // check if this user is admin, if yes,send admin:true object
      if (admin) {
        return returnStatus(res, 200, false, "ok", { admin: true });
      }
      const doctor = await db.collection("doctors").findOne({
        email: req.decodedtoken.email,
      });

      // Find the file with the corresponding user ID, regardless of extension
      if (doctor) {
        const uploadsDir = path.join(__dirname, "/../uploads");
        var image = null;
        const files = await fs.promises.readdir(uploadsDir);
        const imageFile = files.find((file) =>
          file.startsWith(doctor.idnumber)
        );
        var base64Image = "";
        if (imageFile) {
          // Read the image file
          const imagePath = path.join(uploadsDir, imageFile);
          image = fs.readFileSync(imagePath);

          //convert the image to base64
          base64Image = Buffer.from(image).toString("base64");
        }
        return returnStatus(res, 200, false, "ok", {
          image: base64Image,
          doctor: true,
          idnumber: doctor.idnumber,
          phone: doctor.phone,
          email: doctor.email,
          username: doctor.username,
        });
      } else {
        return returnStatus(res, 401, true, "Unauthorized");
      }
    } catch (error) {
      console.log(error);
      return returnStatus(res, 500, true, "Internal server error");
    } finally {
      if (client) {
        await client.close();
      }
    }
  },
};

module.exports = usersController;
