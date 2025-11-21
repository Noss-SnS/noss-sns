import { useState } from 'react';
import { PhoneSelector } from './PhoneSelector';
import { SensitivityDisplay } from './SensitivityDisplay';
import { Crosshair, Target, Smartphone, LogOut, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface MainAppProps {
  username: string;
  onLogout: () => void;
}

export function MainApp({ username, onLogout }: MainAppProps) {
  const [selectedPhone, setSelectedPhone] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 size-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 size-[32rem] bg-red-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 0, 0.3) 2px, rgba(255, 107, 0, 0.3) 4px)`,
        }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-orange-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
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
                <h1 className="text-orange-500 tracking-wider text-xl lg:text-2xl">NOSS SNS</h1>
                <p className="text-orange-200/60 text-xs lg:text-sm">Sensitivity & Settings</p>
              </div>
            </motion.div>

            {/* Desktop User Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-4"
            >
              <div className="flex items-center gap-3 bg-slate-900/50 border border-orange-500/20 rounded-lg px-4 py-2">
                <User className="size-5 text-orange-500" />
                <span className="text-white">{username}</span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/50"
              >
                <LogOut className="size-4 mr-2" />
                Déconnexion
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-orange-500 p-2"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
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
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-slate-900/50 border border-orange-500/20 rounded-lg px-4 py-3">
                    <User className="size-5 text-orange-500" />
                    <span className="text-white">{username}</span>
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

      {/* Hero Section */}
      <section className="relative py-8 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="inline-block mb-4">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded text-xs lg:text-sm tracking-wider"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(249, 115, 22, 0.3)",
                    "0 0 30px rgba(249, 115, 22, 0.5)",
                    "0 0 20px rgba(249, 115, 22, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                AMÉLIORE TON AIM
              </motion.div>
            </div>
            <h2 className="text-white mb-4 max-w-3xl mx-auto px-4">
              Trouve les Paramètres de Sensibilité Parfaits pour Free Fire
            </h2>
            <p className="text-orange-100/70 max-w-2xl mx-auto px-4 text-sm lg:text-base">
              Sélectionne ton modèle de téléphone et découvre les paramètres de sensibilité optimaux utilisés par les pros pour améliorer ta précision et dominer le terrain.
            </p>
          </motion.div>

          {/* Phone Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-black/60 backdrop-blur-md border border-orange-500/30 rounded-lg lg:rounded-xl p-4 lg:p-8 shadow-2xl shadow-orange-500/10">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Smartphone className="size-5 lg:size-6 text-orange-500" />
                <h3 className="text-white text-lg lg:text-xl">Sélectionne Ton Téléphone</h3>
              </div>
              <PhoneSelector onPhoneSelect={setSelectedPhone} selectedPhone={selectedPhone} />
            </div>
          </motion.div>

          {/* Sensitivity Display */}
          <AnimatePresence mode="wait">
            {selectedPhone && (
              <motion.div
                key="sensitivity-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <SensitivityDisplay phoneModel={selectedPhone} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features */}
          {!selectedPhone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-5xl mx-auto mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black/40 backdrop-blur border border-orange-500/20 rounded-lg p-6 text-center"
              >
                <div className="size-12 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Target className="size-6 text-white" />
                </div>
                <h4 className="text-white mb-2">Précision Optimale</h4>
                <p className="text-orange-100/60 text-sm">
                  Paramètres testés et approuvés par les meilleurs joueurs
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black/40 backdrop-blur border border-orange-500/20 rounded-lg p-6 text-center"
              >
                <div className="size-12 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="size-6 text-white" />
                </div>
                <h4 className="text-white mb-2">Tous les Téléphones</h4>
                <p className="text-orange-100/60 text-sm">
                  Compatible avec tous les modèles iOS et Android
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-black/40 backdrop-blur border border-orange-500/20 rounded-lg p-6 text-center sm:col-span-2 lg:col-span-1"
              >
                <div className="size-12 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Crosshair className="size-6 text-white" />
                </div>
                <h4 className="text-white mb-2">Facile à Appliquer</h4>
                <p className="text-orange-100/60 text-sm">
                  Instructions claires pour configurer tes paramètres en jeu
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-orange-500/20 bg-black/40 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-orange-100/50 text-xs lg:text-sm">
            <p>Noss SnS © 2025 - Améliore ton jeu sur Free Fire</p>
            <p className="mt-2 text-orange-100/30">
              Les paramètres sont des recommandations. Ajuste selon tes préférences personnelles.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
