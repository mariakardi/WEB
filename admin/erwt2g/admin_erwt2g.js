$( function() {
    var data = [];
    var labels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });

    $('#visitCheck').change(function(){
        $('#chart_container2').html('');
	    $('<canvas id="chart_search2"></canvas>').appendTo($("#chart_container2"));
        checkChecked();
    });

    $('#caseCheck').change(function(){
        $('#chart_container2').html('');
	    $('<canvas id="chart_search2"></canvas>').appendTo($("#chart_container2"));
        checkChecked();
    });

    $('#search').on('click', function(e){
        $('#chart_container2').html('');
	    $('<canvas id="chart_search2"></canvas>').appendTo($("#chart_container2"));
        e.preventDefault();
        var date = $('#datepicker').val();
        
        if(date == ""){
            alert("Παρακαλώ επιλέξτε μια ημερομηνία");
            return;
        }

        $.ajax({
            type: "POST",
            url: "admin_erwt2g_server.php",
            data: {date_given:date},
            success: function(response){
                $('#chart_search').show();
               
                var chart_data_visits = [];
                for(i = 0 ;i <= 23; i++){
                    if(response.visits_per_hour.filter(e => e.hour == i).length <= 0){
                        response.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < response.visits_per_hour.length; i++){
                    //labels.push(response.visits_per_hour[i].hour);
                    chart_data_visits.push(response.visits_per_hour[i].num);
                }
                var chart_data_cases = [];
                for(i = 0 ;i <= 23; i++){
                    if(response.visits_per_hour.filter(e => e.hour == i).length <= 0){
                        response.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                    }
                }

                for(i = 0; i < response.cases_per_hour.length; i++){
                   // labels.push(response.cases_per_hour[i].hour);
                    chart_data_cases.push(response.cases_per_hour[i].num);
                }
                var ctx = document.getElementById('chart_search2').getContext('2d');
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
                            label: 'Μεταβολή του αριθμού επισκέψεων ανά ώρα ',
                            data: chart_data_visits,
                            backgroundColor: 'rgba(220,20,60,0.4)',
                            borderWidth: 1
                        },
                        {
                            label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ώρα ',
                            data: chart_data_cases,
                            backgroundColor: 'rgba(0,191,255,0.4)',
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
            $('#chart_search2').show();
          var visitChecked = $('#visitCheck').is(":checked");
          var caseChecked = $('#caseCheck').is(":checked");
            if(visitChecked && !caseChecked){
                var chart_data_visits = [];
                for(i = 0 ;i <= 23; i++){
                    if(data.visits_per_hour.filter(e => e.hour == i).length <= 0){
                        data.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                    }
                }
                for(i = 0; i < data.visits_per_hour.length; i++){
                    //labels.push(response.visits_per_hour[i].hour);
                    chart_data_visits.push(data.visits_per_hour[i].num);
                }
                // var labels = [];
                // var chart_data_visits = [];
                // for(i = 0; i < data.visits_per_hour.length; i++){
                //     labels.push(data.visits_per_hour[i].hour);
                //     chart_data_visits.push(data.visits_per_hour[i].num);
                // }
                var ctx = document.getElementById('chart_search2').getContext('2d');
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
                            label: 'Μεταβολή του αριθμού επισκέψεων ανά ώρα ',
                            data: chart_data_visits,
                            backgroundColor: 'rgba(220,20,60,0.4)',
                            borderWidth: 1
                        }]
                    }
                }); 
          }
          else if(!visitChecked && caseChecked){
            var chart_data_cases = [];
                for(i = 0 ;i <= 23; i++){
                    if(data.visits_per_hour.filter(e => e.hour == i).length <= 0){
                        data.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                    }
                }

                for(i = 0; i < data.cases_per_hour.length; i++){
                   // labels.push(response.cases_per_hour[i].hour);
                    chart_data_cases.push(data.cases_per_hour[i].num);
                }
            // var labels = [];
            // var chart_data_cases = [];
            // for(i = 0; i < data.cases_per_hour.length; i++){
            //     labels.push(data.cases_per_hour[i].hour);
            //     chart_data_cases.push(data.cases_per_hour[i].num);
            // }
            var ctx = document.getElementById('chart_search2').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
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
                    datasets: [
                    {
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ώρα ',
                        data: chart_data_cases,
                        backgroundColor: 'rgba(0,191,255,0.4)',
                        borderWidth: 1
                    }]
                }
            }); 
          }
          else if(visitChecked && caseChecked){
            var chart_data_visits = [];
            for(i = 0 ;i <= 23; i++){
                if(data.visits_per_hour.filter(e => e.hour == i).length <= 0){
                    data.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                }
            }
            for(i = 0; i < data.visits_per_hour.length; i++){
                //labels.push(response.visits_per_hour[i].hour);
                chart_data_visits.push(data.visits_per_hour[i].num);
            }
            var chart_data_cases = [];
            for(i = 0 ;i <= 23; i++){
                if(data.visits_per_hour.filter(e => e.hour == i).length <= 0){
                    data.visits_per_hour.splice(i-1, 0,{hour: i.toString(), num:0}); 
                }
            }

            for(i = 0; i < data.cases_per_hour.length; i++){
               // labels.push(response.cases_per_hour[i].hour);
                chart_data_cases.push(data.cases_per_hour[i].num);
            }
            // var labels = [];
            // var chart_data_visits = [];
            // for(i = 0; i < data.visits_per_hour.length; i++){
            //     labels.push(data.visits_per_hour[i].hour);
            //     chart_data_visits.push(data.visits_per_hour[i].num);
            // }
            // var chart_data_cases = [];
            // for(i = 0; i < data.cases_per_hour.length; i++){
            //     labels.push(data.cases_per_hour[i].hour);
            //     chart_data_cases.push(data.cases_per_hour[i].num);
            // }
            var ctx = document.getElementById('chart_search2').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
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
                    datasets: [{
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ώρα ',
                        data: chart_data_visits,
                        backgroundColor: 'rgba(220,20,60,0.4)',
                        borderWidth: 1
                    },
                    {
                        label: 'Μεταβολή του αριθμού επισκέψεων από κρούσματα ανά ώρα ',
                        data: chart_data_cases,
                        backgroundColor: 'rgba(0,191,255,0.4)',
                        borderWidth: 1
                    }]
                }
            }); 
          }
          else if(!visitChecked && !caseChecked){
              $('#chart_search2').hide();
          }
      }
    
  } );

