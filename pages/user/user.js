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
    const arr = ['name', 'pinkun', 'dusheng', 'hunyin', 'pname',  'pwork', 'hdate', 'onename', 'onesex', 'onedate', 'twoname', 'twosex', 'twodate', '_id'];
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

  getUpinkun: function (e) {
    this.setValue(1, e)
  },
  getUdusheng: function (e) {
      this.setValue(2, e)
    },
    getUhunyin: function (e) {
      this.setValue(3, e)
    },
    getUpname: function (e) {
      this.setValue(4, e)
    },
    getUpwork: function (e) {
      this.setValue(5, e)
    },
    getUhdate: function (e) {
      this.setValue(6, e)
    },
    getUonename: function (e) {
      this.setValue(7, e)
    },
    getUonesex: function (e) {
      this.setValue(8, e)
    },
    getUonedate: function (e) {
      this.setValue(9, e)
    },
    getUtwoname: function (e) {
      this.setValue(10, e)
    },
    getUtwosex: function (e) {
      this.setValue(11, e)
    },
    getUtwodate: function (e) {
      this.setValue(12, e)
    },

  getUser: function () {// 查询
    const db = wx.cloud.database()
    const that = this;
    db.collection('users').get({
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
    db.collection('users').add({
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
    const { _id, name, pinkun, dusheng, hunyin, pname, pwork, hdate, onename, onesex, onedate, twoname, twosex, twodate, } = this.data.curUser
    db.collection('users').doc(_id).update({
      data: {
        name,  pinkun, hunyin, dusheng, pname, pwork, hdate, onename, onesex, onedate, twoname, twosex, twodate, 
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
    db.collection('users').doc(_id).remove({
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