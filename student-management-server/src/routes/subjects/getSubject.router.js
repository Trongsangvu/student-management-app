const express = require('express');
const router = express.Router();
const db = require('../server/controllers/connectdb');

// Search students 
router.get('/:MAMH', (req, res) => {
    const mamh = req.params.MAMH;
    const query = "SELECT * FROM monhoc WHERE MAMH=?"
    db.query(query, [mamh], (err, result) => {
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