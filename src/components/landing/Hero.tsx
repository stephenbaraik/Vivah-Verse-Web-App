import React, { useState, useEffect, useMemo, memo, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { isAuspiciousDate, isBookedDate } from '../../constants';

// Extracted calendar logic helper
const useCalendar = (selectedDate: string) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number, onDateChange: (date: string) => void) => {
    const newDateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateChange(newDateStr);
  };

  return {
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    formatDate,
    getDaysInMonth,
    getFirstDayOfMonth,
  };
};

// Memoized Date Cell Component for performance
const DateCell = memo(({ 
  day, 
  currentDate, 
  selectedDate, 
  onDateClick,
  formatDate,
  getDaysInMonth,
  getFirstDayOfMonth 
}: {
  day: number;
  currentDate: Date;
  selectedDate: string;
  onDateClick: (day: number) => void;
  formatDate: (y: number, m: number, d: number) => string;
  getDaysInMonth: (d: Date) => number;
  getFirstDayOfMonth: (d: Date) => number;
}) => {
  const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
  const isSelected = selectedDate === dateString;
  const today = useMemo(() => new Date(), []);
  today.setHours(0, 0, 0, 0);
  const isPast = dateToCheck < today;
  const isBooked = isBookedDate(dateToCheck);
  const isGold = isAuspiciousDate(dateToCheck);

  const baseClass = `
    h-12 w-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 relative group
    ${isSelected 
      ? 'bg-gradient-gold text-white shadow-lg animate-pop-in z-10' 
      : isPast 
        ? 'text-gray-200 cursor-not-allowed' 
        : isBooked
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : isGold
             ? 'border-2 border-vivah-gold/40 text-vivah-gold hover:bg-vivah-gold hover:text-white font-bold'
             : 'text-vivah-burgundy/80 hover:bg-vivah-petal hover:scale-110'
    }
  `;

  return (
    <button
      onClick={() => !isPast && !isBooked && onDateClick(day)}
      disabled={isPast || isBooked}
      className={baseClass}
      aria-label={`Select date: ${dateString}`}
      aria-selected={isSelected}
      aria-disabled={isPast || isBooked}
    >
      {day}
      {isGold && !isBooked && !isPast && !isSelected && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-vivah-gold rounded-full" aria-hidden="true" />
      )}
    </button>
  );
});

DateCell.displayName = 'DateCell';

interface HeroProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = memo(({ 
  selectedDate, 
  onDateChange, 
  onStart 
}) => {
  const calendar = useCalendar(selectedDate);
  const today = useMemo(() => new Date(), []);
  today.setHours(0, 0, 0, 0);
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Generate calendar grid cells
  const gridCells = useMemo(() => {
    const cells: React.ReactNode[] = [];
    const totalDays = calendar.getDaysInMonth(calendar.currentDate);
    const startDay = calendar.getFirstDayOfMonth(calendar.currentDate);

    // Empty cells for days before first day of month
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-12 w-12" />);
    }

    // Day cells
    for (let d = 1; d <= totalDays; d++) {
      cells.push(
        <DateCell
          key={d}
          day={d}
          currentDate={calendar.currentDate}
          selectedDate={selectedDate}
          onDateClick={(day) => calendar.handleDateClick(day, onDateChange)}
          formatDate={calendar.formatDate}
          getDaysInMonth={calendar.getDaysInMonth}
          getFirstDayOfMonth={calendar.getFirstDayOfMonth}
        />
      );
    }
    return cells;
  }, [calendar, selectedDate, onDateChange]);

  return (
    <div className="w-full flex flex-col gap-40 pb-32">
      <div className="relative min-h-[90vh] flex items-center justify-center p-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] right-[5%] w-[40rem] h-[40rem] bg-vivah-gold/10 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[5%] left-[5%] w-[45rem] h-[45rem] bg-pink-100/30 rounded-full blur-[120px] animate-blob delay-700"></div>
        </div>
        
        <div className="max-w-[90rem] w-full grid lg:grid-cols-12 gap-20 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-12 animate-slide-up text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/50 border border-white shadow-sm hover:scale-105 transition-transform cursor-default">
              <span className="w-3 h-3 rounded-full bg-vivah-gold animate-pulse"></span>
              <span className="text-sm font-bold text-vivah-burgundy tracking-[0.25em] uppercase">Premium Wedding OS</span>
            </div>
            <h1 className="font-sans font-light text-8xl md:text-[9rem] lg:text-[10rem] text-vivah-burgundy leading-[0.85] tracking-tighter mb-8">
              Your Wedding,<br/> <span className="text-gradient-gold font-semibold">Stress-Free.</span>
            </h1>
            <p className="font-sans text-2xl md:text-3xl text-vivah-burgundy/70 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              We manage the entire wedding end-to-end, so you can enjoy the celebration.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              className="hidden lg:flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-vivah-burgundy/40 hover:text-vivah-gold transition-all hover:gap-6 group"
              aria-label="Explore more features"
            >
              Explore More <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-5 relative animate-pop-in delay-200">
            <div className="absolute -inset-4 bg-gradient-to-b from-vivah-gold/20 to-transparent rounded-[3rem] blur-2xl opacity-60"></div>
            <GlassCard className="bg-white/80 p-12 rounded-[3rem] shadow-2xl backdrop-blur-2xl relative z-10 border border-white">
              <div className="flex flex-col gap-10">
                <div className="flex items-end justify-between border-b border-gray-100 pb-8">
                  <div>
                    <span className="text-sm font-bold text-vivah-gold uppercase tracking-widest block mb-2">Select Auspicious Date</span>
                    <span className="text-4xl font-light text-vivah-burgundy">{months[calendar.currentDate.getMonth()]} {calendar.currentDate.getFullYear()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={calendar.handlePrevMonth} 
                      className="p-3 rounded-full hover:bg-white text-vivah-burgundy/60 hover:text-vivah-burgundy transition-colors hover:shadow-md"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={calendar.handleNextMonth} 
                      className="p-3 rounded-full hover:bg-white text-vivah-burgundy/60 hover:text-vivah-burgundy transition-colors hover:shadow-md"
                      aria-label="Next month"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center" role="grid" aria-label="Calendar">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-xs font-bold text-vivah-burgundy/30 uppercase mb-3 tracking-widest" role="columnheader">
                      {day}
                    </div>
                  ))}
                  {gridCells}
                </div>

                <div className="flex items-center gap-4 text-xs text-vivah-burgundy/60 justify-center" role="list" aria-label="Legend">
                  <div className="flex items-center gap-1" role="listitem"><span className="w-3 h-3 rounded-full bg-vivah-gold" aria-hidden="true"></span> Muhurat</div>
                  <div className="flex items-center gap-1" role="listitem"><span className="w-3 h-3 rounded-full bg-vivah-burgundy/80" aria-hidden="true"></span> Available</div>
                  <div className="flex items-center gap-1" role="listitem"><span className="w-3 h-3 rounded-full bg-gray-300" aria-hidden="true"></span> Booked</div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onStart}
                    disabled={!selectedDate}
                    className={`
                      w-full py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300
                      ${selectedDate 
                        ? 'bg-gradient-gold text-white shadow-xl shadow-vivah-gold/20 hover:shadow-2xl hover:-translate-y-2' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                    aria-disabled={!selectedDate}
                  >
                    Begin Journey <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

