
const searchButton = document.getElementById('search-button');
const mealList = document.getElementById('meal');

searchButton.addEventListener('click', getMealList);

function getMealList(){
    let searchTextArea = document.getElementById('search').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTextArea}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html= "" ;
            if (data.meals){
                data.meals.forEach(meal => {
                    html =+ `
                    <div class = " ${meal.strMealThumb}">
        <div class ="">
            <h3> ${meal.strMeal}</h3>
        <a href ="#" class=" recipe-button"> Recipe</a>
                    
                    `
                    
                });
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
        getrecipe(mealId);
    }
})
function getRecipe(){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}` )
    .then(response => response.json())
    .then(data=> {
        const meal = data.meals[0];
        const recipe =meal.strInstructions;
        alert(recipe); 
 })
 .catch(error => {
    console.error("Error fetching recipe data:", error);
});
}
