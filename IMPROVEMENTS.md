# Vivah-Verse: Suggestions & Improvements

## 1. Security Improvements ✅ DONE
- [x] Added environment variable support (`import.meta.env.VITE_API_URL`)
- [x] Added TypeScript types for authService
- [x] Added `getAuthHeaders()` helper for authenticated API calls

## 2. Error Handling Improvements ✅ DONE
- [x] Added loading states for payment processing
- [x] Replaced `alert()` with inline error messages
- [x] Added try/catch/finally pattern for cleanup

## 3. Performance Optimizations (Recommended)
```tsx
// Add React.memo for frequently re-rendering components
import { memo } from 'react';

export const DashboardOverview = memo(function DashboardOverview({...}) {
  // Component code
});
```

```tsx
// Add lazy loading for routes (update App.tsx)
import { lazy, Suspense } from 'react';

const WeddingPlannerAI = lazy(() => import('./components/planning/WeddingPlannerAI'));

// Usage:
<Suspense fallback={<LoadingSpinner />}>
  <WeddingPlannerAI ... />
</Suspense>
```

## 4. Accessibility Improvements (Recommended)
```tsx
// Add ARIA labels and keyboard navigation
<button
  onClick={handleSubmit}
  disabled={isLoading}
  aria-busy={isLoading}
  aria-disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Complete Payment'}
</button>

// Add proper image alt tags
<img 
  src={venue.image} 
  alt={`${venue.name} - ${venue.location}`}
  loading="lazy"
/>
```

## 5. State Management (Recommended)
Consider using Zustand or React Context for global state:

```tsx
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

## 6. Environment Configuration (Recommended)
Create `.env.example`:
```
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_api_key_here
```

## 7. Code Splitting (Recommended)
Update `src/main.tsx`:
```tsx
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Lazy load heavy components
const WeddingPlannerAI = lazy(() => import('./components/planning/WeddingPlannerAI'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vivah-burgundy"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
```

## 8. Form Validation (Recommended)
Add validation using Zod:
```tsx
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Usage:
const result = loginSchema.safeParse({ email, password });
if (!result.success) {
  console.log(result.error.errors);
}
```

## 9. API Layer (Recommended)
Create centralized API service:

```tsx
// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  requiresAuth?: boolean;
}

export const api = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, requiresAuth = false } = options;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (requiresAuth) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message);
    }

    return response.json();
  },

  get: <T>(endpoint: string) => api.request<T>(endpoint),
  post: <T>(endpoint: string, body: Record<string, unknown>) => 
    api.request<T>(endpoint, { method: 'POST', body }),
};
```

## 10. Testing Setup (Recommended)
Add unit tests:

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../common/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 11. Environment Variables Check
Run to verify everything works:
```bash
npm run build
```

Build should complete successfully:
```
✓ built in 2.85s
dist/index.html                  5.78 kB │ gzip:   1.90 kB
dist/assets/index-CSQos9r4.js  372.43 kB │ gzip: 102.78 kB
```

## 12. Additional Component Improvements

### Add loading skeleton for better UX:
```tsx
// src/components/common/Skeleton.tsx
export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Usage in Dashboard:
{isLoading ? (
  <>
    <Skeleton className="h-32 mb-4" />
    <Skeleton className="h-64" />
  </>
) : (
  <DashboardContent />
)}
```

### Add toast notifications:
```bash
npm install react-hot-toast
```

```tsx
// In components:
import toast from 'react-hot-toast';

const handleLogin = async () => {
  const promise = authService.login(email, password);
  toast.promise(promise, {
    loading: 'Logging in...',
    success: 'Welcome back!',
    error: 'Invalid credentials',
  });
};
```

