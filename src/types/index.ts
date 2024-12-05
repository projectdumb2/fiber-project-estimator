export type UnitType = 'each' | 'foot' | 'hour';

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  cost: number;
}

export interface ProjectArea {
  id: string;
  name: string;
  imageUrl: string;
  notes: string;
  homesPassed: number;
  currentCustomers: number;
  units: ProjectUnit[];
}

export interface ProjectUnit {
  unitId: string;
  quantity: number;
}