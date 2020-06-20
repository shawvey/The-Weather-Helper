var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
const sqlite3 = require('sqlite3').verbose();



var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// add user
router.post('/addUser', (req, res) => {
    let db = new sqlite3.Database('./db/DB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database.');
    });
    
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    sql=sql+'(\''+params.name+'\',\''+params.account+'\',\''+params.pass+'\',\''+params.checkPass+'\',\''+String(params.email)+'\',\''+params.phone+'\',\''+params.card+'\',\''+params.birth+'\',\''+params.sex+'\')';
    
    db.get(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        else{
            res.send('ok');
        }
    })
    db.close();
});


//search user
router.post('/login', (req, res) => {
    let db = new sqlite3.Database('./db/DB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database.');
    });
    var sql_name = $sql.user.select_name;
    var params = req.body;
    var keywords = JSON.parse(Object.keys(params));
    console.log(keywords);
    if (keywords.name) {
        sql_name += "where username ='"+ keywords.name +"'";
    }
    db.get(sql_name, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            res.send('-1')   //cannot search username，return -1
        } else {
            if(result.password === keywords.password) {
                jsonWrite(res, result);
            } else {
                res.send('0')  //username
            }
        }
    })
    db.close();
});



//get user information
router.get('/getUser', (req, res) => {
    let db = new sqlite3.Database('./db/DB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database.');
    });
    
    var sql_name = $sql.user.select_name;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += "where username ='"+ params.name +"'";
    }
    db.get(sql_name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //cannot search username，return -1
        } else {
            jsonWrite(res, result);
        }
    })
    db.close();
});

//update user information
router.post('/updateUser', (req, res) => {
    let db = new sqlite3.Database('./db/DB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database.');
    });    
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where username ='"+ params.id + "'";
    }
    console.log(sql_update);
    db.get(sql_update,function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send('ok'); 
        }
    })
    db.close();
});


//update password
router.post('/modifyPassword', (req, res) => {
    let db = new sqlite3.Database('./db/DB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database.');
    });
    
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify +=  " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where username ='"+ params.id + "'";
    }
    db.get(sql_modify, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        else {
            res.send('ok'); 
        }
    })
    db.close();
});


module.exports = router;
