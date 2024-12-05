import { Unit, ProjectArea, ProjectUnit } from '../types';

export function calculateProjectCosts(project: ProjectArea, units: Unit[]) {
  const unitCosts = project.units.map(projectUnit => {
    const unit = units.find(u => u.id === projectUnit.unitId);
    if (!unit) return { name: 'Unknown', cost: 0 };
    return {
      name: unit.name,
      unitCost: unit.cost,
      quantity: projectUnit.quantity,
      total: unit.cost * projectUnit.quantity,
      type: unit.type
    };
  });

  const totalCost = unitCosts.reduce((sum, item) => sum + item.total, 0);
  const costPerHome = totalCost / project.homesPassed;
  const costPerCustomer = totalCost / project.currentCustomers;

  return {
    unitCosts,
    totalCost,
    costPerHome,
    costPerCustomer
  };
}

export function calculateROI(
  totalCost: number,
  monthlyIncomePerCustomer: number,
  currentCustomers: number
) {
  const annualIncome = monthlyIncomePerCustomer * 12 * currentCustomers;
  const simpleROIYears = totalCost / annualIncome;
  return simpleROIYears;
}