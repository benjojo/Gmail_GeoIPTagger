/**
 * Retrieves all inbox threads and logs the respective subject lines.
 * For more information on using the GMail API, see
 * https://developers.google.com/apps-script/class_gmailapp
 */
function processInbox() {
  // get all threads in inbox
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < 50; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    // iterate over each message
    for (var j = 0; j < messages.length; j++) {
      // log message subject
      Logger.log(messages[j].getSubject());
    }
  }
};

