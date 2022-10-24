// const cheerio = require("cheerio");

onload = async () => {
    // fetch the data from page
    let data = await fetch("https://proxy.cors.sh/https://radupintilie.dev.ascensys.ro/code_tests/testData.txt");
    data = await data.text()

    // format and parse the data
    let formatData = data.replace(/[\r]/g,'');
    formatData = formatData.replace(/[\n]/g,',');
    let parsed = formatData.split(",")

    // create table
    let table = document.getElementsByClassName("dataTable");
    let row;
    for(let i = 0; i < parsed.length; i++){
        if(i % 3 == 0){
            row = table[0].insertRow();
        }
        let cell = row.insertCell();
        cell.innerHTML = parsed[i];
    }

}