let ul = document.querySelector(".iframes-list");
let ul_user = document.querySelector(".navbar-list");
let avatar = document.querySelector(".avatar-img");
let search = document.querySelector(".search-btn");
let searchinput = document.querySelector(".search-input");

async function renderImages(userId, value) {
  let images = await request("/images" + (userId ? "?userId=" + userId : ""));
  if (value) {
    images = images.filter((vid) =>
      vid.imageTitle.toLowerCase().includes(value)
    );
  }
  ul.innerHTML = null;
  const imagges = await request("/files2");
  const users = await request("/users");
  let localuserId = localStorage.getItem("userId");
  for (let video1 of images) {
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
    video.setAttribute("src", backendApi + video1.imageUrl);
    video.setAttribute("controls", "");
    div.className = "iframe-footer";
    let link = imagges.find((el) => el.userId == video1.userId);
    let iconadmin = imagges.find((el) => el.userId == localuserId);
    avatar.setAttribute(
      "src",
      iconadmin ? backendApi + iconadmin.imageUrl : "./img/avatar.jpg"
    );
    img.setAttribute("src", backendApi + link.imageUrl);

    img.setAttribute("alt", "channel-icon");
    div2.className = "iframe-footer-text";
    h2.className = "channel-name";
    h2.textContent = video1.imageTitle;
    h3.className = "iframe-title";
    h3.textContent = users.find((el) => el.userId == video1.userId).username;
    time.className = "uploaded-time";
    time.textContent = video1.data;
    a.className = "download";
    let imageUrl = video1.imageUrl.split("/")[2];
    a.setAttribute("href", backendApi + "/download/" + imageUrl);
    span.textContent = video1.memory;

    img2.setAttribute("src", "./img/download.png");

    a.append(span, img2);
    div2.append(h2, h3, time, a);
    div.append(img, div2);
    li.append(video, div);
    ul.append(li);
  }
}

async function renderUsers() {
  const images = await request("/files2");

  const users = await request("/users");
  const userId = window.localStorage.getItem("userId");
  ul_user.innerHTML = null;
  for (let user of users) {
    const [li, a, img, span] = createElements("li", "a", "img", "span");
    a.setAttribute("href", "#");
    let link = images.find((el) => el.userId == user.userId);
    img.setAttribute("src", backendApi + link.imageUrl);
    img.setAttribute("alt", "channel-icon");
    img.setAttribute("width", "30px");
    img.setAttribute("height", "30px");
    span.textContent = user.username;
    a.append(img, span);
    li.append(a);
    ul_user.append(li);

    if (user.userId == userId) {
      span.style.backgroundColor = "rgb(173, 172, 172)";
      span.style.color = "rgb(247, 0, 0)";
    }

    li.onclick = (event) => {
      renderImages(user.userId);
    };
  }
}

search.onclick = async (event) => {
  event.preventDefault();
  renderImages(undefined, searchinput.value);
};

searchinput.onkeypress = async (event) => {
  let videos = await request("/images");
  videos = videos.filter((vid) =>
    vid.imageTitle.toLowerCase().includes(searchinput.value)
  );
  datalist.innerHTML = "";
  for (let i of videos) {
    let option = document.createElement("option");
    option.value = i.imageTitle.toLowerCase();
    datalist.append(option);
  }
};

let listen = new webkitSpeechRecognition();
listen.lang = "en-US";

mic.onclick = () => {
  listen.start();
};
listen.onresult = (event) => {
  let arg = event.results[0][0].transcript;
  searchinput.value = arg;
  renderImages(undefined, searchinput.value);
};
renderUsers();
renderImages();

function createElements(...arr) {
  return arr.map((el) => document.createElement(el));
}
