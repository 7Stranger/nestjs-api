DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "users" (
	"id" uuid DEFAULT gen_random_uuid(),
  "first_name" text NULL,
  "last_name" text NULL,
	"telegram_id" text NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);