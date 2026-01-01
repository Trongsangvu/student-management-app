const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.put('/:MASV', (req, res) => {
    const masv = req.params.MASV;
    const {TENSV, DCSV, MALP } = req.body;

    const updateQuery = 'UPDATE sinhvien SET TENSV=?, DCSV=?, MALP=? WHERE MASV=?';
            
    db.query(updateQuery,[TENSV, DCSV, MALP, masv], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Student updated successfully');
            res.send('Student updated successfully');
        }
    }); 
});

module.exports = router;