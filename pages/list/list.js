Page({
    data:{
        list:[
            {name:"lily",num:10},
            {name:"yaya",num:4},
            {name:"huahu",num:2},
            {name:"yangyang",num:7},
        ]
    },
    onLoad(){
        
        wx.request({
            url:"https://www.easy-mock.com/mock/5d1b3d63c3d0bd4af64a7af0/test/test",
            method:"GET",
            data:{name:"ss",age:11},//"ddd",//{name:"ss",age:11},
            success(res){
                console.log(res)
            }
        })

        // wx.showToast({
        //     title:"提交成功",
        //     icon:"success",
        //     success(){
        //         console.log("sss")
        //     },
        //     fail(){
        //         console.log("fail")
        //     }
        // })
        // wx.showModal({
        //     title:"提交成功",
        //     content:"djalksjdasjdas"    
        // })

    },
    shareEvent(event){
        let tempStr=event.currentTarget.dataset.describe;
        wx.showActionSheet({
            itemList:[`aaa${tempStr}`,"bbb","ccc"],
            success(res){
                console.log(res)
            },
            fail(rej){
                console.log(rej)
            }
        })
        console.log(event)
    },
    saveData(){
        wx.setStorage({
            key:"sss",
            data:"eee",
            success(){
                console.log(2222)
            }
        })
        wx.clearStorageSync()
    }
})