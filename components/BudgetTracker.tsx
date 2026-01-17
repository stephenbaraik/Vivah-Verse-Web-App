import React, { useState, useMemo } from 'react';
import { GlassCard } from './GlassCard';
import { Expense } from '../types';
import { IndianRupee, Plus, MoreHorizontal, Trash2, Edit, ArrowLeft, TrendingUp, TrendingDown, ChevronsUpDown, Tag, ShoppingBag, Edit3 } from 'lucide-react';

interface BudgetTrackerProps {
  onBack: () => void;
}

const MOCK_EXPENSES: Expense[] = [
  { id: '1', category: 'Venue', item: 'Palace Greens', estimatedCost: 250000, actualCost: 275000, status: 'Paid' },
  { id: '2', category: 'Catering', item: 'Royal Chefs', estimatedCost: 150000, actualCost: 145000, status: 'Paid' },
  { id: '3', category: 'Attire', item: 'Bride\'s Lehengas', estimatedCost: 75000, actualCost: 85000, status: 'Paid' },
  { id: '4', category: 'Photography', item: 'Shutter Stories', estimatedCost: 50000, actualCost: 0, status: 'Booked' },
  { id: '5', category: 'Decor', item: 'Floral Dreams', estimatedCost: 60000, actualCost: 0, status: 'Pending' },
];

const CATEGORIES = ['Venue', 'Catering', 'Attire', 'Decor', 'Photography', 'Music', 'Transportation', 'Gifts', 'Other'];

const ExpenseForm: React.FC<{ expense: Partial<Expense> | null, onSave: (expense: Partial<Expense>) => void, onCancel: () => void }> = ({ expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState(expense || { status: 'Pending' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white/50 focus:ring-vivah-rose focus:border-vivah-rose">
            <option value="" disabled>Select a Category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item / Vendor</label>
          <input type="text" name="item" value={formData.item || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white/50 focus:ring-vivah-rose focus:border-vivah-rose" placeholder="e.g. Royal Chefs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
          <input type="number" name="estimatedCost" value={formData.estimatedCost || ''} onChange={handleCostChange} className="w-full p-2 border rounded-lg bg-white/50 focus:ring-vivah-rose focus:border-vivah-rose" placeholder="₹50,000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Actual Cost</label>
          <input type="number" name="actualCost" value={formData.actualCost || ''} onChange={handleCostChange} className="w-full p-2 border rounded-lg bg-white/50 focus:ring-vivah-rose focus:border-vivah-rose" placeholder="₹55,000" />
        </div>
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-vivah-burgundy text-white rounded-lg font-bold hover:bg-vivah-rose transition-colors">Save Expense</button>
      </div>
    </form>
  );
};

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ onBack }) => {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [totalBudget, setTotalBudget] = useState(800000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Partial<Expense> | null>(null);

  const { totalSpent, totalEstimated, remainingBudget, overBudget } = useMemo(() => {
    const totalSpent = expenses.reduce((acc, exp) => acc + (exp.actualCost || 0), 0);
    const totalEstimated = expenses.reduce((acc, exp) => acc + exp.estimatedCost, 0);
    const remainingBudget = totalBudget - totalSpent;
    const overBudget = totalSpent > totalBudget;
    return { totalSpent, totalEstimated, remainingBudget, overBudget };
  }, [expenses, totalBudget]);

  const spendingPercentage = (totalSpent / totalBudget) * 100;

  const handleAddExpense = () => {
    setEditingExpense({});
    setIsModalOpen(true);
  };
  
  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };
  
  const handleSaveExpense = (expenseData: Partial<Expense>) => {
    if (expenseData.id) {
        setExpenses(prev => prev.map(e => e.id === expenseData.id ? {...e, ...expenseData} as Expense : e));
    } else {
        setExpenses(prev => [...prev, { ...expenseData, id: String(Date.now()) } as Expense]);
    }
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
       {isModalOpen && (
         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
           <GlassCard className="w-full max-w-lg p-8 bg-white/80">
             <h2 className="text-2xl font-bold text-vivah-burgundy mb-6">{editingExpense?.id ? 'Edit Expense' : 'Add New Expense'}</h2>
             <ExpenseForm 
               expense={editingExpense}
               onSave={handleSaveExpense}
               onCancel={() => setIsModalOpen(false)}
             />
           </GlassCard>
         </div>
       )}
       
       <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
            <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
       </button>
      
       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
              <h1 className="text-4xl font-light text-vivah-burgundy mb-2">Budget Command Center</h1>
              <p className="text-lg text-vivah-burgundy/60">Take control of your wedding finances.</p>
          </div>
          <button onClick={handleAddExpense} className="px-6 py-3 bg-vivah-burgundy text-white rounded-full font-bold flex items-center gap-2 hover:bg-vivah-rose transition-colors shadow-lg hover:scale-105 transform">
              <Plus size={18} /> Add Expense
          </button>
       </div>
      
       {/* Main Budget Card */}
       <GlassCard className="p-8 mb-10">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <label className="text-xs font-bold text-vivah-burgundy/40 uppercase">Total Budget</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input 
                          type="number" 
                          value={totalBudget} 
                          onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)} 
                          className="text-3xl font-light text-vivah-burgundy bg-transparent w-full focus:outline-none"
                        />
                        <Edit3 size={16} className="text-vivah-burgundy/30 cursor-pointer"/>
                    </div>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-1">
                        <p className="text-sm font-bold text-vivah-burgundy">
                            Spent: <span className="font-mono">₹{totalSpent.toLocaleString('en-IN')}</span>
                        </p>
                         <p className={`text-sm font-bold ${overBudget ? 'text-red-500' : 'text-emerald-600'}`}>
                            {overBudget ? 'Over Budget by' : 'Remaining:'} <span className="font-mono">₹{Math.abs(remainingBudget).toLocaleString('en-IN')}</span>
                        </p>
                    </div>
                    <div className="w-full bg-vivah-burgundy/10 rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${overBudget ? 'bg-red-500' : 'bg-vivah-stem'}`} 
                          style={{ width: `${Math.min(spendingPercentage, 100)}%`}}
                        ></div>
                    </div>
                </div>
            </div>
       </GlassCard>

       {/* Expense Table */}
       <div className="bg-white/40 border border-white/60 rounded-[2rem] overflow-hidden shadow-sm backdrop-blur-sm">
           <div className="grid grid-cols-12 gap-4 p-4 bg-vivah-burgundy/5 text-xs font-bold text-vivah-burgundy/40 uppercase tracking-widest">
               <div className="col-span-4 flex items-center gap-1"><ShoppingBag size={12}/> Item / Vendor</div>
               <div className="col-span-2 flex items-center gap-1"><Tag size={12}/> Category</div>
               <div className="col-span-2 flex items-center gap-1"><TrendingDown size={12}/> Estimated</div>
               <div className="col-span-2 flex items-center gap-1"><TrendingUp size={12}/> Actual</div>
               <div className="col-span-2 text-right">Actions</div>
           </div>
           
           <div className="divide-y divide-vivah-burgundy/5">
                {expenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/60 transition-colors">
                        <div className="col-span-4 font-bold text-vivah-burgundy">{expense.item}</div>
                        <div className="col-span-2 text-sm text-vivah-burgundy/70">{expense.category}</div>
                        <div className="col-span-2 text-sm font-mono text-vivah-burgundy/70">₹{expense.estimatedCost.toLocaleString('en-IN')}</div>
                        <div className="col-span-2 text-sm font-mono font-bold text-vivah-burgundy">₹{expense.actualCost > 0 ? expense.actualCost.toLocaleString('en-IN') : '-'}</div>
                        <div className="col-span-2 text-right flex justify-end gap-2">
                           <button onClick={() => handleEditExpense(expense)} className="text-vivah-burgundy/40 hover:text-vivah-rose p-2 rounded-full hover:bg-white transition-colors">
                               <Edit size={14} />
                           </button>
                           <button onClick={() => handleDeleteExpense(expense.id)} className="text-vivah-burgundy/40 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
                               <Trash2 size={14} />
                           </button>
                        </div>
                    </div>
                ))}
           </div>
           
           {/* Footer */}
           <div className="grid grid-cols-12 gap-4 p-4 bg-vivah-burgundy/5 text-sm font-bold text-vivah-burgundy/60">
                <div className="col-span-6">Total</div>
                <div className="col-span-2 font-mono">₹{totalEstimated.toLocaleString('en-IN')}</div>
                <div className="col-span-2 font-mono text-vivah-burgundy">₹{totalSpent.toLocaleString('en-IN')}</div>
                <div className="col-span-2"></div>
           </div>
       </div>
    </div>
  );
};
