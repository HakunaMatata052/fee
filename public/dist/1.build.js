webpackJsonp([1],{649:function(t,e,o){"use strict";function n(t){o(660)}Object.defineProperty(e,"__esModule",{value:!0});var a=o(655),r=o(662),s=o(259),i=n,l=s(a.a,r.a,!1,i,null,null);e.default=l.exports},651:function(t,e){function o(t,e){var o=t[1]||"",a=t[3];if(!a)return o;if(e&&"function"==typeof btoa){var r=n(a);return[o].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([r]).join("\n")}return[o].join("\n")}function n(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=o(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(n[r]=!0)}for(a=0;a<t.length;a++){var s=t[a];"number"==typeof s[0]&&n[s[0]]||(o&&!s[2]?s[2]=o:o&&(s[2]="("+s[2]+") and ("+o+")"),e.push(s))}},e}},652:function(t,e,o){function n(t){for(var e=0;e<t.length;e++){var o=t[e],n=u[o.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](o.parts[a]);for(;a<o.parts.length;a++)n.parts.push(r(o.parts[a]));n.parts.length>o.parts.length&&(n.parts.length=o.parts.length)}else{for(var s=[],a=0;a<o.parts.length;a++)s.push(r(o.parts[a]));u[o.id]={id:o.id,refs:1,parts:s}}}}function a(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function r(t){var e,o,n=document.querySelector("style["+y+'~="'+t.id+'"]');if(n){if(h)return m;n.parentNode.removeChild(n)}if(g){var r=f++;n=d||(d=a()),e=s.bind(null,n,r,!1),o=s.bind(null,n,r,!0)}else n=a(),e=i.bind(null,n),o=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else o()}}function s(t,e,o,n){var a=o?"":n.css;if(t.styleSheet)t.styleSheet.cssText=b(e,a);else{var r=document.createTextNode(a),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function i(t,e){var o=e.css,n=e.media,a=e.sourceMap;if(n&&t.setAttribute("media",n),v.ssrId&&t.setAttribute(y,e.id),a&&(o+="\n/*# sourceURL="+a.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=o(653),u={},p=l&&(document.head||document.getElementsByTagName("head")[0]),d=null,f=0,h=!1,m=function(){},v=null,y="data-vue-ssr-id",g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,o,a){h=o,v=a||{};var r=c(t,e);return n(r),function(e){for(var o=[],a=0;a<r.length;a++){var s=r[a],i=u[s.id];i.refs--,o.push(i)}e?(r=c(t,e),n(r)):r=[];for(var a=0;a<o.length;a++){var i=o[a];if(0===i.refs){for(var l=0;l<i.parts.length;l++)i.parts[l]();delete u[i.id]}}}};var b=function(){var t=[];return function(e,o){return t[e]=o,t.filter(Boolean).join("\n")}}()},653:function(t,e){t.exports=function(t,e){for(var o=[],n={},a=0;a<e.length;a++){var r=e[a],s=r[0],i=r[1],l=r[2],c=r[3],u={id:t+":"+a,css:i,media:l,sourceMap:c};n[s]?n[s].parts.push(u):o.push(n[s]={id:s,parts:[u]})}return o}},655:function(t,e,o){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.a={data:function(){return{list:[],list_car:[],search:{year:"",month:"",customer:""},loading:!0}},created:function(){var t=this;t.search.year=(new Date).getFullYear(),t.search.month=(new Date).getMonth()+1,null==localStorage.mm||0==localStorage.mm.length?t.open():t.getList(localStorage.mm,t.search.year+"-"+t.search.month)},methods:{open:function(){var t=this,e=this;this.$prompt("请输入密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var o=t.value;localStorage.setItem("mm",o),e.getList(localStorage.mm)}).catch(function(){t.$message({type:"error",message:"取消输入"})})},getList:function(t,e,o){var n=this;null==o&&(o=""),n.$http.get(n.$status.api+"/get/?mm="+t+"&date=&customer="+o).then(function(t){n.list=t.data.data,n.loading=!1})},searchFn:function(){var t=this;t.loading=!0,t.getList(localStorage.mm,"",t.search.customer)},submit:function(){var t=this;t.exportExcel(),0!=t.list_car.length?t.$http.post(t.$status.api+"/complete",{data:t.list_car}).then(function(e){t.getList(localStorage.mm)}):alert("没有选择任何东西")},handleSelectionChange:function(t){this.list_car=t},exportExcel:function(){for(var t=[],e=this.list_car.length-1;e>=0;e--){var o=[],n=0;for(var a in this.list_car[e])"uid"==a||"designer"==a||(o[n]={value:"",type:"ROW_HEADER"},null==this.list_car[e][a]?o[n].value=" ":""==this.list_car[e][a]&&(o[n].value=" "),o[n].value=this.list_car[e][a]),n++;t.push(o)}var r={title:[{value:"分公司",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"相关技术",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"商务",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"公司名称",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"签单日期",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"下单日期",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"签单金额",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"实到金额",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"尾款",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"类型",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"工作量",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"提成",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"总监签字",type:"ROW_HEADER_HEADER",datatype:"string"},{value:"备注",type:"ROW_HEADER_HEADER",datatype:"string"}],data:t};this.JSONToExcelConvertor(r.data,"下单表",r.title)},JSONToExcelConvertor:function(t,e,o){for(var a="object"!=(void 0===t?"undefined":n(t))?JSON.parse(t):t,r="<table>",s="<tr>",i=0,l=o.length;i<l;i++)s+="<td style='font-size: 12pt;font-weight: bold;'>"+o[i].value+"</td>";r+=s+"</tr>";for(var i=0;i<a.length;i++){var s="<tr>";s+='<td style="font-size:12pt">'+a[i][1].value+"</td>",s+='<td style="font-size:12pt">'+a[i][16].value+"</td>",s+='<td style="font-size:12pt">'+a[i][2].value+"</td>",s+='<td style="font-size:12pt">'+a[i][3].value+"</td>",s+='<td style="font-size:12pt">'+a[i][4].value+"</td>",s+='<td style="font-size:12pt">'+a[i][5].value+"</td>",s+='<td style="font-size:12pt">'+a[i][6].value+"</td>",s+='<td style="font-size:12pt">'+a[i][7].value+"</td>",s+='<td style="font-size:12pt"></td>',s+='<td style="font-size:12pt">'+a[i][8].value+"</td>",s+='<td style="font-size:12pt"></td>',s+='<td style="font-size:12pt"></td>',s+='<td style="font-size:12pt"></td>',s+='<td style="font-size:12pt"></td>',r+=s+"</tr>"}r+="</table>";var c="<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";c+='<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">',c+='<meta http-equiv="content-type" content="application/vnd.ms-excel',c+='; charset=UTF-8">',c+="<head>",c+="\x3c!--[if gte mso 9]>",c+="<xml>",c+="<x:ExcelWorkbook>",c+="<x:ExcelWorksheets>",c+="<x:ExcelWorksheet>",c+="<x:Name>",c+="{worksheet}",c+="</x:Name>",c+="<x:WorksheetOptions>",c+="<x:DisplayGridlines/>",c+="</x:WorksheetOptions>",c+="</x:ExcelWorksheet>",c+="</x:ExcelWorksheets>",c+="</x:ExcelWorkbook>",c+="</xml>",c+="<![endif]--\x3e",c+="</head>",c+='<body style="font-family:微软雅黑;">',c+=r,c+="</body>",c+="</html>";var u="data:application/vnd.ms-excel;charset=utf-8,"+encodeURIComponent(c),p=document.createElement("a");p.href=u,p.style="visibility:hidden",p.download=e+".xls",document.body.appendChild(p),p.click(),document.body.removeChild(p)},jump:function(t,e){this.$router.push({path:t+"/"+e})},fortime:function(t){var e=new Date(t),o=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),r=e.getHours(),s=e.getMinutes(),i=e.getSeconds();return o+"-"+this.add(n)+"-"+this.add(a)+" "+this.add(r)+":"+this.add(s)+":"+this.add(i)},add:function(t){return t<10?"0"+t:t}}}},660:function(t,e,o){var n=o(661);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(652)("1c1217c6",n,!0,{})},661:function(t,e,o){e=t.exports=o(651)(!1),e.push([t.i,"body{padding-bottom:50px}.search{display:flex;background:#eee;padding:10px}.inline-input{min-width:300px;margin-right:20px}.tijiao{position:fixed;width:500px;height:320px;bottom:0;right:0;border:3px solid rgba(0,0,0,.3)}.submit{width:90%;margin:0 5%;position:fixed;left:0;bottom:10px;z-index:999}",""])},662:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app"},[o("div",{staticClass:"search"},[o("el-input",{staticClass:"inline-input",attrs:{placeholder:"单子名称"},model:{value:t.search.customer,callback:function(e){t.$set(t.search,"customer",e)},expression:"search.customer"}}),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.searchFn}},[t._v("搜索")])],1),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.list,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[o("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),o("el-table-column",{attrs:{type:"index",width:"50"}}),t._v(" "),o("el-table-column",{attrs:{prop:"fee",label:"前端",width:"80","show-overflow-tooltip":"",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"company",label:"分公司",width:"80","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"xgjs",label:"相关技术",width:"120","show-overflow-tooltip":"",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"business",label:"商务",width:"80","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"customer",label:"公司名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"qdate",label:"签单时间",width:"100","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"xdate",label:"下单时间",width:"100","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"qmoney",label:"签单金额",width:"100","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"smoney",label:"实到金额",width:"100","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"type",label:"类型",width:"110","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[null==e.row.html?o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){t.jump(e.row.customer,e.row.fee)}}},[t._v("上传静态")]):o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.fortime(Number(e.row.html)),placement:"top-start"}},[o("el-tag",{attrs:{type:"success"}},[t._v("静态已上传")])],1)]}}])})],1),t._v(" "),o("br"),t._v(" "),o("el-button",{staticClass:"submit",attrs:{type:"success"},on:{click:t.submit}},[t._v("提交")])],1)},a=[],r={render:n,staticRenderFns:a};e.a=r}});