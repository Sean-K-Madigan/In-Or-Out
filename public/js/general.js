// There are no funcitons written for the close modal buttons only to open them.

// Modal script
// Open login modal
document.getElementById('loginBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default action
  const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
  modalLogin.show();
});

// Open sign up modal
document.getElementById('sign-up-btn').addEventListener('click', function() {
  const modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
  const modalSignUp = new bootstrap.Modal(document.getElementById('modalSignUp'));
  modalLogin.hide();
  modalSignUp.show();
});


// Password confirmaiton script
document.getElementById('signUpForm').addEventListener('submit', function(event) {
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('passwordConfirmation').value;

  if (password !== passwordConfirmation) {
    alert('Passwords do not match.');
    event.preventDefault(); // Prevent form submission
  }
});

// Modal create event
document.getElementById('createEvent').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default action
  const modalCreateEvent = new bootstrap.Modal(document.getElementById('modalCreateEvent'));
  modalCreateEvent.show();
});