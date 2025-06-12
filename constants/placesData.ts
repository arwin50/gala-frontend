import bgAklan from "@/assets/images/places_pic/places_aklan.jpg";
import bgBohol from "@/assets/images/places_pic/places_bohol.jpg";
import bgCebu from "@/assets/images/places_pic/places_cebu.jpg";
import bgLaUnion from "@/assets/images/places_pic/places_laUnion.jpg";
import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";

import iconAklan from "@/assets/images/places_icons/places_aklan.png";
import iconBohol from "@/assets/images/places_icons/places_bohol.png";
import iconCebu from "@/assets/images/places_icons/places_cebu.png";
import iconLaUnion from "@/assets/images/places_icons/places_laUnion.png";
import iconMetroManila from "@/assets/images/places_icons/places_metroManila.png";

import { sampleLandmarks } from "./landmark";

export const places = [
  {
    name: "Metro Manila",
    background: bgMetroManila,
    icon: iconMetroManila,
    landmarks: [
      sampleLandmarks[0],
      sampleLandmarks[1],
      sampleLandmarks[2],
      sampleLandmarks[3],
      sampleLandmarks[4],
    ],
  },
  {
    name: "Cebu",
    background: bgCebu,
    icon: iconCebu,
    landmarks: [
      sampleLandmarks[2],
      sampleLandmarks[5],
      sampleLandmarks[3],
      sampleLandmarks[1],
      sampleLandmarks[4],
    ],
  },
  {
    name: "Aklan",
    background: bgAklan,
    icon: iconAklan,
    landmarks: [
      sampleLandmarks[3],
      sampleLandmarks[1],
      sampleLandmarks[2],
      sampleLandmarks[3],
      sampleLandmarks[4],
    ],
  },
  {
    name: "La Union",
    background: bgLaUnion,
    icon: iconLaUnion,
    landmarks: [
      sampleLandmarks[5],
      sampleLandmarks[4],
      sampleLandmarks[3],
      sampleLandmarks[1],
      sampleLandmarks[4],
    ],
  },
  {
    name: "Bohol",
    background: bgBohol,
    icon: iconBohol,
    landmarks: [
      sampleLandmarks[0],
      sampleLandmarks[1],
      sampleLandmarks[2],
      sampleLandmarks[3],
      sampleLandmarks[4],
    ],
  },
];
