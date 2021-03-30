var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.countDown = 10000000
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "DO_YOUR_JOB":

      var fs = require('fs');
      fs.readFile("/home/pi/MagicMirror/modules/MMM-Identification-Card-Recognition-OpenCV/public/userlist.txt", function(err,data)
            {
                if(err)
                    console.log(err)
                else
                    card_rec_name = data.toString().replace(/\s+/g, '')
                    card_rec_name = card_rec_name.replace('-id', '');

            });
  
      // fs.readdir('/home/pi/MagicMirror/modules/MMM-Identification-Card-Recognition-OpenCV/ImageBank', (err, datadir) => {
      //   if (err) throw err;

         
      if(card_rec_name == "professor"){
        this.sendSocketNotification("I_DID_STAFF", card_rec_name)
      }else if(card_rec_name == "student")
      {
        this.sendSocketNotification("I_DID", card_rec_name)
      }else
      {
        this.sendSocketNotification("I_NOT", card_rec_name)
      }
      
      // });
        break
    }
  },
})
