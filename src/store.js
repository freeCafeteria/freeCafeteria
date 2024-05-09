import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

const storage = {
  getItem: (name) =>
    AsyncStorage.getItem(name).then((value) => JSON.parse(value || "{}")),
  setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => AsyncStorage.removeItem(name),
};

const useStore = create(
  persist(
    (set, get) => ({
      age: null,
      location: null,
      subLocation: null,
      userLocation: null,
      selectedCategories: {
        결식: false,
        결식아동: false,
        독거: false,
        저소득: false,
        차상위: false,
        기초생활수급자: false,
        국가유공자: false,
        국가보훈대상자: false,
        장애인: false,
        취약계층: false,
        재가노인: false,
        노숙인: false,
      },
      onboardingCompleted: false,
      favorites: [],
      setAge: (age) => set({ age }),
      setLocation: (location) => set({ location }),
      setSubLocation: (subLocation) => set({ subLocation }),
      setUserLocation: (userLocation) => set({ userLocation }),
      setSelectedCategories: (selectedCategories) =>
        set({ selectedCategories }),
      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: {
            ...state.selectedCategories,
            [category]: !state.selectedCategories[category],
          },
        })),
      completeOnboarding: () => set({ onboardingCompleted: true }),
      toggleFavorite: (cafeteriaName) => {
        const { favorites } = get();
        const updatedFavorites = favorites.includes(cafeteriaName)
          ? favorites.filter((name) => name !== cafeteriaName)
          : [...favorites, cafeteriaName];
        set({ favorites: updatedFavorites });
      },
    }),
    {
      name: "user-settings",
      storage,
    }
  )
);

export const getUserLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      useStore.setState({ userLocation: { latitude, longitude } });
    },
    (error) => console.error(error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    }
  );
};

export default useStore;
