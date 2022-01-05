let ul = document.querySelector(".iframes-list");
let ul_user = document.querySelector(".navbar-list");

async function renderImages(userId) {
  let images = await request("/images" + (userId ? "?userId=" + userId : ""));
  ul.innerHTML = null;
  for (let image of images) {
    const [li, video, div, img, div2, h2, h3, time, a, span, img2] =
      createElements(
        "li",
        "video",
        "div",
        "img",
        "div",
        "h2",
        "h3",
        "time",
        "a",
        "span",
        "img"
      );
    li.className = "iframe";
    video.setAttribute("src", backendApi + image.imageUrl);
    video.setAttribute("controls", "");
    div.className = "iframe-footer";

    img.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/146/146031.png"
    );
    img.setAttribute("alt", "channel-icon");
    div2.className = "iframe-footer-text";
    h2.className = "channel-name";
    h2.textContent = image.imageLink;
    h3.className = "iframe-title";
    h3.textContent = image.imageTitle;
    time.className = "uploaded-time";
    time.textContent = image.data;
    a.className = "download";

    a.setAttribute("href", backendApi + "/download/" + image.imageLink);
    span.textContent = image.memory;

    img2.setAttribute("src", "./img/download.png");

    a.append(span, img2);
    div2.append(h2, h3, time, a);
    div.append(img, div2);
    li.append(video, div);
    ul.append(li);
  }
}

async function renderUsers() {
  const users = await request("/users");

  const userId = window.localStorage.getItem("userId");
  ul_user.innerHTML = null;
  for (let user of users) {
    const [li, a, img, span] = createElements("li", "a", "img", "span");
    a.setAttribute("href", "#");
    img.setAttribute("src", backendApi + user.image);
    img.setAttribute("alt", "channel-icon");
    img.setAttribute("width", "30px");
    img.setAttribute("height", "30px");
    span.textContent = user.username;
    a.append(img, span);
    li.append(a);
    ul_user.append(li);

    if (user.userId == userId) {
      span.style.backgroundColor = "blue";
      span.style.color = "white";
    }

    li.onclick = (event) => {
      renderImages(user.userId);
    };
  }
}

// form.onsubmit = async (event) => {
//   event.preventDefault();

//   let formData = new FormData();

//   formData.append("image", fileInput.files[0]);
//   formData.append("title", textInput.value);

//   await request("/images", "POST", formData);
//   await renderImages();
// };

renderUsers();
renderImages();

function createElements(...arr) {
  return arr.map((el) => document.createElement(el));
}
