CREATE DATABASE IF NOT EXISTS adoptions;

USE adoptions;

CREATE TABLE IF NOT EXISTS adoptions (
    id_adoption INT AUTO_INCREMENT PRIMARY KEY,
    id_pet INT,
    id_user INT,
    location VARCHAR(255),
    formalizationDate DATE,
    id_foundation INT,|
    successfully BOOLEAN
);

DESCRIBE adoptions;