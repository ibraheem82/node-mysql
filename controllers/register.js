const db = require("../routes/db-config");

// * bcrypt is going to hash our password.
const bcrypt = require("bcryptjs");


const register = async(req, res) => {
    const {email, password:Npassword} = req.body;
    if(!email || !Npassword) return res.json({status: "error", error:"Please enter your email and password"});
    else{
        // * check if the email is already created or not.
        db.query('SELECT email FROM  users Where email = ?', [email], async(err, result) => {
            if(err) throw err;
            if(result[0]) return res.json({status: "error", error:"email has already been registered."})
            else {
                // hash it 8 times
                const password = bcrypt.hash(Npassword, 8);
                // * hashed password will be saved here.
                db.query('INSERT INTO users SET ?', {email:email, password:password}, (error, results) => {
                    if(error) throw error;
                    return res.json({status: "success", success:"User has been registered."})
                })
         }
        })
    }
}
module.exports = register