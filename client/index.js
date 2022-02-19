const addbtn = document.getElementById('add')
const foodConsumed = document.getElementById('food');
const caloriesConsumed = document.getElementById('calories');
const enterCalories = document.getElementById('entry');
const foodContainer = document.querySelector('.food-container');
const calorieCount = document.getElementById('calorie-count');



function addFood (event) {
    event.preventDefault()

const reqestbody = buildFoodObj(foodConsumed.value,caloriesConsumed.value )

axios.post('/api/foods', reqestbody).then(res => {
    resetList(res.data.food)
})
}


function buildFoodObj (food, calories) {
    return {
        food: food,
        calories: calories
    }
}

function resetList (foodsArr) {
    foodContainer.innerHTML = '';
    foodsArr.forEach((element) => {
        foodContainer.appendChild(buildFoodCard(element.foodItem, element.calories, element.id))
    })


}

function buildFoodCard(food, calories, id) {
    const foodCard = document.createElement('div')
    foodCard.className = 'food-card'
    const foodH3 = document.createElement('h3')
    foodH3.className = 'food-name'
    const caloriesH4 = document.createElement('h4')
    caloriesH4.className = 'food-name'
    const pencilIcon = document.createElement('i')
    pencilIcon.className = 'fa-solid fa-pencil'
    const trashCanIcon = document.createElement('i')
    trashCanIcon.className = 'fa-solid fa-trash-can'

    foodH3.innerText = food
    caloriesH4.innerText = calories

console.dir(foodCard)
    foodCard.appendChild(foodH3)
    foodCard.appendChild(caloriesH4)
    foodCard.appendChild(pencilIcon)
    foodCard.appendChild(trashCanIcon)
    return foodCard


}


axios.get('/api/foods').then(res => {

    resetList(res.data.food)
})

axios.get('/api/calories').then(res => {

    calorieCount.innerText = res.data.totalCalories
})


addbtn.addEventListener('click',addFood)