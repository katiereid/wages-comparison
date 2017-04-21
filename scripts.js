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
    var col = (tableInfo.data[0].length).toString(); //assume the first array has the same # of indeces has the other arrays

    table.setAttribute("id", "myTable");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // INSERT NEXT ROW BELOW THE PREVIOUS
    // var thead = document.createElement("thead");

    for (var i = 0; i < col; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        tr.appendChild(th);
    }

    // for (var i = 0; i < col; i++) {
    //     var th = document.createElement("th");      // TABLE HEADER
    //     tr.appendChild(th);
    // }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < tableInfo.data.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col; j++) {
            var tableCell = tr.insertCell(-1);
            tableCell.innerHTML = (tableInfo.data[i][[j]]);
        }
    }


    //HIDE EXTRA COLUMNS and REPLACE HEADER TEXT todo: make this more efficient!

    function HideColumns() {
        // var hiddenCol = [2,3,4,5,6,7,8,11,12,14,15,16,17,18,20];  //todo: I'd like to loop through the array and hide columns this way
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
    }

    // ADD TABLE TO A CONTAINER
    var divContainer = document.getElementById("tableDiv");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    HideColumns();
    PaginateTable();

}

//PAGINATION
//source/inspo: https://codepen.io/bastony/post/tablesortingtutorial-js  & http://stackoverflow.com/questions/19605078/how-to-use-pagination-on-html-tables

function PaginateTable() {
    var rowsShown = 25;
    var table = document.getElementById('myTable');  // get the table element
    var rowsTotal = table.rows.length;
    var numPages = Math.ceil(rowsTotal / rowsShown);
    var firstRow = table.rows[0];
    var tableRows = $('tr');

    $('#nav').remove(); //remove the existing nav

    //make the pagination nav
    $('#myTable').after('<div id="nav"></div>');
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
    }

    $(tableRows).hide();                         //hide all the rows
    $(tableRows).slice(0, rowsShown).show();     // but show the first 25

    $('#nav a:first').addClass('active');           //make the first page btn active

    $('#nav a').bind('click', function () {          //bind click event to nav btn to do:
        $('#nav a').removeClass('active');             //remove active class from btn
        $(this).addClass('active');                    //add the active class to the btn that was click
        var currPage = $(this).attr('rel');            //set current page to rel value from clicked a tag
        var startItem = currPage * rowsShown;          //set start item to be (the current page x # of items per page) to get the correct items to show
        var endItem = startItem + rowsShown;           //set the end item to be 25 rows past the start item

        // hide all rows except the 25 that go with that page
        $(tableRows).css('opacity', '0.0').hide().slice(startItem, endItem).css('display', 'table-row').animate({opacity: 1}, 300);
        $(firstRow).css({'display': 'table-row', 'opacity': '1'});  //show the header always
    });
}

//SORTING   //todo: not sorting by # correctly

function SortTable(table, col, reverse) { //the actual sorting function
    var tb = table,
        tr = Array.prototype.slice.call(tb.rows, 1), // put rows into array except header
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) {        // sort rows
        return reverse               //  opposite order
            * (a.cells[col].textContent.trim() // gets the content of the cells w/o whitespace
                    .localeCompare(b.cells[col].textContent.trim())  //compares to the other cell for sorting
            );
    });

    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    PaginateTable();                //run this again so that all pages are included in the sort todo: this works but if you try to sort again on a page > 1 it clears the table
}

function MakeSortable(table) {  //make the th's sortable on click
    var th = table.rows[0], i;
    th && (th = th.cells);
    if (th) i = th.length;
    else return;
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () {SortTable(table, i, (dir = 1 - dir))});
    }(i));
}

function MakeAllSortable() {
    var t = $('#myTable'), i = t.length;  //length of table
    while (--i >= 0) MakeSortable(t[i]);
}

//INCOMPLETE ROWS

function RemoveEmpties() {                                                      //currently working on this!
    // var table = document.getElementById('myTable');  // get the table element
    // var rowsTotal = table.rows.length;
    // // var tableRows = table.rows;
    //
    // for (var i = 0; i < rowsTotal; i++) {
    //     var currentRow = table.rows[i];
    //     var emptyCells = currentRow.find("td.def:empty)");
    //
    //     console.log(emptyCells);
    // }

    $("table tr").each(function() {
        var cell = $.trim($(this).find('td').text());
        if (cell.length == 0){
            console.log('empty');
            $(this).css('display : none');
        }
    });
}


$(document).ready(function(){
    CreateTableFromJSON();
    MakeAllSortable();
    // $('#removeEmpties').click(function() {          not yet functional
    //     RemoveEmpties();
    //     }
    // );
});




