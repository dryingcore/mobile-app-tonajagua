import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
interface GoogleMapProps {
  address: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ address }) => {
  const apiKey = "";
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
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
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default GoogleMapComponent;
