document.addEventListener('DOMContentLoaded', () => {
    const pokemonListElement = document.getElementById('pokemonList');
    const pokemonImageElement = document.getElementById('pokemonImage');
    const pokemonNameElement = document.getElementById('pokemonName');
    const pokemonTypesElement = document.getElementById('pokemonTypes');
    const pokemonHeightElement = document.getElementById('pokemonHeight');
    const pokemonWeightElement = document.getElementById('pokemonWeight');
    const pokemonSkillsElement = document.getElementById('pokemonSkills');

    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function fetchPokemonDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pokemonData = await response.json();
            displayPokemonDetails(pokemonData);
        } catch (error) {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
            pokemonNameElement.textContent = 'Error';
            pokemonImageElement.src = '';
            pokemonTypesElement.textContent = '';
            pokemonHeightElement.textContent = '';
            pokemonWeightElement.textContent = '';
            pokemonSkillsElement.textContent = '';
        }
    }

    function displayPokemonDetails(pokemon) {
        pokemonNameElement.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemonImageElement.src = pokemon.sprites.front_default || ''; 
        pokemonImageElement.alt = pokemon.name;
        pokemonTypesElement.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        pokemonHeightElement.textContent = (pokemon.height / 10).toFixed(1); 
        pokemonWeightElement.textContent = (pokemon.weight / 10).toFixed(1); 
        pokemonSkillsElement.textContent = pokemon.abilities.slice(0, 2).map(abilityInfo => abilityInfo.ability.name).join(', ');
    }

    async function fetchInitialPokemonList() {
        try {
            const response = await fetch(`${POKEAPI_BASE_URL}?limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const pokemonList = data.results;

            const ul = document.createElement('ul');
            pokemonList.forEach(pokemon => {
                const li = document.createElement('li');
                const button = document.createElement('button'); 
                button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                button.dataset.url = pokemon.url; 

                button.addEventListener('click', () => {
                    fetchPokemonDetails(button.dataset.url);
                });

                li.appendChild(button);
                ul.appendChild(li);
            });
            pokemonListElement.appendChild(ul);

            if (pokemonList.length > 0) {
                fetchPokemonDetails(pokemonList[0].url);
            }

        } catch (error) {
            console.error('Erro ao buscar lista de Pokémon:', error);
            pokemonListElement.textContent = 'Erro ao carregar a lista.';
        }
    }

    fetchInitialPokemonList();
}); 