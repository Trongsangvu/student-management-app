const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.put('/:MASV', (req, res) => {
    const masv = req.params.MASV;
    const newDiem = req.body.DIEM;

    const updateScore =  'UPDATE diemsv SET DIEM=? WHERE MASV=?';
    db.query(updateScore, [newDiem, masv], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Score updated successfully');
            res.send('Score updated successfully');
        }
    });
});

module.exports = router;
