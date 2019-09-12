public with sharing class ChuckNorrisController {
    
    @AuraEnabled
    public static List<string> fetchCategories(){
        List<string> categories = (List<String>)JSON.deserialize( 
            getCall('https://api.chucknorris.io/jokes/categories').getBody() , List<string>.class);
        categories.sort();

        return categories;
    }

    @AuraEnabled
    public static string fetchJokes(string category){
        if( String.isNotBlank(category) ){
            category = '?category='+category;
        }

        String resp = getCall('https://api.chucknorris.io/jokes/random'+category).getBody();
        return (String) ((Map<String,Object>)JSON.deserializeUntyped(resp)).get('value');
    }

    private static HTTPResponse getCall(string endpoint) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');

        Http http = new Http();
        return http.send(req);
    }
}