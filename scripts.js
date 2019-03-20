document.getElementById("submit").onclick = function() {submitForm()};
document.getElementById("clear").onclick = function() {clearTable()};
var table = document.getElementById("table").getElementsByTagName('tbody')[0];
var animateBut = document.getElementById("animate");
var process_array = [];
var pressedAnimate = false;

//SELECT ALGORITM
$("#select").change(function() {
	if ($("#select").val() == "FCFS") {
		$("#time").prop( "disabled", true )
	} else if ($("#select").val()  == "SJF") {
		$("#time").prop( "disabled", false )
	}
});


function submitForm() {
	//VARIABLES
	var process = document.getElementById("process").value;
	var time = document.getElementById("time").value;
	var spurta = document.getElementById("spurta").value;
    var animateBut = document.getElementById("animate");

    document.getElementById("process").value = '';
	document.getElementById("time").value = '';
	document.getElementById("spurta").value = '';

    //FILL ARRAY
    if (pressedAnimate == 0) {
    	process_array.push({
	    	process: process,
	    	time: time
	    });
    } else if (pressedAnimate == 1) {
    	process_array = [];
    	process_array.push({
	    	process: process,
	    	time: time
	    });
	    process_array = false;
    }
    


    //INSERT INTO TABLE
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = process;
	cell2.innerHTML = time;
	cell3.innerHTML = spurta;

	

	animateButton(process_array);	
}

	// SORT
	// array.sort(function(a, b){
	//   return a.y - b.y;
	// });

function animateButton(array) {
	
	var process_array = array;
	// console.log(process_array);
	
	animateBut.onclick = function() {
		$("#table_animation").show()
		var count = array.length;
		pressedAnimate = true;

		array.forEach(function(item,index,array) {
			// console.log(count); 
			//FCFS RESULT ANIMATION
			var row = document.getElementById("result");
			var x = row.insertCell(array.length - count);
			x.innerHTML = item.process;
			count--;
		});
	};
	
}

function clearTable() {
	table.remove();
	$("#table_animation").hide();
	$("#table_animation tr").empty();
}