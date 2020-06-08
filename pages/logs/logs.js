//logs.js
const util = require('../../utils/util.js');
var innerAudio=wx.getBackgroundAudioManager();
// const innerAudio= wx.createInnerAudioContext();
Page({
  data: {
    logs: [],
    src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    danmuList:[
      {
        text:"第一个弹幕",
        color:"#000",
        time:1
      },
      {
        text:"第二个弹幕",
        color:"#000",
        time:1
      },
      {
        text:"第三个弹幕",
        color:"#000",
        time:2
      }
    ],
    imgSrc:"../../images/00.jpg" ,
    isPlay:false,
    currentTime:0,
    allTime:240,
    startPosition:"",
    flag:true,
    allLength:560,
    screenPer:""
  },
  tapEvent2(){
    wx.navigateBack({
      url:"../index/index"  
    })
  },
  getPict(){
    let _this=this;
    wx.chooseVideo({
      sourceType:['album', 'camera'],
      success(res){
        _this.setData({src:res.tempFilePath});
        console.log(_this.data)
        console.log(_this.data.src)
      }
    })
  },
  onReady:function(){
  },
  onLoad: function (option) {
    let that=this;
    this.videoContext=wx.createVideoContext("video1");
    console.log(option)
    console.log(util)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
    wx.getSystemInfo({
      success(res){
        that.setData({
          screenPer:750/res.windowWidth
        })
      }
    })  
  },
  sendDanmu(){
    console.log(this.videoContext);
    this.videoContext.pause();
    this.videoContext.sendDanmu({
      text:"发送的弹幕",
      color:"#000",
    })  
  },
  changeState(){
    // innerAudio.src='http://win.web.ri01.sycdn.kuwo.cn/cd4032c447a742323fd91394c5217cd9/5d554017/resource/n3/45/4/112439134.mp3' 
    console.log(innerAudio);
  
    if(!this.data.isPlay ){
      // innerAudio.play();
      innerAudio.src='http://win.web.ri01.sycdn.kuwo.cn/cd4032c447a742323fd91394c5217cd9/5d554017/resource/n3/45/4/112439134.mp3' 
      innerAudio.title="aa"
    }else{
      console.log("22")
      innerAudio.pause();
      
    }
    this.setData({
      isPlay:!this.data.isPlay  
    })
    this.listenEvent();
    this.updateEvent();
  },
  listenEvent(){
    let that=this;
    innerAudio.onPause(function(){
      that.setData({
        isPlay:false
      })  
    })  ;
    innerAudio.onStop(function(){
      that.setData({
        isPlay:false
      })  
    })  ;
    innerAudio.onEnded(function(){
      that.setData({
        isPlay:false
      })  
    })  ;
    innerAudio.onPlay(()=>{
      that.setData({
        isPlay:true,
      })   
    })
  },
  updateEvent(){
    let that=this;
    innerAudio.onTimeUpdate(()=>{ 
      that.setData({
        currentTime:innerAudio.currentTime.toFixed(),
        percent:(innerAudio.currentTime/that.data.allTime)*100
      })
    }) 
  },
  touchstart(e){
    if(this.data.flag){
      this.setData({
        startPosition:e.touches[0].pageX,
        flag:false
      })
    }
  },
  circleMove(e){
    let tempLength=e.touches[0].pageX-this.data.startPosition;//px
    if(tempLength<0){
      this.setData({
        percent:0
      })  
    }else if(tempLength>=this.data.allLength/this.data.screenPer){
      this.setData({
        percent:100
      })  
    }else{
      this.setData({
        percent:tempLength*this.data.screenPer/this.data.allLength*100,
        isPlay:true,
      })

    }
    innerAudio.src='http://win.web.ri01.sycdn.kuwo.cn/cd4032c447a742323fd91394c5217cd9/5d554017/resource/n3/45/4/112439134.mp3' 
    innerAudio.title="aa"
    innerAudio.seek(parseInt(this.data.allTime)*this.data.percent/100)
    this.listenEvent();
    this.updateEvent();



  }
})
