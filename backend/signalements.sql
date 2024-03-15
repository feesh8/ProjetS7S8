--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Homebrew)
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: fannyshehabi
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accident; Type: TABLE; Schema: public; Owner: fannyshehabi
--

CREATE TABLE public.accident (
    id integer NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    date timestamp without time zone NOT NULL,
    description character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.accident OWNER TO postgres;

--
-- Name: accident_id_seq; Type: SEQUENCE; Schema: public; Owner: fannyshehabi
--

CREATE SEQUENCE public.accident_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accident_id_seq OWNER TO postgres;

--
-- Name: accident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fannyshehabi
--

ALTER SEQUENCE public.accident_id_seq OWNED BY public.accident.id;


--
-- Name: dangerous_zone; Type: TABLE; Schema: public; Owner: fannyshehabi
--

CREATE TABLE public.dangerous_zone (
    id integer NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    description character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.dangerous_zone OWNER TO postgres;

--
-- Name: dangerous_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: fannyshehabi
--

CREATE SEQUENCE public.dangerous_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dangerous_zone_id_seq OWNER TO postgres;

--
-- Name: dangerous_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fannyshehabi
--

ALTER SEQUENCE public.dangerous_zone_id_seq OWNED BY public.dangerous_zone.id;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: fannyshehabi
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    mot_de_passe character varying NOT NULL
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: fannyshehabi
--

CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO postgres;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fannyshehabi
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- Name: accident id; Type: DEFAULT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.accident ALTER COLUMN id SET DEFAULT nextval('public.accident_id_seq'::regclass);


--
-- Name: dangerous_zone id; Type: DEFAULT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.dangerous_zone ALTER COLUMN id SET DEFAULT nextval('public.dangerous_zone_id_seq'::regclass);


--
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- Data for Name: accident; Type: TABLE DATA; Schema: public; Owner: fannyshehabi
--

COPY public.accident (id, latitude, longitude, date, description, "userId") FROM stdin;
1	48	-2	2024-01-14 00:00:00	Accident description 1	1
2	48	-2	2024-01-15 00:00:00	Accident description 2	2
\.


--
-- Data for Name: dangerous_zone; Type: TABLE DATA; Schema: public; Owner: fannyshehabi
--

COPY public.dangerous_zone (id, latitude, longitude, description, "userId") FROM stdin;
1	48	-2	Description de la zone dangereuse 3	2
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: fannyshehabi
--

COPY public.utilisateur (id, username, email, mot_de_passe) FROM stdin;
1	BonJean	utilisateur@example.com	motdepasse
2	CrocheSarah	utilisateur2@example.com	motdepasse
\.


--
-- Name: accident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fannyshehabi
--

SELECT pg_catalog.setval('public.accident_id_seq', 2, true);


--
-- Name: dangerous_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fannyshehabi
--

SELECT pg_catalog.setval('public.dangerous_zone_id_seq', 1, true);


--
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fannyshehabi
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 2, true);


--
-- Name: dangerous_zone PK_0c20903edaf01cadea34c0737d3; Type: CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.dangerous_zone
    ADD CONSTRAINT "PK_0c20903edaf01cadea34c0737d3" PRIMARY KEY (id);


--
-- Name: accident PK_1abf08fec006d2a8348dc6f0d7f; Type: CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.accident
    ADD CONSTRAINT "PK_1abf08fec006d2a8348dc6f0d7f" PRIMARY KEY (id);


--
-- Name: utilisateur PK_838f0f99fe900e49ef050030443; Type: CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT "PK_838f0f99fe900e49ef050030443" PRIMARY KEY (id);


--
-- Name: dangerous_zone FK_01a835d239a4125087401315ca3; Type: FK CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.dangerous_zone
    ADD CONSTRAINT "FK_01a835d239a4125087401315ca3" FOREIGN KEY ("userId") REFERENCES public.utilisateur(id);


--
-- Name: accident FK_a3c8008bb571ff6f95ea564eda2; Type: FK CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.accident
    ADD CONSTRAINT "FK_a3c8008bb571ff6f95ea564eda2" FOREIGN KEY ("userId") REFERENCES public.utilisateur(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: fannyshehabi
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

