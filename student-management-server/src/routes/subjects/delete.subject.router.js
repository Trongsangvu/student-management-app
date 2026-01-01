const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

router.delete('/:MAMH', (req, res) => {
    const query = 'DELETE FROM monhoc WHERE mamh='+ req.params.MAMH;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else{
            res.send(result);
        }
    });
});

module.exports = router;