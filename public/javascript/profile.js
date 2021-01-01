var fAuth = firebase.auth();
var database = firebase.database();
//check user login status
fAuth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        database.ref('users/' + user.uid).on('value', (snap) => {
            document.getElementById("username").innerHTML = snap.val().full_name;
            document.getElementById("user_email").innerHTML = snap.val().email_address;
            document.getElementById("user_phone").innerHTML = snap.val().mobile_number;
            document.getElementById("div_profile").style.display = "block";
        });
    }
});