sap.ui.jsview("twitter_visual.main", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf twitter_visual.main
	 */ 
	getControllerName : function() {
		return "twitter_visual.main";
	},



	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf twitter_visual.main
	 */ 
	createContent : function(oController) {
		var Page = new sap.m.Page("Page1",{
			title: "Top Six States, Tweets @ United States",
			showNavButton: true,			
			navButtonTap : function(){
				app.back();
			},
			content: []
		});


		var statesTabBar = new sap.m.IconTabBar("statesBar",{
			setSelectedKey: "state_filter1",
			select: function(oControlEvent)
			{
				params = oControlEvent.getParameters();
				console.log(params.selectedItem.sId);

				if(params.selectedItem.sId === 'state_filter1'){ 		    	   
					init_California();
				}
				else if(params.selectedItem.sId === 'state_filter2'){
					init_Texas();
				}
				else if(params.selectedItem.sId === 'state_filter3'){
					init_Newyork();
				}
				else if(params.selectedItem.sId === 'state_filter4'){
					init_Florida();
				}
				else if(params.selectedItem.sId === 'state_filter5'){
					init_Illinois();
				}
				else if(params.selectedItem.sId === 'state_filter6'){
					init_Georgia();
				}

			},
			items: [
			        new sap.m.IconTabFilter('state_filter1',{
			        	text: "California",
			        	icon: "sap-icon://group",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_california" style="width:100%; height:34rem;"></div>',
			        	}),
			        }),     		 

			        new sap.m.IconTabFilter('state_filter2',{
			        	text: "Texas",
			        	icon: "sap-icon://employee-approvals",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_texas" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('state_filter3',{
			        	text: "New York",
			        	icon: "sap-icon://tags",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_newyork" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('state_filter4',{
			        	text: "Florida",
			        	icon: "sap-icon://customer",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_florida" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('state_filter5',{
			        	text: "Illinois",
			        	icon: "sap-icon://locate-me",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_illinois" style="width:100%; height:34rem;"></div>',
			        	})
			        }),

			        new sap.m.IconTabFilter('state_filter6',{
			        	text: "Georgia",
			        	icon: "sap-icon://tag-cloud-chart",
			        	iconColor: sap.ui.core.IconColor.Default,
			        	content: new sap.ui.core.HTML({
			        		content:'<div id="map_canvas_georgia" style="width:100%; height:34rem;"></div>',
			        	})
			        })
			        ]
		});

		Page.addContent(statesTabBar);
		return Page;
	}

});