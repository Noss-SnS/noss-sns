import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User, Trophy, Target, TrendingUp, Zap, Award, Calendar, Smartphone } from 'lucide-react';
import { Progress } from '../ui/progress';

interface ProfilePageProps {
  user: any;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const stats = [
    { label: 'Parties Jouées', value: user.gamesPlayed || 147, icon: Target, color: 'orange' },
    { label: 'Précision Moy.', value: `${user.accuracy || 78}%`, icon: Zap, color: 'blue' },
    { label: 'Victoires', value: 89, icon: Trophy, color: 'yellow' },
    { label: 'Amélioration', value: '+15%', icon: TrendingUp, color: 'green' },
  ];

  const achievements = [
    { name: 'Premier Pas', description: 'Première connexion', unlocked: true },
    { name: 'Sniper Pro', description: '50 headshots en sniper', unlocked: true },
    { name: 'Rush Master', description: '100 kills en rush', unlocked: true },
    { name: 'IA Expert', description: 'Utilise l\'IA 10 fois', unlocked: false },
    { name: 'Perfectionniste', description: 'Ajuste 50 paramètres', unlocked: false },
    { name: 'Champion', description: 'Atteins le niveau 50', unlocked: false },
  ];

  const recentActivity = [
    { action: 'Paramètres ajustés', date: 'Il y a 2h', type: 'settings' },
    { action: 'Session IA complétée', date: 'Il y a 5h', type: 'ai' },
    { action: 'Nouveau téléphone ajouté', date: 'Hier', type: 'phone' },
    { action: 'Paramètres exportés', date: 'Il y a 2 jours', type: 'export' },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
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
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/30 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="size-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                    <User className="size-16 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm shadow-lg">
                    Lvl {user.level}
                  </div>
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-white mb-2">{user.username}</h2>
                  <p className="text-orange-100/70 mb-4">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-orange-400" />
                        <span className="text-orange-100 text-sm">Membre depuis {new Date(user.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* XP Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100/70">Progression vers Niveau {user.level + 1}</span>
                      <span className="text-orange-400">{user.xp || 750}/1000 XP</span>
                    </div>
                    <Progress value={(user.xp || 750) / 10} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className={`bg-black/60 backdrop-blur-xl border-2 border-${stat.color}-500/30`}>
                <CardContent className="p-6 text-center">
                  <div className={`size-14 mx-auto mb-3 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`size-7 text-${stat.color}-400`} />
                  </div>
                  <div className="text-3xl text-white mb-1">{stat.value}</div>
                  <div className="text-orange-100/60 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border-2 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="size-6 text-purple-400" />
                  Succès
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30'
                        : 'bg-slate-900/50 border-slate-700/30'
                    } flex items-center gap-3`}
                  >
                    <div className={`size-12 rounded-lg flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-orange-500 to-yellow-500'
                        : 'bg-slate-700'
                    }`}>
                      <Trophy className={`size-6 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`${achievement.unlocked ? 'text-white' : 'text-slate-400'} mb-1`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-xs ${achievement.unlocked ? 'text-orange-100/60' : 'text-slate-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-400"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-black/60 backdrop-blur-xl border-2 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="size-6 text-blue-400" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="p-4 rounded-lg bg-slate-900/50 border border-blue-500/20 flex items-center gap-3"
                  >
                    <div className={`size-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'ai' ? 'bg-purple-500/20' :
                      activity.type === 'settings' ? 'bg-orange-500/20' :
                      activity.type === 'phone' ? 'bg-blue-500/20' :
                      'bg-green-500/20'
                    }`}>
                      {activity.type === 'ai' ? <Zap className="size-5 text-purple-400" /> :
                       activity.type === 'settings' ? <Target className="size-5 text-orange-400" /> :
                       activity.type === 'phone' ? <Smartphone className="size-5 text-blue-400" /> :
                       <TrendingUp className="size-5 text-green-400" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">{activity.action}</h4>
                      <p className="text-orange-100/40 text-xs">{activity.date}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="size-6 text-green-400" />
                  <h4 className="text-white">Performance</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-100/70">Précision</span>
                      <span className="text-green-400">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-green-900/30" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-100/70">Vitesse</span>
                      <span className="text-green-400">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-green-900/30" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-100/70">Consistance</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-green-900/30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
