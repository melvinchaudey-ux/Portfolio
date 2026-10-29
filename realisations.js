/*
 * Source unique des réalisations affichées dans le portfolio.
 * Le tableau E5, les cartes et les fiches détaillées sont générés à partir de ces données :
 * modifier une réalisation ici met à jour toutes les vues (aucune incohérence possible).
 *
 * Champs d'une réalisation :
 *   title / titleEm   intitulé (titleEm = partie affichée en rouge)
 *   track             'formation' | 'entreprise'
 *   group             groupe du tableau de synthèse (voir E5_GROUPS)
 *   period            période affichée (format du tableau : JJ/MM/AA au JJ/MM/AA)
 *   place             lieu de réalisation
 *   competences       clés de E5_COMPETENCES cochées dans le tableau de synthèse
 *   inTable           false = réalisation présente dans le portfolio mais pas dans le tableau
 *   summary, context, why, steps, learned, details   textes de la fiche (vides = bloc masqué)
 *   tags              environnement technique
 *   proofs            [{label, href}] documents et productions associés (preuves pour le jury)
 *   link              dépôt ou démonstration
 */

const E5_COMPETENCES = [
  {key: 'patrimoine', short: 'Patrimoine', name: 'Gérer le patrimoine informatique', items: ['Recenser et identifier les ressources numériques', 'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique', 'Mettre en place et vérifier les niveaux d’habilitation associés à un service', 'Vérifier les conditions de la continuité d’un service informatique', 'Gérer des sauvegardes', 'Vérifier le respect des règles d’utilisation des ressources numériques']},
  {key: 'incidents', short: 'Incidents & demandes', name: 'Répondre aux incidents et aux demandes d’assistance et d’évolution', items: ['Collecter, suivre et orienter des demandes', 'Traiter des demandes concernant les services réseau et système, applicatifs', 'Traiter des demandes concernant les applications']},
  {key: 'presence', short: 'Présence en ligne', name: 'Développer la présence en ligne de l’organisation', items: ['Participer à la valorisation de l’image de l’organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques', 'Référencer les services en ligne de l’organisation et mesurer leur visibilité', 'Participer à l’évolution d’un site Web exploitant les données de l’organisation']},
  {key: 'projet', short: 'Mode projet', name: 'Travailler en mode projet', items: ['Analyser les objectifs et les modalités d’organisation d’un projet', 'Planifier les activités', 'Évaluer les indicateurs de suivi d’un projet et analyser les écarts']},
  {key: 'service', short: 'Mise à disposition', name: 'Mettre à disposition des utilisateurs un service informatique', items: ['Réaliser les tests d’intégration et d’acceptation d’un service', 'Déployer un service', 'Accompagner les utilisateurs dans la mise en place d’un service']},
  {key: 'devpro', short: 'Développement pro.', name: 'Organiser son développement professionnel', items: ['Mettre en place son environnement d’apprentissage personnel', 'Mettre en œuvre des outils et stratégies de veille informationnelle', 'Gérer son identité professionnelle', 'Développer son projet professionnel']}
];

const E5_GROUPS = [
  {key: 'formation', label: 'Réalisations en cours de formation'},
  {key: 'pro1', label: 'Réalisations en milieu professionnel — 1ère année · Sharp DX'},
  {key: 'pro2', label: 'Réalisations en milieu professionnel — 2nde année · Sharp DX'}
];

const REALISATIONS = [
  {
    id: 'config-pc', title: 'Configuration', titleEm: 'd’ordinateurs', track: 'formation', group: 'formation',
    period: '20/09/25', place: 'Ingetis · BTS SIO 1ère année', competences: ['incidents'],
    summary: 'Préparation et configuration de postes de travail Windows pour les rendre opérationnels pour les utilisateurs.',
    context: 'Réalisation menée en formation, en lien avec les activités de montage, de préparation et de maintenance de postes que j’exerce également en alternance.',
    tags: ['Windows 10 / 11', 'BIOS / UEFI', 'Rufus / clé bootable', 'Pilotes', 'Windows Update']
  },
  {
    id: 'debug-site', title: 'Débogage', titleEm: 'd’un site HTML/CSS', track: 'formation', group: 'formation',
    period: '20/11/25', place: 'Ingetis · BTS SIO 1ère année', competences: ['presence'],
    summary: 'Recherche et correction d’erreurs dans le code HTML et CSS d’un site internet.',
    context: 'Réalisation menée en formation autour de la maintenance d’un site web, support de la présence en ligne d’une organisation.',
    tags: ['HTML5', 'CSS3']
  },
  {
    id: 'portfolio', title: 'Portfolio', titleEm: '2026', track: 'formation', group: 'formation',
    period: '03/03/26', place: 'BTS SIO 1ère année · projet personnel', competences: ['presence', 'devpro'],
    summary: 'Conception, développement et publication de mon portfolio pour présenter mon profil, mon alternance et mes réalisations BTS SIO.',
    context: 'Portfolio personnel destiné à présenter mon profil de BTS SIO SISR, mes compétences, mon parcours et mes réalisations au jury et aux recruteurs.',
    why: 'Créer une présence professionnelle en ligne qui montre mes compétences autrement qu’avec un simple CV, et centraliser les preuves de mes réalisations.',
    learned: 'Structuration HTML, responsive design, JavaScript, animations, gestion de contenu, publication avec GitHub et automatisation avec GitHub Actions.',
    steps: 'Définir l’arborescence → direction artistique → intégration → interactions → tests responsive → publication → automatisation (CV PDF et veille).',
    details: 'Interface responsive orientée recrutement, navigation par sections et fiches de réalisations interactives. Le dépôt GitHub intègre un workflow GitHub Actions qui régénère automatiquement le CV au format PDF à partir du fichier Word (LibreOffice en mode headless) et met à jour chaque jour la veille technologique à partir de flux RSS (script Python).',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI / UX', 'GitHub', 'GitHub Actions', 'Python'],
    link: 'https://github.com/melvinchaudey-ux/Portfolio'
  },
  {
    id: 'club', title: 'Club', titleEm: 'lecture', track: 'formation', group: 'formation',
    period: '15/05/26', place: 'Ingetis · BTS SIO 1ère année', competences: ['projet'],
    summary: 'Application web PHP/MySQL réalisée dans le cadre de ma formation pour référencer et gérer les lectures d’un club.',
    context: 'Application destinée à centraliser les lectures d’un club : catalogue, suivi des lectures, avis, sessions et gestion des membres.',
    why: 'Proposer une interface simple pour organiser une bibliothèque et suivre l’activité des lecteurs dans une seule application.',
    learned: 'Architecture MVC, requêtes préparées PDO, authentification et rôles, formulaires, sécurité CSRF, validation des uploads et modélisation SQL.',
    steps: 'Conception de la base → modèles / contrôleurs / vues → authentification → catalogue → avis et progression → tests et corrections.',
    details: 'Le projet comprend un espace d’authentification, un tableau de bord, un catalogue de livres et leur fiche détaillée. Les livres sont stockés dans une base MySQL avec titre, auteur, description, couverture et dates de lecture. J’ai également intégré la gestion des avis et notes, le suivi de progression, les sessions de lecture et l’accès à des documents PDF. Plusieurs rôles sont gérés : administrateur, modérateur et membre, avec des contrôles CSRF, des requêtes préparées PDO et une validation des uploads.',
    tags: ['PHP 8', 'MySQL / PDO', 'HTML5 / CSS3', 'JavaScript', 'MVC', 'SQL'],
    visual: 'club',
    link: 'https://github.com/melvinchaudey-ux/club-lecture-'
  },
  {
    id: 'jira-formation', title: 'Création et gestion', titleEm: 'de tickets Jira', track: 'formation', group: 'formation',
    period: '02/10/26', place: 'Ynov Campus · BTS SIO 2ème année', competences: ['incidents'],
    summary: 'Création et suivi de tickets d’incidents et de demandes dans Jira.',
    context: 'Réalisation menée en formation sur la gestion des demandes d’assistance, en complément de l’utilisation quotidienne de Jira en alternance.',
    tags: ['Jira Service Management', 'Gestion de tickets', 'ITSM']
  },
  {
    id: 'jira-pro', title: 'Gestion de tickets', titleEm: 'sur Jira', track: 'entreprise', group: 'pro1',
    period: '1ère année d’alternance', place: 'Sharp DX · Chargé des systèmes d’information', competences: ['incidents'],
    summary: 'Suivi et traitement des tickets d’incidents et de demandes des collaborateurs via Jira.',
    context: 'En alternance chez Sharp DX, je gère le volet IT de l’entreprise. Les demandes et incidents des utilisateurs sont centralisés dans Jira, ce qui permet de les suivre et de les traiter jusqu’à leur résolution.',
    details: 'Suivi et traitement des tickets d’incidents et de demandes via Jira, support technique et accompagnement des utilisateurs.',
    tags: ['Jira', 'Support utilisateurs', 'Diagnostic poste']
  },
  {
    id: 'stock', title: 'Gestion', titleEm: 'de stock', track: 'entreprise', group: 'pro1',
    period: '1ère année d’alternance', place: 'Sharp DX · Chargé des systèmes d’information', competences: ['patrimoine', 'service'],
    summary: 'Gestion du stock de matériel informatique et du parc de l’entreprise.',
    context: 'Dans le cadre de la gestion du volet IT de Sharp DX : parc informatique, stock et matériel, préparation des postes mis à disposition des collaborateurs.',
    details: 'Gestion du parc informatique, du stock et du matériel ; montage, configuration et maintenance des postes de travail.',
    tags: ['Gestion de parc', 'Gestion de stock IT', 'Préparation de PC']
  },
  {
    id: 'tenant', title: 'Migration', titleEm: 'd’un tenant', track: 'entreprise', group: 'pro1',
    period: '1ère année d’alternance', place: 'Sharp DX · Chargé des systèmes d’information', competences: ['patrimoine'],
    summary: 'Migration d’un tenant vers un autre, réalisée en entreprise chez Sharp DX.',
    context: 'Réalisation menée chez Sharp DX, où j’interviens sur l’administration et la gestion des services Microsoft Azure.',
    tags: ['Microsoft Azure', 'Microsoft 365']
  },
  {
    id: 'network', title: 'Infrastructure', titleEm: 'réseau', track: 'formation', group: null, inTable: false,
    period: '', place: 'BTS SIO SISR · travaux pratiques', competences: [],
    summary: 'Projet pratique autour de la conception et de la configuration d’une infrastructure réseau.',
    context: 'Mise en situation de conception et de configuration d’une infrastructure réseau dans le cadre de la formation SISR.',
    why: 'Mettre en pratique l’adressage, le routage et les services réseau avant de les retrouver sur des environnements plus complexes.',
    learned: 'Adressage IPv4, calcul de sous-réseaux, routage, DHCP, DNS, logique client/serveur et lecture d’une topologie réseau.',
    steps: 'Définir les besoins → construire la topologie → adresser les réseaux → configurer les équipements → mettre en place les services → tester.',
    details: 'Mise en pratique des notions vues en BTS SIO SISR autour de l’adressage, du routage et des services réseau afin de construire une architecture cohérente.',
    tags: ['Réseau', 'Adressage IP', 'Routage', 'DHCP', 'DNS', 'Packet Tracer']
  }
];
