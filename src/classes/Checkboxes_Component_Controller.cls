public with sharing class Checkboxes_Component_Controller {

    @AuraEnabled
    public static String getPickListValues(String objectName, String fieldName) {

    	Set<String> currentValues = new Set<String>();
    	List<sObject> records = database.query('SELECT ' + fieldName + ' FROM ' + objectName);
    	for(sObject s : records) {
    		String val = (String)s.get(fieldName);
    		currentValues.add(val);
    	}
    	System.debug(currentValues.size());

		// generate a Map of all sObject names (keys) to sObject tokens (values)
		Map<String,Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();

		// get the Schema.DescribeSObjectResult of the objName arbitrary sObject
		Schema.DescribeSObjectResult arbDSR = schemaMap.get(objectName).getDescribe();

		// generate a Map of all field names (keys) to field tokens (values)
		Map <String, Schema.SObjectField> fieldMap =  arbDSR.fields.getMap();

		// get the Schema.DescribeFieldResult of the fieldName arbitrary field
		Schema.DescribeFieldResult arbDFR = fieldMap.get(fieldName).getDescribe();
		  
		// get the Schema.PickListEntry list from the DescribeFieldResult
		List<Schema.PickListEntry> picks = arbDFR.getPicklistValues();

		String result = '';

		for(Schema.PickListEntry pick : picks) {
			if(currentValues.contains(pick.getLabel())) {
				if(result != '') result = result + ',';
				result = result + pick.getLabel();				
			}
		}
        return result;
    }

}