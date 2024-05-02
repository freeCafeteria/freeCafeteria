import { create } from "zustand";

const useStore = create((set) => {
  const initialCategories = {
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
  };

  return {
    age: null,
    location: null,
    subLocation: null,
    selectedCategories: initialCategories,
    setAge: (age) => set({ age }),
    setLocation: (location) => set({ location }),
    setSubLocation: (subLocation) => set({ subLocation }),
    setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
    toggleCategory: (category) =>
      set((state) => ({
        selectedCategories: {
          ...state.selectedCategories,
          [category]: !state.selectedCategories[category],
        },
      })),
  };
});

export default useStore;
