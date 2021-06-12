"use strict";
var mealsList = document.getElementById('meals-list');
var mealsDetails = document.getElementById('meals-details');
var searchForm = document.getElementById('search-form');
var URL = "https://www.themealdb.com/api/json/v1/1/";
var fetchMeals = function (e) {
    e.preventDefault();
    mealsList.innerHTML = "";
    mealsDetails.innerHTML = "";
    var query = e.target[0].value;
    fetch(URL + "search.php?s=" + query)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
        data.meals.map(function (meal) { return renderMeal(meal); });
    });
};
searchForm.addEventListener('submit', fetchMeals);
var renderMeal = function (meal) {
    mealsList.innerHTML +=
        "\n    <li>" + meal.strMeal + "\n    <button id=\"recipe-details\"value=" + meal.idMeal + ">Details</button>\n    </li>\n    ";
    var recipeDetailsButtons = document.querySelectorAll("#recipe-details");
    recipeDetailsButtons.forEach(function (button) { return button.addEventListener('click', fetchMeal); });
};
var fetchMeal = function (e) {
    e.preventDefault();
    var mealId = e.target.value;
    mealsList.innerHTML = "";
    mealsDetails.innerHTML = "";
    fetch(URL + "lookup.php?i=" + mealId)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
        data.meals.map(function (meal) { return renderMealDetails(meal); });
    });
};
var renderMealDetails = function (meal) {
    mealsDetails.innerHTML =
        "\n    <h3>" + meal.strMeal + "</h3>\n    <p>" + meal.strInstructions + "</p>\n    ";
};
