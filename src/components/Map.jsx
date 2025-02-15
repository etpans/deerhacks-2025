// import React, { useState } from "react";
// import map from '../assets/campus_map.jpg'

// function Map() {
//     const [selectedArea, setSelectedArea] = useState(null);

//     const handleAreaClick = (area) => {
//         setSelectedArea(area);
//         alert(`You clicked on the ${area}`);
//     };

//     return (
//         <>
//             <div className="map-wrapper">
//                 <img
//                     src={map}
//                     alt="Interactive Map"
//                     useMap="#image-map"
//                     style={{ width: "100%", height: "auto" }}
//                 />
//                 <map name="image-map">
//                     <area
//                     shape="rect"
//                     coords="34,44,270,350"
//                     alt="Area 1"
//                     href="#"
//                     onClick={() => handleAreaClick("Area 1")}
//                     />
//                     <area className="area"
//                     shape="circle"
//                     coords="350,350,50"
//                     alt="Area 2"
//                     href="#"
//                     onClick={() => handleAreaClick("Area 2")}
//                     />
//                     <area
//                     shape="poly"
//                     coords="600,200,800,150,900,250"
//                     alt="Area 3"
//                     href="#"
//                     onClick={() => handleAreaClick("Area 3")}
//                     />
//                 </map>
//                 {selectedArea && <p>You clicked on {selectedArea}</p>}
//             </div>
//         </>
//     );
// }

// export default Map

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = () => {
    const position = [43.5492500, -79.6637222]; 
    
    return (
    <MapContainer center={position} zoom={16} style={{ width: '100%', height: '100%' }}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
        <Popup>A pretty CSS3 popup.</Popup>
        </Marker>
    </MapContainer>
    );
};

export default Map;
