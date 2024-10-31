const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-container-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipies = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipies :)...</h2>" ;
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

         recipeContainer.innerHTML = "";
         response.meals.forEach(meals => {
        //  console.log(response.meals[0]);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meals.strMealThumb}">
            <h3>${meals.strMeal}</h3>
            <p><span>${meals.strArea}</span>Dish</p>
            <p>Belongs to <span>${meals.strCategory}<span> Category</p>
        `
        const button = document.createElement('button');
        button.innerHTML = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click',()=>{
            openRecipePopup(meals);
        })

        recipeContainer.appendChild(recipeDiv);
        });
    }
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error In Fetching Recipies 😵‍💫...</h2>" ;
    }
}

const fetchIngredients = (meals) => {
    let ingredientsList = "";
    for(let i=1; i<=20;i++){
        const ingredient = meals[`strIngredient${i}`];
        if(ingredient){
            const measure = meals[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
    
}

const openRecipePopup = (meals) => {
    recipeDetailsContent.innerHTML = `
         <h2 class="recipeName">${meals.strMeal}</h2>
         <h3>Ingredients:</h3>
         <ul class="ingredientList">${fetchIngredients(meals)}</ul>
         <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p >${meals.strInstructions}</p>
        </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block" ;
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal you want to search 🙈</h2>`;
        return;
    }
    fetchRecipies(searchInput);
    

})