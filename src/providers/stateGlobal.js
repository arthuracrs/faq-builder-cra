import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import faqjson from './faq.json'

const newId = () => uuidv4()

const categoriaFactory = () => ({
    idCategoria: newId(),
    categoria: 'Nova Categoria',
    perguntas: []
})

const perguntaFactory = () => ({
    idPergunta: newId(),
    titulo: 'Nova Pergunta',
    resposta: {
        idResposta: newId(),
        texto: "Nova Resposta"
    }
})


const respostaFactory = (texto) => {
    return {
        idResposta: newId(),
        texto: texto
    }
}

const faqParse = (json) => {
    const replacer = (key, value) => {
        if (value && value.constructor === Number)
            return value.toString()
        return value
    }

    const copyJson = (obj) => (JSON.parse(JSON.stringify(obj, replacer, 2)))
    let data = copyJson(json)

    for (const categoria of data) {
        for (const key in categoria) {
            if (key === 'titulo') {
                categoria['categoria'] = copyJson(categoria[key])
                delete categoria[key]
            }
        }
    }

    return data
}

export const StateContext = createContext({})

const loadNewJson = (json) => {

}

export const StateProvider = (props) => {

    const data = faqParse(faqjson)
    const col1 = []
    const col2 = []

    for (let i = 0; i < data.length; i++) {
        if (i % 2 == 0) {
            col1.push(data[i])
        } else {
            col2.push(data[i])
        }
    }

    const [stateGlobal, setStateGlobal] = useState({
        colunas: [
            {
                idColuna: newId(),
                categorias: col1
            },
            {
                idColuna: newId(),
                categorias: col2
            }
        ]
    })

    const getColunaIndex = (idColuna) => {
        const colunas = stateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                return i

        return null
    }

    const getCategoriaIndex = (idColuna, idCategoria) => {
        const colunas = stateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                for (let j = 0; j < colunas[i].categorias.length; j++)
                    if (colunas[i].categorias[j].idCategoria == idCategoria)
                        return j
        console.log('categoria ' + idCategoria + ' n existe na coluna: ' + idColuna)

        return null
    }

    return (
        <StateContext.Provider value={{ categoriaFactory, perguntaFactory, newId, stateGlobal, getColunaIndex, getCategoriaIndex, setStateGlobal }}>
            {props.children}
        </StateContext.Provider>
    )
}