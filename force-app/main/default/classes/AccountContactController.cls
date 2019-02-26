public with sharing class AccountContactController {
     
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getForks() {
        return [SELECT Name,Id from Product2 where Family='Fork' group by Name,Id];
    }

}