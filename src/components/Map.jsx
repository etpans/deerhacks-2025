import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Importing individual icons
import dh from '../assets/DH_icon.png';
import mn from '../assets/MN_icon.png';
import dv from '../assets/DV_icon.png';
import ib from '../assets/IB_icon.png';
import kn from '../assets/KN_icon.png';
import cc from '../assets/CC_icon.png';

// Function to create a custom icon for each marker
const createIcon = (iconUrl) =>
    L.icon({
        iconUrl,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });

const Map = () => {
    const position = [43.5492500, -79.6637222]; // Central position of the map (UNCHANGED)

    // Locations with their respective coordinates and icons (UNCHANGED)
    const locations = [
        { name: 'DH', coords: [43.550143531100005, -79.66623570113791], icon: dh },
        { name: 'MN', coords: [43.55078422235424, -79.66584090716773], icon: mn },
        { name: 'DV', coords: [43.54817843057323, -79.66215776528784], icon: dv },
        { name: 'IB', coords: [43.551319640061756, -79.6638291096294], icon: ib },
        { name: 'KN', coords: [43.54799733262493, -79.6630301074095], icon: kn },
        { name: 'CC', coords: [43.5498541560917, -79.66286923503439], icon: cc },
    ];

    return (
        <MapContainer center={position} zoom={16} style={{ width: '100%', height: '100vh' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={location.coords}
                    icon={createIcon(location.icon)} // Assign correct icon per location
                    eventHandlers={{
                        click: (e) => console.log(`${location.name} marker clicked`, e),
                    }}
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
