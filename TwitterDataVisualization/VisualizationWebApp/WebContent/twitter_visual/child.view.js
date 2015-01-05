sap.ui.jsview("twitter_visual.child", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf twitter_visual.child
	*/ 
	getControllerName : function() {
		return "twitter_visual.child";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf twitter_visual.child
	*/ 
	createContent : function(oController) {
		var Page = new sap.m.Page("Page2",{
			title: "Tweets @ Few More Countries",
			showNavButton: true,			
			navButtonTap : function(){
				app.back();
			},
			content: []
		});
		
		var statesTabBar1 = new sap.m.IconTabBar("statesBar1",{
			setSelectedKey: "country_filter1",
			select: function(oControlEvent)
			{
				params = oControlEvent.getParameters();
				console.log(params.selectedItem.sId);

				if(params.selectedItem.sId === 'country_filter1'){ 		    	   
					init_India();
				}
				else if(params.selectedItem.sId === 'country_filter2'){
					init_China();
				}
				else if(params.selectedItem.sId === 'country_filter3'){
					init_Australia();
				}
				else if(params.selectedItem.sId === 'country_filter4'){
					init_Africa();
				}
			},
			items: [
			        new sap.m.IconTabFilter('country_filter1',{
			        	text: "India",
			        	icon: "sap-icon://world",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_India" style="width:100%; height:34rem;"></div>',
			        	}),
			        }),     		 

			        new sap.m.IconTabFilter('country_filter2',{
			        	text: "China",
			        	icon: "sap-icon://citizen-connect",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_China" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('country_filter3',{
			        	text: "Australia",
			        	icon: "sap-icon://my-view",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_Australia" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('country_filter4',{
			        	text: "Africa",
			        	icon: "sap-icon://locate-me",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_Africa" style="width:100%; height:34rem;"></div>',
			        	})
			        })
			        ]
		});

		Page.addContent(statesTabBar1);
		return Page;
		
	}

});