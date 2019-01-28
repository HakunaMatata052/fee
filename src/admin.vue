<template>
  <div class="app">
    <div class="search">
      <el-select v-model="search.year" placeholder="请选择" class="inline-input">
        <el-option label="2019" value="19"></el-option>
      </el-select>
      <el-select v-model="search.month" placeholder="请选择" class="inline-input">
        <el-option label="12月" value="12"></el-option>
        <el-option label="11月" value="11"></el-option>
        <el-option label="10月" value="10"></el-option>
        <el-option label="9月" value="9"></el-option>
        <el-option label="8月" value="8"></el-option>
        <el-option label="7月" value="7"></el-option>
        <el-option label="6月" value="6"></el-option>
        <el-option label="5月" value="5"></el-option>
        <el-option label="4月" value="4"></el-option>
        <el-option label="3月" value="3"></el-option>
        <el-option label="2月" value="2"></el-option>
        <el-option label="1月" value="1"></el-option>
      </el-select>
      <el-input v-model="search.customer" placeholder="单子名称" class="inline-input"></el-input>
      <el-button type="primary" @click="searchFn">搜索</el-button>
      <el-button type="primary" @click="dialogTableVisible=true">统计</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="fee" label="前端" width="80" show-overflow-tooltip sortable></el-table-column>
      <el-table-column prop="company" label="分公司" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xgjs" label="相关技术" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="business" label="商务" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customer" label="公司名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qdate" label="签单时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xdate" label="下单时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qmoney" label="签单金额 " width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="smoney" label="实到金额" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="分单时间" width="120" show-overflow-tooltip sortable></el-table-column>
      <el-table-column prop="complete" label="状态" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.complete == 0">未传</el-tag>
          <el-tag type="success" v-if="scope.row.complete == 1">已传</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="统计" :visible.sync="dialogTableVisible" @opened="drawLine">
      <div style="display:flex;flex-wrap:wrap;">
        <div id="myChart" :style="{width: '50%', height: '300px'}"></div>
        <div id="myChart2" :style="{width: '50%', height: '300px'}"></div>
        <div id="myChart3" :style="{width: '100%', height: '300px'}"></div>
      </div>
    </el-dialog>
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
      loading: true,
      dialogTableVisible: false
    }
  },
  created() {
    var that = this;
    var myDate = new Date();
    var year = myDate.getYear()
    var year = year < 2000 ? year + 1900 : year
    var yy = year.toString().substr(2, 2);
    that.search.year = yy;
    that.search.month = myDate.getMonth() + 1;
    if (localStorage.mm == null || localStorage.mm.length == 0) {
      that.open()
    } else {
      that.getList(localStorage.mm, that.search.year + '.' + that.search.month + '.');
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
        that.getList(localStorage.mm, that.search.year + '.' + that.search.month + '.');
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
      that.$http.get(that.$status.api + '/get/?mm=' + mm + '&date=' + time + '&customer=' + customer).then(function (res) {
        that.list = res.data.data.reverse();
        that.loading = false;
      })
    },
    searchFn() {
      var that = this;
      that.loading = true;
      if (that.search.customer.length > 0) {
        that.getList(localStorage.mm, '', that.search.customer)
      } else {
        that.getList(localStorage.mm, that.search.year + '.' + that.search.month + '.')
      }
    },
    drawLine() {
      var data = this.list;
      let name = [];
      let tongjiDate = [];
      for (var i = 0; i < data.length; i++) {
        name.push(data[i].fee)
        tongjiDate.push(data[i].date)
      }
      name = this.arrCheck(name);
      tongjiDate = this.arrCheck(tongjiDate)
      console.log(name)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: name,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
      let name2 = [];
      let name3 = [];
      for (var i = 0; i < name.length; i++) {
        name2.push(name[i].name)
        name3.push(name[i].value)
      }
      // 绘制图表
      myChart2.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: name2,
            axisTick: {
              alignWithLabel: true
            },
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: name3,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
          }
        ]
      });


      let name4 = [];
      let name5 = [];
      for (var i = 0; i < tongjiDate.length; i++) {
        name4.push(tongjiDate[i].name)
        name5.push(tongjiDate[i].value)
      }
      // 绘制图表
      myChart3.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: name4,
            axisTick: {
              alignWithLabel: true
            },
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: name5,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
          }
        ]
      });
    },
    arrCheck(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var newJson = {};
        var temp = arr[i];
        var count = 0;
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] == temp) {
            count++;
            arr[j] = -1;
          }
        }
        if (temp != -1) {
          newJson.name = temp;
          newJson.value = count;
          newArr.push(newJson)
        }
      }
      return newArr;
    }


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