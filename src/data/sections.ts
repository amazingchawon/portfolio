export type SectionId = 'about' | 'skills' | 'experience' | 'projects'

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'about', label: '소개' },
  { id: 'skills', label: '기술' },
  { id: 'experience', label: '경험' },
  { id: 'projects', label: '프로젝트' },
]
