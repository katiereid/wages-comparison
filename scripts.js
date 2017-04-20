//GET JSON FROM CITY OF SEATTLE API

var request = new XMLHttpRequest();
request.open("GET", "https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi", false);
request.send();

////check status in console

console.log(request.status);
console.log(request.statusText);

function CreateTableFromJSON() {

  //CREATE A TABLE inspo/source: http://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm

  var table = document.createElement("table");
  var tableInfo = JSON.parse(request.responseText);
  var col = [];

  for (var i = 0; i < tableInfo.data.length; i++) {   //I 50% understand this... confused about var p and indexof
    for (var p in tableInfo.data[i]) {
      if (col.indexOf(p) === -1) {
           col.push(p);
      }
    }
    // col.push(tableInfo.data[i][0]);   <--why doesn't this work? instead of the second for loop with var p :(

  }
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // INSERT NEXT ROW BELOW THE PREVIOUS

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER
      tr.appendChild(th);
  };

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < tableInfo.data.length; i++) {
      tr = table.insertRow(-1);                            //why can't this use the tr declaration from above?
      for (var j = 0; j < col.length; j++) {
          var tableCell = tr.insertCell(-1);
          tableCell.innerHTML = tableInfo.data[i][col[j]];
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


  // ADD TABLE TO A CONTAINER
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

//     console.log(subArray[8]);

// }

//arrays - 8 = job title
      // -9 = female wage
      // -12 =male wage
      // -18 = percentage


