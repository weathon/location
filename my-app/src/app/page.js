'use client'

import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [])
  return (
    <main className="">

    </main>
  );
}
