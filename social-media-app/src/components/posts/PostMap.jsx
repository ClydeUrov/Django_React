import React, { useEffect } from 'react';
import L from 'leaflet';

function PostMap({ location }) {
    useEffect(() => {
        const map = L.map('map').setView([0, 0], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        if (location) {
            L.marker(location).addTo(map);
            map.setView(location, 13);
        }
    }, [location]);

    return <div id='map' style={{ height: '400px'}}></div>
}

export default PostMap;