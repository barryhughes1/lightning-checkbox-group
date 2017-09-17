({
    doInit : function(component, event, helper) {
        // Populate Checkboxes
        var labelList = component.get("v.values");
        var optsList = [];
        for(var j=0; j<labelList.length; j=j+1) {
            optsList.push({
                label:labelList[j],
                valueId:'plans'+j,
                value:false,
                disabled:false
            });
        }
        component.set("v.checkboxes", optsList);
    },
    updateCheckboxes : function(component, event, helper) {
        // To be completed in Step 31
        if(component.get("v.EnableDisableAll") === "yes") {
            // Helper method that manipulates
            // the checkboxes attribute
            helper.enableDisableCheckboxesFromAll(component, "checkboxes");
        } else {
            var fld = component.get("v.checkboxes");
            component.set("v.checkboxes", fld);
        }
    },
    populateCheckboxes : function(component) {
        // To be completed in Step 33
        var compEvent = component.getEvent("Checkbox_Change");
        compEvent.setParams(
            {
                "fieldChanged" : component.get("v.fieldParentFieldSet"),
                "fieldValuesChanged" : component.get("v.checkboxes")
            }
        );
        compEvent.fire();
    }
})