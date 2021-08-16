
//alert('mensaje enviado')
(()=>{
   
  let userData =[];
  const userInfo = $('#enviado');
  let idUser =2;

  const getMensajes= async()=>{
      try {
          const mensajes = await axios.get('/api/v1/mensaje/new/'+idUser);
          //console.log(mensajes.data);
          userData = mensajes.data;
          userData.map(data =>{
          userInfo.append(`<tr>
               <td class="mailbox-id">${data.id}</td>
               <td class="mailbox-name"><b>${data.name}</b></td>
               <td class="mailbox-subject">${data.messages}</td>
               <td class="mailbox-date"><i class="far fa-clock"></i> <i>${data.date}</i></td>
               <td class="text-center"> <img src="${data.estado}"> </td>
               <td class="text-center"><a class="btnEliminar btn btn-danger">Borrar</a></td>
                  
              </tr>`
              );
            
          });
          
          $.extend( true, $.fn.dataTable.defaults, {
            "ordering": false
        } );
             
          $(document).ready(function() {
            table = $('#tickets').DataTable({
              language:{
                url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
              },
              pageLength: 10,
              lengthMenu: [[10,15,20,-1],[10,15,20,'Todos']],

              //responsive: "true",
              dom: 'Bfrtilp',
              buttons: [
                {
                  extend: 'pdfHtml5',
                  text: '<i class="fas fa-file-pdf"></i>',
                  titleAttr: 'Exportar a PDF',
                  className : 'btn btn-danger',
                  title: 'Tickets Eviados',
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
                  title: 'Tickets Eviados',
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
  
  //confiuracion para tomar los eventos
 const on = (element, event, selector, handler)=>{
   element.addEventListener(event, e=>{
     if(e.target.closest(selector)){
       handler(e)
     }
   })
 }
 // btn eliminar  ticket
 on(document,'click','.btnEliminar',async(e)=>{
     const fila = e.target.parentNode.parentNode
     const id = Number(fila.firstElementChild.innerHTML)
     console.log(fila)
     const respon =confirm('Quiere eliminar este ticket?');
    
     if (respon) {
        await axios.delete('/api/v1/mensaje/delete/'+id);
        alert('Eliminado Exitosamente');
        location.reload()
         //window.location.href="/mensajes";
     }
 })

 //ticket  leido o resuelto update
 //let id = 0


  
  on(document,'click','.btnUpdate', async(e)=>{
    const fila = e.target.parentNode.parentNode.parentNode
    const id = Number(fila.firstElementChild.innerHTML)
    console.log(id)
    const ruta_estado = "../../img/update-ticket.png";
    //alert(idTicket)
    const data={
      ruta_estado
    } 
    if (!id == ""){
      const res = (await axios.put('/api/v1/mensaje/'+id,data)).data;
      console.log(res);
      alert('Ticket Contestado');
      location.reload();
    }else{
      alert('intente de nuevo');
    }
    
  
  
 })

 $('#actualizar').on('click',function(){
  location.reload();
 })

})();
