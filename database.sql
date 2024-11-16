CREATE TABLE voter (
    voter_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  --this has to be hashed
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role VARCHAR(50) CHECK (role IN ('voter', 'admin')) DEFAULT 'voter',
    adhar_no VARCHAR(12) UNIQUE,  -- Aadhar number (Unique identifier)  this has to be hashed
    dob DATE NOT NULL,  -- Date of birth for age verification
    gender VARCHAR(10),  -- Gender (optional for data collection)
    address TEXT,  -- Residential address (for verification)
    phone_number VARCHAR(15),  -- Contact number
    father_name VARCHAR(255),  -- Father's name
    mother_name VARCHAR(255),  -- Mother's name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE elections (
    election_id SERIAL PRIMARY KEY,
    election_type VARCHAR(100) CHECK (election_type IN ('general', 'by-election', 'state', 'local')) NOT NULL,
    name VARCHAR(255) NOT NULL,  -- Election name (e.g., "General Election 2024")
    description TEXT,  -- Description of the election
    start_date TIMESTAMP NOT NULL,  -- Election start date
    end_date TIMESTAMP NOT NULL,  -- Election end date
    status VARCHAR(50) CHECK (status IN ('pending', 'active', 'completed')) DEFAULT 'pending',  -- Current status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
    candidate_id SERIAL PRIMARY KEY,
    election_id INT NOT NULL,
    voter_id INT NOT NULL,
    party_name VARCHAR(255),
    manifesto TEXT,  -- Candidate's manifesto
    adhar_no VARCHAR(12) UNIQUE,  -- Aadhar number of the candidate (to avoid duplication)
    votes INT DEFAULT 0,  -- Vote count for the candidate
    FOREIGN KEY (election_id) REFERENCES elections(election_id) ON DELETE CASCADE,
    FOREIGN KEY (voter_id) REFERENCES voter(voter_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    voter_id INT NOT NULL,  -- Voter ID
    candidate_id INT NOT NULL,  -- Candidate ID being voted for
    election_id INT NOT NULL,  -- Election ID
    vote_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when vote is cast
    FOREIGN KEY (voter_id) REFERENCES voter(voter_id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id) ON DELETE CASCADE,
    FOREIGN KEY (election_id) REFERENCES elections(election_id) ON DELETE CASCADE,
    CONSTRAINT unique_vote UNIQUE (user_id, election_id)  -- A voter can only vote once per election
);

CREATE TABLE voter_eligibility (
    eligibility_id SERIAL PRIMARY KEY,
    voter_id INT NOT NULL,  -- Voter ID
    is_eligible BOOLEAN DEFAULT TRUE,  -- Eligibility status
    nationality VARCHAR(50) CHECK (nationality = 'Indian'),  -- Only Indian citizens are eligible
    age INT NOT NULL,  -- Age of the voter
    address_proof BOOLEAN DEFAULT FALSE,  -- Whether the address is verified
    nationality_proof BOOLEAN DEFAULT FALSE,  -- Whether nationality is verified
    FOREIGN KEY (voter_id) REFERENCES voter(voter_id) ON DELETE CASCADE
);
