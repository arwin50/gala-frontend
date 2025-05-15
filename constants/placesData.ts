import bgAklan from "@/assets/images/places_pic/places_aklan.jpg";
import bgCebu from "@/assets/images/places_pic/places_cebu.jpg";
import bgBohol from "@/assets/images/places_pic/places_bohol.jpg";
import bgLaUnion from "@/assets/images/places_pic/places_laUnion.jpg";
import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";

import iconAklan from "@/assets/images/places_icons/places_aklan.png";
import iconBohol from "@/assets/images/places_icons/places_bohol.png";
import iconCebu from "@/assets/images/places_icons/places_cebu.png";
import iconLaUnion from "@/assets/images/places_icons/places_laUnion.png";
import iconMetroManila from "@/assets/images/places_icons/places_metroManila.png";

export const places = [
  {
    name: "Metro Manila",
    subtitle: "Gala na sa Metro Gwapo!",
    isFeatured: true,
    background: bgMetroManila,
    icon: iconMetroManila,
  },
  {
    name: "Cebu",
    background: bgCebu,
    icon: iconCebu,
  },
  {
    name: "Aklan",
    background: bgAklan,
    icon: iconAklan,
  },
  {
    name: "La Union",
    background: bgLaUnion,
    icon: iconLaUnion,
  },
  {
    name: "Bohol",
    background: bgBohol,
    icon: iconBohol,
  },
];
