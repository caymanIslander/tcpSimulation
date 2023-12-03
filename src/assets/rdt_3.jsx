import React, { useState } from "react";
import { useSpring, animated } from 'react-spring';

function Rdt3_0() {
  const [sentMessages, setSentMessages] = useState([]);
  const [MessageCount, setMessageCount] = useState(1);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [AckCount, setAckCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const senderSpring = useSpring({
    from: { transform: 'translateX(0px)', backgroundColor: 'green' },
    to: async (next, cancel) => {
      if (isAnimating) {
        await next({ transform: 'translateX(100px)', backgroundColor: 'green' });
        await next({ transform: 'translateX(100px)', backgroundColor: 'red' });
        await next({ transform: 'translateX(0px)', backgroundColor: 'red' });
      }
    },
    reset: isAnimating,
    reverse: isAnimating,
  });

  const receiverSpring = useSpring({
    from: { transform: 'translateX(0px)', backgroundColor: 'green' },
    to: async (next, cancel) => {
      if (isAnimating) {
        await next({ transform: 'translateX(-100px)', backgroundColor: 'green' });
        await next({ transform: 'translateX(-100px)', backgroundColor: 'red' });
        await next({ transform: 'translateX(0px)', backgroundColor: 'red' });
      }
    },
    reset: isAnimating,
    reverse: isAnimating,
  });

  const toggleAnimation = () => {
    setIsAnimating(prevState => !prevState);
  };

  function delay(milliseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function send() {
    const newMessage = `Message${MessageCount}`;
    setSentMessages([...sentMessages, newMessage]);
    setMessageCount(MessageCount + 1);
    setIsAnimating(true);
    await delay(1500);
    const ack = `ACK${AckCount}`;
    setReceivedMessages([...receivedMessages, newMessage]);
    setAckCount(AckCount + 1);
    setIsAnimating(false);
  }

  return (
    <div className="container">
      <div className="panel1">
        <h2>RDT 3.0</h2>
        <h3>Sent Messages:</h3>
        <ul>
          {sentMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <button type="button" onClick={send}>Send Message</button>
      </div>
      <div className="panel2">
        <h2 className="sender">Sender</h2>
        <animated.div className="ball" style={senderSpring}></animated.div>
        <h2 className="receiver">Receiver</h2>
        <animated.div className="ball" style={receiverSpring}></animated.div>
      </div>
    </div>
  );
}

export default Rdt3_0;
