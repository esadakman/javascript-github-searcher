// const { default: axios } = require("axios");

const form = document.querySelector("section form");
const input = document.querySelector("section form input");
const msg = document.querySelector("section .feedback p");
const profiles = document.querySelector("section .profiles");
const language = document.querySelector(".language");
const trash = document.querySelector(".trash");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    // msg.style.display = "flex";
    msg.innerText = `Please enter a valid username`;
    // timer(5000);
    return;
  }
  getUserData();
});

const getUserData = async () => {
  let inputVal = input.value;
  let url = `https://api.github.com/users/${inputVal}`;
  try {
    const response = await axios(url);
    const {
      avatar_url,
      name,
      html_url,
      location,
      bio,
      public_repos,
      followers,
    } = response.data;
    console.log(response);
    // console.log(url);

    const profileNames = profiles.querySelectorAll("h2");
    const profileNamesArray = Array.from(profileNames);
    // if (profileNamesArray.length > 0) {
    //   const filteredArray = profileNamesArray.filter(
    //     (profileCard) => profileCard.querySelector("h2").innerText == name
    //   );
    //   if (filteredArray.length > 0) {
    //     msg.style.display = "flex";
    //     msg.innerText = `You already searched the ${name}, Please search for profile`;
    //     // ! hata mesajının 5 saniye sonra ekrandan kaybolması için setTimeout fonk. çağırdık
    //     // timer(5000);

    //     return;
    //   }
    // }

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-container");
    const cardDivInnerHTML = `
    <span class="pro">PRO</span>
        <img class="round" src="${avatar_url}" alt="user" />
          <h2>${name}</h2>
            <h5>${location}</h5>
              <p>${bio}</p>
                <div class="buttons">
                <button class="primary">
                <a href="${html_url}">Visit Profile</a>
                </button>
                </div>
                <div class="infos">
                 <div class="repos">
                    <h3>Public Repos</h3>
                    <p>${public_repos}</p>
                  </div>
                  <div class="followers">
                     <h3>Followers</h3>
                     <p>${followers}</p>
                  
                </div>
    
    `;
    cardDiv.innerHTML = cardDivInnerHTML;
    profiles.prepend(cardDiv);
    console.log(cardDiv);
  } catch (error) {
    msg.innerText(error);
  }

  form.reset();
};

// getUserData();
