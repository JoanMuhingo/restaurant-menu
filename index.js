document.addEventListener('DOMContentLoaded',function(e){
    const homepage =document.getElementById('meal');
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
        .then(response => response.json())
        .then(data => {
            if(data.meals){
                const list=data.meals;
                const html =list.map(meal =>{
                    return `
                    <div class = " meal-box">
                    <h2>${meal.strMeal}</h2>    
            <img  src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
        </div>
        <a href ="#" class="recipe-button" dataId="${meal.idMeal}"> Recipe</a>
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
        
});

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
                        <div class = " meal-box">
                        <h2>${meal.strMeal}</h2>    
                <img  src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
            </div>
            <a href ="#" class="recipe-button" dataId="${meal.idMeal}"> Recipe</a>
                        
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

    mealList.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('recipe-button')) {
            const mealId = e.target.getAttribute('dataId');
            console.log(mealId);
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];
                        const recipe = meal.strInstructions;
                        alert(`Recipe for ${meal.strMeal}:\n\n${recipe}`);
                    } else {
                        console.log("Meal data not found");
                    }
    
                })
                .catch(error => {
                    console.error("Error fetching recipe data:", error);
                });
        }
       
        
    });
 