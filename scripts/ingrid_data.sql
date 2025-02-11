--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid._prisma_migrations VALUES ('6f8cae26-0877-4b59-b2c5-a6a26aef01e7', '066280158a609145362a619a3c91c09f26130c9afbe7e658c2ce18fbde7110d9', '2024-12-12 12:10:06.15293+01', '0_init', '', NULL, '2024-12-12 12:10:06.15293+01', 0);


--
-- Data for Name: formation; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.formation VALUES (2, 'BUT Informatique 2', 'https://edt.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=4899&projectId=26&calType=ical&nbWeeks=40', NULL);
INSERT INTO ingrid.formation VALUES (3, 'BUT Informatique 3', 'https://edt.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1510&projectId=26&calType=ical&nbWeeks=40', NULL);
INSERT INTO ingrid.formation VALUES (1, 'BUT Informatique 1', 'https://edt.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=9299&projectId=26&calType=ical&nbWeeks=40', NULL);


--
-- Data for Name: groupe; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.groupe VALUES (1, 'TDA');
INSERT INTO ingrid.groupe VALUES (2, 'TDB');
INSERT INTO ingrid.groupe VALUES (3, 'TP Alpha');
INSERT INTO ingrid.groupe VALUES (4, 'TP Bêta');
INSERT INTO ingrid.groupe VALUES (5, 'TP Gamma');


--
-- Data for Name: module; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.module VALUES (1, 'SAE 1-01 : Implémentation d''un besoin client', NULL, '0,0,16');
INSERT INTO ingrid.module VALUES (2, 'R1.01 : Initiation au développement', NULL, '0,44,58');
INSERT INTO ingrid.module VALUES (3, 'R1.02 : Développement d''interfaces web', NULL, '0,5,18');
INSERT INTO ingrid.module VALUES (4, 'R1.10 : Anglais technique', NULL, '0,15,15');
INSERT INTO ingrid.module VALUES (5, 'SAE 2-01 : Développement d''une application', NULL, '0,0,24');
INSERT INTO ingrid.module VALUES (6, 'R2.01 : Développement orienté objets', NULL, '0,29,31');
INSERT INTO ingrid.module VALUES (7, 'R2.02 : Développement d''applications avec IHM', NULL, '0,16,26');
INSERT INTO ingrid.module VALUES (8, 'R2.03 : Qualité de développement', NULL, '0,4,20');
INSERT INTO ingrid.module VALUES (9, 'R2.13 : Communication avec le milieu professionnel', NULL, '0,13,17');
INSERT INTO ingrid.module VALUES (10, 'P2.01 : Portfolio', NULL, '0,0,10');
INSERT INTO ingrid.module VALUES (11, 'SAE 1-02 : Comparaison d''approches algorithmiques', NULL, '0,0,16');
INSERT INTO ingrid.module VALUES (12, 'R1.03 : Introduction à l''architecture des ordinateurs', NULL, '0,12,11');
INSERT INTO ingrid.module VALUES (13, 'R1.04 : Introduction aux systèmes d''exploitation et à leur fonctionnement', NULL, '0,5,22');
INSERT INTO ingrid.module VALUES (14, 'R1.06 : Mathématiques discrètes', NULL, '0,30,10');
INSERT INTO ingrid.module VALUES (15, 'R1.07 : Outils mathématiques fondamentaux', NULL, '0,14,10');
INSERT INTO ingrid.module VALUES (16, 'SAE 2-02 : Exploration algorithmique d''un problème', NULL, '0,0,21');
INSERT INTO ingrid.module VALUES (17, 'R2.04 : Communication et fonctionnement bas niveau', NULL, '0,16,14');
INSERT INTO ingrid.module VALUES (18, 'R2.07 : Graphes', NULL, '0,19,15');
INSERT INTO ingrid.module VALUES (20, 'SAE 1-03 : Installation d''un poste pour le développement', NULL, '0,0,24');
INSERT INTO ingrid.module VALUES (21, 'R1.11 : Bases de la communication', NULL, '0,15,15');
INSERT INTO ingrid.module VALUES (22, 'SAE 2-03 : Installation de services réseau', NULL, '0,0,25');
INSERT INTO ingrid.module VALUES (23, 'R2.05 : Introduction aux services réseaux', NULL, '0,9,11');
INSERT INTO ingrid.module VALUES (24, 'R2.12 : Anglais d''entreprise', NULL, '0,15,15');
INSERT INTO ingrid.module VALUES (25, 'SAE 1-04 : Création d''une base de données', NULL, '0,0,18');
INSERT INTO ingrid.module VALUES (26, 'R1.05 : Introduction aux bases de données et SQL', NULL, '0,23,27');
INSERT INTO ingrid.module VALUES (27, 'R1.09 : Économie durable et numérique', NULL, '0,18,7');
INSERT INTO ingrid.module VALUES (28, 'SAE 2-04 : Exploitation d''une base de données', NULL, '0,0,26');
INSERT INTO ingrid.module VALUES (29, 'R2.06 : Exploitation d''une base de données', NULL, '0,8,32');
INSERT INTO ingrid.module VALUES (30, 'R2.08 : Outils numériques pour les statistiques descriptives', NULL, '0,3,12');
INSERT INTO ingrid.module VALUES (31, 'R2.10 : Gestion de projet & des organisations', NULL, '0,26,19');
INSERT INTO ingrid.module VALUES (32, 'SAE 1-05 : Recueil de besoins', NULL, '0,0,18');
INSERT INTO ingrid.module VALUES (33, 'SAE 2-05 : Gestion d''un projet', NULL, '0,0,24');
INSERT INTO ingrid.module VALUES (34, 'SAE 1-06 : Découverte de l''environnement économique et écologique', NULL, '0,0,18');
INSERT INTO ingrid.module VALUES (35, 'R1.12 : Projet professionnel et personnel', NULL, '0,8,8');
INSERT INTO ingrid.module VALUES (36, 'SAE 2-06 : Organisation d''un travail d''équipe', NULL, '0,0,14');
INSERT INTO ingrid.module VALUES (37, 'R2.11 : Droit des contrats et du numérique', NULL, '0,20,0');
INSERT INTO ingrid.module VALUES (38, 'R2.14 : Projet professionnel et personnel : métiers de l''informatique', NULL, '0,8,12');
INSERT INTO ingrid.module VALUES (19, 'R2.09 : Méthodes numériques', NULL, '0,5,10');
INSERT INTO ingrid.module VALUES (39, 'R1.08 : Gestion de projet & des organisations', NULL, '0,21,14');


--
-- Data for Name: cours; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.cours VALUES (1, 'CM', 'Introduction à la programmation', '2025-01-08 09:00:00', '2025-01-08 11:00:00', 'B101', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 1, 1, NULL);
INSERT INTO ingrid.cours VALUES (2, 'TD', 'Algèbre linéaire', '2025-01-09 14:00:00', '2025-01-09 16:00:00', 'C202', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 5, 1, NULL);
INSERT INTO ingrid.cours VALUES (3, 'TP', 'Bases de données', '2025-01-10 08:00:00', '2025-01-10 10:00:00', 'A303', '2025-01-01 10:00:00', '2025-01-01 10:00:00', false, 'présentiel', 12, 1, NULL);
INSERT INTO ingrid.cours VALUES (4, 'CM', 'Mathématiques avancées', '2025-01-08 13:00:00', '2025-01-08 15:00:00', 'D404', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 7, 1, 1);
INSERT INTO ingrid.cours VALUES (5, 'TD', 'Programmation orientée objets', '2025-01-11 11:00:00', '2025-01-11 13:00:00', 'E505', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 8, 1, 2);
INSERT INTO ingrid.cours VALUES (6, 'TP', 'Développement web', '2025-01-12 10:00:00', '2025-01-12 12:00:00', 'F606', '2025-01-01 10:00:00', '2025-01-01 10:00:00', false, 'présentiel', 15, 1, 3);
INSERT INTO ingrid.cours VALUES (7, 'CM', 'Systèmes d''exploitation', '2025-01-13 08:00:00', '2025-01-13 10:00:00', 'G707', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 18, 1, NULL);
INSERT INTO ingrid.cours VALUES (8, 'TD', 'Réseaux informatiques', '2025-01-14 14:00:00', '2025-01-14 16:00:00', 'H808', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 22, 1, NULL);
INSERT INTO ingrid.cours VALUES (9, 'TP', 'Sécurité informatique', '2025-01-15 09:00:00', '2025-01-15 11:00:00', 'I909', '2025-01-01 10:00:00', '2025-01-01 10:00:00', false, 'présentiel', 30, 1, NULL);
INSERT INTO ingrid.cours VALUES (10, 'CM', 'Projet de fin d''études', '2025-01-16 10:00:00', '2025-01-16 12:00:00', 'J010', '2025-01-01 10:00:00', '2025-01-01 10:00:00', false, 'présentiel', 33, 1, 4);
INSERT INTO ingrid.cours VALUES (11, 'TD', 'Anglais technique', '2025-01-17 13:00:00', '2025-01-17 15:00:00', 'K111', '2025-01-01 10:00:00', '2025-01-01 10:00:00', true, 'présentiel', 39, 1, 5);
INSERT INTO ingrid.cours VALUES (12, 'CM', '', '2025-02-20 14:00:00', '2025-02-20 16:00:00', NULL, '2025-01-14 17:08:15.947216', '2025-01-14 17:08:15.947216', NULL, NULL, 23, 1, NULL);
INSERT INTO ingrid.cours VALUES (13, 'CM', '', '2025-02-18 14:00:00', '2025-02-18 16:00:00', NULL, '2025-01-14 17:08:15.947216', '2025-01-14 17:08:15.947216', NULL, NULL, 23, 1, NULL);


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.utilisateur VALUES (2, 'Herries', 'Karlik', 'kherries1@dion.ne.jp', NULL, NULL, false, 'indefinite', '2024-10-11 00:00:00', '2024-09-07 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (3, 'Sherwell', 'Frankie', 'fsherwell2@virginia.edu', NULL, NULL, false, 'student', '2024-11-09 00:00:00', '2024-08-11 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (4, 'Anstee', 'Gypsy', 'ganstee3@exblog.jp', NULL, NULL, true, 'director', '2024-02-27 00:00:00', '2024-07-24 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (5, 'Parkins', 'Giustino', 'gparkins4@pinterest.com', NULL, NULL, true, 'teacher', '2024-01-21 00:00:00', '2024-10-19 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (6, 'Gateley', 'Emalee', 'egateley5@addtoany.com', NULL, NULL, true, 'manager', '2024-02-26 00:00:00', '2024-04-27 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (7, 'Elms', 'Diann', 'delms6@cdc.gov', NULL, NULL, false, 'secretary', '2024-08-24 00:00:00', '2023-12-21 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (8, 'Brambell', 'Styrbjörn', 'sbrambell0@cmu.edu', NULL, NULL, true, 'student', '2024-09-11 00:00:00', '2024-02-06 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (9, 'Eagle', 'Tú', 'keagle1@nyu.edu', NULL, NULL, true, 'student', '2024-07-10 00:00:00', '2024-09-20 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (10, 'Bearblock', 'Clélia', 'nbearblock2@amazon.co.uk', NULL, NULL, true, 'student', '2024-07-16 00:00:00', '2024-11-12 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (11, 'Tyrer', 'Anaël', 'styrer3@nbcnews.com', NULL, NULL, false, 'student', '2024-07-09 00:00:00', '2024-01-20 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (12, 'Manby', 'Laurène', 'fmanby4@elegantthemes.com', NULL, NULL, false, 'student', '2024-05-26 00:00:00', '2024-11-28 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (13, 'Canter', 'Marie-ève', 'acanter5@scientificamerican.com', NULL, NULL, true, 'student', '2024-02-11 00:00:00', '2024-09-27 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (14, 'Mayworth', 'Märta', 'amayworth6@youtu.be', NULL, NULL, false, 'student', '2024-01-22 00:00:00', '2024-12-06 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (15, 'Wallett', 'Céline', 'wwallett7@microsoft.com', NULL, NULL, true, 'student', '2024-08-02 00:00:00', '2024-04-05 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (16, 'Bartkowiak', 'Gaétane', 'jbartkowiak8@istockphoto.com', NULL, NULL, true, 'student', '2024-03-25 00:00:00', '2024-11-27 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (17, 'Yeabsley', 'Pénélope', 'lyeabsley9@dell.com', NULL, NULL, false, 'student', '2024-06-05 00:00:00', '2024-06-07 00:00:00');
INSERT INTO ingrid.utilisateur VALUES (18, 'Dupont', 'Jean', 'jean.dupont@example.com', NULL, NULL, true, 'teacher', '2025-01-01 08:00:00', '2025-01-01 08:00:00');
INSERT INTO ingrid.utilisateur VALUES (1, 'Acaster', 'Ula', 'uacaster0@latimes.com', NULL, NULL, false, 'administrator', '2024-10-12 00:00:00', '2025-01-27 20:32:51.166');


--
-- Data for Name: etudiant; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.etudiant VALUES (3, '566296', false, false);
INSERT INTO ingrid.etudiant VALUES (8, '220625', false, false);
INSERT INTO ingrid.etudiant VALUES (9, '338454', true, false);
INSERT INTO ingrid.etudiant VALUES (10, '844013', false, true);
INSERT INTO ingrid.etudiant VALUES (11, '300426', true, false);
INSERT INTO ingrid.etudiant VALUES (12, '738858', false, false);
INSERT INTO ingrid.etudiant VALUES (13, '260746', false, false);
INSERT INTO ingrid.etudiant VALUES (14, '599049', true, false);
INSERT INTO ingrid.etudiant VALUES (15, '545287', false, false);
INSERT INTO ingrid.etudiant VALUES (16, '532519', false, false);
INSERT INTO ingrid.etudiant VALUES (17, '428081', false, false);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.notification VALUES (1, 'Absence', 'Vous avez été noté absent au cours de :cours, du :date de :heure_debut à :heure_fin.');
INSERT INTO ingrid.notification VALUES (3, 'Evaluation', 'Votre note pour l’examen de :module a été publiée.');
INSERT INTO ingrid.notification VALUES (4, 'Rappel', 'Pensez à remplir le questionnaire de satisfaction sur le module :module.');
INSERT INTO ingrid.notification VALUES (5, 'Information', 'La salle pour le cours de :cours a changé. Nouveau lieu : :nouvelle_salle.');
INSERT INTO ingrid.notification VALUES (6, 'Information', 'La plateforme d''Eiffel Time sera inaccessible pour maintenance le :date.');
INSERT INTO ingrid.notification VALUES (2, 'Message', 'Vous avez reçu un message de :personne.');


--
-- Data for Name: absence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.absence VALUES (1, 'justificatif1.pdf', 'Absent pour cause de maladie.', true, NULL, true, '2025-01-01 09:00:00', '2025-01-01 12:00:00', 1, 3, 1);
INSERT INTO ingrid.absence VALUES (2, NULL, 'Absent sans justificatif. Retard de 15 minutes.', false, 15, true, '2025-01-02 10:00:00', '2025-01-02 11:30:00', 1, 8, 2);
INSERT INTO ingrid.absence VALUES (3, 'justificatif2.pdf', 'Accident de transport, justificatif envoyé.', true, NULL, false, '2025-01-03 08:00:00', '2025-01-03 13:00:00', 1, 9, 3);
INSERT INTO ingrid.absence VALUES (4, NULL, 'Présence signalée avec un retard de 10 minutes.', false, 10, true, '2025-01-04 09:15:00', '2025-01-04 10:00:00', 1, 10, 4);
INSERT INTO ingrid.absence VALUES (5, NULL, 'Absent sans explication.', false, NULL, false, '2025-01-05 11:00:00', '2025-01-05 15:00:00', 1, 11, 5);
INSERT INTO ingrid.absence VALUES (6, 'justificatif3.pdf', 'Absence validée pour raisons familiales.', true, NULL, true, '2025-01-06 10:30:00', '2025-01-06 14:30:00', 1, 12, 6);
INSERT INTO ingrid.absence VALUES (7, NULL, 'Retard non signalé, 20 minutes.', false, 20, false, '2025-01-07 09:45:00', '2025-01-07 12:15:00', 1, 13, 7);
INSERT INTO ingrid.absence VALUES (8, NULL, 'Justificatif en attente pour cette absence.', false, NULL, false, '2025-01-08 08:30:00', '2025-01-08 11:30:00', 1, 14, 8);
INSERT INTO ingrid.absence VALUES (9, NULL, 'Absence pour toute la durée avec un retard initial non justifié.', false, 25, true, '2025-01-09 07:00:00', '2025-01-09 13:00:00', 1, 15, 9);
INSERT INTO ingrid.absence VALUES (10, 'justificatif4.pdf', 'Absence validée avec un retard de 30 minutes.', true, 30, true, '2025-01-10 09:30:00', '2025-01-10 14:00:00', 1, 16, 10);
INSERT INTO ingrid.absence VALUES (11, NULL, 'Absence déclarée mais non validée.', false, NULL, true, '2025-01-11 10:00:00', '2025-01-11 12:00:00', 1, 17, 11);
INSERT INTO ingrid.absence VALUES (12, 'justificatif_absence_2025_01_10.pdf', 'Absent pour raison médicale.', true, 0, true, '2025-01-10 08:00:00', '2025-01-10 08:30:00', 1, 3, 1);


--
-- Data for Name: bloc_competence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.bloc_competence VALUES (1, 'BC1 : Réaliser un développement d''application', 1);
INSERT INTO ingrid.bloc_competence VALUES (2, 'BC2 : Optimiser des applications informatiques', 1);
INSERT INTO ingrid.bloc_competence VALUES (3, 'BC3 : Administrer des systèmes informatiques communicants complexes', 1);
INSERT INTO ingrid.bloc_competence VALUES (4, 'BC4 : Gérer des données de l''information', 1);
INSERT INTO ingrid.bloc_competence VALUES (5, 'BC5 : Conduire un projet', 1);
INSERT INTO ingrid.bloc_competence VALUES (6, 'BC6 : Travailler dans une équipe informatique', 1);


--
-- Data for Name: communiquer; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.communiquer VALUES (1, 'Introduction au sujet du cours.', '2025-01-08 09:10:00', 1, 3);
INSERT INTO ingrid.communiquer VALUES (2, 'Mise à jour sur le planning.', '2025-01-09 10:00:00', 2, 8);
INSERT INTO ingrid.communiquer VALUES (3, 'Partage des notes et documents.', '2025-01-10 11:30:00', 3, 9);
INSERT INTO ingrid.communiquer VALUES (4, 'Informations complémentaires.', '2025-01-11 14:00:00', 4, 10);
INSERT INTO ingrid.communiquer VALUES (5, 'Annonce d''un changement de salle.', '2025-01-12 15:00:00', 5, 11);
INSERT INTO ingrid.communiquer VALUES (6, 'Rappel des exercices à rendre.', '2025-01-13 08:45:00', 6, 12);
INSERT INTO ingrid.communiquer VALUES (7, 'Invitation à une session de révision.', '2025-01-14 16:00:00', 7, 13);
INSERT INTO ingrid.communiquer VALUES (8, 'Retour sur la dernière séance.', '2025-01-15 09:30:00', 8, 14);
INSERT INTO ingrid.communiquer VALUES (9, 'Partage des supports de cours.', '2025-01-16 10:45:00', 9, 15);
INSERT INTO ingrid.communiquer VALUES (10, 'Annonce d''un invité spécial.', '2025-01-17 11:20:00', 10, 16);
INSERT INTO ingrid.communiquer VALUES (11, 'Rappel sur les consignes du projet.', '2025-01-18 13:30:00', 11, 17);
INSERT INTO ingrid.communiquer VALUES (12, 'Salut tout le monde, quelqu’un a compris le dernier exercice sur les matrices ? J’ai un doute sur la méthode.', '2025-01-08 09:30:00', 1, 3);
INSERT INTO ingrid.communiquer VALUES (13, 'Est-ce qu’il y a un changement de salle pour le prochain TP ? Je crois que le prof a dit quelque chose mais je suis pas sûr.', '2025-01-09 10:15:00', 2, 8);
INSERT INTO ingrid.communiquer VALUES (14, 'Voici un résumé rapide de la séance d’aujourd’hui, si ça peut aider ceux qui n’étaient pas là. Dites-moi si j’ai oublié quelque chose !', '2025-01-10 12:00:00', 3, 9);
INSERT INTO ingrid.communiquer VALUES (15, 'Quelqu’un aurait un lien ou le document pour les consignes du projet ? Impossible de le retrouver dans les mails.', '2025-01-11 14:30:00', 4, 10);
INSERT INTO ingrid.communiquer VALUES (16, 'Hello ! Pour ceux qui veulent, on fait une session de révision au bâtiment A demain à 10h. Tout le monde est le bienvenu !', '2025-01-12 15:45:00', 5, 11);
INSERT INTO ingrid.communiquer VALUES (17, 'Est-ce que le prof a donné des pistes pour l’exercice 3 ? Je suis complètement bloqué...', '2025-01-13 09:00:00', 6, 12);
INSERT INTO ingrid.communiquer VALUES (18, 'Salut, j’ai trouvé un super tuto pour l’exo sur les boucles, je vous partage le lien ici : https://example.com/tuto-boucles', '2025-01-14 16:30:00', 7, 13);
INSERT INTO ingrid.communiquer VALUES (19, 'Quelqu’un sait si on doit rendre le rapport en version papier ou uniquement sur Moodle ?', '2025-01-15 10:00:00', 8, 14);
INSERT INTO ingrid.communiquer VALUES (20, 'J’ai noté que le prochain cours est annulé, vous confirmez ? Sinon, on se retrouve où ?', '2025-01-16 11:15:00', 9, 15);
INSERT INTO ingrid.communiquer VALUES (21, 'Petite astuce pour ceux qui galèrent avec l’exercice 5 : il faut d’abord vérifier les types de données avant d’exécuter le reste.', '2025-01-17 11:50:00', 10, 16);
INSERT INTO ingrid.communiquer VALUES (22, 'Je propose qu’on se répartisse les tâches pour le projet, ce sera plus simple. Qui est dispo pour faire la partie sur les interfaces ?', '2025-01-18 14:00:00', 11, 17);


--
-- Data for Name: enseignant; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.enseignant VALUES (18, true);
INSERT INTO ingrid.enseignant VALUES (5, false);


--
-- Data for Name: enseignant_module; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.enseignant_module VALUES (10, 5);
INSERT INTO ingrid.enseignant_module VALUES (3, 5);
INSERT INTO ingrid.enseignant_module VALUES (1, 18);
INSERT INTO ingrid.enseignant_module VALUES (2, 18);
INSERT INTO ingrid.enseignant_module VALUES (4, 18);
INSERT INTO ingrid.enseignant_module VALUES (5, 18);
INSERT INTO ingrid.enseignant_module VALUES (6, 18);
INSERT INTO ingrid.enseignant_module VALUES (7, 18);
INSERT INTO ingrid.enseignant_module VALUES (8, 18);
INSERT INTO ingrid.enseignant_module VALUES (9, 18);
INSERT INTO ingrid.enseignant_module VALUES (11, 18);
INSERT INTO ingrid.enseignant_module VALUES (12, 18);
INSERT INTO ingrid.enseignant_module VALUES (13, 18);
INSERT INTO ingrid.enseignant_module VALUES (14, 18);
INSERT INTO ingrid.enseignant_module VALUES (15, 18);
INSERT INTO ingrid.enseignant_module VALUES (16, 18);
INSERT INTO ingrid.enseignant_module VALUES (17, 18);
INSERT INTO ingrid.enseignant_module VALUES (18, 18);
INSERT INTO ingrid.enseignant_module VALUES (20, 18);
INSERT INTO ingrid.enseignant_module VALUES (21, 18);
INSERT INTO ingrid.enseignant_module VALUES (22, 18);
INSERT INTO ingrid.enseignant_module VALUES (23, 18);
INSERT INTO ingrid.enseignant_module VALUES (24, 18);
INSERT INTO ingrid.enseignant_module VALUES (25, 18);
INSERT INTO ingrid.enseignant_module VALUES (26, 18);
INSERT INTO ingrid.enseignant_module VALUES (27, 18);
INSERT INTO ingrid.enseignant_module VALUES (28, 18);
INSERT INTO ingrid.enseignant_module VALUES (29, 18);
INSERT INTO ingrid.enseignant_module VALUES (30, 18);
INSERT INTO ingrid.enseignant_module VALUES (31, 18);
INSERT INTO ingrid.enseignant_module VALUES (32, 18);
INSERT INTO ingrid.enseignant_module VALUES (33, 18);
INSERT INTO ingrid.enseignant_module VALUES (34, 18);
INSERT INTO ingrid.enseignant_module VALUES (35, 18);
INSERT INTO ingrid.enseignant_module VALUES (36, 18);
INSERT INTO ingrid.enseignant_module VALUES (37, 18);
INSERT INTO ingrid.enseignant_module VALUES (38, 18);
INSERT INTO ingrid.enseignant_module VALUES (19, 18);
INSERT INTO ingrid.enseignant_module VALUES (39, 18);


--
-- Data for Name: evaluation; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.evaluation VALUES (1, 'Examen final', 3, 20, 'Semestre 1', '2025-01-01 10:00:00', '2025-01-02 10:00:00', 1, 3, 1);
INSERT INTO ingrid.evaluation VALUES (2, 'Test intermédiaire', 2, 10, 'Semestre 1', '2025-01-05 14:00:00', '2025-01-06 14:00:00', 2, 3, 5);
INSERT INTO ingrid.evaluation VALUES (3, 'Projet de groupe', 4, 20, 'Semestre 2', '2025-01-10 09:00:00', '2025-01-11 09:00:00', 3, 3, 12);
INSERT INTO ingrid.evaluation VALUES (4, 'Rapport écrit', 1, 15, 'Semestre 2', '2025-01-15 16:00:00', '2025-01-16 16:00:00', 4, 3, 7);
INSERT INTO ingrid.evaluation VALUES (5, 'Présentation orale', 2, 10, 'Semestre 3', '2025-01-20 11:00:00', '2025-01-21 11:00:00', 5, 3, 8);
INSERT INTO ingrid.evaluation VALUES (6, 'Examen pratique', 3, 20, 'Semestre 3', '2025-01-25 15:00:00', '2025-01-26 15:00:00', 6, 3, 15);
INSERT INTO ingrid.evaluation VALUES (7, 'Mini-test', 1, 5, 'Semestre 4', '2025-02-01 08:00:00', '2025-02-01 09:00:00', 7, 3, 18);
INSERT INTO ingrid.evaluation VALUES (8, 'Devoir surveillé', 2, 15, 'Semestre 4', '2025-02-05 10:00:00', '2025-02-06 10:00:00', 8, 3, 22);
INSERT INTO ingrid.evaluation VALUES (9, 'Projet final', 5, 20, 'Semestre 5', '2025-02-10 13:00:00', '2025-02-11 13:00:00', 9, 3, 30);
INSERT INTO ingrid.evaluation VALUES (10, 'Examen théorique', 3, 20, 'Semestre 6', '2025-02-15 14:00:00', '2025-02-16 14:00:00', 10, 3, 33);
INSERT INTO ingrid.evaluation VALUES (11, 'Quiz', 1, 5, 'Semestre 6', '2025-02-20 12:00:00', '2025-02-21 12:00:00', 11, 3, 39);
INSERT INTO ingrid.evaluation VALUES (100, 'test', 1, 20, NULL, '2025-01-27 21:39:05.254', NULL, 1, 3, 1);


--
-- Data for Name: formation_utilisateur; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.formation_utilisateur VALUES (3, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (8, 2);
INSERT INTO ingrid.formation_utilisateur VALUES (9, 3);
INSERT INTO ingrid.formation_utilisateur VALUES (10, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (11, 2);
INSERT INTO ingrid.formation_utilisateur VALUES (12, 3);
INSERT INTO ingrid.formation_utilisateur VALUES (13, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (14, 2);
INSERT INTO ingrid.formation_utilisateur VALUES (15, 3);
INSERT INTO ingrid.formation_utilisateur VALUES (7, 2);
INSERT INTO ingrid.formation_utilisateur VALUES (7, 3);
INSERT INTO ingrid.formation_utilisateur VALUES (7, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (6, 2);
INSERT INTO ingrid.formation_utilisateur VALUES (6, 3);
INSERT INTO ingrid.formation_utilisateur VALUES (6, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (4, 1);
INSERT INTO ingrid.formation_utilisateur VALUES (5, 1);


--
-- Data for Name: groupe_etudiant; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.groupe_etudiant VALUES (3, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (3, 3);
INSERT INTO ingrid.groupe_etudiant VALUES (8, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (8, 3);
INSERT INTO ingrid.groupe_etudiant VALUES (9, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (9, 3);
INSERT INTO ingrid.groupe_etudiant VALUES (10, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (10, 4);
INSERT INTO ingrid.groupe_etudiant VALUES (11, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (11, 4);
INSERT INTO ingrid.groupe_etudiant VALUES (12, 1);
INSERT INTO ingrid.groupe_etudiant VALUES (12, 3);
INSERT INTO ingrid.groupe_etudiant VALUES (13, 2);
INSERT INTO ingrid.groupe_etudiant VALUES (13, 5);
INSERT INTO ingrid.groupe_etudiant VALUES (14, 2);
INSERT INTO ingrid.groupe_etudiant VALUES (14, 5);
INSERT INTO ingrid.groupe_etudiant VALUES (15, 2);
INSERT INTO ingrid.groupe_etudiant VALUES (15, 4);


--
-- Data for Name: message; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.message VALUES (1, 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.', '2024-10-07 23:21:26', 8, 11, NULL);
INSERT INTO ingrid.message VALUES (2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', '2024-03-20 22:57:06', 5, 17, NULL);
INSERT INTO ingrid.message VALUES (3, 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.', '2024-10-07 17:24:30', 5, 9, NULL);
INSERT INTO ingrid.message VALUES (4, 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.', '2024-08-07 04:45:05', 2, 16, NULL);
INSERT INTO ingrid.message VALUES (5, 'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-03-17 14:30:41', 16, 9, NULL);
INSERT INTO ingrid.message VALUES (6, 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.', '2024-12-30 11:26:05', 13, 1, NULL);
INSERT INTO ingrid.message VALUES (7, 'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', '2024-04-20 12:20:32', 16, 1, NULL);
INSERT INTO ingrid.message VALUES (8, 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', '2024-12-24 18:55:10', 3, 5, NULL);
INSERT INTO ingrid.message VALUES (9, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', '2024-09-17 08:14:22', 17, 12, NULL);
INSERT INTO ingrid.message VALUES (10, 'Integer ac leo.', '2024-02-05 23:04:40', 16, 3, NULL);
INSERT INTO ingrid.message VALUES (11, 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', '2024-04-06 22:54:02', 13, 2, NULL);
INSERT INTO ingrid.message VALUES (12, 'Etiam vel augue. Vestibulum rutrum rutrum neque.', '2024-07-05 23:42:19', 5, 9, NULL);
INSERT INTO ingrid.message VALUES (13, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2024-01-27 21:43:05', 10, 12, NULL);
INSERT INTO ingrid.message VALUES (14, 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2024-02-14 05:55:34', 2, 4, NULL);
INSERT INTO ingrid.message VALUES (15, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.', '2024-02-22 07:33:07', 15, 9, NULL);
INSERT INTO ingrid.message VALUES (16, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.', '2024-09-19 05:37:43', 5, 14, NULL);
INSERT INTO ingrid.message VALUES (17, 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', '2024-10-29 01:13:17', 8, 10, NULL);
INSERT INTO ingrid.message VALUES (18, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', '2024-08-13 14:21:32', 8, 17, NULL);
INSERT INTO ingrid.message VALUES (19, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '2024-01-23 18:46:06', 13, 5, NULL);
INSERT INTO ingrid.message VALUES (20, 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-10-08 03:57:55', 12, 4, NULL);
INSERT INTO ingrid.message VALUES (21, 'Vestibulum sed magna at nunc commodo placerat.', '2024-07-05 13:11:17', 4, 2, NULL);
INSERT INTO ingrid.message VALUES (22, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2024-02-15 14:35:19', 3, 6, NULL);
INSERT INTO ingrid.message VALUES (23, 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.', '2024-09-15 14:49:14', 4, 11, NULL);
INSERT INTO ingrid.message VALUES (24, 'Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.', '2024-05-04 21:08:03', 4, 7, NULL);
INSERT INTO ingrid.message VALUES (25, 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-05-31 14:03:47', 16, 14, NULL);
INSERT INTO ingrid.message VALUES (26, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '2024-12-13 09:36:26', 5, 1, NULL);
INSERT INTO ingrid.message VALUES (27, 'Integer ac leo.', '2024-05-17 07:42:21', 7, 4, NULL);
INSERT INTO ingrid.message VALUES (28, 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2024-05-21 21:23:31', 13, 5, NULL);
INSERT INTO ingrid.message VALUES (29, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2024-03-25 04:40:09', 1, 7, NULL);
INSERT INTO ingrid.message VALUES (30, 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', '2024-10-23 04:56:53', 2, 2, NULL);
INSERT INTO ingrid.message VALUES (31, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-06-06 22:42:10', 13, 13, NULL);
INSERT INTO ingrid.message VALUES (32, 'Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '2024-09-16 15:26:21', 9, 11, NULL);
INSERT INTO ingrid.message VALUES (33, 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.', '2024-09-01 02:58:33', 4, 1, NULL);
INSERT INTO ingrid.message VALUES (34, 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '2024-02-01 19:40:44', 14, 3, NULL);
INSERT INTO ingrid.message VALUES (35, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.', '2024-09-08 06:05:43', 7, 10, NULL);
INSERT INTO ingrid.message VALUES (36, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', '2025-01-02 21:22:32', 1, 17, NULL);
INSERT INTO ingrid.message VALUES (37, 'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2024-01-11 15:43:48', 9, 3, NULL);
INSERT INTO ingrid.message VALUES (38, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2024-02-15 14:57:03', 4, 3, NULL);
INSERT INTO ingrid.message VALUES (39, 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', '2024-05-16 09:16:52', 17, 17, NULL);
INSERT INTO ingrid.message VALUES (40, 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', '2024-08-01 10:18:24', 1, 11, NULL);
INSERT INTO ingrid.message VALUES (41, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', '2024-04-04 13:52:50', 13, 17, NULL);
INSERT INTO ingrid.message VALUES (42, 'In blandit ultrices enim.', '2024-03-20 13:03:52', 17, 9, NULL);
INSERT INTO ingrid.message VALUES (43, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.', '2024-09-20 23:12:26', 9, 10, NULL);
INSERT INTO ingrid.message VALUES (44, 'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-05-28 23:07:35', 12, 9, NULL);
INSERT INTO ingrid.message VALUES (45, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.', '2024-11-27 23:56:33', 11, 3, NULL);
INSERT INTO ingrid.message VALUES (46, 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '2024-12-11 12:32:59', 9, 13, NULL);
INSERT INTO ingrid.message VALUES (47, 'Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2024-04-30 14:13:52', 7, 16, NULL);
INSERT INTO ingrid.message VALUES (48, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-07-07 07:44:06', 9, 10, NULL);
INSERT INTO ingrid.message VALUES (49, 'Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.', '2024-09-10 06:46:49', 9, 5, NULL);
INSERT INTO ingrid.message VALUES (50, 'Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-11-20 20:34:19', 7, 7, NULL);
INSERT INTO ingrid.message VALUES (53, 'Je pense qu''il faut d''abord décomposer le problème en étapes. Peut-être qu''on devrait revoir les bases sur les matrices.', '2025-01-08 10:10:00', 3, 8, 52);
INSERT INTO ingrid.message VALUES (51, 'Salut, tu as compris le dernier exercice sur les matrices ?', '2025-01-08 10:00:00', 3, 8, NULL);
INSERT INTO ingrid.message VALUES (52, 'Non, pas vraiment. Tu as des idées pour le résoudre ?', '2025-01-08 10:05:00', 8, 3, 51);
INSERT INTO ingrid.message VALUES (54, 'Bonne idée, je vais regarder le cours à nouveau. Tu veux qu''on réessaie ensemble après ? ', '2025-01-08 10:15:00', 8, 3, 53);
INSERT INTO ingrid.message VALUES (55, 'Oui, ça me va. On peut se retrouver à la bibliothèque à 14h ?', '2025-01-08 10:20:00', 3, 8, 54);
INSERT INTO ingrid.message VALUES (56, 'Ok, c''est parfait. À tout à l''heure !', '2025-01-08 10:25:00', 8, 3, 55);
INSERT INTO ingrid.message VALUES (57, 'Alors, tu penses que la méthode de Gauss est la bonne approche pour résoudre ce système ?', '2025-01-08 14:05:00', 3, 8, NULL);
INSERT INTO ingrid.message VALUES (58, 'Oui, exactement ! Ça semble bien fonctionner avec l''exercice. Tu veux qu''on passe à l''étape suivante ?', '2025-01-08 14:10:00', 8, 3, 57);
INSERT INTO ingrid.message VALUES (59, 'Je crois que c''est bon, on a tout résolu. Tu veux qu''on en parle en classe ?', '2025-01-08 14:15:00', 3, 8, 58);
INSERT INTO ingrid.message VALUES (60, 'Oui, c’est une bonne idée. À plus tard alors.', '2025-01-08 14:20:00', 8, 3, 59);


--
-- Data for Name: module_bloc_competence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.module_bloc_competence VALUES (1, 1, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (2, 1, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (2, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (3, 1, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (3, 5, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (3, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (4, 1, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (4, 3, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (4, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (5, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (6, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (6, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (7, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (7, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (7, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (8, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (8, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (9, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (9, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (9, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (9, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 1, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (10, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (11, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (12, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (12, 3, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (13, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (13, 3, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (14, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (14, 4, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (15, 2, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (16, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (17, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (17, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (18, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (18, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (19, 2, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (20, 3, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (21, 3, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (21, 5, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (21, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (22, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (23, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (24, 3, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (24, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (24, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (24, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (25, 4, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (26, 4, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (27, 4, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (27, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (28, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (29, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (30, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (31, 4, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (31, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (32, 5, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (33, 5, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (34, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (35, 6, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (36, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (37, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (38, 6, 'Semestre 2');
INSERT INTO ingrid.module_bloc_competence VALUES (39, 5, 'Semestre 1');
INSERT INTO ingrid.module_bloc_competence VALUES (39, 6, 'Semestre 1');


--
-- Data for Name: notes; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.notes VALUES (3, 1, 15.00, 'Bonne performance sur l’examen.', '2025-01-01 12:00:00', '2025-01-02 12:00:00');
INSERT INTO ingrid.notes VALUES (8, 1, 18.50, 'Excellente maîtrise du sujet.', '2025-01-01 12:30:00', '2025-01-02 12:30:00');
INSERT INTO ingrid.notes VALUES (9, 2, 9.00, 'Besoin de travailler sur les détails.', '2025-01-05 14:10:00', '2025-01-06 14:10:00');
INSERT INTO ingrid.notes VALUES (10, 2, 7.50, 'Des erreurs sur les questions clés.', '2025-01-05 14:30:00', '2025-01-06 14:30:00');
INSERT INTO ingrid.notes VALUES (11, 3, 20.00, 'Excellent travail en équipe.', '2025-01-10 09:00:00', '2025-01-11 09:00:00');
INSERT INTO ingrid.notes VALUES (12, 3, 19.50, 'Très bon leadership.', '2025-01-10 09:15:00', '2025-01-11 09:15:00');
INSERT INTO ingrid.notes VALUES (13, 4, 14.00, 'Bon rapport mais manque de structure.', '2025-01-15 16:00:00', '2025-01-16 16:00:00');
INSERT INTO ingrid.notes VALUES (14, 4, 13.50, 'Doit améliorer la clarté.', '2025-01-15 16:20:00', '2025-01-16 16:20:00');
INSERT INTO ingrid.notes VALUES (15, 5, 10.00, 'Présentation correcte, manque de profondeur.', '2025-01-20 11:00:00', '2025-01-21 11:00:00');
INSERT INTO ingrid.notes VALUES (16, 5, 12.00, 'Bonne organisation.', '2025-01-20 11:10:00', '2025-01-21 11:10:00');
INSERT INTO ingrid.notes VALUES (17, 6, 16.00, 'Excellente application des concepts.', '2025-01-25 15:00:00', '2025-01-26 15:00:00');
INSERT INTO ingrid.notes VALUES (8, 6, 17.50, 'Résultats impressionnants.', '2025-01-25 15:20:00', '2025-01-26 15:20:00');
INSERT INTO ingrid.notes VALUES (9, 7, 4.50, 'Manque de préparation.', '2025-02-01 08:00:00', '2025-02-01 09:00:00');
INSERT INTO ingrid.notes VALUES (10, 7, 5.00, 'Performance correcte.', '2025-02-01 08:10:00', '2025-02-01 09:10:00');
INSERT INTO ingrid.notes VALUES (11, 8, 13.50, 'Très bon devoir.', '2025-02-05 10:00:00', '2025-02-06 10:00:00');
INSERT INTO ingrid.notes VALUES (12, 8, 14.00, 'Bonne compréhension globale.', '2025-02-05 10:20:00', '2025-02-06 10:20:00');
INSERT INTO ingrid.notes VALUES (13, 9, 19.00, 'Projet excellent.', '2025-02-10 13:00:00', '2025-02-11 13:00:00');
INSERT INTO ingrid.notes VALUES (14, 9, 18.50, 'Très bonne gestion de projet.', '2025-02-10 13:10:00', '2025-02-11 13:10:00');
INSERT INTO ingrid.notes VALUES (15, 10, 16.00, 'Bonne préparation.', '2025-02-15 14:00:00', '2025-02-16 14:00:00');
INSERT INTO ingrid.notes VALUES (16, 10, 15.50, 'Quelques lacunes dans les détails.', '2025-02-15 14:20:00', '2025-02-16 14:20:00');
INSERT INTO ingrid.notes VALUES (17, 11, 4.00, 'Manque de révision.', '2025-02-20 12:00:00', '2025-02-21 12:00:00');
INSERT INTO ingrid.notes VALUES (8, 11, 5.00, 'Réponse correcte, mais incomplète.', '2025-02-20 12:30:00', '2025-02-21 12:30:00');


--
-- Data for Name: utilisateurs_eav; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

INSERT INTO ingrid.utilisateurs_eav VALUES (1, 'adresse', '123 Rue des Lilas', '2025-01-01 10:00:00', 1);
INSERT INTO ingrid.utilisateurs_eav VALUES (2, 'téléphone', '0654321098', '2025-01-02 11:30:00', 1);
INSERT INTO ingrid.utilisateurs_eav VALUES (3, 'langue', 'Français', '2025-01-03 14:15:00', 1);
INSERT INTO ingrid.utilisateurs_eav VALUES (4, 'adresse', '45 Avenue de la République', '2025-01-02 09:00:00', 2);
INSERT INTO ingrid.utilisateurs_eav VALUES (5, 'téléphone', '0778456123', '2025-01-04 13:00:00', 2);
INSERT INTO ingrid.utilisateurs_eav VALUES (6, 'spécialité', 'Informatique', '2025-01-05 08:45:00', 2);
INSERT INTO ingrid.utilisateurs_eav VALUES (7, 'adresse', '9 Boulevard Haussmann', '2025-01-03 16:00:00', 3);
INSERT INTO ingrid.utilisateurs_eav VALUES (8, 'téléphone', '0667348291', '2025-01-04 10:00:00', 3);
INSERT INTO ingrid.utilisateurs_eav VALUES (9, 'hobby', 'Photographie', '2025-01-06 17:30:00', 3);
INSERT INTO ingrid.utilisateurs_eav VALUES (10, 'adresse', '78 Rue de la Paix', '2025-01-01 12:00:00', 4);
INSERT INTO ingrid.utilisateurs_eav VALUES (11, 'téléphone', '0687123456', '2025-01-03 15:00:00', 4);
INSERT INTO ingrid.utilisateurs_eav VALUES (12, 'langue', 'Anglais', '2025-01-05 09:30:00', 4);
INSERT INTO ingrid.utilisateurs_eav VALUES (13, 'adresse', '23 Impasse des Fleurs', '2025-01-02 14:00:00', 5);
INSERT INTO ingrid.utilisateurs_eav VALUES (14, 'téléphone', '0698123476', '2025-01-03 16:30:00', 5);
INSERT INTO ingrid.utilisateurs_eav VALUES (15, 'préférence', 'Travail en équipe', '2025-01-06 11:00:00', 5);
INSERT INTO ingrid.utilisateurs_eav VALUES (16, 'adresse', '12 Place Bellecour', '2025-01-01 18:00:00', 6);
INSERT INTO ingrid.utilisateurs_eav VALUES (17, 'téléphone', '0678564912', '2025-01-04 08:00:00', 6);
INSERT INTO ingrid.utilisateurs_eav VALUES (18, 'langue', 'Espagnol', '2025-01-06 13:15:00', 6);
INSERT INTO ingrid.utilisateurs_eav VALUES (19, 'adresse', '50 Rue Principale', '2025-01-07 14:00:00', 7);
INSERT INTO ingrid.utilisateurs_eav VALUES (20, 'téléphone', '0765432189', '2025-01-07 15:30:00', 7);
INSERT INTO ingrid.utilisateurs_eav VALUES (21, 'adresse', '89 Chemin des Pins', '2025-01-08 16:00:00', 8);
INSERT INTO ingrid.utilisateurs_eav VALUES (22, 'téléphone', '0751234897', '2025-01-08 17:00:00', 8);
INSERT INTO ingrid.utilisateurs_eav VALUES (23, 'adresse', '67 Rue du Bac', '2025-01-09 11:00:00', 9);
INSERT INTO ingrid.utilisateurs_eav VALUES (24, 'téléphone', '0645781239', '2025-01-09 12:30:00', 9);


--
-- Name: absence_id_absence_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.absence_id_absence_seq', 12, true);


--
-- Name: bloc_competence_id_bloc_comp_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.bloc_competence_id_bloc_comp_seq', 6, true);


--
-- Name: communiquer_id_communiquer_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.communiquer_id_communiquer_seq', 22, true);


--
-- Name: cours_id_cours_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.cours_id_cours_seq', 13, true);


--
-- Name: evaluation_id_eval_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.evaluation_id_eval_seq', 1, true);


--
-- Name: formation_id_formation_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.formation_id_formation_seq', 3, true);


--
-- Name: groupe_id_grp_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.groupe_id_grp_seq', 5, true);


--
-- Name: message_id_message_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.message_id_message_seq', 60, true);


--
-- Name: module_id_module_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.module_id_module_seq', 39, true);


--
-- Name: notification_id_notif_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.notification_id_notif_seq', 11, true);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.utilisateur_id_utilisateur_seq', 18, true);


--
-- Name: utilisateurs_eav_id_user_eav_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.utilisateurs_eav_id_user_eav_seq', 24, true);


--
-- PostgreSQL database dump complete
--

