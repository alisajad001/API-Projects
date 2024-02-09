const generateBtn = document.querySelector(".generate-btn");
const catFact = document.querySelector(".cat-fact");

// Fetches Cat Data
const fetchCatData = async () => {
  catFact.innerHTML = "Generating...";
  try {
    const result = await fetch("https://catfact.ninja/fact");
    const data = await result.json();

    catFact.innerHTML = data.fact;
  } catch (error) {
    catFact.innerHTML = error;
  }
};
fetchCatData();
generateBtn.addEventListener("click", fetchCatData);
