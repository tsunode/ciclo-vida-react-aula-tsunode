import { useState, useEffect } from 'react'
import './App.css'
import { api } from './services/api'

// eu altero um estado => processo reenderização
// não cria o useState, pega o estado novo
// useEffect é executado se o array dep for o estado alterado.

function App() {
  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState(7);
  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const [isDisabledPrevious, setIsDisabledPrevious] = useState(true);


  useEffect(() => {
    api.get('/pokemon', {
      params: {
        limit: 151,
        offset: 151 * page
      }
    }).then((response) => {
      const {next, previous, results} = response.data;

      setIsDisabledNext(!next)
      setIsDisabledPrevious(!previous)
      setPokemon(results);
    })
  }, [page]);

  return (
    <div className="App">
     
      <div className="card">
        {page}
        <div>
          <button
            onClick={() => setPage(1)}
            disabled={isDisabledPrevious}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={isDisabledNext}
          >
            Next
          </button>
        </div>
        <ul>
          {
            pokemon.map(item => 
              <li key={item.name}>{item.name}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App
