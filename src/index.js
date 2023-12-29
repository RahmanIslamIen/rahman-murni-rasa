// * import bagian style
import "./style.css";

// * fetch data menu random
const mealInfo = document.getElementById("mealInfo");

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((data) => {
    const meal = data.meals[0];
    const {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strSource,
    } = meal;

    const ingredients = `
      <ul>
        <li>${strMeasure1} ${strIngredient1}</li>
        <li>${strMeasure2} ${strIngredient2}</li>
        <li>${strMeasure3} ${strIngredient3}</li>
        <li>${strMeasure4} ${strIngredient4}</li>
        <li>${strMeasure5} ${strIngredient5}</li>
        <li>${strMeasure6} ${strIngredient6}</li>
        <li>${strMeasure7} ${strIngredient7}</li>
        <li>${strMeasure8} ${strIngredient8}</li>
        <li>${strMeasure9} ${strIngredient9}</li>
        <li>${strMeasure10} ${strIngredient10}</li>
      </ul>
    `;

    const mealHTML = `
    <div class="container">
        <div class="info">
            <h2>${strMeal}</h2>
            <p><strong>Category:</strong> ${strCategory}</p>
            <p><strong>Area/Country:</strong> ${strArea}</p>
            <p><strong>Instructions:</strong> ${strInstructions}</p>
            <p><strong>Tags:</strong> ${strTags}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
            ${ingredients}
            <ul>
        </div>
        <div class="food-image">
            <img src="${strMealThumb}" alt="${strMeal}" >
            <p><strong>Source:</strong> <a href="${strSource}" target="_blank">${strSource}</a></p>
            <p><strong>Video:</strong> <a href="${strYoutube}" target="_blank">${strYoutube}</a></p>
        </div>
    </div>
    `;

    mealInfo.innerHTML = mealHTML;
  })
  .catch((error) => {
    mealInfo.innerHTML = "<p>Oops! Something went wrong.</p>";
    console.error("Error fetching data:", error);
  });

// * untuk custom element card kategori
class MyCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Gaya untuk kartu */
        .card {
          max-width: 300px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 20px;
        }
        
        .card-content {
          text-align: center;
        }
        
        h2 {
          margin-top: 0;
          font-size: 24px;
        }
        
        p {
          font-size: 16px;
          color: #333;
        }
        
        #categories {
          display: grid;
          grid-template-columns: repeat(
          3,
          1fr
        );
          grid-gap: 20px;
          justify-items: center;
        }
      </style>
    `;
  }
}

customElements.define("my-card", MyCard);

// * menampilkan seluruh kategori
function displayCategories(categories) {
  const categoriesDiv = document.getElementById("categories");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h2>${category.strCategory}</h2>
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}" />
          <p>${category.strCategoryDescription}</p>
        </div>
      </div>
    `;
    categoriesDiv.appendChild(categoryDiv);
  });
}

const xhr = new XMLHttpRequest();
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const categories = response.categories;
      displayCategories(categories);
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  }
};

xhr.open("GET", url);
xhr.send();
