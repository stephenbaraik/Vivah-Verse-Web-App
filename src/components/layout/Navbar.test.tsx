// Navbar Component Tests
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';
import { AppView } from '../../types';

describe('Navbar Component', () => {
  const defaultProps = {
    currentView: AppView.HOME,
    onNavigate: vi.fn(),
    hasActivePlan: false,
    isAuthenticated: false,
    onLogout: vi.fn()
  };

  it('renders the navbar with logo', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText(/Vivah Verse/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Vision Board/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('shows dashboard link when authenticated', () => {
    render(<Navbar {...defaultProps} isAuthenticated={true} />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('calls onNavigate when navigation link is clicked', () => {
    const onNavigate = vi.fn();
    render(<Navbar {...defaultProps} onNavigate={onNavigate} />);
    
    const aboutLink = screen.getByText(/About/i);
    fireEvent.click(aboutLink);
    
    expect(onNavigate).toHaveBeenCalledWith(AppView.ABOUT);
  });

  it('shows logo image', () => {
    render(<Navbar {...defaultProps} />);
    const logo = screen.getByAltText(/Logo/i);
    expect(logo).toBeInTheDocument();
  });
});

