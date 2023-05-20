const { event } = require("jquery");

const table = document.querySelector(".table");
//select
let tbody = document.createElement("tbody");
table.appendChild(tbody);
function listItems() {
    baglanti.query("SELECT * FROM urunler", function (err, result) {
        if (err) throw err;

        const queries = document.querySelector("tbody");
        for (let i = 0; i < result.length; i++) {
            let tr = document.createElement("tr");
            tr.className = "border-1 border-bottom border-dark align-middle";
            tbody.appendChild(tr);
            let tdID = document.createElement("td");
            tdID.innerHTML = result[i].id;
            tdID.className = "text-capitalize  text-center text-darker fw-bold align-middle";
            queries.appendChild(tdID)

            let tdName = document.createElement("td");
            tdName.innerHTML = result[i].name;
            tdName.className = "text-capitalize  text-center text-darker fw-bold align-middle";
            queries.appendChild(tdName);

            let tdStock = document.createElement("td");
            tdStock.innerHTML = result[i].stock;
            tdStock.className = "text-capitalize  text-center text-darker fw-bold align-middle";
            queries.appendChild(tdStock)

            let tdPrice = document.createElement("td");
            tdPrice.innerHTML = result[i].price + "  ₺";
            tdPrice.className = "text-capitalize  text-center text-darker fw-bold align-middle";
            queries.appendChild(tdPrice);

            let tdBarcode = document.createElement("td");
            tdBarcode.innerHTML = result[i].barcode;
            tdBarcode.className = "text-capitalize  text-center text-darker fw-bold align-middle";
            queries.appendChild(tdBarcode);

            let tdDeleteButton = document.createElement("td");
            tdDeleteButton.className = "d-flex justify-content-center";
            var transactions =
                `
            <div class="d-grid gap-2 d-md-block">
            <button class="btn bg-danger text-light" part="${result[i].id}" onclick="deleteRow(this)">Delete</button>
            <button class="btn bg-info text-light" part="${result[i].id}" onclick="degerleriGetir(this)">Satırı Getir</button>
            <button class="btn bg-warning text-light" onclick="clearAreas()">inputları Temizle</button>
            <button class="btn bg-secondary text-light" part="${result[i].id}" onclick="updateRow(this)">Edit</button>
            </div>
               `;
            tdDeleteButton.innerHTML = transactions;
            queries.appendChild(tdDeleteButton);
        }
    });
}
listItems();
//insert
document.querySelector(".d-grid button.btn-primary").addEventListener("click", function () {
    var productName = document.getElementById("productName").value.trim();
    var productStock = document.getElementById("productStock").value.trim();
    var productBarcode = document.getElementById("productBarcode").value.trim();
    var productPrice = document.getElementById("productPrice").value.trim();
    var sql = "INSERT INTO `urunler` (`id`, `name`, `stock`, `barcode`, `price`)" +
        `VALUES (NULL, '${productName}', '${productStock}', '${productBarcode}', '${productPrice}')`;
    baglanti.query(sql, function (err) {
        if (err) throw err;
    });
    document.querySelector(".table tbody").innerHTML = "";
    listItems();
    clearAreas();
})
function clearAreas() {
    var inputs = document.querySelectorAll("input");
    var validations = document.querySelectorAll(".validations");
    for (let i = 0; i < inputs.length; i++) { inputs[i].value = ""; validations[i].className = "d-none validations text-danger"; }
}
//delete 
function deleteRow(input) {
    var sql = "DELETE FROM urunler WHERE id=" + `'${input.part[0]}'`;
    baglanti.query(sql, function (err) {
        if (err) throw err;
    });
    document.querySelector(".d-grid button.btn-primary").classList.remove("pe-none");
    document.querySelector(".d-grid button.btn-primary").classList.remove("pe-auto");
    document.querySelector(".table tbody").innerHTML = "";
    listItems();
}
function degerleriGetir(input) {
    baglanti.query("SELECT * FROM urunler WHERE id=" + input.part[0], function (err, result) {
        if (err) throw err;
        else {
            document.getElementById("productName").value = result[0].name;
            document.getElementById("productPrice").value = result[0].price;
            document.getElementById("productStock").value = result[0].stock;
            document.getElementById("productBarcode").value = result[0].barcode;
        }
        document.querySelector(".d-grid button.btn-primary").classList.remove("pe-none");
        document.querySelector(".d-grid button.btn-primary").classList.remove("pe-auto");
    })
}
//update
function updateRow(input) {
    if (document.querySelector("#productName").value != "" && document.querySelector("#productStock").value != "" && document.querySelector("#productPrice").value != "" && document.querySelector("#productBarcode").value != "") {
        var sql = "UPDATE `urunler` SET";
        sql += "`name` = '" + document.getElementById("productName").value + "', `stock` = '" + document.getElementById("productStock").value + "', `barcode` = '" + document.getElementById("productBarcode").value + "', `price` = '" + document.getElementById("productPrice").value + "' WHERE `urunler`.`id` =" + input.part[0];
        baglanti.query(sql, function (err) {
            if (err) throw err;
        });
        document.querySelector(".d-grid button.btn-primary").classList.remove("pe-none");
        document.querySelector(".d-grid button.btn-primary").classList.remove("pe-auto");
        document.querySelector(".table tbody").innerHTML = "";
        listItems();
    }
    else {
        alert("Fields can not be empty.");
    }

}