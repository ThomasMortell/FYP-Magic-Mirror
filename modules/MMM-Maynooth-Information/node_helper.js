var util = require("util");


/// node_helper.js
var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.countDown = 10000000
  },
  socketNotificationReceived: function(notification, payload) {
      switch(notification){
          case "CHECK_SCRAPED":
          var fs = require('fs');
          fs.readFile("/home/pi/MagicMirror/modules/MMM-Identification-Card-Recognition-OpenCV/public/userlist.txt", function(err,data)
          {
              if(err)
                  console.log(err)
              else
                  card_rec_name = data.toString().replace(/\s+/g, '')
                  card_rec_name = card_rec_name.replace('-id', '');
          });

          fs.readFile('/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/studentdump.txt', function(err,data)
          {
              if(err)
                  console.log(err)
              else
                 scraped = data.toString();
                 return scraped
          });

          fs.readFile('/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/staffdump.txt', function(err,data)
          {
              if(err)
                  console.log(err)
              else
                 staffscraped = data.toString();
                 return staffscraped
          });

          fs.readFile('/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/newsdump.txt', function(err,data)
          {
              if(err)
                  console.log(err)
              else
                 guestScraped = data.toString();
                 return guestScraped
          });

          if(card_rec_name == "student"){
            if(scraped != null){
                this.sendSocketNotification("WE_LOADED_STUDENT",scraped)
            }else{
                this.sendSocketNotification("NOT_LOADED", scraped)
            }
          }
          else if(card_rec_name == "professor"){
            if(staffscraped != null){
                this.sendSocketNotification("WE_LOADED_STAFF",staffscraped)
            }else{
                this.sendSocketNotification("NOT_LOADED", staffscraped)
            }
          }else{
              this.sendSocketNotification("WE_LOADED_GUEST",guestScraped)
          }
        break
      }
  },
})
