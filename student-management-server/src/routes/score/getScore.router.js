const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.get('/:MASV', (req, res) => {
    const masv = req.params.MASV;
    const query = `
        SELECT DIEMSV.MASV, DIEMSV.MAMH, MONHOC.TENMH, DIEMSV.DIEM
        FROM DIEMSV
        JOIN MONHOC 
        ON DIEMSV.MAMH = MONHOC.MAMH
        WHERE DIEMSV.MASV = ?
    `; 
    db.query(query, [masv], (err, result) => {
        if (err) {
            console.error('Error querying: '+ err.message);
            res.status(500).send({err: 'Database query error'});
        } else if (result.length > 0) {
            const scores = result;
            res.json(scores);
        } else {
            res.status(404).json({error: 'Not found'});
        }
    });
});
module.exports = router;