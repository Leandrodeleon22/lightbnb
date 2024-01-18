  INSERT INTO users (name, email, password)
  VALUES ('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

 
   INSERT INTO properties (owner_id,title, description, thumbnail_photo_url,cover_photo_url, cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES ((SELECT id FROM users WHERE name = 'Eva Stanley'),'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 93061, 6, 4, 8, 'canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', TRUE),
  ((SELECT id FROM users WHERE name = 'Louisa Meyer'),'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7, 'canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', TRUE),
  ((SELECT id FROM users WHERE name = 'Dominic Parks'), 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', TRUE);


 INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2018-09-11','2018-09-26', (SELECT id FROM properties WHERE title = 'Speed lamp'), (SELECT id FROM users WHERE name = 'Eva Stanley')),
  ('2019-01-04','2019-02-01', (SELECT id FROM properties WHERE title = 'Blank corner'),  (SELECT id FROM users WHERE name = 'Louisa Meyer')),
  ('2023-10-01','2023-10-14', (SELECT id FROM properties WHERE title = 'Habit mix'),  (SELECT id FROM users WHERE name = 'Dominic Parks'))  ;



INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES ((SELECT id FROM users WHERE name = 'Eva Stanley'),(SELECT id FROM properties WHERE id = 1), (SELECT id FROM reservations WHERE id = 1),3,'messages'),
  ((SELECT id FROM users WHERE name = 'Louisa Meyer'), (SELECT id FROM properties WHERE id = 2), (SELECT id FROM reservations WHERE id = 2), 4,'messages'),
  ((SELECT id FROM users WHERE name = 'Dominic Parks'), (SELECT id FROM properties WHERE id = 3),(SELECT id FROM reservations WHERE id = 3),  4,'messages');


  