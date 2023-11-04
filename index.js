document.addEventListener('DOMContentLoaded',function(e){
    const homepage =document.getElementById('meal');
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
        .then(response => response.json())
        .then(data => {
            if(data.meals){
                const list=data.meals;
                const html =list.map(meal =>{
                    return `
                    <div class = " meal-img">
                    <h2>${meal.strMeal}</h2>    
            <img  src="${meal.strMealThumb}" alt="#"> 
        </div>
        <a href ="#" class=" recipe-button"> Recipe</a>
                    `;
                }).join('');
                homepage.innerHTML = html;
            }
            else{
                homepage.innerHTML = " OOPS!";
            }
            
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
        
})

const searchButton = document.getElementById('search-button');
const mealList = document.getElementById('meal');

searchButton.addEventListener('click', getMealList);

function getMealList(){
    let searchTextArea = document.getElementById('search').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTextArea}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            let html= " " ;
            if (data.meals){
                data.meals.forEach(meal => {
                    html += `
                    <div class = " meal-img">
                    <h2>${meal.strMeal}</h2>    
            <img  src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
        </div>
        <a href ="#" class="recipe-button" data id="${meal.idMeal}"}"> Recipe</a>
                    
                    `  
               
     }
        );
            }
            else{
                html =' oops we do not have that';
            }
            mealList.innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
};
 mealList.addEventListener('click',function (e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-button')){
        const mealId = e.target.getAttribute('data-id');
        getRecipe(mealId);
    }
})
function getRecipe(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals.length > 0) {
                const meal = data.meals[0];
                const recipe = meal.strInstructions;
                displayRecipe(recipe);
            } else {
                console.error("Recipe not available for meal ID:", mealId);
            }
        })
        .catch(error => {
            console.error("Error fetching recipe data:", error);
        });
}

function displayRecipe(recipe) {
    
    alert(recipe);
}