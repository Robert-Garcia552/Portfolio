document.getElementById('contact').addEventListener('submit', submitForm);

const db = firebase.firestore();

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
        document.getElementById('flash-message').innerHTML = "<div class=\"alert alert-success text-center\" role=\"alert\"> We will be in touch! Thank you for your inquiry. </div>"
    } else {
        document.getElementById('flash-message').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"> Please add a valid email address. </div>"
    }
}

function getInputValues(id) {
    return document.getElementById(id).value;
}

function saveLeads(name, email, message)   {
    const leadsRef = db.collection("prospects").add({
        name: name,
        email: email,
        message: message
    }) 
}