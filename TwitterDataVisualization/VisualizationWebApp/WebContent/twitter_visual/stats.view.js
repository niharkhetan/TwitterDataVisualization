sap.ui.jsview("twitter_visual.stats", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf twitter_visual.stats
	*/ 
	getControllerName : function() {
		return "twitter_visual.stats";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf twitter_visual.stats
	*/ 
	createContent : function(oController) {
		var Page = new sap.m.Page("Page3",{
			title: "Statistics",
			showNavButton: true,			
			navButtonTap : function(){
				app.back();
			},
			content: []
		});
		
		var statesTabBar2 = new sap.m.IconTabBar("statesBar2",{
			setSelectedKey: "country_filter1",
			
			items: [
			        new sap.m.IconTabFilter('a',{
			        	text: "All Tweets",
			        	icon: "sap-icon://overview-chart",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.m.Image({
			        		src:'./images/tweet_statistics.jpg',
			        		height : "36rem",
			        		width : "53rem"
			        	})
			        }),
			        
			        new sap.m.IconTabFilter('b',{
			        	text: "Geocodable?",
			        	icon: "sap-icon://multiple-pie-chart",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.m.Image({
			        		src:'./images/user_location.jpg',
			        		height : "36rem",
			        		width : "53rem"
			        	})
			        }),

			        new sap.m.IconTabFilter('c',{
			        	text: "Coded/Uncoded",
			        	icon: "sap-icon://bubble-chart",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.m.Image({
			        		src:'./images/geocoding.jpg',
			        		height : "36rem",
			        		width : "53rem"
			        	})
			        }),

			        new sap.m.IconTabFilter('d',{
			        	text: "USA",
			        	icon: "sap-icon://multiple-pie-chart",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.m.Image({
			        		src:'./images/tweets_usa.jpg',
			        		height : "36rem",
			        		width : "53rem"
			        	})
			        })
			        ]
		});

		Page.addContent(statesTabBar2);
		return Page;
	}

});