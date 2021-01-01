var fdatabase = firebase.firestore();
var fAuth = firebase.auth();

function submit_confirm() {
    if (document.getElementById("submit_confirm").checked == true) {
        document.getElementById("submit_button").disabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
    }
}
function tech_submit(){
    var technology_q1 = document.getElementById("tech_q1").value;
    var technology_q2 = document.getElementById("tech_q2").value;
    var technology_q3 = document.getElementById("tech_q3").value;
    var technology_q4 = document.getElementById("tech_q4").value;
    var technology_q5 = document.getElementById("tech_q5").value;
    var technology_q6 = document.getElementById("tech_q6").value;
    var technology_q7 = document.getElementById("tech_q7").value;
    var technology_q8 = document.getElementById("tech_q8").value;
    var technology_q9 = document.getElementById("tech_q9").value;
    var technology_q10 = document.getElementById("tech_q10").value;

    var docRef = fdatabase.collection("technology").doc(fAuth.currentUser.uid);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            $('#cant_participate').modal('show');
        } else {
            // doc.data() will be undefined in this case
            fdatabase.collection("technology").doc(fAuth.currentUser.uid).set({
                question1: technology_q1,
                question2: technology_q2,
                question3: technology_q3,
                question4: technology_q4,
                question5: technology_q5,
                question6: technology_q6,
                question7: technology_q7,
                question8: technology_q8,
                question9: technology_q9,
                question10: technology_q10,
                email_address: fAuth.currentUser.email
            })
                .then(function () {
                    $('#predict_modal').modal('show');
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
   

}