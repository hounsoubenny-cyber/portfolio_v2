export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface Skill {
  id: string;
  category: {
    en: string;
    fr: string;
  };
  icon: string;
  colorClass: string;
  bgClass: string;
  description: {
    en: string;
    fr: string;
  };
  list: {
    name: {
      en: string;
      fr: string;
    };
    level: string; // e.g. "Expert", "Advanced", "Intermediate"
    percentage: number;
  }[];
  tags: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: {
    en: string;
    fr: string;
  };
  institution: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
}
