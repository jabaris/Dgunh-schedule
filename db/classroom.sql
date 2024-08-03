-- Set session variables (MySQL does not have direct equivalents for all PostgreSQL settings)
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
SET SESSION character_set_client = 'utf8';
SET SESSION character_set_results = 'utf8';
SET SESSION character_set_connection = 'utf8';

-- Create the classroom table
CREATE TABLE classroom (
    id INT NOT NULL,
    building INT NOT NULL,
    floor INT NOT NULL,
    num INT NOT NULL,
    capacity INT,
    PRIMARY KEY (id)  -- Define the primary key constraint directly in the table creation
) ENGINE=InnoDB;  -- Use InnoDB as the default storage engine

-- Insert data into the classroom table
INSERT INTO classroom (id, building, floor, num, capacity) VALUES
(1, 2, 4, 10, 40),
(2, 2, 3, 6, 20),
(3, 2, 3, 4, 80),
(4, 2, 2, 6, 20),
(5, 5, 3, 4, 20);
