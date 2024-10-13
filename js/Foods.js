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
    const items = categories.slice(0, 6);
    items.forEach((category) => {
        const {strCategory, strCategoryThumb, strCategoryDescription} = category;
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
              <a class="font-bold text-primary underline" href="#">View Details</a>
            </div>
        `
        foodContainer.append(foodDiv);
    })
}






foodCategory();
displayFood();