var express = require('express');
var bodyParser = require('body-parser');
var query = require('./query.js');

var app = express();
//只要加入这个配置，在req请求对象上会多出来一个属性
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
//parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

//设置跨域请求头
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile( __dirname + "/public/" + "index.html" );
})

app.get('/get', async function (req, res) {
    const name = mm(req.query.mm);
    var rows;
    if(name==''){
        rows = await query(`select * from ludan WHERE date Like '%${req.query.date}%' && fee != ''  && customer like '%${req.query.customer}%'`)
    }else {
        rows = await query(`select * from ludan WHERE fee like '%${name}%' && complete != 1  && customer like '%${req.query.customer}%'`)
    }
    res.status("200")
    res.json({
        code: 0,
        msg: '请求成功',
        user: name,
        data: rows
    })
})

app.post('/', async (req, res) => {
    const rows = await query(`select * from ludan WHERE uid = '${req.body.data[0].id}'`);
    if (rows.length === 0) {
        await query(`insert into ludan(uid,company,business,customer,qdate,xdate,qmoney,smoney,type,workload,programmer,designer,fee,date)values('${req.body.data[0].id}','${req.body.data[0].company}','${req.body.data[0].business}','${req.body.data[0].customer}','${req.body.data[0].qdate}','${req.body.data[0].xdate}','${req.body.data[0].qmoney}','${req.body.data[0].smoney}','${req.body.data[0].type}','${req.body.data[0].workload}','${req.body.data[0].programmer}','${req.body.data[0].designer}','${req.body.data[0].fee}','${req.body.data[0].feetime}')`)
        res.json({
            code: 0,
            msg: '请求成功2'
        })
    } else {
        await query(`update ludan set company='${req.body.data[0].company}',business='${req.body.data[0].business}',customer='${req.body.data[0].customer}',qdate='${req.body.data[0].qdate}',xdate='${req.body.data[0].xdate}',qmoney='${req.body.data[0].qmoney}',smoney='${req.body.data[0].smoney}',type='${req.body.data[0].type}',workload='${req.body.data[0].workload}',programmer='${req.body.data[0].programmer}',designer='${req.body.data[0].designer}',fee='${req.body.data[0].fee}',date='${req.body.data[0].date}' where uid='${req.body.data[0].id}'`)
        res.json({
            code: 0,
            msg: '请求成功3'
        })
    }
})

app.post('/complete', async (req, res) => {
    for(var i=0;i<req.body.data.length;i++){
        await query(`update ludan set complete='1' where uid='${req.body.data[i].uid}'`)
    }
    res.json({
        code: 0,
        msg: '请求成功4'
    })

}) 
var server = app.listen(7000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

function mm(mm) {
    switch (mm) {
        case 'lq9588':
            return '李强';
        case 'gyl':
            return '郭玉兰';
        case '3.3':
            return '马利丽';
        case '411323':
            return '石婧';
        case 'fengyanru123':
            return '冯燕'
        case '950410':
            return '王卓';
        case 'hakunamatata':
            return ''
        default:
            return '你猜我是谁'
    }
}