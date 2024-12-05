import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { calculateProjectCosts, calculateROI } from '../utils/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Printer } from 'lucide-react';

function ProjectSummary() {
  const { id } = useParams<{ id: string }>();
  const { projects, units, monthlyIncomePerCustomer } = useStore();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const { unitCosts, totalCost, costPerHome, costPerCustomer } = calculateProjectCosts(project, units);
  const roiYears = calculateROI(totalCost, monthlyIncomePerCustomer, project.currentCustomers);
  const takeRate = (project.currentCustomers / project.homesPassed) * 100;

  const chartData = unitCosts.map(cost => ({
    name: cost.name,
    cost: cost.total
  }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="mt-2 text-gray-600">{project.notes}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <Printer className="w-4 h-4" />
          <span>Print Summary</span>
        </button>
      </div>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
          <p className="mt-2 text-3xl font-bold">${totalCost.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Cost per Home</h3>
          <p className="mt-2 text-3xl font-bold">${costPerHome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Take Rate</h3>
          <p className="mt-2 text-3xl font-bold">{takeRate.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">ROI (Years)</h3>
          <p className="mt-2 text-3xl font-bold">{roiYears.toFixed(1)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cost Breakdown</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Detailed Costs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost per Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unitCosts.map((cost, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{cost.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cost.quantity} {cost.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${cost.unitCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${cost.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;