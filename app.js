const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("input-meal");
const mealsDiv = document.getElementById("meals-container");

searchBtn.addEventListener("click", function () {
  let searchResult = input.value.trim();
  if (!searchResult) {
    alert("Enter your meal name");
  } else {
    fetchData(searchResult);
  }
});

function fetchData(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
}

function displayMeals(meals) {
  meals.forEach((meal, idx) => {
    if (idx < 10) {
      const mealDiv = document.createElement("div");
      mealDiv.className = "item";
      const mealInfo = `
          <img src="${meal.strMealThumb}" data-index = "${meal.idMeal}" data-strIngredient1 = "${meal.strIngredient1}" data-strIngredient2 = "${meal.strIngredient2}" data-strIngredient3 = "${meal.strIngredient3}" data-strIngredient4 = "${meal.strIngredient4}" data-strIngredient5 = "${meal.strIngredient5}">
          <h4>${meal.strMeal}</h4> 
          `;
      mealDiv.innerHTML = mealInfo;
      mealsDiv.appendChild(mealDiv);
      mealDiv.addEventListener("click", function (event) {
        const strIngredient1 = event.target.getAttribute("data-strIngredient1");
        const strIngredient2 = event.target.getAttribute("data-strIngredient2");
        const strIngredient3 = event.target.getAttribute("data-strIngredient3");
        const strIngredient4 = event.target.getAttribute("data-strIngredient4");
        const strIngredient5 = event.target.getAttribute("data-strIngredient5");
        displayDetails(
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        );
      });
    }
  });
}

function displayDetails(
  strIngredient1,
  strIngredient2,
  strIngredient3,
  strIngredient4,
  strIngredient5
) {
  const ingredients = `
  <ul><li>
  ${strIngredient1}
  </li>
  <li>
  ${strIngredient2}
  </li>
  <li>
  ${strIngredient3}
  </li>
  <li>
  ${strIngredient4}
  </li>
  <li>
  ${strIngredient5}
  </li>
  </ul>`;
  document.getElementById("ingredients").innerHTML = ingredients;
}
