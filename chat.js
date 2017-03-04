
$(document).ready(function()
    {
        var config = {
            authDomain: "cchatting.wilddog.com",
            syncURL: "https://cchatting.wilddogio.com"
        };
        wilddog.initializeApp(config);

        var connectedRef = wilddog.sync().ref("/.info/connected");
        connectedRef.on("value", function(snap) {
            var user =0;
            if (snap.val() === true) {
              var users = user+1;
            } else {
            }
            $(".court").append(users);
        });

        }
);