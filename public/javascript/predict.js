var fdatabase = firebase.firestore();
var fAuth = firebase.auth();
//predict form
function predict() {
    var predict_question1 = document.getElementById("predict_q1").value;
    var predict_question2 = document.getElementById("predict_q2").value;


    if (predict_question1.length == 0) {
        document.getElementById("q1").style.visibility = "visible";
        return;
    }
    if (predict_question2.length == 0) {
        document.getElementById("q2").style.visibility = "visible";
        return;
    }
    var docRef = fdatabase.collection("predict").doc(fAuth.currentUser.uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#cant_participate').modal('show');
        } else {
            // doc.data() will be undefined in this case
            fdatabase.collection("predict").doc(fAuth.currentUser.uid).set({
                question1: predict_question1,
                question2: predict_question2,
                email_address: fAuth.currentUser.email
            })
                .then(function () {
                    $('#predict_modal').modal('show');
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


}