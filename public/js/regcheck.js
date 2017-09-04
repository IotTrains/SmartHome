var ufindex,pfindex,ubindex,pbindex;
//var layer=layui.layer;
function userNameFocus(){
    var userName=$('#signup-username').val();
    layer.close(ubindex);
    ufindex=opentips('用户名长度为1-18','#signup-username','#FFB800');
}
function userNameBlur(){
    var username=$('#signup-username').val();
    if(!username){
        console.log(ufindex);
        //如果提示性tips已存在，关闭其之后再显示警告性tips
        layer.close(ufindex);
        ubindex=opentips('用户名不能为空!','#signup-username','#FF5722');
        return false;
    }else{
        var url='http://localhost:3000/signup/check';

        $.ajax({
           type:'post',
           url:url,
           data:{
              username:username
           },
           success:function(data){
              console.log(data.state);
              if(data.state){
                layer.close(ufindex);
                ubindex=opentips('该用户名已被占用!','#signup-username','#FF5722');
                return false;
              }
            }
        });

    }
    return true;
}
function pwdFocus(){
    var password=$('#signup-password').val();
    layer.close(pbindex);
    pfindex=opentips('密码长度为6-18','#signup-password','#FFB800');
}
function pwdBlur(){
    var password=$('#signup-password').val();
    if(!password){
        layer.close(pfindex);
        pbindex=opentips('密码不能为空！','#signup-password','#FF5722');
        return false;
    }else if(password.length>0 && password.length<6){
        layer.close(pfindex);
        pbindex=opentips('密码长度不少于6个字符！','#signup-password','#FF5722');
        return false;
    }else{
        return true;
    }
}
function repwdBlur(){
    var password=$('#signup-password').val();
    var repassword=$('#confirm-password').val();
    if(repassword!==password){
        opentips('两次密码输入不一致!','#confirm-password','#FF5722');
        return false;
    }else{
        return true;
    }
}

function opentips(msg,followid,color){
    var index=layer.open({
        type:4,
        content:[msg,followid],
        tips:[2,color],
        time:5000,
        shade:0,
        tipsMore:true,
        closeBtn:0
    });
    //layer.open();
    return index;
    //console.log(index);
}

function regcheck(){
    userNameBlur();
    pwdBlur();
    repwdBlur();
    if(userNameBlur()&&pwdBlur()&&repwdBlur()){
        return true;
    }else{
        return false;
    }

}