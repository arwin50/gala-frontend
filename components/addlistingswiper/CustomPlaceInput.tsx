import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const GOOGLE_API_KEY = "AIzaSyAHIMmOhSyjVfSuGKIBoPQC2jePnPVUmno";

interface PlacePrediction {
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlaceDetails {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface CustomPlacesInputProps {
  onPlaceSelect: (place: PlaceDetails) => void;
}

export default function CustomPlacesInput({
  onPlaceSelect,
}: CustomPlacesInputProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<PlacePrediction[]>([]);

  const fetchSuggestions = async (text: string) => {
    setInput(text);
    if (text.length < 3) return setResults([]);

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:ph`
    );

    setResults(res.data?.predictions || []);
  };

  const handleSelect = async (placeId: string) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&components=country:ph`
    );
    const details = res.data?.result;
    setInput(details.name);
    setResults([]);
    onPlaceSelect(details);
  };

  return (
    <View className="relative">
      <View
        className="flex-row items-center space-x-3 bg-white rounded-lg px-4 border border-gray-300"
        style={{ height: 48 }}
      >
        <Feather name="search" size={20} color="black" className="mr-2" />
        <TextInput
          placeholder="Search location"
          value={input}
          onChangeText={fetchSuggestions}
          className="flex-1 text-lg "
          autoCorrect={false}
          autoCapitalize="none"
          style={{
            height: 40,
            fontSize: 18,
            paddingVertical: 0,
            textAlignVertical: "center",
            marginBottom: 3,
          }}
        />
      </View>

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          className="absolute top-12 left-0 right-0 max-h-80 bg-white border border-gray-300 rounded-lg z-50 shadow-lg"
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-100"
              onPress={() => handleSelect(item.place_id)}
            >
              <Text className="text-base font-medium text-gray-900">
                {item.structured_formatting.main_text}
              </Text>
              <Text className="text-sm text-gray-500">
                {item.structured_formatting.secondary_text}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
