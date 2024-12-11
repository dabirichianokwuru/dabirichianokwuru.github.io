document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", handleSubmit);
});

const handleSubmit = async (event) => {
  event.preventDefault();

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!validateForm(name, email, message)) {
    return;
  }

  // Initialize EmailJS
  emailjs.init("24bGowRJVorfJSstw");

  const templateParams = {
    from_name: name,
    from_email: email,
    message,
    to_name: "Dabirichi",
  };

  try {
    const response = await emailjs.send(
      "service_f7mrv6u",
      "template_hz0qr0c",
      templateParams
    );

    if (response.status === 200) {
      // Check for successful response
      showMessage("Message sent successfully!");
      form.reset();
    } else {
      throw new Error("Failed to send");
    }
  } catch (error) {
    showMessage("Failed to send message. Please try again.");
    console.log("FAILED...", error);
  }
};

const validateForm = (name, email, message) => {
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    showMessage("Please fill in all fields");
    return false;
  }
  return true;
};

const showMessage = (msg) => {
  const messageDiv = document.getElementById("form-message");
  if (messageDiv) {
    messageDiv.textContent = msg;
  } else {
    const div = document.createElement("div");
    div.id = "form-message";
    div.textContent = msg;
    document.querySelector(".contact-form").appendChild(div);
  }
};
