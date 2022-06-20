// const { default: axios } = require("axios");

const form = document.querySelector("section form");
const input = document.querySelector("section form input");
const msg = document.querySelector("section .feedback ");
const profiles = document.querySelector("section .profiles");
const language = document.querySelector(".language");
const trash = document.querySelector(".trash");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    msg.style.display = "flex";
    msg.innerText = `Please enter a valid username`;
    timer(5000);
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

      public_repos,
      followers,
      login,
    } = response.data;
//     console.log(response);

    const profileNames = profiles.querySelectorAll(".card-container");
    const profileNamesArray = Array.from(profileNames);
    if (!name || !location) {
      msg.style.display = "flex";
      msg.innerText = `${login} not specified his informations!`;
      timer(5000);

      // return;
    }
    if (profileNamesArray.length > 0) {
      const filteredArray = profileNamesArray.filter(
        (profileCard) => profileCard.querySelector(" h2").innerText == name
      );
      // console.log(filteredArray);
      if (filteredArray.length > 0) {
        msg.style.display = "flex";
        msg.innerText = `You already searched the ${name}, Please search for another profile`;
        // ! hata mesajının 5 saniye sonra ekrandan kaybolması için setTimeout fonk. çağırdık
        timer(5000);
        return;
      } else if (profiles.children.length > 5) {
        msg.style.display = "flex";
        msg.innerText = `You can only check for 6 profiles`;
        timer(5000);
        let hr = document.createElement("hr");
        document.querySelector(".container").appendChild(hr);
        return;
      } //else if (!name) {
      //   console.log(nullllll);
      // }
    }

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-container");
    const cardDivInnerHTML = `
    <span class="pro">Github</span>
        <img class="round" src="${avatar_url}" alt="user" />
          <h2 class="name" ><span>${name}</span></h2>
          <h5 class="location">${location}</h5>
              
                <div class="buttons">
                <a href="${html_url}" target="_blank">Visit Profile</a>
                
                </div>
                <div class="infos">
                 <div class="repos">
                    <h4>Public Repos</h4>
                    <p>${public_repos}</p>
                  </div>
                  <div class="followers">
                     <h4>Followers</h4>
                     <p>${followers}</p>
                  
                </div>
    
    `;
    cardDiv.innerHTML = cardDivInnerHTML;
//     profiles.prepend(cardDiv);
 profiles.append(cardDiv);
    // console.log(cardDiv);
  } catch (error) {
    if ((error = 404)) {
      msg.style.display = "flex";
      msg.innerText = `We can't find the ${inputVal}'s profile`;
      timer(5000);
      // return;
    } else {
      msg.innerText = error;
      timer(5000);
    }
  }

  form.reset();
};

function timer(time) {
  setTimeout(() => {
    msg.innerText = "";
    msg.style.display = "none";
  }, time);
  form.reset();
}

trash.addEventListener("click", (e) => {
  profiles.innerHTML = "";
  e.preventDefault();
});

// getUserData();
