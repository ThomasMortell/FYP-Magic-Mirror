Module.register('MMM-Gestures', {

	// init connection to server role and setup compliment module hiding/showing upon
	// events
	start: function (){

		console.log('MMM-Gestures start invoked.');

		// notifications are only received once the client (this file) sends the first message to the server (node_helper.js)
		this.sendSocketNotification('INIT');

	},

	// hide compliment module by default, until PRESENT gesture is received
	notificationReceived: function(notification, payload, sender) {

		// hide compliment module by default after all modules were loaded
		if (notification == 'ALL_MODULES_STARTED'){

			var complimentModules = MM.getModules().withClass('compliments');

			if(complimentModules && complimentModules.length == 1){

				console.log('Hiding compliment module since all modules were loaded.');
				var compliment = complimentModules[0];
					compliment.hide();

			}

		}

	},

	socketNotificationReceived: function(notification, payload) {
		
		console.log('Received message from gesture server: ' + notification + ' - ' + payload);

		// forward gesture to other modules
		this.sendNotification('GESTURE', {gesture:payload});

		var pagesModules = MM.getModules().withClass('MMM-pages');

		if(pagesModules){
			
			var notification = "UNKNOWN";

			if(payload == 'LEFT'){
				notification = "PAGE_DECREMENT";
			} else if(payload == 'RIGHT'){
				notification = "PAGE_INCREMENT";
			} else if(payload == 'UP'){
				notification = "HOME_PAGE";
			} else if(payload == 'DOWN'){
				notification = "AWAY";

			} else {
				Log.info('Not handling received gesture in this module directly:');
				Log.info(payload);
			}

			// forward gesture to other modules
			Log.info('Sending notification: ' + notification + '.');
			this.sendNotification(notification);

		}

	},

});
