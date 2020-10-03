### Send image from server by slicing it to packages via Web Socket

Server app (node.js) is using web socket connection to load an image, send 16k packages to the client, and notify upon completion.

client upon receiving 'done' message, loads all the parts to an image and displayes it on the screen.

