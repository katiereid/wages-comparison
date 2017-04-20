// GET /resource/3k2p-39jp.json HTTP/1.1
// Host: data.seattle.gov
// Accept: application/json
// X-App-Token: SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi

//GET JSON FROM SEATTLE API

var request = new XMLHttpRequest();
request.open("GET", "https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi", false);
request.send();

////CHECK STATUS IN CONSOLE

console.log(request.status);
console.log(request.statusText);

// var json= request.responseText;
// var myArr = JSON.parse(json);

function CreateTableFromJSON() {

  //CREATE A TABLE

  var tableInfo = JSON.parse(request.responseText);

  var col = [];

  for (var i = 0; i < tableInfo.data.length; i++) {
      for (var key in tableInfo.data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
  };

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < tableInfo.data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = tableInfo.data[i][col[j]];
      };
  };

  //HIDE EXTRA COLUMNS and REPLACE HEADER TEXT todo: make this more efficient!

  function HideColumns() {
      // var hiddenCol = [2,3,4,5,6,7,8,11,12,14,15,16,17,18,20];
      // var hiddenColLength = hiddenCol.length;
    $('th:nth-child(1)').html("#");
    $('td:nth-child(2),th:nth-child(2)').hide();
    $('td:nth-child(3),th:nth-child(3)').hide();
    $('td:nth-child(4),th:nth-child(4)').hide();
    $('td:nth-child(5),th:nth-child(5)').hide();
    $('td:nth-child(6),th:nth-child(6)').hide();
    $('td:nth-child(7),th:nth-child(7)').hide();
    $('td:nth-child(8),th:nth-child(8)').hide();
    $('th:nth-child(9)').html("Job Title");
    $('th:nth-child(10)').html("Women's Avg. Wage");
    $('td:nth-child(11),th:nth-child(11)').hide();
    $('td:nth-child(12),th:nth-child(12)').hide();
    $('th:nth-child(13)').html("Men's Avg. Wage");
    $('td:nth-child(14),th:nth-child(14)').hide();
    $('td:nth-child(15),th:nth-child(15)').hide();
    $('td:nth-child(16),th:nth-child(16)').hide();
    $('td:nth-child(17),th:nth-child(17)').hide();
    $('td:nth-child(18),th:nth-child(18)').hide();
    $('th:nth-child(19)').html("W/M Ratio");
    $('td:nth-child(20),th:nth-child(20)').hide();

    return;
  };


  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showTable");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
  HideColumns();
};

$(document).ready(function(){
 CreateTableFromJSON();
});






// for (var i=0; i < tableInfo.data.length; i++) {
//   var subArray = tableInfo.data[i];
//   // for (var j=0; j< tableInfo.data[i].length; j++) {
//     console.log(subArray[8]);
//   // }
// }

//arrays - 8 = job title
      // -9 = female wage
      // -12 =male wage
      // -18 = percentage


