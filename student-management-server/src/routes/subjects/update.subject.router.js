const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.put('/:MAMH', (req, res) => {
    const mamh = req.params.MAMH;
    const {TENMH, SOTC } = req.body;

    const updateQuery = 'UPDATE monhoc SET TENMH=?, SOTC=? WHERE mamh=?';
            
    db.query(updateQuery,[TENMH, SOTC, mamh], (err, result) => {
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