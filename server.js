const express = require('express')
var mysql = require('mysql'); 
const app = express()
// const port = 3005
var bodyParser = require('body-parser')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const portt=3007
const cors =require('cors')
app.use(cors())

//
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database:"clients"
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     console.log('dd')
//   });


// app.get('/', (req, res) => { 
//     res.send('ok')
// })


// //cost estimation when the route is set
// app.post('/poster', (req, res) => {
// console.log(req.body)
// const distance=req.body.distance
// const time=req.body.time

// const priceMeter=distance * 1000
// var carPrice=0;
// var bikePrice=0;

// const baseMeter=3000;
// const basePriceCar= 100;
// const basePriceBike= 50;

// if(priceMeter>baseMeter){
//     const addedMeterForCar=(priceMeter-baseMeter) * 0.02
//     const addedMeterForBike=(priceMeter-baseMeter)*0.01

//     console.log(addedMeterForCar +' meter added')

//     carPrice=(basePriceCar + addedMeterForCar); 
//     bikePrice=(basePriceBike + addedMeterForBike);
// }else{
//      carPrice=basePriceCar;  
//      bikePrice=basePriceBike;
// }
//     const prices=[
//             {
//                 name:'Mini',
//                 price:carPrice,
//             },
//             {
//                 name:'bike',
//                 price:bikePrice,
//         }
//        ,]    
//     res.json(prices)
// })

// //getting the socket.io key and sending it to the client to make the driver and client in the same room
// app.post('/carType',(req,res)=>{
//     console.log(req.body)
//     const medium=req.body.medium
//     const pinLatitude=req.body.pin.latitude;
//     const pinlongitude=req.body.pin.longitude;
//     const radiusLatPlus=(pinLatitude + 500)
//     const radiusLatMinus=(pinLatitude - 500)
//     console.log(radiusLatMinus)
//     console.log(radiusLatPlus)
//     console.log(req.body.DropDes )
//     const dropLatitude=req.body.DropDes.latitude
//     const dropLongitude=req.body.DropDes.longitude
//     console.log(req.body.DropDes.latitude)
//     console.log(req.body.DropDes.longitude)

//     const date=new Date();
//     console.log("current time",date);
//     var ISToffset=330;
//     var offset=ISToffset*60*1000; 
//     var ISTTime= new Date(date.getTime()+offset)
//     console.log('IST date',ISTTime)
//     const todayDate=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
//     console.log(todayDate)
//     const dropaddress=req.body.dropaddress
//     const pickaddress=req.body.pickaddress
//     // let trip_IDGlobal;

//     con.query(`select driver_ID,driver_key,latitude,longitude from driver where driver_status='online' and medium=${medium} and latitude<=${radiusLatPlus} and latitude>=${radiusLatMinus}  order by day_trip asc`,(err,result)=>{
//       if(err){
//         console.log(err)
//       }else{  
//         if(result[0]==null){
//           console.log('no drivers are online')
//           // console.log(result)
//         }else{
//           const driver_ID=result[0].driver_ID
//           console.log(driver_ID + ' is booked for a ride')
//                       con.query(`SELECT COUNT(trip_ID) AS cot FROM trips`,(err,resul)=>{
//                         if(err){
//                             console.log(err)
//                         }else{
//                             var trip_ID=resul[0].cot
//                             var tript_idNext='t'+ (trip_ID + 1)
//                             // console.log(tript_idNext)
                            
//                             con.query(`insert into trips values(1,'${tript_idNext}','${pickaddress}','${dropaddress}',${driver_ID},'${todayDate}','started',${pinLatitude},${pinlongitude},${dropLatitude},${dropLongitude},0)`,(err,resu)=>{
//                               if(err){
//                                  console.log(err) 
//                               }else{
//                                 console.log('client trip details were stored')
//                                 // res.send(tript_idNext)
//                                 // var trip_IDGlobal=tript_idNext
//                                 console.log(result[0])
//                                         // res.status(200).send(result[0],tript_idNext)
//                                         res.send([result[0],tript_idNext])
//                               }
//                             })   
//                         }
//                       })
//                       // res.send(result[0])
//                       // console.log(result[0])
//         }        
//       }
//     })
// })

// // driver update going offline or online
// app.post('/driver',(req,res)=>{
//   console.log(req.body)
//   const driver_ID=req.body.d_ID;
//   const driver_key=req.body.dn_key;
//   const newd_key=req.body.d_key

//   con.query(`select driver_status from driver where driver_ID=${driver_ID}`,(err,result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       const driverSta=result[0].driver_status

//                               //go offline
//                                 if(driverSta=='online'){
//                                   con.query(`update driver set driver_status='offline', driver_key='${driver_key}' where driver_ID=${driver_ID}`,(err,result)=>{
//                                     if(err){
//                                       console.log(err)
//                                     } else{
//                                       res.send({driver_key,driver_status:'offline'});
//                                       // console.log({driver_key,driver_status:'online'})
//                                       console.log(`data updated driver with ID= ${driver_ID} offline`)
//                                     }
//                                   })

//                                   //go onnline
//                                 }else if(driverSta=='offline'){
//                                   con.query(`update driver set driver_status='online', driver_key='${driver_key}' where driver_ID=${driver_ID}`,(err,result)=>{
//                                     if(err){
//                                       console.log(err)
//                                     } else{
//                                       res.send({newd_key,driver_status:'online'});
//                                       console.log(`data updated driver with ID= ${driver_ID} online`)
//                                     }
//                                   })
//                                 }
//     }
//   })
// })

// // driver status 
// app.post('/driverStatus',(req,res)=>{
//   console.log('fff')
//   const driver_ID=req.body.d_ID
//   const driver_key=req.body.d_key
//   console.log(req.body)
//   con.query(`select driver_status,driver_key from driver where driver_ID=${driver_ID} `,(err,result)=>{
//     if(err){
//       console.log(err)
//     }else{  
//       console.log(result[0].driver_status)
//                     if(result[0].driver_status=='online'){
//                       con.query(`update driver set driver_key='${driver_key}' where driver_ID=${driver_ID} `,(err,result)=>{
//                         if(err){
//                           console.log(err)
//                         }else{
//                           console.log('driver key updated')
//                         }
//                         })
//         }
//       res.send(result[0].driver_status)
//     }
//   })
// })

// app.post('/driverDetail',(req,res)=>{
//   console.log(req.body)
//   const driver_ID=req.body.driver_id
//   con.query(`select * from driver where driver_ID=${driver_ID}`,(err,result)=>{
//     if(err){
//       console.log(err)
//     } else{
//       res.send(result)
//     }
//   })
// })


// app.post('/tripUpdate',(req,res)=>{
//   console.log(req.body)
//   console.log('sendu')
//   res.send('uytruyt')

// })

// app.post('/driverRideStatus',(req,res)=>{
// console.log(req.body)
// const rideStatus=req.body.booked
// const driver_ID=req.body.d_ID
//   con.query(`update driver set driver_status='${rideStatus}' where driver_ID=${driver_ID}`,(err,result)=>{
//     if(err){
//       console.log(err)
//     } else{
//       res.send(result)
//     }
//   })

// })

// //live location of the driver when he is online
// app.post('/location',(req,res)=>{
//   const latitude=req.body.locat.coords.latitude;
//   const longitude= req.body.locat.coords.longitude;
//   const driver_ID = req.body.d_ID
//   con.query(`update driver set latitude=${latitude}, longitude=${longitude} where driver_ID=${driver_ID}`,(err,result)=>{
//     if(err){
//       console.log(err)
//     } else{
//       res.send(' driver location getting updated')
//     }
//   })
// })

// app.post('/total',(req,res)=>{
//   console.log(req.body)
//   const trip_ID=req.body.trip_ID
//   const distance=req.body.toatalDis
//   console.log(distance)
//   const calDis=distance*1000*0.1211
//   // if(distance<)
//   console.log(calDis)
//   con.query(`select trip_ID,picklatitude,picklongitude,droplatitude,droplongitude from trips where trip_ID='${trip_ID}'`,(err,result)=>{
//     if(err) throw err
//     console.log(result)
 
//   })
//   res.send({calDis})
// })

// io.on('connection', (socket) => {
//     console.log('user connected'+ socket.id); 
//     socket.on('send-message',(message)=>{
//     console.log(message)
//     io.emit('receive-message',message)
//     })
//     socket.on('disconnect',function(){
//         console.log('user disconnect'+socket.id)
//     })
//     socket.on('join-room',room=>{
//       socket.join(room)
//     })
//   })

// app.post('/createView',(req,res)=>{
// console.log(req.body)
//   if('post'==req.body.post){
//     con.query(`update driver set day_trip=0 where driver_ID>0;`,(err,result)=>{
//       if(err){
//         console.log(err)
//       } else{
//         res.send(result)
//         console.log('driver trips for the day has been reset')
//       }
//     })
//     }
// })

io.on('connection', (socket) => {
      console.log('user connected'+ socket.id); 
      socket.on('send-message',(message,room)=>{
      console.log(message,room)
      // io.emit('receive-message',{message,room})
      socket.to(room).emit("receive-message",{message})
      })


      socket.on('driver-location',(message,room)=>{
        // console.log(message)
        socket.to(room).emit("loc-message",{message,room})
      })

      socket.on('driver-accept',(message,room)=>{
        // console.log(message)
        socket.to(room).emit("accept",{message})
      })

      socket.on('disconnect',function(){
          console.log('user disconnect'+socket.id)
      })
      socket.on('join-room',room=>{
        socket.join(room)
        console.log('joined')
      })
      socket.on("total",(message,room)=>{
        // console.log(message)
        socket.to(room).emit("total",{message})
      })
    })

// app.listen(port, () => {
//   console.log(`listening on port ${port}`)
// })

server.listen(portt, function() {
    console.log(`Listening on port ${portt}`);
  });