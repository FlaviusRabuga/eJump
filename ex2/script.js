// const cheerio = require("cheerio");

onload = async () => {
    // fetch the data from page
    let data = await fetch("https://proxy.cors.sh/https://radupintilie.dev.ascensys.ro/code_tests/testData.txt");
    data = await data.text()

    // format and parse the data
    let dataMatrix = [];
    let formatData = data.replace(/[\r]/g, '');
    formatData = formatData.split(/[\n]/g);
    formatData.forEach((row) => {
        let element = row.split(",");
        dataMatrix.push(element);
    });
    console.log(dataMatrix)

    //set up initial options arrays
    let a_options = [], b_options = [], c_options = [];
    for (let i = 0; i < dataMatrix.length; i++) {
        dataMatrix[i].forEach((element) => {
            if (element.includes("A")) {
                if (!a_options.includes(element))
                    a_options.push(element)
            }
            else if (element.includes("B")) {
                if (!b_options.includes(element))
                    b_options.push(element)
            }
            else if (element.includes("C")) {
                if (!c_options.includes(element))
                    c_options.push(element)
            }
        })
    }
    console.log(a_options, b_options, c_options)

    addDefaultOption("a_select");
    addDefaultOption("b_select");
    addDefaultOption("c_select");

    updateSelectOptions("a_select", a_options);
    updateSelectOptions("b_select", b_options);
    updateSelectOptions("c_select", c_options);

    updateTable(dataMatrix);

}

//function to update the table
function updateTable(updatedDataMatrix) {
    let table = document.getElementsByClassName("dataTable");
    let row;
    for (let i = 0; i < updatedDataMatrix.length; i++) {
        row = table[0].insertRow();
        for (let j = 0; j < updatedDataMatrix[i].length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = updatedDataMatrix[i][j];
        }
    }
}

//funcion to add deafult option to select
function addDefaultOption(selectId) {
    let select = document.getElementById(selectId);
    let option = document.createElement("option");
    option.value = "toate";
    option.text = "Toate";
    select.appendChild(option);
}

//function to update select options
function updateSelectOptions(selectId, options) {
    let select = document.getElementById(selectId);
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }
}