const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.put('/:MALP', (req, res) => {
    const malp = req.params.MALP;
    const { TENLP, NK } = req.body;
    const updateClass =  'UPDATE lop SET TENLP=?, NK=? WHERE MALP=?';
    db.query(updateClass, [TENLP, NK, malp], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Class updated successfully');
            res.send('Class updated successfully');
        }
    });
});

module.exports = router;
