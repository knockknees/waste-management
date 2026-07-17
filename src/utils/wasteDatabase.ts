import { WasteClassification, MaterialType } from '../types/index';

// Comprehensive mapping of everyday objects to waste classification
export const wasteDatabase: Record<string, WasteClassification> = {
  // PLASTIC ITEMS
  'plastic bottle': {
    reduce: [
      'Use a reusable water bottle instead',
      'Buy drinks in bulk containers',
      'Choose products with minimal packaging'
    ],
    reuse: [
      'Use as a plant pot',
      'Convert to a pencil holder',
      'Use for storage in the garage'
    ],
    recycle: [
      'Check local recycling guidelines',
      'Rinse before recycling',
      'Remove labels if possible'
    ],
    priority: 'reduce'
  },
  
  'plastic bag': {
    reduce: [
      'Use reusable cloth bags for shopping',
      'Choose paper bags instead',
      'Buy items that don\'t require bags'
    ],
    reuse: [
      'Use as trash liners',
      'Store as packing material',
      'Use for pet waste disposal'
    ],
    recycle: [
      'Take to grocery store collection bins',
      'Don\'t put in curbside recycling'
    ],
    priority: 'reduce'
  },

  'plastic cup': {
    reduce: [
      'Use a reusable tumbler or mug',
      'Drink from glass or ceramic cups',
      'Bring your own cup to cafes'
    ],
    reuse: [
      'Use as a storage container',
      'Plant small herbs in it'
    ],
    recycle: [
      'Rinse thoroughly before recycling',
      'Check if #1 or #2 plastic'
    ],
    priority: 'reduce'
  },

  // PAPER ITEMS
  'paper': {
    reduce: [
      'Use digital documents instead',
      'Print double-sided when needed',
      'Avoid unnecessary printing'
    ],
    reuse: [
      'Use blank side for notes',
      'Donate to schools or art projects',
      'Use for composting'
    ],
    recycle: [
      'Place in blue bin',
      'Keep dry and clean',
      'Remove plastic windows from envelopes'
    ],
    priority: 'reduce'
  },

  'cardboard box': {
    reduce: [
      'Buy items without excess packaging',
      'Choose minimalist packaging',
      'Consolidate orders to reduce boxes'
    ],
    reuse: [
      'Use for storage',
      'Ship items to others',
      'Use as pet beds',
      'Art and craft projects'
    ],
    recycle: [
      'Flatten before recycling',
      'Remove all tape',
      'Place in curbside recycling'
    ],
    priority: 'reuse'
  },

  'newspaper': {
    reduce: [
      'Subscribe to digital news instead',
      'Read news online',
      'Reduce paper subscriptions'
    ],
    reuse: [
      'Use for pet litter',
      'Pack fragile items',
      'Start seeds for gardening',
      'Use as fire starter'
    ],
    recycle: [
      'Place in recycling bin',
      'Keep clean and dry'
    ],
    priority: 'reduce'
  },

  // GLASS ITEMS
  'glass bottle': {
    reduce: [
      'Buy drinks in larger containers',
      'Choose aluminum instead',
      'Buy from bulk stores'
    ],
    reuse: [
      'Use as decorative vase',
      'Store pantry items (pasta, flour)',
      'Use as a drinking glass',
      'DIY candle holders'
    ],
    recycle: [
      'Rinse thoroughly',
      'Place in recycling bin',
      'Remove caps and lids'
    ],
    priority: 'reduce'
  },

  'glass jar': {
    reduce: [
      'Buy items without glass packaging',
      'Purchase in bulk'
    ],
    reuse: [
      'Store leftovers (microwave safe)',
      'Organize pantry',
      'DIY gifts (fill with homemade items)',
      'Desk organizer'
    ],
    recycle: [
      'Rinse completely',
      'Place in glass recycling'
    ],
    priority: 'reuse'
  },

  // METAL ITEMS
  'aluminum can': {
    reduce: [
      'Avoid single-use beverages',
      'Buy larger multi-packs',
      'Use reusable bottles'
    ],
    reuse: [
      'Use as a pencil holder',
      'Planters for small herbs',
      'Craft projects'
    ],
    recycle: [
      'Rinse before recycling',
      'Highly recyclable - aluminum has high scrap value',
      'Place in curbside recycling'
    ],
    priority: 'reduce'
  },

  'metal can': {
    reduce: [
      'Cook meals from scratch',
      'Buy fresh produce instead'
    ],
    reuse: [
      'Storage containers',
      'DIY planters',
      'Craft supplies holder'
    ],
    recycle: [
      'Rinse thoroughly',
      'Remove labels if loose',
      'Check for sharp edges'
    ],
    priority: 'reduce'
  },

  'aluminum foil': {
    reduce: [
      'Use silicon mats or parchment paper',
      'Buy products without foil packaging',
      'Use glass storage containers'
    ],
    reuse: [
      'Clean and reuse for cooking',
      'Use for grilling again',
      'Crumple for cleaning purposes'
    ],
    recycle: [
      'Only if clean and formed into a ball (at least 5cm)',
      'Check local recycling guidelines'
    ],
    priority: 'reduce'
  },

  // ORGANIC/FOOD WASTE
  'food waste': {
    reduce: [
      'Plan meals and buy only what you need',
      'Store food properly to extend shelf life',
      'Use all parts of vegetables'
    ],
    reuse: [
      'Make stock from vegetable scraps',
      'Compost at home',
      'Feed to pets (safely)',
      'Use for garden soil'
    ],
    recycle: [
      'Composting is best',
      'Green waste bins if available',
      'Community composting programs'
    ],
    priority: 'reduce'
  },

  'fruit': {
    reduce: [
      'Buy loose fruit instead of pre-packaged',
      'Choose local farmers markets',
      'Reduce food waste'
    ],
    reuse: [
      'Compost peels and pits',
      'Make jams or preserves',
      'Share with neighbors'
    ],
    recycle: [
      'Compost all fruit waste',
      'Use in gardens'
    ],
    priority: 'reduce'
  },

  // TEXTILE ITEMS
  'clothing': {
    reduce: [
      'Buy less clothing',
      'Choose quality over quantity',
      'Buy secondhand items'
    ],
    reuse: [
      'Donate to thrift stores',
      'Share with friends and family',
      'Use for rags and cleaning cloths',
      'Repurpose into new garments'
    ],
    recycle: [
      'Textile recycling programs',
      'Some stores take old clothes',
      'Creative upcycling projects'
    ],
    priority: 'reuse'
  },

  'fabric scraps': {
    reduce: [
      'Plan sewing projects to minimize waste',
      'Buy exact amounts needed'
    ],
    reuse: [
      'Patchwork projects',
      'Filling for pillows/cushions',
      'Cleaning rags',
      'Pet bedding'
    ],
    recycle: [
      'Textile collection programs',
      'Composting (natural fibers only)'
    ],
    priority: 'reuse'
  },

  // ELECTRONICS
  'phone': {
    reduce: [
      'Keep phone longer (5+ years)',
      'Repair instead of replacing',
      'Buy refurbished devices'
    ],
    reuse: [
      'Donate to schools or nonprofits',
      'Give to family members',
      'Sell online (eBay, Facebook Marketplace)',
      'Trade-in programs'
    ],
    recycle: [
      'E-waste recycling facilities',
      'Manufacturer take-back programs',
      'Best Buy recycling',
      'Local e-waste collection'
    ],
    priority: 'reduce'
  },

  'computer': {
    reduce: [
      'Upgrade components instead of buying new',
      'Extend device lifespan',
      'Buy refurbished computers'
    ],
    reuse: [
      'Donate to schools',
      'Repurpose as media server',
      'Sell online',
      'Give to someone in need'
    ],
    recycle: [
      'E-waste recycling',
      'Certified electronics recyclers',
      'Manufacturer programs'
    ],
    priority: 'reduce'
  },

  'battery': {
    reduce: [
      'Use rechargeable batteries',
      'Solar-powered devices',
      'Avoid single-use batteries'
    ],
    reuse: [
      'Rechargeable battery chargers',
      'Some batteries can be refurbished'
    ],
    recycle: [
      'Take to battery recycling centers',
      'Hazardous waste collection',
      'Retailer recycling programs'
    ],
    priority: 'reduce'
  },

  // HAZARDOUS ITEMS
  'paint': {
    reduce: [
      'Buy only what you need',
      'Plan projects carefully',
      'Use paint calculators'
    ],
    reuse: [
      'Save for touch-ups',
      'Share with neighbors',
      'Donate to community centers'
    ],
    recycle: [
      'Hazardous waste disposal facilities',
      'Never pour down drain',
      'Check local guidelines'
    ],
    dispose: [
      'Professional disposal required'
    ],
    priority: 'dispose'
  },

  'battery (disposable)': {
    reduce: [
      'Use rechargeable batteries',
      'Avoid single-use batteries'
    ],
    reuse: [],
    recycle: [
      'Battery recycling programs',
      'Hazardous waste facilities',
      'Retailer take-back programs'
    ],
    dispose: [
      'Never throw in regular trash',
      'Hazardous waste pickup'
    ],
    priority: 'dispose'
  },

  // MIXED/COMPOSITE ITEMS
  'pizza box': {
    reduce: [
      'Reduce takeout ordering',
      'Choose restaurants with minimal packaging'
    ],
    reuse: [
      'Storage boxes',
      'Pet beds',
      'Art projects',
      'Compost if no grease'
    ],
    recycle: [
      'Only if clean and dry',
      'Grease-stained boxes go to compost',
      'Remove any plastic windows'
    ],
    priority: 'reduce'
  },

  'styrofoam': {
    reduce: [
      'Avoid products with styrofoam packaging',
      'Request non-styrofoam alternatives',
      'Choose sustainable packaging'
    ],
    reuse: [
      'Packing material storage',
      'Craft projects',
      'Garden mulch (NOT recommended)'
    ],
    recycle: [
      'Check local programs - rarely accepted',
      'Some specialized recyclers take it',
      'Usually goes to landfill'
    ],
    priority: 'reduce'
  },

  'mixed waste': {
    reduce: [
      'Buy single-material products',
      'Avoid multi-layered packaging'
    ],
    reuse: [],
    recycle: [
      'Separate into individual materials',
      'Check local guidelines'
    ],
    dispose: [
      'May need to go to landfill'
    ],
    priority: 'dispose'
  }
};

// Helper function to get classification for an object
export function getWasteClassification(objectName: string): WasteClassification {
  const normalizedName = objectName.toLowerCase().trim();
  return wasteDatabase[normalizedName] || {
    reduce: ['Check if you can purchase less of this item'],
    reuse: ['Check if it can be reused creatively'],
    recycle: ['Check local recycling guidelines'],
    priority: 'dispose'
  };
}

// Helper to get material type
export function getMaterialType(objectName: string): MaterialType {
  const normalizedName = objectName.toLowerCase();
  
  if (normalizedName.includes('plastic')) return 'plastic';
  if (normalizedName.includes('paper') || normalizedName.includes('cardboard') || normalizedName.includes('box')) return 'paper';
  if (normalizedName.includes('glass')) return 'glass';
  if (normalizedName.includes('metal') || normalizedName.includes('can') || normalizedName.includes('aluminum')) return 'metal';
  if (normalizedName.includes('food') || normalizedName.includes('fruit') || normalizedName.includes('waste')) return 'organic';
  if (normalizedName.includes('cloth') || normalizedName.includes('fabric') || normalizedName.includes('clothing')) return 'textile';
  if (normalizedName.includes('phone') || normalizedName.includes('computer') || normalizedName.includes('battery') || normalizedName.includes('electronic')) return 'electronics';
  if (normalizedName.includes('paint') || normalizedName.includes('hazard')) return 'hazardous';
  
  return 'mixed';
}