export interface Card {
  slug: string;
  title: string;
  emoji: string;
  diaryText: string;
  interactiveType: string;
  visualHook: string;
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
}