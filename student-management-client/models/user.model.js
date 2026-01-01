const db = require('../server/controllers/connectdb');

const User = function(user) {
    this.name = user.name;
    this.passsword = user.passsword;
}

User.create = (newUser, result) => {
    db.query('INSERT INTO user SET ?', newUser, (err, res) => {
        if (err) {
            console.log('error:', err);
            result(err, null);
            return;
        }
        console.log('created user:', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    })
}

module.exports = User;