const express = require('express')
const route = express.Router()
const db = require('../conn')
const request = require('request')

route.get('/jurusan', (req, res) => {
    db.query('SELECT * FROM tb_jurusan', (err, results) => {
        if (err) {
            return res.json({"msg" : err})
        } else {
            res.json({
                "data" : results
            })
        }
    })
})

route.post('/jurusan', (req, res) => {
    // res.json(req.protocol+"://"+req.headers.host+"/fakultas/"+req.body.nama_fakultas)
    // request(req.protocol+"://"+req.headers.host+"/fakultas/"+req.body.nama_fakultas, {json : true}, (err, res2, body) => {
    //     if(err) {
    //         res.json({"msg" : err})
    //     }
    //     if(body.data == undefined) {
    //         res.json({"msg" : "fakultas not exist"})
    //     } else {
    //         res.json(body.data)
    //         // var data = {
    //         //     nama_jurusan : req.body.nama_jurusan,
    //         //     id_fakultas : body.data.id_fakultas
    //         // }
    //         // db.query('INSERT INTO tb_jurusan SET ?', data, (err2, results) => {
    //         //     if (err2) {
    //         //         res.json({"msg" : err})
    //         //     } else {
    //         //         res.json({
    //         //             "affected rows" : results.affectedRows,
    //         //             "msg" : "POST data Success"
    //         //         })
    //         //     }
    //         // })
    //     }
    // })
    var data = {
        nama_jurusan : req.body.nama_jurusan,
        id_fakultas : req.body.id_fakultas
    }
    db.query('INSERT INTO tb_jurusan SET ?', data, (err, results) => {
        if (err) {
            res.json({"msg" : err})
        } else {
            res.json({
                "affected rows" : results.affectedRows,
                "msg" : "POST data Success"
            })
        }
    })
})

module.exports = route