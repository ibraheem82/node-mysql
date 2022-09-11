const express = require("express");
const router = express.Router()


router.get("/", (res, req) => {
    res.render("index");
})



router.get("/register", (res, req) => {
    res.sendFle("register.html", {root: "/public/"});
})



router.get("/login", (res, req) => {
    res.sendFle("login.html", {root: "./public/"});
})

module.exports = router;