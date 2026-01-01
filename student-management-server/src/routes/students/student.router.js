const express = require('express');
const db = require('../server/controllers/connectdb');
const router = express.Router();

// Get all students from the database
router.get('/', (req, res) => {
    db.query('SELECT * FROM sinhvien', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res) => {
    const {MASV, TENSV, DCSV, MALP} = req.body;
    const query = 'INSERT INTO sinhvien (MASV, TENSV, DCSV, MALP) VALUES (?, ?, ?, ?)'
    
    db.query(query,[MASV, TENSV, DCSV, MALP], (error, results) => {
      if(error) {
        console.error('Error when adding to student:' + error.message);
        res.status(500).json({error: 'Error when adding to student'});
      } else {
        console.log('Data added successfully');
        res.status(200).json({message: 'Data added successfully'});
      }  
    });
});




// Search students 
router.get('/:MASV', (req, res) => {
    const masv = req.params.MASV;
    const query = "SELECT * FROM sinhvien WHERE MASV=?"
    db.query(query,[masv], (err, result) => {
      if (err) {
        console.error('Error querying:' + err.message);
        res.status(500).send({err: 'Database query error'});
        return;
      }

      if (result.length > 0) {
        const student = result[0];
        res.json(student);
      } else {
        res.status(404).json({error: 'Not found'});
      }
    });
});


module.exports = router;