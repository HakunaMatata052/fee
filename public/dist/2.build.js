webpackJsonp([2],{648:function(t,e,a){"use strict";function o(t){a(657)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(654),i=a(659),n=a(259),l=o,s=n(r.a,i.a,!1,l,null,null);e.default=s.exports},651:function(t,e){function a(t,e){var a=t[1]||"",r=t[3];if(!r)return a;if(e&&"function"==typeof btoa){var i=o(r);return[a].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[a].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=a(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var n=t[r];"number"==typeof n[0]&&o[n[0]]||(a&&!n[2]?n[2]=a:a&&(n[2]="("+n[2]+") and ("+a+")"),e.push(n))}},e}},652:function(t,e,a){function o(t){for(var e=0;e<t.length;e++){var a=t[e],o=u[a.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](a.parts[r]);for(;r<a.parts.length;r++)o.parts.push(i(a.parts[r]));o.parts.length>a.parts.length&&(o.parts.length=a.parts.length)}else{for(var n=[],r=0;r<a.parts.length;r++)n.push(i(a.parts[r]));u[a.id]={id:a.id,refs:1,parts:n}}}}function r(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function i(t){var e,a,o=document.querySelector("style["+g+'~="'+t.id+'"]');if(o){if(m)return v;o.parentNode.removeChild(o)}if(b){var i=d++;o=h||(h=r()),e=n.bind(null,o,i,!1),a=n.bind(null,o,i,!0)}else o=r(),e=l.bind(null,o),a=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else a()}}function n(t,e,a,o){var r=a?"":o.css;if(t.styleSheet)t.styleSheet.cssText=y(e,r);else{var i=document.createTextNode(r),n=t.childNodes;n[e]&&t.removeChild(n[e]),n.length?t.insertBefore(i,n[e]):t.appendChild(i)}}function l(t,e){var a=e.css,o=e.media,r=e.sourceMap;if(o&&t.setAttribute("media",o),f.ssrId&&t.setAttribute(g,e.id),r&&(a+="\n/*# sourceURL="+r.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=a(653),u={},p=s&&(document.head||document.getElementsByTagName("head")[0]),h=null,d=0,m=!1,v=function(){},f=null,g="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,a,r){m=a,f=r||{};var i=c(t,e);return o(i),function(e){for(var a=[],r=0;r<i.length;r++){var n=i[r],l=u[n.id];l.refs--,a.push(l)}e?(i=c(t,e),o(i)):i=[];for(var r=0;r<a.length;r++){var l=a[r];if(0===l.refs){for(var s=0;s<l.parts.length;s++)l.parts[s]();delete u[l.id]}}}};var y=function(){var t=[];return function(e,a){return t[e]=a,t.filter(Boolean).join("\n")}}()},653:function(t,e){t.exports=function(t,e){for(var a=[],o={},r=0;r<e.length;r++){var i=e[r],n=i[0],l=i[1],s=i[2],c=i[3],u={id:t+":"+r,css:l,media:s,sourceMap:c};o[n]?o[n].parts.push(u):a.push(o[n]={id:n,parts:[u]})}return a}},654:function(t,e,a){"use strict";e.a={data:function(){return{list:[],list_car:[],search:{year:"",month:"",customer:""},loading:!0,dialogTableVisible:!1}},created:function(){var t=this,e=new Date,a=e.getYear(),a=a<2e3?a+1900:a,o=a.toString().substr(2,2);t.search.year=o,t.search.month=e.getMonth()+1,null==localStorage.mm||0==localStorage.mm.length?t.open():t.getList(localStorage.mm,t.search.year+"."+t.search.month+".")},methods:{open:function(){var t=this,e=this;this.$prompt("请输入密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var a=t.value;localStorage.setItem("mm",a),e.getList(localStorage.mm,e.search.year+"."+e.search.month+".")}).catch(function(){t.$message({type:"error",message:"取消输入"})})},getList:function(t,e,a){var o=this;null==a&&(a=""),o.$http.get(o.$status.api+"/get/?mm="+t+"&date="+e+"&customer="+a).then(function(t){o.list=t.data.data.reverse(),o.loading=!1})},searchFn:function(){var t=this;t.loading=!0,t.search.customer.length>0?t.getList(localStorage.mm,"",t.search.customer):t.getList(localStorage.mm,t.search.year+"."+t.search.month+".")},drawLine:function(){for(var t=this,e=this.list,a=[],o=[],r=[],i=0;i<e.length;i++)a.push(e[i].fee),o.push(e[i].date),r.push(e[i].designer);a=this.arrCheck(a),o=this.arrCheck(o),r=this.arrCheck(r),a.sort(t.numSort),o.sort(t.timeSort),r.sort(t.numSort);var n=this.$echarts.init(document.getElementById("myChart")),l=this.$echarts.init(document.getElementById("myChart2")),s=this.$echarts.init(document.getElementById("myChart3")),c=this.$echarts.init(document.getElementById("myChart4"));n.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:[{name:"姓名",type:"pie",radius:"55%",center:["50%","60%"],data:r,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]});for(var u=[],p=[],i=0;i<a.length;i++)u.push(a[i].name),p.push(a[i].value);l.setOption({color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:u,axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"数量",type:"bar",barWidth:"60%",data:p,label:{normal:{show:!0,position:"top"}}}]});for(var h=[],d=[],i=0;i<o.length;i++)h.push(o[i].name),d.push(o[i].value);s.setOption({color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:h,axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"数量",type:"bar",barWidth:"60%",data:d,label:{normal:{show:!0,position:"top"}}}]});for(var m=[],v=[],i=0;i<r.length;i++)m.push(r[i].name),v.push(r[i].value);c.setOption({color:["#f00"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:m,axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"数量",type:"bar",barWidth:"60%",data:v,label:{normal:{show:!0,position:"top"}}}]})},arrCheck:function(t){for(var e=[],a=0;a<t.length;a++){for(var o={},r=t[a],i=0,n=0;n<t.length;n++)t[n]==r&&(i++,t[n]=-1);-1!=r&&(o.name=r,o.value=i,e.push(o))}return e},fortime:function(t){var e=new Date(t),a=e.getFullYear(),o=e.getMonth()+1,r=e.getDate(),i=e.getHours(),n=e.getMinutes(),l=e.getSeconds();return a+"-"+this.add(o)+"-"+this.add(r)+" "+this.add(i)+":"+this.add(n)+":"+this.add(l)},add:function(t){return t<10?"0"+t:t},timeSort:function(t,e){return t.name.split(".")[2]-e.name.split(".")[2]},numSort:function(t,e){return e.value-t.value}}}},657:function(t,e,a){var o=a(658);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(652)("d32f36f0",o,!0,{})},658:function(t,e,a){e=t.exports=a(651)(!1),e.push([t.i,"body{padding-bottom:50px}.search{display:flex;background:#eee;padding:10px}.inline-input{min-width:300px;margin-right:20px}.tijiao{position:fixed;width:500px;height:320px;bottom:0;right:0;border:3px solid rgba(0,0,0,.3)}.submit{width:90%;margin:0 5%;position:fixed;left:0;bottom:10px;z-index:999}",""])},659:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app"},[a("div",{staticClass:"search"},[a("el-select",{staticClass:"inline-input",attrs:{placeholder:"请选择"},model:{value:t.search.year,callback:function(e){t.$set(t.search,"year",e)},expression:"search.year"}},[a("el-option",{attrs:{label:"2019",value:"19"}})],1),t._v(" "),a("el-select",{staticClass:"inline-input",attrs:{placeholder:"请选择"},model:{value:t.search.month,callback:function(e){t.$set(t.search,"month",e)},expression:"search.month"}},[a("el-option",{attrs:{label:"12月",value:"12"}}),t._v(" "),a("el-option",{attrs:{label:"11月",value:"11"}}),t._v(" "),a("el-option",{attrs:{label:"10月",value:"10"}}),t._v(" "),a("el-option",{attrs:{label:"9月",value:"9"}}),t._v(" "),a("el-option",{attrs:{label:"8月",value:"8"}}),t._v(" "),a("el-option",{attrs:{label:"7月",value:"7"}}),t._v(" "),a("el-option",{attrs:{label:"6月",value:"6"}}),t._v(" "),a("el-option",{attrs:{label:"5月",value:"5"}}),t._v(" "),a("el-option",{attrs:{label:"4月",value:"4"}}),t._v(" "),a("el-option",{attrs:{label:"3月",value:"3"}}),t._v(" "),a("el-option",{attrs:{label:"2月",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"1月",value:"1"}})],1),t._v(" "),a("el-input",{staticClass:"inline-input",attrs:{placeholder:"单子名称"},model:{value:t.search.customer,callback:function(e){t.$set(t.search,"customer",e)},expression:"search.customer"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searchFn}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogTableVisible=!0}}},[t._v("统计")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.list,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"前端",width:"80","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"company",label:"分公司",width:"80","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xgjs",label:"相关技术",width:"120","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"business",label:"商务",width:"80","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"customer",label:"公司名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"qdate",label:"签单时间",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xdate",label:"下单时间",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"qmoney",label:"签单金额 ",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"smoney",label:"实到金额",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"类型",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"分单时间",width:"120","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"静态",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[null==e.row.html?a("el-tag",{attrs:{size:"mini"}},[t._v("未上传")]):a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.fortime(Number(e.row.html)),placement:"top-start"}},[a("el-tag",{attrs:{type:"success"}},[t._v("静态已上传")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"complete",label:"状态",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.complete?a("el-tag",{attrs:{type:"danger"}},[t._v("未传")]):t._e(),t._v(" "),1==e.row.complete?a("el-tag",{attrs:{type:"success"}},[t._v("已传")]):t._e()]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"统计",visible:t.dialogTableVisible,width:"80%"},on:{"update:visible":function(e){t.dialogTableVisible=e},opened:t.drawLine}},[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},[a("div",{style:{width:"50%",height:"300px"},attrs:{id:"myChart"}}),t._v(" "),a("div",{style:{width:"50%",height:"300px"},attrs:{id:"myChart2"}}),t._v(" "),a("div",{style:{width:"100%",height:"300px"},attrs:{id:"myChart3"}}),t._v(" "),a("div",{style:{width:"100%",height:"300px"},attrs:{id:"myChart4"}})])])],1)},r=[],i={render:o,staticRenderFns:r};e.a=i}});