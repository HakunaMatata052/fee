<template>
  <div class="ipload" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名" prop="author">
        <el-input v-model="ruleForm.author" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="单子名称" prop="companyname">
        <el-input v-model="ruleForm.companyname" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="效果图地址" prop="xgturl">
        <el-input v-model="ruleForm.xgturl"></el-input>
      </el-form-item>
      <el-form-item label="静态压缩包" prop="downurl">
        <el-row :gutter="20" type="flex">
          <el-col :span="20">
            <el-input v-model="ruleForm.downurl" prop="downurl" :disabled="true"></el-input>
          </el-col>
          <el-col :span="4">
            <el-upload
              class="upload"
              action="http://192.168.0.253:5000/upload"
              accept="application/x-zip-compressed"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
              :limit="1"
              ref="uploadHtml"
            >
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" ref="button" :loading="false">立即添加</el-button>
      </el-form-item>
    </el-form>
    <h3 v-if="warninginfo.length>0">↓需要注意的问题↓</h3>
    <el-table :data="warninginfo" stripe style="width: 100%" v-if="warninginfo.length>0">
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column prop="info" label="详情"></el-table-column>
    </el-table>

    <el-dialog title="错误内容" :visible.sync="dialogTableVisible" :fullscreen="true">
      <el-table :data="errorinfo">
        <el-table-column property="html" label="错误内容"></el-table-column>
        <el-table-column property="error" label="错误提示"></el-table-column>
        <el-table-column property="suggest" label="修改建议"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      disabled: false,
      ruleForm: {
        author: '',
        companyname: '',
        downurl: '',
        xgturl: ''
      },
      rules: {
        author: [
          { required: true, message: '你的名字', trigger: 'blur' }
        ],
        companyname: [
          { required: true, message: '单子的名字', trigger: 'blur' }
        ],
        xgturl: [
          { required: true, message: '效果图地址', trigger: 'blur' }
        ],
        downurl: [
          { required: true, message: '请上传压缩包', trigger: 'blur' }
        ],
      },
      errorinfo: [],
      warninginfo: [],
      regArray: [{
        name: "疑似公司名称共有",
        value: "[\u4E00-\u9FA5\uF900-\uFA2D]*?家居|[\u4E00-\u9FA5\uF900-\uFA2D]*?起重|[\u4E00-\u9FA5\uF900-\uFA2D]*?农业|[\u4E00-\u9FA5\uF900-\uFA2D]*?暖通|[\u4E00-\u9FA5\uF900-\uFA2D]*?制品|[\u4E00-\u9FA5\uF900-\uFA2D]*?照明|[\u4E00-\u9FA5\uF900-\uFA2D]*?药业|[\u4E00-\u9FA5\uF900-\uFA2D]*?体育|[\u4E00-\u9FA5\uF900-\uFA2D]*?餐饮|[\u4E00-\u9FA5\uF900-\uFA2D]*?装饰|[\u4E00-\u9FA5\uF900-\uFA2D]*?门业|[\u4E00-\u9FA5\uF900-\uFA2D]*?环保|[\u4E00-\u9FA5\uF900-\uFA2D]*?电子|[\u4E00-\u9FA5\uF900-\uFA2D]*?机电|[\u4E00-\u9FA5\uF900-\uFA2D]*?包装|[\u4E00-\u9FA5\uF900-\uFA2D]*?建材"
      }, {
        name: "疑似公司简称共有",
        value: "选择[\u4E00-\u9FA5\uF900-\uFA2D]*?的理由|[\u4E00-\u9FA5\uF900-\uFA2D]*?是一家|走进[^(我们)][\u4E00-\u9FA5\uF900-\uFA2D]"
      }, {
        name: "疑似QQ号的共有",
        value: "[1-9][0-9]{5,11}"
      }, {
        name: "疑似电话号的共有",
        value: "400[0-9]{7}|400-[0-9]{4}-[0-9]{3}|400-[0-9]{3}-[0-9]{4}|1[3-9]{1}[0-9]{1}-[0-9]{9}|1[3-9]{1}[0-9]{1}-[0-9]{4}-[0-9]{3}|1[3-9]{1}[0-9]{1}-[0-9]{3}-[0-9]{4}|0[0-9]{2}-[0-9]{8}|0[0-9]{3}-[0-9]{7}|0[0-9]{10}"
      }, {
        name: "疑似手机号的共有",
        value: "1[3-9]{1}[0-9]{9}"
      }]
    };
  },
  mounted() {
    if (this.$route.params.customer && this.$route.params.fee) {
      this.ruleForm.author = this.$route.params.fee;
      this.ruleForm.companyname = this.$route.params.customer;
      this.disabled = true;
    } else {
      this.ruleForm.author = localStorage.getItem('author');
    }
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.button.loading = true;
          localStorage.setItem("author", that.ruleForm.author);
          that.$http.post('http://btoesucai.dongliwuxianjituan.top/api/save.ashx', {
            author: that.ruleForm.author,
            companyname: that.ruleForm.companyname,
            xgturl: that.ruleForm.xgturl,
            downurl: that.ruleForm.downurl,
            url: "http://192.168.0.253:5000/" + that.ruleForm.downurl
          }).then(function (res) {
            if (res.data.code == 0) {
              that.$refs.button.loading = true;
              that.$message.success("上传成功");
              that.ruleForm = {
                author: '',
                companyname: '',
                downurl: '',
                xgturl: ''
              };
              that.$refs.uploadHtml.clearFiles();
              if (that.$route.params.customer && that.$route.params.fee) {
                that.$http.post('http://192.168.0.253:5000/html/', {
                  fee: that.$route.params.fee,
                  companyname: that.$route.params.customer,
                  addtime: new Date().getTime()
                }).then(function () {
                  that.$router.push({
                    path: `${customer}/${fee}`
                  })
                })
              }
            }
          },function(err){
             that.$message.error('提交失败，请重试！');             
              that.$refs.button.loading = false;
          })
        } else {
          that.$message.error('填写完整信息');
        }
      });
    },
    beforeUpload(file) {
      var that = this;
      that.loading = true;
    },
    onSuccess(res, file, fileList) {
      var that = this;
      var path = res.data.path.split('.')[0].replace('\\', '/');
      that.ok(path,file)
    },
    test(res, path, file) {
      var that = this;
      var $f = $(res);
      var firstJquery = 0;
      $f.find('script').each(function (i) {
        if ($(this).attr('src') === undefined) {
          that.alertError(this, "js内联", "js外部引入");
        } else {
          if (i === 0 && $(this).attr("src").indexOf('jquery') >= 0) {
            firstJquery = 1;
          } else if (i === 0 && $(this).attr("src").indexOf('jquery') < 0 && firstJquery === 0) {
            that.alertError(this, "jquery必须最先被引入", "放在所有js之前");
          }
        };
        if ($(this).parents().is('head')) {
          that.alertError(this, "<script />不能出现在<head />标签内", "移入<body />结束前");
        };
      });
      $f.find('style').each(function () {
        that.alertError(this, "<style />不能出现", '删除<style />，以<link rel="stylesheet" href="css/in.css">方式引入');
      });
      $f.find('em').each(function () {
        that.alertError(this, "<em />不能出现", "改为其他标签，如<i />");
      });
      $f.find('strong').each(function () {
        that.alertError(this, "<strong />不能出现", "改为其他标签，如<i />");
      });
      var regImg = /<img.*?>/gi;
      $f.find('a').each(function () {
        var con = $(this).html();
        if (/<img.*?>/i.test(con)) {
          con = con.replace(/<img.*?>/i, '');
          // if (/<[^>]+>/.test(con) || /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(con) || /[a-z]/.test(con)) {
          //   that.alertError(this, "<img />不能与其他元素一同被A标签包含", "移除A标签下除img标签以外的内容");
          // }
          if ($(this).attr("title") !== undefined) {
            that.alertError(this, "img的A不需要加title", "移除A标签的title属性");
          }
        } else {
          // if (window.getComputedStyle($('.header')[0]).whiteSpace == "nowrap") {
          //   that.alertError(this, "链接没有设置单行溢出显示省略号", "设置样式white-space：nowrap");
          // }
          // if (window.getComputedStyle($('.header')[0]).textOverflow == "ellipsis") {
          //   that.alertError(this, "链接没有设置单行溢出显示省略号", "设置样式text-ellipsis");
          // }
          // if (window.getComputedStyle($('.header')[0]).overflow == "hidden") {
          //   that.alertError(this, "链接没有设置单行溢出显示省略号", "hidden");
          // }

          // if ($(this).attr("title") === undefined) {
          //   that.alertError(this, "没有img的A标签需要title属性", "添加A标签的title属性");
          // }
        }
      });
      $f.find('img').each(function () {
        if ($(this).attr("alt") === undefined) {
          that.alertError(this, "没有alt属性", "添加img标签的alt属性");
        }
        if ($(this).attr("title") !== undefined) {
          that.alertError(this, "img不需要title属性", "删除img标签的title属性");
        }
      });
      for (var i = 0; i < that.regArray.length; i++) {
        that.warningFn($f, that.regArray[i].value, that.regArray[i].name);
      }
    },
    ok(path,file ) {
      var that = this;
      if (that.errorinfo.length > 0) {
        that.loading = false;
        that.dialogTableVisible = true;
        return false;
      } else {
        if (file.size > 6291456) {
          that.$notify({
            title: '警告',
            message: `文件大小:${(file.size / 1024 / 1024).toFixed(2)}M,已经超过6M！`,
            type: 'warning',
            duration: 0
          });
        }
        that.loading = false;
        that.ruleForm.downurl = path + '.zip'
        setTimeout(() => {
          that.$notify({
            title: '警告',
            message: `加特效了吗？`,
            type: 'warning'
          });
        }, 1000);
        setTimeout(() => {
          that.$notify({
            title: '警告',
            message: `出现其他公司信息了吗?`,
            type: 'warning'
          });
        }, 1500);
        setTimeout(() => {
          that.$notify({
            title: '警告',
            message: `仔细检查清楚！！！`,
            type: 'warning'
          });
        }, 2000);
        // that.del(path);
      }
    },
    del(path) {
      var that = this;
      that.$http.post('http://192.168.0.253:5000/upload/del', {
        url: path
      }).then((res) => {
      })
    },
    warningFn($f, reg, info) {
      var that = this;
      var $fHtml = $f.html();
      var patt = new RegExp(reg, 'gi');
      var warningJson = {}
      warningJson.info = [];
      var result;
      while ((result = patt.exec($fHtml)) != null) {
        warningJson.info.push(result);
      }
      var num = warningJson.info.length;
      warningJson.info = warningJson.info.join(',')
      warningJson.title = info + num + '处';
      that.warninginfo.push(warningJson);
    },
    alertError(dom, error, suggest, grade) {
      var that = this;
      var errorJson = {}
      errorJson.html = $(dom).prop("outerHTML")
      errorJson.error = error
      errorJson.suggest = suggest
      errorJson.grade = grade || 0
      that.errorinfo.push(errorJson)
    }
  }
}
</script>
<style scoped>
.ipload {
  width: 1000px;
  margin: 30px auto 0;
}
.upload {
  display: inline-block;
}
</style>

