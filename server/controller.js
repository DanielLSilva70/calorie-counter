let totalCalories = 0;
let foodConsumed = [];
let globalId = 1;

const getCalories = (req, res) => {
    res.json({ totalCalories })
}

const getFood = (req, res) => {
    res.json({ food: foodConsumed })
}

const setCalories = (req, res) => {
    const { setCalories } = req.body
    totalCalories = setCalories
    res.json({ totalCalories })
}

const addFood = (req, res) => {
    const { food, calories } = req.body
    let itemToAddToList = {
        id: globalId,
        foodItem: food,
        calories: calories
    }
    foodConsumed.push(itemToAddToList)
    res.json({ food: foodConsumed })
    globalId++
}

const deleteFood = (req, res) => {
    const { id } = req.params
    let index = foodConsumed.findIndex(food => +food.id === +id)
    foodConsumed.splice(index, 1)
    res.json({ foodConsumed })
}

const updatefood = (req, res) => {
    const { id } = req.params
    const { food, calories } = req.body
    let itemToAddToList = {
        id: id,
        foodItem: food,
        calories: calories
    }
    let index = foodConsumed.findIndex(food => +food.id === +id)
    if (index === -1) {
        return res.json({ foodConsumed })
    }
    foodConsumed.splice(index, 1, itemToAddToList)
    res.json({ foodConsumed })
}

module.exports = {
    getCalories,
    getFood,
    setCalories,
    addFood,
    deleteFood,
    updatefood
}
