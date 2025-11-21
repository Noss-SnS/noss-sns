import { motion } from 'motion/react';
import { PhoneSelectorAdvanced } from '../PhoneSelectorAdvanced';
import { SensitivityDisplay } from '../SensitivityDisplay';
import { Target, Smartphone, Crosshair, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface HomePageProps {
  selectedPhone: string;
  onPhoneSelect: (phone: string) => void;
  onNavigate: (page: 'home' | 'ai-adjuster' | 'sensitivity' | 'profile') => void;
}

export function HomePage({ selectedPhone, onPhoneSelect, onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 size-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 size-[40rem] bg-red-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 107, 0, 0.3) 40px, rgba(255, 107, 0, 0.3) 42px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 107, 0, 0.3) 40px, rgba(255, 107, 0, 0.3) 42px)
          `,
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm lg:text-base tracking-wider"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(249, 115, 22, 0.4)",
                      "0 0 60px rgba(249, 115, 22, 0.6)",
                      "0 0 30px rgba(249, 115, 22, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⚡ POWERED BY AI
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              className="text-white mb-6 max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Optimise Ta Sensibilité avec l'Intelligence Artificielle
            </motion.h2>

            <motion.p
              className="text-orange-100/70 max-w-3xl mx-auto px-4 text-base lg:text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Sélectionne ton téléphone et laisse notre IA analyser et ajuster tes paramètres pour une précision maximale dans Free Fire
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button
                onClick={() => onNavigate('ai-adjuster')}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/30 h-12 px-8"
              >
                <Sparkles className="size-5 mr-2" />
                Ajusteur IA
              </Button>
              <Button
                onClick={() => onNavigate('sensitivity')}
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 h-12 px-8"
              >
                <Zap className="size-5 mr-2" />
                Interface Sensibilité
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone Selector */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="bg-black/60 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl p-6 lg:p-10 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-600/5"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="size-6 lg:size-7 text-orange-500" />
                  <h3 className="text-white text-xl lg:text-2xl">Sélectionne Ton Téléphone</h3>
                </div>
                <PhoneSelectorAdvanced onPhoneSelect={onPhoneSelect} selectedPhone={selectedPhone} />
              </div>
            </div>
          </motion.div>

          {/* Sensitivity Display */}
          {selectedPhone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto mb-12"
            >
              <SensitivityDisplay phoneModel={selectedPhone} />
            </motion.div>
          )}

          {/* Features Grid */}
          {!selectedPhone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/40 backdrop-blur border-2 border-orange-500/20 rounded-xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="size-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Sparkles className="size-8 text-white" />
                  </div>
                  <h4 className="text-white mb-3 text-lg">IA Intelligente</h4>
                  <p className="text-orange-100/60 text-sm">
                    Notre IA apprend de ton style de jeu et ajuste automatiquement tes paramètres
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/40 backdrop-blur border-2 border-orange-500/20 rounded-xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="size-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Target className="size-8 text-white" />
                  </div>
                  <h4 className="text-white mb-3 text-lg">Précision Maximale</h4>
                  <p className="text-orange-100/60 text-sm">
                    Paramètres jusqu'à 200 pour un contrôle ultra-précis de ta sensibilité
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/40 backdrop-blur border-2 border-orange-500/20 rounded-xl p-8 text-center relative overflow-hidden group sm:col-span-2 lg:col-span-1"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="size-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <TrendingUp className="size-8 text-white" />
                  </div>
                  <h4 className="text-white mb-3 text-lg">Amélioration Continue</h4>
                  <p className="text-orange-100/60 text-sm">
                    Suis tes progrès et vois ton aim s'améliorer match après match
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 border-t border-orange-500/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { value: '200+', label: 'Téléphones', icon: Smartphone },
              { value: '10K+', label: 'Utilisateurs', icon: Target },
              { value: '99%', label: 'Précision', icon: Crosshair },
              { value: '24/7', label: 'Support IA', icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur border border-orange-500/20 rounded-xl p-6 text-center"
              >
                <stat.icon className="size-8 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-orange-100/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
