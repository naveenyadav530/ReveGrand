var fdatabase = firebase.firestore();
var fAuth = firebase.auth();

function submit_confirm() {
    if (document.getElementById("submit_confirm").checked == true) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}


//submit form for geography 
function geography_submit() {
    var geography_q1 = document.getElementById("geo_q1").value;
    var geography_q2 = document.getElementById("geo_q2").value;
    var geography_q3 = document.getElementById("geo_q3").value;
    var geography_q4 = document.getElementById("geo_q4").value;
    var geography_q5 = document.getElementById("geo_q5").value;
    var geography_q6 = document.getElementById("geo_q6").value;
    var geography_q7 = document.getElementById("geo_q7").value;
    var geography_q8 = document.getElementById("geo_q8").value;
    var geography_q9 = document.getElementById("geo_q9").value;
    var geography_q10 = document.getElementById("geo_q10").value;
    var docRef = fdatabase.collection("geography").doc(fAuth.currentUser.uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#cant_participate').modal('show');
        } else {
            // doc.data() will be undefined in this case
            fdatabase.collection("geography").doc(fAuth.currentUser.uid).set({
                question1: geography_q1,
                question2: geography_q2,
                question3: geography_q3,
                question4: geography_q4,
                question5: geography_q5,
                question6: geography_q6,
                question7: geography_q7,
                question8: geography_q8,
                question9: geography_q9,
                question10: geography_q10,
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
