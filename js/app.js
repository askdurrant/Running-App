// VARIABLES

var userName;
var i=0;
var labelArray = [];
var userDateArray = [];
var userTimesArray = [];
var userTimesArrayList = [];

var localName;
var userTimesArrayEdited;


// ENTER AND STORE NAME

function submitName(){
  userName = document.getElementById('welcome-name').value;
  if (userName == ""){
    $('#welcome-name').addClass('required');
  }
  else{
    console.log(userName);
    $("#welcome-message h2").append(userName);
    $("#welcome-enter-name").hide();
    $("#welcome-message").show();
    localStorage.setItem("localName", userName);
    console.log(localStorage.localName);
  }
}


// TARGET VIEW - SUBMIT DATA

function submitTarget(){
  userDistance = document.getElementById('target-distance').value;
  userTimeHours = document.getElementById('target-time-hours').value;
  userTimeMinutes = document.getElementById('target-time-minutes').value;
  userDistanceUnit = $('input[name=distance]:checked', '#target-radio').val();

  timeMinsToHours = userTimeMinutes / 60;
  totalTime = parseFloat(userTimeHours) + parseFloat(timeMinsToHours);

  console.log(userDistanceUnit);
  console.log(userDistance);
  console.log(totalTime);


  $('#target-distance').removeClass('required');
  $('#target-time-hours').removeClass('required');
  $('#target-time-minutes').removeClass('required');

  if(userDistance == 0 && totalTime == 0){
    $('#target-distance').addClass('required');
    $('#target-time-hours').addClass('required');
    $('#target-time-minutes').addClass('required');
    return false;
  }
  else if(userDistance == 0){
    $('#target-distance').addClass('required');
    return false;
  }
  else if(totalTime == 0){
    $('#target-time-hours').addClass('required');
    $('#target-time-minutes').addClass('required');
    return false;
  }
  else{
    $('#target').hide();
    $('#results').show();
    $('#graph').show();
    $('body').css('-webkit-animation', 'changeColour2 1s').css('background', '#DD9050');

    var speed = userDistance / totalTime;
    var speedFixed = speed.toFixed(2);
    $('#results-speed').append(speedFixed + userDistanceUnit + '/h');

    $('#results-distance').append(userDistance + userDistanceUnit);
    $('#results-time').append(userTimeHours + 'h ').append(userTimeMinutes + 'mins');

    var timePerUnit = (totalTime / userDistance) * 60;
    var timePerUnitFixed = timePerUnit.toFixed(2);
    $('#results-timePerUnit').append(userDistanceUnit + ': ' + timePerUnitFixed + ' minutes');
  }
};


// SUBMIT TIMES

function submitSaveTimes(){

  userDate = document.getElementById('datepicker').value;
  userTimesHour = (document.getElementById('results-user-time-hour').value);
  userTimesMin = document.getElementById('results-user-time-min').value;
  userTimesSec = document.getElementById('results-user-time-sec').value;

  userTimesHourInMins = userTimesHour * 60;

  userTimes = parseFloat(parseFloat(userTimesHourInMins) + parseFloat(userTimesMin) + '.' + userTimesSec);
  userTimeForList = userTimesHour + ':' + userTimesMin + ':' + userTimesSec;
  console.log(userTimes);

  $('#target-distance').removeClass('required');
  $('#target-time-hours').removeClass('required');
  $('#target-time-minutes').removeClass('required');

  if(userDate !== "" && userTimes !== "" && userTimes !== "0:00:00"){
    userDateArray.push(userDate);
    userTimesArrayList.push(userTimeForList);
    userTimesArray.push(userTimes);

    document.getElementById('user-date-list').innerHTML += '<li>' + userDateArray[i] + '</li>';
    document.getElementById('user-times-list').innerHTML += '<li>' + userTimesArrayList[i] + '</li>';
    
    // CHECK IF STILL NEED!!
    i++;
    labelArray.push(i);

    $('#datepicker').val("");
    $('#results-user-time').val("");

    drawChart();
    return userTimesArray;

    $('#target-distance').removeClass('required');
    $('#target-time-hours').removeClass('required');
    $('#target-time-minutes').removeClass('required');

  }
  else{
    $('#datepicker').addClass('required');
    $('#results-user-time').addClass('required');
  }

}

//GRAPH
function graphTimes(){

  var graphLabel;
  var ctx = document.getElementById("runningChart").getContext("2d");
  var data = {
    labels: userDateArray,
    datasets: [
        {
            label: "Running Times",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: userTimesArray
        }
    ]
  };

  var options ={
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(255,255,255,.08)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot : true,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    responsive: true,
    scaleLineColor: "rgba(255,255,255,.8)",
    scaleFontColor: "#fff",
    tooltipFontFamily: "Open Sans",
    tooltipFontSize: 16,
  };

  var myLineChart = new Chart(ctx).Line(data, options);

};


//CHECKS NO. OF TIMES AND CALLS graphTIMES
function drawChart(){
  if(labelArray.length > 1){
    $('#p-graph').hide();
    graphTimes();
  }
}


//Date Picker
      
$(function() {
    $( "#datepicker" ).datepicker();
 });


// Continue

$('.continue').click(function(){
  $('#welcome').hide();
  $('#target').show();
  $('body').css('-webkit-animation', 'changeColour 1s').css('background', '#308585');
});


//Radio Buttons

$('#target-radio input:radio').addClass('input_hidden');
$('#target-radio label').click(function() {
    $(this).addClass('selected').siblings().removeClass('selected');
});
