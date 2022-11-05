import { useAddRoomData, useRoomData } from "../hooks/useRoom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const RoomPage = () => {
  const [fans, setFans] = useState(1);
  const [bulbs, setBulbs] = useState(1);
  const [show, setShow] = useState(false);

  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const onClose = () => {
    setShow(false);
  };

  const { isLoading, data, isError, error } = useRoomData(
    onSuccess,
    onError
  );

  const { mutate: addRoom } = useAddRoomData();
  const addRoomData = () => {
    const room = { id: data?.length + 1, fans, bulbs };
    addRoom(room);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>RoomPage</h1>

      <Container fluid className="home">
        <Row style={{ margin: "0px" }}>
          {data &&
            data?.map((room) => (
              <Col key={room} xs={3} className="room">
                <Link to={`/rooms/${room}`}>Room {room}</Link>
              </Col>
            ))}
        </Row>
      </Container>
      <br />
      <Button onClick={() => setShow(true)}>Click to insert more room</Button>

      <Modal show={show} onHide={onClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add Room Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formFans">
              <Form.Label>Number of Fans</Form.Label>
              <input
                type="number"
                value={fans}
                onChange={(e) => setFans(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBulbs">
              <Form.Label>Number of Bulbs</Form.Label>
              <input
                type="number"
                value={bulbs}
                onChange={(e) => setBulbs(parseInt(e.target.value))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => addRoomData()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default RoomPage;
