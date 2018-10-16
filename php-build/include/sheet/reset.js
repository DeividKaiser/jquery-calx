/**
 * reset the form to  it's original value, and resync the value with the cell registry
 */
sheet.fx.reset = function(){
    //console.log('sheet[#'+this.elementId+'] : resetting form elements');

    var forms;

    if(this.el.prop('tagName').toLowerCase() == 'form'){
        forms = this.el;
    }else{
        forms = this.el.find('form');
    }

    forms.each(function(){
        this.reset();
    });

    for(var a in this.cells){
        this.cells[a].resyncValue();
    }

    this.calculate();
};
