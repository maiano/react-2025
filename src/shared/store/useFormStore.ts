import { create } from 'zustand';
import type { FormData } from '@/shared/validation/schema';

type FormStore = {
  uncontrolledForms: FormData | null;
  controlledForms: FormData | null;
  setUncontrolledForms: (data: FormData) => void;
  setControlledForms: (data: FormData) => void;
  clearData: () => void;
};

export const useFormStore = create<FormStore>((set) => ({
  uncontrolledForms: null,
  controlledForms: null,
  setUncontrolledForms: (data) => set({ uncontrolledForms: data }),
  setControlledForms: (data) => set({ controlledForms: data }),
  clearData: () => set({ uncontrolledForms: null, controlledForms: null }),
}));
