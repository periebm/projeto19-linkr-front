--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.2

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

ALTER TABLE IF EXISTS ONLY public.trending_posts DROP CONSTRAINT IF EXISTS trending_posts_trending_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trending_posts DROP CONSTRAINT IF EXISTS trending_posts_post_id_fkey;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_post_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trending_posts DROP CONSTRAINT IF EXISTS fk_trending_posts_trending_id;
ALTER TABLE IF EXISTS ONLY public.trending_posts DROP CONSTRAINT IF EXISTS fk_trending_posts_post_id;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS fk_likes_user_id;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS fk_likes_post_id;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.trendings DROP CONSTRAINT IF EXISTS trendings_pkey;
ALTER TABLE IF EXISTS ONLY public.trending_posts DROP CONSTRAINT IF EXISTS trending_posts_pkey;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_pkey;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.trendings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.trending_posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.likes ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.trendings_id_seq;
DROP TABLE IF EXISTS public.trendings;
DROP SEQUENCE IF EXISTS public.trending_posts_id_seq;
DROP TABLE IF EXISTS public.trending_posts;
DROP SEQUENCE IF EXISTS public.posts_id_seq;
DROP TABLE IF EXISTS public.posts;
DROP SEQUENCE IF EXISTS public.likes_id_seq;
DROP TABLE IF EXISTS public.likes;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: trending_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trending_posts (
    id integer NOT NULL,
    trending_id integer NOT NULL,
    post_id integer NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: trending_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.trending_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: trending_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.trending_posts_id_seq OWNED BY public.trending_posts.id;


--
-- Name: trendings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trendings (
    id integer NOT NULL,
    name text NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: trendings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.trendings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: trendings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.trendings_id_seq OWNED BY public.trendings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    picture_url text NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: trending_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts ALTER COLUMN id SET DEFAULT nextval('public.trending_posts_id_seq'::regclass);


--
-- Name: trendings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trendings ALTER COLUMN id SET DEFAULT nextval('public.trendings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (1, 1, 2, '2023-05-30 17:04:17.048111');
INSERT INTO public.likes VALUES (2, 2, 3, '2023-05-30 17:04:17.048111');
INSERT INTO public.likes VALUES (3, 3, 1, '2023-05-30 17:04:17.048111');
INSERT INTO public.likes VALUES (4, 1, 3, '2023-06-02 18:15:48.738719');
INSERT INTO public.likes VALUES (5, 2, 3, '2023-06-02 18:16:31.675404');
INSERT INTO public.likes VALUES (8, 12, 8, '2023-06-02 21:37:28.57283');
INSERT INTO public.likes VALUES (9, 1, 7, '2023-06-02 21:46:38.450333');
INSERT INTO public.likes VALUES (10, 1, 6, '2023-06-02 21:46:50.821637');
INSERT INTO public.likes VALUES (11, 1, 4, '2023-06-02 21:48:29.499121');
INSERT INTO public.likes VALUES (12, 3, 3, '2023-06-02 21:50:48.96877');
INSERT INTO public.likes VALUES (13, 1, 1, '2023-06-02 21:50:58.516881');
INSERT INTO public.likes VALUES (14, 2, 2, '2023-06-02 21:51:24.864095');
INSERT INTO public.likes VALUES (94, 13, 6, '2023-06-03 20:52:16.862411');
INSERT INTO public.likes VALUES (103, 13, 9, '2023-06-03 21:06:57.921886');
INSERT INTO public.likes VALUES (106, 13, 11, '2023-06-03 21:23:16.156144');
INSERT INTO public.likes VALUES (109, 13, 7, '2023-06-03 21:34:19.007199');
INSERT INTO public.likes VALUES (110, 10, 9, '2023-06-04 17:53:40.269377');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 1, 'Chequem meu novo projeto feito com #React', 'https://www.youtube.com/watch?v=XVtxye3c4AU', '2023-05-30 17:04:17.048111');
INSERT INTO public.posts VALUES (6, 1, 'pulls do nosso projeto', 'https://github.com/periebm/projeto19-linkr-back/pulls', '2023-06-01 03:36:28.318282');
INSERT INTO public.posts VALUES (2, 2, 'Post 2', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-05-30 17:04:17.048111');
INSERT INTO public.posts VALUES (3, 3, 'Post 3', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-05-30 17:04:17.048111');
INSERT INTO public.posts VALUES (4, 1, 'Novo post', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-05-30 21:15:34.544883');
INSERT INTO public.posts VALUES (9, 13, 'aquela url tava bugada, agora a profile picture foi', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-06-01 04:46:10.101344');
INSERT INTO public.posts VALUES (7, 1, 'chat gpt eh top', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-06-01 04:32:02.712138');
INSERT INTO public.posts VALUES (8, 12, 'queria que essa url fosse minha profile picture, mas nao aparece :(', 'https://www.npmjs.com/package/@dhaiwat10/react-link-preview', '2023-06-01 04:44:33.068254');
INSERT INTO public.posts VALUES (11, 13, 'figma do projeto', 'https://www.figma.com/file/EzaDbiWc5y0qb8idmXQt0V/linkr-T4?type=design&node-id=7-37&t=KvKFSiw6r4g2Nhsm-0', '2023-06-01 21:29:54.181881');


--
-- Data for Name: trending_posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.trending_posts VALUES (1, 1, 1, '2023-05-30 17:04:17.048111');
INSERT INTO public.trending_posts VALUES (2, 2, 2, '2023-05-30 17:04:17.048111');
INSERT INTO public.trending_posts VALUES (3, 3, 3, '2023-05-30 17:04:17.048111');


--
-- Data for Name: trendings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.trendings VALUES (1, 'Trending 1', '2023-05-30 17:04:17.048111');
INSERT INTO public.trendings VALUES (2, 'Trending 2', '2023-05-30 17:04:17.048111');
INSERT INTO public.trendings VALUES (3, 'Trending 3', '2023-05-30 17:04:17.048111');
INSERT INTO public.trendings VALUES (4, 'javascript', '2023-06-03 03:38:14.95068');
INSERT INTO public.trendings VALUES (5, 'narutinho', '2023-06-03 04:43:53.991341');
INSERT INTO public.trendings VALUES (6, 'javascript', '2023-06-04 18:21:03.95204');
INSERT INTO public.trendings VALUES (7, 'javascript', '2023-06-04 21:09:17.828053');
INSERT INTO public.trendings VALUES (8, 'teste1', '2023-06-04 21:09:18.266011');
INSERT INTO public.trendings VALUES (9, 'javascript', '2023-06-04 21:15:43.59435');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (4, 'joaozinho@ao.com', '$2b$10$Qp0Nb2WioDmPxJ3PcgQ6TuzzrQjLL7XIyBP4/ild4mQt8fEKBf5RC', 'Joao Amongus', 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec', '2023-06-01 00:07:23.728057');
INSERT INTO public.users VALUES (5, 'joao.silva@example.com', '$2b$10$lyV65kWiTT2x5f38FXaWCu6fzJDBfVT19Qhj/nfkWmLu3Xf8TGKUC', 'Jo├úo Silva', 'https://miro.medium.com/v2/resize:fit:1200/1*Hc29OtYwzC5N8CcBRs8VRw.jpeg', '2023-06-01 00:10:29.557463');
INSERT INTO public.users VALUES (6, 'maria.souza@example.com', '$2b$10$vB/VdupqQV69ZukhzoJwr.ET8Hnc1Ga8YbmnSzlL62Qau.F6KjU96', 'Maria Souza', 'https://play.nintendo.com/images/Masthead_Peach.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png', '2023-06-01 00:11:16.668069');
INSERT INTO public.users VALUES (7, 'pedro.santos@example.com', '$2b$10$5geGwFw90MTE8b/hz.bY9u.fpiFAwMvZr2bstWMWGWLSSc.0.zb5q', 'Pedro Santos', 'https://akamai.sscdn.co/uploadfile/letras/fotos/0/c/1/d/0c1d633da5635b5751f26120cb015907.jpg', '2023-06-01 00:11:51.868267');
INSERT INTO public.users VALUES (8, 'ana.oliveira@example.com', '$2b$10$wGBVlw7/P74qAusg5fyI1eYXcg7FyGK0NTyyaZ3iWkBj6u1R1cFfe', 'Ana Oliveira', 'https://super.abril.com.br/wp-content/uploads/2019/07/bateria.png?w=1024', '2023-06-01 00:12:27.224099');
INSERT INTO public.users VALUES (10, 'o@o.com', '$2b$10$EYnqgJz7IKiyrilkDI52V.XohWFtkmWIRCmKFzD3/ecJmR2daFSum', 'Otakinho Esquisito', 'https://pbs.twimg.com/media/FnGHdTbacAA1rF0?format=jpg&name=large', '2023-06-01 00:13:25.75002');
INSERT INTO public.users VALUES (11, 'kratos@email.com', '$2b$10$B4g7skFDGdCOn/6iOgOj6uN0YJO1KD8Vwo74RCsGqRu48Sd8bgmZi', 'Kratos', 'https://static.wikia.nocookie.net/godofwar/images/2/2a/Kratos_GOW18.jpg/revision/latest?cb=20180501201256&path-prefix=pt-br', '2023-06-01 03:54:45.197835');
INSERT INTO public.users VALUES (12, 'realkratos@email.com', '$2b$10$t1ed.XDSeGKi1hY675gV6OdHnU1CtHqDtNcjrY3KZqQsiqGC4L6CK', 'kratos', 'https://static.wikia.nocookie.net/godofwar/images/2/2a/Kratos_GOW18.jpg/revision/latest?cb=20180501201256&path-prefix=pt-br', '2023-06-01 04:39:42.484535');
INSERT INTO public.users VALUES (13, 'realkratos2@email.com', '$2b$10$CUGHJ/NiQwIwTuuTs2ihL.lLfE9zfwjy1Dw03rnXxCTeHeCLjiQ7O', 'kratos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-vFZ5GFlU_T2CeOFkQHUeO_LhGbdzaU1XA&usqp=CAU', '2023-06-01 04:45:44.498214');
INSERT INTO public.users VALUES (1, 'user1@example.com', 'senha123', 'Maur├¡cio', 'https://example.com/user1.jpg', '2023-05-30 17:04:17.048111');
INSERT INTO public.users VALUES (2, 'user2@example.com', 'senha456', 'P├®ricles', 'https://example.com/user2.jpg', '2023-05-30 17:04:17.048111');
INSERT INTO public.users VALUES (3, 'user3@example.com', 'senha789', 'Guilherme', 'https://example.com/user3.jpg', '2023-05-30 17:04:17.048111');
INSERT INTO public.users VALUES (14, 'teste@teste.com', '$2b$10$FBU8jUCHy9.DoKRMEQm0Neur1R4k/4cKPxemcKsgkrj2ZAgfvdfXe', 'teste', 'https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000', '2023-06-02 22:25:50.226426');
INSERT INTO public.users VALUES (15, 'a@a.com', '$2b$10$SMPL5Bz4FdNcispLWFR1Ne2SEexfvRZzkeDDptTni5ZbDZWnnHH1a', 'nodezinho', 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png', '2023-06-03 04:54:58.433773');


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 112, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 32, true);


--
-- Name: trending_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trending_posts_id_seq', 9, true);


--
-- Name: trendings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trendings_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: trending_posts trending_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts
    ADD CONSTRAINT trending_posts_pkey PRIMARY KEY (id);


--
-- Name: trendings trendings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trendings
    ADD CONSTRAINT trendings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likes fk_likes_post_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_likes_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes fk_likes_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_likes_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: trending_posts fk_trending_posts_post_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts
    ADD CONSTRAINT fk_trending_posts_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: trending_posts fk_trending_posts_trending_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts
    ADD CONSTRAINT fk_trending_posts_trending_id FOREIGN KEY (trending_id) REFERENCES public.trendings(id) ON DELETE CASCADE;


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: trending_posts trending_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts
    ADD CONSTRAINT trending_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: trending_posts trending_posts_trending_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trending_posts
    ADD CONSTRAINT trending_posts_trending_id_fkey FOREIGN KEY (trending_id) REFERENCES public.trendings(id);


--
-- PostgreSQL database dump complete
--

