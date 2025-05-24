import { LocationMapProps } from "@/interfaces";
import { useRef } from "react";
import { View } from "react-native";
import MapViewClustering from "react-native-map-clustering";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function LocationMap({
  region,
  markers = [],
  onRegionChange,
  onMapPress,
  readOnly = false,
  ref,
}: LocationMapProps) {
  const mapRef = useRef<MapView | null>(null);

  return (
    <View className="w-full h-72 rounded-xl overflow-hidden mt-4 border border-gray-300">
      <MapViewClustering
        style={{ width: "100%", height: "100%" }}
        mapRef={(ref) => {
          mapRef.current = ref;
        }}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={readOnly ? undefined : onRegionChange}
        onPress={
          readOnly
            ? undefined
            : (e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                onMapPress?.({ latitude, longitude });
              }
        }
        scrollEnabled={!readOnly}
        zoomEnabled={!readOnly}
        rotateEnabled={!readOnly}
        pitchEnabled={!readOnly}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            draggable={!readOnly}
          />
        ))}
      </MapViewClustering>
    </View>
  );
}
