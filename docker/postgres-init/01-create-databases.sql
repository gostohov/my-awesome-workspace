CREATE DATABASE my_awesome_workspace_db;
CREATE USER my_awesome_workspace_user WITH ENCRYPTED PASSWORD 'P3v$Za9QmJt@c2Rr8nXe!dFy6KuB4sHg';
GRANT ALL PRIVILEGES ON DATABASE my_awesome_workspace_db TO my_awesome_workspace_user;

\connect my_awesome_workspace_db;

ALTER SCHEMA public OWNER TO my_awesome_workspace_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO my_awesome_workspace_user;