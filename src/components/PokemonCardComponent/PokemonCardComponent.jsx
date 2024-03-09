import React from 'react'
import Card from '../Card/Card'
import './PokemonCardComponent.css'

const PokemonCardComponent = ({pokemonData}) => {
  return (
    <div className='pokemonCardComponent'>
        {pokemonData.map((pokemon,index) => {
            return <Card key={index} pokemon={pokemon} />
        })}
    </div>
  )
}

export default PokemonCardComponent