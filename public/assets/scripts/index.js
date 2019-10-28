var db = firebase.firestore();

document.getElementById('contact').addEventListener('submit', submitForm);

function validateEmail(email) {
    var emailFormat = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(email.match(emailFormat)) {
        return true
    } else {
        return false
    }
}

function submitForm(e)   {
    e.preventDefault();
    // get values from form
    var name = getInputValues('name');
    var email = getInputValues('email');
    var message = getInputValues('message');

    if(validateEmail(email)) {
        // Save Leads
        saveLeads(name, email, message);
        document.getElementById('feedback').innerHTML = "<div class=\"success\" role=\"alert\"> Thanks for reaching out, looking forward to discussing your project. </div>"
    } else {
        document.getElementById('feedback').innerHTML = "<div class=\"danger\" role=\"alert\"> Please add a valid email address. </div>"
    }
}

function getInputValues(id) {
    return document.getElementById(id).value;
}

function saveLeads(name, email, message)   {
    const leadsRef = db.collection("leads").add({
        name: name,
        email: email,
        message: message,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
