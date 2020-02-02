const messageButton = document.querySelector('.message');

function displayMessage(msgText, msgType) {
  const html = document.querySelector('html');

  const panel = document.createElement('div');
  panel.setAttribute('class', 'msgBox');

  html.appendChild(panel);

  const msg = document.createElement('p');
  msg.textContent = msgText;
  panel.appendChild(msg);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  panel.appendChild(closeBtn);

  closeBtn.onclick = function() {
    panel.parentNode.removeChild(panel);
  };

  if (msgType === 'warning') {
    msg.style.backgroundImage = 'url(icons/warning.png)';
    panel.style.backgroundColor = 'red';
    msg.style.color = 'white';
  } else if (msgType === 'chat') {
    msg.style.backgroundImage = 'url(icons/chat.png)';
    panel.style.backgroundColor = 'aqua';
    msg.style.color = 'black';
  } else {
    msg.style.paddingLeft = '20px';
    panel.style.color = 'black';
  }
}

messageButton.onclick = function() {
  displayMessage('Hey, this is some dangerous mail in your mailbox', 'warning');
  //   displayMessage('You have one new message', 'chat');
};
