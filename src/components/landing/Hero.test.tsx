// Hero Component Tests
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './Hero';

describe('Hero Component', () => {
  const defaultProps = {
    selectedDate: '',
    onDateChange: vi.fn(),
    onStart: vi.fn()
  };

  it('renders the hero section with title', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Your Wedding/i)).toBeInTheDocument();
  });

  it('shows date picker with month and year', () => {
    render(<Hero {...defaultProps} />);
    // The calendar shows current month
    const currentDate = new Date();
    const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    expect(screen.getByText(new RegExp(monthYear, 'i'))).toBeInTheDocument();
  });

  it('shows start planning button', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Begin Journey/i)).toBeInTheDocument();
  });

  it('shows Premium Wedding OS label', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Premium Wedding OS/i)).toBeInTheDocument();
  });

  it('displays calendar header with month navigation', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Select Auspicious Date/i)).toBeInTheDocument();
  });

  it('shows legend for calendar dates', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Muhurat/i)).toBeInTheDocument();
  });

  it('shows main heading with Stress-Free text', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/Stress-Free/i)).toBeInTheDocument();
  });

  it('has a description paragraph', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/We manage the entire wedding end-to-end/i)).toBeInTheDocument();
  });
});

