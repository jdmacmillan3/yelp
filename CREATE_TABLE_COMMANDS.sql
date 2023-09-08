-- Table: public.restaurants

-- DROP TABLE IF EXISTS public.restaurants;

CREATE TABLE IF NOT EXISTS public.restaurants
(
    id bigint NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    location character varying(50) COLLATE pg_catalog."default" NOT NULL,
    price_range integer NOT NULL,
    cuisine character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT restaurants_pkey PRIMARY KEY (id),
    CONSTRAINT restaurants_price_range_check CHECK (price_range >= 1 AND price_range <= 5)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.restaurants
    OWNER to postgres;

    -- Table: public.reviews

-- DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    id bigint NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
    restaurant_id bigint NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    review text COLLATE pg_catalog."default" NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id)
        REFERENCES public.restaurants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT reviews_rating_check CHECK (rating >= 1 AND rating <= 5)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to postgres;