import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { useEffect } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { MediaItem, PlaceMediaSlideProps } from "../../../interfaces";

export default function PlaceMediaSlide({
  media,
  setMedia,
  coverPhotoId,
  setCoverPhotoId,
}: PlaceMediaSlideProps) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    (async () => {
      if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
        await requestPermission();
      }
    })();
  }, [status]);

  const handleAddMedia = async () => {
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert(
        "Permission Required",
        "Please grant access to your media library to add photos."
      );
      await requestPermission();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newMediaItems: MediaItem[] = result.assets.map(
        (asset: ImagePickerAsset) => ({
          id: asset.uri,
          type: (asset.type === "image" ? "photo" : "video") as
            | "photo"
            | "video",
          uri: asset.uri,
        })
      );
      setMedia([...media, ...newMediaItems]);

      // Automatically set the first added image as cover if no cover exists and it's a photo
      if (coverPhotoId === null) {
        const firstPhoto = newMediaItems.find((item) => item.type === "photo");
        if (firstPhoto) {
          setCoverPhotoId(firstPhoto.id);
        }
      }
    }
  };

  const handleDeleteMedia = (id: string) => {
    const newMedia = media.filter((item) => item.id !== id);
    setMedia(newMedia);

    // If the deleted item was the cover photo, clear the cover photo state and set the next photo as cover if available
    if (coverPhotoId === id) {
      setCoverPhotoId(null);
      const remainingPhotos = newMedia.filter((item) => item.type === "photo");
      if (remainingPhotos.length > 0) {
        setCoverPhotoId(remainingPhotos[0].id);
      }
    }
  };

  const handleSetCoverPhoto = (id: string) => {
    // Only set as cover if it's a photo (not a video)
    const item = media.find((item) => item.id === id);
    if (item && item.type === "photo") {
      setCoverPhotoId(id);
    } else {
      Alert.alert(
        "Cannot Set as Cover",
        "Only photos can be set as the cover photo."
      );
    }
  };

  const showMediaOptions = (item: MediaItem) => {
    Alert.alert("Media Options", "Choose an action:", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Set as Cover Photo",
        onPress: () => {
          if (item.type === "photo") {
            handleSetCoverPhoto(item.id);
          } else {
            Alert.alert(
              "Cannot Set as Cover",
              "Only photos can be set as the cover photo."
            );
          }
        },
      },
      {
        text: "Delete Photo",
        onPress: () => handleDeleteMedia(item.id),
        style: "destructive",
      },
    ]);
  };

  // Determine how many placeholder slots to show (e.g., minimum 5 photos + add button)
  const minMediaSlots = 5;
  const totalSlots = Math.max(media.length, minMediaSlots - 1) + 1;
  const slotsToRender = Array.from({ length: totalSlots });

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        Add some photos of your place
      </Text>
      <Text className="mt-2 text-description">
        You&apos;ll need 5 photos to get started. You can make changes after
        publishing later.
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-6 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between relative">
          {slotsToRender.map((_, i) => {
            const item = media[i];
            const isCover = coverPhotoId === item?.id;

            if (item) {
              return (
                <View
                  key={item.id}
                  className={`w-[48%] h-[140px] mb-8 shadow bg-gray-200 rounded-lg overflow-hidden ${
                    isCover ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <Image
                    source={{ uri: item.uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {isCover && (
                    <View className="absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        Cover
                      </Text>
                    </View>
                  )}

                  <Pressable
                    onPress={() => showMediaOptions(item)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={20}
                      color="white"
                    />
                  </Pressable>
                </View>
              );
            } else if (i === media.length) {
              return (
                <Pressable
                  key="add-media"
                  onPress={handleAddMedia}
                  className="w-[48%] h-[140px] mb-8 shadow border-2 border-dashed border-blue-400 rounded-lg p-4 items-center justify-center bg-white"
                >
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={32}
                    color="#3b82f6"
                  />
                  <Text className="mt-2 text-center font-medium text-blue-600">
                    Add picture
                  </Text>
                </Pressable>
              );
            } else {
              return (
                <View
                  key={`placeholder-${i}`}
                  className="w-[48%] h-[140px] mb-8 shadow bg-gray-100 rounded-lg"
                />
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
}
