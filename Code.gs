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
      var labels = threads[i].getLabels();
      for (var j = 0; j < labels.length; j++) {
        Logger.log(labels[j].getName());
      }
    } else {
      
    }
    // iterate over each message
    /*for (var j = 0; j < messages.length; j++) {
      // log message subject
      Logger.log(messages[j].getSubject());
    }*/
  }
};

function TagEmail(email) {
  
}
