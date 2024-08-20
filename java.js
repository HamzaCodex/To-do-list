
$(document).ready (function(){
    var currentrow;//global row variable

    //From submitted here
    $('#taskForm').submit(function(event){
        event.preventDefault();
        var task = $('#taskName').val().trim();
        var description  = $('#taskDescription').val();
        var priority = $('input[name=Priority]:checked').val();

        //function add to table called
      addtasktotable(task,priority,description)
      //clear form fields
      $('#taskName').val('');
      $('#taskDescription').val('');
      $('input[name=Priority]').prop('checked', false);

      $('#exampleModal').modal('hide')
    })

    //fucntion
    function addtasktotable(task,priority,description){

        //table handling
        var table = $('#mytable').find('tbody')[0];
        var row = table.insertRow(0);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);


        //priority logic
        var prioritybadge = '';

        if(priority === 'low'){
            prioritybadge = '<span class="badge text-bg-primary custom-tag">Low</span>';

        }
        else if(priority === 'Medium'){
            prioritybadge = '<span class="badge text-bg-warning custom-tag">Medium</span>'
        }
        else if(priority === 'High'){
            prioritybadge = '<span class="badge text-bg-danger custom-tag">High</span>'
        }

        //row actions button
        $(cell1).text(task)
        $(cell2).html(prioritybadge)
        $(cell3).html(`<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-description= "${description}" id="View" type="button">View</button>,
            <button class="btn btn-warning" id="Edit" data-bs-toggle = "modal" data-bs-target="#exampleModal3" data-description= "${description}" type="button">Edit</button>,
            <button class="btn btn-danger" id="Delete" type="button">Delete</button> `)

    //view modal handling
    $('#View').click(function() {
        var row = $(this).closest('tr');
        var task = row.find('td').eq(0).text();
        var description = $(this).data('description');
        var priority = row.find('td').eq(1).html();

        // Populating view modal
        $('#exampleModalLabel2').text(task); // Fixing the modal title
        $('.viewmodalbodytext').text(description);
        $('.viewtextmodal').html(priority);
    });

        //edit modal handling
        $('#Edit').click(function(){

         currentrow = $(this).closest('tr'); // identifying row
            var task = currentrow.find('td:eq(0)').text(); // get task
             description = $(this).data('description');//get description

            //populating the inputs
            $('#editName').val(task)
            $('#edittaskDescription').val(description)
            $('input[name=editPriority][value = "' + priority + '"]').prop('checked',true)
        })
        
        //edit form submit
        $('#EditForm').on('submit', function(event) {
            event.preventDefault(); 
        
            currentrow.find('td:eq(0)').text($('#editName').val());
            var updateddescription =  $('#edittaskDescription').val();
            currentrow.find('#Edit,#View').data('description',updateddescription);
            var selectedPriority = $('input[name=editPriority]:checked').val();
            var color;
            if (selectedPriority === 'low') {
                color = 'primary';
            } else if (selectedPriority === 'Medium') {
                color = 'warning';
            } else if (selectedPriority === 'High') {
                color = 'danger';
            }
            var format = '<span class="badge text-bg-'+color+' custom-tag">' + selectedPriority + '</span>';
            currentrow.find('td:eq(1)').html(format)
            $('.viewtextmodal').html(format)
            $('#exampleModal3').modal('hide')
        });
        $('#Delete').click(function(){
            var row = $(this).closest('tr');
            row.remove();
        })

    }
})
