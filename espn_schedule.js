function espn_schedule() {
  //Manually place the date in the format yyyy-mm-dd or pull it from a spreadsheet
	var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Schedule");
	var date = //date;
  
  //Clearning previous content
  ss.getRange("A2:F100").clearContent();
  
  //Getting the URL and info
  var url = "http://www.espn.com/mlb/schedule/_/date/" + date;
  var content = UrlFetchApp.fetch(url).getContentText();
  
  var e = Parser.data(content).from('class="schedule has-team-logos align-left"').to('</tbody>').build();
  var res = [];
  var teams = Parser.data(e).from('<abbr title="').to('">').iterate();
  var time = Parser.data(e).from('data-date="').to('">').iterate()
  
  //For loop to scrape each team
  for( var i = 0; i<teams.length ; i = i+2) {
  	res[i/2] = []
    res[i/2][0] = teams[i]
    res[i/2][1] = teams[i+1]
    res[i/2][2] = new Date(time[i/2]).toLocaleTimeString('en-US')
  }
  ss.getRange(ss.getLastRow() + 1, 1, res.length, res[0].length).setValues(res);
}
