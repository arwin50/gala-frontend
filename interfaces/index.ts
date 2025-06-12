import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { LatLng } from "react-native-maps";

export interface DetailsIntroInterface {
  onGetStarted: () => void;
}

export type PropertyType = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export interface PlaceTypeSlideProps {
  setSelectedType: (type: Category) => void;
  initialType?: Category | null;
}

export interface PlaceLocationSlideProps {
  setMarkerCoords: (coords: LatLng | null) => void;
  setLocationName: (name: string) => void;
  initialMarkerCoords?: LatLng | null;
  initialLocationName?: string;
}

export interface BasicInformationProps {
  setGuests: (guests: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setBathrooms: (bathrooms: number) => void;
  initialGuests?: number;
  initialBedrooms?: number;
  initialBathrooms?: number;
}

export type Amenity = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export interface PlaceAmenitiesSlideProps {
  setSelectedAmenities: (amenities: string[]) => void;
  initialAmenities?: string[];
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
  verificationImage?: string | null;
  setVerificationImage: (uri: string | null) => void;
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
  amenities: string[];
  media: {
    items: MediaItem[];
    coverPhotoId: string | null;
  };
  description: {
    name: string;
    text: string;
  };
  pricing: {
    basePrice: number;
  };
  policies: {
    cancellation: CancellationPolicy;
  };
  rules: {
    toggle: ToggleRulesState;
    set: SetRulesState;
    additional: string[];
  };
  contact: {
    phone: string;
    email: string;
  };
  verification: {
    image: string | null;
  };
  // Updated discounts field type
  discounts: { type: string; percentage: number }[];
}
