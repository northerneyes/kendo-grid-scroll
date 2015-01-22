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
	// var $grid;
	// var gridContent;
	// var $wrapper;
	// var callback;

	KendoGridScroll.Model = function($grid, callback) {
		this.grid = $grid.data('kendoGrid') || $grid.data('kendoTreeList');
		if (!this.grid) {
			throw 'KendoGridScroll support only kendoGrid or kendoTreeList';
		}
		this.callback = callback;
		this.gridContent = (this.grid.tbody || this.grid.content);
		this.$wrapper = this.grid.options.scrollable.virtual ?
			this.grid.wrapper.find(".k-scrollbar-vertical") : this.grid.wrapper.find('.k-grid-content');

		var that = this;
		this.grid.bind('dataBound', function(e) {
			$nextRow = findRow(that.grid, that.gridContent, that.index, that.$wrapper);
			if (that.callback) that.callback(that.grid, $nextRow);
		});
	};

	KendoGridScroll.Model.prototype.scrollTo = function(index) {
		this.index = index;
		var $visibleRows = this.gridContent.find(">tr:not(.k-grouping-row)");
		//get first row height
		// var height = $visibleRows.eq(1).height();
		//little hack to calc the average of all visible rows
		var height = 0;
		$visibleRows.map(function(i, item) {
			return $(item).height()
		}).each(function(i, h) {
			height += h
		});

		height = height / $visibleRows.length;

		var firstVisibleIndex = this.grid.dataSource.indexOf(this.grid.dataItem($visibleRows.first()));
		var relativeVisibleIndex = index - firstVisibleIndex;

		var $row = $visibleRows.eq(relativeVisibleIndex);


		var isNotExist = $row.length == 0;
		var isUp = isNotExist ? true : $row.offset().top < this.$wrapper.offset().top;
		var isDown = isNotExist ? true : ($row.offset().top + $row.height()) >
			this.$wrapper.offset().top + this.$wrapper.height();

		var $nextRow = findRow(this.grid, this.gridContent, this.index, this.$wrapper);

		if (isNotExist || isUp || isDown) {
			this.$wrapper.scrollTop((index - 1) * height);
		}

		if ($nextRow.length > 0) {
			this.callback(this.grid, $nextRow);
		}
	};
	
	KendoGridScroll.Model.prototype.destroy = function() {
		this.grid.unbind('dataBound');
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
			var realIndex = range.data.indexOf(item);
			if (realIndex >= 0) {
				return realIndex + range.start;
			}
		}
		return -1;
	}

	return KendoGridScroll;
}));