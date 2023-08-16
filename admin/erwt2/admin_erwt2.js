$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "admin_erwt2_server.php",
        success: function(response){
            $('#tot_vis').html('Συνολικός αριθμός επισκέψεων που έχουν καταγραφεί: '+ response.tot_visits);
            $('#tot_cases').html( 'Συνολικός αριθμός κρουσμάτων που έχουν δηλωθεί: '+ response.tot_cases);
            $('#vis_cases').html('Συνολικός αριθμός επισκέψεων από κρούσματα: ' + response.vis_cases);
        },
        error: function(response){
            console.log(response);
        }
    });
});