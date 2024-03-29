import React, { useMemo, useState, useEffect } from "react";
import '../text_to_speech/accessibility.css';
import { useAccessibilityContext } from "../../components/Helpers/accessibilityContext";


export const AccessibleFeature = (props) => {
  const { speechState, setSpeechState, speed, setSpeed } = useAccessibilityContext();

  const [utteranceText, setUtteranceText] = useState("");



  const utterance = useMemo(() => new SpeechSynthesisUtterance(), []);
  utterance.text = utteranceText; // Use the utteranceText state instead of props

  utterance.rate = speed; // Set the initial speech rate based on the state

  useEffect(() => {
    const handleVoicesChanged = () => {
      let voices = speechSynthesis.getVoices();
      utterance.voice = voices[4]; // Set the desired voice after 'voiceschanged' event
    };

    speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    // Clean up the event listener when the component unmounts
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, [utterance]);

  useEffect(() => {
    utterance.rate = speed; // Update the speech rate when the 'speed' state changes
  }, [utterance, speed]);

  useEffect(() => {
    setUtteranceText(props.question); // Update utteranceText state when props.question changes
  }, [props.question]);


  function speechOn() {
    if (speechState === "stopped") {
      setSpeechState("playing");
      window.speechSynthesis.speak(utterance);
      console.log("played")
    }
  };

  const speechOff = () => {
    if (speechState !== "stopped") {
      window.speechSynthesis.cancel();
      setSpeechState("stopped");
      console.log("stopped");

    }
  };



  // return the html for the accessibility feature
  return (
    <div className="accessibility-container">
      <div className="speed-container">
        <label htmlFor="speed">Speed</label>
        <fieldset className="slider-container">
          <input
            className="input-slider"
            type="range"
            id="speed"
            name="speed"
            min="0.1"
            max="1.5"
            step={0.2}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </fieldset>
      </div>
      <div className="speechbtn-container">
        <button id="play" onClick={speechOn}>
          Play
        </button>

        <button id="stop" onClick={speechOff}>
          Stop
        </button>
      </div>
    </div>
  );
};
