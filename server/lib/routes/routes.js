const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

router.get('/', function (req, res) {
    console.log('MAIN PAGE');
    // res.sendFile('index.html', {
    //     root: path.join(__dirname, '..', 'dist'),
    // });
    res.render('index.html');
});
/*================================================*/
/*================================================*/

router.get('*', function (req, res) {
    res.redirect('/');
});

/*================================================*/
/*================================================*/
module.exports = router;
