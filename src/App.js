import './styles.css'

import { ListaDeCategorias } from './components/listaDeCategorias/listaDeCategorias';
import { Categoria } from './components/categoria/Categoria';

import { ViewJson } from './components/json/ViewJson'
import { Menu } from './components/menu/Menu'

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { StateProvider } from './providers/stateGlobal'

export function App() {
    return (
        <BrowserRouter>
            <StateProvider>
                <div>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<ListaDeCategorias />} />
                        <Route path="/json" element={<ViewJson />} />
                        <Route path="/coluna/:indexColuna/categoria/:indexCategoria" element={<Categoria />} />
                    </Routes>
                </div>
            </StateProvider>
        </BrowserRouter>
    )
}