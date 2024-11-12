document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipeSelect = document.getElementById('recipeSelect');
            recipes.forEach((recipe, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = recipe.name;
                recipeSelect.appendChild(option);
            });

            window.calculateIngredients = function() {
                const recipeIndex = recipeSelect.value;
                const numPeople = document.getElementById('numPeople').value;
                const recipe = recipes[recipeIndex];

                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `<h2>${recipe.name}</h2><ul>`;

                recipe.ingredients.forEach(ingredient => {
                    let adjustedQuantity = (ingredient.quantity / recipe.servings) * numPeople;

                    // Formatear el número correctamente
                    if (Number.isInteger(adjustedQuantity)) {
                        adjustedQuantity = adjustedQuantity.toString();
                    } else {
                        adjustedQuantity = adjustedQuantity.toFixed(1).replace(/\.0$/, '');
                    }

                    resultDiv.innerHTML += `<li>${ingredient.name}: ${adjustedQuantity} ${ingredient.unit}</li>`;
                });

                resultDiv.innerHTML += `</ul>`;
            }
        })
        .catch(error => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>Error al obtener las recetas: ${error.message}</p>`;
        });
});
