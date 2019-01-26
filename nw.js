let Service = require('node-windows').Service;
 
let svc = new Service({
  name: 'node_fee',    //服务名称
  description: '切图分单nodejs后台', //描述
  script: './app.js' //nodejs项目要启动的文件路径
});
 
svc.on('install', () => {
  svc.start();
});

svc.on('uninstall',()=>{
    console.log('服务器被卸载')
})

svc.on('aleadyinstalled',()=>{
    console.log('服务器已经安装')
})
if(svc.exists) return svc.uninstall();
 
 
svc.install();

