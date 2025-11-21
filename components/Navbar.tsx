import { useState } from 'react';
import { Button } from './ui/button';
import { Crosshair, LogOut, User, Menu, X, Home, Sparkles, Sliders, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  currentPage: string;
  onPageChange: (page: 'home' | 'ai-adjuster' | 'sensitivity' | 'profile') => void;
}

export function Navbar({ user, onLogout, currentPage, onPageChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'ai-adjuster', label: 'IA Adjuster', icon: Sparkles },
    { id: 'sensitivity', label: 'Sensibilité', icon: Sliders },
    { id: 'profile', label: 'Profil', icon: UserCircle },
  ];

  return (
    <header className="relative border-b border-orange-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-600/5 to-orange-500/5"></div>
      
      <div className="container mx-auto px-4 py-4 lg:py-5 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="relative">
              <Crosshair className="size-8 lg:size-10 text-orange-500" strokeWidth={2.5} />
              <motion.div
                className="absolute inset-0 bg-orange-500 blur-xl opacity-50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="hidden sm:block">
              <motion.h1
                className="text-orange-500 tracking-wider text-xl lg:text-2xl"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(249, 115, 22, 0.5)",
                    "0 0 20px rgba(249, 115, 22, 0.8)",
                    "0 0 10px rgba(249, 115, 22, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                NOSS SNS
              </motion.h1>
              <p className="text-orange-200/60 text-xs lg:text-sm">AI-Powered Settings</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
                      : 'text-orange-100/70 hover:text-orange-100 hover:bg-orange-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </motion.nav>

          {/* Desktop User Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-3"
          >
            <div className="flex items-center gap-3 bg-slate-900/50 border border-orange-500/20 rounded-lg px-4 py-2">
              <div className="relative">
                <User className="size-5 text-orange-500" />
                <motion.div
                  className="absolute -top-1 -right-1 size-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div>
                <span className="text-white text-sm block">{user.username}</span>
                <span className="text-orange-400 text-xs">Level {user.level}</span>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/50 transition-all"
            >
              <LogOut className="size-4 mr-2" />
              Déconnexion
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-orange-500 p-2 rounded-lg hover:bg-orange-500/10"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-orange-500/20"
            >
              <div className="flex flex-col gap-2 mb-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onPageChange(item.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                          : 'text-orange-100/70 hover:text-orange-100 hover:bg-orange-500/10'
                      }`}
                    >
                      <Icon className="size-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-900/50 border border-orange-500/20 rounded-lg px-4 py-3">
                  <User className="size-5 text-orange-500" />
                  <div>
                    <span className="text-white block">{user.username}</span>
                    <span className="text-orange-400 text-sm">Level {user.level}</span>
                  </div>
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <LogOut className="size-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
