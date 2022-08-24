import './styles.css'

import { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";

import { Pergunta } from '../pergunta/Pergunta';
import { StateContext } from '../../providers/stateGlobal';

export function Categoria() {
    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, perguntaFactory, setStateGlobal, newId } = useContext(StateContext)

    const currentCategoria = stateGlobal.colunas[indexColuna].categorias[indexCategoria]
    const [categoria, setCategoria] = useState(currentCategoria)
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        setCategoria(categoria)
        stateGlobal.colunas[indexColuna].categorias[indexCategoria] = categoria
        setStateGlobal(stateGlobal)
    }, [categoria])

    const onDragEnd = result => {

        const reorder = (list, startIndex, endIndex) => {
            const result = list
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        }

        const { source, destination } = result

        const foraDeUmaColuna = !destination
        if (foraDeUmaColuna) return

        const mesmaPosicao = destination.index === source.index
        if (mesmaPosicao) return

        let newCategoria = copyObj(categoria)

        reorder(
            newCategoria.perguntas,
            source.index,
            destination.index
        );

        setCategoria(newCategoria)
    }

    const addPergunta = () => {
        categoria.perguntas.push(perguntaFactory())
        setCategoria(categoria)
        setUpdate(!update)
    }

    const deletePergunta = (index) => {
        categoria.perguntas.splice(index, 1);
        setCategoria(categoria)
        setUpdate(!update)
    }

    return (
        <div className='categoria'>
            <h1>
                {currentCategoria.categoria}
            </h1>
            <button onClick={addPergunta}>Add Pergunta</button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'droppableId'} >
                    {(provided) => (
                        <div className='perguntas'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {categoria.perguntas.map((x, index) => (
                                <Pergunta deletePergunta={deletePergunta} state={x} index={index} key={x.idPergunta} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}