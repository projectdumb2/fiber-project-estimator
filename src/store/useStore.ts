import { create } from 'zustand';
import { Unit, ProjectArea } from '../types';

interface Store {
  units: Unit[];
  projects: ProjectArea[];
  monthlyIncomePerCustomer: number;
  addUnit: (unit: Unit) => void;
  updateUnit: (unit: Unit) => void;
  addProject: (project: ProjectArea) => void;
  updateProject: (project: ProjectArea) => void;
  setMonthlyIncomePerCustomer: (amount: number) => void;
}

export const useStore = create<Store>((set) => ({
  units: [],
  projects: [],
  monthlyIncomePerCustomer: 0,
  addUnit: (unit) => set((state) => ({ units: [...state.units, unit] })),
  updateUnit: (unit) =>
    set((state) => ({
      units: state.units.map((u) => (u.id === unit.id ? unit : u)),
    })),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
  setMonthlyIncomePerCustomer: (amount) =>
    set({ monthlyIncomePerCustomer: amount }),
}));