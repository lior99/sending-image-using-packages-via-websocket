const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');


function init() {
  const ws = new WebSocket.Server({ port: 8080 });
  
  ws.on('connection', async connection => {
    connection.on('message', message => {
      // console.log(message);
      // connection.send('Greetings citizens of earth!!!!')
    })

    let imageAsBufferArray = await loadImage();

    const length = 1024 * 16;
    let start = 0;
    let end = length;
    
    let arrayLength = imageAsBufferArray.length;
    console.log('arrayLength', arrayLength);

    const packagesList = [];

    while(arrayLength) {
      let packageToSend = imageAsBufferArray.slice(start, length);
      await sendPackage({ packageToSend, connection });

      imageAsBufferArray = imageAsBufferArray.slice(end);
      arrayLength = imageAsBufferArray.length;
    }

    connection.send('done');
  })
}

async function loadImage() {
  try {
    const image = await fs.readFileSync(path.join(__dirname, 'image.jpg'));
    return image;
  } catch(err) {
    console.log('got error', err);
    return null;
  }
}

function sendPackage({ packageToSend, connection }) {
  return new Promise(resolve => {
    setTimeout(() => {
      connection.send(packageToSend);
      resolve('package was sent');
    }, 500);
  })
}

init();
