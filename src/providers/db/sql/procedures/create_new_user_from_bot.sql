DROP PROCEDURE IF EXISTS create_new_user_from_bot;

CREATE OR REPLACE procedure create_new_user_from_bot(
  in_user json
)
AS $body$
DECLARE
  telegram_id text;
  USER_ALREADY_EXISTS numeric := 10001;
BEGIN
  SELECT tg_id FROM users WHERE tg_id = (in_user->>'id')::text INTO telegram_id;

  IF telegram_id IS NOT NULL THEN
    RAISE EXCEPTION USING MESSAGE = json_build_object(
      'msg',
      'User already exist',
      'code',
      USER_ALREADY_EXISTS
    );
  END IF;

  INSERT INTO users (
    "tg_id",
    "tg_username",
    "tg_first_name",
    "tg_last_name",
    "lang"
  ) VALUES (
    (in_user->>'id')::text,
    (in_user->>'username')::text,
    (in_user->>'first_name')::text,
    (in_user->>'last_name')::text,
    (in_user->>'language_code')::text
  );

END;
$body$
LANGUAGE plpgsql;