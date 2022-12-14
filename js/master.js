//check localStorage colors
let colorOption = localStorage.getItem("colors");
if (colorOption !== null) {
  document.documentElement.style.setProperty("--main--color", colorOption);
  document.querySelectorAll(".Colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === colorOption) {
      ele.classList.add("active");
    }
  });
}
let backgroundOption = true;
let backgroundInterval;
//check localStorage background
let backOption = localStorage.getItem("backgrounds");
if (backOption !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backOption === "true") {
    document.querySelector(".yes").classList.add("active");
    backgroundOption = true;
  } else {
    document.querySelector(".no").classList.add("active");
    backgroundOption = false;
  }
}

// settings box
let settings = document.querySelector(".settings-box"),
  icon = document.querySelector(".icon");
icon.addEventListener("click", function () {
  this.classList.toggle("fa-spin");
  settings.classList.toggle("open");
});
//select bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLink = document.querySelectorAll(".links a");
function scrollSections(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollSections(allBullets);
scrollSections(allLink);
//switch colors
let colorsLi = document.querySelectorAll(".Colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    localStorage.setItem("colors", e.target.dataset.color);

    handleActive(e);
  });
});
//switch random background
let randomBack = document.querySelectorAll(".random-backgrounds span");
randomBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yas") {
      backgroundOption = true;
      localStorage.setItem("backgrounds", true);
      randomBackImage();
    } else {
      backgroundOption = false;
      localStorage.setItem("backgrounds", false);
      clearInterval(backgroundInterval);
    }
  });
});
//select reset button
let resetBtn = document.querySelector(".settings-box .reset");
resetBtn.onclick = function () {
  localStorage.removeItem("colors");
  localStorage.removeItem("backgrounds");
  localStorage.removeItem("bullet");
  window.location.reload();
};

// select landing
let landing = document.querySelector(".landing");
let arr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomBackImage() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      let num = Math.floor(Math.random() * arr.length);
      landing.style.backgroundImage = 'url("images/' + arr[num] + '")';
    }, 3000);
  }
}
randomBackImage();
//select progress
let sectionSkills = document.querySelector(".skills"),
  skills = document.querySelectorAll(".progress-skill span");
window.onscroll = function () {
  if (window.scrollY >= sectionSkills.offsetTop - 200) {
    skills.forEach(function (span) {
      span.style.width = span.dataset.width;
    });
  }
};
//select gallery
let sectionGallery = document.querySelector(".gallery");
let images = document.querySelectorAll(".img-box img");
images.forEach((img) => {
  img.addEventListener("click", function (e) {
    let overLay = document.createElement("div");
    overLay.className = "overgallery";
    document.body.appendChild(overLay);
    let popupBox = document.createElement("div");
    popupBox.className = "popupbox";
    overLay.appendChild(popupBox);
    if (e.target.alt !== null) {
      let headImg = document.createElement("h2");
      headImg.className = "headImg";
      headImg.appendChild(document.createTextNode(e.target.alt));
      popupBox.appendChild(headImg);
    }
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupImg.style.cssText = "width: 100%;padding:20px;";
    popupBox.appendChild(popupImg);
    let popupClose = document.createElement("span");
    popupClose.appendChild(document.createTextNode("X"));
    popupClose.className = "popupclose";
    popupBox.appendChild(popupClose);
  });
  document.addEventListener("click", function (el) {
    if (el.target.className == "popupclose") {
      el.target.parentNode.remove();
      document.querySelector(".overgallery").remove();
    }
  });
});
//handel class active  function
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}
//show bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let localBullet = localStorage.getItem("bullet");
if (localBullet !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (localBullet === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((bullet) => {
  bullet.addEventListener("click", function (el) {
    handleActive(el);
    if (bullet.dataset.display === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullet", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullet", "none");
    }
  });
});
//select toggle menu
let toggleBtn = document.querySelector(".landing .toggle-menu");
let link = document.querySelector(".landing .links");

link.onclick = function (event) {
  event.stopPropagation();
};
toggleBtn.onclick = function (event) {
  event.stopPropagation();
  toggleBtn.classList.toggle("active");
  link.classList.toggle("open");
};
document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== link) {
    if (link.classList.contains("open")) {
      toggleBtn.classList.toggle("active");
      link.classList.toggle("open");
    }
  }
});
