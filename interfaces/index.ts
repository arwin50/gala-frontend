import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { LatLng } from "react-native-maps";

export interface DetailsIntroInterface {
  onGetStarted: () => void;
}

export type PropertyType = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export interface PlaceTypeSlideProps {
  setSelectedType: (type: string | null) => void;
}

export interface PlaceLocationSlideProps {
  setMarkerCoords: (coords: LatLng | null) => void;
  setLocationName: (name: string) => void;
}

export interface BasicInformationProps {
  setGuests: (guests: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setBathrooms: (bathrooms: number) => void;
}

export type Amenity = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export interface PlaceAmenitiesSlideProps {
  setSelectedAmenities: (amenities: string[]) => void;
}

export interface MarkerData {
  coordinate: LatLng;
  title?: string;
  description?: string;
}

export interface LocationMapProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers?: MarkerData[];
  onRegionChange?: (region: any) => void;
  onMapPress?: (coords: LatLng) => void;
  readOnly?: boolean;
  ref?: MapView;
}

export type MediaItem = {
  id: string;
  type: "photo" | "video";
  uri: string;
};

export interface PlaceMediaSlideProps {
  media: MediaItem[];
  setMedia: (media: MediaItem[]) => void;
  coverPhotoId: string | null;
  setCoverPhotoId: (id: string | null) => void;
}

export interface PlaceNameSlideProps {
  placeName: string;
  setPlaceName: (name: string) => void;
}

export interface PlaceDescriptionSlideProps {
  placeDescription: string;
  setPlaceDescription: (description: string) => void;
}

export interface PlacePriceSlideProps {
  basePrice: number;
  setBasePrice: (price: number) => void;
}

export type CancellationPolicy = {
  name: string;
  description: string;
};

export interface PlaceCancellationSlideProps {
  selectedPolicy: CancellationPolicy;
  setSelectedPolicy: (policy: CancellationPolicy) => void;
}

export type ToggleRulesState = {
  [key: string]: boolean;
};

export type SetRulesState = {
  [key: string]: string;
};

export interface PlaceRulesSlideProps {
  toggleRules: ToggleRulesState;
  setToggleRules: (rules: ToggleRulesState) => void;
  setRuleValues: SetRulesState;
  setSetRuleValues: (rules: SetRulesState) => void;
  additionalRules: string[];
  setAdditionalRules: (rules: string[]) => void;
}

export interface PlaceVerificationSlideProps {
  contactNumber: string;
  setContactNumber: (number: string) => void;
  emailAddress: string;
  setEmailAddress: (email: string) => void;
}

export interface SubmitPlaceProps {
  selectedType: string | null;
  locationName: string;
  markerCoords: LatLng | null;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  selectedAmenities: string[];
  media: MediaItem[];
  coverPhotoId: string | null;
  placeName: string;
  placeDescription: string;
  basePrice: number;
  selectedPolicy: CancellationPolicy;
  toggleRules: ToggleRulesState;
  setRuleValues: SetRulesState;
  additionalRules: string[];
  contactNumber: string;
  emailAddress: string;
}

export interface PlaceProperty {
  placeName: string;
  type: string | null;
  location: {
    name: string;
    coordinates: LatLng | null;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
  };

  // Amenities and Media
  amenities: string[];
  media: {
    items: MediaItem[];
    coverPhotoId: string | null;
  };

  // Description
  description: {
    name: string;
    text: string;
  };

  // Pricing
  pricing: {
    basePrice: number;
  };

  // Policies and Rules
  policies: {
    cancellation: CancellationPolicy;
  };
  rules: {
    toggle: ToggleRulesState;
    set: SetRulesState;
    additional: string[];
  };

  // Contact Information
  contact: {
    phone: string;
    email: string;
  };
}
