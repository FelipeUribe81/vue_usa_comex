import { backgroundColor, borderColor } from './chartUtilities'

export function doughnut_or_pie_data(chartLabels, charData, charType) {
    return {
        type: charType,
        data: {
            labels: chartLabels,
            datasets: [{
                label: "# of Tomatoes",
                data: charData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }, ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            }
        },
    }
}