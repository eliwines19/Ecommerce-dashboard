import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const ExportButton = ({ chartInstance, title }) => {

    const { currentColor } = useStateContext();

    const exportChart = () => {
        if (chartInstance.current){
            chartInstance.current.exportModule.export('PNG', title)
        }
    }

    return (
        <button
            onClick={exportChart}
            style={{ backgroundColor: currentColor }}
            className={`text-white text-sm p-2 rounded-lg hover:drop-shadow-xl`}
        >
            Export as PNG
        </button>
    )
}

export default ExportButton