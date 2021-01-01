//firebase variables
var fAuth = firebase.auth();
var database = firebase.database();

//check user login status
fAuth.onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified) {
            // User is signed in.
            database.ref('users/' + user.uid).on('value', (snap) => {
                document.getElementById("profile_id").innerHTML = snap.val().full_name;
                document.getElementById("div_loggin_button").style.display = "none";
                document.getElementById("div_user_profile").style.display = "block";
                document.getElementById("login_page").click();
                document.getElementById("signup_page").click();
            });
        } else {
            document.getElementById("email_not_verified").style.display = "block";
            database.ref('users/' + user.uid).on('value', (snap) => {
                document.getElementById("profile_id").innerHTML = snap.val().full_name;
                document.getElementById("div_loggin_button").style.display = "none";
                document.getElementById("div_user_profile").style.display = "block";
                document.getElementById("login_page").click();
                document.getElementById("signup_page").click();
            });
        }
    } else {
        // No user is signed in.
        document.getElementById("div_loggin_button").style.display = "block";
        document.getElementById("div_user_profile").style.display = "none";
    }
});

//log out the reve grand user 
function nav_logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("sign Out");
    }, function (error) {
        // An error happened.
        console.log(error)
    });
}

//login revegrand user
function nav_login() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var userEmail = document.getElementById("login_email").value;
    var userPassword = document.getElementById("login_password").value;
    if (userEmail.length < 4) {
        alert('Email Required');
        return;
    }
    if (userEmail.match(mailformat)) {
        if (userPassword.length < 8) {
            alert('Please enter a password.');
            return;
        } else {
            firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

        }
    } else {
        alert("You have entered an invalid email address!");
        return;
    }
};

//show password of login tab
function nav_login_showPassword() {
    var y = document.getElementById("login_checkbox");
    var x = document.getElementById("login_password");
    if (x.type === "password") {
        x.type = "text";
        y.checked = true;

    } else {
        x.type = "password";
        y.checked = false;


    }
}
//show password of sign up tab
function nav_signUp_showPassword() {
    var y = document.getElementById("sign_checkbox");
    var x = document.getElementById("sign_password");
    if (x.type === "password") {
        x.type = "text";
        y.checked = true
    } else {
        x.type = "password";
        y.checked = false;
    }
}

//sign up new user
function nav_signUp() {
    var userName = document.getElementById("fname").value;
    var userMobile = document.getElementById("pNumber").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var userEmail = document.getElementById("sign_email").value;
    var userPassword = document.getElementById("sign_password").value;

    if (userName.length == 0) {
        alert('Name Field Required');
        return;
    }
    if (userMobile.length < 10) {
        alert('Please Provide a Valid Mobile Number');
        return;
    }
    if (userEmail.length < 4) {
        alert('Email Required');
        return;
    }
    if (userEmail.match(mailformat)) {
        if (userPassword.length < 8) {
            alert('Please enter a  Strong password.');
            return;
        } else {
            fAuth.createUserWithEmailAndPassword(userEmail, userPassword).then(function () {
                database.ref('users/' + fAuth.currentUser.uid).set({
                    full_name: userName,
                    mobile_number: userMobile,
                    email_address: userEmail,
                    password: userPassword,
                    user_id: fAuth.currentUser.uid
                }).then(function () {
                    firebase.auth().currentUser.sendEmailVerification().then(function () {
                        // Email Verification sent!
                        // [START_EXCLUDE]
                        alert('Email Sent Successfully. Please Verify Your Email!');
                        // [END_EXCLUDE]
                    });
                }).catch(function (error) {
                    console.log(error);
                });


            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
        }
    } else {
        alert("You have entered an invalid email address!");
        return;
    }



}



//check user login or not for predict
function predict_check() {
    if (fAuth.currentUser) {
        if (fAuth.currentUser.emailVerified) {
            window.location.href = "predict/predict.html";
        } else {
            $('#email_modal').modal('show');
        }
    } else {
        $('#login_modal').modal('show');
    }
}

//check user for technology quiz
function tech_check() {
    if (fAuth.currentUser) {
        if (fAuth.currentUser.emailVerified) {
            window.location.href = "quiz/tech.html";
        } else {
            $('#email_modal').modal('show');
        }

    } else {
        $('#login_modal').modal('show');
    }
}
//check user for history quiz
function history_check() {
    if (fAuth.currentUser) {
        if (fAuth.currentUser.emailVerified) {
            window.location.href = "quiz/history.html";
        }else{
            $('#email_modal').modal('show');
        }
    } else {
        $('#login_modal').modal('show');
    }
}
//check user for geography quiz
function geography_check() {
    if (fAuth.currentUser) {
        if(fAuth.currentUser.emailVerified){
            window.location.href = "quiz/geography.html";
        }else{
            $('#email_modal').modal('show');
        }
        
    } else {
        $('#login_modal').modal('show');
    }
}
//check user for sports quiz
function sports_check() {
    if (fAuth.currentUser) {
        if(fAuth.currentUser.emailVerified){
            window.location.href = "quiz/sports.html";
        }else{
            $('#email_modal').modal('show');
        }
    } else {
        $('#login_modal').modal('show');
    }
}