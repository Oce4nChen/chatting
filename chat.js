
$(document).ready(function()
    {
        $(".chat").slideDown(1500);
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
                        wilddog.sync().ref("/courtuser").update({
                            "usersnb"  : usersnb
                        });
                    }
                    //if (snap.val() === false) {
                    //    usersnb-=1;
                    //    wilddog.sync().ref("/courtuser").update({
                    //        "usersnb"  : usersnb
                    //    });
                    //    alert(usersnb);
                    //}
                });

                });
        wilddog.sync().ref("/courtuser").on('child_changed',
            function (snapshot) {
                var ub = snapshot.val();
                $("span").remove();
                $(".court").append("<span>"+ ub +"</span>");
                wilddog.sync().ref("/courtuser").onDisconnect().update({
                    "usersnb" : ub-1
                })
            });


       }
);