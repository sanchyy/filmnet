const NodeMediaServer = require('node-media-server');
const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { send } = require('process');
const { notDeepEqual } = require('assert');

const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: 8000,
      mediaroot: './media',
      allow_origin: '*'
    },
    trans: {
      ffmpeg: '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'live',
          hls: false,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        }
      ]
    }

};
const port = 7000;
var app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/movie/:id', function(req, res){
  let nom = req.params.id;
  console.log(nom);
  let spawn = require("child_process").spawn;

  try {
   
    var nomf = nom.substring(0, nom.length - 4);
    console.log("nom sense" +nomf);

    let command = "ffmpeg -re -i vid/" + nom + " -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/"+nomf;
    console.log(command);
    exec(command);
    console.log("executat correctament");  
  } 
  catch (err){
    console.log("error: ", err);
  }
  nomv = nom.substring(0, nom.length - 4);
  console.log('intento obrir vlc');
  let ruta = "http://192.168.0.46:8000/live/"+nomf+"/index.mpd";
  console.log(ruta);
  setTimeout(() => { let vlc = spawn("vlc", [ruta]); }, 5000);
 // let vlc = spawn("vlc", [ruta]);
 //vlc.on("exit", function(code){
 //console.log("Exit code: "+ code);
//})
  setTimeout(() => {   res.redirect('/movies?id='+nomf); }, 5000);
  //res.redirect('/movies?id='+nomf);
  console.log(__dirname);
});

app.get('/movies/',(req,res)=>{
  res.sendFile(path.join(__dirname, '/pelis_dash.html')); 
});


var nms = new NodeMediaServer(config)
app.listen(port);
nms.run();
module.exports=app; 
