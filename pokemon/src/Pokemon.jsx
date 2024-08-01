import React, {useState, useEffect} from 'react'
import './index.css'
import PokemonCards from './PokemonCards'

function Pokemon() {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    // console.log(search);

    const fetchPokemon = async()=>{
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=102')
            const data = await response.json()
            // console.log(data);

            const detailedPokemonData = data.results.map(async(currentPokemon)=>{
                const response = await fetch(currentPokemon.url)
                const data = await response.json()
                // console.log(data);
                return data
            })
            // console.log(detailedPokemonData);

            const detailedPokemonDataResponses = await Promise.all(detailedPokemonData)
            // console.log(detailedPokemonDataResponses);
            setPokemon(detailedPokemonDataResponses)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    // search functionality
    const searchPokemon = pokemon.filter((searchPok)=>searchPok.name.toLowerCase().includes(search.toLowerCase()))

    if (loading) {
      return (
        <div>
          <h1>Loading....</h1>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h1>{error.message}</h1>
        </div>
      );
    }
    
  return (
    <>
      <section className="container">
        <header>Lets Catch Pokemon</header>
        <div className="pokemon-search">
          <input type="text" placeholder='search pokemon here' value={search} onChange={(event)=>setSearch(event.target.value)} />
        </div>
        <div>
        <ul className="cards">
            {/* {pokemon.map((currentPokemon) => { */}
            {searchPokemon.map((currentPokemon) => {
              return (
                <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
              );
            })}
          </ul>
        </div>
        </section>
    </>
  )
}

export default Pokemon