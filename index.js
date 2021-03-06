const fs = require('fs')
const path = require('path')
const express = require('express')
const app111 = express()
const crypto = require('crypto')
const urlencodedParser = express.urlencoded({extended: false});
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app111.use(cookieParser());
app111.use("/image", express.static('image'))
app111.use("/script", express.static('script'))
app111.use("/css", express.static('css'))

app111.get('/v1/authorization', function (req, res) {
    res.sendFile(__dirname + '/views/authorization.html')
});

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).sendFile(__dirname + '/views/403.html');
    }
    try {
        const bdata = jwt.verify(token, "YOUR_SECRET_KEY");
        req.userId = bdata.id;
        req.userRole = bdata.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};
app111.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
});

app111.post("/v1/authorization",
    urlencodedParser,
    function (req, res) {
        let sha1 = crypto.createHash('sha1')
        let hash = sha1.update(req.body.password).digest('hex')
        req.body.password = hash
        const token = jwt.sign({ id: 1, role: "admin" }, "YOUR_SECRET_KEY");
        return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .redirect("/v1/cars")
});

app111.get("/v1/cars", authorization, (req, res) => {
    res.sendFile(__dirname + '/views/cars.html')
});

app111.get("/SignOut", authorization, (req, res) => {
    return res
        .clearCookie("access_token")
        .redirect('/')
});

app111.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/views/404.html')
});

app111.listen(8080)