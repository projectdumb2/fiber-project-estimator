import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProjectForm from '../components/ProjectForm';
import { ProjectUnit } from '../types';

function ProjectEstimator() {
  const navigate = useNavigate();
  const { units, addProject } = useStore();
  const [selectedUnits, setSelectedUnits] = useState<ProjectUnit[]>([]);

  const handleUnitChange = (unitId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedUnits(prev => prev.filter(u => u.unitId !== unitId));
    } else {
      setSelectedUnits(prev => {
        const existing = prev.find(u => u.unitId === unitId);
        if (existing) {
          return prev.map(u => u.unitId === unitId ? { ...u, quantity } : u);
        }
        return [...prev, { unitId, quantity }];
      });
    }
  };

  const handleSubmit = (formData: FormData) => {
    const project = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      imageUrl: formData.get('imageUrl') as string,
      notes: formData.get('notes') as string,
      homesPassed: Number(formData.get('homesPassed')),
      currentCustomers: Number(formData.get('currentCustomers')),
      units: selectedUnits
    };

    addProject(project);
    navigate(`/summary/${project.id}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">New Project Estimate</h1>
        <p className="mt-2 text-gray-600">
          Create a new fiber project estimate by filling out the details below.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProjectForm
          onSubmit={handleSubmit}
          units={units}
          selectedUnits={selectedUnits}
          onUnitChange={handleUnitChange}
        />
      </div>
    </div>
  );
}

export default ProjectEstimator;