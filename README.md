kendo-grid-scroll
===============
Program grid scroll with selection for kendo-ui library. Support virtual mode for grid automatically..

## [Demo](http://northerneyes.github.io/kendo-grid-scroll/)
A demo is available on the Github Pages webpage for kendo-grid-scroll [here](http://northerneyes.github.io/kendo-grid-scroll/).

## Basic Usage
```javascript
    // some grid
    $("#grid").kendoGrid({
                    dataSource: {
                        data: data,
                        pageSize: 20
                    },
    ...
    
    //init                           
    var kendoGridScroll = new KendoGridScroll.Model($("#grid"), function(grid, row) {
            grid.select(row); //do whatever you want
        });
    ...
    
    // scroll to required index
     kendoGridScroll.scrollTo(index);
    ...

    // destroy object
    kendoGridScroll.destroy();
```

## License
This code is provided under the MIT license.
