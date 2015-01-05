
package google;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;
import javax.net.ssl.HttpsURLConnection;

import mongodb.Config;
import util.UrlSigner;

import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

/**
 * @author Yuan Luo (yuanluo@indiana.edu)
 *
 * Small module for data cleaning added by:
 * @ Nihar Khetan (nkhetan@indiana.edu)
 */
public class GeoCodingClient {
	
	String protocol=null;
	String baseUrl =null;
	String serviceUrl =null;
	String OutputFormat=null;
	String clientKey=null;
	String clientID=null;
	String clientSec=null;
	
	public GeoCodingClient(Config conf) {
		this.protocol=conf.protocol;
		this.baseUrl =conf.baseUrl;
		this.serviceUrl =conf.serviceUrl;		
		this.OutputFormat=conf.OutputFormat;
		this.clientKey=conf.clientKey;
		this.clientID=conf.clientID;
		this.clientSec=conf.clientSec;
	}
	
	/**
	 * @param args
	 * @throws NoSuchAlgorithmException 
	 * @throws InvalidKeyException 
	 */
	
	public DBObject getGeoCode(String location) throws InvalidKeyException, NoSuchAlgorithmException {
		DBObject geoCode = null;
		try {
			//reformat location
			//replace all whitespaces with "+";
			if(location==null||location.trim().equals("")){
				BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
				geobuilder.add("geocode", null);
				geoCode=geobuilder.get();
				System.out.println("Empty location. Return..");
				return geoCode;
			}
			/**
			* ____________________________________________________________________________________________________
			*
			* Added By: @ Nihar Khetan (nkhetan@indiana.edu)
			*
			* Processing the User Location and Cleaning data
			* Strategy: Refer Design Document (Report Attached)
			*/
			//Check if location is already a latitude and longitude
			String lonlatregex = "([+-]?\\d+\\.?\\d+)\\s*,\\s*([+-]?\\d+\\.?\\d+)";
			Pattern compileRegex = Pattern.compile(lonlatregex, Pattern.CASE_INSENSITIVE);
			Matcher match = compileRegex.matcher(location);
			if (match.find()){
				//valid latitude and longitude
				//creating DB Object for Latitude and Longitude
				BasicDBObject locationMap = new BasicDBObject();
				String queryLocation = match.group(1)+","+match.group(2);
				Double lat = Double.valueOf(match.group(1));
				Double lng = Double.valueOf(match.group(2));
				locationMap.put("lat", lat);
				locationMap.put("lng", lng);
				
				URI uriLatLng;
				URL myurlLatLng;
				if(clientID!=null&&clientSec!=null&&!clientID.equals("")&&!clientSec.equals("")){
					uriLatLng = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"latlng="+queryLocation+"&client="+clientID,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					String signedURLLatLng=UrlSigner.sign(uriLatLng.toASCIIString(), this.clientSec);
					myurlLatLng = new URL(signedURLLatLng);
					
				}else if(clientKey!=null&&!clientKey.equals("")){
					uriLatLng = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"latlng="+queryLocation+"&key="+clientKey,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					myurlLatLng = new URL(uriLatLng.toASCIIString());
				}else {
					uriLatLng = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"latlng="+queryLocation,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					myurlLatLng = new URL(uriLatLng.toASCIIString());
				}				
				System.out.println("Geocoding URL for Latitute and Longitude: "+myurlLatLng.toString());
				
				HttpsURLConnection con = (HttpsURLConnection)myurlLatLng.openConnection();
				InputStream ins = con.getInputStream();
				InputStreamReader isr = new InputStreamReader(ins);
				BufferedReader in = new BufferedReader(isr);
				
				JsonReader jreader = Json.createReader(in);
				JsonObject jobj = jreader.readObject();				
				JsonArray results = jobj.getJsonArray("results");
				JsonValue status = jobj.get("status");
				
				if(results==null||status==null){
					System.out.println("Geocoding Status: Query error");
				}else if(!results.isEmpty()){
					System.out.println("Geocoding Status: "+status);
					JsonValue result = results.get(0);
					DBObject dbObject = (DBObject) JSON.parse(result.toString());
					String formatedAddress=(String)dbObject.get("formatted_address");
					
					BasicDBObjectBuilder locationBuilder= new BasicDBObjectBuilder();
					locationBuilder.add("formatted_address", formatedAddress);
					locationBuilder.add("location", locationMap);
					
					BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
					geobuilder.add("geocode", locationBuilder.get());
					geobuilder.add("status", status.toString());
					geoCode=geobuilder.get();
					System.out.println("Extracted geoCode already present: "+geoCode);					
				}else if(status.toString().contains("ZERO_RESULTS")){
					BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
					geobuilder.add("geocode", null);
					geobuilder.add("status", status.toString());
					geoCode=geobuilder.get();
					
				}else{
					BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
					geobuilder.add("status", status.toString());
					geoCode=geobuilder.get();
				}
				in.close();
				return geoCode;				
			}
			else{
				//Cleansing data
				String handleDollarSlash = "";
				//Rule 1: if there are characters around dollar then convert $ to s*
				//Rule 2: if slash convert it to an empty space
				//Rule 3: remove all special characters except , as address may be comma separated
				
				//Creating cleaned user location after cleaning the original user location
				for(int i = 0 ; i < location.length(); i++){
					char eachChar = location.charAt(i);
					if (eachChar == '/'){
						handleDollarSlash += " ";
					}
					else if (eachChar == '$'){
						if (Character.isLetter(location.charAt(i-1)) || Character.isLetter(location.charAt((i<location.length())?i:i-1))){
							handleDollarSlash += 's';
						}
						else
							handleDollarSlash += eachChar;
						}
					else
						handleDollarSlash += eachChar;
				}
				
				String cleanedLocation = handleDollarSlash.replaceAll("[^,1234567890\\p{L}\\p{Z}]","");
				String reformated_location=cleanedLocation.trim().replaceAll("\\s+","+");
				System.out.println("reformated_location: "+reformated_location);
			/**
			* ____________________________________________________________________________________________________
			*
			* Additions By: @ Nihar Khetan (nkhetan@indiana.edu) End here
			*/
				URI uri;
				URL myurl;
				if(clientID!=null&&clientSec!=null&&!clientID.equals("")&&!clientSec.equals("")){
					uri = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"address="+reformated_location+"&client="+clientID,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					String signedURL=UrlSigner.sign(uri.toASCIIString(), this.clientSec);
					myurl = new URL(signedURL);
					
				}else if(clientKey!=null&&!clientKey.equals("")){
					uri = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"address="+reformated_location+"&key="+clientKey,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					myurl = new URL(uri.toASCIIString());
				}else {
					uri = new URI(
							protocol, 
							baseUrl, 
							serviceUrl+this.OutputFormat,
							"address="+reformated_location,
							null);
					//Convert uri (may have different encoding) to ascii string so that the proper result can be return from google.
					myurl = new URL(uri.toASCIIString());
				}
				
				
				System.out.println("Geocoding URL: "+myurl.toString());
				
				HttpsURLConnection con = (HttpsURLConnection)myurl.openConnection();
				InputStream ins = con.getInputStream();
				InputStreamReader isr = new InputStreamReader(ins);
				BufferedReader in = new BufferedReader(isr);
			
				//String inputLine;
				//String message = new String();
				//while ((inputLine = in.readLine()) != null) {
				//	message=message+inputLine;
				//}
				//DBObject dbObject = (DBObject) JSON.parse(message);
				
				JsonReader jreader = Json.createReader(in);
				JsonObject jobj = jreader.readObject();
				//System.out.println(jobj.toString());
				JsonArray results = jobj.getJsonArray("results");
				JsonValue status = jobj.get("status");
				if(results==null||status==null){
					System.out.println("Geocoding Status: Query error");
				}else if(!results.isEmpty()){
					System.out.println("Geocoding Status: "+status);
					JsonValue result = results.get(0);
					DBObject dbObject = (DBObject) JSON.parse(result.toString());
					String formatedAddress=(String)dbObject.get("formatted_address");
					DBObject geometry = (DBObject)dbObject.get("geometry");
					if(geometry==null){
						System.out.println("GeoCoding Schema Error");
						BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
						geobuilder.add("geocode", null);
						geobuilder.add("status", status.toString());
						geoCode=geobuilder.get();
					}else{
						DBObject geoLocation = (DBObject)geometry.get("location");
						BasicDBObjectBuilder locationBuilder= new BasicDBObjectBuilder();
						locationBuilder.add("formatted_address", formatedAddress);
						locationBuilder.add("location", geoLocation);
						
						BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
						geobuilder.add("geocode", locationBuilder.get());
						geobuilder.add("status", status.toString());
						geoCode=geobuilder.get();
						System.out.println("Extracted geoCode: "+geoCode);
					}
				}else if(status.toString().contains("ZERO_RESULTS")){
					BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
					geobuilder.add("geocode", null);
					geobuilder.add("status", status.toString());
					geoCode=geobuilder.get();
					
				}else {
					BasicDBObjectBuilder geobuilder= new BasicDBObjectBuilder();
					geobuilder.add("status", status.toString());
					geoCode=geobuilder.get();
				}
				in.close();
				return geoCode;
			}
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) throws Exception {
		//Config conf=new Config("C:/Users/NiharKhetan/Desktop/Twitter-Project/I590-TwitterDataSet/I590-TwitterDataSet/config");
		//System.out.println("conf parsed");
		//GeoCodingClient gcc= new GeoCodingClient(conf);
		//gcc.getGeoCode("San \n  Diego");
		//System.out.println("success");
		//$wget https://maps.googleapis.com/maps/api/geocode/json?address=qwertyuiop -O location.json
		//$cat location.json
		//{
		//	"results" : [],
		//	"status" : "ZERO_RESULTS"
		//}
		//gcc.getGeoCode("qwertyuiop");
		
	}

}
