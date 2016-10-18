$( "#createSceneButton" ).on( "click", function() {
  var numberOfScenes = $('#numberOfScenes').val();

  for (var i=0; i<numberOfScenes ; i++){
    var $sceneDiv = $( "<div id='scene"+(i+1)+"' class='scene'></div>" );
    $( "#stripPanel" ).append( $sceneDiv );
  }
  $( "#stripPanel" ).addClass('sceneWrapper');
  $( "#createSceneButton" ).prop("disabled",true);
  $('#numberOfScenes').prop("disabled",true);

});

//TODO need to find better way disable context menu on left click on the whole document
$('body').on('click',(event)=>{
  if($('#stripPanel .contextMenu').length>0){
    $('#stripPanel .contextMenu').remove();
  }
});
