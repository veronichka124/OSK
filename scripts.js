document.getElementById("submit").onclick = function() {submitForm()};
document.getElementById("clear").onclick = function() {clearTable()};
var table = $("#table_inputs tbody")[0];
var animateBut = document.getElementById("animate");
var process_array = [];
$('#th_priority').hide();
$('#quantum_input').hide();
$(".priority_cell").hide();

$('#select').on('change',function(){
	if( $(this).val() == "priority") {
		$('#th_priority').show();
		$(".priority_cell").show();
	}
	else {
		$('#th_priority').hide();
		$(".priority_cell").hide();
	}
	if( $(this).val() == "robin") {
		$('#quantum_input').show();
	}
	else {
		$('#quantum_input').hide();
	}
});

function submitForm() {
	//VARIABLES
	var process = $("#process").val();
	var arrival = $("#arrival").val();
	var time = $("#time").val();
    var animateBut = document.getElementById("animate");
    var selected_algorithm = $('#select').val();
    //CLEAR INPUTS
    $("#process").val('');
	$("#time").val('');
	$("#arrival").val('');

	if (process == '' || time == '') {
		alert("Aizpildiet visus obligātus laukus!");
	} else {
	    //FILL ARRAY
		process_array.push({
	    	process: process,
			time: time,
			priority: ''
	    });    

	    //INSERT INTO TABLE
	    var row = table.insertRow(table.rows.length);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);	
	    cell1.innerHTML = process;
		cell2.innerHTML = arrival;
		cell3.innerHTML = time;	
		var cell4 = row.insertCell(3);
		cell4.innerHTML = '<input type="number" min="1" name="' + process + '">';	
		cell4.setAttribute("class", "priority_cell");

		if (selected_algorithm != "priority") {			
			cell4.setAttribute("hidden", true);
		}

		animateBut.onclick = function() {
			$("#table_animation tr").empty();
			$("#table_animation").show();
			
			//SELECT ALGORITM
			var algorithm = $("#select").val();
			// FCFS ANIMATION
			if(algorithm == 'fcfs') {
				fillAnimation(process_array);
			}
			// SJF ANIMATION
			else if (algorithm == 'sjf') {
				// SORT ARRAY
				var sort_array = JSON.parse(JSON.stringify(process_array));
				sort_array.sort(compare_time);
				fillAnimation(sort_array);
			} 
			else if (algorithm == 'priority') {
				var priority_array = JSON.parse(JSON.stringify(process_array));
				priority_array.forEach(function(item,index,priority_array) {
					$(".priority_cell input").each(function(){
						console.log(item.process+':'+$(this).attr('name'));
						if(item.process == $(this).attr('name')) {
							item.priority = $(this).val();
				        }
					});
				});		
				console.log(priority_array);			
				priority_array.sort(compare_priority);
				fillAnimation(priority_array);
			}
			else if (algorithm == 'robin') {
				var quantum = $("#quantum").val();
				if (quantum== '') {
					alert("Ievadiet laika kvantu!");
				} else { 
					var robin_array = JSON.parse(JSON.stringify(process_array));
					roundRobin(robin_array, quantum);
				}
			}		
		};
	}
}

 function roundRobin(array, quantum) {
	var totalTime = 0;
	var td_process = '';	
	var td_time = '';		
	var stop_process = false;
	array.forEach(function(item,index,array) {
		totalTime += parseInt(item.time);
	});
	while(!stop_process) {
		stop_process = true;
		array.forEach(function(item,index,array) {
			if (parseInt(item.time) > 0) {

				console.log("time: " + item.time);
				console.log("quantum: " + quantum);
				if(parseInt(item.time) > quantum) {
					console.log("time is bigger");
				} else console.log("time is less");
				
				td_process += '<td style="background-color: #dddddd; width: '+ (parseInt(item.time) > quantum ? quantum : parseInt(item.time)) * 20 +'px;">'+ item.process +'</td>';
				td_time += '<td style="width: '+ (parseInt(item.time) > quantum ? quantum : parseInt(item.time)) * 20 +'px;">'+ (parseInt(item.time) > quantum ? quantum : parseInt(item.time)) +'</td>';		
				item.time -= quantum;
				stop_process = false;			
			}
		});					
	}
	$("#table_animation").html('<tr style="height: 50px; font-weight: bold;">'+td_process+'</tr>'+'<tr style="height: 20px;">'+td_time+'</tr>');		

	timer(totalTime);
	movingShape();
}

function compare_time(a, b) {
	return a.time - b.time;
}
function compare_priority(a, b) {
	return a.priority - b.priority;
}
function fillAnimation(array) {
	var totalTime = 0;
	var td_process = '';	
	var td_time = '';		
	array.forEach(function(item,index,array) {
		td_process += '<td style="background-color: #dddddd; width: '+ item.time * 20 +'px;">'+ item.process +'</td>';
		td_time += '<td style="width: '+ item.time * 20 +'px;">'+ item.time +'</td>';				
		totalTime += parseInt(item.time);
	});
	$("#table_animation").html('<tr style="height: 50px; font-weight: bold;">'+td_process+'</tr>'+'<tr style="height: 20px;">'+td_time+'</tr>');
	timer(totalTime);
	movingShape();
}

function clearTable() {
	process_array = [];
	$("#table_inputs tbody").empty();
	$("#table_animation").hide();
	$("#table_animation tr").empty();
	$("#timer strong").empty();
}

function timer(totalTime) {
	var startTime = 1;
	var draw_time = parseInt($("#table_animation").css("width")) / 100;
	var interval = 1000/(totalTime/draw_time);
	console.log(interval);
	var timer;
	function explode(){
		if(startTime == (totalTime+1)) clearInterval(timer);
	      else  {
			$("#timer strong").html(startTime);
			startTime +=1;
	      }
	}
	timer = setInterval(explode, interval);
}

function movingShape() {
	var table_param = $("#table_animation").position();
	var table_width = $("#table_animation").css("width");
	var left_param = table_param.left;
	$("#moving_shape").css("top",table_param.top);
	$("#moving_shape").css("left","0px");
	table_width = parseInt(table_width);
	
	var animation = setInterval(frame, 10);
	  function frame() {
	    if ((left_param - 10) == table_width) {
	      clearInterval(animation);
	    } else {
	      left_param++; 
	      $("#moving_shape").css("left",left_param);
	    }
	  }
}
