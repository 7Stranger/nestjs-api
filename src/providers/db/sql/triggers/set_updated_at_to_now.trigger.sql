DROP FUNCTION IF EXISTS set_updated_at_to_now CASCADE;

CREATE FUNCTION set_updated_at_to_now() RETURNS TRIGGER AS $body$
  BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
  END;
$body$ LANGUAGE plpgsql;