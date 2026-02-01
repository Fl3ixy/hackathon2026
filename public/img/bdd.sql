SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS achat;
DROP TABLE IF EXISTS recompense;
DROP TABLE IF EXISTS evenement;
DROP TABLE IF EXISTS demande;
DROP TABLE IF EXISTS benevole;
DROP TABLE IF EXISTS demandeur;
DROP TABLE IF EXISTS utilisateur;
DROP TABLE IF EXISTS categorie;

SET FOREIGN_KEY_CHECKS = 1;

/* =========================================================
   Paramètres uniformes (important pour compatibilité FK)
   ========================================================= */

CREATE TABLE categorie (
  id      CHAR(6) NOT NULL,
  libelle VARCHAR(30) NOT NULL,
  CONSTRAINT pk_categorie PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE utilisateur (
  id       CHAR(6) NOT NULL,
  nom      VARCHAR(50) NOT NULL,
  prenom   VARCHAR(50) NOT NULL,
  age      SMALLINT NULL,
  idCateg  CHAR(6) NOT NULL,
  identifiant CHAR(6) NOT NULL,
  motDePasse VARCHAR(50) NOT NULL,

  CONSTRAINT pk_utilisateur PRIMARY KEY (id),
  INDEX idx_utilisateur_idCateg (idCateg),
  CONSTRAINT fk_utilisateur_categorie
    FOREIGN KEY (idCateg) REFERENCES categorie(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE demandeur (
  id            CHAR(6) NOT NULL,
  idUtilisateur CHAR(6) NOT NULL,

  CONSTRAINT pk_demandeur PRIMARY KEY (id),
  CONSTRAINT uk_demandeur_idUtilisateur UNIQUE (idUtilisateur),
  INDEX idx_demandeur_idUtilisateur (idUtilisateur),

  CONSTRAINT fk_demandeur_utilisateur
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateur(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE benevole (
  id            CHAR(6) NOT NULL,
  idUtilisateur CHAR(6) NOT NULL,
  points        INT NOT NULL DEFAULT 0,

  CONSTRAINT pk_benevole PRIMARY KEY (id),
  CONSTRAINT uk_benevole_idUtilisateur UNIQUE (idUtilisateur),
  INDEX idx_benevole_idUtilisateur (idUtilisateur),

  CONSTRAINT fk_benevole_utilisateur
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateur(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/* demandes = besoins postés par les demandeurs */
CREATE TABLE demande (
  id           CHAR(6) NOT NULL,
  idDemandeur  CHAR(6) NOT NULL,
  titre        VARCHAR(80) NOT NULL,
  description  VARCHAR(255) NULL,
  dateCreation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dateDebut TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dateFin TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  statut       VARCHAR(20) NOT NULL DEFAULT 'OUVERTE',

  CONSTRAINT pk_demande PRIMARY KEY (id),
  INDEX idx_demande_idDemandeur (idDemandeur),

  CONSTRAINT fk_demande_demandeur
    FOREIGN KEY (idDemandeur) REFERENCES demandeur(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/* evenement = ex-mission (créée par bénévole, liée à un demandeur, points gagnés) */
CREATE TABLE evenement (
  id           CHAR(6) NOT NULL,
  demandeur    CHAR(6) NOT NULL,
  benevole     CHAR(6) NOT NULL,
  pointsGagnes INT NOT NULL DEFAULT 0,
  terminee     TINYINT(1) NOT NULL DEFAULT 0,

  CONSTRAINT pk_evenement PRIMARY KEY (id),

  INDEX idx_evenement_demandeur (demandeur),
  INDEX idx_evenement_benevole (benevole),

  CONSTRAINT fk_evenement_demandeur
    FOREIGN KEY (demandeur) REFERENCES demandeur(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_evenement_benevole
    FOREIGN KEY (benevole) REFERENCES benevole(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/* boutique = recompenses */
CREATE TABLE recompense (
  id          CHAR(6) NOT NULL,
  nom         VARCHAR(60) NOT NULL,
  coutPoints  INT NOT NULL,
  stock       INT NULL,
  description VARCHAR(255) NULL,

  CONSTRAINT pk_recompense PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/* historique des achats */
CREATE TABLE achat (
  id           CHAR(6) NOT NULL,
  idBenevole   CHAR(6) NOT NULL,
  idRecompense CHAR(6) NOT NULL,
  quantite     INT NOT NULL DEFAULT 1,
  dateAchat    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_achat PRIMARY KEY (id),

  INDEX idx_achat_idBenevole (idBenevole),
  INDEX idx_achat_idRecompense (idRecompense),

  CONSTRAINT fk_achat_benevole
    FOREIGN KEY (idBenevole) REFERENCES benevole(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_achat_recompense
    FOREIGN KEY (idRecompense) REFERENCES recompense(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;