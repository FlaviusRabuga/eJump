//some global vars to be used in the functions
let dataMatrix = []; //matrix to store the data
let formatData = []; //store the initial "Ax By Cz" data

onload = async () => {
    // fetch the data from page
    let data = await fetch(
        "https://proxy.cors.sh/https://radupintilie.dev.ascensys.ro/code_tests/testData.txt"
    ); //fetch the data from the url
    //workaround for cors

    // format and parse the data
    data = await data.text();
    formatData = data.replace(/[\r]/g, "");
    formatData = formatData.split(/[\n]/g);
    formatData.forEach((row) => {
        let element = row.split(",");
        dataMatrix.push(element);
    });

    //set up initial options arrays
    let a_options = [],
        b_options = [],
        c_options = [];
    for (let i = 0; i < dataMatrix.length; i++) {
        dataMatrix[i].forEach((element) => {
            if (element.includes("A")) {
                if (!a_options.includes(element)) a_options.push(element);
            } else if (element.includes("B")) {
                if (!b_options.includes(element)) b_options.push(element);
            } else if (element.includes("C")) {
                if (!c_options.includes(element)) c_options.push(element);
            }
        });
    }

    addDefaultOption("a_select");
    addDefaultOption("b_select");
    addDefaultOption("c_select");

    updateSelectOptions("a_select", a_options);
    updateSelectOptions("b_select", b_options);
    updateSelectOptions("c_select", c_options);

    updateTable(dataMatrix);
};

//function to update the data matrix based on the selected options
function updateDataMatrix() {
    let a_select = document.getElementById("a_select");
    let b_select = document.getElementById("b_select");
    let c_select = document.getElementById("c_select");

    let a_value = a_select.options[a_select.selectedIndex].value;
    let b_value = b_select.options[b_select.selectedIndex].value;
    let c_value = c_select.options[c_select.selectedIndex].value;

    let updatedMatrix = [];
    formatData.forEach((row) => {
        row = row.split(",");
        if (row.includes(a_value) || a_value === "toate") {
            if (row.includes(b_value) || b_value === "toate") {
                if (row.includes(c_value) || c_value === "toate") {
                    updatedMatrix.push(row);
                }
            }
        }
    });
    updateTable(updatedMatrix);
}

//function to update the table
function updateTable(updatedDataMatrix) {
    let table = document.getElementsByClassName("dataTable");
    table[0].innerHTML = "";
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
    select.innerHTML = "";
    if (options.length > 1) {
        addDefaultOption(selectId);
    }
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }
}

//onchange handler for select a
function a_change() {
    let a_select = document.getElementById("a_select");
    let a_value = a_select.options[a_select.selectedIndex].value;

    a_options = [];
    b_options = [];
    c_options = [];
    dataMatrix.forEach((row) => {
        if (row.includes(a_value) || a_value === "toate") {
            row.forEach((element) => {
                if (element.includes("A")) {
                    if (!a_options.includes(element)) a_options.push(element);
                } else if (element.includes("B")) {
                    if (!b_options.includes(element)) b_options.push(element);
                } else if (element.includes("C")) {
                    if (!c_options.includes(element)) c_options.push(element);
                }
            });
        }
    });
    updateSelectOptions("b_select", b_options);
    updateSelectOptions("c_select", c_options);
    updateDataMatrix();
}

//onchange handler for select b
function b_change() {
    let a_select = document.getElementById("a_select");
    let b_select = document.getElementById("b_select");
    let b_value = b_select.options[b_select.selectedIndex].value;

    a_options = [];
    b_options = [];
    c_options = [];
    dataMatrix.forEach((row) => {
        if (row.includes(b_value) || b_value === "toate") {
            row.forEach((element) => {
                if (element.includes("A")) {
                    if (!a_options.includes(element)) a_options.push(element);
                } else if (element.includes("B")) {
                    if (!b_options.includes(element)) b_options.push(element);
                } else if (element.includes("C")) {
                    if (!c_options.includes(element)) c_options.push(element);
                }
            });
        }
    });
    updateSelectOptions("c_select", c_options);
    a_select.value = a_options[0];
    updateDataMatrix();
}

//onchange handler for select c
function c_change() {
    let a_select = document.getElementById("a_select");
    let b_select = document.getElementById("b_select");
    let c_select = document.getElementById("c_select");
    let c_value = c_select.options[c_select.selectedIndex].value;

    a_options = [];
    b_options = [];
    c_options = [];
    dataMatrix.forEach((row) => {
        if (row.includes(c_value) || c_value === "toate") {
            row.forEach((element) => {
                if (element.includes("A")) {
                    if (!a_options.includes(element)) a_options.push(element);
                } else if (element.includes("B")) {
                    if (!b_options.includes(element)) b_options.push(element);
                } else if (element.includes("C")) {
                    if (!c_options.includes(element)) c_options.push(element);
                }
            });
        }
    });
    a_select.value = a_options[0];
    b_select.value = b_options[0];
    updateDataMatrix();
}
