const URL = "https://api.github.com/users/";
const userName = document.querySelector("#username");
const userImage = document.querySelector("#user-image");
const userFollowers = document.querySelector("#followers");
const userFollowing = document.querySelector("#following");
const userRepositories = document.querySelector("#repos");
const name = document.querySelector(".user-name");
const bio = document.querySelector(".user-bio");
const userLocation = document.querySelector(".user-location");
const stars = document.querySelector(".user-stars");
const respositoriesList = document.querySelector("#repos-list");

const userInput = document.querySelector("#user-input");
const findBtn = document.querySelector("#find-btn");

const fetchUserData = async () => {
  let usernameValue = userInput.value;

  if (usernameValue === "") {
    alert("Please enter a username");
  } else {
    try {
      const response = await fetch(URL + usernameValue);

      if (response.status === 404) {
        // Handle the case where the username is not found
        alert("Username not found");
        userInput.value = "";
        return;
      }

      const data = await response.json();

      renderUser(data);
      fetchRepositories(data.repos_url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
};

// Fetches the repositories
const fetchRepositories = async (reposUrl) => {
  try {
    const response = await fetch(reposUrl);
    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    console.log(error);
  }
};

// Renders the repositories
const renderRepositories = (repositories) => {
  repositories.forEach((repo, index) => {
    index++;

    if (index < 10) {
      index = "0" + index;
    }

    const repoName = repo.name;
    const repoUrl = repo.html_url;
    const repoItem = `<li><span>${index}</span><a href="${repoUrl}" target="_blank">${repoName}</a></li>`;
    respositoriesList.insertAdjacentHTML("beforeend", repoItem);
  });
};

// Renders the user data
const renderUser = (data) => {
  document.querySelector(".user-input").style.display = "none";
  document.querySelector(".github-user-card").style.display = "block";
  userName.innerHTML = "@" + data.login;
  userImage.src = data.avatar_url;
  userFollowers.innerHTML = data.followers;
  userFollowing.innerHTML = data.following;
  userRepositories.innerHTML = data.public_repos;
  name.innerHTML = data.name;
  bio.innerHTML = data.bio;
  userLocation.innerHTML = data.location;
};

findBtn.addEventListener("click", fetchUserData);
