var express = require('express');
var get = require('./get.js');

var app = express();

//设置跨域请求头
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/get', async function (req, res) {
    const rows = await get(`select * from ludan WHERE date Like '%${req.query.date}%' && fee != ''  && customer like '%${req.query.customer}%'`)
    res.status("200")
    res.json({
        code: 0,
        msg: '请求成功',
        data: rows
    })
})
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})