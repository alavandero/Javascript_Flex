document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipeList = document.getElementById('recipeList');
            recipes.forEach((recipe, index) => {
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
                    <button onclick="addToFavorites(${index})">Agregar a Favoritos</button>
                `;
                recipeList.appendChild(recipeDiv);
            });
        })
        .catch(error => {
            const recipeList = document.getElementById('recipeList');
            recipeList.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
        });
});

function addToFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(index)) {
        favorites.push(index);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        Swal.fire({
            icon: 'success',
            title: 'Agregado a Favoritos',
            text: 'La receta ha sido agregada a tus favoritos.',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Ya en Favoritos',
            text: 'La receta ya está en tus favoritos.',
            timer: 2000,
            showConfirmButton: false
        });
    }
}