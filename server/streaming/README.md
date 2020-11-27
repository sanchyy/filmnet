# USAGE
`clone repo`
`npm i` //to install packages for node-media-server (nms)
`node app.js` //to start server 

##  ./videos directory
Creat una carpeta **videos** i afegeix els videos .flv que vulguis streamejar.

## app.js
- Per visualitzar un video: http://server_ip:7000/movie/name_of_your_video.flv
- Aquest endpoint executa automaticament: 
    - ffmpeg, guardant els chunks a la carpeta ./output/name_of_your_video que pots modificar al mediaroot de la configuració del nms
    - vlc, amb la ruta: http://server_ip:8000/live/name_of_your_video
- Per visualitzar com admin els streams, CPU i memoria usage: http://server_ip:8000/admin


