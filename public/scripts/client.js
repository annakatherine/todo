console.log( 'hello from js' );
$(document).ready(function(){
  console.log( 'hello from jquery' );
var allTasks = [];
$( '#newTaskButton' ).on( 'click', function() {
  console.log( 'newTaskButton clicked' );
  var newTaskName = $( '#newTask' ).val();
  //make object
  var taskIn = {
    'task': newTaskName,
    'completed': false
  };
    console.log( 'taskIn: ' + taskIn.task );
    //ajax call to post on db
    $.ajax({
      type: 'POST',
      url: '/toDo',
      data: taskIn,
      success: function( data ){
        displayTasks( data );
      }
    

  //   $.ajax({
  //     type: 'GET',
  //     url: '/todoList',
  //     success: function( data ){
  //   displayTasks( data );
  // }
});//end ajax
});//end onclick add


// $('#completedButton').on('click', function(){
//   console.log( 'completed button clicked' );
// });

$('#getTasks').on('click', function(){
  $.ajax({
    type: 'GET',
    url: '/todoList',
    success: function( outputData ){
      console.log( 'from get ajax outputData: ' + outputData );
  displayTasks( outputData );
} //end of success
});//end of ajax
}); //end of get tasks onclick

var displayTasks = function ( tasks ){
  console.log( 'inside displayTasks, tasks: ' + tasks.task + " " + tasks.completed );
  console.log( 'tasks.length: ' + tasks.length );

      for (var i = 0; i < tasks.length; i++) {
        // console.log( 'tasks.length: ' + tasks.length );
        var list = document.createElement('div');
            var task = "<th>" + tasks[ i ].task + "</th>";
            task.textContent = task;
            $('#outputDiv').append( task );
            var completedButton = "<button id='completedButton' data-id='" + tasks[ i ].id + "'> Completed " + "</button>";
            $('#outputDiv').append( completedButton );
            var deleteButton = "<button id='deleteButton' data-id='" + tasks[ i ].id + "'>Delete " + "</button>";
            $('#outputDiv').append( deleteButton );
        // var list = document.createElement( 'div' );
        // list.textContent = tasks[i].task + "       ";
        // list.className = 'list';
        // var completedButton = document.createElement( 'button' );
        // completedButton.id = 'completedButton';
        // completedButton.textContent = 'Completed';
        // completedButton.className = 'completedButtons';
        // var deleteButton = document.createElement( 'button' );
        // deleteButton.textContent = 'Delete';
        // deleteButton.className = 'deletedButtons';
        // deleteButton.id = 'deleteButtonId';
        // list.appendChild( completedButton );
        // list.appendChild( deleteButton );
        // $('#outputDiv').append( list );

        // var list = "<tr>" + "<td>" + 'Task: ' + tasks[i].task + "</td>" + "<td>" + " " + 'Completed: ' + tasks[i].completed + "<td>" + "</tr>";
        // $('#outputDiv').append( list );
      }
    }; //end of displayTasks function


  $( "#outputDiv" ).on( 'click', '#deleteButton', function(){
    console.log('inside deleteButton');
      var deleteTask = $(this).attr('data-id');
        console.log("this id = " + deleteTask);

        var deletedTask = {
          "id": deleteTask
        }; // close object

        $.ajax({
          type: 'POST',
          url: '/deleteTask',
          data: deleteTask
        }); // end ajax
        $(this).remove();
  }); // end delete button

});//end of Jquery
