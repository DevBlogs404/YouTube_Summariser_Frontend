import { create } from "zustand";

export interface SummaryState {
  youtubeUrl: string;
  summarizedText: string;
  setYoutubeUrl: (url: string) => void;
  setSummarizedText: (text: string) => void;
}

const SummaryStore = create<SummaryState>((set) => ({
  youtubeUrl: "",
  summarizedText: "",
  setYoutubeUrl: (url) => set({ youtubeUrl: url }),
  setSummarizedText: (text) => set({ summarizedText: text }),
}));

export default SummaryStore;
