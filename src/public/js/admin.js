let localuserId = localStorage.getItem("token");
if (!localuserId) {
  window.location = "/login";
}

const list = document.querySelector(".videos-list");

let userId = localStorage.getItem("userId");
async function renderVideoss(userId) {
  let images = await request("/images" + (userId ? "?userId=" + userId : ""));

  list.innerHTML = null;
  const imagges = await request("/files2");
  for (let image of images) {
    const [li, video, p, img] = createElements("li", "video", "p", "img");
    li.className = "video-item";
    video.setAttribute("src", backendApi + image.imageUrl);
    video.setAttribute("controls", "");
    p.className = "content";
    p.textContent = image.imageTitle;
    p.setAttribute("contenteditable", "true");
    img.className = "delete-icon";
    img.setAttribute("src", "./img/delete.png");
    img.setAttribute("width", "25px");
    img.setAttribute("data-id", image.userId);

    li.append(video, p, img);
    list.append(li);
  }
}

submitButton.onclick = async (event) => {
  try {
    if (!videoInput.value || uploadInput.value.length == 0) {
      alert("You must input avatar image!");
      return;
    }
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("video", uploadInput.files[0]);
    formData.append("userId", userId);
    formData.append("title", videoInput.value);
    videoInput.value = null;
    uploadInput.value = null;
    let res = await request("/uploadvideo", "POST", formData);
    console.log(res);
    renderVideoss(userId);
  } catch (error) {
    console.log(error);
  }
};

renderVideoss(userId);
