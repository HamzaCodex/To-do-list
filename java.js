$(document).ready(function() {
    var currentRow; // Global row variable
    var num = 0;

    // Form submission handling
    $('#taskForm').submit(function(event) {
        event.preventDefault();
        var task = $('#taskName').val().trim();
        var description = $('#taskDescription').val();
        var priority = $('input[name=Priority]:checked').val();

        // Function to add task to table
        addTaskToTable(task, priority, description);

        // Clear form fields
        $('#taskName').val('');
        $('#taskDescription').val('');
        $('input[name=Priority]').prop('checked', false);

        $('#exampleModal').modal('hide');
    });

    // Function to add task to the table
    function addTaskToTable(task, priority, description) {
        // Table handling
        var table = $('#mytable').find('tbody')[0];
        var row = table.insertRow(0);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        // Priority logic
        var priorityBadge = '';
        if (priority === 'low') {
            priorityBadge = '<span class="badge text-bg-primary custom-tag">Low</span>';
        } else if (priority === 'Medium') {
            priorityBadge = '<span class="badge text-bg-warning custom-tag">Medium</span>';
        } else if (priority === 'High') {
            priorityBadge = '<span class="badge text-bg-danger custom-tag">High</span>';
        }

        // Generate unique ID for each switch
        for(let i = 0; i < 1; i++){
            num++;
            console.log(num); 
        }
        var switchId = 'flexSwitchCheck' + num;
        console.log(switchId)

        // Row actions button
        $(cell1).html(`
            <div class="d-flex justify-content-center align-items-center">
            <div class="form-check form-switch form-check-lg">
                <input class="form-check-input switch-checkbox" type="checkbox" role="switch" id="${switchId}">
                <label class="form-check-label" for="${switchId}"></label>
            </div>
            </div>
        `);
        $(cell2).text(task);
        $(cell3).html(priorityBadge);
        $(cell4).html(`
            <button class="btn btn-primary view-btn" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-description="${description}" type="button">View</button>
            <button class="btn btn-warning edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-description="${description}" type="button">Edit</button>
            <button class="btn btn-danger delete-btn" type="button">Delete</button>
        `);
        updateSwitchState(switchId)
    }

    // Function to update switch state
    function updateSwitchState(switchElement) {
        var completed = $(switchElement).is(':checked');
        var row = $(switchElement).closest('tr');
        if (completed) {
            row.removeClass('row-notcompleted').addClass('row-completed');
        }
        else{
            row.removeClass('row-completed').addClass('row-notcompleted');
        }
    }


    // Delegate event handling for dynamically added buttons
    $('#mytable').on('click', '.view-btn', function() {
        var row = $(this).closest('tr');
        var task = row.find('td').eq(1).text();
        var description = $(this).data('description');
        var priority = row.find('td').eq(2).html();

        // Populating view modal
        $('#exampleModalLabel2').text(task); // Fixing the modal title
        $('.viewmodalbodytext').text(description);
        $('.viewtextmodal').html(priority);
    });

    $('#mytable').on('click', '.edit-btn', function() {
        currentRow = $(this).closest('tr'); // Identifying row
        var task = currentRow.find('td:eq(1)').text(); // Get task
        var description = $(this).data('description'); // Get description

        // Populating the inputs
        $('#editName').val(task);
        $('#edittaskDescription').val(description);
        var priority = currentRow.find('td:eq(2)').text().toLowerCase();
        $('input[name=editPriority][value="' + priority + '"]').prop('checked', true);
    });

    // Edit form submit
    $('#EditForm').on('submit', function(event) {
        event.preventDefault();
        currentRow.find('td:eq(1)').text($('#editName').val());
        var updatedDescription = $('#edittaskDescription').val();
        currentRow.find('.edit-btn, .view-btn').data('description', updatedDescription);
        var selectedPriority = $('input[name=editPriority]:checked').val();
        var color;
        if (selectedPriority === 'low') {
            color = 'primary';
        } else if (selectedPriority === 'Medium') {
            color = 'warning';
        } else if (selectedPriority === 'High') {
            color = 'danger';
        }
        var format = '<span class="badge text-bg-' + color + ' custom-tag">' + selectedPriority + '</span>';
        currentRow.find('td:eq(2)').html(format);
        $('.viewtextmodal').html(format);
        $('#exampleModal3').modal('hide');
    });

    $('#mytable').on('click', '.delete-btn', function() {
        $(this).closest('tr').fadeOut(400)
    });

    // Handle switch state change
    $('#mytable').on('change', '.switch-checkbox', function() {
        updateSwitchState(this);
    });
});
