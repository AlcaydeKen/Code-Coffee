document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".coffee-loader").style.display = "none";
  }, 1000);

  const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"),
    toggle = document.querySelector(".toggle"),
    searchBtn = document.querySelector(".search-box"),
    modeSwitch = document.querySelectorAll(".toggle-switch"),
    modeText = document.querySelectorAll(".mode-text");

  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "true") {
    body.classList.add("dark");
    modeText.forEach((text) => (text.innerHTML = "Light Mode"));
    modeSwitch.forEach(
      (switchBtn) =>
        (switchBtn.querySelector(".switch").style.background =
          "var(--toggle-color)")
    );
  }

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  modeSwitch.forEach((switchBtn) => {
    switchBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        modeText.forEach((text) => (text.innerHTML = "Light Mode"));
        modeSwitch.forEach(
          (switchBtn) =>
            (switchBtn.querySelector(".switch").style.background =
              "var(--toggle-color)")
        );
        localStorage.setItem("darkMode", "true");
      } else {
        modeText.forEach((text) => (text.innerHTML = "Dark Mode"));
        modeSwitch.forEach(
          (switchBtn) =>
            (switchBtn.querySelector(".switch").style.background =
              "var(--body-color)")
        );
        localStorage.setItem("darkMode", "false");
      }
      updateAdsForDarkMode();
    });
  });

  function updateAdsForDarkMode() {
    const ads = document.querySelectorAll(".ad");
    ads.forEach((ad) => {
      if (body.classList.contains("dark")) {
        ad.classList.add("dark-mode");
      } else {
        ad.classList.remove("dark-mode");
      }
    });
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createRegularAd() {
    const ad = document.createElement("div");
    ad.classList.add("ad");
    if (body.classList.contains("dark")) {
      ad.classList.add("dark-mode");
    }
    ad.innerHTML = `
      <div class="ad-content">
        <img src="images/ad.png" alt="Ad Image" class="ad-image"/>
        <h3>Special Offer!</h3>
        <p>Enjoy our freshly brewed coffee at our Menu!</p>
        <div class="ad-buttons">
          <button class="close-ad">Close</button>
          <button class="view-ad">View</button>
        </div>
      </div>
    `;
    return ad;
  }

  function createSlidingAd(position) {
    const ad = document.createElement("div");
    ad.classList.add("ad", "sliding-ad", position);
    if (body.classList.contains("dark")) {
      ad.classList.add("dark-mode");
    }
    ad.innerHTML = `
      <div class="ad-content">
        <img src="images/ad.jpg" alt="Ad Image" class="ad-image"/>
        <h3>Special Offer!</h3>
        <p>We highly Recommend to View our the Best at our Best Sellers Page!</p>
        <div class="ad-buttons">
          <button class="close-ad">Close</button>
          <button class="view-ad">View</button>
        </div>
      </div>
    `;
    return ad;
  }

  function displayRegularAd() {
    const adContainer = document.getElementById("adContainer");
    if (adContainer.children.length >= 4) return; // Check the number of ads

    const ad = createRegularAd();
    adContainer.appendChild(ad);

    const adWidth = ad.offsetWidth;
    const adHeight = ad.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const randomX = getRandomNumber(0, screenWidth - adWidth);
    const randomY = getRandomNumber(0, screenHeight - adHeight - 50); // Exclude the bottom 50 pixels

    ad.style.left = `${randomX}px`;
    ad.style.top = `${randomY}px`;

    const closeBtn = ad.querySelector(".close-ad");
    closeBtn.addEventListener("click", () => {
      ad.remove();
      if (adContainer.children.length === 0) {
        adContainer.style.pointerEvents = "none";
      }
    });

    const viewBtn = ad.querySelector(".view-ad");
    viewBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });

    adContainer.style.pointerEvents = "auto";
  }

  function displaySlidingAd(position) {
    const adContainer = document.getElementById("adContainer");
    if (adContainer.children.length >= 4) return; // Check the number of ads
    if (adContainer.querySelector(".sliding-ad")) return; // Check for existing sliding ad

    const ad = createSlidingAd(position);
    adContainer.appendChild(ad);

    const closeBtn = ad.querySelector(".close-ad");
    closeBtn.addEventListener("click", () => {
      ad.classList.remove(`show-${position}`);
      ad.classList.add(`hide-${position}`);
      setTimeout(() => {
        ad.remove();
        if (adContainer.children.length === 0) {
          adContainer.style.pointerEvents = "none";
        }
      }, 1000);
    });

    const viewBtn = ad.querySelector(".view-ad");
    viewBtn.addEventListener("click", () => {
      window.location.href = "best.html";
    });

    adContainer.style.pointerEvents = "auto";

    setTimeout(() => {
      ad.classList.add(`show-${position}`);
    }, 100);
  }

  function displayRandomAd() {
    const adContainer = document.getElementById("adContainer");
    if (adContainer.children.length >= 4) return; // Check the number of ads

    const adType = getRandomNumber(1, 2);
    if (adType === 1) {
      displayRegularAd();
    } else {
      const position = getRandomNumber(1, 2) === 1 ? "bottom" : "top";
      displaySlidingAd(position);
    }
  }

  setInterval(displayRandomAd, getRandomNumber(10000, 60000));
});
