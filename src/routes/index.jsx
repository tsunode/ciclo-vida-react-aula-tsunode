import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { PokemonProfile } from '../pages/PokemonProfile'

export const RoutesMain = () => {
    return(
        <Routes>
            <Route path='/pokemon' element={<Home />} >
                <Route path=':name' element={<PokemonProfile />} />
                <Route path='new' element={<h1>New</h1>} />
            </Route>

            <Route path='/pokemon/profile/:name' element={<h2>Teste</h2>} />

            <Route path='/feed' element={<h1>Feed</h1>} />
            <Route path='/messages' element={<h1>Menssagens</h1>} />
            <Route path='/profile' element={<h1>Perfil</h1>} />
        </Routes>
    )
} 