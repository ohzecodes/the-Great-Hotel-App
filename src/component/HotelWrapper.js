import React, { useState, useEffect } from "react";
import Hotel from "./Hotel";
import "./wrap.css";

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function HotelWrapper(props) {
  const { hotel } = props;
  const { width } = useWindowSize();

  const [count, setCount] = useState(1);

  const n = width > 1038 ? 3 : width > 768 ? 2 : 1;
  const max = Math.ceil(hotel.length / n);

  const marker =
    max > 1
      ? [...Array(max).keys()].map((e, k) => {
          return (
            <input
              type="button"
              className="changebuttons"
              onClick={() => setCount(e + 1)}
              key={e}
              style={
                count == e + 1
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "white" }
              }
            ></input>
          );
        })
      : null;

  let pp = hotel.map((e, k) => {
    if (k >= (count - 1) * n && k < count * n)
      return <Hotel key={k} c={k % n == 0 ? "first" : ""} {...e} />;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <br />
        {max > 1 ? (
          <div className="btndiv">
            <button
              className="button-circle"
              onClick={() => (count > 1 ? setCount(count - 1) : setCount(max))}
            >
              {" "}
              &lt;
            </button>
          </div>
        ) : null}
        <div
          id="cards-wrapper"
          style={{
            width: 15 + n * 328,
          }}
        >
          {pp}
        </div>
        {max > 1 ? (
          <div className="btndiv">
            <button
              className="button-circle"
              onClick={() => (count < max ? setCount(count + 1) : setCount(1))}
            >
              {" "}
              &gt;{" "}
            </button>
          </div>
        ) : null}
      </div>
      <div id="changebtndiv" style={{ display: "block", textAlign: "center" }}>
        {marker}
      </div>
    </>
  );
}

export default HotelWrapper;
