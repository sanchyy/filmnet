const NodeMediaServer = require('node-media-server');
 
const config = {
  mediaPath: process.env['MEDIA_PATH'],
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  workers: {
    web: {
      enabled: true,
      count: require('os').cpus().length,
      shutdownTimeout: 5000,
    },
// Movie indexer Worker
    indexer: {
      enabled: true,
      count: 1,
      timeout: 5000,
    }
  }
};
 
console.log(process.env['MEDIA_PATH']);
var nms = new NodeMediaServer(config);
nms.run();
