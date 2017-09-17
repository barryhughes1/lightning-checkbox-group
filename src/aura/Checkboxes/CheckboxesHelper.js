({
    populateCheckboxOptions : function(component, valuesStr) {
	if (!$A.util.isEmpty(valuesStr)){  
            if((valuesStr.toLowerCase().indexOf("all,") == -1) && 
                (valuesStr.toLowerCase().indexOf(",all") == -1) &&
                (component.get("v.EnableDisableAll") == "yes")) {
                    valuesStr = "All," + valuesStr;
            }
            var list = valuesStr.split(',');
			component.set("v.Checkbox_Labels", list);
            component.set("v.loadCheckboxes", "yes");
        }
    }
})