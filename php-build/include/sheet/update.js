/**
 * update cell reference inside the sheet, detect removed and added cells
 */
sheet.fx.update = function(){
    //console.log('sheet[#'+this.elementId+'] : updating cells registry with current state of the element');

    var cells = this.el.find('[data-cell],[data-formula],[data-format]'),
        sheet = this,
        $cell;

    this.totalCell = cells.length;

    /** detect and remove detached cells and its reference */
    for(var a in this.cells){
        if(this.cells[a].el && !$.contains(document, this.cells[a].el[0])){
            delete(this.cells[a]);
        }
    }

    /** add new cell reference */
    cells.each(function(){
        var cellAddr = $(this).attr('data-cell');

        if(cellAddr && typeof(sheet.cells[cellAddr]) == 'undefined'){
            //console.log('new cell found '+cellAddr);
            var cellOptions = $.extend({element: this, address: cellAddr}, defaultCellOptions, sheet.config.data[cellAddr]);

            $cell = new cell(sheet, cellOptions);
            sheet.registerCell($cell);
        }else{
            //console.log('resync cell '+cellAddr);
            sheet.cells[cellAddr].resyncValue();
            sheet.cells[cellAddr].resyncFormula();
        }
    });

    /** rebuild the dependency tree */
    this.buildCellDependency();
};
