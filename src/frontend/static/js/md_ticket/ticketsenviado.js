
//alert('mensaje enviado')
(()=>{
   
  let userData =[];
  const userInfo = $('#enviado');
  let idUser  =15;

  const getMensajes= async()=>{
      try {
          const mensajes = await axios.get('/api/v1/mensaje/new/'+idUser);
          //console.log(mensajes.data);
          userData = mensajes.data;
          userData.map(data =>{
          userInfo.append(`<tr>
               <td class="mailbox-id">${data.id}</td>
               <td class="mailbox-name"><a href= "/verticket/${data.id}">${data.name}</a></td>
               <td class="mailbox-subject"><b>${data.messages}</b></td>
               <td class="mailbox-date"><i class="far fa-clock"></i> <i>${data.date}</i></td>
               <td class="text-center"> <img src="${data.estado}"> </td>
               <td class="text-center"><a class="btnEliminar btn btn-danger">Borrar</a></td>
                  
              </tr>`
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

 // Filtro de busqueda
  var busqueda = document.getElementById('buscar');
  var table = document.getElementById("tickets").tBodies[0];

    buscaTabla = function(){
      texto = busqueda.value.toLowerCase();
      var r=0;
      while(row = table.rows[r++])
      {
        if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
          row.style.display = null;
        else
          row.style.display = 'none';
      }
    }

    busqueda.addEventListener('keyup', buscaTabla);

  //paguinacion de la tabla

})();
