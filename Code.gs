function TagInbox() {
  // get all threads in inbox
  var threads = GmailApp.getInboxThreads();
  var GlobalLables = GmailApp.getUserLabels();
  // Check if there are the GEOIP label sets in here.
  var HasGeoIP = false;
  for (var i = 0; i < GlobalLables.length; i++) {
    if(GlobalLables[i].getName() === "geoip") {
     HasGeoIP = true; 
    }
  }
  if(!HasGeoIP) {
    GmailApp.createLabel("geoip");
    GlobalLables = GmailApp.getUserLabels();
  }
  
  for (var i = 0; i < 5; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    if(threads[i].getLabels().length != 0) {
      var ContainsGeoIP = false;
      var labels = threads[i].getLabels();
      for (var j = 0; j < labels.length; j++) {
        if(labels[j].getName() === "geoip") {
          ContainsGeoIP = true;
        }
      }
      if(!ContainsGeoIP) {
        
      }
    } else {
      var RawMsg = messages[0].getRawContent().split("\n");
      // We are looking for
      // Received: from
      for (var i = 0; i < RawMsg.length; i++) {
        if(RawMsg[i].indexOf("Received: from") != -1 && RawMsg[i].indexOf("[") != -1) {
          Logger.log(RawMsg[i])

          var re1='.*?((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![\\d])';  // IPv4 IP Address 1
          var p = new RegExp(re1,["i"]);
          var m = p.exec(RawMsg[i]);
          if (m != null)
          {
              var ipaddress1=m[1];
              Logger.log(GetEmailLocation(ipaddress1))
              
          }
        }
      }
    }
    // iterate over each message
    /*for (var j = 0; j < messages.length; j++) {
      // log message subject
      Logger.log(messages[j].getSubject());
    }*/
  }
};

function GetEmailLocation(IP) {
  var rawjson = UrlFetchApp.fetch("http://freegeoip.net/json/" + IP);
  var obj = JSON.parse(rawjson);
  return obj.country_name;
}
