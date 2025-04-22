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

CREATE TABLE "moon_phase" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" jsonb NOT NULL,
	"day_from" int NOT NULL,
	"day_to" int NOT NULL,
  "day_feature" jsonb NOT NULL,
  "description" jsonb NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	CONSTRAINT "moon_phase_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);