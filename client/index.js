function addFood (event) {
    event.preventDefault()

    let inputField = document.querySelector('input')

    foodEntry.textContent = inputField.value;
    foodEntry.addEventlistner('click', addFood)

    food.appendChild(foodEntry)

    foodEntry.textContent = inputField.value;
    food.appendChild(foodEntry)
    let list = document.createElement('ul')
    list.appendChild(food)
    inputField = "";
}
