const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.get('/:MALP', (req, res) => {
    const malp = req.params.MALP;
    const query = 'SELECT * FROM lop WHERE malp=?'; 
    db.query(query, [malp], (err, result) => {
        if (err) {
            console.error('Error querying: '+ err.message);
            res.status(500).send({err: 'Database query error'});
        } else if (result.length > 0) {
            const scores = result[0];
            res.json(scores);
        } else {
            res.status(404).json({error: 'Not found'});
        }
    });
});

module.exports = router;