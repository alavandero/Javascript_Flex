document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipeList = document.getElementById('recipeList');
            recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <h2>${recipe.name}</h2>
                    <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
                    </ul>
                    <h3>Pasos</h3>
                    <ol>
                        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                `;
                recipeList.appendChild(recipeDiv);
            });
        })
        .catch(error => {
            const recipeList = document.getElementById('recipeList');
            recipeList.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
        });
});
