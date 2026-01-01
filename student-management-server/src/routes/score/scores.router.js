const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

// Process request to display scores
router.get('/', (req, res) => {
    const query = `
        SELECT DIEMSV.MASV, DIEMSV.MAMH, MONHOC.TENMH, DIEMSV.DIEM
        FROM DIEMSV
        JOIN MONHOC ON DIEMSV.MAMH = MONHOC.MAMH
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.log('Error querying database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res) => {
    const { MASV, MAMH, DIEM } = req.body;
    const query = 'INSERT INTO diemsv (MASV, MAMH, DIEM) VALUES (?, ?, ?)';
    db.query(query, [MASV, MAMH, DIEM], (err, resluts) => {
        if (err) {
            console.error('Error when adding to diemsv:' + err.message);
            res.status(500).json({error: 'Error when adding to diemsv'});
        } else {
            console.log('Data added successfully');
            res.status(200).json({message: 'Data added successfully'});
        }
    });
});

module.exports = router;