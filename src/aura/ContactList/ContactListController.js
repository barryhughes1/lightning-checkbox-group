({
    doInit : function(component, event) {
        // Get all contacts upon initialize
        // with controller method (findAll)
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.contacts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
	searchKeyChange: function(component, event) {
    	var selectedOptions = event.getParam("field_values");
	    var queryStr = new Array();
        // Loop over all checkbox options
    	for(var i=0; i<selectedOptions.length; i=i+1) {
            // Only interested if the checkbox value is true (ie checked)
    		if(selectedOptions[i].value) {
              // Do not push in the 'All' checkbox
              // which should mean the queryStr array
              // is empty (=> all records returned)
              if(selectedOptions[i].label != "All") {
    			queryStr.push(selectedOptions[i].label);
              }
    		}
    	}
        // Controller method
	    var action = component.get("c.findByFieldAndValue");
        // Add params (searchQuery and field Name)
	    action.setParams({
	      "searchKeys": queryStr,
	      "fieldName": component.get("v.SearchField")
	    });
	    action.setCallback(this, function(a) {
	        component.set("v.contacts", a.getReturnValue());
	    });
	    $A.enqueueAction(action);
	}
})