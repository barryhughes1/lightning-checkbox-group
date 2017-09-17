public with sharing class ContactListController {

    @AuraEnabled
    public static List<Contact> findAll() {
        return [SELECT id, name, phone FROM Contact LIMIT 50];
    }

    @AuraEnabled
    public static List<Contact> findByFieldAndValue(List<String> searchKeys, String fieldName) {
		String queryStr = 'SELECT id, name, Account.Industry, phone FROM Contact';
        if(searchKeys.size() > 0) {
	        queryStr = queryStr + ' WHERE ' + fieldName + ' IN :searchkeys';
        }
        queryStr = queryStr + ' LIMIT 50';        	
        return database.query(queryStr);
    }

    @AuraEnabled
    public static Contact findById(String contactId) {
        return [SELECT id, name, title, phone, mobilephone, Account.Name
                    FROM Contact WHERE Id = :contactId];
    }

}