const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.json({status: "error", error:"Please enter your email and password"});

    else {
        db.query('SELECT email FROM  users Where email = ?', [email], async(Err, result) => {
            if (Err) throw Err;
            // Compare passwords to each others, or if the password does not match the email in the database. 
            if (!result[0] || !await bcrypt.compare(password, result[0].password)) return res.json({status: "error", error:"Incorrect Email or password."});
                    // *if  any of the conditions matches.
                    else {
                        // you have to know what you want to sign it as, or do u want to put in the cookie values.
                        // * yOUR secret key and the time it is going to expire.
                        // * you can also check your cookie id inside the browser.
                        const token  = jwt.sign({ id: result[0].id}, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES
                        })

                        const cookieOptions = {
                            // ! [24]hr, [60]secs, [60]mins, [1000]miliseconds.
                            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly:true
                        }
                        // * saving the cookie.
                        res.cookie("userRegistered", token, cookieOptions);
                        return res.json({status: "success", success:"User has been logged In"});
                    }

            

        }) 
    }
    
}

module.exports = login;