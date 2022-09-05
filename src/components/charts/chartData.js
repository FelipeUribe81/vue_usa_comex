import { backgroundColor, borderColor } from './chartUtilities'

export function doughnut_or_pie_data(chartLabels, charData, charType) {
    return {
        type: charType,
        data: {
            labels: chartLabels,
            datasets: [{
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
                    backgroundColor: "#000000",
                    display: false,
                },
            },
        },
    }
}

export function bar_or_line_data(chartLabels, charData, charType, chartLabel) {
    return {
        type: charType,
        data: {
            labels: chartLabels,
            datasets: [{
                label: chartLabel,
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
            },
            scales: {
                x: {
                    ticks: {
                        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                        callback: function(val) {
                            // Hide the label of every 2nd dataset
                            return this.getLabelForValue(val).length > 5 ?
                                String(this.getLabelForValue(val)).substring(0, 10) + "..." :
                                this.getLabelForValue(val);
                        },
                    },
                },
            },
        },
    }
}