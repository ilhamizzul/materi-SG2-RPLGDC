const express = require('express')
const router = express.Router()
const db = require('../conn')
const request = require('request')

// router.get('/fakultas', (req, res) => {
//     let whereCon = ''
//     if(req.query.id) {
//         whereCon = "where id_fakultas = '"+ req.query.id + "'"
//     }
//     if (req.query.nama_fakultas) {
//         whereCon = "where nama_fakultas = '"+ req.query.nama_fakultas +"'"
//     }
//     db.query('SELECT * FROM tb_fakultas '+ whereCon, (err, results) => {
//         if(err) {
//             res.json({status: err})
//         } else {
//             res.json(results)
//         }
//     })
// })

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

const getJurusanById = (id, res) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT nama_jurusan FROM tb_jurusan WHERE id_fakultas = ?', [id], (err, results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.get('/detail_fakultas', (req, res) => {
    db.query('SELECT * FROM tb_fakultas', async (error, fakultas_results) => {
        if (error) {
            res.json({status : error})
        } else {
            let data_fakultas = {fakultas : []}

            await asyncForEach(fakultas_results, async (element) => {
                const jurusan = await getJurusanById(element.id_fakultas, res).catch(result => {
                    res.json(result)
                })

                data_fakultas.fakultas.push({
                    id_fakultas : element.id_fakultas,
                    nama_fakultas : element.nama_fakultas,
                    jurusan : jurusan
                })

                
            })
            res.json(data_fakultas)
        }
    })
})

router.get('/fakultas', (req, res) => {
    db.query('SELECT * FROM tb_jurusan ', (err, results) => {
        if(err) {
            res.json({status: err})
        } else {
            res.json(results)
        }
    })
})

// router.get('/fakultas/:id', (req, res) => {
//     db.query('SELECT * FROM tb_fakultas WHERE id_fakultas=?', [req.params.id], (err, results) => {
//         if(err) {
//             res.json({status : err})
//         } else {
//             res.json(results)
//         }
//     })
// })

router.get('/fakultas/:nama_fakultas', (req, res) => {
    db.query('SELECT * FROM tb_fakultas WHERE nama_fakultas=?', [req.params.nama_fakultas], (err, results) => {
        if(err) {
            res.json({status : err})
        } else {
            res.json(results)
        }
    })
})

router.post('/fakultas', (req, res) => {
    var data = {
        nama_fakultas : req.body.nama_fakultas
    }
    // res.json(req.body)
    db.query('INSERT INTO tb_fakultas SET ?', data, (err, results) => {
        if (err) {
            res.json({status : err})
        } else {
            res.json({
                'row affected': results.affectedRows,
                msg : "POST Success"
            })
        }
    })
})

router.delete('/fakultas/:id', (req, res) => {
    db.query('DELETE FROM tb_fakultas WHERE id_fakultas = ?', [req.params.id], (err, results) => {
        if (err) {
            res.json({status : err})
        } else {
            res.json({
                'Row Affected': results.affectedRows,
                msg : "DELETE Success"
            })
        }
    })
})

router.put('/fakultas/:id', (req, res) => {
    var data = {
        nama_fakultas : req.body.nama_fakultas
    }
    db.query('UPDATE tb_fakultas SET ? WHERE id_fakultas = ?', [data, req.params.id], (err, results) => {
        if (err) {
            res.json({status : err})
        } else {
            res.json({
                'row affected' : results.affectedRows,
                msg : 'UPDATE Success'
            })
        }
    })
})

module.exports = router
