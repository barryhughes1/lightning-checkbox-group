({
    onCheck: function(component) {
    	// will fill this in at Step 28
        var compEvent = component.getEvent("Checkbox_Element_Change");
        compEvent.setParams(
            {
                "fieldChanged" : component.get("v.fieldParentFieldSet"),
                "fieldValue" : component.get("v.fieldValue"),
                "fieldLabel" : component.get("v.fieldLabel")
            }
        );
        compEvent.fire();    	
    }
})