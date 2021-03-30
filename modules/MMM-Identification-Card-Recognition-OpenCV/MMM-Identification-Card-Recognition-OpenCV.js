Module.register("MMM-Identification-Card-Recognition-OpenCV", {


    defaults: {
      prompt: "Please use your ID card to access your profile",
      fileUrl: "modules/MMM-Identification-Card-Recognition-OpenCV/public/guest.png",
      width: "200px",
      position: "left",
      studentClass: "student",
      staffClass: "staff",
      guestClass: "guest",
      interval: 2,
		  logoutDelay: 15,
    },
    
    start: function () {
      this.count = 0
      this.current_user = null;
      this.sendSocketNotification('CONFIG', this.config);
      Log.info('Starting module: ' + this.name);
    },
    
    getStyles: function () {
            return [
                this.file('css/mmm-style.css')
            ];
        },
    
    
    getDom: function() {
      var element = document.createElement("div")
      element.className = "face-image"
      element.innerHTML = this.config.prompt
      var subElement = document.createElement("p")
      subElement.id = "COUNT"
      element.appendChild(subElement)
    
     
      return element
    },
    
    //Create Socket Connnection with nodehelper.js
    notificationReceived: function(notification, payload, sender) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
          var timer = setInterval(()=>{
            this.sendSocketNotification("DO_YOUR_JOB", this.count)
            this.count++
          }, 1000)
          break
      }
    },
  
    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
          case "I_DID":
            MM.getModules().exceptWithClass(this.config.studentClass).enumerate(function(module) {
              module.hide(1000, function() {
                Log.log('Modules from student are hidden.');
              });
            });
          var elem = document.getElementById("COUNT")
          elem.innerHTML = "Welcome back, " + payload

        elem.classList.add(this.config.position);
        elem.style.width = this.config.width;
        
        var img = document.createElement("img");
        img.setAttribute('src', "modules/MMM-Identification-Card-Recognition-OpenCV/public/student.png");
        elem.appendChild(img);
        return elem
        
        break;
        
        case "I_DID_STAFF":
          MM.getModules().exceptWithClass(this.config.staffClass).enumerate(function(module) {
            module.hide(1000, function() {
              Log.log('Modules from staff are hidden.');
            });
          });
          var elem = document.getElementById("COUNT")
          elem.innerHTML = "Welcome back, " + payload
    
        elem.classList.add(this.config.position);
        elem.style.width = this.config.width;

        var img = document.createElement("img");
        img.setAttribute('src', "modules/MMM-Identification-Card-Recognition-OpenCV/public/professor.png");
        elem.appendChild(img);
        return elem

        break;
        
        default:
          MM.getModules().exceptWithClass(this.config.guestClass).enumerate(function(module) {
            module.hide(1000, function() {
              Log.log('Modules from guest are hidden.');
            });
          });
          var elem = document.getElementById("COUNT")
          elem.innerHTML = "Welcome back, Guest"
    
        elem.classList.add(this.config.position);
        elem.style.width = this.config.width;
      
        
        var img = document.createElement("img");
        img.setAttribute('src', this.config.fileUrl);
        elem.appendChild(img);
        return elem
    
    
      }
    },
    
    })
    