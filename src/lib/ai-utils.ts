import { toast } from "@/components/ui/sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Types for our AI system
export type Symptom = {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: 'acute' | 'chronic';
};

export type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
  reportCount: number;
};

export type SymptomReport = {
  id: string;
  userId: string;
  symptoms: Symptom[];
  location: Location;
  timestamp: Date;
};

export type AIInsight = {
  id: string;
  title: string;
  description: string;
  confidenceScore: number;
  relatedSymptoms: string[];
  timestamp: Date;
  severity: 'info' | 'warning' | 'alert';
};

// Real symptoms based on current health monitoring
export const availableSymptoms: Symptom[] = [
  { id: 's1', name: 'Fever', severity: 'moderate', duration: 'acute' },
  { id: 's2', name: 'Cough', severity: 'mild', duration: 'acute' },
  { id: 's3', name: 'Shortness of Breath', severity: 'severe', duration: 'acute' },
  { id: 's4', name: 'Fatigue', severity: 'moderate', duration: 'chronic' },
  { id: 's5', name: 'Headache', severity: 'mild', duration: 'acute' },
  { id: 's6', name: 'Muscle Pain', severity: 'moderate', duration: 'acute' },
  { id: 's7', name: 'Sore Throat', severity: 'mild', duration: 'acute' },
  { id: 's8', name: 'Loss of Taste/Smell', severity: 'moderate', duration: 'chronic' },
  { id: 's9', name: 'Nausea', severity: 'moderate', duration: 'acute' },
  { id: 's10', name: 'Diarrhea', severity: 'moderate', duration: 'acute' },
  { id: 's11', name: 'Runny Nose', severity: 'mild', duration: 'acute' },
  { id: 's12', name: 'Body Aches', severity: 'moderate', duration: 'acute' },
  { id: 's13', name: 'Chest Pain', severity: 'severe', duration: 'acute' },
  { id: 's14', name: 'Skin Rash', severity: 'moderate', duration: 'chronic' },
  { id: 's15', name: 'Joint Pain', severity: 'moderate', duration: 'chronic' },
  { id: 's16', name: 'Back Pain', severity: 'moderate', duration: 'chronic' },
  { id: 's17', name: 'Stomach Pain', severity: 'moderate', duration: 'acute' },
  { id: 's18', name: 'Vomiting', severity: 'moderate', duration: 'acute' },
  { id: 's19', name: 'Dizziness', severity: 'moderate', duration: 'acute' },
  { id: 's20', name: 'Insomnia', severity: 'mild', duration: 'chronic' },
  { id: 's21', name: 'Anxiety', severity: 'moderate', duration: 'chronic' },
  { id: 's22', name: 'Depression', severity: 'moderate', duration: 'chronic' },
  { id: 's23', name: 'Migraine', severity: 'severe', duration: 'acute' },
  { id: 's24', name: 'Allergic Reaction', severity: 'severe', duration: 'acute' },
  { id: 's25', name: 'High Blood Pressure', severity: 'moderate', duration: 'chronic' },
  { id: 's26', name: 'Diabetes Symptoms', severity: 'moderate', duration: 'chronic' },
  { id: 's27', name: 'Heart Palpitations', severity: 'severe', duration: 'acute' },
  { id: 's28', name: 'Bleeding', severity: 'severe', duration: 'acute' },
  { id: 's29', name: 'Swelling', severity: 'moderate', duration: 'acute' },
  { id: 's30', name: 'Weight Loss', severity: 'moderate', duration: 'chronic' },
];

// Disease outbreak data types
export type DiseaseOutbreak = {
  id: string;
  name: 'COVID-19' | 'Influenza A' | 'RSV' | 'Norovirus' | 'Pertussis' | 'Measles';
  cases: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  severity: 'low' | 'moderate' | 'high' | 'critical';
};

// Climate and natural disaster types
export type ClimateAlert = {
  id: string;
  type: 'heat_wave' | 'cold_snap' | 'air_quality' | 'wildfire' | 'drought' | 'excessive_rain';
  severity: 'advisory' | 'watch' | 'warning' | 'emergency';
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  affectedAreas: string[];
  healthImpacts: string[];
  recommendations: string[];
};

export type NaturalDisasterRisk = {
  earthquake: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    lastMajorEvent: string;
    magnitude: number;
    probability30Year: number;
  };
  flood: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    floodZone: string;
    historicalEvents: number;
    seasonalRisk: 'low' | 'moderate' | 'high';
  };
  wildfire: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    currentSeason: 'low' | 'moderate' | 'high' | 'extreme';
    nearbyFires: number;
    evacuationZone: string;
  };
};

export type LocationWithOutbreaks = Location & {
  county: string;
  population: number;
  outbreaks: DiseaseOutbreak[];
  climateAlerts: ClimateAlert[];
  naturalDisasterRisk: NaturalDisasterRisk;
  airQualityIndex: number;
  uvIndex: number;
  temperature: number;
  humidity: number;
  lastUpdated: Date;
};

// California cities and counties with current disease outbreak data
export const monitoredLocations: LocationWithOutbreaks[] = [
  { 
    id: 'l1', 
    name: 'Los Angeles', 
    county: 'Los Angeles County',
    lat: 34.0522, 
    lng: -118.2437, 
    riskLevel: 'high', 
    reportCount: 1247,
    population: 3971883,
    airQualityIndex: 152,
    uvIndex: 8,
    temperature: 75,
    humidity: 65,
    lastUpdated: new Date('2025-01-24T10:30:00'),
    outbreaks: [
      { id: 'o1', name: 'COVID-19', cases: 892, trend: 'stable', severity: 'moderate' },
      { id: 'o2', name: 'Influenza A', cases: 234, trend: 'increasing', severity: 'high' },
      { id: 'o3', name: 'RSV', cases: 121, trend: 'decreasing', severity: 'moderate' }
    ],
    climateAlerts: [
      {
        id: 'ca1',
        type: 'air_quality',
        severity: 'warning',
        title: 'Unhealthy Air Quality Alert',
        description: 'Air quality is unhealthy due to high levels of particulate matter and ozone.',
        startDate: new Date('2025-01-24T06:00:00'),
        endDate: new Date('2025-01-25T18:00:00'),
        affectedAreas: ['Downtown LA', 'Hollywood', 'San Fernando Valley'],
        healthImpacts: ['Respiratory irritation', 'Increased asthma symptoms', 'Eye irritation'],
        recommendations: ['Limit outdoor activities', 'Use air purifiers indoors', 'Wear N95 masks outdoors']
      },
      {
        id: 'ca2',
        type: 'heat_wave',
        severity: 'watch',
        title: 'Excessive Heat Watch',
        description: 'Temperatures expected to reach 95-105°F over the next 3 days.',
        startDate: new Date('2025-01-25T10:00:00'),
        endDate: new Date('2025-01-27T20:00:00'),
        affectedAreas: ['Inland valleys', 'San Fernando Valley', 'Antelope Valley'],
        healthImpacts: ['Heat exhaustion', 'Dehydration', 'Heat stroke risk'],
        recommendations: ['Stay hydrated', 'Avoid outdoor activities 10am-6pm', 'Check on elderly neighbors']
      }
    ],
    naturalDisasterRisk: {
      earthquake: {
        riskLevel: 'very_high',
        lastMajorEvent: 'Northridge 1994 (M6.7)',
        magnitude: 6.7,
        probability30Year: 60
      },
      flood: {
        riskLevel: 'moderate',
        floodZone: 'X',
        historicalEvents: 12,
        seasonalRisk: 'moderate'
      },
      wildfire: {
        riskLevel: 'high',
        currentSeason: 'high',
        nearbyFires: 3,
        evacuationZone: 'Zone C'
      }
    }
  },
  { 
    id: 'l2', 
    name: 'San Diego', 
    county: 'San Diego County',
    lat: 32.7157, 
    lng: -117.1611, 
    riskLevel: 'moderate', 
    reportCount: 578,
    population: 1423851,
    airQualityIndex: 78,
    uvIndex: 9,
    temperature: 72,
    humidity: 58,
    lastUpdated: new Date('2025-01-24T11:15:00'),
    outbreaks: [
      { id: 'o4', name: 'COVID-19', cases: 342, trend: 'stable', severity: 'low' },
      { id: 'o5', name: 'Norovirus', cases: 167, trend: 'increasing', severity: 'moderate' },
      { id: 'o6', name: 'RSV', cases: 69, trend: 'decreasing', severity: 'low' }
    ],
    climateAlerts: [
      {
        id: 'ca3',
        type: 'wildfire',
        severity: 'watch',
        title: 'Red Flag Warning',
        description: 'Critical fire weather conditions with strong Santa Ana winds and low humidity.',
        startDate: new Date('2025-01-24T08:00:00'),
        endDate: new Date('2025-01-25T20:00:00'),
        affectedAreas: ['East County', 'Ramona', 'Julian'],
        healthImpacts: ['Smoke exposure', 'Respiratory irritation', 'Evacuation stress'],
        recommendations: ['Prepare evacuation kit', 'Monitor fire updates', 'Close windows']
      }
    ],
    naturalDisasterRisk: {
      earthquake: {
        riskLevel: 'high',
        lastMajorEvent: 'Hector Mine 1999 (M7.1)',
        magnitude: 7.1,
        probability30Year: 45
      },
      flood: {
        riskLevel: 'low',
        floodZone: 'X',
        historicalEvents: 5,
        seasonalRisk: 'low'
      },
      wildfire: {
        riskLevel: 'very_high',
        currentSeason: 'extreme',
        nearbyFires: 2,
        evacuationZone: 'Zone B'
      }
    }
  },
  { 
    id: 'l3', 
    name: 'San Jose', 
    county: 'Santa Clara County',
    lat: 37.3382, 
    lng: -121.8863, 
    riskLevel: 'severe', 
    reportCount: 743,
    population: 1013240,
    airQualityIndex: 165,
    uvIndex: 7,
    temperature: 68,
    humidity: 72,
    lastUpdated: new Date('2025-01-24T09:45:00'),
    outbreaks: [
      { id: 'o7', name: 'COVID-19', cases: 445, trend: 'increasing', severity: 'high' },
      { id: 'o8', name: 'Influenza A', cases: 198, trend: 'increasing', severity: 'critical' },
      { id: 'o9', name: 'Pertussis', cases: 34, trend: 'stable', severity: 'moderate' },
      { id: 'o10', name: 'RSV', cases: 66, trend: 'stable', severity: 'moderate' }
    ],
    climateAlerts: [
      {
        id: 'ca4',
        type: 'air_quality',
        severity: 'emergency',
        title: 'Hazardous Air Quality Emergency',
        description: 'Air quality has reached hazardous levels due to wildfire smoke and industrial pollution.',
        startDate: new Date('2025-01-24T00:00:00'),
        endDate: new Date('2025-01-26T23:59:00'),
        affectedAreas: ['San Jose', 'Santa Clara', 'Sunnyvale'],
        healthImpacts: ['Severe respiratory distress', 'Cardiovascular complications', 'Eye and throat irritation'],
        recommendations: ['Stay indoors', 'Use air purifiers', 'Avoid all outdoor activities', 'Wear N95 masks if must go outside']
      }
    ],
    naturalDisasterRisk: {
      earthquake: {
        riskLevel: 'very_high',
        lastMajorEvent: 'Loma Prieta 1989 (M6.9)',
        magnitude: 6.9,
        probability30Year: 72
      },
      flood: {
        riskLevel: 'low',
        floodZone: 'X',
        historicalEvents: 3,
        seasonalRisk: 'low'
      },
      wildfire: {
        riskLevel: 'moderate',
        currentSeason: 'moderate',
        nearbyFires: 1,
        evacuationZone: 'Zone D'
      }
    }
  },
  { 
    id: 'l4', 
    name: 'San Francisco', 
    county: 'San Francisco County',
    lat: 37.7749, 
    lng: -122.4194, 
    riskLevel: 'high', 
    reportCount: 492,
    population: 873965,
    airQualityIndex: 89,
    uvIndex: 6,
    temperature: 62,
    humidity: 85,
    lastUpdated: new Date('2025-01-24T12:00:00'),
    outbreaks: [
      { id: 'o11', name: 'COVID-19', cases: 287, trend: 'stable', severity: 'moderate' },
      { id: 'o12', name: 'Influenza A', cases: 134, trend: 'increasing', severity: 'high' },
      { id: 'o13', name: 'Norovirus', cases: 71, trend: 'decreasing', severity: 'low' }
    ],
    climateAlerts: [],
    naturalDisasterRisk: {
      earthquake: {
        riskLevel: 'very_high',
        lastMajorEvent: 'Loma Prieta 1989 (M6.9)',
        magnitude: 6.9,
        probability30Year: 70
      },
      flood: {
        riskLevel: 'low',
        floodZone: 'X',
        historicalEvents: 2,
        seasonalRisk: 'low'
      },
      wildfire: {
        riskLevel: 'low',
        currentSeason: 'low',
        nearbyFires: 0,
        evacuationZone: 'Zone E'
      }
    }
  },
  { 
    id: 'l5', 
    name: 'Fresno', 
    county: 'Fresno County',
    lat: 36.7378, 
    lng: -119.7871, 
    riskLevel: 'moderate', 
    reportCount: 298,
    population: 542107,
    lastUpdated: new Date('2025-01-24T08:30:00'),
    outbreaks: [
      { id: 'o14', name: 'COVID-19', cases: 156, trend: 'stable', severity: 'low' },
      { id: 'o15', name: 'RSV', cases: 89, trend: 'increasing', severity: 'moderate' },
      { id: 'o16', name: 'Influenza A', cases: 53, trend: 'stable', severity: 'moderate' }
    ]
  },
  { 
    id: 'l6', 
    name: 'Sacramento', 
    county: 'Sacramento County',
    lat: 38.5816, 
    lng: -121.4944, 
    riskLevel: 'moderate', 
    reportCount: 367,
    population: 524943,
    lastUpdated: new Date('2025-01-24T10:15:00'),
    outbreaks: [
      { id: 'o17', name: 'COVID-19', cases: 201, trend: 'decreasing', severity: 'low' },
      { id: 'o18', name: 'Influenza A', cases: 112, trend: 'stable', severity: 'moderate' },
      { id: 'o19', name: 'RSV', cases: 54, trend: 'decreasing', severity: 'low' }
    ]
  },
  { 
    id: 'l7', 
    name: 'Long Beach', 
    county: 'Los Angeles County',
    lat: 33.7701, 
    lng: -118.1937, 
    riskLevel: 'high', 
    reportCount: 423,
    population: 466742,
    lastUpdated: new Date('2025-01-24T11:45:00'),
    outbreaks: [
      { id: 'o20', name: 'COVID-19', cases: 234, trend: 'stable', severity: 'moderate' },
      { id: 'o21', name: 'Norovirus', cases: 127, trend: 'increasing', severity: 'high' },
      { id: 'o22', name: 'RSV', cases: 62, trend: 'stable', severity: 'moderate' }
    ]
  },
  { 
    id: 'l8', 
    name: 'Oakland', 
    county: 'Alameda County',
    lat: 37.8044, 
    lng: -122.2712, 
    riskLevel: 'moderate', 
    reportCount: 312,
    population: 440646,
    lastUpdated: new Date('2025-01-24T09:20:00'),
    outbreaks: [
      { id: 'o23', name: 'COVID-19', cases: 178, trend: 'stable', severity: 'low' },
      { id: 'o24', name: 'Influenza A', cases: 89, trend: 'increasing', severity: 'moderate' },
      { id: 'o25', name: 'RSV', cases: 45, trend: 'decreasing', severity: 'low' }
    ]
  },
  { 
    id: 'l9', 
    name: 'Bakersfield', 
    county: 'Kern County',
    lat: 35.3733, 
    lng: -119.0187, 
    riskLevel: 'low', 
    reportCount: 167,
    population: 380874,
    lastUpdated: new Date('2025-01-24T07:45:00'),
    outbreaks: [
      { id: 'o26', name: 'COVID-19', cases: 89, trend: 'stable', severity: 'low' },
      { id: 'o27', name: 'RSV', cases: 56, trend: 'stable', severity: 'low' },
      { id: 'o28', name: 'Influenza A', cases: 22, trend: 'decreasing', severity: 'low' }
    ]
  },
  { 
    id: 'l10', 
    name: 'Anaheim', 
    county: 'Orange County',
    lat: 33.8366, 
    lng: -117.9143, 
    riskLevel: 'moderate', 
    reportCount: 278,
    population: 346824,
    lastUpdated: new Date('2025-01-24T10:00:00'),
    outbreaks: [
      { id: 'o29', name: 'COVID-19', cases: 145, trend: 'stable', severity: 'moderate' },
      { id: 'o30', name: 'Influenza A', cases: 87, trend: 'increasing', severity: 'moderate' },
      { id: 'o31', name: 'RSV', cases: 46, trend: 'stable', severity: 'low' }
    ]
  },
  { 
    id: 'l11', 
    name: 'Stockton', 
    county: 'San Joaquin County',
    lat: 37.9577, 
    lng: -121.2908, 
    riskLevel: 'high', 
    reportCount: 394,
    population: 310496,
    lastUpdated: new Date('2025-01-24T08:15:00'),
    outbreaks: [
      { id: 'o32', name: 'COVID-19', cases: 198, trend: 'increasing', severity: 'high' },
      { id: 'o33', name: 'Norovirus', cases: 123, trend: 'increasing', severity: 'moderate' },
      { id: 'o34', name: 'RSV', cases: 73, trend: 'stable', severity: 'moderate' }
    ]
  },
  { 
    id: 'l12', 
    name: 'Riverside', 
    county: 'Riverside County',
    lat: 33.9533, 
    lng: -117.3962, 
    riskLevel: 'moderate', 
    reportCount: 256,
    population: 314998,
    lastUpdated: new Date('2025-01-24T09:30:00'),
    outbreaks: [
      { id: 'o35', name: 'COVID-19', cases: 134, trend: 'stable', severity: 'low' },
      { id: 'o36', name: 'RSV', cases: 78, trend: 'increasing', severity: 'moderate' },
      { id: 'o37', name: 'Influenza A', cases: 44, trend: 'stable', severity: 'low' }
    ]
  },
  { 
    id: 'l13', 
    name: 'Santa Ana', 
    county: 'Orange County',
    lat: 33.7455, 
    lng: -117.8677, 
    riskLevel: 'severe', 
    reportCount: 445,
    population: 310227,
    lastUpdated: new Date('2025-01-24T11:30:00'),
    outbreaks: [
      { id: 'o38', name: 'COVID-19', cases: 223, trend: 'increasing', severity: 'high' },
      { id: 'o39', name: 'Measles', cases: 12, trend: 'increasing', severity: 'critical' },
      { id: 'o40', name: 'Influenza A', cases: 134, trend: 'stable', severity: 'high' },
      { id: 'o41', name: 'RSV', cases: 76, trend: 'stable', severity: 'moderate' }
    ]
  },
  { 
    id: 'l14', 
    name: 'Irvine', 
    county: 'Orange County',
    lat: 33.6846, 
    lng: -117.8265, 
    riskLevel: 'low', 
    reportCount: 134,
    population: 307670,
    lastUpdated: new Date('2025-01-24T12:15:00'),
    outbreaks: [
      { id: 'o42', name: 'COVID-19', cases: 67, trend: 'stable', severity: 'low' },
      { id: 'o43', name: 'RSV', cases: 45, trend: 'decreasing', severity: 'low' },
      { id: 'o44', name: 'Influenza A', cases: 22, trend: 'stable', severity: 'low' }
    ]
  },
  { 
    id: 'l15', 
    name: 'Chula Vista', 
    county: 'San Diego County',
    lat: 32.6401, 
    lng: -117.0842, 
    riskLevel: 'moderate', 
    reportCount: 198,
    population: 275487,
    lastUpdated: new Date('2025-01-24T10:45:00'),
    outbreaks: [
      { id: 'o45', name: 'COVID-19', cases: 98, trend: 'stable', severity: 'low' },
      { id: 'o46', name: 'Influenza A', cases: 67, trend: 'increasing', severity: 'moderate' },
      { id: 'o47', name: 'RSV', cases: 33, trend: 'stable', severity: 'low' }
    ]
  },
];

// California-specific AI insights based on current health monitoring patterns
export const aiInsights: AIInsight[] = [
  {
    id: 'i1',
    title: 'Influenza A Critical Surge - Santa Clara County',
    description: 'AI detected critical surge in Influenza A cases across San Jose and surrounding areas. Hospital capacity approaching limits with 94% confidence. Emergency protocols activated.',
    confidenceScore: 0.94,
    relatedSymptoms: ['Fever', 'Cough', 'Muscle Pain', 'Fatigue', 'Headache'],
    timestamp: new Date('2025-01-24T08:45:00'),
    severity: 'alert'
  },
  {
    id: 'i2',
    title: 'Measles Outbreak Alert - Orange County',
    description: 'Critical measles outbreak detected in Santa Ana with rapid community spread. 12 confirmed cases with high transmission risk. Immediate vaccination campaigns initiated.',
    confidenceScore: 0.97,
    relatedSymptoms: ['Fever', 'Skin Rash', 'Cough', 'Runny Nose'],
    timestamp: new Date('2025-01-24T11:30:00'),
    severity: 'alert'
  },
  {
    id: 'i3',
    title: 'Norovirus Cluster - Los Angeles County',
    description: 'Significant norovirus activity detected in Long Beach area. Pattern suggests foodborne transmission with 85% confidence. Restaurant inspections underway.',
    confidenceScore: 0.85,
    relatedSymptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach Pain'],
    timestamp: new Date('2025-01-24T11:45:00'),
    severity: 'warning'
  },
  {
    id: 'i4',
    title: 'COVID-19 Uptick - Northern California',
    description: 'Moderate increase in COVID-19 cases across San Francisco Bay Area. New variant potentially driving transmission with 78% confidence.',
    confidenceScore: 0.78,
    relatedSymptoms: ['Fever', 'Cough', 'Loss of Taste/Smell', 'Fatigue'],
    timestamp: new Date('2025-01-24T09:20:00'),
    severity: 'warning'
  },
  {
    id: 'i5',
    title: 'RSV Season Peak - Statewide',
    description: 'RSV activity reaching seasonal peak across California pediatric populations. Expected pattern with increased hospitalizations in vulnerable groups.',
    confidenceScore: 0.88,
    relatedSymptoms: ['Cough', 'Runny Nose', 'Fever', 'Shortness of Breath'],
    timestamp: new Date('2025-01-24T07:15:00'),
    severity: 'info'
  },
  {
    id: 'i6',
    title: 'Environmental Health Alert - Central Valley',
    description: 'Air quality concerns in Fresno and Stockton regions correlating with increased respiratory symptoms. Wildfire smoke and agricultural factors monitored.',
    confidenceScore: 0.73,
    relatedSymptoms: ['Cough', 'Shortness of Breath', 'Chest Pain', 'Headache'],
    timestamp: new Date('2025-01-24T06:30:00'),
    severity: 'warning'
  }
];

// Mock chat responses based on symptoms
const chatResponses = {
  'Fever': [
    "Based on your reported fever, I recommend monitoring your temperature and staying hydrated. If it persists above 101°F for more than 24 hours, please consult a healthcare provider.",
    "Fever can be a sign of infection. Rest is important, and over-the-counter fever reducers may help with discomfort. If accompanied by severe symptoms, seek medical care."
  ],
  'Cough': [
    "For your cough, try drinking warm liquids and using honey (if over 1 year old). If it persists more than a week or is producing colored phlegm, please consult a healthcare provider.",
    "A persistent cough should be monitored. If you experience shortness of breath or the cough worsens suddenly, please seek medical attention."
  ],
  'Shortness of Breath': [
    "Shortness of breath requires immediate medical attention, especially if sudden or severe. Please contact emergency services or go to the nearest emergency department.",
    "This symptom needs prompt medical evaluation. While waiting for care, try to remain calm and sit upright to help ease breathing."
  ],
  'default': [
    "Based on the symptoms you've shared, I recommend monitoring your condition and ensuring you stay hydrated and rested. If symptoms persist or worsen, please consult with a healthcare provider.",
    "Thank you for reporting your symptoms. While I can provide general guidance, a healthcare professional can offer personalized medical advice for your specific situation."
  ]
};

// Function to generate a response based on symptoms
export const generateAIResponse = (symptoms: Symptom[]): string => {
  if (symptoms.length === 0) {
    return "Please describe your symptoms so I can provide appropriate guidance.";
  }
  
  const severeSymptom = symptoms.find(s => s.severity === 'severe');
  if (severeSymptom) {
    const responses = chatResponses[severeSymptom.name as keyof typeof chatResponses] || chatResponses.default;
    return responses[0];
  }
  
  const firstSymptom = symptoms[0];
  const responses = chatResponses[firstSymptom.name as keyof typeof chatResponses] || chatResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Function to simulate reporting a symptom with real-time updates
export const reportSymptom = async (symptomIds: string[], locationId: string): Promise<boolean> => {
  // This would connect to a real backend API in production
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update real-time data (in production this would be handled by the backend)
      const location = monitoredLocations.find(loc => loc.id === locationId);
      if (location) {
        location.reportCount += 1;
        location.lastUpdated = new Date();
        
        // Check if symptoms match any ongoing outbreaks and potentially update trends
        const symptomNames = symptomIds.map(id => availableSymptoms.find(s => s.id === id)?.name).filter(Boolean);
        
        // Simulate trend analysis based on reported symptoms
        if (symptomNames.includes('Fever') || symptomNames.includes('Cough')) {
          const covidOutbreak = location.outbreaks.find(o => o.name === 'COVID-19');
          if (covidOutbreak && Math.random() > 0.7) {
            covidOutbreak.cases += 1;
          }
        }
        
        if (symptomNames.includes('Nausea') || symptomNames.includes('Diarrhea')) {
          const norovirusOutbreak = location.outbreaks.find(o => o.name === 'Norovirus');
          if (norovirusOutbreak && Math.random() > 0.6) {
            norovirusOutbreak.cases += 1;
            norovirusOutbreak.trend = 'increasing';
          }
        }
      }
      
      toast.success("Symptoms reported successfully. Thank you for contributing to public health monitoring.");
      resolve(true);
    }, 1500);
  });
};

// Function to analyze voice input (simulation)
export const processVoiceInput = async (audioBlob: Blob): Promise<string> => {
  // In a real app, this would send the audio to a speech-to-text service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("I've been experiencing fever and cough for the past two days.");
    }, 2000);
  });
};

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to get healthcare advice from Gemini API
export const fetchGeminiAdvice = async (userInput: string, symptoms: Symptom[]): Promise<string> => {
  try {
    const symptomNames = symptoms.map(s => s.name).join(', ');
    
    const prompt = `You are a healthcare assistant AI designed to provide helpful, accurate, and safe medical guidance. You should:

1. Always recommend consulting with healthcare professionals for serious concerns
2. Provide general health information and self-care tips
3. Never diagnose specific conditions
4. Always emphasize when to seek immediate medical attention
5. Be empathetic and supportive
6. Focus on evidence-based health information

User's message: "${userInput}"
${symptoms.length > 0 ? `Identified symptoms: ${symptomNames}` : ''}

Please provide a helpful, caring response with appropriate medical guidance. If any symptoms suggest serious conditions, emphasize the need for immediate medical attention. Include practical self-care advice when appropriate, and always remind users that this is general information, not a substitute for professional medical advice.

Response should be conversational, empathetic, and focused on the user's wellbeing.`;

    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Fallback to local response
    return generateAIResponse(symptoms);
  }
};

// Function to analyze X-ray images using Gemini Vision
export const analyzeXrayImage = async (imageFile: File): Promise<string> => {
  try {
    // Convert image to base64
    const imageBase64 = await fileToGenerativePart(imageFile);
    
    const prompt = `You are a specialized medical AI assistant focused on X-ray analysis. Please analyze this X-ray image and provide:

1. General observations about the image quality and positioning
2. Identify any visible abnormalities or areas of concern
3. Suggest what type of medical professional should review this
4. Emphasize that this is preliminary analysis and professional radiologist review is essential
5. Provide educational information about common X-ray findings

IMPORTANT DISCLAIMERS:
- This is an AI analysis and NOT a medical diagnosis
- Always consult with qualified healthcare professionals
- Emergency conditions require immediate medical attention
- This analysis is for educational purposes only

Please provide a detailed but accessible analysis of this X-ray image.`;

    const result = await visionModel.generateContent([prompt, imageBase64]);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error analyzing X-ray:', error);
    return "I'm unable to analyze this image at the moment. Please consult with a qualified radiologist or healthcare professional for proper X-ray interpretation. If this is an emergency, please seek immediate medical attention.";
  }
};

// Helper function to convert file to generative part
async function fileToGenerativePart(file: File) {
  const base64EncodedData = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}
