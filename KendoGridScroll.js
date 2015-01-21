//	KendoGridScroll.js 0.0.1

//	(c) 2014 George Bukhanov
//	KendoGridScroll may be freely distributed under the MIT license. 
//	For all details and documentation:
//	https://github.com/northerneyes/kendo-grid-scroll

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['kendo', 'jquery', 'exports'], function(kendo, $, exports) {
			// Export global even in AMD case in case this script is loaded with
			// others that may still expect a global Backbone.
			root.KendoGridScroll = factory(root, exports, kendo, $);
		});

		// Next for Node.js or CommonJS. 
	} else if (typeof exports !== 'undefined') {
		var kendo = require('kendo');
		var $ = require('jquery');
		factory(root, exports, kendo, $);

		// Finally, as a browser global.
	} else {
		root.KendoGridScroll = factory(root, {}, root.kendo, root.$);
	}
}(this, function(root, KendoGridScroll, kendo, $) {

	KendoGridScroll.version = '0.0.1';

	KendoGridScroll.scrollTo = function($grid, index, callback, timeout) {
		var grid = $grid.data('kendoGrid') || $grid.data('kendoTreeList');
		if (!grid) {
			throw 'KendoGridScroll support only kendoGrid or kendoTreeList';
		}

		var gridContent = (grid.tbody || grid.content);
		//find visible roes
		var $visibleRows = gridContent.find(">tr:not(.k-grouping-row)");
		//get first row height
		// var height = $visibleRows.eq(1).height();
		//little hack to calc the average of all visible rows
		var height = 0; $visibleRows.map(function(index, item){return $(item).height()}).each(function(index, h){height += h}); height = height/$visibleRows.length;

		var firstVisibleIndex = grid.dataSource.indexOf(grid.dataItem($visibleRows.first()));
		var relativeVisibleIndex = index - firstVisibleIndex;

		var $row = $visibleRows.eq(relativeVisibleIndex);
		var $wrapper = grid.options.scrollable.virtual ?
			grid.wrapper.find(".k-scrollbar-vertical") : grid.wrapper.find('.k-grid-content');

		var isNotExist = $row.length == 0;
		var isUp = isNotExist ? true : $row.offset().top < $wrapper.offset().top;
		var isDown = isNotExist ? true : ($row.offset().top + $row.height()) > $wrapper.offset().top + $wrapper.height();

		var $nextRow = findRow(grid, gridContent, index, $wrapper);

		if (isNotExist || isUp || isDown) {
			$wrapper.scrollTop((index - 1) * height);
		}

		if ($nextRow.length > 0) {
			callback(grid, $nextRow);
		} else {
			grid.one('dataBound', function(e) {
				$nextRow = findRow(grid, gridContent, index, $wrapper);
				if (callback) callback(grid, $nextRow);
			});
		}


	};

	function findRow(grid, gridContent, index, $wrapper) {
		var $newVisibleRows = gridContent.find(">tr:not(.k-grouping-row)");
		var item = grid.dataItem($newVisibleRows.first());
		var realIndex = findRealIndex(grid, item);
		$row = gridContent.find(">tr:not(.k-grouping-row)").eq(index - realIndex);
		return $row;
	}

	function findRealIndex(grid, item) {
		for (var i = 0; i < grid.dataSource._ranges.length; i++) {
			var range = grid.dataSource._ranges[i];
			var realIndex =range.data.indexOf(item);
			if (realIndex >= 0) {
				return realIndex + range.start;
			}
		}
		return -1;
	}

	return KendoGridScroll;
}));