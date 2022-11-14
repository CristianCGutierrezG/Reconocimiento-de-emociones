import React from "react";
import { useEffect, useRef, useState } from "react";
// import * as canvas from "canvas";
import * as faceapi from "face-api.js";

export default function FaceApi() {
  const [videoSource, setVideoSource] = useState("");
  const [audioSource, setAudioSource] = useState("");
  const [error, setError] = useState(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const streamRef = useRef<null | MediaStream>(null);

  useEffect(function () {
    async function preparaStream() {
      function gotStream(stream: MediaStream) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      async function getStream() {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
        }
        const constraints = {
          video: {
            diviceId: videoSource !== "" ? { exact: videoSource } : undefined,
          },
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          gotStream(stream);
        } catch (error) {
          setError(error);
        }
      }
      await getStream();
    }
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
      faceapi.nets.faceExpressionNet.loadFromUri("../models"),
      faceapi.nets.ageGenderNet.loadFromUri("../models"),
    ]).then(preparaStream);

    videoRef.current.addEventListener("play", async () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      document.body.append(canvas);
      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };
      faceapi.matchDimensions(canvas, displaySize);
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 100);
    });
  }, []);
  //     const { Canvas, Image, ImageData } = canvas;
  // faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  // await faceapi.nets.ageGenderNet.loadFromUri("/models");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  // await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  // await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
  // await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  // await faceapi.nets.ssdMo;

  return (
    <div>
      <select name="videoSource" id="videoSource" value={videoSource}></select>
      <select name="audioSource" id="audioSource" value={audioSource}></select>
      <video
        className="video"
        ref={videoRef}
        autoPlay
        muted
        playsInline
      ></video>
      {error && <p>{error}</p>}
    </div>
  );
}
