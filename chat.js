
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
                usersnb+=1;
                var connectedRef = wilddog.sync().ref("/.info/connected");
                connectedRef.once("value", function (snap) {
                    if (snap.val() === true) {
                        wilddog.sync().ref("/courtuser").update({
                            "usersnb"  : usersnb
                        });
                        alert(usersnb);
                        $(".court").append(usersnb);
                    }
                });
                });

       }
);