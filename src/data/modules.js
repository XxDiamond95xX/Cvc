export const modules = [
  {
    id: 'circuit-frigo',
    icon: '❄️',
    title: 'Circuit Frigorifique',
    subtitle: 'Cycle de réfrigération par compression',
    color: '#38bdf8',
    chapters: [
      {
        id: 'thermodynamique',
        title: 'Thermodynamique de base',
        summary: 'Comprendre le cycle frigorifique, le COP et les 4 transformations.',
        diagram: {
          title: 'Cycle frigorifique',
          stats: ['COP réel : 2,5 à 4,5', 'T° évap. : -10°C à +15°C', 'T° cond. : +30°C à +55°C'],
          steps: ['1. Compression', '2. Condensation', '3. Détente', '4. Évaporation'],
        },
        sections: [
          {
            title: 'Le cycle frigorifique à compression de vapeur',
            paragraphs: [
              'Principe fondamental des systèmes de climatisation et de réfrigération modernes.',
              'Le fluide frigorigène change d’état pour transférer l’énergie entre le milieu à refroidir et le milieu extérieur.',
            ],
          },
          {
            title: 'Principe de Carnot',
            formulas: ['COP = Qf / W'],
            bullets: [
              'Le COP de Carnot fixe une limite théorique maximale.',
              'Dans la pratique, le COP réel reste toujours inférieur.',
            ],
          },
          {
            title: 'Les 4 transformations du cycle',
            steps: [
              'Compression adiabatique : pression et température augmentent.',
              'Condensation isobare : le fluide cède sa chaleur et devient liquide.',
              'Détente : chute de pression et de température à travers le détendeur.',
              'Évaporation isobare : le fluide absorbe la chaleur du local et se vaporise.',
            ],
          },
        ],
        keyPoints: [
          'COP typique : 2,5 à 4,5',
          'Fluides courants : R410A, R32, R134a, R1234yf',
          'Évaporation : -10°C à +15°C',
          'Condensation : +30°C à +55°C',
        ],
        quiz: [
          {
            q: 'Dans quel composant le fluide frigorigène absorbe-t-il la chaleur du milieu à refroidir ?',
            choices: ['Le compresseur', 'L’évaporateur', 'Le condenseur', 'Le détendeur'],
            answer: 1,
            explanation: 'L’évaporateur est l’échangeur côté froid. Le fluide y absorbe la chaleur en s’évaporant à basse pression.',
          },
          {
            q: 'Que représente le COP d’une installation frigorifique ?',
            choices: [
              'La puissance consommée',
              'Le rapport puissance frigorifique / puissance absorbée',
              'Le débit massique du fluide',
              'La température de condensation',
            ],
            answer: 1,
            explanation: 'COP = Qf / W. Plus il est élevé, plus le système est performant.',
          },
        ],
      },
      {
        id: 'composants',
        title: 'Les 4 composants principaux',
        summary: 'Compresseur, condenseur, détendeur et évaporateur.',
        diagram: {
          title: 'Chaîne fonctionnelle',
          stats: ['Surchauffe : 5 à 10 K', 'Sous-refroidissement : 5 à 8 K', 'T° refoulement max : 120°C'],
          steps: ['Compresseur', 'Condenseur', 'Détendeur', 'Évaporateur'],
        },
        sections: [
          {
            title: 'Le compresseur',
            bullets: [
              'Scroll : efficace et silencieux pour climatisation < 100 kW.',
              'Vis : 50 à 1000 kW, très courant en industrie.',
              'Piston : robuste et polyvalent.',
              'Centrifuge : très grandes puissances.',
            ],
            formulas: ['Pabs = m × (h2−h1) / ηmec'],
          },
          {
            title: 'Le condenseur',
            paragraphs: ['Échangeur haute pression où le fluide cède sa chaleur. Sous-refroidissement optimal : 5 à 8 K.'],
          },
          {
            title: 'Le détendeur et l’évaporateur',
            bullets: [
              'TXV : régulation par surchauffe.',
              'EEV : très précis, idéal avec inverter.',
              'Surchauffe typique en aspiration : 5 à 10 K pour protéger le compresseur.',
            ],
          },
        ],
        keyPoints: [
          'Surchauffe aspirée : 5 à 10 K',
          'Sous-refroidissement : 5 à 8 K',
          'Rapport de compression conseillé : 4 à 8',
          'Risque majeur : retour liquide',
        ],
        quiz: [
          {
            q: 'Pourquoi maintient-on une surchauffe de 5 à 10 K à l’aspiration du compresseur ?',
            choices: [
              'Pour augmenter le COP',
              'Pour éviter l’entrée de liquide dans le compresseur',
              'Pour augmenter la température ambiante',
              'Pour diminuer le débit massique',
            ],
            answer: 1,
            explanation: 'Le liquide est incompressible. La surchauffe garantit que seule la vapeur entre dans le compresseur.',
          },
        ],
      },
    ],
  },
  {
    id: 'crac',
    icon: '🖥️',
    title: 'CRAC',
    subtitle: 'Computer Room Air Conditioning',
    color: '#fb923c',
    chapters: [
      {
        id: 'crac-intro',
        title: 'Principe et architecture CRAC',
        summary: 'Climatisation de précision pour salles serveurs.',
        diagram: {
          title: 'Architecture type CRAC',
          stats: ['Puissance : 10 à 60 kW', 'T° : ±0,5 à ±1°C', 'HR : 40 à 60 %'],
          steps: ['Batterie DX', 'Batterie chaude', 'Humidificateur', 'Ventilateurs EC', 'Filtres'],
        },
        sections: [
          {
            title: 'Le CRAC',
            paragraphs: [
              'Le CRAC est une climatisation de précision dédiée aux salles informatiques et datacenters.',
              'Il régule très finement température, humidité et filtration.',
            ],
            formulas: ['Régulation : ±0,5 à ±1°C', 'Disponibilité visée : 99,999 %'],
          },
          {
            title: 'Éléments principaux',
            bullets: [
              'Batterie froide DX : évaporateur du circuit frigorifique interne.',
              'Batterie chaude : électrique ou hydraulique.',
              'Humidificateur : électrodes ou résistances.',
              'Ventilateurs EC : vitesse variable 0 à 100 %.',
              'Filtres G4 + F7 avec ΔP surveillé.',
            ],
          },
          {
            title: 'Références',
            bullets: [
              'ASHRAE TC 9.9 : classes A1 à A4 pour les serveurs.',
              'EN 1886 : performance des CTA.',
              'EN 50600 : infrastructure physique des datacenters.',
            ],
          },
        ],
        keyPoints: ['COP CRAC : 2,0 à 3,5', 'ASHRAE A1 : 15-32°C', 'HR recommandée : 40-60 %', 'PUE cible < 1,4'],
        quiz: [
          {
            q: 'Quelle plage d’humidité relative est recommandée pour une salle serveur ?',
            choices: ['10-30 %', '40-60 %', '70-90 %', '20-40 %'],
            answer: 1,
            explanation: '40 à 60 % limite le risque d’électricité statique et de condensation.',
          },
        ],
      },
      {
        id: 'crac-maintenance',
        title: 'Maintenance préventive CRAC',
        summary: 'Contrôles périodiques N1 à N3.',
        diagram: {
          title: 'Plan de maintenance',
          stats: ['Mensuel : N1', 'Trimestriel : N2', 'Annuel : N3 + attestation'],
          steps: ['Fuites', 'Filtres', 'Paramètres', 'Circuit frigo', 'Bilan énergétique'],
        },
        sections: [
          {
            title: 'Contrôles mensuels',
            bullets: [
              'Recherche visuelle de fuites et contrôle détecteur.',
              'Encrassement filtres et mesure ΔP.',
              'Lecture T° soufflage/retour, HR, alarmes.',
            ],
          },
          {
            title: 'Contrôles trimestriels et semestriels',
            bullets: [
              'Mesures électriques compresseur et ventilateurs.',
              'Contrôle humidificateur et tartre.',
              'HP/BP, surchauffe, sous-refroidissement.',
              'Mesure d’isolement au mégohmmètre 500 V.',
            ],
            formulas: ['Surchauffe = Tasp − Tsat(BP)', 'Sous-refroidissement = Tsat(HP) − Tliq'],
          },
          {
            title: 'Contrôles annuels',
            bullets: [
              'Recherche de fuite réglementaire.',
              'Remplacement filtre dessiccateur si nécessaire.',
              'Comparaison COP réel / nominal.',
            ],
          },
        ],
        keyPoints: [
          'Attestation de capacité obligatoire',
          'Seuil de fuite réglementaire : 5 % de charge/an max',
          'Filtre bouché = hausse conso ventilateur',
          'Étalo sondes T°/HR indispensable',
        ],
        quiz: [
          {
            q: 'Quelle mesure permet de vérifier l’isolation d’un moteur de compresseur ?',
            choices: ['Voltmètre phase-neutre', 'Clamp-mètre AC', 'Mégohmmètre 500 V', 'Testeur de continuité'],
            answer: 2,
            explanation: 'Le mégohmmètre mesure l’isolement entre bobinage et masse. Une valeur > 1 MΩ est attendue.',
          },
        ],
      },
    ],
  },
  {
    id: 'crah',
    icon: '🌀',
    title: 'CRAH',
    subtitle: 'Computer Room Air Handler',
    color: '#22c55e',
    chapters: [
      {
        id: 'crah-principe',
        title: 'Architecture et fonctionnement CRAH',
        summary: 'Refroidissement par eau glacée et chiller centralisé.',
        diagram: {
          title: 'Architecture CRAH',
          stats: ['Eau glacée : 6/12°C', 'ΔT standard : 6 K', 'Ventilateurs EC : η > 90 %'],
          steps: ['Chiller', 'Nourrice aller', 'Vanne 2 voies', 'Batterie eau glacée', 'Retour'],
        },
        sections: [
          {
            title: 'Différence CRAH vs CRAC',
            paragraphs: [
              'Le CRAH ne possède pas de circuit frigorifique intégré.',
              'Il utilise l’eau glacée produite par un groupe froid centralisé.',
            ],
            formulas: ['Débit (m³/h) = Puissance (kW) ÷ (1,163 × ΔT)'],
          },
          {
            title: 'Architecture',
            bullets: [
              'Batterie à eau glacée 6/12°C.',
              'Ventilateurs EC brushless.',
              'Automate embarqué et régulation vanne 2 voies.',
              'Pompes N+1 avec variation de vitesse.',
            ],
          },
          {
            title: 'Avantages',
            bullets: [
              'COP système jusqu’à 6 à 8 avec free-cooling.',
              'Maintenance centralisée.',
              'Bonne scalabilité en datacenter.',
            ],
          },
        ],
        keyPoints: ['Eau glacée : 6°C / 12°C', 'Débit = kW ÷ (1,163 × ΔT)', 'Free-cooling très avantageux', 'Maintenance centralisée'],
        quiz: [
          {
            q: 'Quel débit faut-il pour 120 kW avec une eau glacée 6/12°C ?',
            choices: ['8,6 m³/h', '17,2 m³/h', '34,4 m³/h', '5,2 m³/h'],
            answer: 1,
            explanation: '120 ÷ (1,163 × 6) ≈ 17,2 m³/h.',
          },
        ],
      },
    ],
  },
  {
    id: 'fanwall',
    icon: '🔄',
    title: 'Fanwall',
    subtitle: 'Mur de ventilateurs N+1',
    color: '#a855f7',
    chapters: [
      {
        id: 'fanwall-concept',
        title: 'Technologie Fanwall et redondance',
        summary: 'Redondance N+1 et loi cubique.',
        diagram: {
          title: 'Fanwall N+1',
          stats: ['Hot-swap', 'Monitoring individuel', 'Loi P ∝ n³'],
          steps: ['Matrice EC', 'Panne 1 fan', 'Compensation', 'Continuité de service'],
        },
        sections: [
          {
            title: 'Principe',
            paragraphs: [
              'Un fanwall remplace un grand ventilateur par une matrice de petits ventilateurs EC.',
              'Chaque ventilateur est pilotable et surveillé individuellement.',
            ],
          },
          {
            title: 'Redondance N+1',
            bullets: [
              'En cas de panne d’un ventilateur, les autres compensent.',
              'Remplacement possible sous tension.',
              'Répartition automatique des heures de fonctionnement.',
            ],
            formulas: ['Q ∝ n', 'ΔP ∝ n²', 'P ∝ n³'],
          },
          {
            title: 'Avantages',
            bullets: [
              'Zéro interruption de service.',
              'Très bon rendement à charge partielle.',
              'Bruit réduit et maintenance modulaire.',
            ],
          },
        ],
        keyPoints: ['-20 % vitesse = -49 % puissance', 'Hot-swap possible', 'Rendement EC > 85 %', 'Monitoring détaillé'],
        quiz: [
          {
            q: 'Un ventilateur consomme 2 kW à 800 rpm. Quelle puissance à 640 rpm ?',
            choices: ['1,6 kW', '1,024 kW', '1,28 kW', '1,8 kW'],
            answer: 1,
            explanation: 'Avec la loi cubique : 2 × (0,8)^3 = 1,024 kW.',
          },
        ],
      },
    ],
  },
  {
    id: 'cvc',
    icon: '🏭',
    title: 'CVC',
    subtitle: 'Chauffage Ventilation Climatisation',
    color: '#eab308',
    chapters: [
      {
        id: 'cta',
        title: 'Centrale de Traitement d’Air (CTA)',
        summary: 'Air neuf, récupération, batteries, humidification et ventilation.',
        diagram: {
          title: 'Chaîne CTA',
          stats: ['CO₂ cible < 1000 ppm', 'Récupération 60 à 85 %', 'Batterie froide : 6/12°C'],
          steps: ['Volet AN', 'Filtres', 'Récupération', 'Batterie froide', 'Batterie chaude', 'Ventilation'],
        },
        sections: [
          {
            title: 'Sections de la CTA',
            bullets: [
              'Volet air neuf motorisé et régulation CO₂.',
              'Filtres G4 puis F7/F9.',
              'Récupération par plaques, roue ou run-around coil.',
              'Batterie chaude et batterie froide.',
              'Humidification puis ventilation soufflage/extraction.',
            ],
          },
          {
            title: 'Régulation',
            bullets: [
              'PID température soufflage.',
              'PID humidité relative.',
              'DCV sur CO₂.',
              'Alarmes ΔP filtre, gel batterie, incendie.',
            ],
            formulas: ['Débit AN = N × 10 l/(s·pers) + S × 0,3 l/(s·m²)'],
          },
          {
            title: 'Points de conception',
            bullets: [
              'Roue hygroscopique : récupère chaleur sensible et latente.',
              'Humidification vapeur : hygiénique.',
              'Moteurs EC : haut rendement et moins de maintenance.',
            ],
          },
        ],
        keyPoints: ['Roue enthalpique = sensible + latente', 'CO₂ < 1000 ppm', 'Filtration fine F7/F9', 'DDC central'],
        quiz: [
          {
            q: 'Quelle technologie récupère la chaleur sensible ET latente ?',
            choices: ['Échangeur à plaques', 'Run-around coil', 'Roue hygroscopique', 'Free-cooling direct'],
            answer: 2,
            explanation: 'La roue hygroscopique transfère chaleur et humidité entre les flux d’air.',
          },
        ],
      },
    ],
  },
];

export const totalChapterCount = modules.reduce((count, module) => count + module.chapters.length, 0);
