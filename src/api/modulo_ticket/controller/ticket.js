//Llamado de los procedimientos almacenados de modulo ticket
const mysqlConnection = require('../../../config/db');
const { validationResult } =require('express-validator');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'sistemadecalificaciones21',//process.env.CLOUDINARY_CLOUD_NAME,
  api_key: '665423886726526',//process.env.CLOUDINARY_API_KEY,
  api_secret: 'v62U6CMsresi80bJjCu0NsZn1_I'//process.env.CLOUDINARY_API_SECRET
});

//consulta de mensaje nuevo
exports.agenda = async(req,res)=>{
    const {id} = req.params;
    await mysqlConnection.query('call Sp_agenda(?)',[id],(err,rows,fields)=>{
     if (!err) {
         res.json(rows[0]);
     }else{
         console.log(err);
     }
    });
 };
 
 
 //consulta tickets enviado del usuario atraves de Id usuario 
 exports.ticketenviado = async(req, res)=>{
     const {id} = req.params;
     await mysqlConnection.query('CALL Sp_ticketenviado(?)',[id],(err,rows,fields)=>{
         if (!err) {
             res.json(rows[0]);
         }else{
             console.log(err);
         }
   });  
    
 };
 
 //consulta tickets recibido del usuario atraves de Id usuario 
 exports.ticketrecibido=async(req, res)=>{
    const {id} =  req.params;
    await mysqlConnection.query('call sp_ticketrecibido(?)',[id],(err,rows,fields)=>{
           if (!err) {
               res.json(rows[0]);
           }else{
               console.log(err);
           }
     });
 };
 
 // ver mensaje  recibido en especifico atraves de id mensaje
 exports.verticketrecibido=async(req, res)=>{
     const {id} =  req.params;
   await mysqlConnection.query('call Sp_vistaticketrecibido(?)',[id],(err,rows,fields)=>{
        if (!err) {
            res.json(rows[0]);
            
        }else{
            console.log(err);
        }
    });
  
  };
 
 
  // ver mensaje enviado en especifico atraves de id mensaje
 exports.verticketenviado=async(req, res)=>{
     const {id} =  req.params;
   await mysqlConnection.query('call sp_vistaticketenviado(?)',[id],(err,rows,fields)=>{
        if (!err) {
            res.json(rows[0]);
            
        }else{
            console.log(err);
        }
    });
  
  };
 
  
 
 //insertar ticket nuevo
 exports.insertaticket= async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
     const {descripcion,almacenamiento,person1,person2,asig,public_id,ruta_estado} = req.body;
     const query = `CALL Sp_insertarticket(?,?,?,?,?,?,?);`;
     //person1  envia el mensaje 
     //person2 recibe el mensaje
      await mysqlConnection.query(query,[descripcion,almacenamiento,person1,person2,asig,public_id,ruta_estado],(err,rows,fields)=>{
          if (!err) {
              res.json({Status:'Mensaje Enviado!'});
              console.log(public_id);
          }else{
              console.log(err);
          }
      });
      
     };
 
 
 //update de mensajes nuevos atraves de id mensaje
 exports.mensajeLeido=async(req,res)=>{
     const {ruta_estado} = req.body;
     const {id} = req.params;
     try {
         await mysqlConnection.query('CALL Sp_actualizarticket(?,?)',[id,ruta_estado],(err,rows,fields)=>{
             if (!err) {
                 res.json({Status:'Ok'});
               
             }else{
                 console.log(err);
             };
         });
     } catch (error) {
         console.log(error);
     }
 
 };
 
 
 //delete atraves de id mensaje
 exports.eliminar_mensaje = async (req,res)=>{
     const {id} = req.params;
   
     try {
         //eliminar en el servidor de cloudinary
         const foto = await mysqlConnection.query('select `public_id` from tbl_mensaje where id_mensaje=(?)',[id]);
         let imagen = foto[0].public_id;
         if (!imagen =="") {
             await cloudinary.uploader.destroy(imagen); 
         }
        
       //eliminar en las tablas correspondientes
         const deleteMjs = await mysqlConnection.query('CALL sp_eliminarticket(?)',[id]);
         return res.json (deleteMjs);
         
 
     } catch (error) {
         console.log(error)
     }
     
 };
 
 
 exports.tipo = async (req, res) => {
     try {
         const tipo = await mysqlConnection.query('CALL Sp_selecttipoticket()');
         return res.json(tipo);
     } catch (error) {
         console.log(error);
     }
 }

 exports.reporte = async(req, res) =>{
     const {id} = req.params;
     try {
         const reporte_resumen = await mysqlConnection.query('SELECT * FROM tbl_bitacora where usr_registro =(?)',[id]);
         return res.json(reporte_resumen);
        } catch (error) {
         
     }
 }
