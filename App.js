import { useState, useEffect } from "react";
import "./styles.css";

const FetchData = (url) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    fetch(url, {
      mode: "cors",
      headers: { "Content-Type": "text/plain" }
    })
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        setData(data);
        setIsLoading(false);
        console.log(data.length);
        if (data[typed.length])
          setTimeout(setTyped(typed + data[typed.length]), 500);
      })
      .catch((e) => {
        setError(e.toString());
        setIsLoading(false);
      });
  }, [url, typed]);
  return [isLoading, error, data, typed];
};

export default function App() {
  const [flagLoading, flagError, flagData, flagTyped] = FetchData(
    "yourURL"
  );
  if (flagLoading) return "Loading...";
  if (flagError) return `ERROR: ${flagError}`;
  if (flagData) {
    return <div>{flagTyped}</div>;
  } else return "No fetch operation...";
}
