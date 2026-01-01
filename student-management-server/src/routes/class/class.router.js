const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.get('/', (req, res) => {
    db.query('SELECT * FROM lop', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

router.post('/', (req, res) => {
    const { MALP, TENLP, NK } = req.body;
    const query = 'INSERT INTO lop (MALP, TENLP, NK) VALUES (?, ?, ?)';

    db.query(query, [MALP, TENLP, NK], (err, results) => {
        if(err) {
            console.error('Error when adding to class:' + err.message);
            res.status(500).json({error: 'Error when adding to class'});
        } else {
            console.log('Data added successfully');
            res.status(200).json({message: 'Data added successfully'});
        }    
    });
});




module.exports = router;