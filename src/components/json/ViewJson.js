import { useContext } from 'react'
import parse from 'html-react-parser'

import './styles.css'

import { StateContext } from '../../providers/stateGlobal';

export function ViewJson(params) {
    const { stateGlobal } = useContext(StateContext)

    const copyobj = obj => JSON.parse(JSON.stringify(obj))

    const col1 = copyobj(stateGlobal.colunas[0].categorias)
    const col2 = copyobj(stateGlobal.colunas[1].categorias)

    const size = col1.length + col2.length

    let final = []

    for (let i = 0; i < size; i++) {
        if (col1[i])
            final.push(col1[i])
        if (col2[i])
            final.push(col2[i])
    }

    final = JSON.stringify(final, undefined, 4)

    const copyToClipboard = () => {
        navigator?.clipboard?.writeText(final).then(() => {
            // alert("successfully copied");
          })
          .catch(() => {
            alert("something went wrong");
          });
    }

    return (
        <div className='viewJson'>
            <button onClick={copyToClipboard}>Copiar</button>
            <div className='json-box'>
                {parse(`<pre>${final}</pre> `)}
            </div>
        </div>
    )
}