const url = "https://docs.google.com/spreadsheets/d/1pwig3jpqfIutg5wD9CIbui9amrjfqdIlpvMAgO2l2U8/edit#gid=0"
const sss = SpreadsheetApp.openByUrl(url) //opens selected sheet by url
const sheet = sss.getSheetByName("all") //gets sheet named "all"
const key = "XXXXXXXXXXXXXXXX" //Torn API Key Here

function run(){
  //UV: 45151
  //UL: 14820
  //UW: 10913
  var members = getFaction(14820) //use faction IDs here (listed above)
  console.log("members: ",members)
  for(i in members){
    getPlayer(members[i]) //pulls each member by id and then logs to sheet
  }
  }
function getFaction(id){
  var call = JSON.parse(UrlFetchApp.fetch("https://api.torn.com/faction/"+id+"?selections=&key="+key).getContentText()) //api call to get faction profile
  var members = []
  Object.keys(call.members).forEach(x=>{
    members.push(x) //pushes each id into the members array
  })
  return members 
}
function getPlayer(id){
  var call = JSON.parse(UrlFetchApp.fetch("https://api.torn.com/user/"+id+"?selections=profile,personalstats&key="+key).getContentText()) //makes a call to torn for a players profile and stats. DO append a "&timestamp=TIMESTAMP" to after the "personalstats" to pull history
  var stats = call.personalstats
  var drugsused = stats.drugsused
  var overdosed = stats.overdosed
  var xantaken = stats.xantaken 
  var networth = stats.networth
  var receivedbountyvalue = stats.receivedbountyvalue
  var traveltimes = stats.traveltimes 
  var useractivity = stats.useractivity 
  var bestactivestreak = stats.bestactivestreak
  var row = sheet.getRange("A:A").createTextFinder(id).matchEntireCell(true).findNext()
  if(row == null){row = sheet.getLastRow()+1} else{row = row.getRow()} //checks if ids in sheet already if so pulls row. if not sets new row for data to be added to
  var output = [drugsused, overdosed, xantaken, networth, receivedbountyvalue, traveltimes, useractivity, bestactivestreak]
  sheet.getRange(row,12,1,output.length).setValues([output]) //pastes values to sheet. When adding history set the starting column to 4. when doing current data set column to 12
}
