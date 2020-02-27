/* Queries to get application based on some parameters */

/* Get applicants which are available at a specific date */
SELECT DISTINCT p.name, p.surname
FROM person as p, availability as a
WHERE p.person_id = a.person_id
AND '2014-05-26' BETWEEN a.from_date AND a.to_date
LIMIT 20 OFFSET 0

/* Get applicants based on their name */
SELECT DISTINCT p.name, p.surname
FROM person as p, availability as a
WHERE p.name = 'Per'
LIMIT 20 OFFSET 0

/* Get applicants based on their competence, for example korvgrillning */ 
SELECT DISTINCT p.name, p.surname
FROM person as p, competence as c, competence_profile as cp, availability as a
WHERE p.person_id = cp.person_id
AND cp.competence_id = c.competence_id
AND c.name = 'Korvgrillning'WHERE p.person_id = a.person_id
AND '2014-05-26' BETWEEN a.from_date AND a.to_dateWHERE p.person_id = a.person_id
AND '2014-05-26' BETWEEN a.from_date AND a.to_date
LIMIT 10 OFFSET 0