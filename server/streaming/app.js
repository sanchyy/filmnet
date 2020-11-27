const NodeMediaServer = require('node-media-server');
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

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
      mediaroot: './output',
      allow_origin: '*'
    },
    trans: {
      ffmpeg: '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'live',
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
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
    
    let command = "ffmpeg -re -i videos/" + nom + " -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/"+nom;
    console.log(command);
    exec(command);
    //exec('ffmpeg -re -i Nature.flv  -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/video.flv');
    //let ffmpeg = spawn("ffmpeg", [" -re -i ./Nature.flv -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/video.flv"]);
    /*ffmpeg.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });
  
    ffmpeg.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
    });
    ffmpeg.on("error", (error)=>{
      console.log(`error message ffmpeg: ${error.message}`);
    })
    ffmpeg.on("exit", function(code){
      console.log("ffmpeg exit code:" + code);
    })*/
    console.log("executat correctament");  
  } 
  catch (err){
    console.log("error: ", err);
  }
  console.log('intento obrir vlc');
  let ruta = "http://localhost:8000/live/"+nom;
  console.log(ruta);
  let vlc = spawn("vlc", [ruta]);
  vlc.on("exit", function(code){
    console.log("Exit code: "+ code);
  })
});


var nms = new NodeMediaServer(config)
app.listen(port);
nms.run();
module.exports=app; 
