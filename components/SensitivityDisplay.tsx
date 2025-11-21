import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Info, Settings, Zap, Eye } from "lucide-react";
import { motion } from "motion/react";

interface SensitivityDisplayProps {
  phoneModel: string;
}

interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeView: number;
  collimator: number;
  dpi: number;
  fireButton: string;
}

export function SensitivityDisplay({
  phoneModel,
}: SensitivityDisplayProps) {
  const getPhoneCategory = () => {
    const model = phoneModel.toLowerCase();

    // iPhone categorization
    if (model.includes("iphone")) {
      if (model.includes("pro max") || model.includes("plus"))
        return "iphone-large";
      if (model.includes("pro")) return "iphone-pro";
      if (
        model.includes("15") ||
        model.includes("14") ||
        model.includes("13")
      )
        return "iphone-standard";
      return "iphone-older";
    }

    // Samsung flagship
    if (
      model.includes("galaxy s") &&
      (model.includes("ultra") || model.includes("+"))
    )
      return "android-flagship-large";
    if (
      model.includes("galaxy s") ||
      model.includes("galaxy z fold") ||
      model.includes("galaxy z flip")
    )
      return "android-flagship";

    // Gaming phones
    if (
      model.includes("rog phone") ||
      model.includes("black shark") ||
      model.includes("legion")
    )
      return "gaming-phone";

    // High-end Android
    if (
      model.includes("xiaomi 1") ||
      model.includes("find x") ||
      model.includes("oneplus 1") ||
      model.includes("pixel") ||
      model.includes("vivo x")
    )
      return "android-flagship";

    // POCO/Performance
    if (
      model.includes("poco f") ||
      model.includes("poco x") ||
      model.includes("gt")
    )
      return "android-performance";

    // Mid-range
    if (
      model.includes("note") ||
      model.includes("reno") ||
      model.includes("nord") ||
      model.includes("galaxy a5") ||
      model.includes("galaxy a7") ||
      model.includes("galaxy m")
    )
      return "android-mid";

    // Budget
    return "android-budget";
  };

  const getSensitivitySettings = (): SensitivitySettings => {
    const category = getPhoneCategory();

    const settings: Record<string, SensitivitySettings> = {
      "gaming-phone": {
        general: 145,
        redDot: 120,
        scope2x: 105,
        scope4x: 85,
        sniperScope: 75,
        freeView: 135,
        collimator: 115,
        dpi: 350,
        fireButton: "Très Haute",
      },
      "iphone-large": {
        general: 135,
        redDot: 110,
        scope2x: 95,
        scope4x: 75,
        sniperScope: 65,
        freeView: 125,
        collimator: 105,
        dpi: 300,
        fireButton: "Haute",
      },
      "iphone-pro": {
        general: 130,
        redDot: 105,
        scope2x: 90,
        scope4x: 70,
        sniperScope: 60,
        freeView: 120,
        collimator: 100,
        dpi: 300,
        fireButton: "Haute",
      },
      "iphone-standard": {
        general: 120,
        redDot: 95,
        scope2x: 82,
        scope4x: 65,
        sniperScope: 55,
        freeView: 110,
        collimator: 90,
        dpi: 280,
        fireButton: "Haute",
      },
      "iphone-older": {
        general: 105,
        redDot: 85,
        scope2x: 72,
        scope4x: 55,
        sniperScope: 45,
        freeView: 95,
        collimator: 80,
        dpi: 250,
        fireButton: "Moyenne",
      },
      "android-flagship-large": {
        general: 140,
        redDot: 115,
        scope2x: 100,
        scope4x: 80,
        sniperScope: 70,
        freeView: 130,
        collimator: 110,
        dpi: 320,
        fireButton: "Haute",
      },
      "android-flagship": {
        general: 132,
        redDot: 108,
        scope2x: 92,
        scope4x: 72,
        sniperScope: 62,
        freeView: 122,
        collimator: 102,
        dpi: 300,
        fireButton: "Haute",
      },
      "android-performance": {
        general: 125,
        redDot: 100,
        scope2x: 85,
        scope4x: 68,
        sniperScope: 58,
        freeView: 115,
        collimator: 95,
        dpi: 290,
        fireButton: "Haute",
      },
      "android-mid": {
        general: 115,
        redDot: 92,
        scope2x: 78,
        scope4x: 60,
        sniperScope: 50,
        freeView: 105,
        collimator: 88,
        dpi: 260,
        fireButton: "Moyenne",
      },
      "android-budget": {
        general: 100,
        redDot: 80,
        scope2x: 68,
        scope4x: 52,
        sniperScope: 42,
        freeView: 92,
        collimator: 75,
        dpi: 240,
        fireButton: "Moyenne",
      },
    };

    return settings[category] || settings["android-mid"];
  };

  const settings = getSensitivitySettings();

  const SensitivityCard = ({
    title,
    value,
    icon: Icon,
    description,
    index,
  }: {
    title: string;
    value: number | string;
    icon: any;
    description: string;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-orange-500/20 rounded-lg p-4 hover:border-orange-500/40 transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-orange-500" />
          <h4 className="text-white text-sm lg:text-base">
            {title}
          </h4>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          {value}
        </Badge>
      </div>
      <p className="text-orange-100/50 text-xs lg:text-sm">
        {description}
      </p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 lg:space-y-6"
    >
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/30">
        <CardHeader className="p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-5 lg:size-6 text-orange-500" />
            <CardTitle className="text-white text-base lg:text-xl">
              Paramètres Optimisés pour {phoneModel}
            </CardTitle>
          </div>
          <CardDescription className="text-orange-100/70 text-xs lg:text-sm">
            Paramètres de sensibilité recommandés basés sur les
            performances de ton appareil et utilisés par les
            joueurs professionnels.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabs for Different Categories */}
      <Tabs defaultValue="sensitivity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-orange-500/20 h-auto">
          <TabsTrigger
            value="sensitivity"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-xs lg:text-sm py-2"
          >
            <Eye className="size-3 lg:size-4 mr-1 lg:mr-2" />
            Sensibilité
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-xs lg:text-sm py-2"
          >
            <Settings className="size-3 lg:size-4 mr-1 lg:mr-2" />
            Avancé
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-xs lg:text-sm py-2"
          >
            <Info className="size-3 lg:size-4 mr-1 lg:mr-2" />
            Conseils
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="sensitivity"
          className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
        >
          <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            <SensitivityCard
              title="Sensibilité Générale"
              value={settings.general}
              icon={Settings}
              description="Sensibilité de base pour les mouvements de caméra"
              index={0}
            />
            <SensitivityCard
              title="Point Rouge"
              value={settings.redDot}
              icon={Eye}
              description="Visée avec lunette point rouge et holographique"
              index={1}
            />
            <SensitivityCard
              title="Lunette 2x"
              value={settings.scope2x}
              icon={Eye}
              description="Sensibilité avec lunette 2x"
              index={2}
            />
            <SensitivityCard
              title="Lunette 4x"
              value={settings.scope4x}
              icon={Eye}
              description="Sensibilité avec lunette 4x"
              index={3}
            />
            <SensitivityCard
              title="Lunette Sniper"
              value={settings.sniperScope}
              icon={Eye}
              description="Sensibilité pour les lunettes 8x et plus"
              index={4}
            />
            <SensitivityCard
              title="Vue Libre"
              value={settings.freeView}
              icon={Eye}
              description="Sensibilité pour regarder autour sans bouger"
              index={5}
            />
          </div>
        </TabsContent>

        <TabsContent
          value="advanced"
          className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
        >
          <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            <SensitivityCard
              title="Collimateur"
              value={settings.collimator}
              icon={Settings}
              description="Sensibilité avec viseur collimateur"
              index={0}
            />
            <SensitivityCard
              title="DPI"
              value={settings.dpi}
              icon={Settings}
              description="Densité de pixels recommandée"
              index={1}
            />
            <SensitivityCard
              title="Sensibilité Bouton de Tir"
              value={settings.fireButton}
              icon={Zap}
              description="Réactivité du bouton de tir"
              index={2}
            />
          </div>

          <Card className="bg-slate-900/60 border-orange-500/20">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-white text-sm lg:text-base">
                Paramètres Supplémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 lg:space-y-3 text-xs lg:text-sm p-4 lg:p-6 pt-0">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
                <span className="text-orange-100/70">
                  Mode de Visée
                </span>
                <span className="text-white">Maintien</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
                <span className="text-orange-100/70">
                  Accélération Gyroscope
                </span>
                <span className="text-white">Désactivée</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
                <span className="text-orange-100/70">
                  Tir Automatique
                </span>
                <span className="text-white">
                  Désactivé (Recommandé)
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="tips"
          className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
        >
          <Card className="bg-slate-900/60 border-orange-500/20">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-white flex items-center gap-2 text-sm lg:text-base">
                <Info className="size-4 lg:size-5 text-orange-500" />
                Comment Appliquer Ces Paramètres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4 text-orange-100/70 text-xs lg:text-sm p-4 lg:p-6 pt-0">
              <div className="space-y-2 lg:space-y-3">
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                    1
                  </div>
                  <p>
                    Ouvre Free Fire et va dans{" "}
                    <span className="text-orange-400">
                      Paramètres
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                    2
                  </div>
                  <p>
                    Sélectionne l'onglet{" "}
                    <span className="text-orange-400">
                      Sensibilité
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                    3
                  </div>
                  <p>
                    Applique les valeurs recommandées une par
                    une
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                    4
                  </div>
                  <p>
                    Teste en mode Entraînement et ajuste si
                    nécessaire
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/30">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-white flex items-center gap-2 text-sm lg:text-base">
                <Zap className="size-4 lg:size-5 text-orange-500" />
                Conseils Pro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 lg:space-y-3 text-orange-100/70 text-xs lg:text-sm p-4 lg:p-6 pt-0">
              <div className="flex items-start gap-3">
                <div className="size-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p>
                  <span className="text-orange-400">
                    Commence bas
                  </span>{" "}
                  : Si les paramètres semblent trop rapides,
                  réduis-les de 5-10 points
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p>
                  <span className="text-orange-400">
                    Pratique régulière
                  </span>{" "}
                  : Passe 10-15 minutes en mode Entraînement
                  chaque jour
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p>
                  <span className="text-orange-400">
                    Gyroscope
                  </span>{" "}
                  : Active le gyroscope uniquement si tu es à
                  l'aise avec
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p>
                  <span className="text-orange-400">
                    Cohérence
                  </span>{" "}
                  : Garde les mêmes paramètres pendant au moins
                  une semaine
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Box */}
      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <CardContent className="py-3 lg:py-4 px-4 lg:px-6">
          <div className="flex items-start gap-3">
            <Info className="size-4 lg:size-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-yellow-100/80 text-xs lg:text-sm">
              <p className="mb-1">
                Ces paramètres sont des recommandations basées
                sur ton modèle de téléphone.
              </p>
              <p>
                Chaque joueur est différent - n'hésite pas à
                ajuster selon ton style de jeu et ton confort
                personnel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}