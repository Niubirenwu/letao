$(function(){
    loadHistory();
    //先本地读取localstorage
    function loadHistory(){
        //获取本地存储对象
        var ls =localStorage;

        //有数据就获取数据，无数据就空数组
        var arr =(ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        // console.log(arr);

        //判断有没有数组
        if(arr.length<1){
            $(".history_list").html('');
            return;
        }

        var arrStr=[];
        //遍历数组
        for(var i=0;i<arr.length;i++){
            arrStr.push('<div class="history_list_item mui-clearfix"><span class="item_font">'+arr[i]+'</span><span class="mui-icon mui-icon-closeempty item_close"></span></div>');
        }
        //渲染
        $(".history_list").html(arrStr.join(''));
    }

    //点击搜索按钮
    $(".searchBtn").on("tap",function(){
        var val =$(".searchTxt").val();
        //去掉空格
        if(!$.trim(val)){
            return false;
        }
        var ls =localStorage;        
                //有数据就获取数据，无数据就空数组
        var arr =(ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];

        //去重,重复的删除
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                arr.splice(i,1);
            }
        }
        //添加到本地存储
        arr.unshift(val);
        ls.setItem("LT_his",JSON.stringify(arr));
        // loadHistory();
        window.location.href="searchList.html";
    });

    //点击清空记录按钮 
    $(".clearBtn").on("tap",function(){
        localStorage.setItem("LT_his",JSON.stringify([]));
        loadHistory();
    });

    //给小X按钮 注册
    //用事件委托，因为自己删除自己，又绑定自己，很容易出事
    $("body").on("tap",".item_close",function(){      
        var index=$(this).parent().index();
        console.log(index);
        var ls = localStorage;
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        //根据索引删除
        arr.splice(index,1);
        //删除后重新存值
        ls.setItem("LT_his",JSON.stringify(arr));
        //重新 渲染
        loadHistory();
    })
});