import html2canvas from "html2canvas";

export function generateLegend(myChart) {
    //get the selected location
    const chartBox = document.querySelector(".chartBox");

    //Create div
    const div = document.createElement("DIV");
    div.setAttribute("id", "customLegend");

    // Create UL
    const ul = document.createElement("UL");

    myChart.data.labels.forEach((data, index) => {
        // Create list item in forEach loop
        const li = document.createElement("LI");

        // span colorBox
        const spanBox = document.createElement("SPAN");
        spanBox.style.borderColor = backgroundColor[index];
        spanBox.style.backgroundColor = borderColor[index];

        // p + text
        const a = document.createElement("A");
        const textNode = document.createTextNode(data);

        li.onclick = () => {
            myChart.toggleDataVisibility(index);
            updateLegend(li, myChart);
        };

        ul.appendChild(li);
        li.appendChild(spanBox);
        a.appendChild(textNode);
        li.appendChild(a);

        // Insert div into chart box
        chartBox.appendChild(div);
        div.appendChild(ul);
    });
}

function updateLegend(element, myChart) {
    element.classList.toggle("fade");
    myChart.update();
}

export function clearLegend() {
    const customLegend = document.getElementById('customLegend');
    customLegend.remove();
}

export const backgroundColor = [
    "#EE343060",
    "#893E9460",
    "#419BD560",
    "#00457C60",
    "#7DC46460",
    "#00B05060",
    "#FEDE4B60",
    "#FBAC3E60",
    "#EE467760",
    "#66777360",
];

export const borderColor = [
    "#EE343080",
    "#893E9480",
    "#419BD580",
    "#00457C80",
    "#7DC46480",
    "#00B05080",
    "#FEDE4B80",
    "#FBAC3E80",
    "#EE467780",
    "#66777380",
];

export function createChartImage() {
    var element = document.getElementById("vue-chart-container");
    html2canvas(element).then(function(canvas) {
        var url_base64 = canvas.toDataURL("image/jpeg");
        var button = document.getElementById("download-chart");
        button.href = url_base64;
    });
}