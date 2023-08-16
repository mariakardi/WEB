$( function() {
    var data = [];
    const labels = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
    $( "#datepickerFrom" ).datepicker({ dateFormat: 'yy-mm-dd' });
    $( "#datepickerTo" ).datepicker({ dateFormat: 'yy-mm-dd' });

    $('#visitCheck').change(function(){
        $('#chart_container').html('');
	    $('<canvas id="chart_search"></canvas>').appendTo($("#chart_container"));
        checkChecked();
    });

    $('#caseCheck').change(function(){
        $('#chart_container').html('');
	    $('<canvas id="chart_search"></canvas>').appendTo($("#chart_container"));
        checkChecked();
    });

    $('#search').on('click', function(e){
        $('#chart_container').html('');
	    $('<canvas id="chart_search"></canvas>').appendTo($("#chart_container"));
        e.preventDefault();
        var dateFrom = $('#datepickerFrom').val();
        var dateTo = $('#datepickerTo').val();
        
        if(dateFrom == "" || dateTo == ""){
            alert("Παρακαλώ επιλέξτε μια ημερομηνία");
            return;
        }

        var dateF = new Date(dateFrom);
        var dateT = new Date(dateTo);

        if(dateF >= dateT){
            alert("Η ημερομηνία από πρέπει να είναι μικρότερη από την ημερομηνία έως");
            return;
        }

        $.ajax({
            type: "POST",
            url: "admin_erwt2f_server.php",
            data: {dateFrom:dateFrom, dateTo: dateTo},
            success: function(response){
                console.log(response);
                
                $('#chart_search').show();
                //var labels = [];
                var chart_data_visits = [];
                for(i = 1 ;i <= 7; i++){
                    if(response.visits_per_day.filter(e => e.day == i).length <= 0){
                        response.visits_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < response.visits_per_day.length; i++){
                    
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_visits.push(response.visits_per_day[i].num);
                }
                var chart_data_cases = [];
                for(i = 1 ;i <= 7; i++){
                    if(response.cases_per_day.filter(e => e.day == i).length <= 0){
                        response.cases_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < response.cases_per_day.length; i++){
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_cases.push(response.cases_per_day[i].num);
                }
                var ctx = document.getElementById('chart_search').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    options: {
                        scales: {
                
                         yAxes: [{
                            display: true,
                            scaleLabel: {
                               show: true
                            },
                            gridLines:{
                               color:"#ecedef"
                            },
                            ticks: {
                               beginAtZero:true,
                               stepSize: 1,
                               fontColor:"#8f9092",
                            }
                         }]
                        },
                      legend: {
                         position:'bottom'
                       }
                    },
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Μεταβολή του αριθμού επισκέψεων ανά ημέρα ',
                            data: chart_data_visits,
                            backgroundColor: 'rgba(220,20,60,0.4)',//red
                            borderWidth: 1
                        },
                        {
                            label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ημέρα ',
                            data: chart_data_cases,
                            backgroundColor: 'rgba(0,191,255,0.4)',//blue
                            borderWidth: 1
                        }]
                    }
                }); 
                $('#visitDiv').show();
                $('#casesDiv').show();
                data = response;
            },
            error: function(response){
                console.log(response);
            }
        });
      });

      function checkChecked(){
            $('#chart_search').show();
          var visitChecked = $('#visitCheck').is(":checked");
          var caseChecked = $('#caseCheck').is(":checked");
            if(visitChecked && !caseChecked){
                var chart_data_visits = [];
                for(i = 1 ;i <= 7; i++){
                    if(data.visits_per_day.filter(e => e.day == i).length <= 0){
                        data.visits_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < data.visits_per_day.length; i++){
                    
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_visits.push(data.visits_per_day[i].num);
                }
                // var labels = [];
                // var chart_data_visits = [];
                // for(i = 0; i < data.visits_per_day.length; i++){
                //     labels.push(data.visits_per_day[i].day);
                //     chart_data_visits.push(data.visits_per_day[i].num);
                // }
                var ctx = document.getElementById('chart_search').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    options: {
                        scales: {
                
                         yAxes: [{
                            display: true,
                            scaleLabel: {
                               show: true
                            },
                            gridLines:{
                               color:"#ecedef"
                            },
                            ticks: {
                               beginAtZero:true,
                               stepSize: 1,
                               fontColor:"#8f9092",
                            }
                         }]
                        },
                      legend: {
                         position:'bottom'
                       }
                    },
                    data: {
                        labels: labels,
                        
                        datasets: [{
                            label: 'Μεταβολή του αριθμού επισκέψεων ανά ημέρα ',
                            data: chart_data_visits,
                            backgroundColor: 'rgba(220,20,60,0.4)',
                            borderWidth: 1
                        }]
                    }
                }); 
          }
          else if(!visitChecked && caseChecked){
            var chart_data_cases = [];
                for(i = 1 ;i <= 7; i++){
                    if(data.cases_per_day.filter(e => e.day == i).length <= 0){
                        data.cases_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < data.cases_per_day.length; i++){
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_cases.push(data.cases_per_day[i].num);
                }
            // var labels = [];
            // var chart_data_cases = [];
            // for(i = 0; i < data.cases_per_day.length; i++){
            //     labels.push(data.cases_per_day[i].day);
            //     chart_data_cases.push(data.cases_per_day[i].num);
            // }
            var ctx = document.getElementById('chart_search').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                options: {
                    scales: {
            
                     yAxes: [{
                        display: true,
                        scaleLabel: {
                           show: true
                        },
                        gridLines:{
                           color:"#ecedef"
                        },
                        ticks: {
                           beginAtZero:true,
                           stepSize: 1,
                           fontColor:"#8f9092",
                        }
                     }]
                    },
                  legend: {
                     position:'bottom'
                   }
                },
                data: {
                    labels: labels,
                    datasets: [
                    {
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ημέρα ',
                        data: chart_data_cases,
                        backgroundColor: 'rgba(0,191,255,0.4)',
                        borderWidth: 1
                    }]
                }
            }); 
          }
          else if(visitChecked && caseChecked){
            var chart_data_visits = [];
                for(i = 1 ;i <= 7; i++){
                    if(data.visits_per_day.filter(e => e.day == i).length <= 0){
                        data.visits_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < data.visits_per_day.length; i++){
                    
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_visits.push(data.visits_per_day[i].num);
                }
                var chart_data_cases = [];
                for(i = 1 ;i <= 7; i++){
                    if(data.cases_per_day.filter(e => e.day == i).length <= 0){
                        data.cases_per_day.splice(i-1, 0,{day: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < data.cases_per_day.length; i++){
                    //labels.push(days[response.visits_per_day[i].day - 1]);
                    chart_data_cases.push(data.cases_per_day[i].num);
                }
            // var labels = [];
            // var chart_data_visits = [];
            // for(i = 0; i < data.visits_per_day.length; i++){
            //     labels.push(data.visits_per_day[i].day);
            //     chart_data_visits.push(data.visits_per_day[i].num);
            // }
            // var chart_data_cases = [];
            // for(i = 0; i < data.cases_per_day.length; i++){
            //     labels.push(data.cases_per_day[i].day);
            //     chart_data_cases.push(data.cases_per_day[i].num);
            // }
            var ctx = document.getElementById('chart_search').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                options: {
                    scales: {
            
                     yAxes: [{
                        display: true,
                        scaleLabel: {
                           show: true
                        },
                        gridLines:{
                           color:"#ecedef"
                        },
                        ticks: {
                           beginAtZero:true,
                           stepSize: 1,
                           fontColor:"#8f9092",
                        }
                     }]
                    },
                  legend: {
                     position:'bottom'
                   }
                },
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ημέρα ',
                        data: chart_data_visits,
                        backgroundColor: 'rgba(220,20,60,0.4)',
                        borderWidth: 1
                    },
                    {
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ημέρα ',
                        data: chart_data_cases,
                        backgroundColor: 'rgba(0,191,255,0.4)',
                        borderWidth: 1
                    }]
                }
            }); 
          }
          else if(!visitChecked && !caseChecked){
              $('#chart_search').hide();
          }
      }
    
  } );