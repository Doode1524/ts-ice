const mealsList = document.getElementById('meals-list')
const mealsDetails = document.getElementById('meals-details')
const searchForm = document.getElementById('search-form')
const URL = "https://www.themealdb.com/api/json/v1/1/"

const fetchMeals = (e) => {
    e.preventDefault()
    mealsList.innerHTML = ""
    mealsDetails.innerHTML = ""
    let query = e.target[0].value
    
    fetch(`${URL}search.php?s=${query}`)
    .then(resp => resp.json())
    .then(data => {
      data.meals.map(meal => renderMeal(meal))
    })
}
searchForm.addEventListener('submit', fetchMeals)

const renderMeal = (meal) => {
    mealsList.innerHTML += 
    `
    <li>${meal.strMeal}
    <button id="recipe-details"value=${meal.idMeal}>Details</button>
    </li>
    `
    const recipeDetailsButtons = document.querySelectorAll("#recipe-details")
    recipeDetailsButtons.forEach(button => button.addEventListener('click', fetchMeal))
}

const fetchMeal = (e) => {
    e.preventDefault()
    let mealId = e.target.value
    mealsList.innerHTML = ""
    mealsDetails.innerHTML = ""

    fetch(`${URL}lookup.php?i=${mealId}`)
    .then(resp => resp.json())
    .then(data => {
        data.meals.map(meal => renderMealDetails(meal))
    })
}

const renderMealDetails = (meal) => {
    mealsDetails.innerHTML = 
    `
    <h3>${meal.strMeal}</h3>
    <p>${meal.strInstructions}</p>
    `
}