document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Basic validation
  if (!validateForm(name, email, message)) {
    return;
  }

  // Send email using EmailJS
  emailjs.init("24bGowRJVorfJSstw");

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_name: "Dabirichi",
  };

  emailjs.send("service_f7mrv6u", "template_hz0qr0c", templateParams).then(
    function () {
      showMessage("Message sent successfully!");
      form.reset();
    },
    function (error) {
      showMessage("Failed to send message. Please try again.");
      console.log("FAILED...", error);
    }
  );
}

function validateForm(name, email, message) {
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    showMessage("Please fill in all fields");
    return false;
  }
  return true;
}

function showMessage(msg) {
  const messageDiv = document.getElementById("form-message");
  if (messageDiv) {
    messageDiv.textContent = msg;
  } else {
    const div = document.createElement("div");
    div.id = "form-message";
    div.textContent = msg;
    document.querySelector(".contact-form").appendChild(div);
  }
}
