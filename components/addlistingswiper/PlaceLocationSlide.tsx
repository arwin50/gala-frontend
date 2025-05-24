import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
import { PlaceLocationSlideProps } from "../../interfaces";
import LocationMap, { LocationMapRef } from "../common/LocationMap";
import CustomPlacesInput from "./CustomPlaceInput";

export default function PlaceLocationSlide({
  setMarkerCoords,
  setLocationName,
}: PlaceLocationSlideProps) {
  const [currentMarkerCoords, setCurrentMarkerCoords] = useState<LatLng | null>(
    null
  );
  const [currentLocationName, setCurrentLocationName] = useState<string>("");
  const [region, setRegion] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationPermission, setLocationPermission] = useState(false);
  const mapRef = useRef<LocationMapRef>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();
  }, []);

  const getLocationName = async (coords: LatLng) => {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (address) {
        const components = [address.name, address.street, address.city].filter(
          Boolean
        ); // Remove empty/null/undefined values

        const name = components.join(", ");
        setCurrentLocationName(name);
        setLocationName(name);
        return name;
      }
    } catch (error) {
      console.error("Error getting location name:", error);
    }
    return "";
  };

  const setCurrentLocation = async () => {
    if (!locationPermission) {
      alert("Location permission not granted");
      return;
    }

    try {
      // First, get a quick low-accuracy position to show something immediately
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = location.coords;

      // Update map and marker immediately
      const newRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegion(newRegion);
      setCurrentMarkerCoords(coords);
      setMarkerCoords(coords);
      mapRef.current?.animateToRegion(newRegion, 1000);

      // Then get the address in the background
      getLocationName(coords).then((name) => {
        console.log("Current Address:", name);
      });
    } catch (error) {
      console.error("Error getting current location:", error);
      alert("Error getting current location. Please try again.");
    }
  };

  const handleMapPress = async (coords: LatLng) => {
    const newRegion = {
      ...coords,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setRegion(newRegion);
    setCurrentMarkerCoords(coords);
    setMarkerCoords(coords);

    const name = await getLocationName(coords);
    console.log("Selected Location:", name);
  };

  const handlePlaceSelect = async (place: any) => {
    const location = place?.geometry?.location;
    if (!location) {
      console.warn("No location data from selected place:", place);
      return;
    }

    const { lat, lng } = location;
    const coords = { latitude: lat, longitude: lng };

    const newRegion = {
      ...coords,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    setRegion(newRegion);
    setCurrentMarkerCoords(coords);
    setMarkerCoords(coords);

    // Force map to animate to new region
    mapRef.current?.animateToRegion(newRegion, 1000);

    const name = await getLocationName(coords);
    console.log("Selected Place:", name);
  };

  const markers = currentMarkerCoords
    ? [
        {
          coordinate: currentMarkerCoords,
          title: currentLocationName || "Selected Location",
        },
      ]
    : [];

  return (
    <View className="flex-1 m-8 mt-0">
      <View>
        <Text className="text-3xl font-bold">Where is your place</Text>
        <Text className="text-3xl font-bold">located?</Text>
      </View>

      <View className="mt-8 space-y-4">
        <CustomPlacesInput onPlaceSelect={handlePlaceSelect} />

        <TouchableOpacity onPress={setCurrentLocation} className="mb-4">
          <Text className="text-blue-600 mt-2">Use my current location</Text>
        </TouchableOpacity>

        {currentLocationName && (
          <Text className="text-gray-600 mb-2">
            Selected location: {currentLocationName}
          </Text>
        )}

        <LocationMap
          ref={mapRef}
          region={region}
          markers={markers}
          onRegionChange={setRegion}
          onMapPress={handleMapPress}
        />
      </View>
    </View>
  );
}
