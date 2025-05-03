DROP FUNCTION IF EXISTS get_sheduled_post;

CREATE FUNCTION get_sheduled_post (
)
RETURNS json AS $body$
DECLARE
  lang text := 'ua';
  result record;
BEGIN
  SELECT
    p.id,
    jsonb_extract_path_text(p.content, lang) AS "content"
  FROM posts p
  WHERE
    p.scheduled_at <= NOW()
    AND p.sent_at IS NULL
    AND p.deleted_at IS NULL
  LIMIT 1
  INTO result;

  UPDATE posts
  SET sent_at = NOW()
  WHERE id = result.id;
    
  RETURN row_to_json(result)::jsonb;
END;
$body$
LANGUAGE plpgsql;
