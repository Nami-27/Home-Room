import { useFanData } from "../hooks/useFan";
const Fan = () => {
  const onSuccess = (data) => {
    // console.log({ data });
  };

  const onError = (error) => {
    // console.log({ error });
  };

  const fans = useFanData(onSuccess, onError)?.data?.data;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Fans </h1>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>Number of Fans:</td>
              <td>{fans?.length}</td>
            </tr>
            <tr>
              <td>Switched On Fans</td>
              <td>{fans?.filter((d) => d.state === 1)?.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Fan;
