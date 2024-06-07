// Modal script
// Open login modal
document.getElementById('loginBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default action
  var modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
  modalLogin.show();
});

// Open sign up modal
document.getElementById('sign-up-btn').addEventListener('click', function() {
  var modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
  var modalSignUp = new bootstrap.Modal(document.getElementById('modalSignUp'));
  modalLogin.hide();
  modalSignUp.show();
});


// Password confirmaiton script
document.getElementById('signUpForm').addEventListener('submit', function(event) {
  var password = document.getElementById('password').value;
  var passwordConfirmation = document.getElementById('passwordConfirmation').value;

  if (password !== passwordConfirmation) {
    alert('Passwords do not match.');
    event.preventDefault(); // Prevent form submission
  }
});