import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFanData } from "../hooks/useFan";
import { useLightChange, useLightData } from "../hooks/useLight";

const RoomPage = () => {
  const params = useParams();
  const [changedLight, setChangedLight] = useState();
  const [changedFan, setChangedFan] = useState();
  const onSuccess = (data) => {
    console.log("single", { data });
  };

  const onError = (error) => {
    // console.log({ error });
  };

  const handleLightSwitch = (id, event) => {
    let changed = bulbs?.filter((bulb) => bulb.id === id)?.[0];
    changed["state"] = event.target.checked ? 1 : 0;
    setChangedLight(changed);
    mutationLight.mutate(changed);
  };

  const handleFanSwitch = (id, event) => {
    let changed = fans?.filter((fan) => fan.id === id)?.[0];
    changed["state"] = event.target.checked ? 1 : 0;
    setChangedFan(changed);
    mutationFan.mutate(changed);
  };

  const mutationLight = useLightChange(changedLight);

  const mutationFan = useFanData(changedFan);

  const bulbs = useLightData(onSuccess, onError)?.data?.data?.filter(
    (d) => d.room == params.roomId
  );
  const fans = useFanData(onSuccess, onError)?.data?.data?.filter(
    (d) => d.room == params.roomId
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Room {params?.roomId}</h1>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>Number of Bulbs: </td>
              <td>{bulbs?.length}</td>
            </tr>
            <tr>
              <td>Number of Fans:</td>
              <td>{fans?.length}</td>
            </tr>
            <tr>
              <td>Switched On Bulbs</td>
              <td>{bulbs?.filter((d) => d.state == 1)?.length}</td>
            </tr>
            <tr>
              <td>Switched On Fans</td>
              <td>{fans?.filter((d) => d.state == 1)?.length}</td>
            </tr>
            <tr>
              <td>Add More Fan</td>
              <td>Add More Bulbs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="accessory-control">
        <h2>Control Lights and Fans</h2>

        <Container fluid>
          <Row>
            <Col xs={12}>Lights</Col>
            {bulbs?.map((bulb, item) => (
              <Col xs={12} key={item} className="control-items">
                <span>
                  <FaLightbulb />
                  {item + 1}
                </span>
                <span>
                  Switch{" "}
                  <input
                    type={"checkbox"}
                    defaultChecked={bulb.state}
                    onChange={(e) => {
                      handleLightSwitch(bulb.id, e);
                    }}
                  />
                </span>
              </Col>
            ))}
          </Row>

          <Row>
            <Col xs={12}>Fans</Col>
            {fans?.map((fan, item) => (
              <Col xs={12} key={item} className="control-items">
                <span>
                  <FaFan />
                  {item + 1}
                </span>
                <span>
                  Switch{" "}
                  <input
                    type={"checkbox"}
                    defaultChecked={fan?.state}
                    onChange={(e) => {
                      handleFanSwitch(fan?.id, e);
                    }}
                  />
                </span>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default RoomPage;
