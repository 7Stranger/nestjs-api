DROP FUNCTION IF EXISTS get_prompt_messages_for_post;

CREATE FUNCTION get_prompt_messages_for_post (
  in_moon_age float,
  in_moon_phase text
)
RETURNS jsonb AS $body$
DECLARE
  lang text := 'ua';
  result jsonb;
  BASIC_SYSTEM_PROMPT text;
  BASIC_USER_PROMPT_MOON_AGE text := 'Сьогодняшній місячний день: ';
  BASIC_USER_PROMPT_MOON_PHASE text := 'Фаза Місяця сьогодні: ';
  BASIC_USER_PROMPT_TODAY text := 'Сьогодняшня дата: ';
  rubric record;
  system_message_item record;
  user_message_item record;
BEGIN
  SELECT
    jsonb_extract_path_text(ps.content, lang)
  FROM prompts_system ps
  WHERE 
    ps.rubric_id IS NULL
  INTO BASIC_SYSTEM_PROMPT;

  SELECT
    r.id,
    CONCAT(r.emoji, ' ', jsonb_extract_path_text(r.title, lang)) AS "rubricTitle"
  FROM rubrics r
  WHERE r.id NOT IN (
    SELECT rubric_id
    FROM posts
    WHERE
      EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())
      AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())
      AND EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM NOW())
  )
  LIMIT 1
  INTO rubric;

  IF rubric.id IS NULL THEN
    RETURN NULL;
  END IF;

  result = jsonb_build_object('rubric', rubric);

  SELECT
    ps.id AS "id",
    'system' AS "role",
    CONCAT(
      BASIC_USER_PROMPT_TODAY, NOW()::date, '; ',
      BASIC_USER_PROMPT_MOON_AGE, in_moon_age, '; ',
      BASIC_USER_PROMPT_MOON_PHASE, in_moon_phase, '; ',
      BASIC_SYSTEM_PROMPT, '; ', jsonb_extract_path_text(ps.content, lang)
    ) AS "content"
  FROM rubrics r
  INNER JOIN prompts_system ps ON r.id = ps.rubric_id
  WHERE r.id = rubric.id
  INTO system_message_item;

  result = result || jsonb_build_object('system', to_jsonb(system_message_item));

  SELECT
    pu.id AS "id",
    'user' AS "role",
    jsonb_extract_path_text(pu.content, lang) AS "content"
  FROM prompts_user pu
  WHERE 
    pu.rubric_id = rubric.id
  LIMIT 1
  INTO user_message_item;
  
  result = result || jsonb_build_object('user', to_jsonb(user_message_item));
    
  RETURN result;
END;
$body$
LANGUAGE plpgsql;