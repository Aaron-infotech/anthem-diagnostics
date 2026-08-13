// Central product catalog. Add new products here — the Products page
// and category cards on Home read from this file automatically.

export const categories = [
  {
    slug: 'hba1c',
    name: 'HbA1C',
    tagline: 'Glycated haemoglobin analyzers for diabetes monitoring',
    image: '/images/3000.png',
  },
  {
    slug: 'biochemistry',
    name: 'Biochemistry',
    tagline: 'Fully automatic clinical chemistry analyzers',
    image: '/images/cs-680.png',
  },
  {
    slug: 'hematology',
    name: 'Hematology',
    tagline: '3-part & 5-part differential blood cell counters',
    image: '/images/bf-7200plus.png',
  },
  {
    slug: 'immunoassay',
    name: 'Immunoassay',
    tagline: 'CLIA & ELISA platforms for hormone and marker testing',
    image: '/images/cm-180.png',
  },
  {
    slug: 'urine-analysis',
    name: 'Urine Analysis',
    tagline: 'Strip readers and sediment analyzers for urinalysis',
    image: '/images/fus-3000plus.png',
  },
]

export const products = [
  // ==========================================
  // HbA1C — 2 Products
  // ==========================================
  {
    id: 'hba1c-2000',
    category: 'hba1c',
    name: 'MQ-3000 / MQ-3000PT',
    shortDescription: 'Fully automated compact HPLC HbA1c analyzers measuring glycated hemoglobin and variant detection in 115s.',
    fullDescription: 'MQ-3000 HbA1c Analyzer utilizes High-Performance Liquid Chromatography (HPLC) methodology for gold-standard accurate results. Features a compact automated design for user-friendly operation, identifying HbC, HbD, HbS, HbE, and β-thalassemia mode.',
    specifications: [
      'Throughput: 20 samples/hr',
      'Method: Ion-exchange HPLC',
      'Sample volume: 4 µL',
      'Report: %HbA1C, eAG, NGSP/IFCC',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Ion-Exchange HPLC' },
      { label: 'Identify Variant', value: 'HbC, HbD, HbE, HbS, β-thalassemia' },
      { label: 'Speed', value: '115 s/T (Variant), 320 s/T (Thalassemia)' },
      { label: 'Sample Loading', value: '18 Position Rack' },
      { label: 'Accuracy', value: 'CV ≤ 2%' },
      { label: 'Test Range', value: '3% - 20%' },
      { label: 'Dimensions', value: '460 x 340 x 525 mm' },
    ],
    features: [
      'Touchscreen interface with real-time chromatogram display',
      'Auto-calibration & internal quality control management',
      'Seamless LIS/HIS bi-directional connectivity',
      'Zero sample pretreatment with micro-volume sampling',
      'Automatic barcode scanner for tube identification',
    ],
    applications: [
      'Clinical Pathology Laboratories',
      'Diabetes & Endocrinology Specialty Clinics',
      'Tertiary Care Hospital Laboratories',
      'Health Screening & Preventive Check-up Centers',
    ],
    benefits: [
      'Gold-standard HPLC methodology',
      'Footprint less than 0.15 m² space occupation',
      'Automatic diluted sample recognition',
      'One-click switching between Variant & Thalassemia mode',
    ],
    image: '/images/3000.png',
    gallery: ['/images/3000.png'],
    brochurePdf: '/brochures/medconn-mq-3000-brochure.pdf',
    datasheetUrl: '/brochures/medconn-mq-3000-brochure.pdf',
  },
  {
    id: 'hba1c-mini',
    category: 'hba1c',
    name: 'MQ-8000 / MQ-8000PT',
    shortDescription: 'High-throughput automated HPLC point-of-care & laboratory HbA1c system.',
    fullDescription: 'MQ-8000 HbA1c Analyzer features three intelligent detection modes (Fast, Normal, Long) to flexibly adapt to diverse clinical demands. Delivers results in 45 seconds per test in fast mode and supports multi-unit tandem integration.',
    specifications: [
      'Throughput: Up to 80 samples/hr',
      'Method: HPLC Affinity',
      'Sample volume: 2 µL',
      'Display: 12.1-inch HD Touchscreen',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'HPLC' },
      { label: 'Identify Variant', value: 'HbC, HbD, HbE, HbS, HbJ' },
      { label: 'Speed', value: '45 s/T (Fast), 60 s/T (Normal), 100 s/T (Long)' },
      { label: 'Sample Loading', value: '100 Positions' },
      { label: 'Accuracy', value: 'CV ≤ 1%' },
      { label: 'Test Range', value: '3% - 20.1%' },
    ],
    features: [
      'Ultra-portable compact design with robust carrying handle',
      'Integrated STAT position for urgent sample processing',
      'Tandem integration support for automated lines',
      'NGSP and IFCC certified accuracy',
    ],
    applications: [
      'Physician Office Laboratories (POL)',
      'Outpatient Diabetes Care Units',
      'Multispecialty Diagnostic Centers',
    ],
    benefits: [
      'Results in 45 seconds with automatic variant alerting',
      '12.1-inch large touchscreen with intuitive graphical interface',
      'Zero maintenance micro-fluidic system',
    ],
    image: '/images/8000.png',
    gallery: ['/images/8000.png'],
    brochurePdf: '/brochures/mq-8000-brochure.pdf',
    datasheetUrl: '/brochures/mq-8000-brochure.pdf',
  },

  // ==========================================
  // Biochemistry — 7 Products
  // ==========================================
  {
    id: 'biochem-t180',
    category: 'biochemistry',
    name: 'CS-T180 Auto-Chemistry Analyzer',
    shortDescription: 'Compact Benchtop Auto-Chemistry Analyzer delivering 180 tests per hour for clinical laboratories.',
    fullDescription: 'CS-T180 is a compact, fully automated benchtop chemistry analyzer featuring 180 T/H constant speed, 24-hour non-stop reagent refrigeration, and low reaction volume designed for optimal laboratory efficiency.',
    specifications: [
      'Throughput: 180 T/H (Single/Double Reagent)',
      'Methodology: End-point, Fixed-time, Kinetics',
      'Reagent Positions: 40 Positions with Cooling',
      'Reaction Volume: Minimum 150 µL',
    ],
    techSpecs: [
      { label: 'Throughput', value: '180 tests/hour' },
      { label: 'Sample Volume', value: '2 µL - 35 µL (0.1 µL stepping)' },
      { label: 'Reagent Volume', value: '20 µL - 350 µL' },
      { label: 'Wavelength Range', value: '340 nm - 800 nm (9 wavelengths)' },
      { label: 'Cuvettes', value: '81 reusable reaction cuvettes' },
    ],
    features: [
      '24-hour continuous cooling for reagent tray',
      'Automatic liquid level detection & collision protection',
      'Hollow matrix grating optical system',
      'Auto-dilution and rerun for abnormal samples',
    ],
    applications: [
      'Small to Medium Clinical Laboratories',
      'Community Hospitals & Diagnostic Centers',
      'Urgent STAT Testing Stations',
    ],
    benefits: [
      'Low reagent consumption reduces operational costs',
      'User-friendly operating software with real-time reaction curves',
      'Compact footprint suitable for tight bench spaces',
    ],
    image: '/images/cs-t180.png',
    gallery: ['/images/cs-t180.png'],
    brochurePdf: '/brochures/1. CS-T180-brochure.pdf',
    datasheetUrl: '/brochures/1. CS-T180-brochure.pdf',
  },
  {
    id: 'biochem-t240plus',
    category: 'biochemistry',
    name: 'CS-T240 Plus Auto-Chemistry Analyzer',
    shortDescription: 'Advanced benchtop biochemistry analyzer with 240 tests/hr throughput and ISE module options.',
    fullDescription: 'CS-T240 Plus provides 240 T/H constant speed (up to 400 T/H with optional ISE), post-spectrophotometry grating optics, and 8-step automatic washing for reliable routine biochemistry testing.',
    specifications: [
      'Throughput: 240 T/H (400 T/H with ISE)',
      'Sample Capacity: 60 Sample Positions',
      'Reagent Capacity: 60 Reagent Positions',
      'Washing System: 8-Step Auto Washing',
    ],
    techSpecs: [
      { label: 'Throughput', value: '240 T/H (photometric)' },
      { label: 'Optical System', value: 'Post-spectrophotometry grating' },
      { label: 'Reaction Cuvettes', value: '90 reaction cuvettes' },
      { label: 'Refrigeration', value: '2°C - 8°C continuous cooling' },
    ],
    features: [
      'Intelligent probe with anti-collision & clot detection',
      'Water consumption under 3.5 L/hr',
      'LIS bi-directional communication support',
      'STAT emergency sample priority access',
    ],
    applications: [
      'Mid-Sized Hospital Laboratories',
      'Diagnostic Centers & Pathology Units',
    ],
    benefits: [
      'Stable temperature control at 37°C ± 0.1°C',
      'High accuracy and minimal reagent cross-contamination',
    ],
    image: '/images/cs-t240.png',
    gallery: ['/images/cs-t240.png'],
    brochurePdf: '/brochures/2. CS-T240Plus.pdf',
    datasheetUrl: '/brochures/2. CS-T240Plus.pdf',
  },
  {
    id: 'biochem-cs480',
    category: 'biochemistry',
    name: 'CS-480 Auto-Chemistry Analyzer',
    shortDescription: 'High-efficiency floor-standing chemistry system running 400 photometric tests per hour.',
    fullDescription: 'CS-480 delivers 400 T/H photometric speed (800 T/H with ISE), equipped with dual probes, holographic concave flat-field grating optics, and 120 reaction cuvettes for demanding laboratory environments.',
    specifications: [
      'Throughput: 400 T/H (800 T/H with ISE)',
      'Sample Capacity: 115 Sample Positions',
      'Reagent Capacity: 90 Reagent Positions',
      'Reagent Probe: Dual Independent Probes',
    ],
    techSpecs: [
      { label: 'Throughput', value: '400 T/H constant' },
      { label: 'Optical Grid', value: '12 wavelengths (340 - 800 nm)' },
      { label: 'Reaction Volume', value: '120 µL minimum' },
    ],
    features: [
      'Dual stirrer mixing system with Teflon coating',
      'Real-time liquid level sensing & bubble detection',
      'Automatic cuvette blank checking & selection',
    ],
    applications: [
      'Large Reference Diagnostic Labs',
      'Multispecialty Hospitals',
    ],
    benefits: [
      'High sample throughput with continuous loading',
      'Low reaction volume saving expensive reagents',
    ],
    image: '/images/cs-480.png',
    gallery: ['/images/cs-480.png'],
    brochurePdf: '/brochures/3.  CS480.pdf',
    datasheetUrl: '/brochures/3.  CS480.pdf',
  },
  {
    id: 'biochem-cs680',
    category: 'biochemistry',
    name: 'CS-680 Auto-Chemistry Analyzer',
    shortDescription: 'High-speed automated biochemistry system processing 600 photometric tests per hour.',
    fullDescription: 'CS-680 is built for heavy lab workloads, offering 600 T/H photometric throughput (1000 T/H with ISE), advanced clot detection, dual reagent disk, and robust 160 reaction cuvettes.',
    specifications: [
      'Throughput: 600 T/H (1000 T/H with ISE)',
      'Sample Loading: 145 Sample Positions',
      'Reagent Disk: 100 Reagent Positions',
    ],
    techSpecs: [
      { label: 'Speed', value: '600 tests/hour' },
      { label: 'Wavelengths', value: '12 optics channels' },
    ],
    features: [
      'Clot detection and bubble monitoring technology',
      '8-step auto laundry station with warm water rinse',
      'Bi-directional LIS interface',
    ],
    applications: [
      'High-Volume Tertiary Care Hospitals',
      'Central Pathology Laboratories',
    ],
    benefits: [
      'Maximum throughput with uninterrupted operation',
      'Superior optical precision and signal stability',
    ],
    image: '/images/cs-680.png',
    gallery: ['/images/cs-680.png'],
    brochurePdf: '/brochures/4. CS-680-Brochure.pdf',
    datasheetUrl: '/brochures/4. CS-680-Brochure.pdf',
  },
  {
    id: 'biochem-cs1300b',
    category: 'biochemistry',
    name: 'CS-1300B Automatic Biochemistry Analyzer',
    shortDescription: 'Ultra-fast floor-standing analyzer with 800 tests/hr capacity for high-volume centers.',
    fullDescription: 'CS-1300B features 800 T/H constant photometric speed (1200 T/H with ISE module), 160 sample positions, 132 reagent positions, and ultrasonic probe washing.',
    specifications: [
      'Throughput: 800 T/H (1200 T/H with ISE)',
      'Sample Capacity: 160 Positions',
      'Reagent Positions: 132 Positions',
    ],
    techSpecs: [
      { label: 'Throughput', value: '800 T/H' },
      { label: 'Minimum Volume', value: '100 µL reaction' },
    ],
    features: [
      'Ultrasonic probe cleaning & degassed water system',
      'Holographic flat-field concave grating optics',
      'STAT continuous emergency sample loading',
    ],
    applications: [
      'National Reference Diagnostics Centers',
      'University Medical Centers',
    ],
    benefits: [
      'Extremely low cost per test',
      'Continuous 24/7 high-throughput workflow',
    ],
    image: '/images/cs-1300b.png',
    gallery: ['/images/cs-1300b.png'],
    brochurePdf: '/brochures/5. CS-1300B.pdf',
    datasheetUrl: '/brochures/5. CS-1300B.pdf',
  },
  {
    id: 'biochem-cs2000',
    category: 'biochemistry',
    name: 'CS-2000 High-Throughput Auto-Chemistry System',
    shortDescription: 'Premier high-throughput biochemistry workstation running 1000 photometric tests per hour.',
    fullDescription: 'CS-2000 delivers 1000 T/H photometric speed, track-based sample automation, 300 sample loading capacity, and multi-wavelength grating photometry for high-tier laboratories.',
    specifications: [
      'Throughput: 1000 T/H (1600 T/H with ISE)',
      'Sample Track: 300 Sample Capacity Track',
      'Reagent Capacity: 132 Positions',
    ],
    techSpecs: [
      { label: 'Throughput', value: '1000 tests/hour' },
      { label: 'Sample Rack', value: 'Continuous track loader' },
    ],
    features: [
      'High-speed rack conveyor system',
      'Integrated quality control & calibration wizard',
      'Auto rerun and auto dilution capabilities',
    ],
    applications: [
      'Large Centralized Laboratory Networks',
      'Government Diagnostic Facilities',
    ],
    benefits: [
      'Top-tier laboratory automation',
      'Unmatched test speed and turnaround times',
    ],
    image: '/images/cs-2000.png',
    gallery: ['/images/cs-2000.png'],
    brochurePdf: '/brochures/6. CS-2000 brochure.pdf',
    datasheetUrl: '/brochures/6. CS-2000 brochure.pdf',
  },
  {
    id: 'biochem-csm8000',
    category: 'biochemistry',
    name: 'CSM-8000 Modular Biochemistry Workstation',
    shortDescription: 'Modular biochemistry analytical line scalable up to 6400 tests per hour.',
    fullDescription: 'CSM-8000 is an advanced modular analytical workstation connecting up to 4 chemistry modules and ISE units, reaching a total throughput of 6400 tests per hour with full track automation.',
    specifications: [
      'Throughput: Up to 6400 T/H (Modular)',
      'Track Automation: Central sample distribution track',
      'Modules: 1 - 4 Analytical Units',
    ],
    techSpecs: [
      { label: 'Max Capacity', value: '6400 tests/hour' },
      { label: 'Automation', value: 'Total Laboratory Automation (TLA)' },
    ],
    features: [
      'Modular expansion design',
      'Smart sample routing & tracking',
      'Remote online diagnostics and support',
    ],
    applications: [
      'Mega Pathology Networks & Reference Centers',
      'Regional Health System Hubs',
    ],
    benefits: [
      'Scalable to growing sample volumes',
      'Eliminates manual sample handling errors',
    ],
    image: '/images/csm-8000.png',
    gallery: ['/images/csm-8000.png'],
    brochurePdf: '/brochures/7. CSM-8000-BROCHURE.pdf',
    datasheetUrl: '/brochures/7. CSM-8000-BROCHURE.pdf',
  },

  // ==========================================
  // Hematology — 3 Products
  // ==========================================
  {
    id: 'hem-bcc3900',
    category: 'hematology',
    name: 'BCC-3900 3-Diff Automatic Hematology Analyzer',
    shortDescription: 'Reliable 3-part differential blood cell counter with 60 samples per hour throughput.',
    fullDescription: 'BCC-3900 is an automated 3-diff hematology analyzer designed for small to mid-sized laboratories, delivering 21 parameters, 3 histograms, and 60 samples/hour with micro sample volume.',
    specifications: [
      'Throughput: 60 samples/hr',
      'Parameters: 21 parameters + 3 histograms',
      'Sample Volume: 9 µL whole blood',
      'Display: 10.4-inch Color Touchscreen',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Electrical impedance & Cyanide-free HGB' },
      { label: 'Parameters', value: 'WBC, RBC, HGB, HCT, MCV, MCH, MCHC, PLT, etc.' },
      { label: 'Storage', value: '50,000 sample records with histograms' },
    ],
    features: [
      'High voltage burn and reverse flush anti-clogging',
      'Built-in thermal printer & external printer support',
      'Low reagent consumption & automatic maintenance',
    ],
    applications: [
      'Clinic Laboratories & Primary Care Centers',
      'Urgent Care Facilities & POL Labs',
    ],
    benefits: [
      'Simple touch interface with quick 1-minute test turnaround',
      'Highly economical operation costs',
    ],
    image: '/images/bcc-3900.png',
    gallery: ['/images/bcc-3900.png'],
    brochurePdf: '/brochures/BCC-3900-Brochure-20180426.pdf',
    datasheetUrl: '/brochures/BCC-3900-Brochure-20180426.pdf',
  },
  {
    id: 'hem-bf6900',
    category: 'hematology',
    name: 'BF-6900 5-Diff Auto Hematology Analyzer',
    shortDescription: 'Advanced 5-part differential cell counter with laser scatter and flow cytometry.',
    fullDescription: 'BF-6900 utilizes semiconductor laser scatter and chemical dye flow cytometry to deliver 28 parameters, 2 scattergrams, and 2 histograms at 60 tests per hour.',
    specifications: [
      'Throughput: 60 samples/hr',
      'Parameters: 28 parameters (25 reportable + 3 research)',
      'Technology: Laser Scatter + Flow Cytometry',
      'Sample Volume: 20 µL',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Laser Scatter, Flow Cytometry, Impedance' },
      { label: 'Screen', value: '10.4-inch HD Touchscreen' },
    ],
    features: [
      'Accurate WBC 5-part differential differentiation',
      'Abnormal flag alarms for immature cells and atypical lymphocytes',
      'Automatic unclogging procedure',
    ],
    applications: [
      'General & Multispecialty Hospitals',
      'Pathology Reference Diagnostic Centers',
    ],
    benefits: [
      'High analytical precision for complex hematological cases',
      'Compact benchtop footprint',
    ],
    image: '/images/bf-6900.png',
    gallery: ['/images/bf-6900.png'],
    brochurePdf: '/brochures/BF-6900.pdf',
    datasheetUrl: '/brochures/BF-6900.pdf',
  },
  {
    id: 'hem-bf7200plus',
    category: 'hematology',
    name: 'BF-7200 Plus Automated Hematology Workstation',
    shortDescription: 'High-speed 5-diff hematology workstation with auto-loader processing 90 samples/hr.',
    fullDescription: 'BF-7200 Plus features an integrated 50-tube auto-loader, barcode scanning, reticulocyte channel option, and 90 samples/hr speed for busy hematology departments.',
    specifications: [
      'Throughput: 90 samples/hr',
      'Auto-loader: 50 Samples (5 racks)',
      'Parameters: 29 reportable parameters',
    ],
    techSpecs: [
      { label: 'Throughput', value: '90 samples/hour' },
      { label: 'Loader', value: '50-tube continuous rack loader' },
    ],
    features: [
      'Walk-away automated sample rack loading',
      'STAT cap-piercing mode for emergency tubes',
      'Bi-directional LIS connectivity',
    ],
    applications: [
      'High-Volume Hospital Laboratories',
      'Central Hematology Diagnostic Units',
    ],
    benefits: [
      'Maximum lab productivity with walk-away automation',
      'Exceptional linearity and precision',
    ],
    image: '/images/bf-7200plus.png',
    gallery: ['/images/bf-7200plus.png'],
    brochurePdf: '/brochures/BF-7200Plus Brochure EN.pdf',
    datasheetUrl: '/brochures/BF-7200Plus Brochure EN.pdf',
  },

  // ==========================================
  // Immunoassay — 2 Products
  // ==========================================
  {
    id: 'immuno-cm180',
    category: 'immunoassay',
    name: 'CM-180 Chemiluminescence Immunoassay Analyzer (CLIA)',
    shortDescription: 'Benchtop automatic CLIA immunoassay system running 180 tests per hour.',
    fullDescription: 'CM-180 employs magnetic microparticle Chemiluminescence Immunoassay (CLIA) technology to deliver 180 T/H for thyroid, cardiac, tumor markers, infectious disease, and hormone panels.',
    specifications: [
      'Throughput: 180 tests/hr',
      'Time to 1st Result: 15 minutes',
      'Sample Capacity: 50 Positions',
      'Reagent Capacity: 24 Refrigerated Positions',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Magnetic Microparticle CLIA' },
      { label: 'Substrate', value: 'Enzymatic Chemiluminescence' },
      { label: 'Sample Volume', value: '10 µL - 150 µL' },
    ],
    features: [
      'Substrate temperature control & liquid level sensing',
      'Continuous sample and reagent loading during operation',
      'Teflon-coated probe with liquid level and clot detection',
    ],
    applications: [
      'Endocrinology & Immunology Laboratories',
      'Specialty Diagnostic Centers',
    ],
    benefits: [
      'Broad diagnostic test menu with high sensitivity',
      'Rapid turnaround time for emergency cardiac & hormone markers',
    ],
    image: '/images/cm-180.png',
    gallery: ['/images/cm-180.png'],
    brochurePdf: '/brochures/CM-180(NEW)-v20210221.pdf',
    datasheetUrl: '/brochures/CM-180(NEW)-v20210221.pdf',
  },
  {
    id: 'immuno-cm320',
    category: 'immunoassay',
    name: 'CM-320 Automatic Chemiluminescence Immunoassay System',
    shortDescription: 'High-throughput automated CLIA platform running 320 tests per hour.',
    fullDescription: 'CM-320 is a high-speed CLIA immunoassay workstation offering 320 tests/hour, 120 sample positions, 30 refrigerated reagent positions, and automated cuvette loader.',
    specifications: [
      'Throughput: 320 tests/hr',
      'Sample Loading: 120 Positions',
      'Reagent Disk: 30 Refrigerated Positions',
    ],
    techSpecs: [
      { label: 'Throughput', value: '320 T/H' },
      { label: 'Technology', value: 'AMPPD Substrate CLIA' },
    ],
    features: [
      'Continuous reaction cuvette auto-replenishment',
      'RFID reagent card management & auto calibration',
      'STAT sample priority loading',
    ],
    applications: [
      'Central Hospital Laboratories',
      'Large Reference Pathology Labs',
    ],
    benefits: [
      'High analytical capacity for large test volume workloads',
      'Exceptional precision with wide dynamic range',
    ],
    image: '/images/cm-320.jpeg',
    gallery: ['/images/cm-320.jpeg'],
    brochurePdf: '/brochures/CM320.pdf',
    datasheetUrl: '/brochures/CM320.pdf',
  },

  // ==========================================
  // Urine Analysis — 4 Products
  // ==========================================
  {
    id: 'urine-hc300',
    category: 'urine-analysis',
    name: 'HC-300 Urine Chemistry Analyzer',
    shortDescription: 'Compact semi-automated urinalysis strip reader processing up to 300 tests per hour.',
    fullDescription: 'HC-300 is a portable cold light source reflection urine strip analyzer capable of testing 10, 11, or 14 parameters with high precision and built-in thermal printer.',
    specifications: [
      'Throughput: 300 tests/hr',
      'Test Items: GLU, BIL, KET, SG, BLD, PRO, URO, NIT, LEU, VC, pH, Malb, CRE, Ca',
      'Display: LCD Screen with keypad',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Cold light reflection photometry' },
      { label: 'Wavelengths', value: '525 nm, 620 nm, 660 nm' },
    ],
    features: [
      'Automatic waste strip collection',
      'High luminescent cold light source for long life',
      'RS-232 serial data output to lab software',
    ],
    applications: [
      'Physician Office Labs',
      'Small Hospitals & Clinics',
    ],
    benefits: [
      'Simple 1-touch testing workflow',
      'Low cost per strip evaluation',
    ],
    image: '/images/hc-300.png',
    gallery: ['/images/hc-300.png'],
    brochurePdf: '/brochures/1 HC 300.pdf',
    datasheetUrl: '/brochures/1 HC 300.pdf',
  },
  {
    id: 'urine-h500',
    category: 'urine-analysis',
    name: 'H-500 Semi-Automatic Urine Analyzer',
    shortDescription: 'High-speed benchtop urinalysis strip analyzer processing 514 strips per hour.',
    fullDescription: 'H-500 offers 514 strips/hour testing speed, touchscreen control, touch-free waste strip disposal, and automatic temperature compensation for high accuracy.',
    specifications: [
      'Throughput: 514 strips/hr',
      'Memory: 2,000 test results',
      'Display: Large Touchscreen',
    ],
    techSpecs: [
      { label: 'Speed', value: '514 tests/hour' },
      { label: 'Strip Types', value: '10, 11, 12, 14 parameter strips' },
    ],
    features: [
      'Automatic strip detection and alignment',
      'Built-in thermal barcode scanner support',
      'LIS bi-directional communication',
    ],
    applications: [
      'Medium Pathology Laboratories',
      'Hospital Urinalysis Departments',
    ],
    benefits: [
      'High-speed routine urine screening',
      'Eliminates ambient light interference',
    ],
    image: '/images/h-500.png',
    gallery: ['/images/h-500.png'],
    brochurePdf: '/brochures/2 H-500(new).pdf',
    datasheetUrl: '/brochures/2 H-500(new).pdf',
  },
  {
    id: 'urine-fus2000',
    category: 'urine-analysis',
    name: 'FUS-2000 Automated Urinalysis Hybrid Analyzer',
    shortDescription: 'All-in-one urinalysis system combining urine chemistry and formed element sediment analysis.',
    fullDescription: 'FUS-2000 is an integrated hybrid urinalysis analyzer that simultaneously measures urine chemistry strips (120 T/H) and microscopic formed elements sediment (120 T/H) without centrifugation.',
    specifications: [
      'Throughput: 120 tests/hr (Chemistry + Sediment)',
      'Technology: Planar Flow Cytometry + High-Speed Microscopy',
      'Sample Capacity: 50 Samples (Auto-loader)',
    ],
    techSpecs: [
      { label: 'Methodology', value: 'Flow Cytometry & Digital Imaging' },
      { label: 'Sediment Parameters', value: 'RBC, WBC, Epithelial, Casts, Bacteria, Crystals, Yeast' },
    ],
    features: [
      'Uncentrifuged urine sample direct aspiration',
      'Full-field real-time microscopic image review',
      'Automatic classification with neural network AI',
    ],
    applications: [
      'Central Clinical Pathology Labs',
      'Multispecialty Hospitals',
    ],
    benefits: [
      'Combines 2 instruments into 1 space-saving hybrid unit',
      'Dramatically reduces manual microscopic re-examinations',
    ],
    image: '/images/fus-2000.png',
    gallery: ['/images/fus-2000.png'],
    brochurePdf: '/brochures/3 FUS-2000.pdf',
    datasheetUrl: '/brochures/3 FUS-2000.pdf',
  },
  {
    id: 'urine-fus3000plus',
    category: 'urine-analysis',
    name: 'FUS-3000 Plus Integrated Urinalysis Workstation',
    shortDescription: 'High-capacity fully automated urinalysis workstation running up to 240 tests per hour.',
    fullDescription: 'FUS-3000 Plus is a premier automated urinalysis workstation combining high-speed physical/chemical test module and AI digital image sediment microscopy for high-volume reference labs.',
    specifications: [
      'Throughput: 240 tests/hr (Chemistry), 120 tests/hr (Sediment)',
      'Sample Track: 60 Sample Rack Loader',
      'Camera: High-resolution digital CCD imaging',
    ],
    techSpecs: [
      { label: 'Throughput', value: '240 T/H' },
      { label: 'Imaging', value: 'Real-time multi-focus digital microscopy' },
    ],
    features: [
      'Fully automated rack conveying and sample mixing',
      'Automatic physical properties (Color, Clarity, Specific Gravity)',
      'Comprehensive LIS data integration',
    ],
    applications: [
      'National Reference Diagnostic Laboratories',
      'Major Medical Center Central Labs',
    ],
    benefits: [
      'Standardized walk-away urinalysis',
      'High sensitivity for renal pathology screening',
    ],
    image: '/images/fus-3000plus.png',
    gallery: ['/images/fus-3000plus.png'],
    brochurePdf: '/brochures/4 FUS 3000 Plus.pdf',
    datasheetUrl: '/brochures/4 FUS 3000 Plus.pdf',
  },
]

export function getProductById(id) {
  if (!id) return null
  return products.find((p) => p.id === id) || null
}

export function getRelatedProducts(currentProduct, limit = 3) {
  if (!currentProduct) return []
  return products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, limit)
}
