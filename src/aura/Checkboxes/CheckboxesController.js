({
    doInit : function(component, event, helper) {
        // Is there an object or field Name added as a parameter
        // (via design attributes)?
        if ((!$A.util.isEmpty(component.get("v.Options_Object_API_Name"))) && 
            (!$A.util.isEmpty(component.get("v.Options_Field_API_Name")))) {

            // OK, lets get the Object and field API Names
            // and get the picklist values via Apex
            var action = component.get("c.getPickListValues");
            action.setParams({
              "objectName": component.get("v.Options_Object_API_Name"),
              "fieldName": component.get("v.Options_Field_API_Name")
            });
            action.setCallback(this, function(a) {
                var optionsStr = a.getReturnValue()
                helper.populateCheckboxOptions(component, optionsStr);
            });
            $A.enqueueAction(action);
        } else {

            // Object AND fieldName are NOT being used,
            // so lets use the passed in comma seperated string
            var valuesStr = component.get("v.Checkbox_Labels_CSV_String");
            helper.populateCheckboxOptions(component, valuesStr);
        }

    },
    updateCheckboxes : function(component, event, helper) {
        var params = event.getParams();
        if (params.fieldValuesChanged !== 'undefined') {
            component.set("v."+params.fieldChanged, params.fieldValuesChanged);
        }
        // now fire a search or do something with the field
        var appEvent = $A.get("e.c:Checkbox_Search_Event");
        appEvent.setParams({
            "field_label" : component.get("v.FieldLabel"),
            "field_values" : component.get("v.CheckBoxObjects")
        });
        appEvent.fire();
    }
})