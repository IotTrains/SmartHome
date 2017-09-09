jQuery(document).ready(function($){
    var $form_modal = $('.cd-user-modal'),
        $form_login = $form_modal.find('#cd-login'),
        $form_signup = $form_modal.find('#cd-signup'),
        $form_modal_tab = $('.cd-switcher'),
        $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
        $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
        $main_nav = $('.navbar-right');

    //点击弹出登陆注册界面
    $(document).on('click','.navbar-right',function(event){
        if( $(event.target).is('.cd-signin') ) {

            $main_nav.children('ul').toggleClass('is-visible');
            $form_modal.addClass('is-visible');
            //show the selected form
            login_selected();
            getCookie();
            
        } else {
            // on mobile close submenu
            $main_nav.children('ul').toggleClass('is-visible');
            //show modal layer
            $form_modal.addClass('is-visible');
            signup_selected() ;
            
        }

    });

    //点击空白处关闭登录注册界面
    $(document).on('click','.cd-user-modal',function(event){
        //console.log('I am excuted!');
        if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
           $form_modal.removeClass('is-visible');
           layer.closeAll('tips');
        }
    });
    //ESC键关闭登录注册界面
    $(document).keyup(function(event){
        if(event.which=='27'){
            $form_modal.removeClass('is-visible');
            layer.closeAll('tips');
        }
    });

    //登陆注册界面切换
    $form_modal_tab.on('click', function(event) {
        event.preventDefault();//阻止元素默认事件发生
        ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
    });

    function login_selected(){
        $form_login.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $tab_login.addClass('selected');
        $tab_signup.removeClass('selected');
        getCookie();
        layer.closeAll('tips');
    }


    function signup_selected(){

        $form_login.removeClass('is-selected');
        $form_signup.addClass('is-selected');
        $tab_login.removeClass('selected');
        $tab_signup.addClass('selected');
    }
    
    //获取Cookie
    function getCookie(){
        if($.cookie('signin-username')){
            //alert('cookie');
            console.log($.cookie('signin-username'));
            console.log($.cookie('signin-password'));
            $('#signin-username').val($.cookie('signin-username'));
            $('#signin-password').val($.cookie('signin-password'));
        }
    }
    //注册ajax向后台传数据
    $('#submit-signup').click(function(e){
        regcheck();//注册验证
        console.log(regcheck());
        if(regcheck()){
            //获取用户名，密码，确认密码
            var username=$('#signup-username').val();
            var password=$('#signup-password').val();
            var repassword=$('#confirm-password').val();
            //定义路由
            var url='http://localhost:3000/signup';
    
            //ajax定义
            $.ajax({
              type:"post",//请求方式
              url:url,//路径
              async:true,
              data:{
                username:username,
                password:password,
                repassword:repassword
              },
              success:function(data){
                try{
                   if(data){//注册成功，转到登陆界面
                      openmsg('注册成功！请登录',6);
                      login_selected();
                    }
                }catch(e){
                    alert('注册失败：'+e);
                }
              }

            });
        }
    
    });

    //登陆ajax查询后台数据
    $('#submit-signin').click(function(e){
        //获取登录名、密码
        var name=$('#signin-username').val();
        var pwd=$('#signin-password').val();

        //定义路由
        var url='http://localhost:3000/signin';

        //ajax定义
        $.ajax({
            type:'post',
            url:url,
            async:true,
            data:{
                name:name,
                pwd:pwd
            },
            success:function(data){
                try{
                    if(data.status==0){//登陆成功
                       //登陆成功后判断是否存储Cookie
                       if($('#save-me').prop('checked')){//复选框选中，创建Cookie，有效期7天
                          $.cookie('signin-username',name,{expires:7});
                          $.cookie('signin-password',pwd,{expires:7});
                        }else{//复选框未选中，删除之前存储的Cookie
                          $.cookie('signin-username','',{expires:-1});
                          $.cookie('signin-password','',{expires:-1});
                        }
                    
                        $form_modal.removeClass('is-visible');
                        //location.reload();//因为有这个刷新页面layer弹出层无法显示
                        //所以想办法让layer弹出层显示消失后再刷新页面，调用end方法
                        layer.msg('登录成功',{
                            icon:6,
                            offset:'t',
                            time:2000,
                            end:function(){
                              location.reload();
                            }
                        });
                    }
                    else if(data.status==1){//用户不存在
                       openmsg('用户不存在!',5);
                    }else if(data.status==2){//密码不正确
                       openmsg('密码错误！',5);
                    }
                }catch(e){
                    alert('登陆失败：'+e);
                }
            }
        });
    });

    //退出登录
    $('#logout').click(function(e){
        $.get('/logout',function(data){
            try{
                var href=window.location.href;
                if(!data){
                    //console.log(href);
                    $form_modal.removeClass('is-visible');
                    location.replace(href);
                    
                    layer.msg('登出成功',{
                        icon:6,
                        offset:'t',
                        time:2000, 
                        end:function(){
                          location.reload();//刷新页面
                        }
                    });
                    
                }
           }catch(e){
               alert("登出失败："+e);
           }
        });
    });

});

//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
    return this.each(function () {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};

function openmsg(msg,num){
    layer.msg(msg,{
        icon:num,
        offset:'t',
    });
}

