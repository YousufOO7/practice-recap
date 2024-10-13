const foodCategory = async () => {
    try{
        const res = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const data = await res.json();
        displayFood(data.categories);
    }
    catch(err){
        console.error(err);
    }
} 


// {
//     "idCategory": "1",
//     "strCategory": "Beef",
//     "strCategoryThumb": "https://www.themealdb.com/images/category/beef.png",
//     "strCategoryDescription": "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
// }

// display all categories
const displayFood = (categories) => {
    categories.map((food) => {
        const {strCategory, strCategoryThumb, strCategoryDescription, idCategory} = food;
        const foodContainer = document.getElementById('food-container');
        const foodDiv = document.createElement('div');
        foodDiv.classList = "border-gray-300 border rounded-lg lg:flex gap-5";
        foodDiv.innerHTML = `
            <div class"lg:w-2/4">
              <img class="h-[250px] w-full lg:w-[200px] mr-3 object-cover rounded-lg" src="${strCategoryThumb}" alt="">
            </div>
            <div class="mr-3 lg:w-2/4 lg:mt-7">
              <h3 class="font-bold text-xl py-2">${strCategory}</h3>
              <p class="text-sm text-gray-500 py-2 h-[100px] overflow-scroll">${strCategoryDescription}</p>
              <button onclick="foodIdCategory('${strCategory}')" class="font-bold text-primary underline" href="#">View Details</button>
            </div>
        `
        foodContainer.append(foodDiv);
    })
}

// {
//     "idMeal": "52771",  
// }


// details Category
const foodIdCategory = async (id) => {
    try{
        const res = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
        const data = await res.json();
        modalDetails(data.meals[0].idMeal);
    }
    catch(err){
        console.error(err);
    }
}



// {
//     "idMeal": "52885",
//     "strMeal": " Bubble & Squeak",
//     "strDrinkAlternate": null,
//     "strCategory": "Pork",
//     "strArea": "British",
//     "strInstructions": "Melt the fat in a non-stick pan, allow it to get nice and hot, then add the bacon. As it begins to brown, add the onion and garlic. Next, add the sliced sprouts or cabbage and let it colour slightly. All this will take 5-6 mins.\r\nNext, add the potato. Work everything together in the pan and push it down so that the mixture covers the base of the pan – allow the mixture to catch slightly on the base of the pan before turning it over and doing the same again. It’s the bits of potato that catch in the pan that define the term ‘bubble and squeak’, so be brave and let the mixture colour. Cut into wedges and serve.",
//     "strMealThumb": "https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg",
//     "strTags": "SideDish,Speciality",
//     "strYoutube": "https://www.youtube.com/watch?v=etbJ9ssgsWY",
// }

const modalDetails = async (details) => {
    try{
        const res = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`);
        const data = await res.json();
        console.log(data.meals[0]);
        const {strMealThumb, strCategory, strArea, strYoutube, strInstructions} = data.meals[0];
        const modelContainer = document.getElementById('modal-container');
        modelContainer.innerHTML='';
        const modelDiv = document.createElement('div');
        modelDiv.innerHTML = `
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <img class="w-full" src="${strMealThumb}"/>
                    <h3><span class="font-bold">Category:</span> ${strCategory}</h3>
                    <p><span class="font-bold py-2">Area:</span> ${strArea}</p>
                    <p><span class="font-bold py-2">Instruction:</span> ${strInstructions}</p>
                    <p><span class="font-bold mt-2">YouTube:</span> ${strYoutube}</p>    
                    <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn bg-error text-white">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        `;
        
        modelContainer.appendChild(modelDiv);
        my_modal_1.showModal();
    }
    catch(err){
        console.error(err);
    }
}





foodCategory();
displayFood();