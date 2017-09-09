var ufindex,pfindex,ubindex,pbindex;//tips弹出的返回值
function userNameFocus(){
    var userName=$('#signup-username').val();
    layer.close(ubindex);
    ufindex=opentips('用户名为1-18位','#signup-username','#FFB800');
}
function userNameBlur(){
    var username=$('#signup-username').val();
    var state;
    if(!username){
        //如果提示性tips已存在，关闭其之后再显示警告性tips
        layer.close(ufindex);
        ubindex=opentips('用户名不能为空','#signup-username','#FF5722');
        return false;
    }else if(username.length>18){
        layer.close(ufindex);
        ubindex=opentips('用户名不能多过18位','#signup-username','#FF5722');
        return false;
    }else if(username.length>0 && username.length<18){

        var url='http://localhost:3000/signup/check';

        $.ajax({
           type:'post',
           url:url,
           async:false,
           data:{
              username:username
           },
           success:function(data){
              //console.log(data.state);
              if(data.state){
                layer.close(ufindex);
                ubindex=opentips('该用户名已被占用！请使用其他用户名','#signup-username','#FF5722');
                state=false;
              }else{
                state=true;
              }
            }
        });
        return state;
    }
}
function pwdFocus(){
    var password=$('#signup-password').val();
    layer.close(pbindex);
    pfindex=opentips('密码至少为6位','#signup-password','#FFB800');
}
function pwdBlur(){
    var password=$('#signup-password').val();
    if(!password){
        layer.close(pfindex);
        pbindex=opentips('密码不能为空','#signup-password','#FF5722');
        return false;
    }else if(password.length>0 && password.length<6){
        layer.close(pfindex);
        pbindex=opentips('密码不能少于6位','#signup-password','#FF5722');
        return false;
    }else{
        return true;
    }
}
function repwdBlur(){
    var password=$('#signup-password').val();
    var repassword=$('#confirm-password').val();
    if(repassword!==password){
        opentips('两次密码输入不一致','#confirm-password','#FF5722');
        return false;
    }else{
        return true;
    }
}
function regcheck(){
    userNameBlur();
    pwdBlur();
    repwdBlur();
    console.log(userNameBlur());
    console.log(pwdBlur());
    console.log(repwdBlur());
    if(userNameBlur()&&pwdBlur()&&repwdBlur()){
        return true;
    }else{
        return false;
    }

}

//提交心得验证
function titleBlur(){
    var title=$('#title').val();
    if(!title){
        opentips('标题不能为空','#title','#FF5722');
        return false;
    }else{
        return true;
    }
}
function contentBlur(){
    var content=$('#content').val();
    if(!content){
        opentips('内容不能为空','#content','#FF5722');
        return false;
    }else{
        return true;
    }
}
function subcheck(){
    titleBlur();
    contentBlur();
    if(titleBlur()&&contentBlur()){
        return true;
    }else{
        return false;
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
    return index;
}
