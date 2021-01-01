var fdatabase = firebase.firestore();
var fAuth = firebase.auth();

function submit_confirm() {
    if (document.getElementById("submit_confirm").checked == true) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}
function sports_submit() {
    var sports_q1 = document.getElementById("sport_q1").value;
    var sports_q2 = document.getElementById("sport_q2").value;
    var sports_q3 = document.getElementById("sport_q3").value;
    var sports_q4 = document.getElementById("sport_q4").value;
    var sports_q5 = document.getElementById("sport_q5").value;
    var sports_q6 = document.getElementById("sport_q6").value;
    var sports_q7 = document.getElementById("sport_q7").value;
    var sports_q8 = document.getElementById("sport_q8").value;
    var sports_q9 = document.getElementById("sport_q9").value;
    var sports_q10 = document.getElementById("sport_q10").value;



    var docRef = fdatabase.collection("sports").doc(fAuth.currentUser.uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#cant_participate').modal('show');
        } else {
            // doc.data() will be undefined in this case
            fdatabase.collection("sports").doc(fAuth.currentUser.uid).set({
                question1: sports_q1,
                question2: sports_q2,
                question3: sports_q3,
                question4: sports_q4,
                question5: sports_q5,
                question6: sports_q6,
                question7: sports_q7,
                question8: sports_q8,
                question9: sports_q9,
                question10: sports_q10,
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