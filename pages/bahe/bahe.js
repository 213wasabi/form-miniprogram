Page({
    data: {
      users: [],
      curUser: {},
    },
    onLoad: function (options) {
      this.getUser();
    },
    setCurUser: function (e) {
      const { content } = e.currentTarget.dataset
      const { sex } = content;
      this.setData({
        curUser: content
      })
    },
    setValue: function (n, e) {
      const curUser = this.data.curUser;
      const arr = ['name', 'sex', 'bumen', '_id'];
      const obj = {}
      const setArr = arr.splice(n, 1).join('')
      for (let a of arr) {
        obj[a] = curUser[a]
      }
      obj[setArr] = e.detail.value
      this.setData({
        curUser: obj
      })
    },
    getUname: function (e) {
      this.setValue(0, e)
    },

    getUsex: function (e) {
      this.setValue(1, e)
    },
    getUbumen: function (e) {
        this.setValue(2, e)
      },
    getUser: function () {// 查询
      const db = wx.cloud.database()
      const that = this;
      db.collection('bahe').get({
        success: function (res) {
          const { data } = res;
          that.setData({
            users: data
          })
        }
      })
    },
    clearFrom: function () {
      this.getUser()
      this.setData({
        curUser: {}
      })
    },
    adduser: function (e) {// 添加
      const db = wx.cloud.database();
      const that = this;
      db.collection('bahe').add({
        data: e.detail.value,
        success: function (res) {
          console.log(res)
          that.clearFrom()
        }
      })
    },
    updateuser: function (e) {//修改
      const db = wx.cloud.database();
      const that = this;
      const { _id, name, sex, bumen } = this.data.curUser
      db.collection('bahe').doc(_id).update({
        data: {
          name, sex, bumen
        },
        success: function (res) {
          that.clearFrom()
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    deleteuser: function () {// 删除
      const db = wx.cloud.database();
      const {_id} = this.data.curUser;
      const that = this
      db.collection('bahe').doc(_id).remove({
        success: function (res) {
          that.clearFrom()
        }
      })
    },
    formReset: function () {
      console.log('form发生了reset事件')
    },
    onReachBottom: function () {
      console.log("Chris's demo")
    },
    onShareAppMessage: function () {
      console.log("Chris's demo")
    }
  })