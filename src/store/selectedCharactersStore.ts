import { create } from 'zustand';
import type { Character } from '@/types/character';

type SelectedCharactersState = {
  selectedMap: Map<number, Character>;
  toggleCharacter: (character: Character) => void;
  isSelected: (id: number) => boolean;
  unselectAll: () => void;
  getSelectedArray: () => Character[];
};

export const useSelectedCharactersStore = create<SelectedCharactersState>()(
  (set, get) => ({
    selectedMap: new Map(),

    toggleCharacter: (character) => {
      const { selectedMap } = get();
      const newMap = new Map(selectedMap);
      if (newMap.has(character.id)) {
        newMap.delete(character.id);
      } else {
        newMap.set(character.id, character);
      }

      set({ selectedMap: newMap });
    },

    isSelected: (id) => {
      return get().selectedMap.has(id);
    },

    unselectAll: () => {
      set({ selectedMap: new Map() });
    },

    getSelectedArray: () => {
      return Array.from(get().selectedMap.values());
    },
  }),
);
