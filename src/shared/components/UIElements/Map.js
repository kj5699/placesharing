import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import './Map.css'



const Map = props =>{
    mapboxgl.workerClass = MapboxWorker;
    mapboxgl.accessToken = 'pk.eyJ1IjoiamF0aW5rNTY5OSIsImEiOiJja243MHRydGIwamloMm9zNDl4YjVnOXRpIn0.coNXxsnvUib48zmoe15gpA';
    const mapRef= useRef();

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center:['78.0399535','27.1751448'],
      zoom: 16,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    // clean up on unmount
    return () => map.remove();
    }, [props.center,props.zoom]);
    return(
        <div className={`map ${props.className}`} style= {props.style} ref={ mapRef }>

        </div> 
    ) 
    }
export default Map;