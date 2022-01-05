const zmdi_account = document.querySelector(".zmdi-account");
const zmdi_lock = document.querySelector(".zmdi-lock");

submitButton.onclick = async (event) => {
  try {
    event.preventDefault();
    if (!usernameInput.value || !passwordInput.value) return;
    if (uploadInput.value.length == 0) {
      alert("You must input avatar image!");
      return;
    }
    let newUser = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const response = await request("/auth/register", "POST", newUser);

    window.localStorage.setItem("userId", response.userId);
    window.localStorage.setItem("token", response.token);
    window.localStorage.setItem("bod", newUser);
    let formData = new FormData();
    formData.append("image", uploadInput.files[0]);
    formData.append("userId", response.userId);
    let res = await request("/upload", "POST", formData);
    console.log(res);

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
