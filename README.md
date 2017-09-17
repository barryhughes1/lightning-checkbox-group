# lightning-checkbox-group
Checkbox group, with 'All' option, available as a Lightning Component

The 'CheckboxDemoApp.app' will launch a demo of the checkbox group.

The 'Filter_CheckboxGroup' contains the checkbox group and has the attributes:

label - field label
fieldParentFieldSet - name of the attribute to hold the values selected
values - a list of the options to be available
EnableDisableAll - if set to "yes", choosing the 'All' option will disable al other options.


TUTORIAL TO MAKE THIS FUNCTIONALITY WITHOUT CLONING

STEP 1. Create a new Lightning Component called 'Checkbox_Element'

```
<aura:component access="global">
    
    <aura:attribute name="fieldName" type="String" default="" />
    <aura:attribute name="fieldLabel" type="String" default="" />
    <aura:attribute name="fieldParentFieldSet" type="String" default="" />
    <aura:attribute name="fieldValue" type="Boolean" default="false" />
    <aura:attribute name="fieldDisabled" type="Boolean" default="false" />
    
    <!-- Step 9: Register the change event -->

        
    <label class="slds-checkbox">
        <ui:inputCheckbox aura:Id="chkbox" 
                                              value="{!v.fieldValue}" 
                                              change="{!c.onCheck}" 
                                              disabled="{!v.fieldDisabled}" />
        <span class="slds-checkbox--faux" />
        <span class="slds-form-element__label">{!v.fieldLabel}</span>
    </label>
    
</aura:component> 
```

AND SAVE!


STEP 2. In the Controller of 'Checkbox_Element':

```
({
    onCheck: function(component) {
    	// Step 8
    }
})
```


AND SAVE!




 
STEP 3. Create a new Lightning Component called 'CheckboxGroup'

```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" 
                access="global">
    
    <!-- 0. Includes & Dependencies -->
    
    <!-- 1. Attributes -->
    <aura:attribute name="fieldParentFieldSet" type="String" default=""
                    description="" />
    <aura:attribute name="label" type="String" default=""
                    description="" />
    <aura:attribute name="EnableDisableAll" type="String" default="no"
                    description=""
                    />
    <aura:attribute name="values" type="String[]" default="[]"
                    description=""
                    />
    <aura:attribute name="checkboxes" type="Object[]" default="[]"
                    description=""/>
    
    <!-- Handlers -->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"
                  description=""/>


    <!-- STEP 12. Checkbox_Element_Change Handler -->

    <!-- STEP 14. Detect a change in the checkboxes attribute -->
    
    <!-- STEP 16. Register an event to communicate results to the parent component -->
    
    <!-- 4. Methods -->
    
    <!-- 5. Layout -->
    <fieldset class="slds-form-element">
        <legend class="slds-form-element__legend slds-form-element__label">{!v.label}</legend>
        <div class="slds-form-element__control">
            <aura:iteration items="{!v.checkboxes}" var="item">
                  <c:Checkbox_Element fieldName="{!item.valueId}"
                                      fieldLabel="{!item.label}"
                                      fieldValue="{!item.value}"
                                      fieldParentFieldSet="checkboxes"
                                      fieldDisabled="{!item.disabled}" />
            </aura:iteration>
        </div>
    </fieldset> 
    
</aura:component>
```




AND SAVE!


STEP 4. Add the following to the controller of the 'CheckboxGroup' component

```
({
    //Called from either another helper method or from the aura:initHandler call or an event, etc.
    doInit : function(component, event, helper) {
        // Populate Checkboxes
        var labelList = component.get("v.values");
        var optsList = [];
        for(var j=0; j<labelList.length; j=j+1) {
	optsList.push({       label:labelList[j],
                                                     valueId:'plans'+j,
                                                     value:false,
                                                    disabled:false     });
        }
        component.set("v.checkboxes", optsList);
    },
    updateCheckboxes : function(component, event, helper) {
    	// To be completed in Step 11
    },
    populateCheckboxes : function(component) {
    	// To be completed in Step 13
    }
})
```

AND SAVE!


STEP 5. Create a Lightning Component called 'CheckboxDemo'

```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" 
                access="global">
    
    <aura:attribute name="brands" type="Object[]" default="[]" description=""/>
    
    <div class="slds-grid slds-wrap slds-grid--pull-padded slds-m-around--large">
        <div class="slds-p-horizontal--small slds-size--1-of-4">
            <div class="slds-box slds-box--small slds-theme--shade">
                <div class="slds-form--stacked">
                        <c:CheckboxGroup label="Brand Name"
                                            fieldParentFieldSet="brands"
                                            values="['All', 'Nike', 'Puma', 'Adidas', 'Under Armor', 'Diadora', 'Reebok']"
                                            EnableDisableAll="yes" />  
                </div>
            </div>
        </div>
    </div>
    <aura:iteration items="{!v.brands}"
                    var="b">
    	{!b.label}: {!b.value}<br/>
    </aura:iteration>
</aura:component>
```

AND SAVE!


STEP 6. As a way to test the checkbox, we can create a Lightning Application
as follows:

```
<aura:application extends="force:slds">
    <c:CheckboxDemo />
</aura:application>
```


and SAVE! Click 'Preview' to test the checkbox.


STEP 7. Create a Lightning Event called 'Checkbox_Element_Change'

```
<aura:event type="COMPONENT" description="Event template">
    <aura:attribute name="fieldChanged" type="String" default="" />
    <aura:attribute name="fieldValue" type="boolean" default="" />
    <aura:attribute name="fieldLabel" type="boolean" default="" />
</aura:event>
```


AND SAVE!


STEP 8. Update the Controller in the 'Checkbox_Element' to fire the event

```
({
    onCheck: function(component) {
    	// will fill this in at Step 8
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
```


and SAVE!


STEP 9. Open the Lightning Component called 'Checkbox_Element' register the event

```
    <!-- Step 9: Register the change event -->
    <aura:registerEvent name="Checkbox_Element_Change" type="c:Checkbox_Element_Change"/>
```

    and SAVE!
    
    
STEP 10. Open the 'Helper' in the  'CheckboxGroup' lightning component and add
the following helper function

```
({
    enableDisableCheckboxesFromAll : function(component, fldName) {
        var fld = component.get("v."+fldName);
        var disableAll = false;
        for(var i=0; i<fld.length; i=i+1) {
            if(disableAll) {
                fld[i].value=false; 
                fld[i].disabled=true;
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
```

and SAVE!


STEP 11. Open the 'Controller' in the 'CheckboxGroup' lightning component and 
finish the updateCheckboxes function:

```
updateCheckboxes : function(component, event, helper) {
        // To be completed in Step 11
        if(component.get("v.EnableDisableAll") === "yes") {
        	// Helper method that manipulates
        	// the checkboxes attribute
	        helper.enableDisableCheckboxesFromAll(component, "checkboxes");
        } else {
            var fld = component.get("v.checkboxes");
	        component.set("v.checkboxes", fld);
        }
    },
```


and SAVE!


 
STEP 12. Open the 'CheckboxGroup' lightning component and 

```
    <!-- STEP 12. Checkbox_Element_Change Handler -->
    <aura:handler name="Checkbox_Element_Change" 
                  event="c:Checkbox_Element_Change" 
                  action="{!c.updateCheckboxes}"
                  description=""
                  />
```


and SAVE!


OK, Now we have an event firing when an individual checkbox which is being
handled by the parent 'CheckboxGroup' component (Step 11). This is firing
Javascript to update the checkboxes attribute.

Updating the checkbox attribute, automatically changes the individual 
checkbox components and effects their behaviour


STEP 13. In the controller of the 'CheckboxGroup' lightning component finish the
populateCheckboxes function:

```
    populateCheckboxes : function(component) {
    	// To be completed in Step 13
        var compEvent = component.getEvent("Checkbox_Change");
        compEvent.setParams(
            {
                "fieldChanged" : component.get("v.fieldParentFieldSet"),
                "fieldValuesChanged" : component.get("v.checkboxes")
            }
        );
        compEvent.fire();
    }
```

and SAVE!


STEP 14. Now add a handler to detect a change in the 'checkboxes' attribute

```
    <!-- STEP 14. Detect a change in the checkboxes attribute -->
    <aura:handler name="change" 
                  value="{!v.checkboxes}" 
                  action="{!c.populateCheckboxes}"
                  description=""/>
```


and SAVE!


STEP 15. Create a Lightning Event called 'Checkbox_Change'

```
<aura:event type="COMPONENT" description="Event template">
    <aura:attribute name="fieldChanged" type="String" default="" />
	<aura:attribute name="fieldValuesChanged" type="Object[]" default="[]"/>
</aura:event>
```



STEP 16. OK, we want the result of the selecting and de-selecting of checkboxes
to be communicated back to the parent 'CheckboxDemo' component. So, lets make an event

```
    <!-- STEP 16. Register an event to communicate results to the parent component -->
    <aura:registerEvent name="Checkbox_Change" 
                        type="c:Checkbox_Change"
                        description=""
                        />
```


and SAVE!


STEP 17. Open the Lightning Component called 'CheckboxDemo' and add the following to the 'Controller':

```
({
    updateCheckboxes : function(component, event, helper) {
        var params = event.getParams();
        if (typeof params.fieldValuesChanged !== 'undefined') {
            component.set("v."+params.fieldChanged, params.fieldValuesChanged);
        }
        // now fire a search or do something with the field
    }
})
```


and SAVE!


STEP 18. Finally, add the followng to the CheckboxDemo Component

```
    <!-- STEP 18. Register an event receive results from any checkboxgroup component -->
    <aura:handler name="Checkbox_Change" 
                  event="c:Checkbox_Change" 
                  action="{!c.updateCheckboxes}"
                  description=""
                  />
```


and SAVE!


BONUS: Add another checkbox with your own values and label to the demo. Ensure to add an attribute as well as a checkboxgroup component - and point the checkbox .

