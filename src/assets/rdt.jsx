import React, { useState } from "react";
import { useSpring, animated } from 'react-spring';

function Rdt1_0() {
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  function delay(milliseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function send() {
    const startTime = new Date(); // Capture start time before sending the message
    const newMessage = `Message${messageCount}`;
    const updatedMessages = [...messages, { text: newMessage, status: 'sent', time: startTime }];
    setMessages(updatedMessages);
    setMessageCount(messageCount + 1);
    setIsAnimating(true);
    await delay(1500);
   
    const endTime = new Date(); // Capture end time upon receiving the message
    const roundTripTime = endTime - startTime; // Calculate RTT
    console.log(`Round Trip Time for "${newMessage}": ${roundTripTime}ms`);

    const updatedReceivedMessages = [...updatedMessages];
    updatedReceivedMessages[updatedReceivedMessages.length - 1].status = 'received';
    setMessages(updatedReceivedMessages);
    setIsAnimating(false);
  }

  return (
    <div className="container">
      <div className="panel1">
        <h2>RDT 1.0</h2>
        <h3>Sending Messages:</h3>
        <ul>
          {messages.map((message, index) => {
            if (message.status === 'sent') {
              return (
                <li key={index}>
                  {message.text}
                  <span> RTT: {message.time ? `${new Date() - message.time}ms` : 'Calculating...'}</span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <h3>Received Messages:</h3>
        <ul>
          {messages.map((message, index) => {
            if (message.status === 'received') {
              return <li key={index}>{message.text}</li>;
            }
            return null;
          })}
        </ul>
        <button type="button" onClick={send}>Send Message</button>
      </div>
      <div className="panel2">
        <h2 className="sender">Sender:</h2>
        {messages.map((message, index) => {
          if (message.status === 'sent') {
            return (
              <p className="sender" style={{ marginBottom: '10px' }} key={index}>
                {message.text}
              </p>
            );
          }
          return null;
        })}
        <h2 className="receiver">Receiver:</h2>
        {messages.map((message, index) => {
          if (message.status === 'received') {
            return (
              <p className="receiver_text"  style={{ marginBottom: '10px' }} key={index}>
                {message.text}
              </p>
            );
          }
          return null;
        })}
      </div>
      <div className="log">
        {messages.map((message, index) => (
          <div key={index}>
            {message.status === 'sent' && message.time && (
              <p>{`RTT for "${message.text}": ${new Date() - message.time}ms`}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rdt1_0;
