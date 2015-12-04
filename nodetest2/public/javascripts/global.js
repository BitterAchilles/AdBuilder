
var sentListData = [];
var sentences = ["this is the first sentence", "This is the second sentence"];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateStory();


});

$('#subButton').on('click',addLine);

// Functions =============================================================


function addLine(event) {
    //event.preventDefault();
    
    var errorCount = 0;
    $('#inputBox').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newLine = {
            'content': $('#inputBox').val(),
            
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newLine,
            url: '/users/addline',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                alert("success?")
                // Clear the form inputs
                $('#inputBox').val('');

                // Update the table
                populateStory();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};






// Fill table with data
function populateStory() {
    

    // jQuery AJAX call for JSON
    $.getJSON( '/users/sentlist', function( data ) {

        // For each item in our JSON, push to sentence array
        $.each(data, function(){
          
            sentences.push(this.content);
        });
        var last= sentences[sentences.length-1];
        
                

        // Inject the whole content string into our existing HTML table
        $('#prompt').html(last);
    });
};



