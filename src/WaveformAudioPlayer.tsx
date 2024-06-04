import React, { useState, useEffect, useRef } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { useAudioRecorder } from "react-audio-voice-recorder";

import MicIcon from "./mic.svg";
import MuteIcon from "./mic-mute.svg";

import "./styles.css";

interface AnalyzerData {
  analyzer: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
}

const WaveformAudioPlayer: React.FC = () => {
  const [muted, setMuted] = useState<boolean>(false);
  const [blob, setBlob] = useState<Blob>();
  const [isStartedRecording, setIsStartedRecording] = useState<boolean>(false);

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const toggleRecording = () => {
    if (isStartedRecording) {
      togglePauseResume();
      setMuted((prevMuted) => !prevMuted);
    } else {
      setMuted(false);
      setIsStartedRecording(true);
      startRecording();
    }
  };

  return (
    <div>
      <div className="recorder-container">
        <div className="mic-button-container" onClick={toggleRecording}>
          <img
            src={muted ? MuteIcon : MicIcon}
            alt="mic"
            className="mic-button"
          />
        </div>
        <div className="visualization-container">
          {mediaRecorder && (
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              width={200}
              height={30}
            />
          )}
        </div>
        <div className="time-container">
          {recordingTime !== 0 && <div>{recordingTime} sec</div>}
        </div>
      </div>
    </div>
  );
};

export default WaveformAudioPlayer;
