export interface ServiceItem {
  id: string;
  name: string;
  type: 'general' | 'specialized';
  category: 'Nursing & Attendant' | 'Specialized Procedures' | 'Elder & Child Care' | 'Diagnostics & Pharmacy' | 'Emergency & Equipment';
  shortDesc: string;
  fullDesc: string;
  whoNeedsIt: string[];
  whatIsIncluded: string[];
  clinicalNote: string;
  iconName: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  // GENERAL HOME CARE SERVICES (15)
  {
    id: 'certified-home-nurses',
    name: 'Certified Home Nurses',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Qualified GNM / B.Sc. nurses delivering 12-hour or 24-hour hospital-standard bedside nursing.',
    fullDesc: 'Our Certified Home Nurses provide comprehensive, hospital-grade nursing care in the comfort of your home. Each nurse is formally trained in patient assessment, medication administration, monitoring vital signs, and coordinating with treating physicians.',
    whoNeedsIt: [
      'Post-surgery recovering patients needing continuous clinical monitoring',
      'Patients with chronic illnesses requiring regular injections and medication schedules',
      'Bedridden or palliative care patients needing intensive medical attention',
      'Tracheostomy or catheter-dependent individuals'
    ],
    whatIsIncluded: [
      'Continuous monitoring of vitals (BP, SpO2, Pulse, Blood Sugar, Temperature)',
      'Administering oral, IV, and IM medications according to doctor prescriptions',
      'Hygiene, bed sore prevention, and position-turning protocols',
      'Daily medical charting and doctor coordination'
    ],
    clinicalNote: 'All nurses follow aseptic procedures and strict hygiene protocols.',
    iconName: 'UserCheck'
  },
  {
    id: 'experienced-gda-staff',
    name: 'Experienced GDA Staff',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Trained General Duty Assistants supporting daily hygiene, mobility, feeding, and vital checks.',
    fullDesc: 'General Duty Assistants (GDAs) provide non-invasive compassionate personal assistance for elderly or semi-dependent patients, assisting them with all activities of daily living while maintaining personal dignity.',
    whoNeedsIt: [
      'Elderly individuals with reduced mobility or arthritis',
      'Patients needing assistance with bathing, dressing, and sponge baths',
      'Individuals recovering from fractures or strokes requiring mobility support',
      'Families needing reliable 12-hr or 24-hr bedside attendance'
    ],
    whatIsIncluded: [
      'Assistance with bed bath, oral hygiene, and diaper changing',
      'Assisted walking, wheelchair transfers, and gentle physical movement',
      'Timely meals assistance and medication reminders',
      'Basic vitals tracking and alerting family/nurse if readings change'
    ],
    clinicalNote: 'Background-checked, empathetic staff trained specifically for domestic bedside duty.',
    iconName: 'Users'
  },
  {
    id: 'on-call-doctors',
    name: 'On Call Doctors',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Experienced General Physicians visiting your home for physical evaluation, prescription review, and care plans.',
    fullDesc: 'Skip the distress of transporting a frail or elderly patient to crowded hospital OPDs. Our On-Call General Physicians visit your home in Patna for detailed physical clinical examinations and medical treatment adjustments.',
    whoNeedsIt: [
      'Bedridden or mobility-impaired patients needing regular doctor consultations',
      'Elderly patients with sudden non-emergency fever, cough, weakness, or nausea',
      'Patients requiring routine prescription updates and chronic illness management',
      'Post-discharge follow-up evaluations'
    ],
    whatIsIncluded: [
      'In-person clinical physical examination at your doorstep',
      'Review of previous medical reports, prescriptions, and lab tests',
      'Custom medical care plan and medication adjustments',
      'Direct guidance to home nursing attendants'
    ],
    clinicalNote: 'For critical life-threatening medical emergencies, immediate hospital ER transfer is advised.',
    iconName: 'Stethoscope'
  },
  {
    id: 'physiotherapy-rehab',
    name: 'Physiotherapy & Rehab',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Certified home physiotherapists for neuro-rehab, orthopedic recovery, stroke therapy, and pain management.',
    fullDesc: 'Personalized physical rehabilitation carried out at home. Our physiotherapists design customized exercise and electrotherapy programs to restore joint mobility, muscle strength, balance, and independence.',
    whoNeedsIt: [
      'Post-stroke patients experiencing hemiplegia or balance deficits',
      'Post-joint replacement patients (Total Knee/Hip Replacement recovery)',
      'Seniors suffering from severe osteoarthritis, lumbar spondylosis, or frozen shoulder',
      'Trauma and fracture rehabilitation'
    ],
    whatIsIncluded: [
      'Comprehensive musculoskeletal and neurological mobility assessment',
      'Manual therapy, stretching, gait training, and progressive resistance exercises',
      'Portable electrotherapy modalities (TENS, IFT, Ultrasound if prescribed)',
      'Ergonomic and home safety guidance'
    ],
    clinicalNote: 'Sessions are customized to patient fatigue thresholds and safety tolerances.',
    iconName: 'Activity'
  },
  {
    id: 'dietician-nutritionist',
    name: 'Dietician & Nutritionist',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Clinical diet counseling and customized nutritional plans for diabetes, cardiac health, and tube feeding.',
    fullDesc: 'Clinical nutrition plays a vital role in recovery. Our certified clinical nutritionists evaluate patient biochemistry and design tailored home meal or enteral liquid feed plans.',
    whoNeedsIt: [
      'Diabetic, hypertensive, and renal patients requiring strict electrolyte control',
      'Patients on Ryles Tube (NG Tube) or PEG feeds requiring exact caloric formulations',
      'Cancer patients or post-surgery convalescents experiencing muscle wasting',
      'Elderly patients with dysphagia (difficulty swallowing)'
    ],
    whatIsIncluded: [
      'Nutritional assessment, BMI, and metabolic condition review',
      'Customized daily diet schedule with easy-to-cook local Indian ingredients',
      'Caloric and macronutrient calculation for liquid tube feeding',
      'Periodic progress reviews'
    ],
    clinicalNote: 'Plans are coordinated with your primary physician’s clinical instructions.',
    iconName: 'Apple'
  },
  {
    id: 'medical-attendant',
    name: 'Medical Attendant',
    type: 'general',
    category: 'Nursing & Attendant',
    shortDesc: 'Dedicated healthcare attendants assisting with medication adherence, vitals, mobility, and patient care.',
    fullDesc: 'Our trained medical attendants bridge the gap between basic domestic help and certified nursing. They are trained in clinical observation, emergency escalation, and patient comfort.',
    whoNeedsIt: [
      'Semi-ambulatory patients requiring steady supervision',
      'Patients after hospital discharge requiring assistance for 1 to 4 weeks',
      'Families where primary caretakers need day or night respite care'
    ],
    whatIsIncluded: [
      'Assistance with prescribed oral medications on schedule',
      'Bed sore prevention through scheduled lateral turning',
      'Daily record maintenance of fluid intake and urine output',
      'Assistance with restroom, commode, or urinal bottle use'
    ],
    clinicalNote: 'Available for flexible 12-hour shifts or continuous 24-hour live-in support.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'ambulance-services',
    name: 'Ambulance Services',
    type: 'general',
    category: 'Emergency & Equipment',
    shortDesc: 'Rapid 24/7 patient transport ambulance with oxygen support and emergency equipment across Patna.',
    fullDesc: 'Dependable and prompt medical transport for hospital admissions, discharge transfers, diagnostic center visits, and medical emergencies across Patna and nearby districts.',
    whoNeedsIt: [
      'Bedridden patients requiring planned transfer between hospital and home',
      'Emergency hospital admissions requiring oxygen support during transit',
      'Inter-facility hospital transfers'
    ],
    whatIsIncluded: [
      'Basic and advanced life support equipped vehicle',
      'Continuous on-board oxygen delivery and stretcher facility',
      'Trained paramedic and driver experienced with city routes',
      'Safe transfer from bedside to ambulance and hospital bed'
    ],
    clinicalNote: 'Call our emergency care line 7463091878 for immediate ambulance dispatch.',
    iconName: 'Truck'
  },
  {
    id: 'laboratory-tests',
    name: 'Laboratory Tests (Free Home Collection)',
    type: 'general',
    category: 'Diagnostics & Pharmacy',
    shortDesc: 'Accurate blood, urine, and diagnostic tests with sterile free sample collection at your doorstep.',
    fullDesc: 'No need to make fasting elderly patients travel to diagnostic laboratories. Our phlebotomists collect samples right at home with sterile, single-use vacutainers and deliver digital reports promptly.',
    whoNeedsIt: [
      'Patients requiring routine CBC, KFT, LFT, Lipid profiles, or HbA1c testing',
      'Thyroid, Vitamin D/B12, or electrolyte monitoring',
      'Urine routine and culture tests',
      'Fasting and post-prandial blood sugar tracking'
    ],
    whatIsIncluded: [
      'Free home sample collection by trained, gentle phlebotomist',
      'Cold-chain transport of samples to accredited diagnostic laboratories',
      'Prompt digital report delivery via WhatsApp and email',
      'Doctor review assistance upon request'
    ],
    clinicalNote: 'Completely sterile, single-use needle kits used for every single collection.',
    iconName: 'FlaskConical'
  },
  {
    id: 'pharmacy-doorstep',
    name: 'Pharmacy at Your Door Step',
    type: 'general',
    category: 'Diagnostics & Pharmacy',
    shortDesc: 'Prompt home delivery of genuine prescribed medicines, surgical consumables, and healthcare supplies.',
    fullDesc: 'Order required medications, surgical items, adult diapers, IV fluids, and dressing supplies with prompt doorstep delivery across Patna.',
    whoNeedsIt: [
      'Patients requiring continuous monthly refills for hypertension, cardiac, or diabetes meds',
      'Families needing sterile surgical supplies (gloves, gauze, micropore, antiseptic) at home',
      'Elderly citizens living alone without someone to visit medical stores'
    ],
    whatIsIncluded: [
      'Doorstep delivery of doctor-prescribed medications',
      'Dispensing of clinical consumables (syringes, IV sets, catheters, dressing packs)',
      'Clear billing with genuine batch-coded medicines',
      'Emergency priority delivery for urgent nursing supplies'
    ],
    clinicalNote: 'Prescription verification is conducted for all scheduled pharmaceutical drugs.',
    iconName: 'Pill'
  },
  {
    id: 'rental-medical-equipment',
    name: 'Rental Medical Equipment',
    type: 'general',
    category: 'Emergency & Equipment',
    shortDesc: 'Clean, calibrated ICU beds, oxygen concentrators, BiPAP/CPAP, wheelchairs, and suction machines for rent.',
    fullDesc: 'Setting up an ICU or supportive medical environment at home is cost-effective with our sanitized, high-grade rental equipment. Delivered, assembled, and demonstrated at your residence in Patna.',
    whoNeedsIt: [
      'Patients requiring long-term home oxygen or non-invasive mechanical ventilation',
      'Post-operative patients requiring motorized 3-function or 5-function hospital beds',
      'Patients with respiratory secretions requiring electric suction apparatus',
      'Immobile patients needing wheelchairs or air mattresses for bed sore prevention'
    ],
    whatIsIncluded: [
      'Oxygen Concentrators (5L / 10L medical grade)',
      'BiPAP / CPAP machines and pulse oximeters',
      'Motorized and manual hospital fowler beds with side rails',
      'Sanitization certificate, doorstep installation, and user demonstration'
    ],
    clinicalNote: 'All equipment is medically sterilized and performance-calibrated prior to delivery.',
    iconName: 'Wrench'
  },
  {
    id: 'ecg-facility-home',
    name: 'ECG Facility at Home',
    type: 'general',
    category: 'Diagnostics & Pharmacy',
    shortDesc: '12-lead portable computerized ECG test recorded at home by a certified medical technician.',
    fullDesc: 'Avoid the exertion of hospital visits for cardiac rhythm checks. Our portable 12-lead ECG machine is brought to the patient’s bedside for immediate tracing and cardiologist interpretation.',
    whoNeedsIt: [
      'Elderly or bedridden individuals with chest discomfort, palpitations, or dizziness',
      'Routine pre-operative or post-cardiac surgery follow-ups',
      'Bedbound patients requiring periodic cardiac rhythm screening',
      'Patients with limited mobility due to paralysis or orthopedic trauma'
    ],
    whatIsIncluded: [
      'Home visit by trained ECG technician with portable computerized machine',
      'Standard 12-lead electrocardiogram recording in comfortable supine position',
      'Instant printed/digital ECG strip provided on site',
      'Rapid cardiologist reporting for critical findings'
    ],
    clinicalNote: 'Helps your physician quickly evaluate arrhythmias, ischemia, or conduction issues.',
    iconName: 'HeartPulse'
  },
  {
    id: 'oxygen-therapy',
    name: 'Oxygen Therapy',
    type: 'general',
    category: 'Emergency & Equipment',
    shortDesc: 'Medical oxygen cylinders, concentrators, cannulas, and regular flow-rate titration at home.',
    fullDesc: 'Safe, continuous oxygen support for patients with COPD, respiratory distress, pulmonary fibrosis, or low blood oxygen levels (hypoxemia). Complete setup and maintenance provided.',
    whoNeedsIt: [
      'Patients with chronic obstructive pulmonary disease (COPD) or post-pneumonia recovery',
      'Palliative care patients with shortness of breath',
      'Emergency temporary oxygen backup while waiting for hospital admission'
    ],
    whatIsIncluded: [
      'Delivery of high-purity medical oxygen cylinder or electric concentrator',
      'Sterile nasal cannulas, non-rebreather masks, and humidification bottles',
      'Instruction on safety, fire prevention, and liter-per-minute (LPM) flow management',
      'Emergency cylinder refill support'
    ],
    clinicalNote: 'Administered under physician-advised SpO2 targets and flow settings.',
    iconName: 'Wind'
  },
  {
    id: 'elder-care-at-home',
    name: 'Elder Care at Home',
    type: 'general',
    category: 'Elder & Child Care',
    shortDesc: 'Holistic, empathetic daily living assistance, medical monitoring, companionship, and safety for seniors.',
    fullDesc: 'Elderly family members deserve respectful, loving, and clinically sound care in their familiar surroundings. We provide dependable day-to-day care, medication management, and emotional reassurance.',
    whoNeedsIt: [
      'Aging parents living independently while children work elsewhere',
      'Seniors suffering from dementia, Alzheimer’s disease, or Parkinson’s disease',
      'Elderly individuals vulnerable to falls, loneliness, or malnutrition'
    ],
    whatIsIncluded: [
      'Assistance with personal grooming, toileting, and nutrition',
      'Active monitoring of daily blood pressure, sugar, and vital signs',
      'Fall prevention vigilance and gentle mobility exercises',
      'Compassionate companionship and mental engagement'
    ],
    clinicalNote: 'Provides peace of mind to family members with regular condition updates.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'neonate-child-care',
    name: 'Neonate & Child Care at Home',
    type: 'general',
    category: 'Elder & Child Care',
    shortDesc: 'Specialized neonatal nurses and pediatric attendants for newborn hygiene, jaundice checks, and infant health.',
    fullDesc: 'Trained pediatric and neonatal care nurses to support mothers with newborn babies, premature infants, or sick children requiring specialized care, hygiene, and monitoring.',
    whoNeedsIt: [
      'Newborn infants discharged from NICU requiring continuing home observation',
      'First-time mothers needing professional guidance in newborn handling and breastfeeding',
      'Infants requiring phototherapy monitoring, umbilical cord care, or medication'
    ],
    whatIsIncluded: [
      'Sterile umbilical cord care, baby bath, and skin care',
      'Monitoring feeding adequacy, weight gain, and jaundice symptoms',
      'Temperature monitoring and pediatric medication administration',
      'Guidance on safe infant sleep positions and infant hygiene'
    ],
    clinicalNote: 'Delivered by gentle nurses certified in pediatric and neonatal protocols.',
    iconName: 'Baby'
  },
  {
    id: 'maternity-care-at-home',
    name: 'Obstetricians & Maternity Care at Home',
    type: 'general',
    category: 'Elder & Child Care',
    shortDesc: 'Post-delivery mother care, episiotomy/c-section wound check, lactation guidance, and post-natal recovery.',
    fullDesc: 'Dedicated post-natal home care for new mothers recovering from normal delivery or Caesarean section (C-Section), ensuring physical healing and emotional well-being.',
    whoNeedsIt: [
      'Mothers recovering from C-section surgery needing wound care and mobility support',
      'Mothers experiencing lactation challenges, engorgement, or post-partum fatigue',
      'Post-natal mothers requiring blood pressure and recovery monitoring'
    ],
    whatIsIncluded: [
      'Surgical C-section wound dressing inspection and sterile care',
      'Lactation consultation, feeding posture assistance, and breast care',
      'Post-delivery vital monitoring (BP, pulse, lochia tracking)',
      'Nutritional counseling for maternal recovery and milk production'
    ],
    clinicalNote: 'Provides a calm, supportive environment for mother and newborn bonding.',
    iconName: 'Heart'
  },

  // SPECIALIZED SERVICES (14)
  {
    id: 'foley-catheterization',
    name: 'Foley Catheterization',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Aseptic insertion and replacement of urethral Foley urinary catheters by experienced registered nurses.',
    fullDesc: 'Urinary catheterization requires meticulous aseptic technique to prevent debilitating urinary tract infections (CAUTI). Our registered nurses perform gentle catheter insertions at home following strict hospital protocols.',
    whoNeedsIt: [
      'Patients suffering from acute or chronic urinary retention',
      'Bedridden or post-operative patients unable to use a commode',
      'Patients needing routine scheduled silicone or latex catheter replacement'
    ],
    whatIsIncluded: [
      'Sterile gloved procedure with surgical drape and antiseptic prep',
      'Insertion of appropriate French-size Foley catheter with water balloon inflation',
      'Secure connection to sterile graduated urinary drainage bag',
      'Documentation of urine output and patient comfort check'
    ],
    clinicalNote: 'Strict sterile single-use kits used; doctor’s prescription verified.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'ryles-tube-insertion',
    name: 'Ryles Tube Insertion',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Expert nasogastric (NG) tube placement for enteral feeding and stomach decompression in home settings.',
    fullDesc: 'Nasogastric tube insertion requires trained clinical skill to ensure correct esophageal trajectory into the stomach. Our certified nurses insert and verify tube placement with utmost care.',
    whoNeedsIt: [
      'Stroke patients or neurological patients with severe dysphagia (inability to swallow)',
      'Unconscious or semi-conscious patients requiring enteral nutritional support',
      'Patients requiring gastric decompression under physician guidance'
    ],
    whatIsIncluded: [
      'Careful measurement of nose-to-earlobe-to-xiphoid distance (NEX method)',
      'Gentle lubricated insertion with patient swallowing synchronization',
      'Confirmation of gastric placement via aspiration of gastric contents and auscultation',
      'Secure skin fixation with medical-grade hypoallergenic tape'
    ],
    clinicalNote: 'Confirmation of placement is verified before any initial feed is administered.',
    iconName: 'GitCommit'
  },
  {
    id: 'ryles-tube-feeding',
    name: 'Ryles Tube Feeding',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Administering calibrated liquid meals, medications, and flushes through NG tube with aspiration safety.',
    fullDesc: 'Safe enteral feeding requires careful elevation of the patient, checking residual stomach volumes, slow gravity-assisted administration, and water flushing to avoid clogging and pulmonary aspiration.',
    whoNeedsIt: [
      'Patients with existing Ryles / NG tubes or PEG tubes needing scheduled feedings',
      'Families needing professional nurse guidance to learn proper tube feed technique',
      'Patients experiencing feed regurgitation, coughing, or tube blockages'
    ],
    whatIsIncluded: [
      'Patient positioning (Fowler’s 45° angle) to prevent aspiration',
      'Aspiration test for gastric residual volume check before feeding',
      'Slow, measured administration of prescribed liquid diet',
      'Sterile warm water flush to maintain tube patency and avoid bacterial buildup'
    ],
    clinicalNote: 'Caregivers are also coached on safety warning signs.',
    iconName: 'Coffee'
  },
  {
    id: 'iv-cannulation',
    name: 'IV Cannulation',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Sterile peripheral intravenous line insertion for painless, secure intravenous access.',
    fullDesc: 'Our nurses possess skilled venipuncture expertise, placing peripheral IV lines gently even in elderly patients with fragile, rolling, or collapsed veins, minimizing bruising and discomfort.',
    whoNeedsIt: [
      'Patients requiring multi-day course of intravenous antibiotics or fluids',
      'Individuals needing rehydration therapy due to gastroenteritis or severe weakness',
      'Patients whose previous IV line has expired, displaced, or developed phlebitis'
    ],
    whatIsIncluded: [
      'Vein palpation and sterile skin preparation with chlorhexidine/alcohol',
      'Insertion of appropriately gauged cannula (20G, 22G, or 24G)',
      'Flush verification with normal saline to confirm free flow without extravasation',
      'Transparent waterproof dressing (Tegaderm) with date/time labeling'
    ],
    clinicalNote: 'Monitored closely for any early signs of thrombophlebitis or infiltration.',
    iconName: 'Syringe'
  },
  {
    id: 'im-iv-injection',
    name: 'IM / IV Injection',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Accurate administration of prescribed Intramuscular and Intravenous injections at home.',
    fullDesc: 'Do not travel to hospitals just for a daily injection. Our trained nurse arrives on schedule to administer doctor-prescribed intramuscular (gluteal/deltoid), subcutaneous, or IV push medications.',
    whoNeedsIt: [
      'Patients prescribed antibiotic, antiemetic, anticoagulant, or pain injections',
      'Insulin or low molecular weight heparin (LMWH) administration',
      'B12, iron sucrose, or hormonal injections prescribed by doctors'
    ],
    whatIsIncluded: [
      'Verification of physician prescription, drug expiry, and dosage',
      'Sterile syringe preparation and aseptic skin disinfection',
      'Gentle technique with minimal post-injection tenderness',
      'Immediate observation for 15-20 minutes for any adverse drug reaction'
    ],
    clinicalNote: 'Emergency antihistamines and resuscitation protocols are kept accessible.',
    iconName: 'ShieldPlus'
  },
  {
    id: 'iv-therapy',
    name: 'IV Therapy',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Continuous intravenous saline, electrolyte, and nutrient infusions under clinical drip rate control.',
    fullDesc: 'Administration of prescribed IV fluids (Normal Saline, Ringer’s Lactate, Dextrose) for dehydration recovery, electrolyte rebalancing, or nutritional support right at the patient’s bedside.',
    whoNeedsIt: [
      'Patients dehydrated from severe vomiting, diarrhea, or heat stroke',
      'Patients unable to maintain oral hydration post-operatively',
      'Individuals prescribed multi-hour intravenous infusions'
    ],
    whatIsIncluded: [
      'Setup of IV stand, infusion tubing set, and micro/macro drip regulator',
      'Precise drip calculation (drops per minute) based on clinical prescription',
      'Continuous nurse presence throughout the infusion period',
      'Frequent monitoring of lung sounds, blood pressure, and injection site'
    ],
    clinicalNote: 'Guards against fluid overload, especially in cardiac and renal patients.',
    iconName: 'Droplet'
  },
  {
    id: 'wound-dressing',
    name: 'Wound Dressing (Major / Minor)',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Aseptic surgical, diabetic foot, pressure ulcer (bed sore), and burn wound cleaning and dressing.',
    fullDesc: 'Wound management requires strict adherence to sterile protocols to encourage granulation and avoid chronic bacterial infection. We dress surgical incisions, traumatic lacerations, and diabetic ulcers.',
    whoNeedsIt: [
      'Post-operative patients with healing surgical incisions',
      'Bedridden patients suffering from Stage 1 to Stage 4 bed sores (decubitus ulcers)',
      'Diabetic patients with foot ulcers needing specialized sterile debridement & care',
      'Patients recovering from accidental cuts, abrasions, or burns'
    ],
    whatIsIncluded: [
      'Assessment of wound bed, exudate, edge healing, and odor',
      'Sterile cleaning with normal saline and prescribed antiseptic solutions',
      'Application of hydrocolloid, silver, or foam dressings as clinically indicated',
      'Non-adhesive secondary bandaging to protect surrounding skin'
    ],
    clinicalNote: 'Periodic photographic healing tracking shared with your treating surgeon.',
    iconName: 'Bandage'
  },
  {
    id: 'suctioning-oral-tracheostomy',
    name: 'Suctioning (Oral / Tracheostomy)',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Airway clearance via sterile electrical suctioning for oral cavity, pharynx, and tracheostomy tubes.',
    fullDesc: 'When patients cannot cough up respiratory secretions independently, suctioning clears the airway and prevents hypoxia and aspiration pneumonia. Performed with high clinical gentleness.',
    whoNeedsIt: [
      'Tracheostomized patients with thick bronchial secretions',
      'Comatose, stroke, or ALS patients with impaired cough and swallowing reflex',
      'Patients producing excessive bronchial secretions causing stridor'
    ],
    whatIsIncluded: [
      'Hyperoxygenation before and after suctioning procedure',
      'Use of sterile suction catheters with vacuum pressure calibrated for safety',
      'Gentle technique under 10-15 seconds per pass to protect delicate tracheal mucosa',
      'SpO2 and heart rate monitoring throughout'
    ],
    clinicalNote: 'Sterile single-use suction catheters used to prevent airway cross-contamination.',
    iconName: 'Cpu'
  },
  {
    id: 'nebulization',
    name: 'Nebulization',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Aerosolized respiratory medication delivery for asthma, COPD, bronchitis, and wheezing relief.',
    fullDesc: 'Proper nebulization converts liquid bronchodilators and corticosteroids into a fine aerosol mist that reaches deep into the lungs for rapid respiratory relief.',
    whoNeedsIt: [
      'Asthma or COPD patients having acute wheezing, chest tightness, or bronchospasms',
      'Elderly individuals unable to coordinate standard inhaler puffers (MDIs)',
      'Pediatric patients with croup or bronchitis'
    ],
    whatIsIncluded: [
      'Calibrated electric compressor nebulizer setup at home',
      'Administering prescribed medications (e.g., Levolin, Budecort, Duolin)',
      'Proper mask or mouthpiece fitting to minimize facial medication loss',
      'Pre and post-procedure lung auscultation and pulse oximetry checks'
    ],
    clinicalNote: 'Mask and chamber are sterilized after each session to prevent fungal or bacterial colonization.',
    iconName: 'CloudRain'
  },
  {
    id: 'tracheostomy-care',
    name: 'Tracheostomy Care',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Cleaning inner cannula, stoma hygiene, sterile dressing, cuff pressure check, and tube tie changes.',
    fullDesc: 'Tracheostomy requires specialized nursing vigilance to keep the artificial airway clear, prevent stomal infection, and prevent accidental decannulation or cuff overinflation.',
    whoNeedsIt: [
      'Patients with long-term tracheostomy following prolonged ICU or ventilator stay',
      'Patients with upper airway obstruction or neurological vocal cord paralysis',
      'Families seeking expert home nursing for tracheostomy maintenance'
    ],
    whatIsIncluded: [
      'Sterile removal, cleaning, and reinsertion of the inner cannula',
      'Stoma site cleansing with antiseptic solution and application of keyhole gauze',
      'Safe tie replacement while maintaining manual stabilization of the outer tube',
      'Cuff pressure monitoring to prevent tracheal wall necrosis'
    ],
    clinicalNote: 'Emergency spare tracheostomy tube and obturator kept ready at bedside.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'foley-catheter-care',
    name: 'Foley Catheter Care',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Routine meatal hygiene, bladder wash / irrigation, drainage bag maintenance, and infection prevention.',
    fullDesc: 'Long-term catheterization can lead to encrustation, blockage, and urinary infections if not maintained rigorously. Our nurses ensure pristine hygiene and flow monitoring.',
    whoNeedsIt: [
      'Patients with permanent or extended indwelling Foley catheters',
      'Patients experiencing catheter leakage, sediment, or reduced urine flow',
      'Individuals requiring sterile saline bladder irrigation'
    ],
    whatIsIncluded: [
      'Daily meatal care with sterile saline and soap solution',
      'Securing catheter to thigh to eliminate traction and urethral erosion',
      'Emptying and changing drainage bags using non-touch sterile technique',
      'Gentle bladder wash if prescribed by the urologist'
    ],
    clinicalNote: 'Urinary output color, turbidity, and volume are logged systematically.',
    iconName: 'CheckCircle2'
  },
  {
    id: 'post-operative-care',
    name: 'Post Operative Care',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Comprehensive post-surgical recovery monitoring, drain care, pain management, and early mobilization.',
    fullDesc: 'Leaving the hospital does not mean leaving hospital care. We oversee surgical recovery at home, managing wound healing, surgical drains, pain relief, and doctor follow-up schedules.',
    whoNeedsIt: [
      'Patients discharged following orthopedic, abdominal, cardiac, or neurosurgery',
      'Surgical patients with Hemovac, Jackson-Pratt (JP), or abdominal drains',
      'Patients transitioning from hospital ICU/wards to home recovery'
    ],
    whatIsIncluded: [
      'Continuous vital checks and early detection of surgical complications (DVT, infection)',
      'Sterile drain measurement, emptying, and documentation',
      'Post-operative medication adherence and multimodal pain management',
      'Guided early ambulation and deep-breathing spirometry exercises'
    ],
    clinicalNote: 'Continuous liaison with the primary operating surgeon for peace of mind.',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'stitch-removal',
    name: 'Stitch Removal',
    type: 'specialized',
    category: 'Specialized Procedures',
    shortDesc: 'Gentle, sterile removal of surgical sutures and surgical staples at the exact healing milestone.',
    fullDesc: 'Avoid the hassle of waiting in hospital OPD queues just for suture removal. Our registered nurse visits your home, inspects the healed incision line, and removes sutures or staples comfortably.',
    whoNeedsIt: [
      'Patients 7 to 14 days post-surgery with healed wounds ready for suture removal',
      'Elderly or immobile patients for whom travel causes wound tension or pain',
      'Patients with surgical staples requiring specialized staple-extractor removal'
    ],
    whatIsIncluded: [
      'Clinical examination of wound tensile strength and absence of dehiscence',
      'Aseptic cleaning of the suture line with antiseptic solution',
      'Pain-free cutting and removal of individual stitches or metal staples',
      'Application of protective Steri-Strips or sterile light dressing'
    ],
    clinicalNote: 'Performed only after verifying the surgeon’s postoperative timeline.',
    iconName: 'Scissors'
  },
  {
    id: 'round-the-clock-care',
    name: '24×7 Care Support',
    type: 'specialized',
    category: 'Emergency & Equipment',
    shortDesc: 'Round-the-clock on-duty clinical supervision, continuous shifts, and emergency coordination.',
    fullDesc: 'Critical medical situations do not abide by business hours. Anuman Home Health Care Centre maintains active 24-hour telephone triage and rotating shift staff across Patna for uninterrupted patient care.',
    whoNeedsIt: [
      'Critically ill patients requiring non-stop 24-hour bedside nursing care',
      'Families needing rapid night-time medical advice or emergency nurse replacement',
      'Sudden clinical deterioration requiring immediate emergency coordination'
    ],
    whatIsIncluded: [
      '24/7 dedicated helpline support at 7463091878',
      '12-hour day and 12-hour night structured nursing handover protocols',
      'Continuous clinical oversight and supervisor visits',
      'Rapid escalation to on-call physicians or ambulance transfer if required'
    ],
    clinicalNote: 'Emergency care coordinator available 365 days a year without pause.',
    iconName: 'Clock'
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: 'SAFE & RELIABLE',
    subtitle: 'Care at Home',
    desc: 'Rigorous clinical hygiene standards, verified nursing staff, and hospital-grade aseptic techniques practiced at your bedside.',
    icon: 'ShieldCheck'
  },
  {
    title: 'EXPERIENCED',
    subtitle: 'Nursing Staff',
    desc: 'Certified GNM, B.Sc. nurses, and seasoned General Duty Assistants trained specifically for domestic bedside healthcare.',
    icon: 'Award'
  },
  {
    title: 'PERSONALIZED',
    subtitle: 'Patient Care',
    desc: 'Every patient is unique. We tailor our nursing care plans according to doctor prescriptions, patient mobility, and family preferences.',
    icon: 'HeartHandshake'
  },
  {
    title: 'AFFORDABLE & TRANSPARENT',
    subtitle: 'Honest Healthcare',
    desc: 'Clear upfront service rates without hidden fees or surprise hospital charges, bringing quality care within reach.',
    icon: 'BadgePercent'
  },
  {
    title: 'PROFESSIONAL & TRAINED STAFF',
    subtitle: 'Skilled Competence',
    desc: 'Continuous skill assessments in IV therapy, catheterization, CPR, vitals monitoring, and compassionate patient communication.',
    icon: 'GraduationCap'
  },
  {
    title: 'COMPASSIONATE & RELIABLE',
    subtitle: 'Warm Human Touch',
    desc: 'We treat our patients like our own family members, prioritizing emotional comfort and mental well-being alongside physical healing.',
    icon: 'Sparkles'
  },
  {
    title: '24×7 CARE SUPPORT',
    subtitle: 'Always Available',
    desc: 'Around-the-clock helpline (7463091878) and rotating clinical shifts ensuring your loved one is never left unattended.',
    icon: 'Clock'
  },
  {
    title: 'COMFORT OF HOME CARE',
    subtitle: 'Heal Where You Live',
    desc: 'Eliminates hospital-acquired infection risks, reduces patient anxiety, and allows active family participation in recovery.',
    icon: 'Home'
  }
];

export const CARE_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Contact Us',
    desc: 'Call our 24×7 careline at 7463091878 or submit a quick request online with your location in Patna.',
    action: 'Call 7463091878'
  },
  {
    step: '02',
    title: 'Discuss Your Care Requirements',
    desc: 'Share the patient’s condition, doctor’s prescription, and whether you require general nursing, elder care, or a specialized procedure.',
    action: 'Prescription & Needs Review'
  },
  {
    step: '03',
    title: 'Get Matched With Appropriate Care',
    desc: 'We match you with a qualified nurse, GDA attendant, or technician equipped with verified medical supplies.',
    action: 'Rapid Staff Deployment'
  },
  {
    step: '04',
    title: 'Receive Professional Care at Home',
    desc: 'Your designated healthcare professional arrives at your doorstep for gentle, hospital-grade medical care with ongoing monitoring.',
    action: 'Healing in Comfort'
  }
];

export const PATIENT_CARE_GUIDELINES = [
  {
    title: 'Prescriptions & Medical History',
    desc: 'Keep the treating doctor’s recent prescription, discharge summary, and allergy history accessible for the visiting nurse.',
    icon: 'FileText'
  },
  {
    title: 'Clean & Well-Ventilated Space',
    desc: 'Ensure a clean, well-lit bedside area with a small sanitized table for clinical supplies and hand sanitizer.',
    icon: 'Sparkles'
  },
  {
    title: 'Emergency Contact Person',
    desc: 'Identify a primary family member who can communicate with the nurse and make decisions if changes in condition occur.',
    icon: 'PhoneCall'
  },
  {
    title: 'Transparent Daily Records',
    desc: 'Our nursing staff maintains a daily vitals sheet and medication log that family members can review anytime.',
    icon: 'CheckSquare'
  }
];

// PATNA LOCALITIES FOR COVERAGE CHECKER
export interface PatnaLocality {
  name: string;
  zone: string;
  responseTime: string;
  popularServices: string[];
}

export const PATNA_LOCALITIES: PatnaLocality[] = [
  {
    name: 'Bailey Road & Rukanpura',
    zone: 'Immediate Hub (Registered Office)',
    responseTime: '20 - 30 mins',
    popularServices: ['24x7 Bedside Nursing', 'Catheterization', 'Oxygen Cylinder Delivery']
  },
  {
    name: 'Raja Bazar & Saguna More',
    zone: 'West Patna Corridor',
    responseTime: '25 - 35 mins',
    popularServices: ['GDA Attendant', 'Ryles Tube Insertion', 'ICU Bed Rental']
  },
  {
    name: 'Boring Road & Boring Canal Road',
    zone: 'Central Patna',
    responseTime: '30 - 45 mins',
    popularServices: ['Elder Care at Home', 'Physiotherapy', 'Lab Tests Home Collection']
  },
  {
    name: 'Danapur & Khagaul',
    zone: 'Danapur Cantonment & Suburbs',
    responseTime: '35 - 45 mins',
    popularServices: ['Post Operative Care', 'Wound Dressing', '24-Hour Nursing']
  },
  {
    name: 'Patliputra Colony & Ashiana Nagar',
    zone: 'North-West Patna',
    responseTime: '25 - 40 mins',
    popularServices: ['On Call Doctors', 'ECG at Home', 'Elder Bedside Care']
  },
  {
    name: 'Kankarbagh & Rajendra Nagar',
    zone: 'South-East Patna',
    responseTime: '40 - 55 mins',
    popularServices: ['Tracheostomy Care', 'Oxygen Concentrators', 'GDA Attendant']
  },
  {
    name: 'Anisabad & Phulwari Sharif',
    zone: 'South Patna',
    responseTime: '35 - 50 mins',
    popularServices: ['Foley Catheter Care', 'IV Cannulation', 'Physiotherapy']
  },
  {
    name: 'Exhibition Road & Gandhi Maidan',
    zone: 'Commercial & Downtown Patna',
    responseTime: '35 - 50 mins',
    popularServices: ['Ambulance Services', 'Doctor Visit', 'IV Therapy']
  },
  {
    name: 'Patna City (City Chowk / Gulzarbagh)',
    zone: 'East Patna Historical Sector',
    responseTime: '50 - 65 mins',
    popularServices: ['Long-term 24-hr Nursing', 'Medical Equipment Rental']
  }
];

// MEDICAL EQUIPMENT AVAILABLE FOR RENTAL / SETUP AT HOME
export interface MedicalEquipmentItem {
  id: string;
  name: string;
  category: string;
  indication: string;
  features: string[];
  setupTime: string;
}

export const MEDICAL_EQUIPMENT_LIST: MedicalEquipmentItem[] = [
  {
    id: 'oxygen-concentrator',
    name: 'Medical Oxygen Concentrator (5L / 10L)',
    category: 'Respiratory Support',
    indication: 'Continuous oxygen delivery for COPD, post-COVID fibrosis, or low SpO2 without cylinders.',
    features: ['High-purity 93%±3% medical oxygen', 'Built-in nebulizer port', 'Continuous 24-hour operation', 'Digital flow control with alarm'],
    setupTime: 'Same-Day Doorstep Setup in Patna'
  },
  {
    id: 'oxygen-cylinder',
    name: 'Medical Oxygen Cylinder (B & D Type)',
    category: 'Emergency Oxygen',
    indication: 'Emergency backup and high-pressure oxygen therapy with regulator and humidifier.',
    features: ['Pre-filled certified medical oxygen', 'Complete brass regulator & flowmeter', 'Oxygen mask & nasal cannula included', 'Immediate refill logistics'],
    setupTime: 'Express 1-2 Hour Dispatch'
  },
  {
    id: 'hospital-icu-bed',
    name: 'Multi-Function Hospital Bed (Manual & Motorized)',
    category: 'Bedside Comfort & Ergonomics',
    indication: 'Bedridden, orthopedic, or stroke recovery patients needing backrest and knee-elevation.',
    features: ['Backrest & leg elevation adjustments', 'Collapsible safety side rails', 'IV drip stand & drainage hooks', 'Lockable heavy-duty caster wheels'],
    setupTime: 'Same-Day Delivery & Installation'
  },
  {
    id: 'anti-bedsore-mattress',
    name: 'Alternating Air Mattress (Anti-Decubitus)',
    category: 'Pressure Ulcer Prevention',
    indication: 'Essential for patients confined to bed to prevent painful stage I-IV pressure sores.',
    features: ['Continuous pressure-relief cycle pump', 'Medical-grade non-toxic PVC cells', 'Ultra-quiet 24-hour micro-compressor', 'Easy wipe-clean waterproof surface'],
    setupTime: 'Immediate Dispatch'
  },
  {
    id: 'suction-machine',
    name: 'Portable Phlegm Suction Unit',
    category: 'Airway Clearance',
    indication: 'Tracheostomy and paralyzed patients needing oral and bronchial secretion clearance.',
    features: ['High negative pressure vacuum pump', 'Anti-overflow safety jar with filter', 'Portable handle with suction tubing', 'Silent operation'],
    setupTime: 'Same-Day Delivery with Nurse Demo'
  },
  {
    id: 'bipap-cpap',
    name: 'BiPAP / CPAP Non-Invasive Ventilator',
    category: 'Advanced Respiratory Care',
    indication: 'Sleep apnea, hypercapnic respiratory failure, and post-ICU transition.',
    features: ['Auto-titrating pressure support', 'Built-in heated humidifier', 'Full-face or nasal mask fitting', 'Real-time compliance monitoring'],
    setupTime: 'Clinical Technician Installation'
  }
];

// FREE HOME COLLECTION LAB PACKAGES
export interface LabPackageItem {
  id: string;
  name: string;
  parameterCount: string;
  testsIncluded: string[];
  reportTime: string;
  recommendedFor: string;
}

export const LAB_PACKAGES_LIST: LabPackageItem[] = [
  {
    id: 'complete-hemogram',
    name: 'Complete Blood Count (CBC) with ESR',
    parameterCount: '24 Parameters',
    testsIncluded: ['Hemoglobin', 'TLC & DLC', 'Platelet Count', 'RBC Indices', 'ESR'],
    reportTime: 'Within 6-8 Hours on WhatsApp/Email',
    recommendedFor: 'Fever, infection screening, weakness, anemia, post-chemo follow-up'
  },
  {
    id: 'diabetic-vital-profile',
    name: 'Diabetes & Kidney Check (HbA1c + KFT)',
    parameterCount: '12 Parameters',
    testsIncluded: ['HbA1c (3-month average)', 'Fasting / PP Blood Sugar', 'Serum Creatinine', 'Blood Urea Nitrogen', 'Uric Acid'],
    reportTime: 'Same-Day Evening',
    recommendedFor: 'Diabetic and hypertensive elderly patients requiring routine monitoring'
  },
  {
    id: 'liver-lipid-panel',
    name: 'Comprehensive Liver & Lipid Screen',
    parameterCount: '16 Parameters',
    testsIncluded: ['SGOT & SGPT', 'Bilirubin (Total & Direct)', 'Alkaline Phosphatase', 'Total Cholesterol', 'Triglycerides', 'HDL & LDL'],
    reportTime: 'Within 12 Hours',
    recommendedFor: 'Cardiovascular risk assessment, medication toxicity monitoring'
  },
  {
    id: 'senior-citizen-health-panel',
    name: 'Senior Citizen Complete Home Wellness',
    parameterCount: '48 Parameters',
    testsIncluded: ['CBC', 'KFT', 'LFT', 'Lipid Profile', 'HbA1c', 'Thyroid Profile (T3, T4, TSH)', 'Urine Routine & Microscopic'],
    reportTime: 'Next Day Morning',
    recommendedFor: 'Comprehensive annual or bi-annual health evaluation for elders without travel stress'
  }
];

