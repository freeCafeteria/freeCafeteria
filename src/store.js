import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  getItem: (name) =>
    AsyncStorage.getItem(name).then((value) => JSON.parse(value || "{}")),
  setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => AsyncStorage.removeItem(name),
};

const useStore = create(
  persist(
    (set) => ({
      age: null,
      location: null,
      subLocation: null,
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
      setAge: (age) => set({ age }),
      setLocation: (location) => set({ location }),
      setSubLocation: (subLocation) => set({ subLocation }),
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
    }),
    {
      name: "user-settings",
      storage,
    }
  )
);

export default useStore;
