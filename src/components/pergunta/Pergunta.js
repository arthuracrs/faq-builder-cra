import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import parse from 'html-react-parser'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './styles.css'

import { StateContext } from '../../providers/stateGlobal';

export function Pergunta({ state, index, deletePergunta }) {

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, setStateGlobal } = useContext(StateContext)

    const [pergunta, setPergunta] = useState(state)
    const [color, setColor] = useState('white')

    useEffect(() => {
        stateGlobal.colunas[indexColuna].categorias[indexCategoria].perguntas[index] = pergunta
        setStateGlobal(stateGlobal)
    }, [pergunta])

    const handleOnChange = (event) => {

        if (event.target.innerText == '') {
            console.log(event.target.innerText)
            event.target.innerText = 'Vazio'
        } else {
            if (event.target.id == 'texto') {
                pergunta.resposta.texto = event.target.innerText
            } else {
                pergunta.titulo = event.target.innerText
            }

            setPergunta(pergunta)
            setColor('white')
        }
        event.target.blur()
    }

    const debounce = (func, timeout = 700) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChange = debounce((e) => handleOnChange(e));

    return (

        <Draggable draggableId={pergunta.idPergunta} index={index}>
            {(provided) => (
                <div className='pergunta'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='pergunta-box' style={{ backgroundColor: color }}>
                        <button onClick={deletePergunta}> delete </button>
                        <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                            {pergunta.titulo}
                        </h2>

                        <div className='pergunta-resposta' id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                            {(`${ pergunta.resposta.texto}`)}
                        </div>
                    </div>

                </div>
            )}
        </Draggable>

    )
}