function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });
  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
};

function createmeeting(primaryControl) {
  console.log("inside create function call");
  try {
    var itemlink = window.parent.location.href;
    var formContext = primaryControl;
    var strname = formContext.getAttribute("hip_name").getValue();
    var strinstructiontype = formContext.getAttribute("hip_instructionstype").getValue();
    var strsubject = formContext.getAttribute("hip_subject").getValue();
    var strmessage = formContext.getAttribute("hip_message").getValue();
    var strmessage = "<a href='" + itemlink + "'" + " style='cursor: pointer; color: blue; text-decoration: underline;' target='_blank'>Click here to go to the entity item here<br></a>";
    //var strtimezone = formContext.getAttribute("hip_timezone").getValue();
	var strtimezone = getTimezoneName()
    var strstartdate = formContext.getAttribute("hip_startdate").getValue();
    var strenddate = formContext.getAttribute("hip_enddate").getValue();
    var strattendees = formContext.getAttribute("hip_attendees").getValue();
    varConvertedstartDate = strstartdate.toISOString();
    varConvertedendDate = strenddate.toISOString();
    
    
    
 
    var tableHTML = "<p>This is Schedule to discuss for following item.</P><br><table>" +
                        "<tr><td>Title</td><td>" + strname + "</td></tr>" +
         
                        "<tr><td>Name</td><td>" + strname + "</td></tr>" +
                        "<tr><td>Instruction Type</td><td>" + strinstructiontype + "</td></tr>" +
                        "<tr><td colspan=2>"+ strmessage + "</td></tr>"
                       "</table>";

      var strmessageWithTable = tableHTML;
 
 
    const response = fetch(
      "https://prod-57.westus.logic.azure.com:443/workflows/ecd470096b32406ca7ac19c2b8da35c5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vs7ntN3gRiiWK3DzN5_YmS5rmeVUoY23QNYkXvnyweo",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
         body: JSON.stringify({
            
            Name: strname,
            Instructiontype: strinstructiontype,
            Subject: strsubject,
            Message: strmessageWithTable,
            TimeZone: strtimezone,
            StartDate: varConvertedstartDate,
            EndDate: varConvertedendDate,
            Attendees: strattendees
          }),
      }
    ).then((response) => {
      console.log("response after fetch", response);
 
      if (response.ok) {
        // Show success message with complete details
        // Example: setIsPopup(true); with a success message
        // setIsPopup(true);
        console.log("Request successful!");
//       meetingid = response.json()["metingid'];
//get MeetingID
//then update here
       // formContext.getAttribute("cre6_meetingid").setValue(meetingid); 

      } else {
        // Handle API error
        console.log("API error:", response);
      }
    });
  } catch (error) {
    console.error("Network error:", error);
  }
  alert("itemLink");
 
  alert("Meeting created successfully by Wase!!!");
}


