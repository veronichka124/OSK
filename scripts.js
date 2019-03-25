document.getElementById("submit").onclick = function() {submitForm()};
document.getElementById("clear").onclick = function() {clearTable()};
var table = $("#table_inputs tbody")[0];
var animateBut = document.getElementById("animate");
var process_array = [];
// var algorithm = $("#select").val();
// 		$("#select").change(function() {	
// 			if (algorithm == "fcfs") {
				
// 			} else if (algorithm  == "sjf") {

// 			} else if (algorithm  == "sjf") {

// 			}
// 		});

function submitForm() {
	//VARIABLES
	var process = $("#process").val();
	var arrival = $("#arrival").val();
	var time = $("#time").val();
    var animateBut = document.getElementById("animate");

    $("#process").val('');
	$("#time").val('');
	$("#arrival").val('');

    //FILL ARRAY
	process_array.push({
    	process: process,
    	time: time
    });    

    //INSERT INTO TABLE
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = process;
	cell2.innerHTML = arrival;
	cell3.innerHTML = time;	

	drawAnimation(process_array);	
}


function drawAnimation(array) {	
	animateBut.onclick = function() {
		$("#table_animation tr").empty();
		$("#table_animation").show();
		
		//SELECT ALGORITM
		var algorithm = $("#select").val();
		// FCFS ANIMATION
		if(algorithm == 'fcfs') {
			fillAnimation(array);
		}
		// SJF ANIMATION
		else if (algorithm == 'sjf') {
			// SORT ARRAY
			var sort_array = JSON.parse(JSON.stringify(array));
			sort_array.sort(compare);
			fillAnimation(sort_array);
		} 
		else if (algorithm == 'priority') {
			console.log(algorithm);
		}
		else if (algorithm == 'robin') {
			console.log(algorithm);
		}		
	};
	
}
function compare(a, b){
	return a.time - b.time;
}

function fillAnimation(array) {
	var totalTime = 0;
	var td_process = '';	
	var td_time = '';		
	array.forEach(function(item,index,array) {
		td_process += '<td style="width: '+ item.time * 20 +'px;">'+ item.process +'</td>';
		td_time += '<td style="width: '+ item.time * 20 +'px;">'+ item.time +'</td>';				
		totalTime += parseInt(item.time);
	});
	$("#table_animation").html('<tr style="height: 50px; font-weight: bold;">'+td_process+'</tr>'+'<tr style="height: 20px;">'+td_time+'</tr>');
	$("#timer").html(' <p>Total time: <strong>' + totalTime + '</strong> sec</p>');
}

function clearTable() {
	$("#table_inputs tbody").empty();
	$("#table_animation").hide();
	$("#table_animation tr").empty();
	$("#timer").empty();
}
