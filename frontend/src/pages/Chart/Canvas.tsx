import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

type CanvasPropsType = {
    id: string,
    type?: string,
    title: string,
    label: string,
    labels: string[],
    values: number[],
    legend_position?: string
}

// Компонент канваса
const Canvas = (props: CanvasPropsType) => {
    const { id, type, title, label, labels, values, legend_position } = props 

    const canvasElement = useRef(null)

    useEffect(() => {
        if (canvasElement?.current) new Chart(canvasElement.current, config) // отрисовка графика
    }, [canvasElement])

    // Данные графика
    const data = {
        labels: labels, // наименования областей
        datasets: [
            {
                label: label, // наименование набора данных
                data: values, // отображаемые 
                maxBarThickness: 100
            }
        ]
    };

    // Настройки графика
    const config = {
        type: type || "pie",
        data: data,
        options: {
            indexAxis: 'x',
            responsive: true,

            plugins: {
                legend: {
                    position: legend_position || 'left',
                },
            
                title: {
                    display: true,
                    text: title, // заголовок графика
                }
            }
        }
    } as ChartConfiguration;

    return (
        <canvas 
            id={id} 
            ref={canvasElement}
            className='canvas'
        />
    );
};

export default Canvas;