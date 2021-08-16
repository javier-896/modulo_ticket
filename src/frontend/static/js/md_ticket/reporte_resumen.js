(()=>{
    let userData =[];
    const userInfo = $('#userInfo');
    let idUser  =2;
    let table =[];
    
    
  
    const getMensajes= async()=>{
        try {
            const mensajes = await axios.get('/api/v1/mensaje/reporte/'+idUser);
            console.log(mensajes.data);
            userData = mensajes.data;
            userData.map(data =>{
            userInfo.append(`<tr>
                 <td class="mailbox-id">${data.id_bitacora}</td>
                 <td class="mailbox-name">${data.objeto}</td>
                 <td class="mailbox-subject"><b>${data.descripcion}</b></td>
                 <td class="mailbox-date"><i class="far fa-clock"></i> <i>${data.fecha_registro}</i></td>
                 <td class="text-center"><a class="btnUpdate btn btn-center"> ${data.usr_registro}</td>                    
                </tr>`          
                );            
            });
            
            //plugin data tables
          $.extend( true, $.fn.dataTable.defaults, {
              "ordering": false
          } );
               
            $(document).ready(function() {
              table = $('#reporte-resumen').DataTable({
                language:{
                  url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                pageLength: 10,
                lengthMenu: [[10,15,20,-1],[10,15,20,'Todos']],
                filter: false,
  
                //responsive: "true",
                dom: 'Bfrtilp',
                buttons: [
                  {
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf"></i>',
                    titleAttr: 'Exportar a PDF',
                    className : 'btn btn-danger',
                    title: 'Resumen de enventos',
                    messageTop: 'Este es un reporte obtenido a la fecha de: '+new Date().toLocaleDateString(),
                    exportOptions :{
                      columns: [0,1,2,3]    
                    },
                    
                    
                  },
                  {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i>',
                    titleAttr: 'Exportar a Documento Excel',
                    className : 'btn btn-success',
                    title: 'Resumen de enventos',
                    messageTop: 'Este es un reporte obtenido a la fecha de: '+new Date().toLocaleDateString(),
                    exportOptions :{
                      columns: [0,1,2,3]
                    },
                    excelStyles: {
                         template: 'header_blue'
                    }
                  }
                ],
  
                
              }
  
              );            
            });
  
        } catch (error) {
            console.error(error);
        }
          
    }
   getMensajes();
})();