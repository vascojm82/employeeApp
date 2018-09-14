$( document ).ready(function() {
 var db,
     timesheetTable = $('.timesheet-table tbody');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDS60z9Rui-EkBU3sM5wLU2iQn22r8DZO8",
    authDomain: "timesheet-6e4b2.firebaseapp.com",
    databaseURL: "https://timesheet-6e4b2.firebaseio.com",
    projectId: "timesheet-6e4b2",
    storageBucket: "timesheet-6e4b2.appspot.com",
    messagingSenderId: "78664055004"
};
      
firebase.initializeApp(config);

db = firebase.database().ref();

db.on('child_added', function(childSnapshot, prevChildKey) {    //Retrieve all JSON objects in the DB when the page loads, then do so only when a new JSON object is pushed to the DB
    var newTr = $("<tr>");
    newTr.append($("<td> " + childSnapshot.val().employeeName_ + "</td>"));
    newTr.append($("<td> " + childSnapshot.val().role_ + "</td>"));
    newTr.append($("<td> " + childSnapshot.val().startDate_ + "</td>"));
    newTr.append($("<td> " + childSnapshot.val().monthlyRate_ + "</td>"));
    timesheetTable.append(newTr);
});

$('.btn-submit').click(function(){
    event.stopPropagation();

    var employeeName = $('#employeeName').val().trim(),
        role = $('#role').val().trim(),
        startDate = $('#startDate').val().trim(),
        monthlyRate = $('#monthlyRate').val().trim();

    db.push({       //Firebase automatically generates a unique ID for each JSON object pushed into the DB
        employeeName_: employeeName,
        role_: role,
        startDate_: startDate,
        monthlyRate_: monthlyRate
    });
})
});

