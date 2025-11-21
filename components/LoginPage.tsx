import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Crosshair, Target, Zap, LogIn, UserPlus, Shield, Mail, Lock, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleEffect } from './ParticleEffect';

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
    }

    if (username.trim() && password.trim()) {
      const userData = {
        username: username.trim(),
        email: email.trim(),
        level: 1,
        xp: 0,
        gamesPlayed: 0,
        accuracy: 0,
        joinedDate: new Date().toISOString(),
      };
      onLogin(userData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Particle Effects */}
      <ParticleEffect />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 size-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
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
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 size-96 bg-orange-600/5 rounded-full blur-3xl"
          animate={{
            x: [-200, 200, -200],
            y: [-100, 100, -100],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Icons with complex animations */}
      <motion.div
        className="absolute top-20 left-[10%] hidden lg:block"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Target className="size-16 text-orange-500/20" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[15%] hidden lg:block"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Zap className="size-20 text-red-600/20" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[20%] hidden lg:block"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Sparkles className="size-14 text-orange-400/30" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 107, 0, 0.3) 40px, rgba(255, 107, 0, 0.3) 42px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 107, 0, 0.3) 40px, rgba(255, 107, 0, 0.3) 42px)
          `,
        }}></div>
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-6xl relative z-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crosshair className="size-32 text-orange-500 mx-auto" strokeWidth={2} />
              <motion.div
                className="absolute inset-0 bg-orange-500 blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          <div className="text-center space-y-4">
            <motion.h1
              className="text-orange-500 tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.5)",
                  "0 0 40px rgba(249, 115, 22, 0.8)",
                  "0 0 20px rgba(249, 115, 22, 0.5)"
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
            <p className="text-orange-200/80 text-xl">Sensitivity & Settings Platform</p>
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg">
              <span className="tracking-wider">PRO GAMING ASSISTANT</span>
            </div>
          </div>

          <div className="space-y-4 text-orange-100/70 bg-black/40 backdrop-blur-lg border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Shield className="size-6 text-orange-500 flex-shrink-0" />
              <p>Paramètres optimisés par IA</p>
            </div>
            <div className="flex items-center gap-3">
              <Target className="size-6 text-orange-500 flex-shrink-0" />
              <p>Compatible avec 200+ téléphones</p>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-orange-500 flex-shrink-0" />
              <p>Ajustement en temps réel</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/70 backdrop-blur-2xl border-2 border-orange-500/30 rounded-3xl shadow-2xl shadow-orange-500/20 overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden relative p-6 border-b border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-red-600/10">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Crosshair className="size-16 text-orange-500" strokeWidth={2.5} />
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
              </div>
              <div className="text-center">
                <h1 className="text-orange-500 tracking-wider text-2xl">NOSS SNS</h1>
              </div>
            </div>

            {/* Form Header */}
            <div className="p-8 text-center border-b border-orange-500/10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <h2 className="text-white mb-2">
                  {isSignUp ? 'Créer un Compte' : 'Connexion'}
                </h2>
                <p className="text-orange-100/60 text-sm">
                  {isSignUp ? 'Rejoins la communauté des pros' : 'Bienvenue de retour, champion'}
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={isSignUp ? 'signup' : 'signin'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-orange-100/80 flex items-center gap-2">
                        <Mail className="size-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ton@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                        required={isSignUp}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-orange-100/80 flex items-center gap-2">
                      <User className="size-4" />
                      Nom d'utilisateur
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Entre ton pseudo"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-orange-100/80 flex items-center gap-2">
                      <Lock className="size-4" />
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                      required
                    />
                  </div>

                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirm-password" className="text-orange-100/80 flex items-center gap-2">
                        <Lock className="size-4" />
                        Confirmer le mot de passe
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
                        required={isSignUp}
                      />
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center">
                      {isSignUp ? (
                        <>
                          <UserPlus className="size-5 mr-2" />
                          Créer mon compte
                        </>
                      ) : (
                        <>
                          <LogIn className="size-5 mr-2" />
                          Se Connecter
                        </>
                      )}
                    </span>
                  </Button>
                </motion.form>
              </AnimatePresence>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-orange-400 hover:text-orange-300 transition-colors text-sm relative group"
                >
                  <span className="relative">
                    {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="px-8 pb-8">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Zap className="size-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-orange-100/70 text-xs">
                    <p className="mb-1">Accède aux paramètres IA optimisés</p>
                    <p>Compatible avec tous les modèles de téléphones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-orange-100/50 text-sm mt-6"
          >
            Noss SnS © 2025 - Powered by AI
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
