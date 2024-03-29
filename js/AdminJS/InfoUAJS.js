$(document).ready(function(){

        requestUAData();

      $("#deleteUABtn").click(function(){

          //e.preventDefault();
          var id = $("#UAid").val();
          $.ajax({
              type:"POST",
              url:"../php/crudAdmin.php",
              data: {func: "BorrarMateria", id: id},
              cache:false,
              success:function(respAX){
                  requestUAData();
                  $('#cancelBtn').trigger('click');
                  if (respAX==1) {
                      $.notify("Materia Eliminada","success");
                  }else{
                      $.notify("No se pudo eliminar la materia :(","error");
                  }
              },
              error: function(a) {
                console.log('error:\n');
                console.log(a);
              }
          });

      });


});


function requestUAData(){

    $.ajax({
        type:"GET",
        url:"../php/getMethodsAdmin.php",
        data: {func: "SeleccionarMaterias"},
        contentType: 'application/html; charset=utf-8',
        dataType: "html",
        cache:false,
        success:function(respAX){
                $('#uaInfo').html(respAX);
        },
        error: function(a) {
            $('#uaInfo').html("<tr> <td> - </td> <td> - </td> <td> - </td> <td> - </td> </tr>");
          console.log('error:\n');
          console.log(a);
        }
    });

};

function btnDeleteUAClicked(id){
    $("#UAid").val(id);
    $("#uaName").text("UA");
}

function btnEditUAClicked(id){
    $.ajax({
        type:"GET",
        url:"../php/getMethodsAdmin.php",
        data: {func: "SeleccionarMateriaId", id: id},
        cache:false,
        success:function(respAX){

            //var AX = $.parseJSON(respAX);
            var AX = JSON.parse(respAX);
            if (AX.found) {
                $( "#adminContent" ).load( "EditarUA.php",{data: AX.data},function(){}).hide().fadeIn();
            }else{
                $.notify("No se encontró la materia :(","error");
            }
        },
        error: function(a) {
          console.log('error:\n');
          console.log(a);
        }
    });
}
