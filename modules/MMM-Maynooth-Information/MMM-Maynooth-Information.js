Module.register("MMM-Maynooth-Information",{

    start: function () {
    this.count = 0
    this.sendSocketNotification('CONFIG', this.config);
    Log.info('Starting module: ' + this.name);
  },

    getStyles: function () {
        return [
        this.file('css/scraper.css')
    ];
    },

    getScripts: window.onload =function() {
      return ["VanillaQR.js"];
    },

    getDom: function() {
      var element = document.createElement("div")
      element.classList.add('scrapeinfo')
      var subElement = document.createElement("p")
      subElement.id = "seminar"
     
      element.appendChild(subElement)

      return element
    },
    //Create Socket Connnection with nodehelper.js
    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
          case "DOM_OBJECTS_CREATED":
            var timer = setInterval(()=>{
              this.sendSocketNotification("CHECK_SCRAPED", this.count)
              this.count++
            }, 1000)
            break
        }
      },

      socketNotificationReceived: function(notification, payload) {
        switch(notification) {
        case "WE_LOADED_STUDENT":
        var elem = document.getElementById("seminar")
        var qr = new VanillaQR({
          url: "https://www.maynoothuniversity.ie/hamilton/seminars/student-seminar-series/",
          width: 200,
          height: 200,
          colorLight: "#FFFFFF",
          colorDark: "#000000",
          toTable: false,
          ecclevel: 1,
          noBorder: true,
        })
        var imageElement = qr.toImage("png");
  
        elem.innerHTML = "<h2><u>" + "Next Seminar" + "</u></h2>" + payload + "<br>" + "<h4>" + "Scan here to view online!" + "</h4>"

        elem.appendChild(imageElement)
        return elem
        
        break;

        case "WE_LOADED_STAFF":
        var elem = document.getElementById("seminar")
        var qr = new VanillaQR({
          url: "https://www.maynoothuniversity.ie/news-events/upcoming-events",
          width: 200,
          height: 200,
          colorLight: "#FFFFFF",
          colorDark: "#000000",
          toTable: false,
          ecclevel: 1,
          noBorder: true,
        })
        var imageElement = qr.toImage("png");
  
        elem.innerHTML = "<h2><u>" + "Upcoming Events" + "</u></h2>" + payload + "<h4>" + "Scan here to view online!" + "</h4>"

        elem.appendChild(imageElement)
        return elem
        
        break;

        case "WE_LOADED_GUEST":
        var elem = document.getElementById("seminar")
        var qr = new VanillaQR({
          url: "https://www.maynoothuniversity.ie/computer-science/news",
          width: 200,
          height: 200,
          colorLight: "#FFFFFF",
          colorDark: "#000000",
          toTable: false,
          ecclevel: 1,
          noBorder: true,
        })
        var imageElement = qr.toImage("png");
  
        elem.innerHTML = "<h2><u>" + "Maynooth Computer Science News" + "</u></h2>" + payload + "<h4>" + "Scan here to view online!" + "</h4>"

        elem.appendChild(imageElement)
        return elem
        case "NOT_LOADED":

          var elem = document.getElementById("seminar")
          elem.innerHTML = "ERROR: " + payload
          
          return elem
  
        break;
    
    
      }
    },

})