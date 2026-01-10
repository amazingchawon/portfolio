export type SectionId = 'about' | 'skills' | 'experience' | 'projects'

export type Section = {
  id: SectionId
  label: {
    ko: string
    en: string
  }
}

export const SECTIONS: Section[] = [
  { id: 'about', label: { ko: '소개', en: 'About' } },
  { id: 'skills', label: { ko: '기술', en: 'Skills' } },
  { id: 'experience', label: { ko: '경험', en: 'Experience' } },
  { id: 'projects', label: { ko: '프로젝트', en: 'Projects' } },
]
