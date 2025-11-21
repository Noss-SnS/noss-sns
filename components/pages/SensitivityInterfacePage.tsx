import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, RotateCcw, Download, Eye, Crosshair, Target, Zap, Settings as SettingsIcon } from 'lucide-react';
import { PhoneSelectorAdvanced } from '../PhoneSelectorAdvanced';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SensitivityInterfacePageProps {
  selectedPhone: string;
  onPhoneSelect: (phone: string) => void;
}

interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  scope8x: number;
  sniperScope: number;
  freeView: number;
  collimator: number;
  gyroscope: number;
  adsSpeed: number;
  fireButton: number;
  dpi: number;
}

export function SensitivityInterfacePage({ selectedPhone, onPhoneSelect }: SensitivityInterfacePageProps) {
  const [settings, setSettings] = useState<SensitivitySettings>({
    general: 100,
    redDot: 75,
    scope2x: 65,
    scope4x: 45,
    scope8x: 38,
    sniperScope: 35,
    freeView: 85,
    collimator: 70,
    gyroscope: 50,
    adsSpeed: 80,
    fireButton: 100,
    dpi: 300,
  });

  const [showPhoneSettings, setShowPhoneSettings] = useState(false);

  const handleReset = () => {
    setSettings({
      general: 100,
      redDot: 75,
      scope2x: 65,
      scope4x: 45,
      scope8x: 38,
      sniperScope: 35,
      freeView: 85,
      collimator: 70,
      gyroscope: 50,
      adsSpeed: 80,
      fireButton: 100,
      dpi: 300,
    });
  };

  const handleSave = () => {
    localStorage.setItem('noss_sensitivity_settings', JSON.stringify(settings));
    alert('✅ Paramètres sauvegardés avec succès!');
  };

  const handleExport = () => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'noss-sns-settings.json';
    a.click();
  };

  useEffect(() => {
    const saved = localStorage.getItem('noss_sensitivity_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const SettingSlider = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon,
    description,
    color = 'orange'
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    icon: any;
    description: string;
    color?: string;
  }) => {
    const colorClass = color === 'orange' ? 'text-orange-500' : color === 'purple' ? 'text-purple-500' : 'text-blue-500';
    const bgClass = color === 'orange' ? 'bg-orange-500/20' : color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20';

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-slate-900/50 border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/40 transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className={`size-10 ${bgClass} rounded-lg flex items-center justify-center`}>
              <Icon className={`size-5 ${colorClass}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-white mb-1">{label}</h4>
              <p className="text-orange-100/50 text-xs">{description}</p>
            </div>
          </div>
          <motion.div
            className={`${bgClass} px-4 py-2 rounded-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-xl ${colorClass}`}>{value}</span>
          </motion.div>
        </div>

        <div className="space-y-2">
          <Slider
            value={[value]}
            onValueChange={([v]) => onChange(v)}
            max={200}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-orange-100/40">
            <span>0</span>
            <span>100</span>
            <span>200</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 size-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 size-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-orange-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-4">
            <SettingsIcon className="size-6 text-blue-400" />
            <h2 className="text-white text-xl lg:text-2xl">Interface de Sensibilité Avancée</h2>
          </div>
          <p className="text-orange-100/70 max-w-2xl mx-auto">
            Ajuste chaque paramètre de sensibilité avec précision jusqu'à 200
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 justify-center"
        >
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <Save className="size-4 mr-2" />
            Sauvegarder
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          >
            <RotateCcw className="size-4 mr-2" />
            Réinitialiser
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            <Download className="size-4 mr-2" />
            Exporter
          </Button>
          <Button
            onClick={() => setShowPhoneSettings(!showPhoneSettings)}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            <Eye className="size-4 mr-2" />
            {showPhoneSettings ? 'Masquer' : 'Voir'} Écran Téléphone
          </Button>
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phone Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-black/60 backdrop-blur-xl border-2 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="size-5 text-orange-500" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PhoneSelectorAdvanced onPhoneSelect={onPhoneSelect} selectedPhone={selectedPhone} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Sensitivity Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-black/60 backdrop-blur-xl border-2 border-orange-500/30">
                <Tabs defaultValue="aiming" className="w-full">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-3 bg-slate-900/50">
                      <TabsTrigger value="aiming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600">
                        <Crosshair className="size-4 mr-2" />
                        Visée
                      </TabsTrigger>
                      <TabsTrigger value="movement" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600">
                        <Zap className="size-4 mr-2" />
                        Mouvement
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600">
                        <SettingsIcon className="size-4 mr-2" />
                        Avancé
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <TabsContent value="aiming" className="space-y-4 mt-0">
                      <SettingSlider
                        label="Point Rouge / Holographique"
                        value={settings.redDot}
                        onChange={(v) => setSettings(s => ({ ...s, redDot: v }))}
                        icon={Crosshair}
                        description="Sensibilité avec viseurs point rouge et holographique"
                      />
                      <SettingSlider
                        label="Lunette 2x"
                        value={settings.scope2x}
                        onChange={(v) => setSettings(s => ({ ...s, scope2x: v }))}
                        icon={Eye}
                        description="Sensibilité avec lunette 2x"
                      />
                      <SettingSlider
                        label="Lunette 4x"
                        value={settings.scope4x}
                        onChange={(v) => setSettings(s => ({ ...s, scope4x: v }))}
                        icon={Eye}
                        description="Sensibilité avec lunette 4x"
                      />
                      <SettingSlider
                        label="Lunette 8x"
                        value={settings.scope8x}
                        onChange={(v) => setSettings(s => ({ ...s, scope8x: v }))}
                        icon={Eye}
                        description="Sensibilité avec lunette 8x"
                      />
                      <SettingSlider
                        label="Lunette Sniper"
                        value={settings.sniperScope}
                        onChange={(v) => setSettings(s => ({ ...s, sniperScope: v }))}
                        icon={Target}
                        description="Sensibilité pour AWM, M82B, SVD"
                      />
                      <SettingSlider
                        label="Collimateur"
                        value={settings.collimator}
                        onChange={(v) => setSettings(s => ({ ...s, collimator: v }))}
                        icon={Crosshair}
                        description="Sensibilité avec viseur collimateur"
                      />
                    </TabsContent>

                    <TabsContent value="movement" className="space-y-4 mt-0">
                      <SettingSlider
                        label="Sensibilité Générale"
                        value={settings.general}
                        onChange={(v) => setSettings(s => ({ ...s, general: v }))}
                        icon={Zap}
                        description="Vitesse de rotation de la caméra"
                        color="blue"
                      />
                      <SettingSlider
                        label="Vue Libre"
                        value={settings.freeView}
                        onChange={(v) => setSettings(s => ({ ...s, freeView: v }))}
                        icon={Eye}
                        description="Regarder autour sans bouger le personnage"
                        color="blue"
                      />
                      <SettingSlider
                        label="Vitesse ADS"
                        value={settings.adsSpeed}
                        onChange={(v) => setSettings(s => ({ ...s, adsSpeed: v }))}
                        icon={Zap}
                        description="Vitesse d'entrée et sortie de visée"
                        color="blue"
                      />
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4 mt-0">
                      <SettingSlider
                        label="Gyroscope"
                        value={settings.gyroscope}
                        onChange={(v) => setSettings(s => ({ ...s, gyroscope: v }))}
                        icon={SettingsIcon}
                        description="Sensibilité du contrôle par mouvement"
                        color="purple"
                      />
                      <SettingSlider
                        label="Bouton de Tir"
                        value={settings.fireButton}
                        onChange={(v) => setSettings(s => ({ ...s, fireButton: v }))}
                        icon={Target}
                        description="Réactivité du bouton de tir"
                        color="purple"
                      />
                      <SettingSlider
                        label="DPI / Résolution"
                        value={settings.dpi}
                        onChange={(v) => setSettings(s => ({ ...s, dpi: v }))}
                        icon={SettingsIcon}
                        description="Densité de pixels pour la précision"
                        color="purple"
                      />
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-2 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(settings).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="text-orange-100/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-semibold bg-orange-500/20 px-3 py-1 rounded-full">
                        {value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone Settings Preview */}
            {showPhoneSettings && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="bg-black/60 backdrop-blur-xl border-2 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Eye className="size-5 text-purple-400" />
                      Aperçu Écran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[9/16] bg-slate-900 rounded-lg overflow-hidden border-2 border-orange-500/20">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1609162554108-6490759499ef?w=400"
                        alt="Phone Settings Screen"
                        className="w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-orange-100/70 p-4">
                          <SettingsIcon className="size-12 mx-auto mb-2 text-orange-500" />
                          <p className="text-sm">Aperçu des paramètres</p>
                          <p className="text-xs mt-1">sur ton téléphone</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30">
                <CardContent className="p-4 space-y-2">
                  <h4 className="text-white flex items-center gap-2 mb-3">
                    <Zap className="size-4 text-blue-400" />
                    Conseils Pro
                  </h4>
                  <div className="space-y-2 text-xs text-blue-100/70">
                    <p>• Commence avec des valeurs basses et augmente progressivement</p>
                    <p>• La sensibilité générale affecte tous les autres paramètres</p>
                    <p>• Teste en mode entraînement avant de jouer en ranked</p>
                    <p>• Sauvegarde régulièrement tes paramètres</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
