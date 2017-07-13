	$(document).ready(function(){

			function myfunction(li,li_a,menu_tab){
				li.click(function(){
				var index=$(this).index();
				menu_tab.eq(index).addClass("active").siblings().removeClass("active");
				li_a.removeClass("selected");
				li_a.eq(index).addClass("selected").siblings().removeClass("selected");
				
			});
			}

			myfunction($(".main_menu .menu .ulmenu1 li"),$(".main_menu .ulmenu1 li a"),$(".main_menu .content .menu1 .tab"));
			myfunction($(".main_menu .menu .ulmenu2 li"),$(".main_menu .ulmenu2 li a"),$(".main_menu .content .menu2 .tab"));
			myfunction($(".main_menu .menu .ulmenu3 li"),$(".main_menu .ulmenu3 li a"),$(".main_menu .content .menu3 .tab"));


			$(function(){            //ul/li的折叠效果
				$(".menu > ul").eq(0).show();
				 $(".menu h3").click(function(){
				 		//找menu对应的tab
				 		$(".menu_tab > div").removeClass("active");

				 		var val=($(this).next().attr('class'));
				 		var menu_value=(val.substring(val.length-1));
				 		$(".main_menu .content .menu"+menu_value+" .tab:first-child").addClass("active");
				 		$(".main_menu .menu .ulmenu"+menu_value+" li>a").removeClass("selected");
				 		$(".main_menu .menu .ulmenu"+menu_value+" li a").eq(0).addClass("selected");//默认设置为被选中状态
				 		

				 		// $("."+"val").child().child().("selected")
				 		
				 			//这是ul收缩效果
				            $(this).next().stop().slideToggle();
				            $(this).siblings().next("ul").stop().slideUp();
							
				           // if($(".container .ulmenu"+menu_value+" li ").find("a").attr("class")==="selected"){
				           // 		$(".container .content .menu"+menu_value+" .tab:first-child")
				           // }
			            });

			});

			$(function(){   // 导航 >
				 $("main_menu .menu > h3").click(function(){

				 	$(".main_menu .content .A1").empty().text($(this).text());
				 	
				 });
			});
		});



