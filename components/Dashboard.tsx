import { useState } from 'react';
import { Navbar } from './Navbar';
import { HomePage } from './pages/HomePage';
import { AIAdjusterPage } from './pages/AIAdjusterPage';
import { SensitivityInterfacePage } from './pages/SensitivityInterfacePage';
import { ProfilePage } from './pages/ProfilePage';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<'home' | 'ai-adjuster' | 'sensitivity' | 'profile'>('home');
  const [selectedPhone, setSelectedPhone] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      {currentPage === 'home' && (
        <HomePage 
          selectedPhone={selectedPhone} 
          onPhoneSelect={setSelectedPhone}
          onNavigate={setCurrentPage}
        />
      )}
      
      {currentPage === 'ai-adjuster' && (
        <AIAdjusterPage user={user} selectedPhone={selectedPhone} />
      )}
      
      {currentPage === 'sensitivity' && (
        <SensitivityInterfacePage selectedPhone={selectedPhone} onPhoneSelect={setSelectedPhone} />
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage user={user} />
      )}
    </div>
  );
}
