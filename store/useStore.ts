import create from 'zustand';

interface ProfileData {
  name: string;
  age: number | string;
  email: string;
  city: string;
  state: string;
  education: string;
  yearsSinceRetired: number | string;
  yearsUntilRetire: number | string;
  retirementChoice: string;
}

interface QuestionnaireState {
  profile: ProfileData;
  answers: Record<number, any>;
  setProfile: (profile: ProfileData) => void;
  loadProfileFromStorage: () => void;
  setAnswers: (answers: Record<number, any>) => void;
  loadAnswersFromStorage: () => void;
  updateAnswer: (questionId: number, answer: any) => void;
}

const initialProfile: ProfileData = {
  name: '',
  age: '',
  email: '',
  city: '',
  state: '',
  education: '',
  yearsSinceRetired: '',
  yearsUntilRetire: '',
  retirementChoice: '',
};

const useStore = create<QuestionnaireState>((set) => ({
  profile: initialProfile,
  answers: {},
  setProfile: (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile));
    set({ profile });
  },
  loadProfileFromStorage: () => {
    const profile = localStorage.getItem('profile');
    if (profile) {
      set({ profile: JSON.parse(profile) });
    }
  },
  loadAnswersFromStorage: () => {
    const answers = localStorage.getItem('answers');
    if (answers) {
      set({ answers: JSON.parse(answers) });
    }
  },
  setAnswers: (answers) => {
    set({ answers });
  },
  updateAnswer: (questionId, answer) =>
    set((state) => {
        const updatedAnswers = { ...state.answers, [questionId]: answer };
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
        return { answers: updatedAnswers };
      }),
}));

export default useStore;
