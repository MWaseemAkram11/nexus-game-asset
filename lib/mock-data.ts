// Mock game assets data for demonstration
import type { GameAsset } from "./types"

export const MOCK_ASSETS: GameAsset[] = [
  {
    id: "001",
    name: "Dragon Sword",
    image: "/legendary-dragon-sword-fantasy-weapon.jpg",
    ownerAddress: "0xab2d45Cc6634C0532925a3b8Da68D4567890f891",
    description: "An ancient legendary sword forged in dragon fire",
    rarity: "legendary",
    price: 5.5,
  },
  {
    id: "002",
    name: "Magic Shield",
    image: "/magical-shield-with-glowing-runes.jpg",
    ownerAddress: "0x7f3a1d9C0532925a3b8Da68D4567e4b2c4b2",
    description: "A protective shield enchanted with ancient magic",
    rarity: "epic",
    price: 3.2,
  },
  {
    id: "003",
    name: "Fire Staff",
    image: "/fire-staff-with-flames.jpg",
    ownerAddress: "0xcd4e5f6a7890b1234567890de673abc",
    description: "Staff that channels pure fire elemental power",
    rarity: "epic",
    price: 2.8,
  },
  {
    id: "004",
    name: "Ice Crown",
    image: "/crown-made-of-ice-crystals.jpg",
    ownerAddress: "0x7f3a1d9C0532925a3b8Da68D4567e4b2c4b2",
    description: "A crown forged from enchanted ice",
    rarity: "legendary",
    price: 6.1,
  },
  {
    id: "005",
    name: "Golden Armor",
    image: "/golden-armor-shining.jpg",
    ownerAddress: "0x7f3a1d9C0532925a3b8Da68D4567e4b2c4b2",
    description: "Armor crafted from pure gold and mithril",
    rarity: "rare",
    price: 4.2,
  },
  {
    id: "006",
    name: "Shadow Dagger",
    image: "/dark-shadow-dagger-weapon.jpg",
    ownerAddress: "0x1a2b3c4d5e6f7890abcdef1234567890",
    description: "A dagger shrouded in shadow magic",
    rarity: "rare",
    price: 1.8,
  },
  {
    id: "007",
    name: "Phoenix Amulet",
    image: "/phoenix-pendant-glowing.jpg",
    ownerAddress: "0x7f3a1d9C0532925a3b8Da68D4567e4b2c4b2",
    description: "An amulet containing the essence of a phoenix",
    rarity: "legendary",
    price: 7.5,
  },
  {
    id: "008",
    name: "Mithril Ring",
    image: "/silver-ring-with-gems.jpg",
    ownerAddress: "0x9x8x7x6x5x4x3x2x1x0xabcdefghijk",
    description: "A ring forged from enchanted mithril metal",
    rarity: "common",
    price: 0.9,
  },
]

export const CONNECTED_WALLET_ADDRESS = "0x7f3a1d9C0532925a3b8Da68D4567e4b2c4b2"
