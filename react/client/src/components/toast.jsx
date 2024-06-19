import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function Popup({ message }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div style={{position: 'fixed', top: '50%', right: '20%',zIndex: 1050,transform: 'translate(-50%, -50%)'}}>
    <Row>
      <Col xs={12}>
        <Toast onClose={() => setShow(false)} show={show}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            {/* <strong className="me-auto">Bootstrap</strong>
            <small>Just now</small> */}
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
    </div>
  );
}

export default Popup;