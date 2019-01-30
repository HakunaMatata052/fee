var express = require('express');
var bodyParser = require('body-parser');
var archiver = require('archiver'); //zip解压
var multer = require('multer'); //文件上传
var dateFormat = require("format-datetime"); //格式化日期
var fs = require("fs"); //文件I/O
var unzip = require("unzip2"); //zip解压
var query = require('./query.js'); //数据库查询
var rmdir = require('./rmdir.js'); //数据库查询

var app = express();
//只要加入这个配置，在req请求对象上会多出来一个属性
//parse application/x-www-form-urlencoded
app.use(bodyParser.json({
    limit: '6mb'
}));
app.use(bodyParser.urlencoded({
    limit: '6mb',
    extended: true
}));

app.use('/uploads',express.static('uploads'))
app.use(express.static('public'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')  //保存文件夹的路径
    },
    filename: function (req, file, cb) {
        cb(null, dateFormat(new Date(), "yyyyMMddHHmmss") + '.zip')  //修改文件名
    }
})

var upload = multer({
    storage: storage
})



//设置跨域请求头
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/get', async function (req, res) {
    const name = mm(req.query.mm);
    var rows;
    if (name == '') {
        rows = await query(`select * from ludan WHERE date Like '%${req.query.date}%' && fee != ''  && customer like '%${req.query.customer}%'`)
    } else {
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
    for (var i = 0; i < req.body.data.length; i++) {
        const rows = await query(`select * from ludan WHERE uid = '${req.body.data[i].id}'`);
        if (rows.length === 0) {
            await query(`insert into ludan(uid,company,business,customer,qdate,xdate,qmoney,smoney,type,workload,programmer,designer,xgjs,fee,date)values('${req.body.data[i].id}','${req.body.data[i].company}','${req.body.data[i].business}','${req.body.data[i].customer}','${req.body.data[i].qdate}','${req.body.data[i].xdate}','${req.body.data[i].qmoney}','${req.body.data[i].smoney}','${req.body.data[i].type}','${req.body.data[i].workload}','${req.body.data[i].programmer}','${req.body.data[i].designer}','${req.body.data[i].designer}/${req.body.data[i].programmer}','${req.body.data[i].fee}','${req.body.data[i].home}')`)
        } else {
            await query(`update ludan set company='${req.body.data[i].company}',business='${req.body.data[i].business}',customer='${req.body.data[i].customer}',qdate='${req.body.data[i].qdate}',xdate='${req.body.data[i].xdate}',qmoney='${req.body.data[i].qmoney}',smoney='${req.body.data[i].smoney}',type='${req.body.data[i].type}',workload='${req.body.data[i].workload}',programmer='${req.body.data[i].programmer}',designer='${req.body.data[i].designer}',xgjs='${req.body.data[i].designer}/${req.body.data[i].programmer}',fee='${req.body.data[i].fee}',date='${req.body.data[i].home}' where uid='${req.body.data[i].id}'`)
        }
    }
    res.json({
        code: 0,
        msg: '请求成功3'
    })
})

//生成工作量表Excel
app.post('/complete', async (req, res) => {
    for (var i = 0; i < req.body.data.length; i++) {
        await query(`update ludan set complete='1' where uid='${req.body.data[i].uid}'`)
    }
    res.json({
        code: 0,
        msg: '请求成功4'
    })

})

//更新上传时间
app.post('/html', async (req, res) => {
    await query(`update ludan set html='${req.body.addtime}' where customer='${req.body.companyname}' && fee ='${req.body.fee}'`)
    res.json({
        code: 0,
        msg: '请求成功5'
    })
})

app.post('/upload', upload.any(), (req, res) => {
    // fs.createReadStream(req.files[0].path).pipe(unzip.Extract({path: req.files[0].path.split('.')[0]}))  //解压
    res.json({
        code: 0,
        msg: '请求成功6',
        data:req.files[0]
    });
})

app.post('/save',function(req,res){
    

    var http = require('http');
    var querystring = require('querystring');
     
    var contents = querystring.stringify(req.body);
    console.log(req.body)
     
    var options = {
        host:'192.168.0.253',
        port:'5000',
        path:'/api/save.ashx',
        method:'POST',
        headers:{
            'Content-Type':'text/html',
            'Content-Length':contents.length
        }
    }
     
    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',function(data){
            console.log("data:",data);   //一段html代码
        });
    });
     
    req.write(contents);
    req.end;

})


app.post('/upload/del', (req, res) => {
    // console.log(__dirname+'/'+req.body.url)
    rmdir(__dirname+'/'+req.body.url,function(){
        res.json({
            code: 0,
            msg: '请求成功7'
        })
    })
})


app.get('/uploads/:id/html', (req, res) => {
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile(__dirname + "/uploads/" +req.params.id+ "/html/index.html");
})

app.listen(9000, function () {
    console.log('服务器已开启')
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
        case 'hakunamatata52':
            return ''
        default:
            return '你猜我是谁'
    }
}