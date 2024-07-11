const express = require('express');
const session = require('express-session')
const bParser = require("body-parser")
const http = require('http');
const user = Math.random() * (99999 - 0) + 0;

const app = express();
var path = require('path');
const fs = require('fs');
const DB = require('./public/server/marker.json');
const DB_History = require('./public/server/history.json');

app.engine('html', require('ejs').renderFile);
app.use(bParser.urlencoded({extended:false}));
app.use(session({ secret: user, resave: false, saveUninitialized:false }))
app.set('view engine', 'html');
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('map', path.join(__dirname, '/views'));
const httpS = http.createServer(app);

httpS.listen(3000);

function getJson(req) {
    if (req.body.edit) {
        fs.readFile("./public/server/marker.json", "utf8", (error, data) => {
            if (error) {
            console.log(error);
            return;
            }
            let json = JSON.parse(data);
            json.marcadores.map((obj) => {
                if (obj.id == req.body.idAdd) {
                    editJson(req, obj);
                }
            })
        });
    }
}

function editJson(req, obj) {
    let db = DB;
    let dbH = DB_History;

    db.marcadores[obj.id / 2].status = req.body.statusAdd;
    db.marcadores[obj.id / 2].date = req.body.dateAdd;

    fs.writeFile('public/server/marker.json', JSON.stringify(db), err => {
        if (err) return err;
        console.log("Editado");
    });
    
    let hInf = {
        "status": req.body.statusAdd,
        "date": req.body.dateAdd
    };

    dbH.id[obj.id / 2].history.push(hInf);
    fs.writeFile('public/server/history.json', JSON.stringify(dbH), err => {
        if (err) return err;
        console.log('Gravado Histórico');
    });
}


function writeJson(req) {
    if (req.body.botao) {
        let db = DB;
        let dbH = DB_History;

        let m = { 
            "status": req.body.status,
            "num": req.body.number,
            "id": req.body.id,
            "date": req.body.date,
            "position": {
                "lat": req.body.lat,
                "lng": req.body.lng
            }
        };
        let hInf = {
            "status": req.body.status,
            "date": req.body.date
        };
        let h = {
            "id": req.body.id,
            "history": []
        };

        dbH.id.push(h);
        dbH.id[req.body.id / 2].history.push(hInf);
        db.marcadores.push(m);

        fs.writeFile('public/server/marker.json', JSON.stringify(db), err => {
            if (err) return err;
            console.log('Gravado Marcador');
        });
        fs.writeFile('public/server/history.json', JSON.stringify(dbH), err => {
            if (err) return err;
            console.log('Gravado Histórico');
        });
    }
}

app.get('/history', (req,res)=>{
    res.sendFile(__dirname + "/views/history.html");
});
app.post('/history', (req,res)=>{
    if (req.body.change) {
        res.redirect(req.body.change);
    } else {
        console.log(req.body.change)
        res.sendFile(__dirname + "/views/history.html");
    }
});

app.get('/map', (req,res)=>{
    res.sendFile(__dirname + "/views/map.html");
});
app.post('/map', (req,res)=>{
    if (req.body.change) {
        res.redirect(req.body.change);
    } else {
        writeJson(req);
        getJson(req);
        res.sendFile(__dirname + "/views/map.html");
    }
});

app.get('/sobre', (req,res)=>{
    res.sendFile(__dirname + "/views/sobre.html");
});
app.post('/sobre', (req,res)=>{
    if (req.body.change) {
        res.redirect(req.body.change);
    } else {
        res.sendFile(__dirname + "/views/sobre.html");
    }
});

app.get('/contatos', (req,res)=>{
    res.sendFile(__dirname + "/views/contatos.html");
});
app.post('/contatos', (req,res)=>{
    if (req.body.change) {
        res.redirect(req.body.change);
    } else {
        res.sendFile(__dirname + "/views/contatos.html");
    }
});

app.get('/', (req,res)=>{
    res.redirect('/map');
});