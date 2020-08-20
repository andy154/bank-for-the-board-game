const socket = new WebSocket(`ws://${window.location.hostname}:8080`);

socket.onopen = () => {
  socket.send(JSON.stringify({method: 'existGame', data: ''}));
}

socket.onmessage = messageEvent => {
  console.log(JSON.parse(messageEvent.data));
}
