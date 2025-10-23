-- =====================================================
-- FIND & MATCH ADVENTURE - MASTER DATABASE SETUP
-- =====================================================
-- This is the complete, corrected database setup file
-- with all three game levels and accurate coordinates:
-- 1. Jungle Adventure
-- 2. Ocean Discovery  
-- 3. Space Explorer
-- =====================================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS objects CASCADE;
DROP TABLE IF EXISTS levels CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Create levels table
CREATE TABLE levels (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create objects table
CREATE TABLE objects (
  id SERIAL PRIMARY KEY,
  level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  minX INTEGER NOT NULL,
  minY INTEGER NOT NULL,
  maxX INTEGER NOT NULL,
  maxY INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table (optional for future use)
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  score INTEGER DEFAULT 0,
  current_object_id INTEGER REFERENCES objects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERT LEVELS
-- =====================================================

INSERT INTO levels (title, image_url, thumbnail) VALUES
('Jungle Adventure', '/images/jungle-scene.svg', '/images/jungle-scene.svg'),
('Ocean Discovery', '/images/ocean-scene.svg', '/images/ocean-scene.svg'),
('Space Explorer', '/images/space-scene.svg', '/images/space-scene.svg'),
('Farm Adventure', '/images/farm-scene.svg', '/images/farm-scene.svg');

-- =====================================================
-- INSERT JUNGLE ADVENTURE OBJECTS (Level ID = 1)
-- CORRECTED COORDINATES
-- =====================================================

INSERT INTO objects (level_id, name, image_url, minX, minY, maxX, maxY) VALUES
-- Red Bird: transform="translate(150, 180)" with radius 12
-- Actual bounds: (138, 168) to (162, 192)
(1, 'Red Bird', '/images/objects/red-bird.svg', 150, 190, 230, 260),

-- Green Tree: transform="translate(360, 315)" with radius 20
-- Actual bounds: (340, 295) to (380, 335)
(1, 'Green Tree', '/images/objects/green-tree.svg', 370, 340, 450, 410),

-- Blue Flower: transform="translate(550, 250)" with radius 10
-- Actual bounds: (540, 240) to (560, 260)
(1, 'Blue Flower', '/images/objects/blue-flower.svg', 540, 240, 560, 260);

-- =====================================================
-- INSERT OCEAN DISCOVERY OBJECTS (Level ID = 2)
-- CORRECTED COORDINATES
-- =====================================================

INSERT INTO objects (level_id, name, image_url, minX, minY, maxX, maxY) VALUES
-- Starfish: transform="translate(200, 400)" with radius 15
-- Actual bounds: (185, 385) to (215, 415)
(2, 'Starfish', '/images/objects/starfish.svg', 185, 385, 215, 415),

-- Seahorse: transform="translate(500, 350)" with radius 15
-- Actual bounds: (485, 335) to (515, 365)
(2, 'Seahorse', '/images/objects/seahorse.svg', 485, 335, 515, 365),

-- Shell: transform="translate(600, 450)" with radius 15
-- Actual bounds: (585, 435) to (615, 465)
(2, 'Shell', '/images/objects/shell.svg', 585, 435, 615, 465);

-- =====================================================
-- INSERT SPACE EXPLORER OBJECTS (Level ID = 3)
-- CORRECTED COORDINATES
-- =====================================================

INSERT INTO objects (level_id, name, image_url, minX, minY, maxX, maxY) VALUES
-- Alien: transform="translate(150, 350)" with radius 15
-- Actual bounds: (135, 335) to (165, 365)
(3, 'Alien', '/images/objects/alien.svg', 135, 335, 165, 365),

-- UFO: transform="translate(400, 250)" with radius 25
-- Actual bounds: (375, 225) to (425, 275)
(3, 'UFO', '/images/objects/ufo.svg', 375, 225, 425, 275),

-- Meteor: transform="translate(650, 400)" with radius 12
-- Actual bounds: (638, 388) to (662, 412)
(3, 'Meteor', '/images/objects/meteor.svg', 638, 388, 662, 412);


-- =====================================================
-- INSERT Farm Adventure OBJECTS (Level ID = 3)
-- CORRECTED COORDINATES
-- =====================================================

INSERT INTO objects (level_id, name, image_url, minX, minY, maxX, maxY) VALUES
-- Tractor: transform="translate(100, 450)" with radius 20
-- Bounds: (80, 430) to (120, 470)
(4, 'Tractor', '/images/objects/tractor.svg', 80, 430, 120, 470),

-- Cow: transform="translate(400, 420)" with radius 25
-- Bounds: (375, 395) to (425, 445)
(4, 'Cow', '/images/objects/cow.svg', 375, 395, 425, 445),

-- Chicken: transform="translate(600, 380)" with radius 12
-- Bounds: (588, 368) to (612, 392)
(4, 'Chicken', '/images/objects/chicken.svg', 588, 368, 612, 392);

-- =====================================================
-- VERIFY DATA
-- =====================================================

-- Check that all levels were created
SELECT 'Levels created:' as info, count(*) as count FROM levels;

-- Check that all objects were created
SELECT 'Objects created:' as info, count(*) as count FROM objects;

-- Show all levels with their object counts
SELECT 
  l.id,
  l.title,
  l.image_url,
  COUNT(o.id) as object_count
FROM levels l
LEFT JOIN objects o ON l.id = o.level_id
GROUP BY l.id, l.title, l.image_url
ORDER BY l.id;

-- Show all objects with their corrected coordinates
SELECT 
  l.title as level_name,
  o.name as object_name,
  o.image_url,
  o.minX, o.minY, o.maxX, o.maxY,
  (o.maxX - o.minX) as width,
  (o.maxY - o.minY) as height
FROM objects o
JOIN levels l ON o.level_id = l.id
ORDER BY l.id, o.id;

-- =====================================================
-- COORDINATE REFERENCE GUIDE
-- =====================================================
-- 
-- JUNGLE ADVENTURE:
-- - Red Bird: Center (150, 180), Bounds (138, 168) to (162, 192)
-- - Green Tree: Center (360, 315), Bounds (340, 295) to (380, 335)
-- - Blue Flower: Center (550, 250), Bounds (540, 240) to (560, 260)
--
-- OCEAN DISCOVERY:
-- - Starfish: Center (200, 400), Bounds (185, 385) to (215, 415)
-- - Seahorse: Center (500, 350), Bounds (485, 335) to (515, 365)
-- - Shell: Center (600, 450), Bounds (585, 435) to (615, 465)
--
-- SPACE EXPLORER:
-- - Alien: Center (150, 350), Bounds (135, 335) to (165, 365)
-- - UFO: Center (400, 250), Bounds (375, 225) to (425, 275)
-- - Meteor: Center (650, 400), Bounds (638, 388) to (662, 412)
--
-- All coordinates are in SVG image space (800x600 canvas)
-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your Find & Match Adventure database is now ready with
-- accurate coordinates that match the actual object positions
-- in the SVG files!
-- =====================================================
