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

CREATE TABLE "rubrics" (
  "id" uuid DEFAULT gen_random_uuid(),
  
  "title" jsonb NOT NULL,
  "emoji" text NULL,
  "description" jsonb,

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,

  CONSTRAINT "rubrics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "prompts_system" (
  "id" uuid DEFAULT gen_random_uuid(),

  "rubric_id" uuid NULL,
  "content" jsonb NOT NULL,
  "style" text NULL, -- опционально: поетично, практично и т.п.

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,

  CONSTRAINT "prompts_system_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "prompts_user" (
  "id" uuid DEFAULT gen_random_uuid(),

  "rubric_id" uuid NULL,
  "content" jsonb NOT NULL,

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,

  CONSTRAINT "prompts_user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "posts" (
  "id" uuid DEFAULT gen_random_uuid(),

  "rubric_id" uuid NULL,
  "prompt_user_id" uuid,
  "prompt_system_id" uuid,

  "content" jsonb NOT NULL,
  "scheduled_at" TIMESTAMPTZ NOT NULL, -- когда пост должен выйти
  "sent_at" TIMESTAMPTZ, -- когда реально был отправлен

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ NULL DEFAULT NULL,

  CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "prompts_system" ADD CONSTRAINT "prompts_system_fk0" FOREIGN KEY ("rubric_id") REFERENCES "rubrics"("id");
ALTER TABLE "prompts_user" ADD CONSTRAINT "prompts_user_fk0" FOREIGN KEY ("rubric_id") REFERENCES "rubrics"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("rubric_id") REFERENCES "rubrics"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("prompt_user_id") REFERENCES "prompts_user"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk2" FOREIGN KEY ("prompt_system_id") REFERENCES "prompts_system"("id");