import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Guest } from '../../types';
import { Users, Copy, Search, UserPlus, Home, Utensils, Phone, ArrowLeft, Trash2, Edit } from 'lucide-react';

interface GuestManagerProps {
  onBack: () => void;
}

const MOCK_GUESTS: Guest[] = [
  { id: '1', name: 'Rahul Sharma', mobile: '+91 9876543210', status: 'Confirmed', mealPreference: 'Veg', roomAssigned: '101' },
  { id: '2', name: 'Priya Verma', mobile: '+91 9876543211', status: 'Confirmed', mealPreference: 'Non-Veg', roomAssigned: '101' },
  { id: '3', name: 'Amit Singh', mobile: '+91 9876543212', status: 'Pending', mealPreference: 'Non-Veg' },
  { id: '4', name: 'Sneha Gupta', mobile: '+91 9876543213', status: 'Declined', mealPreference: 'Veg' },
  { id: '5', name: 'Vikram Malhotra', mobile: '+91 9876543214', status: 'Invited', mealPreference: 'Jain' },
];

const GuestForm: React.FC<{ guest: Partial<Guest> | null, onSave: (guest: Partial<Guest>) => void, onCancel: () => void }> = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState(guest || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-lg focus:ring-vivah-rose focus:border-vivah-rose" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mobile</label>
        <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-lg focus:ring-vivah-rose focus:border-vivah-rose" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" value={formData.status || 'Invited'} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-lg focus:ring-vivah-rose focus:border-vivah-rose">
          <option>Invited</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Declined</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Meal Preference</label>
        <select name="mealPreference" value={formData.mealPreference || 'Veg'} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-lg focus:ring-vivah-rose focus:border-vivah-rose">
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Jain</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Room Assigned</label>
        <input type="text" name="roomAssigned" value={formData.roomAssigned || ''} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-lg focus:ring-vivah-rose focus:border-vivah-rose" />
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-vivah-burgundy text-white rounded-lg font-bold hover:bg-vivah-rose transition-colors">Save Guest</button>
      </div>
    </form>
  );
};

export const GuestManager: React.FC<GuestManagerProps> = ({ onBack }) => {
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);
  const [filter, setFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Declined'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Partial<Guest> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddGuest = () => {
    setEditingGuest({});
    setIsModalOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setEditingGuest(guest);
    setIsModalOpen(true);
  };

  const handleDeleteGuest = (guestId: string) => {
    setGuests(guests.filter(g => g.id !== guestId));
  };

  const handleSaveGuest = (guestData: Partial<Guest>) => {
    if (guestData.id) {
      setGuests(guests.map(g => g.id === guestData.id ? { ...g, ...guestData } as Guest : g));
    } else {
      setGuests([...guests, { ...guestData, id: String(Date.now()) } as Guest]);
    }
    setIsModalOpen(false);
    setEditingGuest(null);
  };
  
  const inviteLink = "vivahverse.com/rahul-priya";
  
  const filteredGuests = guests
    .filter(g => filter === 'All' || g.status === filter)
    .filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'Confirmed').length,
    pending: guests.filter(g => g.status === 'Pending' || g.status === 'Invited').length,
    veg: guests.filter(g => g.mealPreference === 'Veg').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <GlassCard className="w-full max-w-md p-8 bg-white/80">
            <h2 className="text-2xl font-bold text-vivah-burgundy mb-6">{editingGuest?.id ? 'Edit Guest' : 'Add New Guest'}</h2>
            <GuestForm 
              guest={editingGuest}
              onSave={handleSaveGuest}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingGuest(null);
              }}
            />
          </GlassCard>
        </div>
      )}

      <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-light text-vivah-burgundy mb-2">Guest Experience</h1>
          <div className="flex items-center gap-3 bg-white/40 border border-white/60 px-4 py-2 rounded-xl">
            <span className="text-sm font-bold text-vivah-burgundy/60 uppercase">Your Wedding Website:</span>
            <a href="#" className="text-vivah-rose font-bold hover:underline">{inviteLink}</a>
            <button onClick={() => navigator.clipboard.writeText(inviteLink)} className="text-vivah-burgundy/40 hover:text-vivah-burgundy"><Copy size={16} /></button>
          </div>
        </div>
          
        <button onClick={handleAddGuest} className="px-6 py-3 bg-vivah-burgundy text-white rounded-full font-bold flex items-center gap-2 hover:bg-vivah-rose transition-colors shadow-lg hover:scale-105 transform">
          <UserPlus size={18} /> Add Guest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <GlassCard className="p-6 text-center">
          <p className="text-xs font-bold text-vivah-burgundy/40 uppercase mb-1">Total Invited</p>
          <p className="text-3xl font-light text-vivah-burgundy">{stats.total}</p>
        </GlassCard>
        <GlassCard className="p-6 text-center border-emerald-100 bg-emerald-50/50">
          <p className="text-xs font-bold text-emerald-600/60 uppercase mb-1">Confirmed</p>
          <p className="text-3xl font-light text-emerald-700">{stats.confirmed}</p>
        </GlassCard>
        <GlassCard className="p-6 text-center border-orange-100 bg-orange-50/50">
          <p className="text-xs font-bold text-orange-600/60 uppercase mb-1">Pending RSVP</p>
          <p className="text-3xl font-light text-orange-700">{stats.pending}</p>
        </GlassCard>
        <GlassCard className="p-6 text-center">
          <p className="text-xs font-bold text-vivah-burgundy/40 uppercase mb-1">Vegetarian Meals</p>
          <p className="text-3xl font-light text-vivah-burgundy">{stats.veg}</p>
        </GlassCard>
      </div>

      <div className="bg-white/40 border border-white/60 rounded-[2rem] overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="p-6 border-b border-vivah-burgundy/5 flex justify-between items-center bg-white/40">
          <div className="flex gap-2">
            {['All', 'Confirmed', 'Pending', 'Declined'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === f ? 'bg-vivah-burgundy text-white' : 'text-vivah-burgundy/50 hover:bg-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-vivah-burgundy/40" />
            <input 
              type="text" 
              placeholder="Search guests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-white/60 border-none focus:ring-2 focus:ring-vivah-rose/20 text-sm w-48" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 p-4 bg-vivah-burgundy/5 text-xs font-bold text-vivah-burgundy/40 uppercase tracking-widest">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Meal</div>
          <div className="col-span-3">Room Allocation</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-vivah-burgundy/5">
          {filteredGuests.map(guest => (
            <div key={guest.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/60 transition-colors animate-fade-in">
              <div className="col-span-3">
                <p className="font-bold text-vivah-burgundy">{guest.name}</p>
                <p className="text-xs text-vivah-burgundy/50 flex items-center gap-1 mt-1"><Phone size={10}/> {guest.mobile}</p>
              </div>
              <div className="col-span-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  guest.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                  guest.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  guest.status === 'Invited' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {guest.status}
                </span>
              </div>
              <div className="col-span-2 text-sm text-vivah-burgundy/70 flex items-center gap-2">
                <Utensils size={14} className="opacity-50"/> {guest.mealPreference}
              </div>
              <div className="col-span-3">
                {guest.roomAssigned ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-vivah-burgundy">
                    <Home size={14} className="text-vivah-rose" /> Room {guest.roomAssigned}
                  </div>
                ) : (
                  <button className="text-xs font-bold text-vivah-burgundy/40 border border-dashed border-vivah-burgundy/30 px-3 py-1 rounded-lg hover:bg-white hover:border-solid hover:text-vivah-rose transition-all">
                    + Assign Room
                  </button>
                )}
              </div>
              <div className="col-span-2 text-right flex justify-end gap-2">
                <button onClick={() => handleEditGuest(guest)} className="text-vivah-burgundy/40 hover:text-vivah-rose p-2 rounded-full hover:bg-white transition-colors">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDeleteGuest(guest.id)} className="text-vivah-burgundy/40 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

