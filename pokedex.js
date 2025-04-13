document.addEventListener('DOMContentLoaded', () => {    // -> Esse evento espera que todo o HTML seja carregado antes de executar o script. 
    // Seleciona os elementos do DOM que serão utilizados
    const pokemonListElement = document.getElementById('pokemonList');
    const pokemonImageElement = document.getElementById('pokemonImage');
    const pokemonNameElement = document.getElementById('pokemonName');
    const pokemonTypesElement = document.getElementById('pokemonTypes');
    const pokemonHeightElement = document.getElementById('pokemonHeight');
    const pokemonWeightElement = document.getElementById('pokemonWeight');
    const pokemonSkillsElement = document.getElementById('pokemonSkills');

    // URL base da API de Pokémons
    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

    // Função para carregar a lista inicial de Pokémons
    async function fetchInitialPokemonList() {
        try {
            const response = await fetch(`${POKEAPI_BASE_URL}?limit=10`);
            // Essa linha está dentro da função fetchInitialPokemonList().

            // Ela busca os 10 primeiros Pokémons da PokéAPI.

            // Em seguida, para cada Pokémon retornado, é feita uma nova chamada para obter os detalhes individuais, como imagem:



            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            const pokemonList = data.results;

            const ul = document.createElement('ul');
            for (const pokemon of pokemonList) {
                const li = document.createElement('li');
                const button = document.createElement('button');
                
                // Busca os dados individuais do Pokémon para obter sua imagem
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                
                const img = document.createElement('img');
                img.src = pokemonData.sprites.front_default;
                img.alt = pokemon.name;
                img.title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                
                button.appendChild(img);
                button.dataset.url = pokemon.url;

                // Adiciona o evento de clique para exibir os detalhes do Pokémon
                button.addEventListener('click', () => {
                    fetchPokemonDetails(button.dataset.url);
                });

                li.appendChild(button);
                ul.appendChild(li);
            }
            pokemonListElement.appendChild(ul);

            // Carrega os detalhes do primeiro Pokémon da lista
            if (pokemonList.length > 0) {
                fetchPokemonDetails(pokemonList[0].url);
            }

        } catch (error) {
            console.error('Erro ao buscar lista de Pokémon:', error);
            pokemonListElement.textContent = 'Erro ao carregar a lista.';
        }
    }


        // Função para buscar os detalhes de um Pokémon específico
        async function fetchPokemonDetails(url) {
            try {
    
                // 2. Carregamento dos detalhes de um Pokémon específico
                const response = await fetch(url);
    
                // Essa linha está na função fetchPokemonDetails(url).
    
                // Ela é chamada quando clicamos no botão de um Pokémon na lista.
    
                // Essa função pega os dados detalhados (nome, tipo, altura, peso, habilidades, imagem etc.) e exibe na tela.
    
                if (!response.ok) {
                    throw new Error(`Erro HTTP! status: ${response.status}`);
                }
                const pokemonData = await response.json();
                displayPokemonDetails(pokemonData); // se tudo der certo 
            } catch (error) {
                console.error('Erro ao buscar detalhes do Pokémon:', error);
                pokemonNameElement.textContent = 'Erro';
                pokemonImageElement.src = '';
                pokemonTypesElement.textContent = ''; 
                pokemonHeightElement.textContent = '';
                pokemonWeightElement.textContent = '';
                pokemonSkillsElement.textContent = '';
            }
        }
    
        // Função para exibir os detalhes do Pokémon na tela
        function displayPokemonDetails(pokemon) {
            pokemonNameElement.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemonImageElement.src = pokemon.sprites.front_default || ''; 
            pokemonImageElement.alt = pokemon.name;
            pokemonTypesElement.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
            pokemonHeightElement.textContent = (pokemon.height / 10).toFixed(1); 
            pokemonWeightElement.textContent = (pokemon.weight / 10).toFixed(1); 
            pokemonSkillsElement.textContent = pokemon.abilities.slice(0, 2).map(abilityInfo => abilityInfo.ability.name).join(', ');
        }

    // Carrega a lista de Pokémons
    fetchInitialPokemonList();
}); 



//Dentro do arquivo pokedex.js, as chamadas para a API são feitas com a função fetch(), que é usada para buscar dados da PokéAPI (https://pokeapi.co/api/v2/pokemon).

// Essas chamadas estão localizadas principalmente em duas partes do código:


// “A chamada à API é feita no arquivo pokedex.js, nas funções fetchInitialPokemonList() e fetchPokemonDetails(url). Elas usam fetch() para buscar dados da PokéAPI. A primeira busca a lista de Pokémons e a segunda busca os detalhes de cada Pokémon ao clicar.”

// Se ele quiser saber "quem inicia tudo isso", aí você complementa:

// “Essas funções são chamadas dentro do evento DOMContentLoaded, que garante que o HTML esteja todo carregado antes de executar o script.”


// Boa! Se seu professor perguntar "qual parte do código é responsável pela aparência/estilização (CSS) da sua Pokédex?", você pode responder algo assim:

// 📌 Resposta explicando o CSS:
// “A estilização da Pokédex é feita por três partes principais no HTML:”

// Dois arquivos CSS externos:

// html
// Copiar
// Editar
// <link rel="stylesheet" href="pokedex.css" />
// <link rel="stylesheet" href="style.css">
// O pokedex.css provavelmente cuida do estilo visual da estrutura principal da Pokédex, simulando o visual do dispositivo original.

// O style.css pode conter estilos adicionais ou ajustes gerais, como fontes, espaçamentos, posicionamentos, etc.

// Um estilo interno (no próprio HTML):

// html
// Copiar
// Editar
// <style>
//   body {
//     background-color: red;
//   }
// </style>
// Esse estilo interno define o fundo da página como vermelho.

// IDs e classes no HTML:

// O HTML tem várias divs com id e class (ex: #screen, #buttonGlass, .sp, etc).

// Esses seletores são utilizados nos arquivos CSS para aplicar os estilos corretos em cada parte da Pokédex.

// 📦 Resumo direto:
// "A aparência da Pokédex é controlada pelos arquivos pokedex.css e style.css, que são importados no <head>. Também há um estilo interno que muda a cor de fundo do site. As divs com id e class no HTML servem como alvos para aplicar esses estilos."

