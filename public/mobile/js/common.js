var Mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；

    function makeShow(){
        Mask.show();//显示遮罩
        $(".lt_loading").show();
    }
    function makeClose(){
        Mask.close();//关闭遮罩
        $(".lt_loading").hide();
    }
