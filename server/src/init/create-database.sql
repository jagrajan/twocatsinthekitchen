BEGIN;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "unaccent";

  CREATE SCHEMA IF NOT EXISTS users;
  CREATE SCHEMA IF NOT EXISTS admin;
  CREATE SCHEMA IF NOT EXISTS cookbook;
  CREATE SCHEMA IF NOT EXISTS site;

  DROP TABLE IF EXISTS cookbook.browse_category_tag;
  DROP TABLE IF EXISTS cookbook.browse_category;
  DROP TABLE IF EXISTS site.browse_category_tag;
  DROP TABLE IF EXISTS site.browse_category;

  DROP TABLE IF EXISTS cookbook.measured_ingredient;
  DROP TABLE IF EXISTS cookbook.recipe_note;
  DROP TABLE IF EXISTS cookbook.recipe_step;
  DROP TABLE IF EXISTS cookbook.recipe_release;
  DROP TABLE IF EXISTS cookbook.recipe_version;
  DROP TABLE IF EXISTS cookbook.ingredient;
  DROP TABLE IF EXISTS cookbook.recipe_tag;
  DROP TABLE IF EXISTS cookbook.tag;
  DROP TABLE IF EXISTS cookbook.ingredient_category;
  DROP TABLE IF EXISTS cookbook.unit;
  DROP TABLE IF EXISTS cookbook.recipe;
  DROP TABLE IF EXISTS cookbook.admin;
  DROP TABLE IF EXISTS cookbook.auth_key;
  DROP TABLE IF EXISTS cookbook.profile;
  DROP TABLE IF EXISTS admin.admin;
  DROP TABLE IF EXISTS users.auth_key;
  DROP TABLE IF EXISTS users.profile;

  CREATE OR REPLACE FUNCTION update_last_update() RETURNS TRIGGER
  LANGUAGE plpgsql
  AS
  $$
  BEGIN
    NEW.last_update = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$;

  CREATE TABLE cookbook.profile (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    email       TEXT                                        NOT NULL UNIQUE,
    password    TEXT                                        NOT NULL,
    avatar      TEXT,
    name        TEXT
  );

  CREATE TABLE cookbook.auth_key (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id     UUID                                        NOT NULL REFERENCES cookbook.profile(id),
    expire_on   TIMESTAMP WITHOUT TIME ZONE                 NOT NULL,
    admin       BOOLEAN DEFAULT false
  );

  CREATE TABLE cookbook.admin (
    user_id     UUID PRIMARY KEY                            NOT NULL REFERENCES cookbook.profile(id),
    expire_on   TIMESTAMP WITHOUT TIME ZONE,
    master      BOOLEAN DEFAULT false
  );

  CREATE TABLE cookbook.unit (
    id      SERIAL PRIMARY KEY  NOT NULL,
    name    TEXT UNIQUE,
    plural  TEXT
  );

  CREATE TABLE cookbook.ingredient_category (
    id    SERIAL PRIMARY KEY  NOT NULL,
    name  TEXT                NOT NULL
  );

  CREATE TABLE cookbook.ingredient (
    id        SERIAL PRIMARY KEY  NOT NULL,
    name      TEXT                UNIQUE NOT NULL,
    plural    TEXT,
    unit      INTEGER             REFERENCES cookbook.unit(id),
    category  INTEGER             REFERENCES cookbook.ingredient_category(id)
  );

  CREATE TABLE cookbook.recipe (
    id  SERIAL PRIMARY KEY  NOT NULL
  );

  CREATE TABLE cookbook.recipe_version (
    id                    SERIAL PRIMARY KEY,
    name                  TEXT,
    description           TEXT,
    introduction          TEXT,
    compiled_introduction TEXT,
    image_file            TEXT,
    cook_time             TEXT,
    prep_time             TEXT,
    serves                INTEGER,
    version               INTEGER             NOT NULL,
    slug                  TEXT,
    recipe_id             INTEGER REFERENCES cookbook.recipe(id)
  );

  CREATE TABLE cookbook.recipe_release (
    recipe_id         INTEGER PRIMARY KEY REFERENCES cookbook.recipe(id),
    released_version  INTEGER REFERENCES cookbook.recipe_version(id),
    latest_version    INTEGER REFERENCES cookbook.recipe_version(id)
  );

  CREATE TABLE cookbook.tag (
    id    SERIAL PRIMARY KEY  NOT NULL,
    text  TEXT                NOT NULL
  );

  CREATE TABLE cookbook.recipe_tag (
    recipe_id INTEGER,
    tag_id    INTEGER,
    PRIMARY KEY(recipe_id, tag_id)
  );

  CREATE TABLE cookbook.recipe_step (
    id                    SERIAL PRIMARY KEY,
    recipe_version_id     INTEGER             NOT NULL REFERENCES cookbook.recipe_version(id),
    position              INTEGER             NOT NULL,
    description           TEXT                NOT NULL
  );

  CREATE TABLE cookbook.measured_ingredient (
    id                  SERIAL PRIMARY KEY,
    min_amount          TEXT                  NOT NULL,
    max_amount          TEXT                  NOT NULL,
    position            INTEGER               NOT NULL,
    ingredient_id       INTEGER               NOT NULL REFERENCES cookbook.ingredient(id),
    recipe_version_id   INTEGER               NOT NULL REFERENCES cookbook.recipe_version(id),
    unit_id             INTEGER               NOT NULL REFERENCES cookbook.unit(id)
  );

  CREATE TABLE cookbook.recipe_note (
    id                SERIAL PRIMARY KEY,
    position          INTEGER,
    recipe_id         INTEGER               REFERENCES cookbook.recipe(id),
    recipe_version_id INTEGER               REFERENCES cookbook.recipe_version(id),
    user_id           UUID,
    global            BOOLEAN,
    text              TEXT                  NOT NULL
  );

  CREATE TABLE cookbook.browse_category (
    id    SERIAL PRIMARY KEY,
    name  TEXT
  );

  CREATE TABLE cookbook.browse_category_tag (
    id                  SERIAL PRIMARY KEY,
    browse_category_id  INTEGER,
    tag_id              INTEGER
  );

  DO $$
    DECLARE
      t record;
    BEGIN
      FOR t IN
        SELECT * FROM pg_tables
        WHERE schemaname IN ('admin', 'users', 'cookbook')
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ' ||
          'ADD COLUMN create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW();',
          t.schemaname, t.tablename);

        EXECUTE format('ALTER TABLE %I.%I ' ||
          'ADD COLUMN last_update TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW();',
          t.schemaname, t.tablename);

        EXECUTE format('CREATE TRIGGER update_last_update
                        BEFORE UPDATE ON %I.%I
                        FOR EACH ROW EXECUTE PROCEDURE update_last_update()',
                        t.schemaname, t.tablename);
      END LOOP;
    END;
  $$ LANGUAGE plpgsql;

COMMIT;
