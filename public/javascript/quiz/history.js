var fdatabase = firebase.firestore();
var fAuth = firebase.auth();

function submit_confirm() {
    if (document.getElementById("submit_confirm").checked == true) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}
function history_submit() {
    var his_q1 = document.getElementById("history_q1").value;
    var his_q2 = document.getElementById("history_q2").value;
    var his_q3 = document.getElementById("history_q3").value;
    var his_q4 = document.getElementById("history_q4").value;
    var his_q5 = document.getElementById("history_q5").value;
    var his_q6 = document.getElementById("history_q6").value;
    var his_q7 = document.getElementById("history_q7").value;
    var his_q8 = document.getElementById("history_q8").value;
    var his_q9 = document.getElementById("history_q9").value;
    var his_q10 = document.getElementById("history_q10").value;

    var docRef = fdatabase.collection("history").doc(fAuth.currentUser.uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#cant_participate').modal('show');
        } else {
            // doc.data() will be undefined in this case
            fdatabase.collection("history").doc(fAuth.currentUser.uid).set({
                question1: his_q1,
                question2: his_q2,
                question3: his_q3,
                question4: his_q4,
                question5: his_q5,
                question6: his_q6,
                question7: his_q7,
                question8: his_q8,
                question9: his_q9,
                question10: his_q10,
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