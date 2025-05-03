DROP PROCEDURE IF EXISTS create_new_post;

CREATE OR REPLACE procedure create_new_post(
  in_rubric_id uuid,
  in_prompt_user_id uuid,
  in_prompt_system_id uuid,
  in_content_ua text
)
AS $body$
DECLARE
  exited_post_id uuid;
BEGIN
  UPDATE posts
  SET deleted_at = NOW()
  WHERE created_at <= NOW() - INTERVAL '12 hours';

  SELECT id
  FROM posts p
  WHERE
    p.rubric_id = in_rubric_id
    AND p.prompt_user_id = in_prompt_user_id
    AND p.prompt_system_id = in_prompt_system_id
    AND EXTRACT(YEAR FROM p.created_at) = EXTRACT(YEAR FROM NOW())
    AND EXTRACT(MONTH FROM p.created_at) = EXTRACT(MONTH FROM NOW())
    AND EXTRACT(DAY FROM p.created_at) = EXTRACT(DAY FROM NOW())
  INTO exited_post_id;

  IF exited_post_id IS NOT NULL THEN
    RAISE EXCEPTION 'Post already exists with id %', exited_post_id;
  END IF;

  INSERT INTO posts (
    rubric_id,
    prompt_user_id,
    prompt_system_id,
    content,
    scheduled_at
  ) VALUES (
    in_rubric_id,
    in_prompt_user_id,
    in_prompt_system_id,
    jsonb_build_object('ua', in_content_ua),
    NOW()
  );
END;
$body$
LANGUAGE plpgsql;