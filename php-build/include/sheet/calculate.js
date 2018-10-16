/**
 * calculate all the sheet!
 */
sheet.fx.calculate = function(){
    //console.log('sheet[#'+this.elementId+'] : calculating the sheet');

    this.clearAffectedCell();

    if(typeof(this.config.onBeforeCalculate) == 'function'){
        this.config.onBeforeCalculate.call(this);
    }

    var a;

    this.calculateDependency(this.identifier);
    /** set all cell with formula as affected */
    this.clearProcessedFlag();

    for(a in this.cells){
        this.cells[a].processDependency();
    }

    this.setCalculated();
    //console.log(this.isCalculated());

    /*
    for(a in this.dependant){
        if(!this.dependant[a].isCalculated()){
            this.dependant[a].calculate();
        }
    }
    */

    for(a in this.cells){
        //console.log('recalculating cell');
        if(this.cells[a].hasRemoteDependency()){
            this.cells[a].evaluateFormula();
            //console.log('recalculating cell #'+this.el.attr('id')+'!'+a+'='+this.cells[a].getValue());
        }
    }

    this.calculateDependant(this.identifier);


    if(typeof(this.config.onAfterCalculate) == 'function'){
        this.config.onAfterCalculate.call(this);
    }

    if(typeof(this.config.onBeforeRender) == 'function'){
        this.config.onBeforeRender.call(this);
    }

    this.renderComputedValue();

    if(typeof(this.config.onAfterRender) == 'function'){
        this.config.onAfterRender.call(this);
    }

    return this;
};
