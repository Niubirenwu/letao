$(function(){
  //全局参数查询变量
  var queryObj={
    proName:"",
    brandId:"",
    price:"",
    num:"",
    page:"1",
    pageSize:"4"
  }
  queryObj.proName=getURLParams("key");
  //先定义条数为1
  var Count =1;
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
             
              setTimeout(function(){
                queryObj.page=1;
                //发送请求
                queryProduct(function(result){
                    Count =result.count;
                    console.log(result);
                    var html= template("productList",result);
                    //渲染页面
                    $(".life_sport_content").html(html);
                    //结束下拉刷新
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
                    //重置上拉控件的用户提示
                    mui('#refreshContainer').pullRefresh().refresh(true);
                })
               
              },1000)
            } 
          },
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
              var totalPage=Math.ceil(Count/queryObj.pageSize);
              setTimeout(function(){
                //判断
                if(queryObj.page<totalPage){
                  queryObj.page++;
                  //发送请求
                  queryProduct(function(result){
                    var html =template("productList",result);
                    //加载，有的话就追加数据
                    $(".life_sport_content").append(html);
                    //结束下拉刷新，false代表有数据
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                  });
                }else{
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                }             
              },1000)
            } 
          }
        }
      });

      //发送请求
      function queryProduct(callback){
        $.ajax({
          url:" /product/queryProduct",
          data:queryObj,
          success:function(result){
            callback && callback(result);
          }
        });
      }
      //点击搜索按钮
      $(".searchBtn").on("tap",function(){
        var val =$(".searchTxt").val();
        // console.log(val);
        //判断是否有空格非法字符
        if(!$.trim(val)){
          //给用户提示
          mui.toast("请输入关键字");
        }else{
          queryObj.proName =val;
          //手动触发下拉
          mui("#refreshContainer").pullRefresh().pulldownLoading();
        }
      });

      //点击排序
      $(".search_sort_bar>a").on("tap",function(){
        $(this).addClass("active").siblings().removeClass("active");
        //改变图标方向
        $(this).find(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup");
        var sort =-1;
        //判断 up升序=1，down降序=2
        if($(this).find(".mui-icon").hasClass("mui-icon-arrowup")){
          sort=1;
        }else{
          sort=2;
        }
        //获取要排序的关键字，用自定义属性来获取
        if($(this).data("sortname")=="price"){
          queryObj.price =sort;
          queryObj.num ="";
        }else if($(this).data("sortname")=="num"){
          queryObj.num =sort;
          queryObj.price="";
        }
        //手动触发下拉
        mui("#refreshContainer").pullRefresh().pulldownLoading();
      })


      // 获取url上的参数的 
  function getURLParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
})