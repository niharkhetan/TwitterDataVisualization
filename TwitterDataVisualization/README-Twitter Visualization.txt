
1.	Install jdk on your machine: Link: http://www.oracle.com/technetwork/java/javase/downloads/index.html
2.	Install eclipse juno on your machine, Link: 
http://www.eclipse.org/downloads/packages/release/Juno/SR2
3.	Launch eclipse and install Apache Tomcat 7 via eclipse.
4.	Install SAPUI5 Plugin to eclipse:
	a.	Eclipse -> Help -> Install New Software.
	b.	Paste this link: https://tools.hana.ondemand.com/juno
	c.	Install SAPUI5 components and restart eclipse.
5.	Now eclipse is ready to run the project.
6.	Import project File -> Import -> Import existing projects in workspace.
7.	To Run: Right click on project -> Run on server -> Select Apache Tomcat7 -> Run.
8.	Open url on your browser as : http://localhost:8080/TwitterVisualization/ to see the app running on your browser
9.	You can emulate the app environment to see how it runs on mobile devices on chrome browser:
	a.	Press F12.
	b.	In the console between search symbol and ‘elements’ on header bar there will be a mobile icon. Press that.
	c.	Select the device you want to emulate from dropdown on the left.
	d.	App looks as if it is running on that device.

** Tweet Visualization takes some time to load as Google API maps to latitudes and longitudes and renders it to the screen.
