export interface Card {
  slug: string;
  title: string;
  emoji: string;
  diaryText: string;
  interactiveType: string;
  visualHook: string;
  /** Short alt-text / caption for the anchor image */
  visualDescription?: string;
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
}