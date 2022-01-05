let localuserId = localStorage.getItem("token");
if (localuserId) {
  window.location = "/index";
}

submitButton.onclick = async (event) => {
  try {
    event.preventDefault();
    console.log("ll");
    if (!usernameInput.value || !passwordInput.value) return;

    let newUser = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const response = await request("/auth/login", "POST", newUser);

    window.localStorage.setItem("userId", response.userId);
    window.localStorage.setItem("token", response.token);

    messageText.style.color = "green";
    messageText.textContent = response.message;
    window.location = "/index";
  } catch (error) {
    messageText.style.color = "red";
    messageText.textContent = error.message;
  }
};

showButton.onclick = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
};
