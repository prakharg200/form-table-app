let data = [];

//connect to mongodb in node.js?

function addData() {
    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    if(!data.find(x => x.name === name && x.contact === contact)){
        data.push({ name: name, contact: contact });
        populateTable();
    }else{
        alert("Duplicate Entry Not Allowed");
    }
}

function populateTable() {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    data.forEach(function(item) {
        let row = tableBody.insertRow();
        let nameCell = row.insertCell(0);
        let contactCell = row.insertCell(1);
        let actionCell = row.insertCell(2);
        nameCell.innerHTML = item.name;
        contactCell.innerHTML = item.contact;
        actionCell.innerHTML = `<button onclick="deleteData(this)">Delete</button>`;
    });
}

function deleteData(element) {
    let index = element.parentElement.parentElement.rowIndex;
    data.splice(index-1,1);
    populateTable();
    alert("Data Deleted");
}

function search() {
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("dataTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sort(column) {
    data.sort((a, b) => (a[column] > b[column]) ? 1 :-1);
    populateTable();
}
