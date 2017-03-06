$(document).ready(function()
    {
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
    }
);