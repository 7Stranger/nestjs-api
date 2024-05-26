DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"tg_id" text NULL,
	"tg_username" text NULL,
  "tg_first_name" text NULL,
  "tg_last_name" text NULL,
  "lang" varchar (5) DEFAULT 'en',
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);