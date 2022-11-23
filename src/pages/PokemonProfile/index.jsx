import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { api } from '../../services/api';

export const PokemonProfile = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/pokemon/${name}`)
            .then((response) => {
                setPokemon(response.data)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, [name])

    if(loading) {
        return <div>Carregando</div>
    }

    if(!pokemon) {
       return <div>Pokemon não encontrado</div>
    }

    return(
        <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </>
    )
}