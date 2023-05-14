import React from 'react'
import { FoldingCube } from 'better-react-spinkit'
import * as C from './styles'

const Loading = () => {
    return(
        <C.Container>
            <FoldingCube color="green" size={100} />
        </C.Container>
    )
}

export default Loading;