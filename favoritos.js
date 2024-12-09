document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    fetch('recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const favoritesList = document.getElementById('favoritesList');
            favorites.forEach(index => {
                const recipe = recipes[index];
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
                    <button onclick="removeFromFavorites(${index})">Eliminar de Favoritos</button>
                `;
                favoritesList.appendChild(recipeDiv);
            });
        })
        .catch(error => {
            const favoritesList = document.getElementById('favoritesList');
            favoritesList.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
        });
});

function removeFromFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favIndex => favIndex !== index);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    Swal.fire({
        icon: 'success',
        title: 'Eliminado de Favoritos',
        text: 'La receta ha sido eliminada de tus favoritos.',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        location.reload();
    });
}