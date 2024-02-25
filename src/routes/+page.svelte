<script>
  import * as turf from "@turf/turf";
  import Geolocation from "svelte-geolocation";

  import { onMount } from "svelte";

  function backToMap() {
    window.location.href = "https://atlas.digitalhistory.ca";
  }

  let coords = [];

  let geofence_buffer = turf.polygon([
    [
      [0, 0],
      [0, 0.1],
      [0.1, 0.1],
      [0.1, 0],
      [0, 0],
    ],
  ]);

  let gps = turf.point([-1, -1]);

  function createGeofence() {
    alert("Updating geofence...");
    geofence_buffer = turf.buffer(gps, 400, { units: "meters" });
    return geofence_buffer;
  }

  function checkGeofence() {
    console.log("Checking geofence...");
    if (coords.length === 2) {
      console.log(coords);
      gps = turf.point([coords[0], coords[1]]);
      var in_geofence = turf.booleanPointInPolygon(gps, geofence_buffer);
      if (!in_geofence) {
        createGeofence();
      }
    } else {
      clearInterval(geofenceUpdate);
      console.log("GPS is not enabled or configured properly on your device.");
    }
  }

  onMount(() => {
    //Have this remove a loading icon when it is done
    setTimeout(() => checkGeofence(), 4000);
  });

  const geofenceUpdate = setInterval(() => {
    checkGeofence();
  }, 15000);
</script>

<svelte:head>
  <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
  <script
    type="text/javascript"
    src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js"
  ></script>
  <script
    type="text/javascript"
    src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
  ></script>
  <style>
    video {
      padding: 0;
      margin: 0;
      /* width: 100%; */
      height: 90vh;
      position: fixed;
      top: 0;
    }
    body {
      margin: 0;
      padding: 0;
    }
    .thumbMenu {
      position: fixed;
      bottom: 0;
      height: 10vh;
      width: 100%;
      display: grid;
      grid-template-columns: auto auto auto;
    }
    .thumbButton {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</svelte:head>

<div>
  <Geolocation getPosition bind:coords />
  <a-scene
    vr-mode-ui="enabled: false"
    arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
    renderer="antialias: true; alpha: true"
  >
    <a-camera gps-new-camera="gpsMinDistance: 500"></a-camera>
    <!-- <a-entity
      material="color: red"
      geometry="primitive: box"
      gps-new-entity-place="latitude: 0; longitude: 0"
      scale="10 10 10"
    ></a-entity> -->
  </a-scene>
  <div class="thumbMenu">
    <button class="thumbButton">Description</button>
    <button class="thumbButton">Images</button>
    <button
      class="thumbButton"
      on:click={() => {
        backToMap();
      }}
    >
      Back to Map
    </button>
  </div>
</div>
