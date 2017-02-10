({
    enableDisableCheckboxesFromAll : function(component, fldName) {
        var fld = component.get("v."+fldName);
        var disableAll = false;
        for(var i=0; i<fld.length; i=i+1) {
            if(disableAll) {
                fld[i].value=false; fld[i].disabled=true;
            } else {
                fld[i].disabled=false;
            }
            if(fld[i].label === "All") {
               	if(fld[i].value) {
                    disableAll = true;
                } else {
                    disableAll = false;
                }
            }
        }
        component.set("v."+fldName, fld);
	}
})