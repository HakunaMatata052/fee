<template>
  <div class="app">
    <div class="search">
      <el-input v-model="search.customer" placeholder="单子名称" class="inline-input"></el-input>
      <el-button type="primary" @click="searchFn">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="fee" label="前端" width="80" show-overflow-tooltip sortable></el-table-column>
      <el-table-column prop="company" label="分公司" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xgjs" label="相关技术" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="business" label="商务" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customer" label="公司名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qdate" label="签单时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xdate" label="下单时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qmoney" label="签单金额" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="smoney" label="实到金额" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.html==null"
            @click="jump(scope.row.customer,scope.row.fee)"
          >上传静态</el-button>
          <el-tooltip
              class="item"
              effect="dark"
              :content="fortime(Number(scope.row.html))"
              placement="top-start"
               v-else
            >
          <el-tag type="success">
            静态已上传
          </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button type="success" @click="submit" class="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      list_car: [],
      search: {
        year: '',
        month: "",
        customer: ''
      },
      loading: true
    }
  },
  created() {
    var that = this;
    that.search.year = new Date().getFullYear();
    that.search.month = new Date().getMonth() + 1;
    if (localStorage.mm == null || localStorage.mm.length == 0) {
      that.open()
    } else {
      that.getList(localStorage.mm, that.search.year + '-' + that.search.month);
    }

  },
  methods: {
    open() {
      var that = this;
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
        value
      }) => {
        localStorage.setItem('mm', value);
        that.getList(localStorage.mm);
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '取消输入'
        });
      });
    },
    getList(mm, time, customer) {
      var that = this;
      if (customer == null) {
        customer = '';
      };
      that.$http.get(that.$status.api + '/get/?mm=' + mm + '&date=' + '&customer=' + customer).then(function (res) {
        that.list = res.data.data;
        that.loading = false;
      })
    },
    searchFn() {
      var that = this;
      that.loading = true;
      that.getList(localStorage.mm, '', that.search.customer)
    },
    submit() {
      var that = this;
      that.exportExcel()
      if (that.list_car.length != 0) {
        that.$http.post(that.$status.api + '/complete', {
          data: that.list_car
        }).then(function (res) {
          that.getList(localStorage.mm);
        })
      } else {
        alert('没有选择任何东西')
      }
    },
    handleSelectionChange(val) {
      var that = this;
      that.list_car = val;
    },
    exportExcel() { //生成导出excel表格的数据
      var newdata = [];
      for (var i = this.list_car.length - 1; i >= 0; i--) {
        var cell = [];
        var j = 0;
        for (var attr in this.list_car[i]) {
          if (attr == "uid" || attr == "designer") {

          } else {
            cell[j] = {
              'value': '',
              'type': 'ROW_HEADER'
            };
            if (this.list_car[i][attr] == null) {
              cell[j].value = ' ';
            } else if (this.list_car[i][attr] == '') {
              cell[j].value = ' ';
            } {
              cell[j].value = this.list_car[i][attr];
            }
          }
          j++;
        }
        newdata.push(cell);
      }
      var data = {
        "title": [{
          "value": "切图",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "分公司",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "相关技术",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "商务",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "公司名称",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "签单日期",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "下单日期",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "签单金额",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "实到金额",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "尾款",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "类型",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "工作量",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "提成",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "总监签字",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }, {
          "value": "备注",
          "type": "ROW_HEADER_HEADER",
          "datatype": "string"
        }],
        "data": newdata
      }
      this.JSONToExcelConvertor(data.data, '下单表', data.title);
    },
    JSONToExcelConvertor(JSONData, FileName, ShowLabel) { //导出excel表格文件
      //先转化json  
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      var excel = '<table>';
      //设置表头  
      var row = "<tr>";
      for (var i = 0, l = ShowLabel.length; i < l; i++) {
        row += "<td style='font-size: 12pt;font-weight: bold;'>" + ShowLabel[i].value + '</td>';
      }
      //换行  
      excel += row + "</tr>";
      //设置数据  
      for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";
        for (var index in arrData[i]) {
          var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
          row += '<td style="font-size:12pt">' + value + '</td>';
        }
        excel += row + "</tr>";
      }
      excel += "</table>";
      var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
      excelFile += '; charset=UTF-8">';
      excelFile += "<head>";
      excelFile += "<!--[if gte mso 9]>";
      excelFile += "<xml>";
      excelFile += "<x:ExcelWorkbook>";
      excelFile += "<x:ExcelWorksheets>";
      excelFile += "<x:ExcelWorksheet>";
      excelFile += "<x:Name>";
      excelFile += "{worksheet}";
      excelFile += "</x:Name>";
      excelFile += "<x:WorksheetOptions>";
      excelFile += "<x:DisplayGridlines/>";
      excelFile += "</x:WorksheetOptions>";
      excelFile += "</x:ExcelWorksheet>";
      excelFile += "</x:ExcelWorksheets>";
      excelFile += "</x:ExcelWorkbook>";
      excelFile += "</xml>";
      excelFile += "<![endif]-->";
      excelFile += "</head>";
      excelFile += "<body style=\"font-family:微软雅黑;\">";
      excelFile += excel;
      excelFile += "</body>";
      excelFile += "</html>";
      var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
      var link = document.createElement("a");
      link.href = uri;
      link.style = "visibility:hidden";
      link.download = FileName + ".xls";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    jump(customer, fee) {
      window.open('http://192.168.0.253:5000/#/' + customer + '/' + fee);
    },
    fortime(val) {
      console.log(val)
      var time = new Date(val);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + '-' + this.add(m) + '-' + this.add(d) + ' ' + this.add(h) + ':' + this.add(mm) + ':' + this.add(s);
    },
    add(m) { return m < 10 ? '0' + m : m }
  }
}
</script>
<style>
body {
  padding-bottom: 50px;
}

.search {
  display: flex;
  background: #eee;
  padding: 10px;
}

.inline-input {
  min-width: 300px;
  margin-right: 20px;
}

.tijiao {
  position: fixed;
  width: 500px;
  height: 320px;
  bottom: 0;
  right: 0;
  border: 3px solid rgba(0, 0, 0, 0.3);
}

.submit {
  width: 90%;
  margin: 0 5%;
  position: fixed;
  left: 0;
  bottom: 10px;
  z-index: 999;
}
</style>