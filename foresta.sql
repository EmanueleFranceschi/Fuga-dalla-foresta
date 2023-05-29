drop database if exists forestadb;
Create database forestadb;
use forestadb;

CREATE TABLE giocatore (
  id int NOT NULL AUTO_INCREMENT,
  nome_utente varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  PRIMARY KEY (id) 
);
CREATE TABLE classifica (
  id int NOT NULL AUTO_INCREMENT,
  id_giocatore int NOT NULL,
  tempo_impiegato time NOT NULL,
  morti int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_giocatore) REFERENCES giocatore(id)
); 