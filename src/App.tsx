import * as moment from "moment-timezone";
import { useState } from "react";
import "./App.css";

function App() {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [payload, setPayload] = useState<any>({});
  const [response, setResponse] = useState<any>({});
  const [dateString, setDateString] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const createPayload = () => {
    const localDateString = moment.tz(dateString, userTimeZone).utc().format();
    const localFromString = moment
      .tz(`${dateString} ${fromTime}`, userTimeZone)
      .utc()
      .format();
    const localToString = moment
      .tz(`${dateString} ${toTime}`, userTimeZone)
      .utc()
      .format();
    setPayload({
      dateString: localDateString,
      fromTime: localFromString,
      toTime: localToString,
    });
    console.log(moment(localFromString).isBefore(moment()));
  };

  const convertUTCToLocal = () => {
    const userDateTimeFormat = moment
      .tz(payload.dateString, userTimeZone)
      .format("DD/MM/YYYY");
    const fromDateTimeUTC = moment
      .tz(payload.fromTime, userTimeZone)
      .format("HH:mm");
    const toDateTimeUTC = moment
      .tz(payload.toTime, userTimeZone)
      .format("HH:mm");

    setResponse({
      date: userDateTimeFormat,
      slots: [
        {
          from: fromDateTimeUTC,
          to: toDateTimeUTC,
        },
      ],
    });
  };

  return (
    <>
      <h1>{userTimeZone}</h1>
      <div className="card">
        <input
          type="text"
          onChange={(e) => setDateString(e.target.value)}
          placeholder="YYYY-MM-DD"
        />{" "}
        <br />
        <input
          type="text"
          onChange={(e) => setFromTime(e.target.value)}
          placeholder="HH:mm"
        />{" "}
        <br />
        <input
          type="text"
          onChange={(e) => setToTime(e.target.value)}
          placeholder="HH:mm"
        />{" "}
        <br />
        <button type="button" onClick={() => createPayload()}>
          Create Payload
        </button>
        <p>{JSON.stringify(payload)}</p>
      </div>

      <h1>Show response</h1>
      <button type="button" onClick={() => convertUTCToLocal()}>
        Create User View
      </button>
      <p>{JSON.stringify(response)}</p>
    </>
  );
}

export default App;
