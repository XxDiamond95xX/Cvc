import { useState, useEffect, useRef } from "react";

const COLOR_RGB = {
  "#00d4ff": "0,212,255",
  "#ff6b2b": "255,107,43",
  "#00ff88": "0,255,136",
  "#bf5fff": "191,95,255",
  "#ffcc00": "255,204,0",
};
const rgb = (hex) => COLOR_RGB[hex] || "255,255,255";

const modules = [
  {
    id: "circuit-frigo", icon: "❄️", title: "Circuit Frigorifique",
    subtitle: "Cycle de réfrigération par compression",
    color: "#00d4ff", gradient: "linear-gradient(135deg,#003d5c,#006b8f)",
    chapters: [
      {
        id: "thermodynamique", title: "Thermodynamique de base",
        content: `**Le cycle frigorifique à compression de vapeur** est le principe fondamental de tous les systèmes de climatisation et de réfrigération modernes. Il repose sur la **loi de Clausius-Clapeyron** et le phénomène de changement d'état des fluides frigorigènes.

**Principe de Carnot :**
Le cycle frigorifique idéal de Carnot définit la limite théorique du COP (Coefficient de Performance). Pour un cycle réel, le COP est toujours inférieur au COP de Carnot.

**COP = Qf / W**
- Qf = Puissance frigorifique absorbée [kW]
- W = Travail fourni au compresseur [kW]

**Les 4 transformations du cycle :**
1. **1-2 : Compression adiabatique** — Le fluide passe de vapeur saturée à vapeur surchauffée. Pression et température augmentent.
2. **2-3 : Condensation isobare** — Le fluide cède de la chaleur au milieu extérieur et passe à l'état liquide.
3. **3-4 : Détente** — Le fluide traverse le détendeur, chute de pression et de température. Début de l'évaporation.
4. **4-1 : Évaporation isobare** — Le fluide absorbe la chaleur du milieu à refroidir et se vaporise.`,
        keyPoints: [
          "COP typique installation : 2,5 à 4,5",
          "Fluides courants : R410A, R32, R134a, R1234yf",
          "Température évaporation : -10°C à +15°C",
          "Température condensation : +30°C à +55°C",
        ],
        quiz: [
          {
            q: "Dans quel composant le fluide frigorigène absorbe-t-il la chaleur du milieu à refroidir ?",
            choices: ["Le compresseur","L'évaporateur","Le condenseur","Le détendeur"],
            answer: 1,
            explanation: "L'évaporateur est l'échangeur côté froid. Le fluide y absorbe la chaleur du milieu à refroidir en s'évaporant à basse pression.",
          },
          {
            q: "Qu'est-ce que le COP d'une installation frigorifique ?",
            choices: [
              "La puissance électrique consommée",
              "Le rapport entre la puissance frigorifique et la puissance absorbée",
              "La différence de température entre condensation et évaporation",
              "Le débit massique du fluide frigorigène",
            ],
            answer: 1,
            explanation: "Le COP = Qf/W. Un COP de 3 signifie que pour 1 kW électrique consommé, on produit 3 kW de froid.",
          },
        ],
      },
      {
        id: "composants", title: "Les 4 composants principaux",
        content: `**1. LE COMPRESSEUR**
Coeur de l'installation, il aspire la vapeur de frigorigène à basse pression et la refoule à haute pression. Types principaux :
- **Scroll (spirale)** : Haute efficacité, faible bruit, débit régulier. Utilisé en climatisation < 100 kW.
- **Vis (Screw)** : Semi-hermétique ou ouvert, grandes puissances (50 à 1000 kW), groupes frigorifiques industriels.
- **Alternatif (Piston)** : Ancien mais robuste, plages de puissance variables.
- **Centrifuge (Turbine)** : Très grandes installations, refroidisseurs de liquide > 500 kW.

**Paramètres clés du compresseur :**
- Rapport de compression : Pc/Pe (typiquement 4 à 8)
- Rendement volumétrique : η_vol = 75 à 95%
- Rendement isentropique : η_is = 65 à 85%
- Puissance absorbée : P = m x (h2-h1) / η_mec

**2. LE CONDENSEUR**
Échangeur haute pression où le fluide cède sa chaleur :
- **Air/Frigorigène** : Condenseur à air (ventilateurs)
- **Eau/Frigorigène** : Condenseur à eau (tour de refroidissement)
- Sous-refroidissement optimal : 5 à 8°C sous la Tcond

**3. LE DÉTENDEUR**
Organe de laminage qui crée la chute de pression :
- **Détendeur thermostatique (TXV)** : Régulation par surchauffe (5 à 8°C)
- **Détendeur électronique (EEV)** : Précision ±0,5°C, idéal systèmes inverter
- **Tube capillaire** : Systèmes petites puissances, pas de régulation

**4. L'ÉVAPORATEUR**
Échangeur basse pression, absorption de chaleur :
- Évaporateur à détente directe : frigorigène en contact direct
- Refroidisseur de liquide (chiller) : via eau glacée
- Surchauffe typique : 5 à 10°C (protection compresseur)`,
        keyPoints: [
          "Surchauffe aspirée : 5-10 K (protection liquid slug)",
          "Sous-refroidissement : 5-8 K (optimisation COP)",
          "Rapport de compression max : 8-10 (risque surchauffe)",
          "Température refoulement max : 120°C (huile compresseur)",
        ],
        quiz: [
          {
            q: "Quel type de compresseur est le plus adapté pour une climatisation de précision en salle serveur ?",
            choices: ["Piston alternatif","Centrifuge","Scroll ou Vis avec variateur","Tube capillaire"],
            answer: 2,
            explanation: "Le compresseur Scroll ou Vis avec variateur de fréquence (inverter) permet une modulation précise de la puissance, idéal pour les salles serveurs où les charges varient.",
          },
          {
            q: "Pourquoi maintient-on une surchauffe de 5 à 10 K à l'aspiration du compresseur ?",
            choices: [
              "Pour augmenter le COP",
              "Pour éviter l'entrée de liquide dans le compresseur",
              "Pour réduire la consommation électrique",
              "Pour augmenter la capacité frigorifique",
            ],
            answer: 1,
            explanation: "La surchauffe garantit que seule la vapeur entre dans le compresseur. Le liquide frigorigène est incompressible et détruirait immédiatement les pistons ou spirales.",
          },
        ],
      },
    ],
  },
  {
    id: "crac", icon: "🖥️", title: "CRAC",
    subtitle: "Computer Room Air Conditioning",
    color: "#ff6b2b", gradient: "linear-gradient(135deg,#3d1500,#7a2e00)",
    chapters: [
      {
        id: "crac-intro", title: "Principe et architecture CRAC",
        content: `**Le CRAC (Computer Room Air Conditioning)** est une unité de climatisation de précision conçue spécifiquement pour les salles informatiques et les datacenters. Contrairement à la climatisation confort, il répond à des exigences très strictes de **température, humidité et filtration**.

**Régulation précise :**
- Température : ±0,5 à ±1°C (vs ±2°C en confort)
- Humidité relative : 40 à 60% (recommandation ASHRAE)
- Disponibilité : 99,999% visée (5 minutes d'arrêt/an)

**Architecture type d'un CRAC (armoire intégrée) :**
1. **Batterie froide à détente directe (DX)** — Évaporateur du circuit frigorifique interne
2. **Batterie chaude électrique ou hydraulique** — Préchauffage si T° trop basse
3. **Humidificateur** — Électrode à immersion ou résistances
4. **Déshumidificateur** — Rôle de l'évaporateur en mode déshum.
5. **Ventilateurs EC** — Electronically Commutated, vitesse variable
6. **Filtrerie** — G4 + F7 typiquement (EN 779)

**Types de refroidissement du condenseur CRAC :**
- **Air / Air** : Condenseur à air extérieur, simple mais limité en T°ext
- **Air / Eau** : Condenseur raccordé à circuit eau froide ou tour, meilleur COP
- **Free-Cooling** : Utilisation directe de l'air extérieur froid en hiver

**Normes de référence :**
- ASHRAE TC 9.9 : Classes A1 à A4 pour serveurs
- EN 1886 : Performance des unités de traitement d'air
- EN 50600 : Datacenters — Infrastructure physique`,
        keyPoints: [
          "Puissance typique CRAC : 10 à 60 kW",
          "COP CRAC : 2,0 à 3,5 (selon T°ext et charge)",
          "ASHRAE A1 : 15-32°C, 20-80% HR (classe serveurs standard)",
          "PUE datacenter : Power Usage Effectiveness, objectif < 1,4",
        ],
        quiz: [
          {
            q: "Quelle est la plage d'humidité relative recommandée par l'ASHRAE pour une salle serveur ?",
            choices: ["10-30%","40-60%","70-90%","20-40%"],
            answer: 1,
            explanation: "L'ASHRAE recommande 40-60% HR. En dessous, risque d'électricité statique ; au-dessus, risque de condensation sur les composants électroniques.",
          },
          {
            q: "Qu'est-ce que le PUE d'un datacenter ?",
            choices: [
              "La puissance maximale consommée par les serveurs",
              "Le rapport entre énergie totale du datacenter et énergie IT",
              "La capacité de refroidissement disponible",
              "Le nombre d'unités CRAC installées",
            ],
            answer: 1,
            explanation: "PUE = Énergie totale datacenter / Énergie consommée IT. Un PUE = 1,4 signifie que pour 1 kW IT, on consomme 0,4 kW pour refroidir et distribuer.",
          },
        ],
      },
      {
        id: "crac-maintenance", title: "Maintenance préventive CRAC",
        content: `**Plan de maintenance préventive CRAC — Programme certifié :**

**MENSUELLE (Technicien N1) :**
- Vérification visuelle fuites frigorigène (détecteur électronique)
- Contrôle filtres et delta P (filtre encrassé = perte débit = alarme T°)
- Lecture paramètres : T° soufflage, T° retour, HR%, alarmes actives
- Test alarmes : sonde T°, sonde HR, coupure alimentation

**TRIMESTRIELLE (Technicien N2) :**
- Mesures électriques : courant compresseur, ventilateurs (clamp-mètre)
- Contrôle humidificateur : tartre (eau dure = résistances + électrodes)
- Vérification pressions statiques (manomètres BP/HP)
- Nettoyage batterie (serpentin) : soufflage + mousse coilclean
- Vérification vannes de service, robinetterie

**SEMESTRIELLE (Technicien N2/N3 certifié) :**
- Analyse du fluide frigorigène (chromatographie si suspect)
- Mesures circuit complet : Pressions HP/BP, surchauffe aspirée, sous-refroidissement
- Contrôle huile compresseur (transparence, viscosité)
- Vérification isolations électriques (mégohmmètre 500V)
- Étalonnage sondes T° et HR (bain thermostaté ou hygromètre référence)

**ANNUELLE (Technicien N3 + attestation capacité obligatoire) :**
- Recherche de fuites systématique (azote + traceur UV)
- Remplacement filtre dessiccateur si humidité détectée
- Bilan énergétique complet (calcul COP réel vs. nominal)
- Mise à jour firmware automate régulation

**Outils obligatoires :**
- Station de charge frigorigène (récupération obligatoire)
- Détecteur gaz halogéné (seuil < 5 g/an)
- Manifold digital 4 voies + sondes température
- Clamp-mètre True RMS + mégohmmètre
- Hygromètre de référence étalonné`,
        keyPoints: [
          "Attestation de capacité obligatoire (Décret n°2015-1334)",
          "Seuil de fuite réglementaire : 5% de charge/an max",
          "Encrassement filtre : +15% consommation ventilateur",
          "Tartre humidificateur : réduction 30% capacité",
        ],
        quiz: [
          {
            q: "Pourquoi faut-il une attestation de capacité pour manipuler les fluides frigorigènes ?",
            choices: [
              "C'est juste une recommandation non obligatoire",
              "Pour des raisons environnementales (GWP élevé) et de sécurité",
              "Uniquement pour les installations > 100 kW",
              "Pour pouvoir acheter du matériel chez un grossiste",
            ],
            answer: 1,
            explanation: "Le Décret n°2015-1334 impose l'attestation de capacité. Les fluides HFC ont un GWP élevé (ex: R410A = 2088). Leur rejet est interdit et sanctionné. L'attestation garantit les compétences de manipulation et récupération.",
          },
          {
            q: "Quelle mesure électrique permet de vérifier l'isolation d'un moteur de compresseur ?",
            choices: [
              "Voltmètre entre phase et neutre",
              "Clamp-mètre en mode AC",
              "Mégohmmètre à 500V entre bobinage et masse",
              "Multimètre en mode résistance (Ohm)",
            ],
            answer: 2,
            explanation: "Le mégohmmètre applique 500V DC entre le bobinage et la carcasse. Une résistance > 1 MOhm est acceptable. En dessous, le bobinage est humide ou dégradé et le moteur risque de claquer.",
          },
        ],
      },
    ],
  },
  {
    id: "crah", icon: "🌀", title: "CRAH",
    subtitle: "Computer Room Air Handler",
    color: "#00ff88", gradient: "linear-gradient(135deg,#003d1a,#006b30)",
    chapters: [
      {
        id: "crah-principe", title: "Architecture et fonctionnement CRAH",
        content: `**Le CRAH (Computer Room Air Handler)** est fondamentalement différent du CRAC : il **n'intègre pas de circuit frigorifique**. Il utilise de l'**eau glacée** produite par un groupe froid (chiller) centralisé.

**Différence fondamentale CRAC vs CRAH :**
- Production froid CRAC : Interne (compresseur) | CRAH : Externe (chiller centralisé)
- Fluide batterie CRAC : Frigorigène | CRAH : Eau glacée 6/12°C
- Maintenance CRAC : Complexe (circuit frigo) | CRAH : Simple (eau + ventilos)
- Puissance unitaire CRAC : 10-60 kW | CRAH : 30-300 kW
- Disponibilité CRAH : Haute (redondance chiller N+1)

**Architecture du CRAH :**
1. **Batterie à eau glacée (Coil)** — Eau entrée 6°C, sortie 12°C, delta T = 6K standard
2. **Ventilateurs EC (Electronically Commutated)** — Moteurs brushless à aimants permanents, η > 90%, variation 0-100%
3. **Régulation par automate embarqué** — Sonde T° retour d'air (set point 24-27°C), modulation ventilateurs

**Formule de débit eau :**
- Débit (m3/h) = Puissance (kW) / (1,163 x delta T eau)
- Exemple : 120 kW / (1,163 x 6) = 17,2 m3/h

**Schéma hydraulique :**
Circuit primaire (chiller) → Nourrice aller 6°C → CRAH → Nourrice retour 12°C → Chiller
Régulation débit : vanne 2 voies motorisée sur chaque CRAH
Pompes : N+1 (redondance), variateur de fréquence

**Avantages CRAH pour datacenter large :**
- COP système global jusqu'à 6-8 (avec free-cooling eau glacée)
- Centralisation maintenance (1 chiller vs N CRAC avec circuits frigo)
- Scalabilité : ajout CRAH sans modification circuit frigorifique
- Free-cooling eau possible si T°ext < 8°C`,
        keyPoints: [
          "Eau glacée : 6°C aller / 12°C retour (delta T = 6K)",
          "Débit eau (m3/h) = kW / (1,163 x delta T eau)",
          "Ventilateurs EC : rendement > 90% (vs 70% moteurs AC)",
          "Free-cooling eau : économie jusqu'à 60% énergie en hiver",
        ],
        quiz: [
          {
            q: "Un CRAH doit refroidir 120 kW. Avec eau glacée 6/12°C (delta T=6K), quel est le débit d'eau nécessaire ?",
            choices: ["8,6 m3/h","17,2 m3/h","34,4 m3/h","5,2 m3/h"],
            answer: 1,
            explanation: "Q = P / (1,163 x delta T) = 120 / (1,163 x 6) = 120 / 6,978 = 17,2 m3/h. La constante 1,163 est la capacité calorifique de l'eau en Wh/(l·K).",
          },
          {
            q: "Quel est l'avantage principal des moteurs EC par rapport aux moteurs AC dans les ventilateurs CRAH ?",
            choices: [
              "Ils sont moins chers à l'achat",
              "Rendement supérieur (>90%) et variation de vitesse native",
              "Ils fonctionnent uniquement en triphasé",
              "Ils ne nécessitent aucune maintenance",
            ],
            answer: 1,
            explanation: "Les moteurs EC (Electronically Commutated) à aimants permanents atteignent η > 90% contre 70% pour l'AC. Ils modulent nativement leur vitesse selon la charge, économisant jusqu'à 50% d'énergie en mi-charge.",
          },
        ],
      },
    ],
  },
  {
    id: "fanwall", icon: "🔄", title: "Fanwall",
    subtitle: "Mur de ventilateurs N+1",
    color: "#bf5fff", gradient: "linear-gradient(135deg,#1a003d,#35006b)",
    chapters: [
      {
        id: "fanwall-concept", title: "Technologie Fanwall et redondance",
        content: `**Le Fanwall** est une architecture de ventilation utilisée dans les grandes unités de refroidissement de datacenter. Il remplace un ou plusieurs grands ventilateurs par une **matrice de petits ventilateurs EC** disposés en mur.

**Principe de redondance N+1 :**
Si un fanwall comporte 9 ventilateurs (3x3) dimensionnés pour 100% de la charge, chaque ventilateur assure 1/9 ≈ 11% du débit. En panne d'un ventilateur, les 8 restants accélèrent légèrement → **Zéro interruption de service**.

**Lois de similitude des ventilateurs (Lois d'Affinité) :**
- Débit Q : Q2/Q1 = n2/n1 (proportionnel à la vitesse)
- Pression delta P : delta P2/delta P1 = (n2/n1)² (carré de la vitesse)
- Puissance P : P2/P1 = (n2/n1)³ — **LOI CUBIQUE**

**La loi cubique** est fondamentale : réduire la vitesse de 20% → économie de puissance de 49% !

**Avantages du Fanwall vs ventilateur unique :**
- Redondance N+1 sans équipement de secours encombrant
- Efficacité : petits ventilateurs EC à haut rendement aérodynamique
- Bruit réduit : distribution du bruit sur de nombreuses sources
- Hot-swap : remplacement ventilateur sous tension sans arrêt
- Modularité : ajout de colonnes si la puissance augmente

**Technologies de contrôle Fanwall :**
- **Bus CAN ou RS485** : chaque ventilateur adressable individuellement
- **Protocole EC-Bus** (ebm-papst) : monitoring vibrations, T° roulement, heures
- **BMS Integration** : BACnet/IP ou Modbus TCP vers supervision datacenter
- **Algorithme de Load Sharing** : équilibration automatique des heures de fonctionnement

**Courbe de sélection :**
Le point de fonctionnement doit se situer dans la zone d'efficacité maximale (η > 85%). La courbe réseau (delta P = k x Q²) doit couper la courbe ventilateur dans cette zone.`,
        keyPoints: [
          "Loi cubique : -20% vitesse = -49% puissance consommée",
          "Hot-swap : remplacement sans arrêt de l'installation",
          "Rendement EC : η > 85% au point nominal",
          "Monitoring : vibrations, T° roulement, heures fonctionnement",
        ],
        quiz: [
          {
            q: "Un fanwall tourne à 800 rpm et consomme 2 kW. Vitesse réduite à 640 rpm (-20%). Quelle est la nouvelle puissance ?",
            choices: ["1,6 kW","1,024 kW","1,28 kW","1,8 kW"],
            answer: 1,
            explanation: "Loi cubique : P2 = P1 x (n2/n1)³ = 2 x (640/800)³ = 2 x (0,8)³ = 2 x 0,512 = 1,024 kW. Économie de 49% pour seulement 20% de réduction de vitesse !",
          },
          {
            q: "Un fanwall de 8 ventilateurs perd 1 ventilateur. De combien augmente la vitesse des 7 restants pour maintenir le même débit ?",
            choices: [
              "Augmentation de 14,3%",
              "Le système s'arrête automatiquement",
              "Aucun changement",
              "Augmentation de 25%",
            ],
            answer: 0,
            explanation: "Q constant : 7xV2 = 8xV1, donc V2 = (8/7)xV1 = 1,143xV1. Augmentation de 14,3%. Grâce à la loi cubique, la puissance totale n'augmente que de ~6% vs situation nominale.",
          },
        ],
      },
    ],
  },
  {
    id: "cvc", icon: "🏭", title: "CVC",
    subtitle: "Chauffage Ventilation Climatisation",
    color: "#ffcc00", gradient: "linear-gradient(135deg,#3d2e00,#6b5100)",
    chapters: [
      {
        id: "cta", title: "Centrale de Traitement d'Air (CTA)",
        content: `**La Centrale de Traitement d'Air (CTA)** est l'équipement central des installations CVC tertiaires et industrielles. Elle traite l'air neuf et/ou recyclé pour maintenir les conditions de confort ou de process.

**Section 1 — Entrée Air Neuf**
- Volet d'air neuf motorisé (servomoteur 24V)
- Filtre à poches G4 (gros particulaire : pollen, poussière)
- Filtre F7 ou F9 (fines particules, PM2.5)
- Récupérateur de chaleur : contre-courant, rotatif ou à plaques

**Section 2 — Batteries de chauffe / refroidissement**
- Batterie chaude eau chaude (70/50°C) ou électrique
- Batterie froide eau glacée (6/12°C) ou DX
- Régulation : vanne 3 voies + actionneur motorisé

**Section 3 — Humidification**
- Humidificateur vapeur (résistances immersées) : hygiénique, pas de légionelle
- Humidificateur adiabatique (HPA) : haute pression eau osmosée, très économique
- Humidificateur à ultrasons : petite puissance, silencieux

**Section 4 — Ventilation**
- Ventilateur soufflage (moteur EC direct drive)
- Ventilateur extraction (si double flux)
- Mesure débit par tube de Pitot ou plaque à orifice

**Section 5 — Récupération d'énergie**
- Échangeur à contre-courant : η jusqu'à 85% (chaleur sensible uniquement)
- Roue hygroscopique : récupération chaleur sensible + latente (η 75-85%)
- Run-around coil : 2 batteries interconnectées (bâtiments multi-ailes)

**Calcul débit d'air (ASHRAE 62.1) :**
Qair = N x débit_par_personne + Surface x débit_par_m²
Bureaux : 10 l/s/personne + 0,3 l/(s·m²)

**Régulation CTA — Automate DDC :**
- PID température soufflage (cascade avec T° ambiante)
- PID humidité (commande humidificateur + volet by-pass)
- CO2 monitoring → modulation débit air neuf (DCV)
- Gestion alarmes : filtre encrassé (delta P), gel batterie (< 4°C), incendie`,
        keyPoints: [
          "Récupérateur plaques : η = 60-85% (sans transfert humidité)",
          "Roue hygroscopique : η = 75-85% (chaleur + humidité)",
          "CO2 < 1000 ppm : qualité d'air intérieur acceptable",
          "Classe filtre F7 : efficacité 95% à MPPS (0,4 μm)",
        ],
        quiz: [
          {
            q: "Quelle technologie de récupération de chaleur permet de récupérer la chaleur sensible ET latente (humidité) ?",
            choices: [
              "Échangeur à plaques aluminium",
              "Batterie run-around coil",
              "Roue hygroscopique (roue enthalpique)",
              "Free-cooling direct",
            ],
            answer: 2,
            explanation: "La roue hygroscopique est imprégnée d'un matériau hygroscopique (silicagel, zéolite). Elle tourne entre le flux d'extraction et d'air neuf, transférant chaleur ET humidité, atteignant η = 75-85% enthalpique.",
          },
          {
            q: "Le CO2 dans une salle de réunion atteint 1800 ppm. Quelle action automatique devrait déclencher un système DCV ?",
            choices: [
              "Augmenter la température de soufflage",
              "Ouvrir davantage le volet d'air neuf (augmenter le débit AN)",
              "Activer l'humidificateur",
              "Couper les ventilateurs",
            ],
            answer: 1,
            explanation: "La régulation DCV (Demand Controlled Ventilation) utilise le CO2 comme indicateur de taux d'occupation. 1800 ppm > seuil 1000 ppm → ouverture volet air neuf pour diluer le CO2 et apporter O2 frais.",
          },
        ],
      },
    ],
  },
];

// ─── SVG DIAGRAMS ──────────────────────────────────────────────────────────
const DiagramCircuitFrigo = () => (
  <svg viewBox="0 0 700 420" style={{width:"100%",background:"transparent"}}>
    <defs>
      <marker id="aC" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#00d4ff"/></marker>
      <marker id="aH" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#ff6b2b"/></marker>
      <filter id="g1"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect x="330" y="15" width="355" height="195" rx="8" fill="rgba(255,107,43,0.07)" stroke="rgba(255,107,43,0.3)" strokeWidth="1" strokeDasharray="4,3"/>
    <text x="507" y="34" textAnchor="middle" fill="#ff6b2b" fontSize="11" fontFamily="monospace">HAUTE PRESSION (HP)</text>
    <rect x="20" y="220" width="355" height="185" rx="8" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeDasharray="4,3"/>
    <text x="197" y="238" textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace">BASSE PRESSION (BP)</text>
    <g transform="translate(105,85)">
      <rect x="-55" y="-42" width="110" height="84" rx="8" fill="#0d0d1a" stroke="#00d4ff" strokeWidth="2" filter="url(#g1)"/>
      <text x="0" y="-20" textAnchor="middle" fill="#00d4ff" fontSize="11" fontWeight="bold" fontFamily="monospace">COMPRESSEUR</text>
      <text x="0" y="-5" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Scroll / Vis / Piston</text>
      <text x="0" y="10" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">η_is = 70-85%</text>
      <text x="0" y="24" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">W = m.(h2-h1)</text>
    </g>
    <g transform="translate(500,85)">
      <rect x="-80" y="-42" width="160" height="84" rx="8" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="2" filter="url(#g1)"/>
      <text x="0" y="-20" textAnchor="middle" fill="#ff6b2b" fontSize="11" fontWeight="bold" fontFamily="monospace">CONDENSEUR</text>
      <text x="0" y="-5" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Rejet chaleur Qc</text>
      <text x="0" y="10" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">Tcond = 35-50°C</text>
      <text x="0" y="24" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Qc = Qf + W</text>
      <line x1="-30" y1="-42" x2="-30" y2="-60" stroke="#ff4444" strokeWidth="1.5" markerEnd="url(#aH)" opacity="0.8"/>
      <line x1="0" y1="-42" x2="0" y2="-60" stroke="#ff4444" strokeWidth="1.5" markerEnd="url(#aH)" opacity="0.8"/>
      <line x1="30" y1="-42" x2="30" y2="-60" stroke="#ff4444" strokeWidth="1.5" markerEnd="url(#aH)" opacity="0.8"/>
      <text x="0" y="-64" textAnchor="middle" fill="#ff4444" fontSize="9" fontFamily="monospace">CHALEUR → EXT.</text>
    </g>
    <g transform="translate(500,315)">
      <rect x="-65" y="-32" width="130" height="64" rx="8" fill="#0d0d1a" stroke="#bf5fff" strokeWidth="2" filter="url(#g1)"/>
      <text x="0" y="-12" textAnchor="middle" fill="#bf5fff" fontSize="11" fontWeight="bold" fontFamily="monospace">DÉTENDEUR</text>
      <text x="0" y="4" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">TXV / EEV / Capillaire</text>
      <text x="0" y="18" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">Surchauffe cible = 5-8 K</text>
    </g>
    <g transform="translate(145,315)">
      <rect x="-95" y="-42" width="190" height="84" rx="8" fill="#0d0d1a" stroke="#00ff88" strokeWidth="2" filter="url(#g1)"/>
      <text x="0" y="-20" textAnchor="middle" fill="#00ff88" fontSize="11" fontWeight="bold" fontFamily="monospace">ÉVAPORATEUR</text>
      <text x="0" y="-5" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Absorption chaleur Qf</text>
      <text x="0" y="10" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">Tévap = -5 à +15°C</text>
      <text x="0" y="24" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Qf = m.(h1-h4)</text>
      <line x1="-35" y1="42" x2="-35" y2="60" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#aC)" opacity="0.8"/>
      <line x1="0" y1="42" x2="0" y2="60" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#aC)" opacity="0.8"/>
      <line x1="35" y1="42" x2="35" y2="60" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#aC)" opacity="0.8"/>
      <text x="0" y="72" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">FROID → MILIEU</text>
    </g>
    <line x1="160" y1="85" x2="420" y2="85" stroke="#ff6b2b" strokeWidth="3" markerEnd="url(#aH)" filter="url(#g1)"/>
    <text x="290" y="72" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontFamily="monospace">① Vapeur HP surchauffée</text>
    <line x1="500" y1="127" x2="500" y2="283" stroke="#ff8800" strokeWidth="3" markerEnd="url(#aH)" filter="url(#g1)"/>
    <text x="535" y="210" textAnchor="middle" fill="#ff8800" fontSize="9" fontFamily="monospace" transform="rotate(90,535,210)">② Liquide HP sous-refroidi</text>
    <line x1="435" y1="315" x2="240" y2="315" stroke="#00d4ff" strokeWidth="3" markerEnd="url(#aC)" filter="url(#g1)"/>
    <text x="337" y="303" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">③ Mélange BP (détente)</text>
    <line x1="145" y1="273" x2="145" y2="160" stroke="#00aaff" strokeWidth="3" filter="url(#g1)"/>
    <line x1="145" y1="160" x2="50" y2="160" stroke="#00aaff" strokeWidth="3"/>
    <line x1="50" y1="160" x2="50" y2="92" stroke="#00aaff" strokeWidth="3" markerEnd="url(#aC)"/>
    <text x="72" y="218" textAnchor="middle" fill="#00aaff" fontSize="9" fontFamily="monospace" transform="rotate(-90,72,218)">④ Vapeur BP surchauffée</text>
    {[{x:160,y:85,n:"1"},{x:420,y:85,n:"2"},{x:500,y:283,n:"3"},{x:240,y:315,n:"4"}].map(p=>(
      <g key={p.n}><circle cx={p.x} cy={p.y} r="11" fill="#0d0d1a" stroke="#fff" strokeWidth="1.5"/><text x={p.x} y={p.y+4} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">{p.n}</text></g>
    ))}
    <rect x="25" y="355" width="240" height="50" rx="6" fill="rgba(255,204,0,0.08)" stroke="rgba(255,204,0,0.35)" strokeWidth="1"/>
    <text x="145" y="374" textAnchor="middle" fill="#ffcc00" fontSize="10" fontWeight="bold" fontFamily="monospace">COP = Qf / W = (h1-h4) / (h2-h1)</text>
    <text x="145" y="392" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Installation réelle : COP = 2,5 à 4,5</text>
    <text x="350" y="413" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">Cycle frigorifique à compression de vapeur — Points thermodynamiques 1-2-3-4</text>
  </svg>
);

const DiagramCRAC = () => (
  <svg viewBox="0 0 700 400" style={{width:"100%",background:"transparent"}}>
    <defs><filter id="g2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="200" y="30" width="300" height="330" rx="10" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="2" filter="url(#g2)"/>
    <text x="350" y="56" textAnchor="middle" fill="#ff6b2b" fontSize="15" fontWeight="bold" fontFamily="monospace">CRAC</text>
    <text x="350" y="73" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Armoire de climatisation de précision</text>
    {[
      {y:90,  color:"#00aaff", label:"BATTERIE DX (Evaporateur)", sub:"Frigorigène R410A / R32"},
      {y:150, color:"#ff4444", label:"BATTERIE CHAUDE",           sub:"Électrique ou eau chaude 70°C"},
      {y:210, color:"#00ffff", label:"HUMIDIFICATEUR",            sub:"Électrodes immersées (vapeur)"},
      {y:265, color:"#bf5fff", label:"VENTILATEURS EC",           sub:"Vitesse variable 0-100%"},
      {y:315, color:"#00ff88", label:"FILTRERIE G4 + F7",         sub:"EN 779 — deltaP mesuré"},
    ].map(c=>(
      <g key={c.y}>
        <rect x="215" y={c.y} width="270" height="48" rx="5" fill="rgba(0,0,0,0.4)" stroke={c.color} strokeWidth="1"/>
        <text x="350" y={c.y+18} textAnchor="middle" fill={c.color} fontSize="10" fontWeight="bold" fontFamily="monospace">{c.label}</text>
        <text x="350" y={c.y+33} textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">{c.sub}</text>
      </g>
    ))}
    <rect x="565" y="50" width="120" height="80" rx="8" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="1.5"/>
    <text x="625" y="77" textAnchor="middle" fill="#ff6b2b" fontSize="10" fontWeight="bold" fontFamily="monospace">CONDENSEUR</text>
    <text x="625" y="92" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Air ext. ou eau</text>
    <text x="625" y="107" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">Tcond 35-50°C</text>
    <line x1="500" y1="115" x2="565" y2="90" stroke="#ff6b2b" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"/>
    <line x1="500" y1="128" x2="565" y2="122" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"/>
    <text x="534" y="96" textAnchor="middle" fill="#ff6b2b" fontSize="8" fontFamily="monospace">HP →</text>
    <text x="534" y="130" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">← BP</text>
    <rect x="565" y="160" width="120" height="80" rx="8" fill="#0d0d1a" stroke="#00ff88" strokeWidth="1.5"/>
    <text x="625" y="187" textAnchor="middle" fill="#00ff88" fontSize="10" fontWeight="bold" fontFamily="monospace">AUTOMATE DDC</text>
    <text x="625" y="202" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Contrôleur embarqué</text>
    <text x="625" y="217" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">Modbus / BACnet</text>
    <line x1="500" y1="200" x2="565" y2="200" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7"/>
    <rect x="20" y="135" width="100" height="55" rx="6" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="1.5"/>
    <text x="70" y="158" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontWeight="bold" fontFamily="monospace">AIR CHAUD</text>
    <text x="70" y="173" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">~27°C retour</text>
    <line x1="120" y1="162" x2="200" y2="162" stroke="#ff6b2b" strokeWidth="2.5" opacity="0.8"/>
    <polygon points="194,157 204,162 194,167" fill="#ff6b2b"/>
    <rect x="20" y="245" width="100" height="55" rx="6" fill="#0d0d1a" stroke="#00d4ff" strokeWidth="1.5"/>
    <text x="70" y="268" textAnchor="middle" fill="#00d4ff" fontSize="9" fontWeight="bold" fontFamily="monospace">AIR FROID</text>
    <text x="70" y="283" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">~15°C soufflage</text>
    <line x1="200" y1="272" x2="120" y2="272" stroke="#00d4ff" strokeWidth="2.5" opacity="0.8"/>
    <polygon points="126,267 116,272 126,277" fill="#00d4ff"/>
    <rect x="565" y="270" width="120" height="80" rx="8" fill="rgba(255,107,43,0.07)" stroke="rgba(255,107,43,0.3)" strokeWidth="1"/>
    <text x="625" y="295" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontWeight="bold" fontFamily="monospace">SPÉCIFICATIONS</text>
    <text x="625" y="310" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Puissance : 10-60 kW</text>
    <text x="625" y="324" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">T° : ±0,5°C</text>
    <text x="625" y="338" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">HR : 40-60%</text>
    <text x="625" y="352" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">COP : 2,0 à 3,5</text>
    <text x="350" y="390" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">CRAC — Architecture armoire intégrée avec circuit frigorifique interne</text>
  </svg>
);

const DiagramCRAH = () => (
  <svg viewBox="0 0 700 400" style={{width:"100%",background:"transparent"}}>
    <defs><filter id="g3"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="230" y="50" width="240" height="300" rx="10" fill="#0d0d1a" stroke="#00ff88" strokeWidth="2" filter="url(#g3)"/>
    <text x="350" y="76" textAnchor="middle" fill="#00ff88" fontSize="14" fontWeight="bold" fontFamily="monospace">CRAH</text>
    <text x="350" y="92" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Computer Room Air Handler</text>
    <rect x="245" y="105" width="210" height="60" rx="5" fill="#0a1a2e" stroke="#00aaff" strokeWidth="1.5"/>
    <text x="350" y="125" textAnchor="middle" fill="#00aaff" fontSize="10" fontWeight="bold" fontFamily="monospace">BATTERIE EAU GLACÉE</text>
    <text x="350" y="140" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Entrée 6°C → Sortie 12°C</text>
    <text x="350" y="155" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">Q = 1,163 x deltaT x débit (m3/h)</text>
    <rect x="245" y="178" width="210" height="55" rx="5" fill="#0a0a1e" stroke="#bf5fff" strokeWidth="1.5"/>
    <text x="350" y="198" textAnchor="middle" fill="#bf5fff" fontSize="10" fontWeight="bold" fontFamily="monospace">VENTILATEURS EC</text>
    <text x="350" y="213" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">η &gt; 90% — Vitesse variable</text>
    {[285,315,345,375,405].map(x=>(
      <g key={x}><circle cx={x} cy={224} r="7" fill="none" stroke="#bf5fff" strokeWidth="1" opacity="0.6"/><line x1={x-7} y1={224} x2={x+7} y2={224} stroke="#bf5fff" strokeWidth="1" opacity="0.6"/><line x1={x} y1={217} x2={x} y2={231} stroke="#bf5fff" strokeWidth="1" opacity="0.6"/></g>
    ))}
    <rect x="245" y="246" width="210" height="42" rx="5" fill="#0a1a0a" stroke="#00ff88" strokeWidth="1"/>
    <text x="350" y="265" textAnchor="middle" fill="#00ff88" fontSize="10" fontWeight="bold" fontFamily="monospace">AUTOMATE DDC</text>
    <text x="350" y="280" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">BACnet/IP — Modbus TCP</text>
    <rect x="245" y="300" width="105" height="38" rx="5" fill="#0a0a0a" stroke="#ff6b2b" strokeWidth="1"/>
    <text x="297" y="317" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontWeight="bold" fontFamily="monospace">VANNE 2V</text>
    <text x="297" y="331" textAnchor="middle" fill="#888" fontSize="8" fontFamily="monospace">Motorisée 24V</text>
    <rect x="20" y="125" width="90" height="58" rx="6" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="1.5"/>
    <text x="65" y="149" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontWeight="bold" fontFamily="monospace">AIR CHAUD</text>
    <text x="65" y="163" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Retour salle</text>
    <text x="65" y="176" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">~27°C</text>
    <line x1="110" y1="154" x2="230" y2="154" stroke="#ff6b2b" strokeWidth="2.5" opacity="0.8"/>
    <polygon points="224,149 234,154 224,159" fill="#ff6b2b"/>
    <rect x="590" y="125" width="90" height="58" rx="6" fill="#0d0d1a" stroke="#00d4ff" strokeWidth="1.5"/>
    <text x="635" y="149" textAnchor="middle" fill="#00d4ff" fontSize="9" fontWeight="bold" fontFamily="monospace">AIR FROID</text>
    <text x="635" y="163" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Soufflage</text>
    <text x="635" y="176" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">~15°C</text>
    <line x1="470" y1="154" x2="590" y2="154" stroke="#00aaff" strokeWidth="2.5" opacity="0.8"/>
    <polygon points="584,149 594,154 584,159" fill="#00aaff"/>
    <rect x="30" y="270" width="120" height="68" rx="8" fill="#0d0d1a" stroke="#00aaff" strokeWidth="2"/>
    <text x="90" y="297" textAnchor="middle" fill="#00aaff" fontSize="10" fontWeight="bold" fontFamily="monospace">CHILLER</text>
    <text x="90" y="312" textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">Groupe froid central</text>
    <text x="90" y="327" textAnchor="middle" fill="#ffcc00" fontSize="8" fontFamily="monospace">Eau 6°C / 12°C</text>
    <path d="M150,285 Q192,285 210,145 L230,145" fill="none" stroke="#00aaff" strokeWidth="2" strokeDasharray="5,3" opacity="0.7"/>
    <path d="M150,315 Q196,315 215,163 L230,163" fill="none" stroke="#006699" strokeWidth="2" strokeDasharray="5,3" opacity="0.7"/>
    <text x="185" y="256" fill="#00aaff" fontSize="8" fontFamily="monospace" transform="rotate(-72,185,256)">Aller 6°C</text>
    <text x="210" y="264" fill="#006699" fontSize="8" fontFamily="monospace" transform="rotate(-72,210,264)">Retour 12°C</text>
    <rect x="595" y="230" width="90" height="120" rx="6" fill="#0d0d1a" stroke="#ff6b2b" strokeWidth="1.5"/>
    <text x="640" y="256" textAnchor="middle" fill="#ff6b2b" fontSize="9" fontFamily="monospace">SERVEURS</text>
    {[265,275,285,295,305,315,325,335].map(y=>(<rect key={y} x="607" y={y} width="66" height="5" rx="1" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>))}
    <text x="350" y="392" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">Architecture CRAH — Refroidissement à eau glacée centralisée (chiller N+1)</text>
  </svg>
);

const DiagramFanwall = () => (
  <svg viewBox="0 0 700 380" style={{width:"100%",background:"transparent"}}>
    <defs><filter id="g4"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <text x="350" y="28" textAnchor="middle" fill="#bf5fff" fontSize="15" fontWeight="bold" fontFamily="monospace">FANWALL — Matrice 3x4 (N+1)</text>
    <text x="350" y="46" textAnchor="middle" fill="#aaa" fontSize="10" fontFamily="monospace">11 ventilateurs actifs + 1 spare — Redondance intégrée</text>
    {[0,1,2,3].map(col=>[0,1,2].map(row=>{
      const isSpare = col===3 && row===1;
      const cx = 120+col*130, cy = 100+row*80;
      return (
        <g key={`${col}-${row}`} transform={`translate(${cx},${cy})`}>
          <circle cx="0" cy="0" r="36" fill="#0d0d1a" stroke={isSpare?"#ffcc00":"#bf5fff"} strokeWidth={isSpare?2.5:1.5} filter="url(#g4)"/>
          {[0,72,144,216,288].map(a=>(
            <g key={a} transform={`rotate(${a})`}>
              <ellipse cx="0" cy="-20" rx="7" ry="15" fill={isSpare?"rgba(255,204,0,0.3)":"rgba(191,95,255,0.3)"} stroke={isSpare?"#ffcc00":"#bf5fff"} strokeWidth="0.5"/>
            </g>
          ))}
          <circle cx="0" cy="0" r="5" fill={isSpare?"#ffcc00":"#bf5fff"}/>
          <text x="0" y="48" textAnchor="middle" fill={isSpare?"#ffcc00":"#aaa"} fontSize="9" fontFamily="monospace">{isSpare?"SPARE N+1":`FAN ${col*3+row+1}`}</text>
          <text x="0" y="60" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">{isSpare?"En attente":"EC 800W"}</text>
        </g>
      );
    }))}
    <text x="28" y="200" textAnchor="middle" fill="#ff6b2b" fontSize="10" fontFamily="monospace" transform="rotate(-90,28,200)">AIR CHAUD</text>
    <text x="668" y="200" textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace" transform="rotate(90,668,200)">AIR TRAITÉ</text>
    <rect x="40" y="295" width="295" height="72" rx="8" fill="rgba(191,95,255,0.07)" stroke="rgba(191,95,255,0.35)" strokeWidth="1"/>
    <text x="187" y="315" textAnchor="middle" fill="#bf5fff" fontSize="11" fontWeight="bold" fontFamily="monospace">LOIS DE SIMILITUDE</text>
    <text x="187" y="330" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Débit Q proportionnel à n  |  deltaP à n²  |  P à n³</text>
    <text x="187" y="346" textAnchor="middle" fill="#ffcc00" fontSize="9" fontFamily="monospace">-20% vitesse → -49% puissance (loi cubique !)</text>
    <text x="187" y="360" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">Panne 1/12 → +14,3% vitesse des 11 restants</text>
    <rect x="365" y="295" width="295" height="72" rx="8" fill="rgba(0,255,136,0.07)" stroke="rgba(0,255,136,0.35)" strokeWidth="1"/>
    <text x="512" y="315" textAnchor="middle" fill="#00ff88" fontSize="11" fontWeight="bold" fontFamily="monospace">REDONDANCE N+1</text>
    <text x="512" y="330" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">11 fans actifs + 1 spare (colonne droite)</text>
    <text x="512" y="346" textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="monospace">Panne → spare démarre automatiquement</text>
    <text x="512" y="360" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">Hot-swap : remplacement sous tension &lt;30s</text>
    <text x="350" y="378" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">Fanwall 3x4 — EC Bus monitored — BACnet/Modbus TCP</text>
  </svg>
);

const DiagramCVC = () => (
  <svg viewBox="0 0 700 370" style={{width:"100%",background:"transparent"}}>
    <defs><filter id="g5"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <text x="350" y="20" textAnchor="middle" fill="#ffcc00" fontSize="14" fontWeight="bold" fontFamily="monospace">CENTRALE DE TRAITEMENT D'AIR (CTA)</text>
    <rect x="20" y="30" width="660" height="240" rx="10" fill="#0d0d1a" stroke="#ffcc00" strokeWidth="1.5" filter="url(#g5)"/>
    {[123,222,318,416,512,592].map(x=><line key={x} x1={x} y1={30} x2={x} y2={270} stroke="rgba(255,204,0,0.13)" strokeWidth="1" strokeDasharray="3,3"/>)}
    {[
      {x:72,  color:"#00ff88", label:"VOLET AN",     sub1:"Motorisé 24V",  sub2:"CO2 DCV",    icon:"🌬️"},
      {x:172, color:"#00ff88", label:"FILTRES",      sub1:"G4 + F7",       sub2:"deltaP alert",icon:"🔲"},
      {x:270, color:"#bf5fff", label:"RÉCUPÉRATEUR", sub1:"Plaques",       sub2:"eta=75-85%",  icon:"♻️"},
      {x:367, color:"#00aaff", label:"BAT.FROIDE",   sub1:"6/12°C EG",     sub2:"Vanne 3V",   icon:"🧊"},
      {x:464, color:"#ff4444", label:"BAT.CHAUDE",   sub1:"70/50°C EC",    sub2:"Vanne 3V",   icon:"🔥"},
      {x:552, color:"#00ffff", label:"HUMIDIF.",     sub1:"Vapeur",        sub2:"HR 45-55%",  icon:"💧"},
      {x:626, color:"#bf5fff", label:"VENTI.",       sub1:"EC direct",     sub2:"VSD 0-100%", icon:"🔄"},
    ].map(s=>(
      <g key={s.x}>
        <text x={s.x} y={72} textAnchor="middle" fontSize="16">{s.icon}</text>
        <text x={s.x} y={100} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="bold" fontFamily="monospace">{s.label}</text>
        <text x={s.x} y={116} textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">{s.sub1}</text>
        <text x={s.x} y={130} textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">{s.sub2}</text>
      </g>
    ))}
    <rect x="25" y="155" width="650" height="30" rx="4" fill="rgba(255,204,0,0.04)"/>
    <line x1="30" y1="170" x2="660" y2="170" stroke="#ffcc00" strokeWidth="2" strokeDasharray="8,4" opacity="0.5"/>
    <polygon points="654,165 664,170 654,175" fill="#ffcc00" opacity="0.5"/>
    <text x="350" y="200" textAnchor="middle" fill="rgba(255,204,0,0.45)" fontSize="10" fontFamily="monospace">→ Flux d'air traité →</text>
    <line x1="20" y1="170" x2="0" y2="170" stroke="#00ff88" strokeWidth="2"/>
    <text x="10" y="190" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">AN</text>
    <rect x="20" y="285" width="660" height="70" rx="6" fill="rgba(255,204,0,0.04)" stroke="rgba(255,204,0,0.18)" strokeWidth="1"/>
    <text x="350" y="303" textAnchor="middle" fill="#ffcc00" fontSize="10" fontWeight="bold" fontFamily="monospace">PARAMÈTRES DE RÉGULATION — AUTOMATE DDC</text>
    {[
      {x:100, color:"#00aaff", label:"T° soufflage",  val:"16-18°C PID"},
      {x:230, color:"#00ffff", label:"Humidité HR",   val:"45-55% PID"},
      {x:360, color:"#00ff88", label:"CO2 (DCV)",     val:"< 1000 ppm"},
      {x:490, color:"#bf5fff", label:"deltaP filtres",val:"Alarme +50%"},
      {x:620, color:"#ff4444", label:"Anti-gel",      val:"Alarme < 4°C"},
    ].map(r=>(
      <g key={r.x}>
        <text x={r.x} y={322} textAnchor="middle" fill={r.color} fontSize="9" fontFamily="monospace">{r.label}</text>
        <text x={r.x} y={337} textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">{r.val}</text>
      </g>
    ))}
    <text x="350" y="365" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">CTA double flux avec récupération — Schéma de principe fonctionnel</text>
  </svg>
);

const DIAGRAMS = {
  "circuit-frigo": DiagramCircuitFrigo,
  "crac": DiagramCRAC,
  "crah": DiagramCRAH,
  "fanwall": DiagramFanwall,
  "cvc": DiagramCVC,
};

// ─── Content parser ────────────────────────────────────────────────────────
function parseContent(text, color) {
  return text.split("\n").map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{height:6}}/>;
    // Bold heading only
    if (/^\*\*[^*]+\*\*$/.test(t)) {
      return <h3 key={i} style={{color,fontFamily:"monospace",fontSize:11,marginTop:16,marginBottom:5,letterSpacing:1}}>{t.slice(2,-2)}</h3>;
    }
    // Numbered list "1. ..."
    if (/^\d+\.\s/.test(t)) {
      const num = t.match(/^(\d+)\.\s/)[1];
      const rest = t.replace(/^\d+\.\s/,"");
      const parts = rest.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={i} style={{display:"flex",gap:8,marginBottom:5,paddingLeft:4}}>
          <span style={{color,fontFamily:"monospace",fontSize:10,flexShrink:0,minWidth:16}}>{num}.</span>
          <p style={{color:"#ccc",fontFamily:"monospace",fontSize:10,margin:0,lineHeight:1.65}}>
            {parts.map((p,j)=>j%2===1?<strong key={j} style={{color:"#fff"}}>{p}</strong>:p)}
          </p>
        </div>
      );
    }
    // Bullet "- **bold** rest"
    if (/^-\s\*\*/.test(t)) {
      const m = t.match(/^-\s\*\*(.*?)\*\*(.*)/);
      if (m) return (
        <div key={i} style={{display:"flex",gap:8,marginBottom:4,paddingLeft:8}}>
          <span style={{color,fontFamily:"monospace",fontSize:10,flexShrink:0}}>▸</span>
          <p style={{color:"#ccc",fontFamily:"monospace",fontSize:10,margin:0,lineHeight:1.65}}>
            <strong style={{color:"#fff"}}>{m[1]}</strong>{m[2]}
          </p>
        </div>
      );
    }
    // Plain bullet
    if (/^[-•]\s/.test(t)) {
      const rest = t.slice(2);
      const parts = rest.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={i} style={{display:"flex",gap:8,marginBottom:3,paddingLeft:16}}>
          <span style={{color:"#555",fontFamily:"monospace",fontSize:10,flexShrink:0}}>•</span>
          <p style={{color:"#bbb",fontFamily:"monospace",fontSize:10,margin:0,lineHeight:1.65}}>
            {parts.map((p,j)=>j%2===1?<strong key={j} style={{color:"#ddd"}}>{p}</strong>:p)}
          </p>
        </div>
      );
    }
    // Normal paragraph with inline bold
    const parts = t.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{color:"#ccc",fontFamily:"monospace",fontSize:10,lineHeight:1.7,margin:"3px 0"}}>
        {parts.map((p,j)=>j%2===1?<strong key={j} style={{color:"#fff"}}>{p}</strong>:p)}
      </p>
    );
  });
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function HVACApp() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showDiagram, setShowDiagram] = useState(true);
  const [view, setView] = useState("learn");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [progress, setProgress] = useState({});
  const contentRef = useRef();

  const mod = modules[activeModule];
  const chapter = mod.chapters[activeChapter];
  const Diagram = DIAGRAMS[mod.id];
  const totalChapters = modules.reduce((s,m)=>s+m.chapters.length,0);
  const doneCount = Object.keys(progress).length;
  const pct = Math.round((doneCount/totalChapters)*100);
  const c = rgb(mod.color);

  useEffect(()=>{ setActiveChapter(0); setView("learn"); setQuizAnswers({}); contentRef.current?.scrollTo(0,0); },[activeModule]);
  useEffect(()=>{ setView("learn"); setQuizAnswers({}); contentRef.current?.scrollTo(0,0); },[activeChapter]);

  const markDone = () => setProgress(p=>({...p,[`${mod.id}-${chapter.id}`]:true}));

  const handleQuiz = (qi,ci) => {
    if (quizAnswers[qi]!==undefined) return;
    setQuizAnswers(a=>({...a,[qi]:ci}));
    if (ci===chapter.quiz[qi].answer) markDone();
  };

  const allDone = chapter.quiz && Object.keys(quizAnswers).length===chapter.quiz.length;
  const score = chapter.quiz ? chapter.quiz.filter((q,i)=>quizAnswers[i]===q.answer).length : 0;

  const goNext = () => {
    if (activeChapter<mod.chapters.length-1) setActiveChapter(c=>c+1);
    else if (activeModule<modules.length-1) setActiveModule(m=>m+1);
  };
  const goPrev = () => {
    if (activeChapter>0) setActiveChapter(c=>c-1);
    else if (activeModule>0) {
      const pm = modules[activeModule-1];
      setActiveModule(m=>m-1);
      setTimeout(()=>setActiveChapter(pm.chapters.length-1),0);
    }
  };

  const isFirst = activeModule===0 && activeChapter===0;
  const isLast = activeModule===modules.length-1 && activeChapter===mod.chapters.length-1;

  return (
    <div style={{minHeight:"100vh",background:"#050508",color:"#fff",fontFamily:"'Courier New',monospace",display:"flex",flexDirection:"column"}}>

      {/* Header */}
      <div style={{background:"#08080f",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:7,background:`linear-gradient(135deg,${mod.color},#003366)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏗️</div>
          <div>
            <div style={{fontSize:11,fontWeight:"bold",letterSpacing:2}}>TECHNICIEN CVC</div>
            <div style={{fontSize:8,color:"#444",letterSpacing:1}}>FORMATION PROFESSIONNELLE CERTIFIÉE</div>
          </div>
        </div>
        <div style={{flex:1,maxWidth:280,margin:"0 40px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:8,color:"#444"}}>PROGRESSION GLOBALE</span>
            <span style={{fontSize:8,color:mod.color}}>{pct}% — {doneCount}/{totalChapters} chapitres</span>
          </div>
          <div style={{height:3,background:"#1a1a2e",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:mod.color,borderRadius:2,transition:"width 0.5s"}}/>
          </div>
        </div>
        <div style={{fontSize:8,color:"#2a2a2a"}}>NF EN 378 • ASHRAE TC9.9 • EN 50600</div>
      </div>

      <div style={{display:"flex",flex:1}}>

        {/* Sidebar */}
        <div style={{width:252,background:"#07070d",borderRight:"1px solid rgba(255,255,255,0.05)",overflow:"auto",flexShrink:0}}>
          <div style={{fontSize:8,color:"#3a3a3a",padding:"14px 16px 6px",letterSpacing:2}}>MODULES</div>
          {modules.map((m,i)=>(
            <div key={m.id} onClick={()=>setActiveModule(i)} style={{padding:"8px 16px",cursor:"pointer",borderLeft:`3px solid ${activeModule===i?m.color:"transparent"}`,background:activeModule===i?`rgba(${rgb(m.color)},0.07)`:"transparent",display:"flex",alignItems:"center",gap:10,transition:"all 0.2s"}}>
              <span style={{fontSize:14}}>{m.icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:"bold",color:activeModule===i?m.color:"#666"}}>{m.title}</div>
                <div style={{fontSize:8,color:"#3a3a3a",marginTop:1}}>{m.subtitle}</div>
              </div>
            </div>
          ))}
          <div style={{fontSize:8,color:"#3a3a3a",padding:"14px 16px 6px",letterSpacing:2,borderTop:"1px solid rgba(255,255,255,0.04)",marginTop:6}}>CHAPITRES</div>
          {mod.chapters.map((ch,i)=>{
            const done = progress[`${mod.id}-${ch.id}`];
            return (
              <div key={ch.id} onClick={()=>setActiveChapter(i)} style={{padding:"7px 16px",cursor:"pointer",background:activeChapter===i?"rgba(255,255,255,0.04)":"transparent",display:"flex",alignItems:"center",gap:8,transition:"background 0.2s"}}>
                <div style={{width:14,height:14,borderRadius:"50%",background:done?mod.color:"transparent",border:`1px solid ${done?mod.color:"#2a2a2a"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:done?"#000":"#444",flexShrink:0}}>{done?"✓":i+1}</div>
                <span style={{fontSize:9,color:activeChapter===i?"#ccc":"#555",lineHeight:1.3}}>{ch.title}</span>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div ref={contentRef} style={{flex:1,overflow:"auto",background:"#06060e"}}>

          {/* Banner */}
          <div style={{background:mod.gradient,padding:"18px 30px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <span style={{fontSize:24}}>{mod.icon}</span>
              <div>
                <div style={{fontSize:17,fontWeight:"bold"}}>{mod.title}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{mod.subtitle}</div>
              </div>
            </div>
            <div style={{display:"inline-block",background:"rgba(0,0,0,0.4)",border:`1px solid ${mod.color}`,borderRadius:20,padding:"3px 12px",fontSize:9,color:mod.color,letterSpacing:1}}>📖 {chapter.title}</div>
          </div>

          {/* Tabs */}
          <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",background:"#08080f"}}>
            {[["learn","📘 COURS"],["quiz",`🧠 QUIZ (${chapter.quiz?.length||0} questions)`]].map(([v,lbl])=>(
              <button key={v} onClick={()=>setView(v)} style={{padding:"9px 22px",background:view===v?`rgba(${c},0.1)`:"transparent",border:"none",borderBottom:view===v?`2px solid ${mod.color}`:"2px solid transparent",color:view===v?mod.color:"#555",cursor:"pointer",fontSize:9,fontFamily:"monospace",letterSpacing:1,transition:"all 0.2s"}}>{lbl}</button>
            ))}
          </div>

          <div style={{padding:"22px 30px",maxWidth:860,margin:"0 auto"}}>
            {view==="learn" && (
              <>
                {Diagram && (
                  <div style={{marginBottom:22}}>
                    <div onClick={()=>setShowDiagram(d=>!d)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",marginBottom:10,color:mod.color,fontSize:9,letterSpacing:1}}>
                      {showDiagram?"▼":"▶"} SCHÉMA TECHNIQUE <span style={{color:"#333",fontSize:8}}>(cliquer pour basculer)</span>
                    </div>
                    {showDiagram && (
                      <div style={{background:"#090912",border:`1px solid rgba(${c},0.18)`,borderRadius:10,padding:14,overflow:"hidden"}}>
                        <Diagram/>
                      </div>
                    )}
                  </div>
                )}

                <div style={{background:"#0a0a14",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,padding:20,marginBottom:18}}>
                  <div style={{fontSize:9,color:mod.color,letterSpacing:1,marginBottom:14}}>📖 COURS THÉORIQUE</div>
                  {parseContent(chapter.content, mod.color)}
                </div>

                <div style={{background:`rgba(${c},0.05)`,border:`1px solid rgba(${c},0.2)`,borderRadius:10,padding:16,marginBottom:20}}>
                  <div style={{fontSize:9,color:mod.color,letterSpacing:1,marginBottom:12}}>⭐ POINTS CLÉS À RETENIR</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                    {chapter.keyPoints.map((kp,i)=>(
                      <div key={i} style={{background:"rgba(0,0,0,0.3)",borderRadius:6,padding:"7px 11px",fontSize:9,color:"#ccc",fontFamily:"monospace",display:"flex",alignItems:"flex-start",gap:8}}>
                        <span style={{color:mod.color,flexShrink:0}}>▸</span>{kp}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <button onClick={goPrev} disabled={isFirst} style={{padding:"8px 18px",background:"transparent",border:"1px solid #2a2a3a",borderRadius:6,color:isFirst?"#333":"#777",cursor:isFirst?"not-allowed":"pointer",fontFamily:"monospace",fontSize:9}}>← Précédent</button>
                  <button onClick={()=>setView("quiz")} style={{padding:"8px 20px",background:mod.color,border:"none",borderRadius:6,color:"#000",cursor:"pointer",fontFamily:"monospace",fontSize:9,fontWeight:"bold",letterSpacing:1}}>PASSER LE QUIZ →</button>
                </div>
              </>
            )}

            {view==="quiz" && (
              <>
                <div style={{background:"#0a0a14",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,padding:20,marginBottom:16}}>
                  <div style={{fontSize:9,color:mod.color,letterSpacing:1,marginBottom:4}}>🧠 ÉVALUATION DES CONNAISSANCES</div>
                  <div style={{fontSize:8,color:"#444",marginBottom:20}}>{chapter.title} — {chapter.quiz.length} question{chapter.quiz.length>1?"s":""}</div>

                  {chapter.quiz.map((q,qi)=>{
                    const answered = quizAnswers[qi]!==undefined;
                    const correct = quizAnswers[qi]===q.answer;
                    return (
                      <div key={qi} style={{marginBottom:22,padding:16,background:answered?(correct?"rgba(0,255,136,0.05)":"rgba(255,60,60,0.05)"):"rgba(255,255,255,0.02)",border:`1px solid ${answered?(correct?"#00ff88":"#ff4444"):"rgba(255,255,255,0.05)"}`,borderRadius:8}}>
                        <div style={{fontSize:11,color:"#eee",marginBottom:14,lineHeight:1.55}}>
                          <span style={{color:mod.color,marginRight:8,fontSize:10}}>Q{qi+1}.</span>{q.q}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:7}}>
                          {q.choices.map((ch,ci)=>{
                            const isSel = quizAnswers[qi]===ci;
                            const isAns = ci===q.answer;
                            let bc="#1a1a2e",bg="rgba(255,255,255,0.02)",tc="#888";
                            if (answered) {
                              if (isAns) {bc="#00ff88";bg="rgba(0,255,136,0.09)";tc="#00ff88";}
                              else if (isSel) {bc="#ff4444";bg="rgba(255,60,60,0.09)";tc="#ff4444";}
                            }
                            return (
                              <div key={ci} onClick={()=>handleQuiz(qi,ci)} style={{padding:"9px 14px",background:bg,border:`1px solid ${bc}`,borderRadius:6,cursor:answered?"default":"pointer",color:tc,fontSize:10,fontFamily:"monospace",display:"flex",alignItems:"center",gap:10,transition:"all 0.2s"}}>
                                <span style={{width:17,height:17,borderRadius:4,background:answered&&isAns?"#00ff88":answered&&isSel?"#ff4444":"#0a0a14",border:`1px solid ${bc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff",flexShrink:0}}>
                                  {answered?(isAns?"✓":isSel?"✗":""):String.fromCharCode(65+ci)}
                                </span>
                                {ch}
                              </div>
                            );
                          })}
                        </div>
                        {answered && (
                          <div style={{marginTop:12,padding:"9px 14px",background:"rgba(0,0,0,0.3)",borderRadius:6,fontSize:9,color:"#bbb",lineHeight:1.6,borderLeft:`3px solid ${correct?"#00ff88":"#ff4444"}`}}>
                            <span style={{color:correct?"#00ff88":"#ff4444",marginRight:6}}>{correct?"✅ CORRECT !":"❌ INCORRECT"}</span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {allDone && (
                    <div style={{padding:18,background:score===chapter.quiz.length?"rgba(0,255,136,0.07)":"rgba(255,204,0,0.07)",border:`1px solid ${score===chapter.quiz.length?"#00ff88":"#ffcc00"}`,borderRadius:8,textAlign:"center"}}>
                      <div style={{fontSize:20,marginBottom:8}}>{score===chapter.quiz.length?"🏆":"📚"}</div>
                      <div style={{fontSize:15,color:score===chapter.quiz.length?"#00ff88":"#ffcc00",marginBottom:4}}>Score : {score}/{chapter.quiz.length}</div>
                      <div style={{fontSize:9,color:"#777",marginBottom:14}}>{score===chapter.quiz.length?"Excellent ! Chapitre validé.":"Révisez le cours pour consolider vos connaissances."}</div>
                      {!isLast && (
                        <button onClick={goNext} style={{padding:"8px 20px",background:mod.color,border:"none",borderRadius:6,color:"#000",cursor:"pointer",fontFamily:"monospace",fontSize:9,fontWeight:"bold"}}>
                          {activeChapter<mod.chapters.length-1?"CHAPITRE SUIVANT →":"MODULE SUIVANT →"}
                        </button>
                      )}
                      {isLast && <div style={{color:"#00ff88",fontSize:12,fontWeight:"bold"}}>🎓 FORMATION TERMINÉE !</div>}
                    </div>
                  )}
                </div>
                <button onClick={()=>setView("learn")} style={{background:"transparent",border:"1px solid #2a2a3a",borderRadius:6,color:"#666",cursor:"pointer",padding:"7px 16px",fontFamily:"monospace",fontSize:9}}>← Retour au cours</button>
              </>
            )}
          </div>

          <div style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:"9px 30px",display:"flex",justifyContent:"space-between",background:"#06060e"}}>
            <span style={{fontSize:8,color:"#1e1e1e",letterSpacing:1}}>ASHRAE TC9.9 • EN 1886 • EN 50600 • DÉCRET 2015-1334 • NF EN 378 • EN 779</span>
            <span style={{fontSize:8,color:"#1e1e1e"}}>Formation Technicien CVC — Niveau II/III</span>
          </div>
        </div>
      </div>
    </div>
  );
}
