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
-- Name: signalement; Type: TABLE; Schema: public; Owner: fannyshehabi
--

CREATE TABLE public.signalement (
    id integer NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    adresse text NOT NULL,
    date timestamp without time zone NOT NULL,
    description text NOT NULL,
    type text NOT NULL,
    "userId" integer NOT NULL
);

ALTER TABLE public.signalement OWNER TO postgres;

--
-- Name: signalement_id_seq; Type: SEQUENCE; Schema: public; Owner: fannyshehabi
--

CREATE SEQUENCE public.signalement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE;


ALTER TABLE public.signalement_id_seq OWNER TO postgres;

--
-- Name: signalement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fannyshehabi
--

ALTER SEQUENCE public.signalement_id_seq OWNED BY public.signalement.id;



--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: fannyshehabi
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
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
    NO MAXVALUE;


ALTER TABLE public.utilisateur_id_seq OWNER TO postgres;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fannyshehabi
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;

--
-- Name: signalement id; Type: DEFAULT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.signalement ALTER COLUMN id SET DEFAULT nextval('public.signalement_id_seq'::regclass);

--
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- Data for Name: accident; Type: TABLE DATA; Schema: public; Owner: fannyshehabi
--

COPY public.signalement (id, latitude, longitude, adresse, date, description, type, "userId") FROM stdin;
1	48.117266	-1.677792	Adresse 1, Rennes	2024-04-13 15:48:22.735205	Danger sur la rue principale.	Danger	1
2	48.117266	-1.677792	Adresse 2, Rennes	2024-04-13 15:48:45.405255	Accident sur la rue secondaire.	Accident	2
\.

--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: fannyshehabi
--

COPY public.utilisateur (id, email, mot_de_passe) FROM stdin;
1	utilisateur@example.com	motdepasse
2	utilisateur2@example.com	motdepasse
\.


--
-- Name: signalement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fannyshehabi
--

SELECT pg_catalog.setval('public.signalement_id_seq', 2, true);



--
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fannyshehabi
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 2, true);


--
-- Name: signalement signalement_pkey; Type: CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.signalement
    ADD CONSTRAINT signalement_pkey PRIMARY KEY (id);

--
-- Name: utilisateur PK_838f0f99fe900e49ef050030443; Type: CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);



--
-- Name: signalement signalement_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fannyshehabi
--

ALTER TABLE ONLY public.signalement
    ADD CONSTRAINT signalement_userId_fkey FOREIGN KEY ("userId") REFERENCES public.utilisateur(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: fannyshehabi
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
