import React, { useState, useCallback } from "react";
import {
  Heart, Swords, Sparkles, Trophy, RefreshCw, Users, Package,
  ChevronRight, Zap, Brain, Shield, Wind, Loader2, X, Quote,
  Globe, Smile, Wand2, MessageCircle, Play
} from "lucide-react";

/* =========================================================
   1. CHARACTER DATA (100 popular anime characters)
========================================================= */
const CHARACTERS = [
  // Naruto (10)
  { id: 1, name: "Naruto Uzumaki", anime: "Naruto", rarity: "Epic", power: 8, speed: 7, durability: 9, intelligence: 5, traits: ["stubborn", "loyal", "hopeful"], abilities: ["Shadow Clone Jutsu", "Rasengan", "Sage Mode"], quote: "Believe it!" },
  { id: 2, name: "Sasuke Uchiha", anime: "Naruto", rarity: "Epic", power: 8, speed: 8, durability: 6, intelligence: 8, traits: ["cold", "driven", "prideful"], abilities: ["Sharingan", "Chidori", "Amaterasu"], quote: "It's not about being a hero." },
  { id: 3, name: "Kakashi", anime: "Naruto", rarity: "Rare", power: 7, speed: 8, durability: 6, intelligence: 9, traits: ["laid-back", "wise", "guarded"], abilities: ["Sharingan", "Chidori", "Summoning: Dogs"], quote: "Those who abandon their duty are trash." },
  { id: 4, name: "Itachi Uchiha", anime: "Naruto", rarity: "Legendary", power: 9, speed: 8, durability: 6, intelligence: 10, traits: ["stoic", "self-sacrificing", "burdened"], abilities: ["Mangekyo Sharingan", "Tsukuyomi", "Susanoo"], quote: "Foolish little brother." },
  { id: 5, name: "Sakura Haruno", anime: "Naruto", rarity: "Rare", power: 6, speed: 5, durability: 7, intelligence: 8, traits: ["determined", "caring", "sharp-tempered"], abilities: ["Superhuman Strength", "Medical Ninjutsu", "Byakugo Seal"], quote: "Cha!" },
  { id: 6, name: "Madara Uchiha", anime: "Naruto", rarity: "Mythic", power: 10, speed: 8, durability: 9, intelligence: 9, traits: ["legendary", "ruthless", "visionary"], abilities: ["Eternal Mangekyo Sharingan", "Susanoo", "Perfect Susanoo"], quote: "In this world, wherever there is light, there is shadow." },
  { id: 7, name: "Minato Namikaze", anime: "Naruto", rarity: "Legendary", power: 8, speed: 10, durability: 7, intelligence: 9, traits: ["swift", "brilliant", "selfless"], abilities: ["Flying Thunder God Technique", "Rasengan", "Sealing"], quote: "I'm no one important." },
  { id: 8, name: "Hinata Hyuga", anime: "Naruto", rarity: "Rare", power: 6, speed: 6, durability: 6, intelligence: 7, traits: ["gentle", "shy", "determined"], abilities: ["Byakugan", "Gentle Fist", "Twin Lion Fists"], quote: "I'm not giving up!" },
  { id: 9, name: "Jiraiya", anime: "Naruto", rarity: "Legendary", power: 8, speed: 6, durability: 8, intelligence: 9, traits: ["pervy", "wise", "legendary"], abilities: ["Summoning: Toads", "Jutsu Development", "Sage Mode"], quote: "I'm an excellent ninja!" },
  { id: 10, name: "Obito Uchiha", anime: "Naruto", rarity: "Epic", power: 8, speed: 7, durability: 9, intelligence: 7, traits: ["conflicted", "masked", "powerful"], abilities: ["Kamui", "Mangekyo Sharingan", "Intangibility"], quote: "I'm no one." },

  // One Piece (10)
  { id: 11, name: "Monkey D. Luffy", anime: "One Piece", rarity: "Legendary", power: 9, speed: 7, durability: 8, intelligence: 4, traits: ["carefree", "fearless", "loyal"], abilities: ["Gomu Gomu no Mi", "Gear Second", "Haki"], quote: "I'm gonna be King of the Pirates!" },
  { id: 12, name: "Roronoa Zoro", anime: "One Piece", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 5, traits: ["disciplined", "stubborn", "fearless"], abilities: ["Three Sword Style", "Haki", "Ashura"], quote: "Nothing happened." },
  { id: 13, name: "Sanji", anime: "One Piece", rarity: "Rare", power: 7, speed: 8, durability: 6, intelligence: 6, traits: ["chivalrous", "hot-headed", "loyal"], abilities: ["Black Leg Style", "Diable Jambe", "Haki"], quote: "A real man doesn't hit a woman." },
  { id: 14, name: "Nami", anime: "One Piece", rarity: "Common", power: 4, speed: 6, durability: 4, intelligence: 8, traits: ["clever", "greedy", "caring"], abilities: ["Clima-Tact", "Weather Reading", "Navigation Mastery"], quote: "I want 100 million berries!" },
  { id: 15, name: "Portgas D. Ace", anime: "One Piece", rarity: "Epic", power: 8, speed: 6, durability: 5, intelligence: 5, traits: ["warm", "protective", "reckless"], abilities: ["Mera Mera no Mi", "Fire Fist", "Haki"], quote: "I don't regret being born." },
  { id: 16, name: "Boa Hancock", anime: "One Piece", rarity: "Epic", power: 7, speed: 7, durability: 7, intelligence: 7, traits: ["elegant", "obsessive", "powerful"], abilities: ["Love-Love Fruit", "Haki", "Beauty"], quote: "I am a Pirate Empress!" },
  { id: 17, name: "Trafalgar D. Water Law", anime: "One Piece", rarity: "Epic", power: 7, speed: 7, durability: 6, intelligence: 9, traits: ["stoic", "calculating", "ambitious"], abilities: ["Op-Op Fruit", "Room", "Shambles"], quote: "I'm not going to be your follower." },
  { id: 18, name: "Eustass Kid", anime: "One Piece", rarity: "Epic", power: 8, speed: 6, durability: 7, intelligence: 5, traits: ["aggressive", "arrogant", "ruthless"], abilities: ["Magnetic Fruit", "Metal Manipulation"], quote: "I'm gonna be the strongest!" },
  { id: 19, name: "Dracule Mihawk", anime: "One Piece", rarity: "Legendary", power: 9, speed: 8, durability: 8, intelligence: 8, traits: ["stoic", "sharp", "legendary"], abilities: ["Black Blade", "Swordsmanship", "Eagle Eye"], quote: "Great swordsmen are born." },
  { id: 20, name: "Marco", anime: "One Piece", rarity: "Rare", power: 8, speed: 7, durability: 9, intelligence: 7, traits: ["loyal", "confident", "experienced"], abilities: ["Phoenix Fruit", "Regeneration", "Flight"], quote: "I'm his right hand!" },

  // Dragon Ball (8)
  { id: 21, name: "Goku", anime: "Dragon Ball", rarity: "Mythic", power: 10, speed: 9, durability: 9, intelligence: 4, traits: ["pure-hearted", "competitive", "naive"], abilities: ["Kamehameha", "Super Saiyan", "Instant Transmission"], quote: "I am the hope of the universe." },
  { id: 22, name: "Vegeta", anime: "Dragon Ball", rarity: "Legendary", power: 9, speed: 9, durability: 8, intelligence: 7, traits: ["prideful", "competitive", "evolving"], abilities: ["Galick Gun", "Super Saiyan Blue", "Final Flash"], quote: "It's over 9000!" },
  { id: 23, name: "Piccolo", anime: "Dragon Ball", rarity: "Epic", power: 7, speed: 7, durability: 8, intelligence: 8, traits: ["stern", "mentoring", "loyal"], abilities: ["Special Beam Cannon", "Regeneration", "Stretch Arms"], quote: "I am Piccolo, the Namekian." },
  { id: 24, name: "Frieza", anime: "Dragon Ball", rarity: "Legendary", power: 9, speed: 8, durability: 9, intelligence: 8, traits: ["tyrannical", "prideful", "ruthless"], abilities: ["Death Beam", "Energy Manipulation", "Final Flash"], quote: "I'm the strongest in the universe!" },
  { id: 25, name: "Cell", anime: "Dragon Ball", rarity: "Legendary", power: 9, speed: 8, durability: 9, intelligence: 9, traits: ["perfect", "calculating", "arrogant"], abilities: ["Cell Juniors", "Kamehameha", "Perfect Form"], quote: "I am perfect." },
  { id: 26, name: "Majin Buu", anime: "Dragon Ball", rarity: "Mythic", power: 10, speed: 7, durability: 10, intelligence: 3, traits: ["childish", "destructive", "pure evil"], abilities: ["Regeneration", "Energy Beam", "Absorption"], quote: "Buu is destruction!" },
  { id: 27, name: "Gohan", anime: "Dragon Ball", rarity: "Epic", power: 9, speed: 7, durability: 8, intelligence: 8, traits: ["reluctant warrior", "protective", "intelligent"], abilities: ["Beast Mode", "Masenko", "Super Saiyan"], quote: "I have to do this!" },
  { id: 28, name: "Goten", anime: "Dragon Ball", rarity: "Rare", power: 7, speed: 8, durability: 7, intelligence: 5, traits: ["childish", "fearless", "energetic"], abilities: ["Fusion Dance", "Kamehameha", "Super Saiyan"], quote: "That's so cool!" },

  // Jujutsu Kaisen (8)
  { id: 29, name: "Gojo Satoru", anime: "Jujutsu Kaisen", rarity: "Mythic", power: 10, speed: 9, durability: 8, intelligence: 9, traits: ["confident", "playful", "strongest"], abilities: ["Limitless", "Six Eyes", "Purple"], quote: "Throughout heaven and earth, I alone am honored." },
  { id: 30, name: "Yuji Itadori", anime: "Jujutsu Kaisen", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 5, traits: ["kind", "reckless", "resolute"], abilities: ["Divergent Fist", "Black Flash", "Superhuman Strength"], quote: "I just want to save people." },
  { id: 31, name: "Megumi Fushiguro", anime: "Jujutsu Kaisen", rarity: "Rare", power: 7, speed: 6, durability: 6, intelligence: 7, traits: ["reserved", "principled", "tactical"], abilities: ["Ten Shadows", "Divine Dogs", "Nue"], quote: "Save the maximum number of people possible." },
  { id: 32, name: "Nobara Kugisaki", anime: "Jujutsu Kaisen", rarity: "Rare", power: 6, speed: 6, durability: 6, intelligence: 7, traits: ["confident", "fierce", "stylish"], abilities: ["Straw Doll Technique", "Resonance", "Hairpin"], quote: "I do what I want." },
  { id: 33, name: "Ryomen Sukuna", anime: "Jujutsu Kaisen", rarity: "Mythic", power: 10, speed: 9, durability: 10, intelligence: 9, traits: ["arrogant", "powerful", "chaotic"], abilities: ["Cursed Technique", "Dismantle", "Firepower"], quote: "I am the strongest sorcerer." },
  { id: 34, name: "Geto Suguru", anime: "Jujutsu Kaisen", rarity: "Legendary", power: 8, speed: 7, durability: 7, intelligence: 9, traits: ["fallen", "calculating", "ambitious"], abilities: ["Curse Manipulation", "Special Grade Curses"], quote: "Jujutsu society is rotten." },
  { id: 35, name: "Nanami Kento", anime: "Jujutsu Kaisen", rarity: "Rare", power: 7, speed: 7, durability: 6, intelligence: 8, traits: ["rational", "dedicated", "serious"], abilities: ["Overtime", "Cursed Technique", "Blade Work"], quote: "Being a salaryman is hard." },
  { id: 36, name: "Maki Zenin", anime: "Jujutsu Kaisen", rarity: "Rare", power: 7, speed: 7, durability: 6, intelligence: 6, traits: ["stubborn", "brave", "anti-jujutsu"], abilities: ["Heavenly Restricted Body", "Cursed Tools"], quote: "I'll become the strongest." },

  // Attack on Titan (7)
  { id: 37, name: "Eren Yeager", anime: "Attack on Titan", rarity: "Legendary", power: 9, speed: 6, durability: 9, intelligence: 6, traits: ["driven", "vengeful", "resolute"], abilities: ["Attack Titan", "Founding Titan", "Hardening"], quote: "If you win, you live. If you lose, you die." },
  { id: 38, name: "Mikasa Ackerman", anime: "Attack on Titan", rarity: "Epic", power: 8, speed: 8, durability: 7, intelligence: 6, traits: ["devoted", "fearless", "disciplined"], abilities: ["ODM Gear Mastery", "Ackerman Strength", "Blade Work"], quote: "The world is cruel, but beautiful." },
  { id: 39, name: "Levi Ackerman", anime: "Attack on Titan", rarity: "Mythic", power: 9, speed: 9, durability: 7, intelligence: 8, traits: ["disciplined", "blunt", "humanity's strongest"], abilities: ["ODM Gear Mastery", "Ackerman Strength", "Blade Storm"], quote: "Whether we live or die, chance decides." },
  { id: 40, name: "Armin Arlert", anime: "Attack on Titan", rarity: "Rare", power: 5, speed: 5, durability: 5, intelligence: 9, traits: ["strategic", "brave", "intellectual"], abilities: ["Strategic Genius", "Leadership", "Tactics"], quote: "Shinzou wo Sasageyo!" },
  { id: 41, name: "Annie Leonhart", anime: "Attack on Titan", rarity: "Rare", power: 7, speed: 7, durability: 8, intelligence: 8, traits: ["cold", "skilled", "mysterious"], abilities: ["Female Titan", "Martial Arts", "Hardening"], quote: "I'm just a girl." },
  { id: 42, name: "Reiner Braun", anime: "Attack on Titan", rarity: "Rare", power: 8, speed: 6, durability: 9, intelligence: 6, traits: ["determined", "burdened", "strong"], abilities: ["Armored Titan", "Hardening", "Durability"], quote: "I have to keep moving forward." },
  { id: 43, name: "Bertholdt Hoover", anime: "Attack on Titan", rarity: "Rare", power: 8, speed: 6, durability: 8, intelligence: 7, traits: ["anxious", "reserved", "conflicted"], abilities: ["Colossal Titan", "Steam Release", "Size"], quote: "I'm sorry..." },

  // My Hero Academia (8)
  { id: 44, name: "Izuku Midoriya", anime: "My Hero Academia", rarity: "Epic", power: 7, speed: 6, durability: 6, intelligence: 8, traits: ["analytical", "selfless", "determined"], abilities: ["One For All", "Full Cowl", "Detroit Smash"], quote: "Plus Ultra!" },
  { id: 45, name: "Katsuki Bakugo", anime: "My Hero Academia", rarity: "Epic", power: 8, speed: 7, durability: 6, intelligence: 7, traits: ["explosive", "prideful", "competitive"], abilities: ["Explosion", "AP Shot", "Howitzer Impact"], quote: "I'll be the number one hero." },
  { id: 46, name: "Shoto Todoroki", anime: "My Hero Academia", rarity: "Epic", power: 8, speed: 6, durability: 6, intelligence: 7, traits: ["reserved", "conflicted", "evolving"], abilities: ["Half-Cold Half-Hot", "Ice Wall", "Flame Burst"], quote: "This is my power, mine alone." },
  { id: 47, name: "All Might", anime: "My Hero Academia", rarity: "Legendary", power: 10, speed: 8, durability: 9, intelligence: 8, traits: ["heroic", "selfless", "legendary"], abilities: ["One For All", "Might Form", "Delaware Smash"], quote: "I am here!" },
  { id: 48, name: "Tsuyu Asui", anime: "My Hero Academia", rarity: "Common", power: 5, speed: 6, durability: 6, intelligence: 7, traits: ["honest", "caring", "straightforward"], abilities: ["Frog Quirk", "Jumping", "Poison Secretion"], quote: "Ribbit!" },
  { id: 49, name: "Momo Yaoyorozu", anime: "My Hero Academia", rarity: "Rare", power: 6, speed: 5, durability: 5, intelligence: 9, traits: ["intelligent", "responsible", "capable"], abilities: ["Creation Quirk", "Item Generation", "Strategic Mind"], quote: "I'll analyze the situation." },
  { id: 50, name: "Dabi", anime: "My Hero Academia", rarity: "Rare", power: 8, speed: 7, durability: 7, intelligence: 7, traits: ["cold", "vengeful", "ambitious"], abilities: ["Blueflame", "Heat Control", "Fire Manipulation"], quote: "I'll burn everything down." },
  { id: 51, name: "Stain", anime: "My Hero Academia", rarity: "Epic", power: 7, speed: 8, durability: 6, intelligence: 7, traits: ["idealistic", "ruthless", "skilled"], abilities: ["Paralyzing Quirk", "Sword Mastery", "Poison"], quote: "True heroes don't exist." },

  // Demon Slayer (6)
  { id: 52, name: "Tanjiro Kamado", anime: "Demon Slayer", rarity: "Epic", power: 7, speed: 7, durability: 7, intelligence: 6, traits: ["kind", "perceptive", "relentless"], abilities: ["Water Breathing", "Sun Breathing", "Enhanced Smell"], quote: "I'll never give up." },
  { id: 53, name: "Nezuko Kamado", anime: "Demon Slayer", rarity: "Rare", power: 7, speed: 8, durability: 8, intelligence: 5, traits: ["protective", "gentle", "fierce"], abilities: ["Blood Demon Art", "Size Manipulation", "Regeneration"], quote: "Mmmph!" },
  { id: 54, name: "Zenitsu Agatsuma", anime: "Demon Slayer", rarity: "Common", power: 6, speed: 9, durability: 4, intelligence: 4, traits: ["anxious", "cowardly", "surprisingly brave"], abilities: ["Thunder Breathing", "Thunderclap and Flash", "Enhanced Hearing"], quote: "I don't want to die!" },
  { id: 55, name: "Inosuke Hashibira", anime: "Demon Slayer", rarity: "Rare", power: 7, speed: 8, durability: 8, intelligence: 4, traits: ["aggressive", "stubborn", "wild"], abilities: ["Beast Breathing", "Dual Sword Technique", "Enhanced Senses"], quote: "I'll destroy you!" },
  { id: 56, name: "Giyu Tomioka", anime: "Demon Slayer", rarity: "Rare", power: 8, speed: 7, durability: 7, intelligence: 7, traits: ["reserved", "skilled", "lonely"], abilities: ["Water Breathing", "Flowing Strikes", "Mastery"], quote: "I'm always alone." },
  { id: 57, name: "Shinobu Kocho", anime: "Demon Slayer", rarity: "Rare", power: 6, speed: 8, durability: 5, intelligence: 8, traits: ["sadistic", "intelligent", "poisonous"], abilities: ["Poison Manipulation", "Insect Breathing", "Speed"], quote: "I'll poison you." },

  // Death Note (2)
  { id: 58, name: "Light Yagami", anime: "Death Note", rarity: "Legendary", power: 3, speed: 3, durability: 3, intelligence: 10, traits: ["calculating", "arrogant", "charismatic"], abilities: ["Death Note", "Strategic Planning", "Manipulation"], quote: "I am justice." },
  { id: 59, name: "L Lawliet", anime: "Death Note", rarity: "Legendary", power: 3, speed: 3, durability: 3, intelligence: 10, traits: ["eccentric", "meticulous", "reclusive"], abilities: ["Deductive Reasoning", "Investigative Network", "Pattern Recognition"], quote: "I am justice, too." },

  // Fullmetal Alchemist (4)
  { id: 60, name: "Edward Elric", anime: "Fullmetal Alchemist", rarity: "Epic", power: 7, speed: 6, durability: 6, intelligence: 8, traits: ["short-tempered", "brilliant", "devoted"], abilities: ["Alchemy", "Automail Combat", "Transmutation"], quote: "A lesson without pain is meaningless." },
  { id: 61, name: "Alphonse Elric", anime: "Fullmetal Alchemist", rarity: "Epic", power: 8, speed: 5, durability: 10, intelligence: 7, traits: ["noble", "pure", "strong"], abilities: ["Alchemic Armor", "Transmutation", "Durability"], quote: "I'm just a soul in armor." },
  { id: 62, name: "Roy Mustang", anime: "Fullmetal Alchemist", rarity: "Rare", power: 7, speed: 7, durability: 6, intelligence: 8, traits: ["ambitious", "charismatic", "skilled"], abilities: ["Flame Alchemy", "Tactical Mind", "Gloves"], quote: "I'll take responsibility." },
  { id: 63, name: "Scar", anime: "Fullmetal Alchemist", rarity: "Rare", power: 8, speed: 7, durability: 7, intelligence: 6, traits: ["vengeful", "righteous", "powerful"], abilities: ["Destruction Alchemy", "Martial Arts", "Regeneration"], quote: "I will destroy alchemy!" },

  // One Punch Man (4)
  { id: 64, name: "Saitama", anime: "One Punch Man", rarity: "Mythic", power: 10, speed: 8, durability: 10, intelligence: 4, traits: ["bored", "humble", "unbeatable"], abilities: ["One Punch", "Serious Series", "Consecutive Normal Punches"], quote: "OK." },
  { id: 65, name: "Genos", anime: "One Punch Man", rarity: "Rare", power: 7, speed: 8, durability: 8, intelligence: 7, traits: ["dedicated", "passionate", "robotic"], abilities: ["Incineration Cannon", "Jet Propulsion", "Adaptation"], quote: "I'll get stronger!" },
  { id: 66, name: "Tornado", anime: "One Punch Man", rarity: "Epic", power: 8, speed: 8, durability: 6, intelligence: 7, traits: ["aggressive", "powerful", "cocky"], abilities: ["Psychic Powers", "Telekinesis", "Levitation"], quote: "I'm the strongest!" },
  { id: 67, name: "King", anime: "One Punch Man", rarity: "Common", power: 1, speed: 3, durability: 1, intelligence: 6, traits: ["lucky", "cowardly", "unlucky"], abilities: ["Luck", "Engine Sound", "Psychological Warfare"], quote: "..." },

  // Bleach (8)
  { id: 68, name: "Ichigo Kurosaki", anime: "Bleach", rarity: "Epic", power: 8, speed: 7, durability: 7, intelligence: 6, traits: ["protective", "stubborn", "passionate"], abilities: ["Zanpakuto", "Bankai", "Hollowfication"], quote: "I'm going to save you!" },
  { id: 69, name: "Aizen Sosuke", anime: "Bleach", rarity: "Mythic", power: 10, speed: 8, durability: 9, intelligence: 10, traits: ["manipulative", "calculated", "powerful"], abilities: ["Hypnosis", "Perfect Hypnosis", "Hado Spells"], quote: "I see all." },
  { id: 70, name: "Byakuya Kuchiki", anime: "Bleach", rarity: "Epic", power: 8, speed: 8, durability: 7, intelligence: 8, traits: ["noble", "stoic", "prideful"], abilities: ["Senbonzakura", "Bankai", "Flash Steps"], quote: "I won't lose." },
  { id: 71, name: "Rukia Kuchiki", anime: "Bleach", rarity: "Rare", power: 6, speed: 7, durability: 6, intelligence: 7, traits: ["loyal", "determined", "cool"], abilities: ["Sode no Shirayuki", "Bankai", "Ice Powers"], quote: "I'll protect you." },
  { id: 72, name: "Kenpachi Zaraki", anime: "Bleach", rarity: "Legendary", power: 9, speed: 6, durability: 9, intelligence: 3, traits: ["bloodthirsty", "wild", "strong"], abilities: ["Nozarashi", "Raw Power", "Instinct"], quote: "FIGHT!" },
  { id: 73, name: "Toshiro Hitsugaya", anime: "Bleach", rarity: "Rare", power: 7, speed: 8, durability: 7, intelligence: 8, traits: ["composed", "young", "responsible"], abilities: ["Hyorinmaru", "Bankai", "Ice Manipulation"], quote: "I'm not a child." },
  { id: 74, name: "Renji Abarai", anime: "Bleach", rarity: "Common", power: 6, speed: 6, durability: 6, intelligence: 5, traits: ["determined", "passionate", "loyal"], abilities: ["Zabimaru", "Bankai", "Power Growth"], quote: "I'll get stronger!" },
  { id: 75, name: "Ulquiorra", anime: "Bleach", rarity: "Legendary", power: 9, speed: 8, durability: 8, intelligence: 9, traits: ["emotionless", "powerful", "curious"], abilities: ["Lanza del Relampago", "Segunda Etapa", "Darkness"], quote: "I see. You are complex." },

  // Fairy Tail (6)
  { id: 76, name: "Natsu Dragneel", anime: "Fairy Tail", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 4, traits: ["hot-headed", "passionate", "determined"], abilities: ["Fire Dragon Slayer Magic", "Igneel Power", "Natsu's Intensity"], quote: "I'm gonna beat you!" },
  { id: 77, name: "Lucy Heartfilia", anime: "Fairy Tail", rarity: "Rare", power: 6, speed: 6, durability: 5, intelligence: 7, traits: ["elegant", "strategic", "loyal"], abilities: ["Celestial Spirit Magic", "Summon Gates", "Spirit Keys"], quote: "I won't give up!" },
  { id: 78, name: "Erza Scarlet", anime: "Fairy Tail", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 7, traits: ["strong", "determined", "protective"], abilities: ["Requip Magic", "Armor Change", "Combat Mastery"], quote: "I'm taking you down!" },
  { id: 79, name: "Gray Fullbuster", anime: "Fairy Tail", rarity: "Rare", power: 7, speed: 7, durability: 7, intelligence: 7, traits: ["cold", "determined", "obsessive"], abilities: ["Ice Make Magic", "Devil Slayer Magic", "Ice Power"], quote: "I'll freeze you!" },
  { id: 80, name: "Laxus Dreyar", anime: "Fairy Tail", rarity: "Epic", power: 8, speed: 8, durability: 8, intelligence: 6, traits: ["arrogant", "powerful", "evolving"], abilities: ["Lightning Dragon Slayer Magic", "Electric Power", "Laxus Force"], quote: "Lightning is my power!" },
  { id: 81, name: "Mirajane Strauss", anime: "Fairy Tail", rarity: "Rare", power: 7, speed: 7, durability: 7, intelligence: 6, traits: ["kind", "cheerful", "demon form"], abilities: ["Takeover Magic", "Demon Form", "Halphas Form"], quote: "I believe in everyone!" },

  // Sword Art Online (4)
  { id: 82, name: "Kirito", anime: "Sword Art Online", rarity: "Epic", power: 8, speed: 8, durability: 7, intelligence: 7, traits: ["heroic", "determined", "skilled"], abilities: ["Dual Wielding", "Aincrad Skills", "SAO Powers"], quote: "I'll protect everyone!" },
  { id: 83, name: "Asuna", anime: "Sword Art Online", rarity: "Rare", power: 7, speed: 8, durability: 6, intelligence: 7, traits: ["fierce", "devoted", "skilled"], abilities: ["Sword Skills", "Speed", "Determination"], quote: "I'll fight with you!" },
  { id: 84, name: "Sinon", anime: "Sword Art Online", rarity: "Rare", power: 7, speed: 7, durability: 6, intelligence: 7, traits: ["skilled", "determined", "cool"], abilities: ["Bullet Line", "Long-range Attack", "Accuracy"], quote: "I'll snipe you!" },
  { id: 85, name: "Eugeo", anime: "Sword Art Online", rarity: "Rare", power: 7, speed: 6, durability: 6, intelligence: 7, traits: ["loyal", "determined", "tragic"], abilities: ["Blue Rose Sword", "Swordsmanship", "Power"], quote: "I'll fight with Kirito!" },

  // Tokyo Ghoul (4)
  { id: 86, name: "Kaneki Ken", anime: "Tokyo Ghoul", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 7, traits: ["conflicted", "haunted", "powerful"], abilities: ["Ghoul Kagune", "Rinkaku Form", "Healing"], quote: "I'm a ghoul." },
  { id: 87, name: "Touka Kirishima", anime: "Tokyo Ghoul", rarity: "Rare", power: 7, speed: 7, durability: 7, intelligence: 6, traits: ["tough", "loyal", "aggressive"], abilities: ["Rinkaku Kagune", "Combat Skills", "Protective Nature"], quote: "I'll protect my people." },
  { id: 88, name: "Rize Kamishiro", anime: "Tokyo Ghoul", rarity: "Epic", power: 8, speed: 7, durability: 8, intelligence: 7, traits: ["mysterious", "powerful", "tragic"], abilities: ["Rinkaku Kagune", "Regeneration", "Predatory"], quote: "I devour." },
  { id: 89, name: "Eto", anime: "Tokyo Ghoul", rarity: "Legendary", power: 9, speed: 8, durability: 9, intelligence: 9, traits: ["manipulative", "powerful", "chaotic"], abilities: ["Kakuja Form", "Multiple Kagune", "Strategy"], quote: "I'm the One-Eyed King." },

  // Hunter x Hunter (6)
  { id: 90, name: "Gon Freecss", anime: "Hunter x Hunter", rarity: "Epic", power: 7, speed: 7, durability: 7, intelligence: 6, traits: ["naive", "determined", "passionate"], abilities: ["Rock Paper Scissors", "Nen Potential", "Pure Heart"], quote: "I'll become a great hunter!" },
  { id: 91, name: "Killua Zoldyck", anime: "Hunter x Hunter", rarity: "Epic", power: 8, speed: 9, durability: 7, intelligence: 8, traits: ["skilled", "loyal", "cold"], abilities: ["Godspeed", "Assassin Training", "Nen Mastery"], quote: "I'll always be with you." },
  { id: 92, name: "Hisoka Morow", anime: "Hunter x Hunter", rarity: "Epic", power: 8, speed: 8, durability: 7, intelligence: 8, traits: ["unpredictable", "powerful", "chaotic"], abilities: ["Bungee Gum", "Texture Surprise", "Card Mastery"], quote: "How exhilarating!" },
  { id: 93, name: "Illumi Zoldyck", anime: "Hunter x Hunter", rarity: "Rare", power: 7, speed: 7, durability: 7, intelligence: 8, traits: ["cold", "precise", "loyal"], abilities: ["Needle People", "Manipulation", "Assassination"], quote: "I control." },
  { id: 94, name: "Chrollo Lucilfer", anime: "Hunter x Hunter", rarity: "Legendary", power: 9, speed: 8, durability: 8, intelligence: 10, traits: ["calculating", "powerful", "leader"], abilities: ["Skill Hunter", "Stolen Abilities", "Strategy"], quote: "I am the leader." },
  { id: 95, name: "Meruem", anime: "Hunter x Hunter", rarity: "Mythic", power: 10, speed: 9, durability: 10, intelligence: 10, traits: ["royal", "powerful", "supreme"], abilities: ["Aura Projection", "Pattern Recognition", "Perfect Form"], quote: "I am perfection." },

  // Spy x Family (5)
  { id: 96, name: "Loid Forger", anime: "Spy x Family", rarity: "Rare", power: 7, speed: 8, durability: 7, intelligence: 9, traits: ["calm", "skilled", "devoted"], abilities: ["Espionage", "Disguise", "Hand-to-Hand Combat"], quote: "For this mission..." },
  { id: 97, name: "Yor Forger", anime: "Spy x Family", rarity: "Rare", power: 8, speed: 8, durability: 8, intelligence: 6, traits: ["energetic", "deadly", "devoted"], abilities: ["Assassination", "Combat", "Strength"], quote: "I'll protect my family!" },
  { id: 98, name: "Anya Forger", anime: "Spy x Family", rarity: "Common", power: 3, speed: 4, durability: 3, intelligence: 7, traits: ["cute", "telepathic", "mischievous"], abilities: ["Telepathy", "Cuteness", "Chaos"], quote: "Peanuts!" },
  { id: 99, name: "Bond Forger", anime: "Spy x Family", rarity: "Common", power: 4, speed: 5, durability: 5, intelligence: 7, traits: ["loyal", "psychic", "protective"], abilities: ["Future Sight", "Loyalty", "Cuteness"], quote: "Woof!" },
  { id: 100, name: "Twilight", anime: "Spy x Family", rarity: "Rare", power: 7, speed: 8, durability: 7, intelligence: 10, traits: ["mysterious", "skilled", "cold"], abilities: ["Espionage", "Disguise", "Master Strategist"], quote: "I am a spy." },
];

const RARITY_STYLES = {
  Common: { glow: "#6b7280", label: "#9ca3af" },
  Rare: { glow: "#3b82f6", label: "#60a5fa" },
  Epic: { glow: "#a855f7", label: "#c084fc" },
  Legendary: { glow: "#f59e0b", label: "#fbbf24" },
  Mythic: { glow: "#ec4899", label: "#f472b6" },
};

const CATEGORIES = [
  { id: "scenario", label: "Scenario", icon: Wand2, mode: "ai" },
  { id: "quote", label: "Quote", icon: Quote, mode: "data" },
  { id: "personality", label: "Personality", icon: Smile, mode: "ai" },
  { id: "relationship", label: "Relationship", icon: Users, mode: "ai" },
  { id: "universe", label: "Universe", icon: Globe, mode: "data" },
  { id: "ability", label: "Ability", icon: Sparkles, mode: "data" },
  { id: "power", label: "Power Scaling", icon: Zap, mode: "data" },
  { id: "intelligence", label: "Intelligence", icon: Brain, mode: "data" },
  { id: "durability", label: "Durability", icon: Shield, mode: "data" },
  { id: "speed", label: "Speed", icon: Wind, mode: "data" },
  { id: "funny", label: "Funny", icon: MessageCircle, mode: "ai" },
  { id: "romance", label: "Romance", icon: Heart, mode: "ai" },
];

/* =========================================================
   2. ANILIST API IMAGE FETCHING (99.9% Uptime Alternative)
   
   Uses AniList GraphQL API instead of Jikan/MAL
   - No MAL dependency (stays up even if MAL is down)
   - Reliable 99.9% uptime
   - Better fallback handling
========================================================= */
const imageCache = {};

function loadImageCacheFromStorage() {
  try {
    const raw = localStorage.getItem('anilist-image-cache');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveImageCacheToStorage(cache) {
  try {
    localStorage.setItem('anilist-image-cache', JSON.stringify(cache));
  } catch {
    // storage full or unavailable — non-critical
  }
}

async function fetchCharacterImageAniList(name, anime) {
  const cacheKey = `${name}|${anime}`;
  if (imageCache[cacheKey]) return imageCache[cacheKey];

  try {
    const query = `
      query {
        Character(search: "${name.replace(/"/g, '\\"')}") {
          id
          image { large }
        }
      }
    `;

    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(8000)
    });

    if (res.status === 429) return 'RATE_LIMITED';
    if (!res.ok) {
      console.warn(`⚠️ AniList API error for ${name}: ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data.errors) return null;

    if (data.data?.Character?.image?.large) {
      const imageUrl = data.data.Character.image.large;
      imageCache[cacheKey] = imageUrl;
      return imageUrl;
    }
    return null;
  } catch (error) {
    console.warn(`💥 ${name}: ${error.message}`);
    return null;
  }
}

// Fetches images ONLY for the characters passed in (e.g. the dealt hands),
// not the full CHARACTERS list. Persists to localStorage so repeat games
// mostly hit cache.
async function fetchAllCharacterImagesAniList(characters) {
  const imageMap = loadImageCacheFromStorage();
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const remaining = characters.filter((c) => !imageMap[c.id]);
  console.log(`🚀 Fetching ${remaining.length} new images (${characters.length - remaining.length} already cached)...`);

  for (const char of remaining) {
    let attempt = 0;
    let success = false;

    while (attempt < 3 && !success) {
      const img = await fetchCharacterImageAniList(char.name, char.anime);
      if (img === 'RATE_LIMITED') {
        const wait = 2000 * Math.pow(2, attempt);
        console.warn(`Rate limited on ${char.name}, backing off ${wait}ms...`);
        await delay(wait);
        attempt++;
        continue;
      }
      imageMap[char.id] = img;
      success = true;
    }

    await delay(700); // stay well under AniList's rate limit
  }

  saveImageCacheToStorage(imageMap);

  const loaded = Object.values(imageMap).filter(Boolean).length;
  console.log(`📊 Cache now has ${loaded} images total.`);

  return imageMap;
}

/* =========================================================
   3. HELPERS
========================================================= */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dealStarterPacks(playerCount) {
  const pool = shuffle(CHARACTERS);
  const packs = [];
  for (let p = 0; p < playerCount; p++) {
    const hand = pool.slice(p * 5, p * 5 + 5).map((c) => ({
      ...c,
      instanceKey: `${c.id}-${p}-${Math.random().toString(36).slice(2, 7)}`,
      lives: 3,
      alive: true,
    }));
    packs.push(hand);
  }
  return packs;
}

function otherCharacters(current, count) {
  const pool = CHARACTERS.filter((c) => c.id !== current.id);
  return shuffle(pool).slice(0, count);
}

function generateDataChallenge(character, categoryId) {
  const distractors = otherCharacters(character, 3);
  const withCorrect = shuffle([character, ...distractors]);

  const buildStatQuestion = (statKey, statLabel) => {
    const correct = withCorrect.reduce((best, c) => (c[statKey] > best[statKey] ? c : best));
    return {
      category: categoryId,
      question: `Who has the highest ${statLabel}?`,
      options: withCorrect.map((c) => c.name),
      correctIndex: withCorrect.findIndex((c) => c.name === correct.name),
      explanation: `${correct.name} has a ${statLabel} rating of ${correct[statKey]}/10, the highest among this group.`,
    };
  };

  switch (categoryId) {
    case "power":
      return buildStatQuestion("power", "Power");
    case "speed":
      return buildStatQuestion("speed", "Speed");
    case "durability":
      return buildStatQuestion("durability", "Durability");
    case "intelligence":
      return buildStatQuestion("intelligence", "Intelligence");
    case "universe": {
      const animeOptions = shuffle([character.anime, ...distractors.map((d) => d.anime)]);
      return {
        category: categoryId,
        question: `${character.name} is from which anime?`,
        options: animeOptions,
        correctIndex: animeOptions.findIndex((a) => a === character.anime),
        explanation: `${character.name} comes from ${character.anime}.`,
      };
    }
    case "ability": {
      const correctAbility = character.abilities[Math.floor(Math.random() * character.abilities.length)];
      const fakeAbilities = distractors.map((d) => d.abilities[0]);
      const options = shuffle([correctAbility, ...fakeAbilities]);
      return {
        category: categoryId,
        question: `Which ability belongs to ${character.name}?`,
        options,
        correctIndex: options.findIndex((o) => o === correctAbility),
        explanation: `${correctAbility} is one of ${character.name}'s signature abilities.`,
      };
    }
    case "quote": {
      const options = shuffle([character.quote, ...distractors.map((d) => d.quote)]);
      return {
        category: categoryId,
        question: `Which line belongs to ${character.name}?`,
        options,
        correctIndex: options.findIndex((o) => o === character.quote),
        explanation: `"${character.quote}" is associated with ${character.name}.`,
      };
    }
    default:
      return null;
  }
}

function generateLocalAiFallback(character, categoryId) {
  const t = character.traits;
  const pick2 = shuffle(t).slice(0, 2);
  const wrongTraits = shuffle(
    CHARACTERS.filter((c) => c.id !== character.id).flatMap((c) => c.traits)
  ).slice(0, 3);

  const templates = {
    scenario: {
      question: `${character.name} is cornered with no backup. What do they most likely do?`,
      options: shuffle([
        `Push forward, relying on being ${pick2[0]}`,
        `Freeze up and hope someone saves them`,
        `Immediately surrender without a fight`,
        `Panic and attack a nearby ally`,
      ]),
    },
    personality: {
      question: `Which trait best describes ${character.name}?`,
      options: shuffle([t[0], ...wrongTraits]),
    },
    relationship: {
      question: `${character.name} is best known for being connected to their crew, team, or found family from ${character.anime}. Which best fits their role?`,
      options: shuffle([
        `A key member of their core team in ${character.anime}`,
        `A total stranger to everyone in ${character.anime}`,
        `The main antagonist's servant`,
        `A background character with no ties`,
      ]),
    },
    funny: {
      question: `${character.name} wakes up with no memory of being an anime character, just a regular Tuesday. What's the most ridiculous thing they do first?`,
      options: shuffle([
        `Try to use ${character.abilities[0]} to make breakfast`,
        `Calmly go back to sleep`,
        `Call in sick to their anime`,
        `Start filing taxes`,
      ]),
    },
    romance: {
      question: `Someone on their team gives ${character.name} a heartfelt compliment. How do they react?`,
      options: shuffle([
        `Get flustered and act like it's ${pick2[1]} of them not to`,
        `Confidently accept it without missing a beat`,
        `Completely ignore it and change the subject`,
        `Immediately challenge them to a fight instead`,
      ]),
    },
  };

  const t2 = templates[categoryId];
  const correctText = t2.options[0];
  return {
    category: categoryId,
    question: t2.question,
    options: t2.options,
    correctIndex: t2.options.indexOf(correctText),
    explanation: `This best matches what's known about ${character.name} (${character.traits.join(", ")}).`,
  };
}

async function generateAiChallenge(character, categoryId, difficulty) {
  const res = await fetch("/api/challenge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ character, categoryId, difficulty }),
  });

  if (!res.ok) throw new Error(`Challenge API returned ${res.status}`);
  const parsed = await res.json();

  if (
    !parsed.question ||
    !Array.isArray(parsed.options) ||
    parsed.options.length !== 4 ||
    typeof parsed.correctIndex !== "number"
  ) {
    throw new Error("Malformed AI response");
  }
  return parsed;
}

async function generateChallenge(character, categoryId, difficulty) {
  const dataResult = generateDataChallenge(character, categoryId);
  if (dataResult) return dataResult;
  try {
    return await generateAiChallenge(character, categoryId, difficulty);
  } catch (e) {
    return generateLocalAiFallback(character, categoryId);
  }
}

/* =========================================================
   4. SHARED UI PIECES
========================================================= */
function Hearts({ lives }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <Heart
          key={i}
          size={16}
          fill={i < lives ? "#fb4b4b" : "none"}
          color={i < lives ? "#fb4b4b" : "#4a4a58"}
        />
      ))}
    </div>
  );
}

function CharacterCard({ char, onClick, selected, disabled, compact, imageUrl }) {
  const rs = RARITY_STYLES[char.rarity];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "default" : "pointer",
        width: compact ? 110 : 150,
        borderRadius: 16,
        padding: 2,
        border: "none",
        background: selected
          ? `linear-gradient(135deg, ${rs.glow}, #7c3aed)`
          : `linear-gradient(135deg, ${rs.glow}55, transparent)`,
        boxShadow: selected ? `0 0 18px ${rs.glow}aa` : "none",
        transition: "all 0.2s ease",
        opacity: disabled && !char.alive ? 0.35 : 1,
        transform: selected ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 14,
          padding: compact ? 10 : 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: 10,
            background: imageLoaded && !imageError 
              ? "transparent" 
              : `radial-gradient(circle at 30% 30%, ${rs.glow}88, #0b0b14 75%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: compact ? 22 : 30,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "var(--font-display)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {imageUrl && !imageError ? (
            <>
              <img
                src={imageUrl}
                alt={char.name}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: imageLoaded ? "block" : "none",
                }}
              />
              {!imageLoaded && (
                <div style={{ fontSize: 12, color: rs.label }}>Loading...</div>
              )}
            </>
          ) : (
            char.name.split(" ").map((w) => w[0]).slice(0, 2).join("")
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: compact ? 12 : 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
            {char.name}
          </div>
          <div style={{ fontSize: 10, color: rs.label, marginTop: 2, letterSpacing: 0.5 }}>
            {char.rarity.toUpperCase()}
          </div>
        </div>
        {!compact && (
          <div style={{ display: "flex", gap: 6, fontSize: 9, color: "var(--muted)", flexWrap: "wrap", justifyContent: "center" }}>
            <span>PWR {char.power}</span>
            <span>SPD {char.speed}</span>
            <span>DUR {char.durability}</span>
            <span>INT {char.intelligence}</span>
          </div>
        )}
        {char.lives !== undefined && <Hearts lives={char.lives} />}
      </div>
    </button>
  );
}

function Panel({ children, style }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#3a3a46" : "linear-gradient(135deg, var(--accent), var(--accent2))",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "12px 24px",
        fontWeight: 700,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
        letterSpacing: 0.3,
        boxShadow: disabled ? "none" : "0 4px 20px rgba(124,58,237,0.35)",
        transition: "transform 0.15s ease",
        ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

/* =========================================================
   5. SCREENS
========================================================= */
function HomeScreen({ onStart, imagesLoading }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, padding: "60px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent2)", fontWeight: 700 }}>PARTY GAME &middot; ANIME TRIVIA</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 52, margin: 0, lineHeight: 1.05, color: "var(--text)" }}>
        ANIME<span style={{ color: "var(--accent)" }}>MIND</span> ARENA
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 420, fontSize: 15 }}>
        Collect characters. Attack your friends. Defend with anime knowledge instead of fists.
        Pass the laptop, last collection standing wins.
      </p>
      <PrimaryButton 
        onClick={onStart} 
        disabled={imagesLoading}
        style={{ padding: "16px 36px", fontSize: 16 }}
      >
        {imagesLoading ? (
          <>
            <Loader2 size={18} className="spin" /> Loading Images from AniList...
          </>
        ) : (
          <>
            <Play size={18} /> Start Game
          </>
        )}
      </PrimaryButton>
      <div style={{ display: "flex", gap: 24, marginTop: 8, color: "var(--muted)", fontSize: 12 }}>
        <span>2–6 players</span>
        <span>&middot;</span>
        <span>100 characters</span>
        <span>&middot;</span>
        <span>12 challenge types</span>
      </div>
      {imagesLoading && (
        <div style={{ marginTop: 20, color: "var(--accent2)", fontSize: 13, textAlign: "center" }}>
          <div style={{ marginBottom: 8 }}>🎨 Loading anime character images from AniList API...</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            More reliable than Jikan/MAL • Check console (F12) for progress
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            ~10-15 seconds with AniList (99.9% uptime)
          </div>
        </div>
      )}
    </div>
  );
}

function CreateGameScreen({ onConfirm }) {
  const [count, setCount] = useState(3);
  const [names, setNames] = useState(["Player 1", "Player 2", "Player 3"]);

  const setCountAndNames = (n) => {
    setCount(n);
    setNames((prev) => {
      const next = [...prev];
      while (next.length < n) next.push(`Player ${next.length + 1}`);
      return next.slice(0, n);
    });
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontSize: 28 }}>Create Game</h2>
      <div style={{ margin: "20px 0" }}>
        <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8, letterSpacing: 0.5 }}>NUMBER OF PLAYERS</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setCountAndNames(n)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: count === n ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: count === n ? "var(--accent)22" : "transparent",
                color: "var(--text)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: 0.5 }}>PLAYER NAMES</div>
        {names.map((name, i) => (
          <input
            key={i}
            value={name}
            onChange={(e) => setNames((prev) => prev.map((p, idx) => (idx === i ? e.target.value : p)))}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "10px 14px",
              color: "var(--text)",
              fontSize: 14,
            }}
          />
        ))}
      </div>
      <PrimaryButton style={{ marginTop: 24, width: "100%" }} onClick={() => onConfirm(names)}>
        Open Starter Packs <ChevronRight size={16} />
      </PrimaryButton>
    </div>
  );
}

function PackOpeningScreen({ players, onDone, characterImages }) {
  const [revealedCount, setRevealedCount] = useState({});

  const revealNext = (playerId, total) => {
    setRevealedCount((prev) => {
      const cur = prev[playerId] || 0;
      return { ...prev, [playerId]: Math.min(cur + 1, total) };
    });
  };

  const allDone = players.every((p) => (revealedCount[p.id] || 0) >= p.characters.length);

  return (
    <div style={{ padding: "30px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "var(--font-display)", color: "var(--text)", textAlign: "center" }}>
        <Package size={22} style={{ marginRight: 8, verticalAlign: -3 }} />
        Opening Starter Packs
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 20 }}>
        {players.map((p) => {
          const revealed = revealedCount[p.id] || 0;
          return (
            <Panel key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ color: "var(--text)", fontWeight: 700 }}>{p.name}'s Pack</div>
                {revealed < p.characters.length ? (
                  <PrimaryButton onClick={() => revealNext(p.id, p.characters.length)} style={{ padding: "8px 16px", fontSize: 12 }}>
                    Reveal Card ({revealed}/{p.characters.length})
                  </PrimaryButton>
                ) : (
                  <span style={{ color: "var(--accent2)", fontSize: 12, fontWeight: 700 }}>Pack complete</span>
                )}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {p.characters.slice(0, revealed).map((c) => (
                  <CharacterCard 
                    key={c.instanceKey} 
                    char={c} 
                    compact 
                    disabled 
                    imageUrl={characterImages[c.id]}
                  />
                ))}
                {Array.from({ length: p.characters.length - revealed }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 110,
                      aspectRatio: "0.8",
                      borderRadius: 14,
                      background: "linear-gradient(135deg, var(--accent)33, var(--accent2)33)",
                      border: "1px dashed var(--border)",
                    }}
                  />
                ))}
              </div>
            </Panel>
          );
        })}
      </div>
      <PrimaryButton disabled={!allDone} style={{ marginTop: 24, width: "100%" }} onClick={onDone}>
        Begin Battle <Swords size={16} />
      </PrimaryButton>
    </div>
  );
}

function WinnerScreen({ winner, onReplay }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "70px 20px", textAlign: "center" }}>
      <Trophy size={56} color="#fbbf24" />
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--text)", margin: 0 }}>
        {winner?.name} Wins!
      </h1>
      <p style={{ color: "var(--muted)" }}>
        Last collection standing with {winner?.characters.filter((c) => c.alive).length} character(s) surviving.
      </p>
      <PrimaryButton onClick={onReplay}>
        <RefreshCw size={16} /> Play Again
      </PrimaryButton>
    </div>
  );
}

/* =========================================================
   6. BATTLE + CHALLENGE FLOW
========================================================= */
function BattleFlow({ players, setPlayers, onWinner, characterImages }) {
  const [attackerIndex, setAttackerIndex] = useState(0);
  const [phase, setPhase] = useState("selectOpponent");
  const [opponentId, setOpponentId] = useState(null);
  const [defenderKey, setDefenderKey] = useState(null);
  const [category, setCategory] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(null);
  const [loadError, setLoadError] = useState(false);

  const attacker = players[attackerIndex];
  const opponent = players.find((p) => p.id === opponentId);
  const defenderChar = opponent?.characters.find((c) => c.instanceKey === defenderKey);

  const nextAliveAttacker = (fromIndex) => {
    let idx = fromIndex;
    for (let i = 0; i < players.length; i++) {
      idx = (idx + 1) % players.length;
      if (players[idx].characters.some((c) => c.alive)) return idx;
    }
    return fromIndex;
  };

  const resetSelections = () => {
    setOpponentId(null);
    setDefenderKey(null);
    setCategory(null);
    setChallenge(null);
    setSelectedAnswer(null);
    setWasCorrect(null);
    setLoadError(false);
    setPhase("selectOpponent");
  };

  const loadChallenge = useCallback(async (char, catId) => {
    setPhase("loading");
    setLoadError(false);
    try {
      const result = await generateChallenge(char, catId, "medium");
      setChallenge(result);
      setPhase("challenge");
    } catch (e) {
      setLoadError(true);
      setPhase("challenge");
      setChallenge({
        category: catId,
        question: `Couldn't reach the challenge generator. Quick fallback: does ${char.name} look tougher than the average shonen sidekick?`,
        options: ["Yes, obviously", "No way", "Only on Tuesdays", "Depends on the arc"],
        correctIndex: 0,
        explanation: "Fallback question — try this category again next turn.",
      });
    }
  }, []);

  const handleSubmitAnswer = () => {
    const correct = selectedAnswer === challenge.correctIndex;
    setWasCorrect(correct);
    if (!correct) {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id !== opponent.id) return p;
          return {
            ...p,
            characters: p.characters.map((c) => {
              if (c.instanceKey !== defenderKey) return c;
              const lives = c.lives - 1;
              return { ...c, lives, alive: lives > 0 };
            }),
          };
        })
      );
    }
    setPhase("result");
  };

  const proceedAfterResult = () => {
    const remaining = players.filter((p) => p.characters.some((c) => c.alive));
    if (remaining.length <= 1) {
      onWinner(remaining[0]);
      return;
    }
    const nextIdx = nextAliveAttacker(attackerIndex);
    setAttackerIndex(nextIdx);
    resetSelections();
  };

  if (phase === "selectOpponent") {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <TurnBanner attacker={attacker} />
        <Panel style={{ marginTop: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 12 }}>
            {attacker.name}, choose your target:
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {players
              .filter((p) => p.id !== attacker.id && p.characters.some((c) => c.alive))
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setOpponentId(p.id);
                    setPhase("selectDefenderChar");
                  }}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 16,
                    color: "var(--text)",
                    cursor: "pointer",
                    minWidth: 140,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                    {p.characters.filter((c) => c.alive).length} characters alive
                  </div>
                </button>
              ))}
          </div>
        </Panel>
      </div>
    );
  }

  if (phase === "selectDefenderChar") {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <TurnBanner attacker={attacker} opponent={opponent} />
        <Panel style={{ marginTop: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 12 }}>
            {opponent.name}, choose a character to defend:
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {opponent.characters.map((c) => (
              <CharacterCard
                key={c.instanceKey}
                char={c}
                compact
                disabled={!c.alive}
                selected={defenderKey === c.instanceKey}
                imageUrl={characterImages[c.id]}
                onClick={() => {
                  if (!c.alive) return;
                  setDefenderKey(c.instanceKey);
                  setPhase("selectCategory");
                }}
              />
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  if (phase === "selectCategory") {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <TurnBanner attacker={attacker} opponent={opponent} defenderChar={defenderChar} />
        <Panel style={{ marginTop: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 12 }}>
            {attacker.name}, choose the challenge category:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    loadChallenge(defenderChar, cat.id);
                  }}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "14px 10px",
                    color: "var(--text)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                  }}
                >
                  <Icon size={18} color="var(--accent2)" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Panel>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 20px", gap: 14 }}>
        <Loader2 size={32} color="var(--accent)" className="spin" />
        <div style={{ color: "var(--muted)" }}>Summoning a {CATEGORIES.find((c) => c.id === category)?.label.toLowerCase()} challenge...</div>
      </div>
    );
  }

  if (phase === "challenge" && challenge) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px" }}>
        <TurnBanner attacker={attacker} opponent={opponent} defenderChar={defenderChar} category={category} />
        <Panel style={{ marginTop: 16 }}>
          {loadError && (
            <div style={{ color: "#fbbf24", fontSize: 12, marginBottom: 10 }}>
              Live challenge generator unavailable — using a fallback question.
            </div>
          )}
          <div style={{ color: "var(--text)", fontSize: 18, fontWeight: 700, marginBottom: 18 }}>{challenge.question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {challenge.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedAnswer(i)}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: selectedAnswer === i ? "2px solid var(--accent)" : "1px solid var(--border)",
                  background: selectedAnswer === i ? "var(--accent)22" : "var(--bg)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <PrimaryButton style={{ marginTop: 20, width: "100%" }} disabled={selectedAnswer === null} onClick={handleSubmitAnswer}>
            Submit Answer
          </PrimaryButton>
        </Panel>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px" }}>
        <Panel style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>{wasCorrect ? "✅" : "💔"}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: wasCorrect ? "#4ade80" : "#fb4b4b", marginBottom: 8 }}>
            {wasCorrect ? "Correct! Character survives." : "Wrong! Character loses a life."}
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 18 }}>{challenge.explanation}</div>
          <PrimaryButton style={{ width: "100%" }} onClick={proceedAfterResult}>
            Continue <ChevronRight size={16} />
          </PrimaryButton>
        </Panel>
      </div>
    );
  }

  return null;
}

function TurnBanner({ attacker, opponent, defenderChar, category }) {
  return (
    <Panel style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Swords size={18} color="var(--accent)" />
        <div>
          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{attacker.name}</div>
          <div style={{ color: "var(--muted)", fontSize: 11 }}>Attacking</div>
        </div>
      </div>
      {opponent && (
        <>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>vs</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opponent.name}</div>
            <div style={{ color: "var(--muted)", fontSize: 11 }}>
              {defenderChar ? defenderChar.name : "Defending"}
              {category ? ` · ${CATEGORIES.find((c) => c.id === category)?.label}` : ""}
            </div>
          </div>
        </>
      )}
    </Panel>
  );
}

/* =========================================================
   7. APP ROOT
========================================================= */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [characterImages, setCharacterImages] = useState({});
  const [imagesLoading, setImagesLoading] = useState(false);

  // Fetch all character images when game starts
  const handleStartGame = () => {
  setScreen("create"); // no fetching here anymore
};

const handleCreateConfirm = async (names) => {
  const packs = dealStarterPacks(names.length);
  const newPlayers = names.map((name, i) => ({
    id: `p${i}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    characters: packs[i],
  }));
  setPlayers(newPlayers);
  setScreen("packOpening");

  setImagesLoading(true);
  const dealtCharacters = packs.flat();
  const uniqueById = Array.from(
    new Map(dealtCharacters.map((c) => [c.id, c])).values()
  );
  const images = await fetchAllCharacterImagesAniList(uniqueById);
  setCharacterImages(images);
  setImagesLoading(false);
};
  const handleReplay = () => {
    setPlayers([]);
    setWinner(null);
    setScreen("home");
  };

  return (
    <div
      style={{
        "--bg": "#0b0b14",
        "--surface": "#14141f",
        "--border": "#242433",
        "--text": "#f1f0f5",
        "--muted": "#8b8a9a",
        "--accent": "#7c3aed",
        "--accent2": "#22d3ee",
        "--font-display": "'Bebas Neue', 'Arial Narrow', sans-serif",
        background: "var(--bg)",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus { outline: none; border-color: var(--accent) !important; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        button { font-family: inherit; }
      `}</style>

      {screen === "home" && <HomeScreen onStart={handleStartGame} />}
      {screen === "create" && <CreateGameScreen onConfirm={handleCreateConfirm} />}
      {screen === "packOpening" && (
        <PackOpeningScreen players={players} onDone={() => setScreen("battle")} characterImages={characterImages} />
      )}
      {screen === "battle" && (
        <BattleFlow
          players={players}
          setPlayers={setPlayers}
          onWinner={(w) => {
            setWinner(w);
            setScreen("winner");
          }}
          characterImages={characterImages}
        />
      )}
      {screen === "winner" && <WinnerScreen winner={winner} onReplay={handleReplay} />}
    </div>
  );
}