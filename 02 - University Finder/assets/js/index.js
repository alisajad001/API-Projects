/**
 * Fetches universities from the universities API based on the provided country,
 * displays the results count, and renders the university names and links in a list.
 * Handles loading and error states.
 * Filters univerties alphabetical
 */
const findBtn = document.querySelector(".find-btn");
const userInput = document.querySelector(".user-input");
const resultCounter = document.querySelector(".result-counter");
const universitiesList = document.querySelector(".universities");

let universities;

const fetchUniversities = async (userValue) => {
  resultCounter.innerText = "Loading...";
  universitiesList.innerHTML = "";
  try {
    const result = await fetch(
      `http://universities.hipolabs.com/search?country=${userValue}`,
    );
    const data = await result.json();
    console.log(data);
    universities = data;
    resultCounter.innerHTML = `Results ${universities.length}`;

    // Creates a university item from universites array
    universities.forEach((university, index) => {
      index++;
      const listItem = document.createElement("li");
      const linkItem = document.createElement("a");
      const idItem = document.createElement("span");
      idItem.innerText = `#${index}`;
      linkItem.innerText = university.name;
      linkItem.href = university.web_pages[0];
      linkItem.setAttribute("target", "_blank");

      listItem.append(linkItem, idItem);
      universitiesList.appendChild(listItem);
    });
  } catch (error) {
    resultCounter.innerText = "Error: " + error;
  }
};

//
findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userInputVal = userInput.value;
  fetchUniversities(userInputVal);
  userInput.value = "";
});
