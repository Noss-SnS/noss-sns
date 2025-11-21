import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Bot, User, Zap, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';

interface AIAdjusterPageProps {
  user: any;
  selectedPhone: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  settings?: any;
}

export function AIAdjusterPage({ user, selectedPhone }: AIAdjusterPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Salut ${user.username}! Je suis ton assistant IA pour optimiser ta sensibilité dans Free Fire. Dis-moi comment tu joues et je t'aiderai à trouver les meilleurs paramètres!`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiSettings, setAiSettings] = useState({
    general: 100,
    redDot: 75,
    scope2x: 65,
    scope4x: 45,
    sniperScope: 40,
    freeView: 85,
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date(),
        settings: aiResponse.settings,
      };

      if (aiResponse.settings) {
        setAiSettings(aiResponse.settings);
      }

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (input.includes('sniper') || input.includes('longue distance')) {
      return {
        message: "Parfait! Pour le sniper, je recommande de baisser la sensibilité des lunettes longue portée pour plus de précision. Voici tes nouveaux paramètres optimisés:",
        settings: {
          general: 85,
          redDot: 70,
          scope2x: 60,
          scope4x: 35,
          sniperScope: 25,
          freeView: 80,
        }
      };
    }

    if (input.includes('rush') || input.includes('rapide') || input.includes('agressif')) {
      return {
        message: "Style agressif détecté! J'augmente ta sensibilité générale et le point rouge pour des mouvements rapides et réactifs:",
        settings: {
          general: 130,
          redDot: 105,
          scope2x: 85,
          scope4x: 60,
          sniperScope: 50,
          freeView: 120,
        }
      };
    }

    if (input.includes('débutant') || input.includes('apprendre') || input.includes('nouveau')) {
      return {
        message: "Bienvenue! Pour un débutant, je recommande une sensibilité modérée qui sera facile à contrôler:",
        settings: {
          general: 70,
          redDot: 55,
          scope2x: 45,
          scope4x: 30,
          sniperScope: 25,
          freeView: 65,
        }
      };
    }

    if (input.includes('pro') || input.includes('compétitif') || input.includes('ranked')) {
      return {
        message: "Mode compétitif activé! Voici des paramètres équilibrés utilisés par les pros pour une précision et réactivité optimales:",
        settings: {
          general: 110,
          redDot: 90,
          scope2x: 75,
          scope4x: 52,
          sniperScope: 45,
          freeView: 100,
        }
      };
    }

    if (input.includes('téléphone') || input.includes('phone') || input.includes('appareil')) {
      if (selectedPhone) {
        return {
          message: `Super! Tu utilises un ${selectedPhone}. J'ai ajusté les paramètres spécifiquement pour ton appareil:`,
          settings: {
            general: 95,
            redDot: 78,
            scope2x: 68,
            scope4x: 48,
            sniperScope: 42,
            freeView: 88,
          }
        };
      } else {
        return {
          message: "Tu n'as pas encore sélectionné ton téléphone. Va sur la page d'accueil pour choisir ton modèle et je pourrai optimiser les paramètres pour ton appareil!",
        };
      }
    }

    return {
      message: "Je comprends! Peux-tu m'en dire plus sur ton style de jeu? Tu préfères le sniper, le rush agressif, ou un style équilibré? Ça m'aidera à personnaliser tes paramètres!",
    };
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 size-96 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 size-96 bg-orange-500/10 rounded-full blur-3xl"
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

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-4">
            <Sparkles className="size-6 text-purple-400" />
            <h2 className="text-white text-xl lg:text-2xl">Assistant IA - Ajustement Intelligent</h2>
          </div>
          <p className="text-orange-100/70 max-w-2xl mx-auto">
            Discute avec l'IA pour obtenir des paramètres personnalisés basés sur ton style de jeu
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="bg-black/60 backdrop-blur-xl border-2 border-purple-500/30 h-[600px] flex flex-col">
              <CardHeader className="border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-orange-500/10">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Bot className="size-6 text-purple-400" />
                  Chat IA
                </CardTitle>
                <CardDescription className="text-orange-100/60">
                  Décris ton style de jeu pour des recommandations personnalisées
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="size-6 text-white" />
                        </div>
                      )}

                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-4 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
                            : 'bg-slate-900/80 border border-purple-500/30 text-orange-100'
                        }`}>
                          <p className="text-sm lg:text-base">{message.content}</p>

                          {message.settings && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t border-white/10 space-y-2"
                            >
                              <p className="text-xs text-orange-300 mb-2">📊 Nouveaux paramètres:</p>
                              {Object.entries(message.settings).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-xs">
                                  <span className="text-orange-100/70 capitalize">{key}:</span>
                                  <span className="text-white font-semibold">{value}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                        <p className="text-xs text-orange-100/40 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {message.type === 'user' && (
                        <div className="size-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <User className="size-6 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                      <Bot className="size-6 text-white" />
                    </div>
                    <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4">
                      <div className="flex gap-2">
                        <motion.div
                          className="size-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="size-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="size-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-purple-500/20 bg-slate-900/50">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Décris ton style de jeu..."
                    className="flex-1 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-orange-100/30"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white"
                  >
                    <Send className="size-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {['Je joue sniper', 'Style rush agressif', 'Mode ranked', 'Débutant'].map((suggestion) => (
                <Button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(handleSend, 100);
                  }}
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-sm"
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Settings Preview */}
          <div className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-xl border-2 border-orange-500/30">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-600/10">
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <Zap className="size-5 text-orange-500" />
                  Paramètres IA
                </CardTitle>
                <CardDescription className="text-orange-100/60 text-sm">
                  Ajustés en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {Object.entries(aiSettings).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-orange-100/80 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <span className="text-white font-semibold bg-orange-500/20 px-3 py-1 rounded-full text-sm">
                        {value}
                      </span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={([v]) => setAiSettings(prev => ({ ...prev, [key]: v }))}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-100/70">
                    <p className="mb-2">L'IA apprend de tes préférences et ajuste automatiquement les paramètres.</p>
                    <p>Plus tu interagis, plus les recommandations seront précises!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-100/70 text-sm">Téléphone</span>
                  <span className="text-white text-sm">{selectedPhone || 'Non sélectionné'}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-100/70 text-sm">Niveau</span>
                  <span className="text-white text-sm">Level {user.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100/70 text-sm">Précision IA</span>
                  <span className="text-green-400 text-sm">98%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
