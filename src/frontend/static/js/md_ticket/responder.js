(()=>{
    
    let userDatos =[];
    const Info = $('#messages');  // id para desplegar los mensajes
    const title = $('#titleTicket'); // id de title
    const Image =$('#img-preview'); // id del campo img
    const dateT = $('#fecha-ticket');

    let idMensaje  = Number(window.location.pathname.split('/')[2]);//traer el id dado de la pantalla  mensaje
    let IdPerson2 = []; // variable para guardar el id de la persona a responderle el ticket
    let idAsignatura =[];
    let idemisor =[];

    const getMensajeinfo= async()=>{//mostrar datos del mensaje en la pantalla
        try {
            const mensajes = await axios.get('/api/v1/mensaje/mjs/'+idMensaje);
            console.log(mensajes.data);
            const idPersona = Number(mensajes.data[0].id_persona); //guardamos en una constante el id de la persona
            const image = String(mensajes.data[0].photo);
            const asigID =Number(mensajes.data[0].id_asignatura);
            const emisor = Number(mensajes.data[0].emisor); // id de la perosna que esta enviando el ticket

            idemisor = emisor;// id de la perosna que esta enviando el ticket y la guardamos en la variable que declaramos afuera de la funcion 
            idAsignatura = asigID;
            IdPerson2 = idPersona; // despues la guardamos en la variable definida afuera de la funcion
            userDatos = mensajes.data;
            userDatos.map(data =>{
                title.append(`<h3 class="card-title"> <i>Ticket No.</i> <b>${data.id_mensaje}</b>  -  <b>${data.asignatura} </b> </h3>`)
                Info.append(`<p>De: <b>${data.name}</b><p>`);
                Info.append(`<p>${data.message}</p>`);
                if (image.length < 20) {
                    Image.append(`<img src="../../img/placeholder.png" class="img-thumbnail" width="304" height="236" >`);
                }else{
                    Image.append(`<a href="${data.photo}" target="_blank" l><img src="${data.photo}" class="img-thumbnail" width="404" height="336" ></a>`);
                }
                
                dateT.append(`<p><i class="far fa-clock"></i><i>${data.date}</i></p>`);
                });
        } catch (error) {
            console.error(error);
        }
    
    }
    getMensajeinfo();

 
   
//Eliminar Ticket
$("#deleteT").on('click', async function(e){
    e.preventDefault();
    let Eliminar = idMensaje;
    const respon =confirm('Quiere eliminar este ticket?');
    
    if (respon) {
       await axios.delete('/api/v1/mensaje/delete/'+Eliminar);
       alert('Eliminado Exitosamente');
        window.location.href="/mensajes";
    }
      
 });
 



// subida de imagenes a cloudinary
 let ruta=[];// variable para el almacenamiento de la ruta de imagen
 let public=[];
//subida de la imagen a un servidor externo
 const imageview =document.getElementById('img-view');
 const imageUploader = document.getElementById('file');
 const progresbar = document.getElementById('progres-image');

  const claudinary_url =' https://api.cloudinary.com/v1_1/sistemadecalificaciones21/image/upload'; //url de nuestro servidor externo de img
  const cloudinary_preset = 'coskyte8';
// funcion para subir imagen
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
        imageview.src = res.data.secure_url; // camiar atributo src de la etiqueta img
        ruta = res.data.secure_url;
        public=res.data.public_id;
  });

//guardar los datos del formulario a la BD   
    $('#responderMensaje').on('submit', async function(evento){
        evento.preventDefault(); //cancela que la pagina se recargue
        
        
        const descripcion = $('#descripcionMensaje').val();
        const almacenamiento = String(ruta);
        const person1 =Number(idemisor);
        const person2 = IdPerson2;
        const asig = Number(idAsignatura);
        const public_id =  String(public);
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
                const res = (await axios.post('/api/v1/mensaje', data)).data;
                console.log(res);
                alert('Mensaje Enviado!');
                window.location.href="/mensajes";
            }catch(error){
                console.log(error);
            }
        }else{
         alert('Algo salio mal!');   
        }
  });
    
    


})();  