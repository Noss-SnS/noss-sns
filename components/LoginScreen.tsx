import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Crosshair, Target, Zap, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 size-64 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 size-96 bg-red-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 size-72 bg-orange-600/5 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-[15%] hidden lg:block"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Target className="size-12 text-orange-500/20" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[20%] hidden lg:block"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Zap className="size-16 text-red-600/20" />
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 0, 0.3) 2px, rgba(255, 107, 0, 0.3) 4px)`,
        }}></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/60 backdrop-blur-xl border border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-500/20 overflow-hidden">
          {/* Header */}
          <div className="relative p-6 md:p-8 border-b border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-red-600/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <Crosshair className="size-16 md:size-20 text-orange-500" strokeWidth={2.5} />
                <motion.div
                  className="absolute inset-0 bg-orange-500 blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-orange-500 tracking-wider mb-2">NOSS SNS</h1>
              <p className="text-orange-200/60">Sensitivity & Settings</p>
              <div className="mt-3 inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded text-xs tracking-wider">
                PRO SETTINGS
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-white text-center mb-6">
                {isSignUp ? 'Créer un Compte' : 'Connexion'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-orange-100/80">
                    Nom d'utilisateur
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Entre ton pseudo"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-orange-100/80">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Entre ton mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20"
                    required
                  />
                </div>

                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirm-password" className="text-orange-100/80">
                      Confirmer le mot de passe
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme ton mot de passe"
                      className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:scale-[1.02]"
                >
                  {isSignUp ? (
                    <>
                      <UserPlus className="size-5 mr-2" />
                      S'inscrire
                    </>
                  ) : (
                    <>
                      <LogIn className="size-5 mr-2" />
                      Se Connecter
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-orange-400 hover:text-orange-300 transition-colors text-sm"
                >
                  {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="size-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-orange-100/70 text-xs">
                  <p className="mb-1">Accède aux paramètres optimisés pour ton téléphone</p>
                  <p>Compatible avec tous les modèles iOS et Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-orange-100/50 text-sm mt-6"
        >
          Noss SnS © 2025 - Améliore ton jeu sur Free Fire
        </motion.p>
      </motion.div>
    </div>
  );
}
