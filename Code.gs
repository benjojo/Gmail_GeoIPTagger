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
  
  for (var i = 0; i < 10; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    if(threads[i].getLabels().length != 0) {
      var ContainsGeoIP = false;
      var labels = threads[i].getLabels();
      for (var j = 0; j < labels.length; j++) {
        if(labels[j].getName().indexOf("geoip") != -1 ) {
          Logger.log(labels[j].getName())
          ContainsGeoIP = true;
        }
      }
      if(!ContainsGeoIP) {
        var RawMsg = messages[0].getRawContent().split("\n");
        // We are looking for
        // Received: from
        for (var j = 0; j < RawMsg.length; j++) {
          if(RawMsg[j].indexOf("Received: from") != -1 && RawMsg[j].indexOf("[") != -1) {
            Logger.log(RawMsg[j])
            
            var re1='.*?((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![\\d])';  // IPv4 IP Address 1
            var p = new RegExp(re1,["i"]);
            var m = p.exec(RawMsg[i]);
            if (m != null)
            {
              var ipaddress1=m[1];
              var Orign = (GetEmailLocation(ipaddress1))
              var Res = EnsureWeHaveLabel(GlobalLables,Orign);
              GlobalLables = Res[1];
              Label = Res[0];
              threads[i].addLabel(Label)
            }
            break;
          }
        }
      }
    } else {
      var RawMsg = messages[0].getRawContent().split("\n");
      // We are looking for
      // Received: from
      for (var j = 0; j < RawMsg.length; j++) {
        if(RawMsg[j].indexOf("Received: from") != -1 && RawMsg[j].indexOf("[") != -1) {
          Logger.log(RawMsg[j])

          var re1='.*?((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![\\d])';  // IPv4 IP Address 1
          var p = new RegExp(re1,["i"]);
          var m = p.exec(RawMsg[i]);
          if (m != null)
          {
              var ipaddress1=m[1];
              var Orign = (GetEmailLocation(ipaddress1))
              var Res = EnsureWeHaveLabel(GlobalLables,Orign);
              GlobalLables = Res[1];
              Label = Res[0];
              threads[i].addLabel(Label)
          }
          break;
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

function EnsureWeHaveLabel(GlobalLables,TargetLabel) {
  for (var i = 0; i < GlobalLables.length; i++) {
    if (GlobalLables[i].getName() === "geoip/" + TargetLabel) {
      return [GlobalLables[i],GlobalLables];
    }
  }
  var NewLabel = GmailApp.createLabel("geoip/" + TargetLabel);
  GlobalLables = GmailApp.getUserLabels();
  return [NewLabel,GlobalLables]
}
