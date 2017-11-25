$(function(){
    queryFirstSort();
    //获取一级分类数据
    function queryFirstSort(){
        makeShow();
        $.ajax({
            url:"/category/queryTopCategory",
            success:function(result){
                console.log(result);
                var rows =result.rows;
                var strArr=[];
                for(var i=0;i<rows.length;i++){
                    //添加到数组中
                    strArr.push('<li data-id='+rows[i].id+'><a href="javascript:;">'+rows[i].categoryName+'</a></li>');
                }
                //转成字符串渲染页面
                $(".lt_menu>ul").html(strArr.join(''));
                querySecondSort(rows[0].id);
                makeClose();
            }
        })
    }

    //获取二级分类
    function querySecondSort(id){
        makeShow();
        $.ajax({
            url:"/category/querySecondCategory?id="+id,
            success:function(result){
                console.log(result);
                var rows =result.rows;
                if(rows.length>0){
                    var strArr=[];
                    for(var i=0; i<rows.length;i++){        
                        strArr.push('<li><a href="javascript:;"><img src="'+rows[i].brandLogo+'" alt=""><p>'+rows[i].brandName+'</p></a></li>')
                    }
                    $(".lt_content>ul").html(strArr.join(''));
                }else {
                    $(".lt_content>ul").html("没有数据了");
                }
                makeClose();
            }
        });
    }

    //给li标签注册点击事件,注意li标签是动态生成的，用事件委托
    $(".lt_menu").on("tap","li",function(){
        var id =$(this).data("id");
        querySecondSort(id);
    });

});