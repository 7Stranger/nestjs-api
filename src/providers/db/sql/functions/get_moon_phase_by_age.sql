DROP FUNCTION IF EXISTS get_moon_phase_by_age;

CREATE FUNCTION get_moon_phase_by_age (
  in_moon_age numeric
)
RETURNS json AS $body$
DECLARE
  lang text := 'ua';
  result record;
BEGIN
  SELECT
    mp.id,
    jsonb_extract_path_text(mp.name, lang) AS "name",
    mp.day_from AS "dayFrom",
    mp.day_to AS "dayTo",
    jsonb_extract_path_text(mp.day_feature, lang) AS "dayFeature",
    jsonb_extract_path_text(mp.description, lang) AS "description"
  FROM moon_phase mp
  WHERE
    mp.day_from <= in_moon_age
    AND mp.day_to >= in_moon_age
  LIMIT 1
  INTO result;
    
  RETURN row_to_json(result)::jsonb;
END;
$body$
LANGUAGE plpgsql;
