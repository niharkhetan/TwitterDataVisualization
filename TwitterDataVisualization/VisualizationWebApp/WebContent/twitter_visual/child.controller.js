sap.ui.controller("twitter_visual.child", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf twitter_visual.child
*/
	onInit: function() {

	},
	
	drawMap : function() {
		var data = google.visualization
				.arrayToDataTable([
						[ "Indianapolis, IN, USA", "herouxAT" ],

						[ "South Bend, IN, USA", "Donnie15" ],
						[ "Evansville, IN, USA", "clayblesch" ],
						[ "Heart Lane, Fort Wayne, IN 46816, USA",
								"BetheChangeInc" ],
						[ "Northern Avenue, South Bend, IN 46635, USA",
								"deborahannxxx" ],
						[ "La Porte, IN 46350, USA", "anthraxdadon" ],
						[ "Anderson, IN, USA", "naomieportice" ],
						[ "Terre Haute, IN, USA", "wtwonews" ],
						[ "Bloomington, IN, USA", "SwutBrah" ],
						[ "Muncie, IN, USA", "BCrumes" ],
						[ "West Lafayette, IN, USA", "isaacbob" ],
						[ "West Lafayette, IN, USA", "andikeptwalking" ],
						[ "Indianapolis, IN, USA", "tmjINDskltrd" ],
						[ "Indianapolis, IN, USA", "IfIGetAIDSfukIt" ],
						[
								"In God's Arms Child Care, 1224 Laurel Street, Indianapolis, IN 46203, USA",
								"ALovelyMe" ],
						[ "Muncie, IN, USA", "NathanM777" ],
						[ "My House, Douglas Lane, New Haven, IN 46774, USA",
								"terriwilson65" ],
						[ "Live Oak Boulevard, Fort Wayne, IN 46804, USA",
								"Wolfheinrich" ],
						[ "Indianapolis, IN, USA", "LiketheRiver" ],
						[ "Indianapolis, IN, USA", "chrisvannoy" ],
						[ "West Lafayette, IN, USA", "RachelMWeller" ],
						[ "Indianapolis, IN, USA", "bapatrick105" ],
						[ "Avon, IN, USA", "jandlray" ],
						[ "Indianapolis, IN, USA", "VolumeMack" ],
						[ "Terre Haute, IN, USA", "KharismaDaKidd" ],
						[ "Muncie, IN, USA", "megfizer" ],
						[ "Indianapolis, IN, USA", "93wibc" ],
						[ "Kokomo, IN, USA", "KyleMundell" ],
						[ "Indianapolis, IN, USA", "joshmiles" ],
						[ "West Lafayette, IN, USA", "JasonJ2688" ],
						[ "Scotland Cemetery, Republican, IN 47250, USA",
								"Clovercelt" ],
						[ "Bloomington, IN, USA", "JoshDSchultheis" ],
						[ "Indianapolis, IN, USA", "COLLEGEGIIRL10" ],
						[ "Mount Vernon, IN, USA", "yellowmello" ],
						[ "Indianapolis, IN, USA", "KurtisEMcCoin" ],
						[ "Indianapolis, IN, USA", "KTFralick" ],
						[ "Indianapolis, IN, USA", "adamnevins" ],
						[ "Amazoncom Court, Whitestown, IN 46075, USA",
								"NowPlayingMp3" ],
						[ "618 East 40 South, Angola, IN 46703, USA",
								"rilianovira" ],
						[ "Indianapolis, IN, USA", "MoWill100" ] ]);

		var options = {
			showTip : true,
			mapType : 'hybrid',
			useMapTypeControl : true
		};

		var map = new google.visualization.Map($('#map_canvas').get(0), options);

		map.draw(data, options);
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf twitter_visual.child
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf twitter_visual.child
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf twitter_visual.child
*/
//	onExit: function() {
//
//	}

});