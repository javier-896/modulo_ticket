
(()=>{
    
    let userData =[];
    const userInfo = $('#Agendacontacto');
       let id  = 2;
    const getAgenda= async()=>{
        try {
            const mensajes = await axios.get('/api/v1/mensaje/agenda/'+id)
            
  
            console.log(mensajes.data);
            userData = mensajes.data;
            userData.map(data =>{
            userInfo.append(`<tr>
                                           
            <td >${data.id_person2}</a></td>
            <td >${data.nombre}</a></td>
            <td >${data.ncuenta}</td>
            <td >${data.nameasig}</td>
            <td >${data.seccion}</td>
            
            <td>
            <a " type="submit"  style="margin: 5px"
            class="btn btn-warning" data-toggle="modal" data-target="#Modal1" id="btnmodal"
             data-id="${data.id_person2}" 
            data-no="${data.nombre}" data-as="${data.id_asig}" data-rol="${data.rol}"  >
            <i class="fa fa-external-link-square" aria-hidden="true"></i>
            </a>`);
           
            });
        } catch (error) {
            console.error(error);
        }
    }
    getAgenda();
  
   // Filtro de busqueda
  var busqueda = document.getElementById('buscar');
  var table = document.getElementById('agendatable').tBodies[0];

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



    let ruta=[];// variable para el almacenamiento de la ruta de imagen
    let public=[];
   //subida de la imagen a un servidor externo
    const imageview =document.getElementById('img-view');
    const imageUploader = document.getElementById('almacenamiento');
    const progresbar = document.getElementById('progres-image');
   
    const claudinary_url =' https://api.cloudinary.com/v1_1/sistemadecalificaciones21/image/upload'; //url de nuestro servidor externo de img
    const cloudinary_preset = 'coskyte8';
   
     imageUploader.addEventListener('change', async (e)=>{
          const file = e.target.files[0];
   
           const formData = new FormData();
           formData.append('file', file);
           formData.append('upload_preset', cloudinary_preset);
   
          const res = await axios.post(claudinary_url, formData,{
              headers: {
                  'Content-Type': 'multipart/form-data'
              }, onUploadProgress(e) {
             
               const progres = (e.loaded * 100)/e.total;
               progresbar.setAttribute('value',progres);
           }
          });
           console.log(res);
           imageview.src = res.data.secure_url;
           ruta = res.data.secure_url;
           public=res.data.public_id;
     });
  



  
  
  
    
  //enviar los parametros al modal
    
  $('#Modal1').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)  // Botón que activó el modal
       var nombre = button.data('no');// Extraer la información de atributos de datos
        var id= button.data('id') ;
       var asi= button.data('as') ;
       var rl= button.data('rol') ;
        var modal = $(this);
        modal.find('#nombre').text(nombre);
        modal.find('#person2').val(id);
        modal.find('#asig').val(asi);
        modal.find('#rol').text(rl);
         $('#Modal1').modal('show');
      });
   

  // enviar un nuevo ticket desde el modal
  
  
  
  $('#Modalmensaje').on('submit', async function(evento){
   
          evento.preventDefault(); //cancela que la pagina se recargue
          
      
          const descripcion = $('#descripcion').val();
          const almacenamiento = String(ruta);
          const person1 = id;
          const person2 = $('#person2').val();
          const asig = $('#asig').val();
          const public_id = String(public);
          const ruta_estado = "../../img/no-resuelto.png";
        
          if(descripcion.length >= 4 && descripcion.length <=250){
              const data ={
                  descripcion,
                  almacenamiento,
                  person1,
                  person2,
                  asig,
                  public_id,
                  ruta_estado
              }
              try{
                  const res = (await axios.post('/api/v1/mensaje/', data)).data;
                  console.log(res);
                   alert('Mensaje Enviado Exitosamente!');
                  // window.location.href="/mensajeNuevo";                 
              }catch(error){
                  console.log(error);
              }
          }else{
           alert('Algo salio mal!');   
          }
    });
  
  // codigo para limpiar el modal 
  $('#Modal1').on('hidden.bs.modal', function (e) {
    imageview.src = "../../img/placeholder.png";
    progresbar.value = "0";   
  document.getElementById("Modalmensaje").reset(); 
  })
  
   
  })();