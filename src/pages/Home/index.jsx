import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../../App.css'
import { api } from '../../services/api'

// eu altero um estado => processo reenderização
// não cria o useState, pega o estado novo
// useEffect é executado se o array dep for o estado alterado.

export const Home = () => {
  const [pokemon, setPokemon] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0
  });
  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const [isDisabledPrevious, setIsDisabledPrevious] = useState(true);


  useEffect(() => {
    api.get('/pokemon', {
      params: {
        limit: 151,
        offset: 151 * +searchParams.get('page')
      }
    }).then((response) => {
      const {next, previous, results} = response.data;

      setIsDisabledNext(!next)
      setIsDisabledPrevious(!previous)
      setPokemon(results);
    })
  }, [searchParams]);

  return (
    <div className="App">
     
      <div className="card">
        {searchParams.get('page')}
        <div>
          <button
            onClick={() => setSearchParams({
                page: +searchParams.get('page') - 1
            })}
            disabled={isDisabledPrevious}
          >
            Previous
          </button>
          <button
            onClick={() => setSearchParams({
                page: +searchParams.get('page') + 1
            })}
            disabled={isDisabledNext}
          >
            Next
          </button>
        </div>
        <ul>
          {
            pokemon.map(item => 
                <li key={item.name}>
                    <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
                </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}
