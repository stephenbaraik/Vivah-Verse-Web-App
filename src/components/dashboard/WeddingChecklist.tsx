import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { CheckSquare, Square, ArrowLeft } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistCategory {
  title: string;
  tasks: Task[];
}

const INITIAL_CHECKLIST: ChecklistCategory[] = [
  {
    title: '12+ Months Out',
    tasks: [
      { id: 't1', text: 'Set a wedding budget', completed: true },
      { id: 't2', text: 'Choose your wedding party', completed: true },
      { id: 't3', text: 'Create a guest list draft', completed: false },
      { id: 't4', text: 'Book venue', completed: false },
      { id: 't5', text: 'Hire a wedding planner', completed: false },
    ],
  },
  {
    title: '8-10 Months Out',
    tasks: [
      { id: 't6', text: 'Book photographer and videographer', completed: false },
      { id: 't7', text: 'Book caterer and band/DJ', completed: false },
      { id: 't8', text: 'Shop for wedding dress', completed: false },
      { id: 't9', text: 'Send save-the-dates', completed: false },
    ],
  },
  {
    title: '4-6 Months Out',
    tasks: [
      { id: 't10', text: 'Finalize guest list', completed: false },
      { id: 't11', text: 'Book florist and decor', completed: false },
      { id: 't12', text: 'Arrange transportation', completed: false },
    ],
  },
  {
    title: '2-3 Months Out',
    tasks: [
      { id: 't13', text: 'Mail wedding invitations', completed: false },
      { id: 't14', text: 'Schedule hair and makeup trials', completed: false },
      { id: 't15', text: 'Finalize menu with caterer', completed: false },
    ],
  },
];

interface WeddingChecklistProps {
  onBack: () => void;
}

export const WeddingChecklist: React.FC<WeddingChecklistProps> = ({ onBack }) => {
  const [checklist, setChecklist] = useState<ChecklistCategory[]>(INITIAL_CHECKLIST);

  const handleToggleTask = (taskId: string) => {
    setChecklist(
      checklist.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
  };
  
  const totalTasks = checklist.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const completedTasks = checklist.reduce((acc, cat) => acc + cat.tasks.filter(t => t.completed).length, 0);
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
      <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </button>
       
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-light text-vivah-burgundy mb-2">The Ultimate Checklist</h1>
          <p className="text-lg text-vivah-burgundy/60">Stay organized every step of the way.</p>
        </div>
      </div>

      <GlassCard className="p-8 mb-10">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-bold text-vivah-burgundy">Overall Progress</p>
          <p className="text-sm font-bold text-vivah-burgundy">{Math.round(progress)}%</p>
        </div>
        <div className="w-full bg-vivah-burgundy/10 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-vivah-stem rounded-full transition-all duration-500"
            style={{ width: `${progress}%`}}
          ></div>
        </div>
      </GlassCard>

      <div className="space-y-8">
        {checklist.map(category => (
          <GlassCard key={category.title} className="p-6">
            <h2 className="text-2xl font-bold text-vivah-burgundy mb-4">{category.title}</h2>
            <div className="space-y-3">
              {category.tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    task.completed ? 'bg-green-50/50' : 'hover:bg-white/50'
                  }`}
                >
                  {task.completed ? (
                    <CheckSquare size={20} className="text-vivah-stem mr-4" />
                  ) : (
                    <Square size={20} className="text-vivah-burgundy/30 mr-4" />
                  )}
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

