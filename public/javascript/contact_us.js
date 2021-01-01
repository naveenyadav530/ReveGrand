var fdatabase = firebase.firestore();
//contact us form
function contact() {
    var contactName = document.getElementById("contact_name").value;
    var contactEmail = document.getElementById("contact_email").value;
    var msg = document.getElementById("contact_msg").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (contactName.length == 0) {
        document.getElementById("nameHelp").style.visibility = "visible";
        return;
    }
    if (contactEmail.length < 4) {
        document.getElementById("contact_emailHelp").style.visibility = "visible";
        return;
    }
    if (msg.length < 4) {
        document.getElementById("msgHelp").style.visibility = "visible";
        return;
    }
    if (contactEmail.match(mailformat)) {
        fdatabase.collection("contact_form").add({
            full_name: contactName,
            email: contactEmail,
            message: msg
        })
            .then(function (docRef) {
                $('#contact_modal').modal('show');
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }
}