function init(){ 
  const ws = new WebSocket('ws://localhost:8080');

  let binaryData = [];

  function onOpen(event) {
    if (event.type === 'open') {
      ws.send('this is a message from earth');
      
    }
  }

  function onMessage(message) {
    const { data } = message;

    if (data !== 'done') {
      binaryData.push(data);
      console.log('the size of binaryData', binaryData.length);
      console.log('binaryData', binaryData);
    } else {
      const blob = new Blob(binaryData, { type: 'image/jpeg'});
      console.log('the size of binaryData', binaryData.length);
      createImageFromBlob(blob);
    }
  }

  function onError(err) {
    console.log('error', err);
  }

  ws.onopen = onOpen;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  
}

function createImageFromBlob(blob) {
  console.log('blob in function', blob);
  const url = URL.createObjectURL(blob);
  console.log('url', url);

  const img = document.createElement('img');

  img.onload = function(event){
    console.log('inside the load image event', event);
    document.body.appendChild(img);

    //cleanup
    URL.revokeObjectURL(url);
  }

  img.src = url;
}

window.addEventListener('DOMContentLoaded', init());