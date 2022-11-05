import { useLightData } from "../hooks/useLight";

const Light = () => {
  const onSuccess = (data) => {
    // console.log({ data });
  };

  const onError = (error) => {
    // console.log({ error });
  };

  const bulbs = useLightData(onSuccess, onError)?.data?.data;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bulbs </h1>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>Number of Bulbs:</td>
              <td>{bulbs?.length}</td>
            </tr>
            <tr>
              <td>Switched On Bulbs</td>
              <td>{bulbs?.filter((d) => d.state === 1)?.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Light;
