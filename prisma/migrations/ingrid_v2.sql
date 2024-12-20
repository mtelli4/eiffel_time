--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ingrid; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA ingrid;


ALTER SCHEMA ingrid OWNER TO pg_database_owner;

--
-- Name: SCHEMA ingrid; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA ingrid IS 'standard ingrid schema';


--
-- Name: statut_utilisateur; Type: TYPE; Schema: ingrid; Owner: postgres
--

CREATE TYPE ingrid.statut_utilisateur AS ENUM (
    'indefinite',
    'student',
    'teacher',
    'secretary',
    'director',
    'manager',
    'administrator'
);


ALTER TYPE ingrid.statut_utilisateur OWNER TO postgres;

--
-- Name: type_cours; Type: TYPE; Schema: ingrid; Owner: postgres
--

CREATE TYPE ingrid.type_cours AS ENUM (
    'CM',
    'TD',
    'TP',
    ''
);


ALTER TYPE ingrid.type_cours OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE ingrid._prisma_migrations OWNER TO postgres;

--
-- Name: absence; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.absence (
    id_absence integer NOT NULL,
    justificatif character varying(50),
    message character varying(1000),
    valide boolean,
    retard integer,
    envoye boolean,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    id_notif integer NOT NULL,
    id_utilisateur integer NOT NULL,
    id_cours integer NOT NULL
);


ALTER TABLE ingrid.absence OWNER TO postgres;

--
-- Name: COLUMN absence.justificatif; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.absence.justificatif IS 'chemin relatif vers le document';


--
-- Name: COLUMN absence.retard; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.absence.retard IS 'nombre de minutes';


--
-- Name: absence_id_absence_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.absence_id_absence_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.absence_id_absence_seq OWNER TO postgres;

--
-- Name: absence_id_absence_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.absence_id_absence_seq OWNED BY ingrid.absence.id_absence;


--
-- Name: bloc_competence; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.bloc_competence (
    id_bloc_comp integer NOT NULL,
    libelle character varying(50),
    id_formation integer NOT NULL
);


ALTER TABLE ingrid.bloc_competence OWNER TO postgres;

--
-- Name: bloc_competence_id_bloc_comp_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.bloc_competence_id_bloc_comp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.bloc_competence_id_bloc_comp_seq OWNER TO postgres;

--
-- Name: bloc_competence_id_bloc_comp_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.bloc_competence_id_bloc_comp_seq OWNED BY ingrid.bloc_competence.id_bloc_comp;


--
-- Name: communiquer; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.communiquer (
    id_communiquer integer NOT NULL,
    contenu text NOT NULL,
    createdat timestamp without time zone NOT NULL,
    id_cours integer NOT NULL,
    id_utilisateur integer NOT NULL
);


ALTER TABLE ingrid.communiquer OWNER TO postgres;

--
-- Name: communiquer_id_communiquer_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.communiquer_id_communiquer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.communiquer_id_communiquer_seq OWNER TO postgres;

--
-- Name: communiquer_id_communiquer_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.communiquer_id_communiquer_seq OWNED BY ingrid.communiquer.id_communiquer;


--
-- Name: cours; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.cours (
    id_cours integer NOT NULL,
    type ingrid.type_cours,
    libelle character varying(50),
    debut timestamp without time zone,
    fin timestamp without time zone,
    batiment character varying(50) NOT NULL,
    salle character varying(10),
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    appel boolean,
    presence character varying(10),
    id_module integer NOT NULL,
    id_formation integer NOT NULL,
    id_grp integer
);


ALTER TABLE ingrid.cours OWNER TO postgres;

--
-- Name: COLUMN cours.libelle; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.cours.libelle IS 'nom du cours sur l''emploi du temps quand il n''appartient pas à un module';


--
-- Name: cours_id_cours_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.cours_id_cours_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.cours_id_cours_seq OWNER TO postgres;

--
-- Name: cours_id_cours_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.cours_id_cours_seq OWNED BY ingrid.cours.id_cours;


--
-- Name: enseignant; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.enseignant (
    id_utilisateur integer NOT NULL,
    vacataire boolean
);


ALTER TABLE ingrid.enseignant OWNER TO postgres;

--
-- Name: enseignant_module; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.enseignant_module (
    id_module integer NOT NULL,
    id_utilisateur integer NOT NULL
);


ALTER TABLE ingrid.enseignant_module OWNER TO postgres;

--
-- Name: etudiant; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.etudiant (
    id_utilisateur integer NOT NULL,
    numeroetudiant character varying(50),
    tierstemps boolean,
    delegue boolean,
    id_grp integer NOT NULL
);


ALTER TABLE ingrid.etudiant OWNER TO postgres;

--
-- Name: evaluation; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.evaluation (
    id_eval integer NOT NULL,
    libelle character varying(50),
    coefficient integer,
    notemaximale numeric(20,0),
    periode character varying(50),
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    id_cours integer NOT NULL,
    id_notif integer NOT NULL
);


ALTER TABLE ingrid.evaluation OWNER TO postgres;

--
-- Name: COLUMN evaluation.periode; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.evaluation.periode IS 'ex. ''Semestre 1'', ''Semestre 2''';


--
-- Name: evaluation_id_eval_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.evaluation_id_eval_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.evaluation_id_eval_seq OWNER TO postgres;

--
-- Name: evaluation_id_eval_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.evaluation_id_eval_seq OWNED BY ingrid.evaluation.id_eval;


--
-- Name: formation; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.formation (
    id_formation integer NOT NULL,
    libelle character varying(50),
    lien character varying(255),
    trombinoscope character varying(50)
);


ALTER TABLE ingrid.formation OWNER TO postgres;

--
-- Name: COLUMN formation.lien; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.formation.lien IS 'lien de l''emploi sur ADE';


--
-- Name: formation_id_formation_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.formation_id_formation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.formation_id_formation_seq OWNER TO postgres;

--
-- Name: formation_id_formation_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.formation_id_formation_seq OWNED BY ingrid.formation.id_formation;


--
-- Name: formation_utilisateur; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.formation_utilisateur (
    id_utilisateur integer NOT NULL,
    id_formation integer NOT NULL
);


ALTER TABLE ingrid.formation_utilisateur OWNER TO postgres;

--
-- Name: groupe; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.groupe (
    id_grp integer NOT NULL,
    libelle character varying(50)
);


ALTER TABLE ingrid.groupe OWNER TO postgres;

--
-- Name: groupe_formation; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.groupe_formation (
    id_formation integer NOT NULL,
    id_grp integer NOT NULL
);


ALTER TABLE ingrid.groupe_formation OWNER TO postgres;

--
-- Name: groupe_id_grp_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.groupe_id_grp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.groupe_id_grp_seq OWNER TO postgres;

--
-- Name: groupe_id_grp_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.groupe_id_grp_seq OWNED BY ingrid.groupe.id_grp;


--
-- Name: message; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.message (
    id_message integer NOT NULL,
    contenu text,
    createdat timestamp without time zone,
    emetteur integer NOT NULL,
    recepteur integer NOT NULL
);


ALTER TABLE ingrid.message OWNER TO postgres;

--
-- Name: message_id_message_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.message_id_message_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.message_id_message_seq OWNER TO postgres;

--
-- Name: message_id_message_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.message_id_message_seq OWNED BY ingrid.message.id_message;


--
-- Name: module; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.module (
    id_module integer NOT NULL,
    libelle character varying(50),
    codeapogee character varying(50),
    heures character varying(50),
    CONSTRAINT type_format_check CHECK (((heures)::text ~ '^\d+,\d+,\d+;CM,TD,TP$'::text))
);


ALTER TABLE ingrid.module OWNER TO postgres;

--
-- Name: COLUMN module.heures; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON COLUMN ingrid.module.heures IS 'X,X,X;CM,TD,TP';


--
-- Name: module_bloc_competence; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.module_bloc_competence (
    id_module integer NOT NULL,
    id_bloc_comp integer NOT NULL
);


ALTER TABLE ingrid.module_bloc_competence OWNER TO postgres;

--
-- Name: module_id_module_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.module_id_module_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.module_id_module_seq OWNER TO postgres;

--
-- Name: module_id_module_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.module_id_module_seq OWNED BY ingrid.module.id_module;


--
-- Name: notes; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.notes (
    id_utilisateur integer NOT NULL,
    id_eval integer NOT NULL,
    note numeric(15,2),
    commentaire character varying(255),
    createdat timestamp without time zone,
    updatedat timestamp without time zone
);


ALTER TABLE ingrid.notes OWNER TO postgres;

--
-- Name: notification; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.notification (
    id_notif integer NOT NULL,
    type character varying(50),
    message text,
    createdat timestamp without time zone,
    id_utilisateur integer NOT NULL
);


ALTER TABLE ingrid.notification OWNER TO postgres;

--
-- Name: notification_id_notif_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.notification_id_notif_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.notification_id_notif_seq OWNER TO postgres;

--
-- Name: notification_id_notif_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.notification_id_notif_seq OWNED BY ingrid.notification.id_notif;


--
-- Name: sequelizemeta; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.sequelizemeta (
    name character varying(255) NOT NULL
);


ALTER TABLE ingrid.sequelizemeta OWNER TO postgres;

--
-- Name: TABLE sequelizemeta; Type: COMMENT; Schema: ingrid; Owner: postgres
--

COMMENT ON TABLE ingrid.sequelizemeta IS 'Sert de backup, pas toucher !';


--
-- Name: utilisateur; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    email character varying(255),
    mdp character varying(255),
    salt bit varying(16),
    premiereconnexion boolean,
    statut ingrid.statut_utilisateur,
    createdat timestamp without time zone NOT NULL,
    updatedat timestamp without time zone NOT NULL
);


ALTER TABLE ingrid.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.utilisateur_id_utilisateur_seq OWNED BY ingrid.utilisateur.id_utilisateur;


--
-- Name: utilisateurs_eav; Type: TABLE; Schema: ingrid; Owner: postgres
--

CREATE TABLE ingrid.utilisateurs_eav (
    id_user_eav integer NOT NULL,
    attribute character varying(255),
    valueeav character varying(255),
    createdat timestamp without time zone NOT NULL,
    id_utilisateur integer NOT NULL
);


ALTER TABLE ingrid.utilisateurs_eav OWNER TO postgres;

--
-- Name: utilisateurs_eav_id_user_eav_seq; Type: SEQUENCE; Schema: ingrid; Owner: postgres
--

CREATE SEQUENCE ingrid.utilisateurs_eav_id_user_eav_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ingrid.utilisateurs_eav_id_user_eav_seq OWNER TO postgres;

--
-- Name: utilisateurs_eav_id_user_eav_seq; Type: SEQUENCE OWNED BY; Schema: ingrid; Owner: postgres
--

ALTER SEQUENCE ingrid.utilisateurs_eav_id_user_eav_seq OWNED BY ingrid.utilisateurs_eav.id_user_eav;


--
-- Name: absence id_absence; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.absence ALTER COLUMN id_absence SET DEFAULT nextval('ingrid.absence_id_absence_seq'::regclass);


--
-- Name: bloc_competence id_bloc_comp; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.bloc_competence ALTER COLUMN id_bloc_comp SET DEFAULT nextval('ingrid.bloc_competence_id_bloc_comp_seq'::regclass);


--
-- Name: communiquer id_communiquer; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.communiquer ALTER COLUMN id_communiquer SET DEFAULT nextval('ingrid.communiquer_id_communiquer_seq'::regclass);


--
-- Name: cours id_cours; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.cours ALTER COLUMN id_cours SET DEFAULT nextval('ingrid.cours_id_cours_seq'::regclass);


--
-- Name: evaluation id_eval; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.evaluation ALTER COLUMN id_eval SET DEFAULT nextval('ingrid.evaluation_id_eval_seq'::regclass);


--
-- Name: formation id_formation; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.formation ALTER COLUMN id_formation SET DEFAULT nextval('ingrid.formation_id_formation_seq'::regclass);


--
-- Name: groupe id_grp; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.groupe ALTER COLUMN id_grp SET DEFAULT nextval('ingrid.groupe_id_grp_seq'::regclass);


--
-- Name: message id_message; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.message ALTER COLUMN id_message SET DEFAULT nextval('ingrid.message_id_message_seq'::regclass);


--
-- Name: module id_module; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.module ALTER COLUMN id_module SET DEFAULT nextval('ingrid.module_id_module_seq'::regclass);


--
-- Name: notification id_notif; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notification ALTER COLUMN id_notif SET DEFAULT nextval('ingrid.notification_id_notif_seq'::regclass);


--
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('ingrid.utilisateur_id_utilisateur_seq'::regclass);


--
-- Name: utilisateurs_eav id_user_eav; Type: DEFAULT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.utilisateurs_eav ALTER COLUMN id_user_eav SET DEFAULT nextval('ingrid.utilisateurs_eav_id_user_eav_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6f8cae26-0877-4b59-b2c5-a6a26aef01e7	066280158a609145362a619a3c91c09f26130c9afbe7e658c2ce18fbde7110d9	2024-12-12 12:10:06.15293+01	0_init		\N	2024-12-12 12:10:06.15293+01	0
\.


--
-- Data for Name: absence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.absence (id_absence, justificatif, message, valide, retard, envoye, createdat, updatedat, id_notif, id_utilisateur, id_cours) FROM stdin;
\.


--
-- Data for Name: bloc_competence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.bloc_competence (id_bloc_comp, libelle, id_formation) FROM stdin;
\.


--
-- Data for Name: communiquer; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.communiquer (id_communiquer, contenu, createdat, id_cours, id_utilisateur) FROM stdin;
\.


--
-- Data for Name: cours; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.cours (id_cours, type, libelle, debut, fin, batiment, salle, createdat, updatedat, appel, presence, id_module, id_formation, id_grp) FROM stdin;
\.


--
-- Data for Name: enseignant; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.enseignant (id_utilisateur, vacataire) FROM stdin;
\.


--
-- Data for Name: enseignant_module; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.enseignant_module (id_module, id_utilisateur) FROM stdin;
\.


--
-- Data for Name: etudiant; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.etudiant (id_utilisateur, numeroetudiant, tierstemps, delegue, id_grp) FROM stdin;
\.


--
-- Data for Name: evaluation; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.evaluation (id_eval, libelle, coefficient, notemaximale, periode, createdat, updatedat, id_cours, id_notif) FROM stdin;
\.


--
-- Data for Name: formation; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.formation (id_formation, libelle, lien, trombinoscope) FROM stdin;
\.


--
-- Data for Name: formation_utilisateur; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.formation_utilisateur (id_utilisateur, id_formation) FROM stdin;
\.


--
-- Data for Name: groupe; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.groupe (id_grp, libelle) FROM stdin;
\.


--
-- Data for Name: groupe_formation; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.groupe_formation (id_formation, id_grp) FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.message (id_message, contenu, createdat, emetteur, recepteur) FROM stdin;
\.


--
-- Data for Name: module; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.module (id_module, libelle, codeapogee, heures) FROM stdin;
\.


--
-- Data for Name: module_bloc_competence; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.module_bloc_competence (id_module, id_bloc_comp) FROM stdin;
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.notes (id_utilisateur, id_eval, note, commentaire, createdat, updatedat) FROM stdin;
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.notification (id_notif, type, message, createdat, id_utilisateur) FROM stdin;
\.


--
-- Data for Name: sequelizemeta; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.sequelizemeta (name) FROM stdin;
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.utilisateur (id_utilisateur, nom, prenom, email, mdp, salt, premiereconnexion, statut, createdat, updatedat) FROM stdin;
1	Mariya Constantine	Cédric	cedric.mc11@gmail.com	\N	\N	\N	student	2024-12-08 14:35:09.035062	2024-12-08 14:35:09.035062
\.


--
-- Data for Name: utilisateurs_eav; Type: TABLE DATA; Schema: ingrid; Owner: postgres
--

COPY ingrid.utilisateurs_eav (id_user_eav, attribute, valueeav, createdat, id_utilisateur) FROM stdin;
\.


--
-- Name: absence_id_absence_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.absence_id_absence_seq', 1, false);


--
-- Name: bloc_competence_id_bloc_comp_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.bloc_competence_id_bloc_comp_seq', 1, false);


--
-- Name: communiquer_id_communiquer_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.communiquer_id_communiquer_seq', 1, false);


--
-- Name: cours_id_cours_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.cours_id_cours_seq', 1, false);


--
-- Name: evaluation_id_eval_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.evaluation_id_eval_seq', 1, false);


--
-- Name: formation_id_formation_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.formation_id_formation_seq', 1, false);


--
-- Name: groupe_id_grp_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.groupe_id_grp_seq', 1, false);


--
-- Name: message_id_message_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.message_id_message_seq', 1, false);


--
-- Name: module_id_module_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.module_id_module_seq', 1, false);


--
-- Name: notification_id_notif_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.notification_id_notif_seq', 1, false);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.utilisateur_id_utilisateur_seq', 2, true);


--
-- Name: utilisateurs_eav_id_user_eav_seq; Type: SEQUENCE SET; Schema: ingrid; Owner: postgres
--

SELECT pg_catalog.setval('ingrid.utilisateurs_eav_id_user_eav_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: absence absence_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.absence
    ADD CONSTRAINT absence_pkey PRIMARY KEY (id_absence);


--
-- Name: bloc_competence bloc_competence_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.bloc_competence
    ADD CONSTRAINT bloc_competence_pkey PRIMARY KEY (id_bloc_comp);


--
-- Name: communiquer communiquer_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.communiquer
    ADD CONSTRAINT communiquer_pkey PRIMARY KEY (id_communiquer);


--
-- Name: cours cours_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.cours
    ADD CONSTRAINT cours_pkey PRIMARY KEY (id_cours);


--
-- Name: enseignant_module enseignant_module_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.enseignant_module
    ADD CONSTRAINT enseignant_module_pkey PRIMARY KEY (id_module, id_utilisateur);


--
-- Name: enseignant enseignant_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.enseignant
    ADD CONSTRAINT enseignant_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: etudiant etudiant_numeroetudiant_key; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.etudiant
    ADD CONSTRAINT etudiant_numeroetudiant_key UNIQUE (numeroetudiant);


--
-- Name: etudiant etudiant_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.etudiant
    ADD CONSTRAINT etudiant_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: evaluation evaluation_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.evaluation
    ADD CONSTRAINT evaluation_pkey PRIMARY KEY (id_eval);


--
-- Name: formation formation_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.formation
    ADD CONSTRAINT formation_pkey PRIMARY KEY (id_formation);


--
-- Name: formation_utilisateur formation_utilisateur_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.formation_utilisateur
    ADD CONSTRAINT formation_utilisateur_pkey PRIMARY KEY (id_utilisateur, id_formation);


--
-- Name: groupe_formation groupe_formation_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.groupe_formation
    ADD CONSTRAINT groupe_formation_pkey PRIMARY KEY (id_formation, id_grp);


--
-- Name: groupe groupe_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.groupe
    ADD CONSTRAINT groupe_pkey PRIMARY KEY (id_grp);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id_message);


--
-- Name: module_bloc_competence module_bloc_competence_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.module_bloc_competence
    ADD CONSTRAINT module_bloc_competence_pkey PRIMARY KEY (id_module, id_bloc_comp);


--
-- Name: module module_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.module
    ADD CONSTRAINT module_pkey PRIMARY KEY (id_module);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id_utilisateur, id_eval);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id_notif);


--
-- Name: sequelizemeta sequelizemeta_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.sequelizemeta
    ADD CONSTRAINT sequelizemeta_pkey PRIMARY KEY (name);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: utilisateurs_eav utilisateurs_eav_pkey; Type: CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.utilisateurs_eav
    ADD CONSTRAINT utilisateurs_eav_pkey PRIMARY KEY (id_user_eav);


--
-- Name: absence absence_id_cours_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.absence
    ADD CONSTRAINT absence_id_cours_fkey FOREIGN KEY (id_cours) REFERENCES ingrid.cours(id_cours);


--
-- Name: absence absence_id_notif_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.absence
    ADD CONSTRAINT absence_id_notif_fkey FOREIGN KEY (id_notif) REFERENCES ingrid.notification(id_notif);


--
-- Name: absence absence_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.absence
    ADD CONSTRAINT absence_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.etudiant(id_utilisateur);


--
-- Name: bloc_competence bloc_competence_id_formation_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.bloc_competence
    ADD CONSTRAINT bloc_competence_id_formation_fkey FOREIGN KEY (id_formation) REFERENCES ingrid.formation(id_formation);


--
-- Name: communiquer communiquer_id_cours_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.communiquer
    ADD CONSTRAINT communiquer_id_cours_fkey FOREIGN KEY (id_cours) REFERENCES ingrid.cours(id_cours);


--
-- Name: communiquer communiquer_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.communiquer
    ADD CONSTRAINT communiquer_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: cours cours_id_formation_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.cours
    ADD CONSTRAINT cours_id_formation_fkey FOREIGN KEY (id_formation) REFERENCES ingrid.formation(id_formation);


--
-- Name: cours cours_id_grp_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.cours
    ADD CONSTRAINT cours_id_grp_fkey FOREIGN KEY (id_grp) REFERENCES ingrid.groupe(id_grp);


--
-- Name: cours cours_id_module_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.cours
    ADD CONSTRAINT cours_id_module_fkey FOREIGN KEY (id_module) REFERENCES ingrid.module(id_module);


--
-- Name: enseignant enseignant_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.enseignant
    ADD CONSTRAINT enseignant_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: enseignant_module enseignant_module_id_module_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.enseignant_module
    ADD CONSTRAINT enseignant_module_id_module_fkey FOREIGN KEY (id_module) REFERENCES ingrid.module(id_module);


--
-- Name: enseignant_module enseignant_module_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.enseignant_module
    ADD CONSTRAINT enseignant_module_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.enseignant(id_utilisateur);


--
-- Name: etudiant etudiant_id_grp_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.etudiant
    ADD CONSTRAINT etudiant_id_grp_fkey FOREIGN KEY (id_grp) REFERENCES ingrid.groupe(id_grp);


--
-- Name: etudiant etudiant_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.etudiant
    ADD CONSTRAINT etudiant_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: evaluation evaluation_id_cours_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.evaluation
    ADD CONSTRAINT evaluation_id_cours_fkey FOREIGN KEY (id_cours) REFERENCES ingrid.cours(id_cours);


--
-- Name: evaluation evaluation_id_notif_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.evaluation
    ADD CONSTRAINT evaluation_id_notif_fkey FOREIGN KEY (id_notif) REFERENCES ingrid.notification(id_notif);


--
-- Name: formation_utilisateur formation_utilisateur_id_formation_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.formation_utilisateur
    ADD CONSTRAINT formation_utilisateur_id_formation_fkey FOREIGN KEY (id_formation) REFERENCES ingrid.formation(id_formation);


--
-- Name: formation_utilisateur formation_utilisateur_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.formation_utilisateur
    ADD CONSTRAINT formation_utilisateur_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: groupe_formation groupe_formation_id_formation_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.groupe_formation
    ADD CONSTRAINT groupe_formation_id_formation_fkey FOREIGN KEY (id_formation) REFERENCES ingrid.formation(id_formation);


--
-- Name: groupe_formation groupe_formation_id_grp_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.groupe_formation
    ADD CONSTRAINT groupe_formation_id_grp_fkey FOREIGN KEY (id_grp) REFERENCES ingrid.groupe(id_grp);


--
-- Name: message message_emetteur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.message
    ADD CONSTRAINT message_emetteur_fkey FOREIGN KEY (emetteur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: message message_recepteur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.message
    ADD CONSTRAINT message_recepteur_fkey FOREIGN KEY (recepteur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- Name: module_bloc_competence module_bloc_competence_id_bloc_comp_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.module_bloc_competence
    ADD CONSTRAINT module_bloc_competence_id_bloc_comp_fkey FOREIGN KEY (id_bloc_comp) REFERENCES ingrid.bloc_competence(id_bloc_comp);


--
-- Name: module_bloc_competence module_bloc_competence_id_module_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.module_bloc_competence
    ADD CONSTRAINT module_bloc_competence_id_module_fkey FOREIGN KEY (id_module) REFERENCES ingrid.module(id_module);


--
-- Name: notes notes_id_eval_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notes
    ADD CONSTRAINT notes_id_eval_fkey FOREIGN KEY (id_eval) REFERENCES ingrid.evaluation(id_eval);


--
-- Name: notes notes_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notes
    ADD CONSTRAINT notes_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.etudiant(id_utilisateur);


--
-- Name: notification notification_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.notification
    ADD CONSTRAINT notification_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.etudiant(id_utilisateur);


--
-- Name: utilisateurs_eav utilisateurs_eav_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: ingrid; Owner: postgres
--

ALTER TABLE ONLY ingrid.utilisateurs_eav
    ADD CONSTRAINT utilisateurs_eav_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES ingrid.utilisateur(id_utilisateur);


--
-- PostgreSQL database dump complete
--

