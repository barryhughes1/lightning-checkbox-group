({
    onCheck: function(component) {
        var compEvent = component.getEvent("Checkbox_Element_Change");
        compEvent.setParams(
            {
                "fieldChanged" : component.get("v.fieldParentFieldSet"),
                "fieldValue" : component.get("v.fieldValue"),
                "fieldLabel" : component.get("v.fieldLabel")
            }
        );
        compEvent.fire();
    },
    resetFieldValues: function(component) {
     	component.set("v.fieldValue", "false");
    }
})