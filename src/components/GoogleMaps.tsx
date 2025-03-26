import { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface GoogleMapProps {
  address: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          setCoordinates(data.results[0].geometry.location);
        } else {
          console.error("Endereço não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {coordinates ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default GoogleMapComponent;
