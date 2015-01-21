$(document).ready(function() {
    $grid = $('#grid');

    $("#grid").kendoGrid({
        dataSource: {
            type: "odata",
            serverPaging: true,
            serverSorting: true,
            pageSize: 100,
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            }
        },
        height: 543,
        selectable: true,
        scrollable: {
            virtual: true
        },
        sortable: true,
        columns: [{
            field: "OrderID",
            title: "Order ID",
            width: 110
        }, {
            field: "CustomerID",
            title: "Customer ID",
            width: 130
        }, {
            field: "ShipName",
            title: "Ship Name",
            width: 120
        }, {
            field: "ShipAddress",
            title: "Ship Address"
        }, {
            field: "ShipCity",
            title: "Ship City",
            width: 130
        }, {
            field: "ShipCountry",
            title: "Ship Country",
            width: 130
        }]
    });

    var selectRow = function(e) {
        KendoGridScroll.scrollTo($("#grid"), $("#selectRow").val(), function(grid, row) {
            grid.select(row);
        }, 90);
        // if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
        //     var grid = $("#grid").data("kendoGrid"),
        //         rowIndex = $("#selectRow").val(),
        //         row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(rowIndex);

        //     grid.select(row);
        // }
    };
    $(".selectRow").click(selectRow);
    $("#selectRow").keypress(function(e) {
        if (e.which == 13) {
            selectRow(e);
        }
    });
});