let caloriesEnteredTotal = 0
let caloriesConsumedTotal = 0

const addbtn = document.getElementById('add')
const foodConsumed = document.getElementById('food');
const caloriesConsumed = document.getElementById('calories');
const enterCalories = document.getElementById('entry');
const foodContainer = document.querySelector('.food-container');
const calorieCount = document.getElementById('calorie-count');
const deletebtn = document.getElementById('delete')
const calorieBtn = document.getElementById('caloriesBtn')

function updatetotalCalories() {
    let updatedCal = Number(caloriesEnteredTotal) - Number(caloriesConsumedTotal)
    console.log(caloriesConsumedTotal, caloriesEnteredTotal)
    calorieCount.innerText = updatedCal

}

function addFood(event) {
    event.preventDefault()

    const requestbody = buildFoodObj(foodConsumed.value, caloriesConsumed.value)

    axios.post('/api/foods', requestbody).then(res => {
        resetList(res.data.food)
    })
}

function deleteFood(id) {

    console.log(id)
    axios.delete(`/api/foods/${id}`).then(res => {
        console.log(res)
        resetList(res.data.foodConsumed)

    })
}

function setCalories(event) {
    event.preventDefault()

    const sendCalories = caloriesObj(enterCalories.value)


    axios.post('/api/calories', sendCalories).then(res => {
        console.log(res)
        caloriesEnteredTotal = Number(res.data.totalCalories)
        updatetotalCalories()

    })
}

function caloriesObj(calories) {
    let newCaloriesObj = {
        setCalories: calories
    }
    return newCaloriesObj
}


function buildFoodObj(food, calories) {
    let newFoodObj = {
        food: food,
        calories: calories
    }
    return newFoodObj
}



function resetList(foodsArr) {
    foodContainer.innerHTML = '';
    let totalCalories = 0;
    foodsArr.forEach((element) => {
        foodContainer.appendChild(buildFoodCard(element.foodItem, element.calories, element.id))
        totalCalories += Number(element.calories)
    })
    caloriesConsumedTotal = totalCalories
    updatetotalCalories()
}




function buildFoodCard(food, calories, id) {

    const foodCard = document.createElement('div')
    foodCard.className = 'food-card'
    const foodH3 = document.createElement('h3')
    foodH3.className = 'food-name'
    const caloriesH4 = document.createElement('h4')
    caloriesH4.className = 'food-name'
    // const pencilIcon = document.createElement('i')
    // pencilIcon.className = 'fa-solid fa-pencil'
    const trashCanIcon = document.createElement('i')
    trashCanIcon.className = 'fa-solid fa-trash-can'

    foodH3.innerText = food
    caloriesH4.innerText = calories

    trashCanIcon.addEventListener('click', (event) => deleteFood(id))
    console.log(food, calories, id)

    console.dir(foodCard)
    foodCard.appendChild(foodH3)
    foodCard.appendChild(caloriesH4)
    // foodCard.appendChild(pencilIcon)
    foodCard.appendChild(trashCanIcon)
    return foodCard
}


axios.get('/api/foods').then(res => {

    resetList(res.data.food)
})

axios.get('/api/calories').then(res => {

    caloriesEnteredTotal = Number(res.data.totalCalories)
    updatetotalCalories()

})



addbtn.addEventListener('click', addFood)
calorieBtn.addEventListener('click', setCalories)

