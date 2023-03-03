function onOpen(e){
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("My Menu")
  .addItem("Copy Job Submissions", "getJobSubmissions")
  .addItem("Get Responses", "getResponses")
  .addToUi();
}



function getJobSubmissions(){
	var label = GmailApp.getUserLabelByName("Job Submissions");
	var threads = label.getThreads();

	for(var i = threads.length - 1; i >=0; i--){
		var messages = threads[i].getMessages();

		for (var j = 0; j <messages.length; j++){
			var message = messages[j];
			extractDetails(message);
			GmailApp.markMessageRead(message);
		}
		threads[i].removeLabel(label);

	}

}

function extractDetails(message){
	var msgSubject = message.getSubject();
	var msgDate = message.getDate();
	var msgSender = message.getFrom();
	var msgTxt = message.getPlainBody();
		
	var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();	
	activeSheet.appendRow([msgDate,msgSubject,msgSender,msgTxt]);
}


function getResponses(){
  var label2 = GmailApp.getUserLabelByName("Responses");
  var threads2 = label2.getThreads();
  
  for(var i = threads2.length - 1; i >=0; i--){
    var messages2 = threads2[i].getMessages();

    for (var j = 0; j <messages2.length; j++){
      var message2 = messages2[j];
      extractResponses(message2);
			GmailApp.markMessageRead(message2);
		}
		threads2[i].removeLabel(label2);
  } 
}

function extractResponses(message2){
  var msgSubject = message2.getSubject();
	var msgDate = message2.getDate();
	var msgSender = message2.getFrom();
	var msgTxt = message2.getPlainBody();
		
	var activeSheet2 = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();	
	activeSheet2.appendRow([msgDate,msgSubject,msgSender,msgTxt]);
}
