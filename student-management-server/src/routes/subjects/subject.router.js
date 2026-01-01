const express = require('express');
const db = require('../server/controllers/connectdb');
const router = express.Router();

// Get all subject from the database
router.get('/', (req, res) => {
    db.query('SELECT * FROM monhoc', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res) => {
    const {MAMH, TENMH, SOTC} = req.body;
    const query = 'INSERT INTO monhoc (MAMH, TENMH, SOTC) VALUES (?, ?, ?)'
    
    db.query(query,[MAMH, TENMH, SOTC], (error, results) => {
        
        if(error) {
            console.error('Error when adding to subject:' + error.message);
            res.status(500).json({error: 'Error when adding to subject'});
        } else {
            console.log('Data added successfully');
            res.status(200).json({message: 'Data added successfully'});
        }   
    });
});



module.exports = router;