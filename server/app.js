var express=require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser=require( 'body-parser' );
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg = require( 'pg' );
//connection string to the database        v DB NAME v
var conString = 'postgres://localhost:5432/tododatabase';
require('events').EventEmitter.prototype._maxListeners = 100;


app.listen( 3000, 'localhost', function( req, res) {
  console.log( 'server listening on 3000' );
});

app.get('/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html')
);
});

app.post('/toDo', urlencodedParser, function( req, res ){
  pg.connect( conString, function( err, client, done) {
    var testVar = client.query( 'INSERT INTO dbtable ( task, completed ) VALUES( $1, $2 )', [ req.body.task, req.body.completed ]);
      testVar.on('end', function(){
        return res.end();
      });
      // res.send( true );
      done();
  }); //end pg.connect
}); //end add task post

app.post( '/deleteTask', urlencodedParser, function( req, res ){
  console.log( 'in POST deleteTask: ' + req.body.task + " " + req.body.id );
  pg.connect( conString, function( err, client, done ){
    client.query('DELETE from dbtable WHERE id=($1)', [req.body.id]);

done();
  });
});

app.get('/todoList', urlencodedParser, function( req, res ){
  console.log( 'in get list call' );
  var results = [];
  pg.connect( conString, function( err, client, done ){
    var returnedTasks = client.query( 'SELECT * FROM dbtable;' );
    console.log( 'returnedTasks: ' + returnedTasks );
    var rows = 0;
    returnedTasks.on( 'row', function( row ){
      results.push( row );
      returnedTasks.on( 'end', function(){
        return res.json( results );
      }); //end returnedTasks.on end
    }); //end returnedTasks.on push
  }); //end pg.connect
}); //end app.get

app.use( express.static( 'public' ) );
