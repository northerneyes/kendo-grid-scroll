$(document).ready(function() {
    $grid = $('#grid');

    var createLocalGrid = function() {
        generatePeople(830, function(data) {
            var initStart;
            var renderStart;

            setTimeout(function() {
                initStart = new Date();

                $("#grid").kendoGrid({
                    dataSource: {
                        data: data,
                        pageSize: 20
                    },
                    height: 543,
                    selectable: true,
                    scrollable: {
                        virtual: true
                    },
                    pageable: {
                        info: true,
                        numeric: false,
                        previousNext: false
                    },
                    columns: [{
                        field: "Id",
                        title: "ID",
                        width: "110px"
                    }, {
                        field: "FirstName",
                        title: "First Name",
                        width: "130px"
                    }, {
                        field: "LastName",
                        title: "Last Name",
                        width: "130px"
                    }, {
                        field: "City",
                        title: "City",
                        width: "130px"
                    }, {
                        field: "Title"
                    }]
                });

                initEnd = new Date();
            });
        });
    };
    createLocalGrid();
    var createRemoteGrid = function() {
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
    };



    var selectRow = function(e) {
        KendoGridScroll.scrollTo($("#grid"), $("#selectRow").val(), function(grid, row) {
            grid.select(row);
        }, 90);
    };

    var changeDataSource = function(e) {

        $('.source').removeClass('k-primary');
        $(this).addClass('k-primary');
        $grid.empty();
        if($(this).attr('id') === "localDataSource"){
            createLocalGrid();
        } else{
            createRemoteGrid();
        }
    };

    $(".selectRow").click(selectRow);
    $("#selectRow").keypress(function(e) {
        if (e.which == 13) {
            selectRow(e);
        }
    });

    $('#localDataSource').click(changeDataSource);
    $('#remoteDataSource').click(changeDataSource);
});