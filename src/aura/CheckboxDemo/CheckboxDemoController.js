({
    updateCheckboxes : function(component, event, helper) {
        var params = event.getParams();
        if (typeof params.fieldValuesChanged !== 'undefined') {
            component.set("v."+params.fieldChanged, params.fieldValuesChanged);
        }
        // now fire a search or do something with the field
    }
})