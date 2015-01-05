sap.ui.jsview("twitter_visual.tile", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf twitter_visual.tile
	*/ 
	getControllerName : function() {
		return "twitter_visual.tile";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf twitter_visual.tile
	*/ 
	createContent : function(oController) {
 		var tilePage = new sap.m.Page({
			title: "Welcome to Twitter Dataset Visualization",
			enableScrolling : false,
			content: []
		});
 		
 		var tileContainer = new sap.m.TileContainer("tileCont1");
 		var standardTile1 = new sap.m.StandardTile("tile1",{
 			icon : "sap-icon://map", 			
 			number : "3271",
 			title : "Tweets @ United States",
 			numberUnit: "tweets",
 			info: "Google Map",
 			press : function(){
 				app.to(sap.ui.getCore().byId("idpage1"));
 			}
 			});
 		var standardTile2 = new sap.m.StandardTile("tile2",{
 			icon : "sap-icon://globe", 			
 			title : "Tweets @ Few More Countries",
 			info: "Google Map",
 			press : function(){
 				app.to(sap.ui.getCore().byId("idpage2"));
 			}
 			});
 		var standardTile3 = new sap.m.StandardTile("tile3",{
 			icon : "sap-icon://pie-chart", 
 			number : "10000",
 			numberUnit: "tweets",
 			title : "Statistics @ Tweets",
 			info: "Charts",
 			press : function(){
 				app.to(sap.ui.getCore().byId("idpage3"));
 			}
 			});
 		tileContainer.addTile(standardTile1);
 		tileContainer.addTile(standardTile2);
 		tileContainer.addTile(standardTile3);
 		tilePage.addContent(tileContainer);
 		return tilePage;
	}

});