const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../server/controllers/connectdb');

router.post('/', async (req, res) => {
    try {
        // Save hashedPassword to the database
        // Hashing Password
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE name = ? AND password =?', [req.body.name, req.body.password, ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        console.log('Query result:', result);

        const rows = result && result.length > 0 ? result[0] : [];
        // User Authentication  
        if (!rows || rows.length === 0) {
            return res.status(400).send('Cannot find user');
        }

        const user = rows[0];

        if (user && user.password && (await bcrypt.compare(req.body.password, user.password))) {
            res.json({ message: 'Success'});
        } else {
            res.json({ message: 'Error' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).send();
    }
});

router.get('/', (req, res) => {
    
})

module.exports = router;