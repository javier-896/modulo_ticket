(()=>{
    
    let userDatos =[];
    const Info = $('#messages');  // id para desplegar los mensajes
    const title = $('#titleTicket'); // id de title
    const Image =$('#img-preview'); // id del campo img
    const dateT = $('#fecha-ticket');

    let idMensaje  = Number(window.location.pathname.split('/')[2]);//traer el id dado de la pantalla  mensaje
    let IdPerson22 = [];
    let IdPerson2 = []; // variable para guardar el id de la persona a responderle el ticket
    let idAsignatura =[];

    const getMensajeinfo= async()=>{//mostrar datos del mensaje en la pantalla
        try {
            const mensajes = await axios.get('/api/v1/mensaje/ver/'+idMensaje);
            console.log(mensajes.data);
            const idPersona = Number(mensajes.data[0].id_persona); //guardamos en una constante el id de la persona
            const image = String(mensajes.data[0].photo);
            const asigID =Number(mensajes.data[0].id_asignatura);
            const idrecibe = Number(mensajes.data[0].id_persona2);

            idPersona22 = idrecibe;
            idAsignatura = asigID;
            IdPerson2 = idPersona; // despues la guardamos en la variable definida afuera de la funcion
            userDatos = mensajes.data;
            userDatos.map(data =>{
                title.append(`<h3 class="card-title"> <i>Ticket No.</i> <b>${data.id_mensaje}</b>  -  <b>${data.asignatura} </b> </h3>`)
                Info.append(`<p>Para: <b>${data.name}</b><p>`);
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
        window.location.href="/ticketenviados";
    }
      
 });
 
 







})();  