$(document).ready(function()
    {
        //$(".chat").slideDown(1500);
        var config = {
            authDomain: "cchatting.wilddog.com",
            syncURL: "https://cchatting.wilddogio.com"
        };
        wilddog.initializeApp(config);
        wilddog.sync().ref("/courtuser/usersnb").once('value',
            function (snapshot) {
                var usersnb = snapshot.val();
                var connectedRef = wilddog.sync().ref("/.info/connected");
                connectedRef.once("value", function (snap) {
                    if (snap.val() === true) {
                        usersnb+=1;
                        wilddog.sync().ref("/courtuser").set({
                            "usersnb"  : usersnb
                        });
                    }
                });
            });
        setInterval( function ca() {
            var ref = wilddog.sync().ref("/courtuser/usersnb");
            ref.once("value",
                function (snapshot) {
                    var a = snapshot.val();
                    $("span").remove();
                    $(".court").append("<span>"+ a+"</span>");
                    a-=1

                });
        },2000);
         $(".btn_1").click(function(){
             var ref = wilddog.sync().ref("/courtuser/usersnb");
             ref.once("value",
                 function (snapshot) {
                     var a = snapshot.val();
                      a-=1;
                     wilddog.sync().ref("/courtuser").set({
                        "usersnb" : a
                     })
                 })

            setTimeout(function(){
                window.close();
            },500)
        //wilddog.sync().ref("/courtuser").onDisconnect("value",
        //    function(snapshot){
        //        var a = snapshot.val();
        //        a-=1;
        //
        //    }
        //
        //);

         })
        var ref =wilddog.sync().ref("/users");
        $(".sub").click(function(){
             var text =  $(".inp").val();
            var t = new Date();
            var ts = t.getFullYear()+"/"+ (t.getMonth()+1)+"/"+ t.getDate()+"/"+ t.getHours()+"点"+ t.getMinutes()+"分 ：";
            ref.child("message").push(ts + text);
            $(".inp").val("").focus();

        });
        ref.child("message").on("child_added", function(snapshot) {
            var text = snapshot.val();
            var textObj = $("<div class=\"dm_message\" style='position: relative'></div>");
            textObj.text(text);
            $(".chatword").append(textObj);
            $(".chatword").scrollTop(9999);
            textObj.css({
                left :1000
            })
            textObj.animate({left:0},1000*Math.random())
        });
        //var moveObj = function(obj) {
        //    var p = 500;
        //    obj.css({
        //        right:p
        //    });
        //    var time = 1000 + 1000 * Math.random();
        //    obj.animate({
        //        left:p
        //    }, time);
        //}


    }
);
