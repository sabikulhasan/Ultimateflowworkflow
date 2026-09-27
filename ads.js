/* Commercial Ad Prompt Builder (ads.html).
   Shot, angle, move, style and format libraries come from the Storyboard Prompt System; the rest is ad-specific. */
"use strict";
/* ---------------- DATA: STORYBOARD PROMPT SYSTEM ---------------- */
const SHOTS=[
 ["auto","Auto","The model picks the best shot size."],
 ["est","Establishing shot","A very wide first view that shows where the story takes place."],
 ["ews","Extreme wide shot","The person or product looks tiny in a huge space. Shows scale."],
 ["ws","Wide shot","The whole body and the surroundings. Shows action and space."],
 ["fs","Full shot","Head to toe, filling the frame. Shows outfit and posture."],
 ["ms","Medium shot","From the waist up. Good for actions and conversations."],
 ["mcu","Medium close-up","From the chest up. Face is clear, some body language stays."],
 ["cu","Close-up","A face or the product fills the frame. Shows emotion or detail."],
 ["ecu","Extreme close-up","One tiny detail only: eyes, fingertips, a logo, a texture."],
 ["macro","Macro shot","Very magnified surface: material grain, water drops, stitching."],
 ["insert","Insert shot","A quick cut to an object or to hands doing something."],
 ["ots","Over-the-shoulder shot","Camera behind a person, showing what they look at."],
 ["pov","POV shot","The viewer sees through the character's own eyes."],
 ["two","Two-shot","Two people in one frame. Shows their relationship."],
 ["hero","Hero product shot","The product centered and perfectly lit. The main 'money shot'."]
];
const ANGLES=[
 ["auto","Auto","The model picks the best angle."],
 ["eye","Eye level","Camera at eye height. Neutral and natural."],
 ["low","Low angle","Camera looks up. The subject looks strong or grand."],
 ["high","High angle","Camera looks down. The subject looks small, calm or watched."],
 ["top","Overhead (top-down)","Straight down from above. Clean, flat-lay look."],
 ["aerial","Aerial (drone)","High in the sky. Shows the place from above."],
 ["dutch","Dutch angle","Tilted horizon. Adds tension, unease or fun."],
 ["ground","Ground level","Camera on the floor. Strong foreground and reflections."]
];
const MOVES=[
 ["auto","Auto","The video model picks the movement."],
 ["static","Static","The camera does not move. Calm and steady."],
 ["pushin","Slow push-in","The camera moves slowly closer. Builds focus or emotion."],
 ["pullout","Pull-out","The camera moves back. Reveals more or ends a moment."],
 ["track","Tracking shot","The camera moves alongside a moving person or object."],
 ["gimbal","Gimbal walk","A smooth, floating follow, like walking through a space."],
 ["orbit","Orbit (arc)","The camera circles the subject. Premium product feel."],
 ["pan","Pan","The camera turns left or right from one spot. Scans a scene."],
 ["tilt","Tilt","The camera turns up or down from one spot. Reveals height."],
 ["crane","Crane move","The camera rises or lowers smoothly. Big reveals."],
 ["drone","Drone flyover","A moving aerial shot over the place."],
 ["handheld","Handheld","Slight natural shake. Feels real, like phone or documentary video."],
 ["whip","Whip pan","A very fast turn with motion blur. Energetic transition."],
 ["rack","Rack focus","The focus shifts from one thing to another."],
 ["slowmo","Slow motion","The action slows down to highlight a peak moment."],
 ["ramp","Speed ramp","Speed jumps between fast and slow. Action energy."]
];

const STYLES=[
 {id:"S1",g:"Photoreal",name:"Luxury Cinematic",tone:"real",desc:"Your original look. Polished, premium, TV-campaign quality.",
  text:"Create a cinematic, premium commercial with the production quality of a luxury brand advertisement.\nUse realistic photography with clean compositions, soft cinematic lighting, elegant color grading, shallow depth of field, tasteful lens flares, macro cinematography, smooth camera movement, premium product photography, and luxurious commercial aesthetics.\nThe commercial should look like it was produced for television or a global advertising campaign."},
 {id:"S2",g:"Photoreal",name:"Warm Nostalgic Film",tone:"real",desc:"35mm film grain and golden tones. Feels like a warm family memory.",
  text:"Shot on 35mm film with Kodak Portra color, soft film grain, warm golden tones, gentle halation on highlights, natural window light, and steady handheld framing.\nThe mood is intimate, human, and nostalgic, like a cherished family memory.\nRealistic photography with the production quality of a high-end television commercial."},
 {id:"S3",g:"Photoreal",name:"Clean Bright Commercial",tone:"real",desc:"Bright white and pastel. Modern tech-brand look, happy and simple.",
  text:"A bright, airy, high-key look with white and soft pastel tones, even diffused lighting, crisp focus, minimal props, and modern tech-brand aesthetics.\nClean, optimistic, and uncluttered.\nRealistic photography with the production quality of a global advertising campaign."},
 {id:"S4",g:"Photoreal",name:"Documentary Realism",tone:"raw",desc:"Natural light, real places, unposed moments. Feels true, not staged.",
  text:"Natural available light, a handheld documentary camera, real locations, candid unposed moments, muted true-to-life colors, and slight natural imperfections.\nIt should feel real and honest, not staged.\nRealistic photography with professional commercial production quality."},
 {id:"S5",g:"Photoreal",name:"Moody Dramatic",tone:"real",desc:"Deep shadows, teal and orange colors, haze. Suspense and power.",
  text:"Low-key lighting, deep shadows, strong contrast, a teal-and-amber color grade, practical light sources, light haze or rain, and slow dramatic camera moves.\nThe mood is powerful and suspenseful.\nRealistic photography with the production quality of a feature film trailer."},
 {id:"S6",g:"Photoreal",name:"Golden Hour Lifestyle",tone:"real",desc:"Sunset light from behind, glowing skin, relaxed and happy.",
  text:"Warm sunset backlight, soft sun flares, glowing skin tones, open outdoor or window-lit spaces, a light breeze in hair and fabric, and relaxed, happy energy.\nRealistic lifestyle photography with the production quality of a global advertising campaign."},
 {id:"S7",g:"Photoreal",name:"High-Energy Action",tone:"real",desc:"Low angles, speed changes, frozen slow motion. Sports energy.",
  text:"Dynamic low angles, fast whip pans, speed ramps, frozen slow-motion peaks, punchy contrast, saturated colors, and a texture of sweat and motion.\nHigh energy and adrenaline.\nRealistic photography with the production quality of a global sports brand commercial."},
 {id:"S8",g:"Photoreal",name:"Minimal Architectural",tone:"real",desc:"Balanced framing, clean lines, daylight. Best for property and interiors.",
  text:"Symmetrical compositions, clean geometric lines, neutral stone, wood, and concrete tones, soft natural daylight, wide-angle lenses, and calm, still framing.\nElegant, spacious, and architectural.\nRealistic photography with the production quality of a luxury real-estate campaign."},
 {id:"S9",g:"Photoreal",name:"Bangladeshi Festive",tone:"real",desc:"Rich reds, greens and golds, fairy lights, marigolds. Joyful and cultural.",
  text:"Rich saturated reds, greens, and golds, marigold flowers, fairy lights, traditional Bangladeshi textiles, warm tungsten evening light, and joyful gatherings.\nAuthentic Bangladeshi cultural detail.\nRealistic photography with the production quality of a national television commercial."},
 {id:"S10",g:"Photoreal",name:"Smartphone UGC",tone:"raw",desc:"Looks filmed on a phone by a real customer. Native to social media.",
  text:"Looks filmed on a modern smartphone: casual framing, natural indoor light, slight handheld shake, real homes and streets, and no cinematic color grading.\nAuthentic social media content made by a real customer.\nRealistic, not staged."},
 {id:"S11",g:"Photoreal",name:"Dreamy Soft Pastel",tone:"real",desc:"Soft focus, pastel colors, floating light. Romantic and gentle.",
  text:"Soft focus edges, a pastel color palette, gentle backlight bloom, floating dust particles in the light, and an airy, romantic mood.\nRealistic photography with the production quality of a luxury beauty campaign."},
 {id:"S12",g:"Photoreal",name:"Night Neon Urban",tone:"real",desc:"Wet streets, neon reflections, blue and pink. Stylish youth energy.",
  text:"City at night, neon reflections on wet streets, bokeh lights, cool blue and magenta tones, and stylish, modern youth energy.\nRealistic photography with the production quality of a global fashion campaign."},
 {id:"S19",g:"Photoreal",name:"Anamorphic Blockbuster",tone:"real",desc:"Wide movie-screen look, blue streak flares, epic scale. Feels like a film trailer.",
  text:"Anamorphic widescreen cinematography with horizontal blue lens flares, oval bokeh, epic scale, dramatic skies, and a rich blockbuster color grade.\nRealistic photography with the production quality of a Hollywood film trailer."},
 {id:"S21",g:"Photoreal",name:"Bold Color Blocking",tone:"real",desc:"Solid bright backgrounds, graphic poses, crisp shadows. Pop fashion-campaign look.",
  text:"Bold color-blocked sets with solid bright backgrounds, matching colored props, graphic compositions, hard studio light with crisp shadows, and confident posing.\nRealistic photography with the production quality of a global fashion campaign."},
 {id:"S14",g:"CGI & modern",name:"CGI Photoreal Render",tone:"cgi",desc:"Looks like a perfect 3D studio render: floating product, flawless reflections. Modern tech-launch look.",
  text:"Hyper-real CGI product visuals: the product floats and rotates in a clean studio space with flawless reflections, soft gradient backdrops, precise rim lighting, and perfect materials.\nAny scenes with people stay photoreal.\nThe production quality of a flagship tech product launch film."},
 {id:"S15",g:"CGI & modern",name:"CGI + Live Action (FOOH)",tone:"cgi",desc:"Real city video mixed with impossible CGI, like giant products on buildings. Viral social-media style.",
  text:"Photoreal live-action city footage combined with seamless, impossible CGI elements, like a giant product on a building or objects coming alive.\nHandheld phone-style camera for realism, natural daylight, and believable shadows and reflections on the CGI.\nThe quality of viral fake out-of-home (FOOH) social media ads."},
 {id:"S16",g:"CGI & modern",name:"Liquid & Particle CGI",tone:"cgi",desc:"Splashes, smoke, sparks or particles swirl around and reveal the product. Energetic and premium.",
  text:"High-end CGI simulations: liquid splashes, smoke, light particles, and sparks swirl around the product and shape its reveal.\nA dark or colored studio background, dramatic rim light, and slow-motion physics.\nThe product stays exactly as the reference.\nThe production quality of a premium beverage or tech launch ad."},
 {id:"S17",g:"CGI & modern",name:"⚠ Tech Exploded View",tone:"cgi",desc:"The product's parts float apart to show the inside, then snap back. Risky: can change product details.",
  text:"Precise CGI exploded-view sequences: the product's parts separate and float in perfect alignment, then reassemble.\nA clean dark or white backdrop, engineering-style lighting, and sharp detail.\nWhen assembled, the product must match the reference exactly.\nThe production quality of a flagship tech reveal."},
 {id:"S18",g:"CGI & modern",name:"Miniature Tilt-Shift",tone:"cgi",desc:"The world looks like a tiny toy model, with blur at top and bottom. Playful and charming.",
  text:"Tilt-shift miniature look: high-angle views where the world looks like a tiny, detailed model, with strong blur at the top and bottom of the frame, bright saturated colors, and cheerful daylight.\nThe product keeps full detail and matches the reference exactly.\nPlayful, charming, and polished."},
 {id:"S20",g:"CGI & modern",name:"Y2K Chrome Futuristic",tone:"cgi",desc:"Shiny chrome, rainbow-metal gradients, bold pop colors. Trendy with young audiences.",
  text:"Y2K-inspired futuristic aesthetic: glossy chrome surfaces, iridescent and holographic gradients, bold color pops, clean studio sets, and playful fashion-editorial posing.\nThe product stays exactly as the reference.\nThe production quality of a trendy global fashion or tech campaign."},
 {id:"S13",g:"Stylised (risky)",name:"⚠ 3D Animated Film",tone:"anim",desc:"Animated-movie look with cartoon-like characters. Risky: may change the product. Test first.",
  text:"A premium 3D animated film look with soft global illumination, rich colors, and expressive characters.\nThe product itself must remain photoreal and match the reference image exactly.\nThe production quality of a major animation studio commercial."},
 {id:"S22",g:"Stylised (risky)",name:"⚠ Stop-Motion / Claymation",tone:"anim",desc:"Handmade clay world with slightly jumpy motion. Charming, but risky for product accuracy.",
  text:"Handcrafted stop-motion look: clay and felt characters and sets, visible handmade textures, warm practical lighting, and slightly stepped animation.\nThe product itself stays photoreal and matches the reference exactly.\nThe production quality of an award-winning stop-motion studio."}
];

const F=[
 {id:"F1",g:"Story",name:"Emotional Journey",desc:"A slow, heartfelt story. A person's long-held dream comes true through the product.",
  pace:"Slow, gentle pacing with long, lingering shots and soft transitions.",recs:["S1","S2","S6"],
  frames:["Establishing shot of the character's world|est|aerial|drone","The character in their everyday life|ws|eye|track","A hint of the dream: an old photo or a memory|insert|high|pushin","The struggle or the long wait|ms|eye|static","First encounter with the product|ws|low|pushin","Close-up of the emotional reaction|cu|eye|pushin","Exploring the product|ms|eye|gimbal","A detail that matters to them|ecu|eye|rack","Sharing the moment with a loved one|two|eye|orbit","Slow-motion peak of emotion|mcu|low|slowmo","A quiet, content moment|ws|high|pullout","Hero shot of the product with the character|hero|low|crane"]},
 {id:"F2",g:"Story",name:"Problem to Solution",desc:"Opens with an annoying everyday problem. The product solves it clearly.",
  pace:"Tense and slightly fast in the first half, then calm and smooth after the product appears.",recs:["S3","S4","S21"],
  frames:["The problem shown in a wide shot|ws|eye|static","Close-up of frustration|cu|eye|handheld","The problem gets worse|ms|dutch|handheld","A failed old solution|insert|high|static","The product appears|hero|low|pushin","The product in use|ms|eye|track","The key feature working, in close detail|macro|eye|rack","The problem disappears|ws|eye|pullout","Relieved reaction|mcu|eye|slowmo","Life is now easier|ws|eye|gimbal","Confident smile|cu|low|pushin","Hero product shot|hero|low|orbit"]},
 {id:"F3",g:"Story",name:"Before / After",desc:"Life without the product, then life with it. The two halves mirror each other.",
  pace:"Match cuts between before and after, with a clear shift in color and energy at the midpoint.",recs:["S3","S4","S8"],
  frames:["Before: wide shot of a dull, cramped, colorless world|ws|eye|static","Before: the character struggling|ms|eye|static","Before: a frustrating detail|cu|eye|static","Before: a tired face|cu|eye|static","Before: the space seen from above|ws|top|static","Transition: a door opens or a light switches on|insert|eye|whip","After: same framing as Frame 1, now bright and spacious|ws|eye|gimbal","After: same framing as Frame 2, now easy and happy|ms|eye|gimbal","After: same framing as Frame 3, the detail now solved by the product|cu|eye|rack","After: same framing as Frame 4, now smiling|cu|eye|pushin","After: same framing as Frame 5, seen from above|ws|top|crane","Hero shot of the product|hero|low|orbit"]},
 {id:"F4",g:"Story",name:"Day in the Life",desc:"One full day, sunrise to night, with the product part of each moment.",
  pace:"Steady rhythm. Show time passing through changes in light and smooth transitions.",recs:["S6","S2","S4"],
  frames:["Sunrise establishing shot|est|aerial|drone","Waking up|ms|high|static","Morning routine with the product|mcu|eye|handheld","Midday activity|ws|eye|track","A small product moment|insert|eye|rack","Afternoon light through the window|ws|eye|pan","Family or friends arrive|ws|eye|gimbal","Golden hour moment|ms|low|slowmo","Dinner or gathering|ws|high|orbit","Evening calm|mcu|eye|static","Night exterior|est|aerial|drone","Hero shot at night|hero|low|pushin"]},
 {id:"F7",g:"Story",name:"Mini Drama with a Twist",desc:"A short film-like story with suspense. The twist: the product is the answer.",
  pace:"Film-like suspense, a steady build-up, then a release at the reveal.",recs:["S5","S19","S7"],
  frames:["Mysterious opening|ews|high|drone","The character on a mission|ms|low|track","An obstacle|ws|eye|handheld","Rising tension|cu|dutch|pushin","A close call|ms|low|ramp","Cliffhanger moment|ecu|eye|static","The search continues|ws|eye|gimbal","A clue|insert|high|rack","The reveal begins|ots|eye|pushin","The twist: the product was the answer|hero|low|pushin","Relieved, happy ending|two|eye|orbit","Hero shot|hero|low|crane"]},
 {id:"F8",g:"Story",name:"Comedy / Exaggeration",desc:"A light, funny ad that blows the problem or the product's effect out of proportion.",
  pace:"Snappy comic timing, quick cuts and expressive reactions.",recs:["S3","S10","S21"],
  frames:["A normal everyday scene|ws|eye|static","A small annoyance|mcu|eye|static","The annoyance grows absurdly big|ws|dutch|whip","Comic reaction face|cu|eye|pushin","Chaos peaks|ws|high|handheld","The product enters|hero|low|slowmo","Instant calm|ws|eye|static","Surprised double-take|cu|eye|whip","People nearby react|ms|eye|pan","Comic payoff|ms|low|static","Smug, happy character|mcu|low|pushin","Hero shot with a playful pose|hero|eye|static"]},
 {id:"F9",g:"Story",name:"Legacy / Generations",desc:"A story across generations. The product connects parents, children and grandchildren.",
  pace:"Tender, slow dissolves between past and present.",recs:["S2","S1"],
  frames:["An old family photograph|insert|top|pushin","The elder today|mcu|eye|static","A memory of their youth, in a warm tint|ws|eye|slowmo","The promise they once made|two|eye|pushin","Years pass: a time transition|ews|aerial|drone","The family now|ws|eye|gimbal","The product becomes the family's shared place or tool|ms|eye|track","Grandchild and grandparent together|two|low|orbit","A family tradition continues|insert|high|rack","Whole family group moment|ws|high|crane","The elder looks on with pride|cu|eye|pushin","Family hero shot with the product|hero|low|pullout"]},
 {id:"F10",g:"Story",name:"Festival / Occasion",desc:"A celebration ad: Eid, Pohela Boishakh, a wedding or New Year. The product is part of the fun.",
  pace:"Joyful, warm, lively rhythm with slow-motion highlights.",recs:["S9","S6"],
  frames:["Festive decorations in a wide view|est|aerial|drone","Getting ready for the celebration|ms|eye|handheld","The family arrives|ws|eye|track","The product in the celebration|ms|low|pushin","A gift or a blessing|insert|eye|rack","Food and laughter|ws|top|crane","Children playing|ms|ground|track","Slow-motion festive detail: lights, color, fabric|ecu|eye|slowmo","Everyone gathers together|ws|high|orbit","An emotional hug|two|eye|pushin","Night celebration|ws|low|gimbal","Hero shot in festive light|hero|low|crane"]},
 {id:"F12",g:"Story",name:"Aspirational / Status",desc:"A confident, premium ad about success and having arrived.",
  pace:"Confident and sleek, with slow-motion walks and a controlled camera.",recs:["S1","S19","S12"],
  frames:["City skyline|est|aerial|drone","A well-dressed character in motion|ws|low|track","A luxury detail|ecu|eye|rack","The product reveal|hero|low|pushin","Low-angle power shot|ms|low|static","Reflection in glass|mcu|eye|track","Admiring glances from others|ms|eye|pan","Slow-motion walk|fs|low|slowmo","Close detail of the material|macro|eye|rack","Night city lights mood|ws|eye|gimbal","A satisfied look|cu|eye|pushin","Monumental hero shot|hero|low|crane"]},
 {id:"F15",g:"Story",name:"Many Lives, One Product",desc:"A montage of many different people, each using the product their own way.",
  pace:"Rhythmic montage with match cuts on gesture or movement.",recs:["S6","S4","S7"],
  note:"The ten people are generic. Rewrite them to fit your product and audience.",
  frames:["A young student with the product in the morning|ms|eye|track","An office worker with the product at midday|ms|low|gimbal","A mother and child at home with the product|two|eye|handheld","An elderly couple with the product|two|eye|static","An athlete outdoors with the product|ws|low|slowmo","Friends at a café with the product|ws|eye|orbit","An artist in a studio with the product|mcu|eye|rack","A shopkeeper at work with the product|ms|eye|pan","A traveller on the road with the product|ws|aerial|drone","A family at night with the product|ws|high|crane","All of them echoed in one shared gesture|cu|eye|static","Hero shot|hero|low|orbit"]},
 {id:"F5",g:"Product focus",name:"Product Hero / Macro Showcase",desc:"A pure product film with few or no people. Shows materials and craftsmanship, like a luxury launch.",
  pace:"Slow, precise, motion-controlled camera moves: orbits, slides and focus pulls.",recs:["S1","S14","S16"],
  frames:["Darkness, then a light sweep reveals the product's outline|ws|eye|static","Extreme close-up of a surface texture|ecu|eye|rack","Close detail of an edge|macro|low|track","Slow orbit around the product|ms|eye|orbit","Close-up of the key feature|cu|eye|pushin","Overhead view of the product|ms|top|crane","Low-angle hero view|hero|low|pushin","Reflection of the product on a glossy surface|cu|ground|track","Detail of a second feature|ecu|eye|rack","Slow-motion particle or light moment around the product|cu|eye|slowmo","Pull back to reveal the full product|ws|eye|pullout","Final hero on a clean background|hero|eye|orbit"]},
 {id:"F13",g:"Product focus",name:"Mystery Reveal / Teaser",desc:"The product stays hidden or half-shown until the end. Builds curiosity.",
  pace:"A slow build, then a fast, bright reveal at the end.",recs:["S5","S16","S1"],
  frames:["Darkness|ews|eye|static","A partial silhouette|ws|low|static","A light sweep over an edge|ecu|eye|track","People react to something off-screen|ms|eye|pan","Texture close-up|macro|eye|rack","A shadow shape|ws|high|static","Anticipation on a face|cu|eye|pushin","A cover or curtain starts to move|insert|eye|slowmo","Partial reveal|ms|low|crane","A burst of light|ws|eye|ramp","The full reveal|hero|low|pullout","Hero shot|hero|eye|orbit"]},
 {id:"F21",g:"Product focus",name:"Feature Breakdown",desc:"Shows three key features one by one. Each gets a close detail and a real-life moment.",
  pace:"Clear, confident rhythm: detail, then use, for each feature.",recs:["S3","S14","S1"],
  note:"Replace 'Feature 1, 2, 3' with your real features, for example 'long battery life'.",
  frames:["Hook: the product in a striking hero composition|hero|low|pushin","Feature 1: close detail|macro|eye|rack","Feature 1: in real-life use|ms|eye|track","Feature 1: happy result|mcu|eye|static","Feature 2: close detail|ecu|eye|orbit","Feature 2: in real-life use|ws|eye|gimbal","Feature 2: happy result|cu|eye|pushin","Feature 3: close detail|macro|low|rack","Feature 3: in real-life use|ms|eye|handheld","Feature 3: happy result|mcu|low|slowmo","All features together: the product in a full lifestyle scene|ws|eye|pullout","Hero shot|hero|low|orbit"]},
 {id:"F19",g:"Product focus",name:"ASMR / Sensory",desc:"Slow, satisfying close-ups of textures, clicks and touches. The viewer can almost feel the product.",
  pace:"Very slow and calm. Let every touch, click and texture play out in extreme detail.",recs:["S1","S16","S3"],
  frames:["Soft light rises on the product in darkness|cu|eye|static","A fingertip glides across the surface|macro|eye|track","A satisfying click, press or snap|ecu|eye|static","Texture detail in low side light|macro|low|rack","Slow-motion drop, pour or spray that fits the product|cu|eye|slowmo","Hands turn the product slowly|cu|high|orbit","Overhead flat lay with the product and natural materials|ms|top|static","An edge catching the light|ecu|eye|track","The product in gentle use|mcu|eye|pushin","A second satisfying touch moment|ecu|eye|static","Calm pull back|ms|eye|pullout","Hero shot in soft light|hero|eye|orbit"]},
 {id:"F11",g:"Product focus",name:"Walkthrough / Tour",desc:"A guided tour that feels like one continuous walk. Best for property, cars and stores.",
  pace:"Smooth forward gimbal or dolly moves, as if one continuous walk.",recs:["S8","S1","S6"],
  frames:["Exterior establishing shot|est|aerial|drone","The character approaches the entrance, seen from behind|ws|eye|gimbal","The entrance opens|ms|eye|pushin","The main living area|ws|eye|gimbal","A detail feature|ecu|eye|rack","The kitchen or a key zone|ws|eye|pan","The bedroom|ws|eye|gimbal","A bathroom or finish detail|cu|eye|track","The balcony or view|ots|eye|pushin","Lifestyle use of the space|ms|eye|orbit","Pull back to a wide interior|ws|high|pullout","Hero exterior at dusk|hero|low|crane"]},
 {id:"F17",g:"Social & modern",name:"Unboxing & First Use",desc:"The thrill of opening the product and using it right away. Great for gadgets, beauty and gifts.",
  pace:"Close, tactile moments with satisfying detail, then a lift in energy as the product goes into real life.",recs:["S1","S3","S6"],
  frames:["POV: hands reach for the product box on a desk|pov|high|handheld","The lid lifts slowly and the product is revealed inside|cu|high|pushin","POV: hands lift the product out|pov|eye|handheld","Close detail of the material or logo|macro|eye|rack","Close-up of the key control or feature|cu|eye|static","First use: putting it on or switching it on|mcu|eye|pushin","A satisfied reaction|cu|eye|slowmo","Stepping out into the day with the product|ws|eye|gimbal","The product in real-life use|ms|low|track","A friend notices it|two|eye|handheld","A moment of pure enjoyment|mcu|low|slowmo","Hero shot of the product|hero|low|orbit"]},
 {id:"F14",g:"Social & modern",name:"POV (First Person)",desc:"Everything is seen through the viewer's eyes, so they experience the product directly.",
  pace:"Smooth first-person camera with natural head movements.",recs:["S3","S6","S7"],
  frames:["POV: hands open a door or a box|pov|eye|handheld","POV: looking around|pov|eye|pan","POV: hands touch the product|pov|high|handheld","Close-up of the product|cu|eye|pushin","POV: turning to see a person smiling|pov|eye|whip","POV: walking forward|pov|eye|gimbal","A detail|insert|eye|rack","POV: using the product|pov|high|handheld","POV: the view outward|pov|eye|pushin","POV: a loved one hands something over|pov|eye|static","POV: looking down at the product|pov|top|tilt","Hero shot from the viewer's position|hero|eye|pullout"]},
 {id:"F6",g:"Social & modern",name:"Testimonial / UGC",desc:"A real customer shares their experience, filmed like honest phone video.",
  pace:"Handheld, casual, quick jump cuts, natural room light.",recs:["S10","S4"],
  note:"The Flow prompt says \"No voiceover\", so the person only gestures and reacts. Edit the Flow prompt by hand if you want them to speak.",
  frames:["Person talking to camera in selfie framing|mcu|eye|handheld","The product in their hand|insert|high|handheld","Quick demo of the product|ms|eye|handheld","Close-up of their reaction|cu|eye|handheld","Cutaway to the 'before' moment|ms|eye|handheld","Back to talking to camera|mcu|eye|handheld","The product in real-life use|ws|eye|handheld","A friend's reaction|two|eye|handheld","Detail close-up of the product|ecu|eye|handheld","Laughing candid moment|mcu|eye|handheld","Recommending gesture toward camera|ms|eye|handheld","Product held up to the camera|cu|eye|pushin"]},
 {id:"F22",g:"Social & modern",name:"Hook-First Social Ad",desc:"Frame 1 is a scroll-stopping surprise, and the product shows up within seconds. Built for Facebook, Instagram and TikTok feeds.",
  pace:"Fast opening, quick cuts, the product shown within the first seconds, energetic end.",recs:["S10","S21","S12"],
  frames:["Scroll-stopping hook: an unexpected action with the product, close to the lens|cu|low|ramp","The product clearly shown|hero|eye|pushin","The problem it solves, in one quick moment|ms|eye|handheld","The product solving it|cu|eye|whip","Reaction|mcu|eye|handheld","Key feature detail|macro|eye|rack","A real person using it outdoors|ws|eye|track","Friends want it too|two|eye|handheld","Quick montage moment|ms|low|whip","Satisfied smile|cu|eye|pushin","Product held toward the lens|cu|eye|static","Hero shot|hero|low|orbit"]},
 {id:"F20",g:"Social & modern",name:"Transition Reel",desc:"A fast Reels/TikTok style ad. Each shot flows into the next through a hand swipe, spin or quick pan.",
  pace:"Fast and rhythmic. Every shot ends with a movement that carries into the next shot.",recs:["S6","S12","S20"],
  frames:["Hook: the product pushed toward the lens|cu|eye|pushin","Whip pan into a new place with the product|ms|eye|whip","A hand covers the lens and reveals a new scene|mcu|eye|handheld","Product tossed up and caught in a new place|ms|low|slowmo","Spin transition into an outdoor scene|ws|eye|orbit","Walk past a pillar into a new scene|ms|eye|track","Close detail match cut|macro|eye|rack","Jump into a night scene|ws|low|ramp","Product passed hand to hand between friends|two|eye|whip","Zoom-through transition to a rooftop|ws|high|pushin","Final pose with the product|mcu|low|static","Hero shot|hero|eye|orbit"]},
 {id:"F18",g:"Social & modern",name:"FOOH / Viral CGI Stunt",desc:"A giant CGI version of the product appears in a real city, like the viral fake billboard ads online.",
  pace:"Real handheld city footage with one jaw-dropping CGI moment. Build to the reveal, then let it breathe.",recs:["S15","S14"],
  note:"The product gets giant but must keep its exact shape, colors and branding.",
  frames:["An ordinary busy city street, people walking|ws|eye|handheld","People start looking up at something|ms|low|handheld","A shadow or movement on a building|ws|low|tilt","A giant version of the product appears on or out of a building|ews|low|crane","The crowd reacts with phones out|ms|eye|handheld","The giant product moves or comes alive|ws|low|slowmo","Close detail of the giant product against the sky|cu|low|orbit","Aerial view of the city with the giant product|ews|aerial|drone","A child points up, amazed|mcu|high|pushin","The giant product settles into place|ws|eye|static","Cut to the real-size product in someone's hand on the street|cu|eye|rack","Hero shot with the giant product in the background|hero|low|pullout"]},
 {id:"F16",g:"Social & modern",name:"⚠ Metaphor / Surreal",desc:"A dreamlike visual idea shows the benefit, for example a room literally expanding or water turning into light.",
  pace:"Dreamlike, fluid transformations.",recs:["S11","S16","S1"],
  note:"⚠ Higher risk that the product changes. Frames 11 and 12 keep the product exactly as the reference.",
  frames:["A normal scene|ws|eye|static","The metaphor trigger|cu|eye|pushin","The transformation begins|ms|eye|slowmo","The transformation spreads|ws|eye|orbit","The world bends around the character|ws|dutch|crane","The character inside the change|ms|low|track","A detail of the metaphor|ecu|eye|rack","The transformation reaches full scale|ews|high|drone","The character interacts with it|ms|eye|gimbal","The peak visual moment|ws|low|slowmo","Back to reality, now changed, with the product exactly as the reference|ws|eye|pullout","Hero shot of the product exactly as the reference|hero|low|orbit"]}
];

const CATS=[["Property","Flats, houses, land, commercial space."],["Electronics","Phones, earphones, laptops, gadgets."],["Home appliance","Fridge, AC, water purifier, fan, oven."],["Fashion","Clothing, shoes, bags, accessories."],["Beauty and skincare","Makeup, skincare, hair care, fragrance."],["Food and beverage","Snacks, drinks, restaurants, groceries."],["Automotive","Cars, bikes, tyres, lubricants."],["Sports and fitness","Gear, gyms, supplements, activewear."],["Jewelry and watches","Gold, diamonds, watches."],["Furniture and decor","Sofas, beds, lighting, interiors."],["Healthcare","Hospitals, clinics, medicine, wellness."],["Banking and finance","Banks, mobile wallets, insurance."],["Education","Schools, universities, coaching, e-learning."],["Travel and hotels","Airlines, resorts, tour packages."],["Telecom","Mobile operators, internet packages."]];
const AUD_BD=[
 ["University students, 18–24","On a budget, follow trends, love sharing with friends."],
 ["Young professionals in Dhaka, 22–35","Busy early careers. Value style, speed and convenience."],
 ["Newlyweds and young couples","Building a first home and life together."],
 ["Families with young children","Care most about safety, space and good value."],
 ["Middle-class families upgrading their lifestyle","Want better quality without overspending."],
 ["High-income buyers and executives","Want premium quality, status and exclusivity."],
 ["Retirees and elders, 60+","Want comfort, trust and something lasting for the family."],
 ["Bangladeshi expatriates (NRB) buying back home","Emotional about home; want a safe investment."],
 ["First-time buyers","Need reassurance that the choice is safe and affordable."],
 ["Parents buying for their children","Buy out of love; want the best for their kids."],
 ["Gamers and tech enthusiasts","Care about performance, specs and cool design."],
 ["Fitness and sports lovers","Want gear that keeps up with an active life."],
 ["Women 25–45 focused on beauty and self-care","Want visible results and a feel-good routine."],
 ["Small business owners","Want tools that save time and grow the business."],
 ["Festival and gift shoppers","Buying for Eid, weddings or special occasions."]
];
const MODELS_BD=[
 ["Bangladeshi man in his late 60s, grey hair and beard, white panjabi","Wise and fatherly. Good for property, legacy and trust."],
 ["Bangladeshi woman in her late 50s, elegant cotton saree, gentle smile","Motherly warmth. Good for home, food and family."],
 ["Bangladeshi man in his early 20s, curly hair, casual streetwear","Youthful energy. Good for gadgets, fashion and telecom."],
 ["Bangladeshi woman in her early 20s, modern casual outfit","Student vibe. Good for beauty, phones and lifestyle."],
 ["Bangladeshi man in his mid 30s, neat beard, smart casual shirt","Young professional. Good for property, cars and banking."],
 ["Bangladeshi woman in her early 30s, professional business attire","Confident career woman. Good for finance, tech and cars."],
 ["Young Bangladeshi couple in their late 20s","Newlyweds. Good for first homes, furniture and travel."],
 ["Bangladeshi family: parents in their 30s with two young children","Warm family life. Good for appliances, food and property."],
 ["Three generations of a Bangladeshi family","Grandparents, parents, child. Good for legacy and festival ads."],
 ["Bangladeshi man in his 40s, tailored suit","Successful executive. Good for premium and status products."],
 ["Bangladeshi woman in her late 20s, glowing skin, minimal makeup","Natural beauty. Good for skincare and cosmetics."],
 ["Fit Bangladeshi athlete in his mid 20s, sportswear","Strong and active. Good for sports, fitness and drinks."],
 ["Group of Bangladeshi friends in their early 20s, men and women","Social fun. Good for food, telecom and gadgets."],
 ["Hands only, no face shown","Keeps all focus on the product. Good for POV and unboxing."],
 ["No people, product only","A pure product film with no people."]
];
const THEMES=[["Emotions of fulfilling dreams","A long wish finally comes true."],["Family togetherness","Closeness and love at home."],["A fresh start","New beginnings: new home, new job, new chapter."],["Freedom and independence","Living life your own way."],["Confidence and success","Feeling proud, capable and ahead."],["Trust and safety","Peace of mind for you and your family."],["Celebration and joy","Happy moments and festivals."],["Innovation made simple","Advanced technology that is easy to use."],["Love and care","Doing something special for someone you love."],["Pride of achievement","Hard work finally paying off."],["Energy and adventure","Getting out, moving and exploring."]];
const DIALS=[
 {k:"time",label:"Time of day",key:"Time of Day",opts:[["","Skip","The model decides."],["Dawn","Dawn","Soft blue-pink first light. Fresh beginnings."],["Morning","Morning","Clean, bright daylight. Energetic and fresh."],["Midday","Midday","Strong overhead sun. Crisp and vivid."],["Golden hour","Golden hour","The hour before sunset. Warm, soft, glowing light."],["Blue hour","Blue hour","Just after sunset. Deep blue sky, warm lights turning on."],["Night","Night","Dark, with lamps, windows and city lights."],["Day into night","Day into night","The story moves from daylight to evening."]]},
 {k:"season",label:"Season / weather",key:"Season / Weather",opts:[["","Skip","The model decides."],["Bright summer","Bright summer","Strong sun, clear sky, lively."],["Monsoon rain","Monsoon rain","Rain, wet reflections, cozy indoor mood."],["Winter fog","Winter fog","Soft haze, shawls, quiet and nostalgic."],["Kalbaishakhi storm","Kalbaishakhi storm","Dramatic pre-monsoon storm clouds and wind."],["Spring","Spring","Fresh greenery and flowers, light breeze."],["Clear evening","Clear evening","Calm, pleasant, clear sky."]]},
 {k:"cast",label:"Cast",key:"Cast",opts:[["","Skip","The model decides."],["The primary model alone","Solo","Only the primary model. A personal story."],["The primary model and a partner","Couple","With a partner. Romance or companionship."],["The primary model with family","Family","With family. Warmth and belonging."],["The primary model with friends","Friends","With friends. Fun and social."],["The primary model with a child in a key role","Child-led","A child drives key moments. Innocence and the future."],["The primary model with elders in a key role","Elder-led","Elders drive key moments. Legacy and respect."]]},
 {k:"emotion",label:"Main emotion",key:"Main Emotion",opts:[["","Skip","The model decides."],["Joy","Joy","Open smiles, laughter, lightness."],["Pride","Pride","Quiet confidence, standing tall, achievement."],["Relief","Relief","Tension released, a deep breath, calm."],["Nostalgia","Nostalgia","Memories, warmth, gentle longing."],["Excitement","Excitement","Energy, surprise, anticipation."],["Calm","Calm","Peaceful, slow, content."],["Humor","Humor","Playful, funny, surprising."],["Love","Love","Tenderness, closeness, care."]]}
];

/* ---------------- ADS: EXTRA DATA ---------------- */
F.push(
 {id:"F23",g:"Fast-cut & sale",name:"Sale / Offer Blast",desc:"A loud, fast ad built around one offer. The product hits hard, the offer lands twice, and the end card tells people what to do.",
  pace:"Very fast, punchy cuts with hard hits on every product moment and the offer.",recs:["S21","S12","S20"],tx:{1:1,9:1},
  note:"Frames 2 and 10 carry the offer text. Change it in the Offer field or in the frame.",
  frames:["Hook: the product slams into frame toward the lens|cu|low|ramp","Big offer moment: the product centered with clear space for the offer|hero|eye|pushin","Quick close detail of the key feature|macro|eye|whip","A person grabs the product excitedly|mcu|eye|handheld","The product in fast, real use|ms|low|track","A second feature in close detail|ecu|eye|rack","Delighted reaction|cu|eye|pushin","Friends reach for it too|two|eye|whip","The product's colors or versions side by side|ws|top|pan","The offer again, with the product in hand|hero|low|static","Product tossed up and caught|ms|low|slowmo","End card: hero product with space for the brand and call to action|hero|eye|pushin"]},
 {id:"F24",g:"Fast-cut & sale",name:"Brand Sizzle / Hype Montage",desc:"A rapid-fire montage of energy, style and product moments. Built to feel exciting, not to explain.",
  pace:"Hyper-fast montage cut to a beat, with speed ramps, whips and slow-motion peaks.",recs:["S7","S12","S20"],
  frames:["Hook: extreme close-up of the product catching the light|ecu|eye|ramp","A person in motion with the product in hand|ms|low|track","The product flips or spins through the air|cu|low|slowmo","A burst of crowd or friends' energy|ws|eye|handheld","Macro detail of the product|macro|eye|whip","City or street action with the product|ws|dutch|track","A big, close smile|cu|eye|pushin","The product in a second, surprising place|ms|eye|whip","A jump or dance at its peak|fs|low|slowmo","Hands pass the product on|insert|eye|whip","Group hero moment with the product|ws|low|orbit","End card: hero product with space for the brand|hero|eye|pushin"]}
);
F.forEach(f=>{if(f.id==="F22"||f.id==="F20")f.g="Fast-cut & sale"});
{const G=["Fast-cut & sale","Story","Product focus","Social & modern"];F.sort((a,b)=>G.indexOf(a.g)-G.indexOf(b.g))}
{const t=F.find(f=>f.id==="F6");if(t)t.note="Add SAYS lines to the frames where the person talks to the camera."}
const FPACE={F1:"cine",F2:"punchy",F3:"punchy",F4:"cine",F5:"cine",F6:"punchy",F7:"punchy",F8:"punchy",F9:"cine",F10:"punchy",F11:"cine",F12:"cine",F13:"cine",F14:"punchy",F15:"punchy",F16:"cine",F17:"punchy",F18:"punchy",F19:"cine",F20:"hyper",F21:"punchy",F22:"hyper",F23:"hyper",F24:"hyper"};

const AUD_US=[
 ["Gen Z students, 18–24","Trend-driven, phone-first, love sharing with friends."],
 ["Young professionals, 25–34","Busy careers. Value style, speed and convenience."],
 ["Busy parents","Short on time. Care about safety, value and ease."],
 ["New homeowners and young couples","Building a first home and a life together."],
 ["Affluent buyers, 35–55","Want premium quality, status and exclusivity."],
 ["Active seniors, 60+","Want comfort, trust and simplicity."],
 ["Fitness enthusiasts","Want gear that keeps up with an active life."],
 ["Gamers and tech lovers","Care about performance, specs and cool design."],
 ["Beauty and self-care lovers, 20–45","Want visible results and a feel-good routine."],
 ["Small business owners","Want tools that save time and grow the business."],
 ["Deal hunters","Respond to offers, bundles and limited-time sales."],
 ["Gift shoppers","Buying for holidays, birthdays and special days."]
];
const MODELS_US=[
 ["American woman in her mid 20s, natural makeup, casual streetwear","Relatable and trendy. Good for beauty, fashion and tech."],
 ["American man in his late 20s, short beard, casual jacket","Young and confident. Good for tech, drinks and cars."],
 ["Black American woman in her early 30s, smart casual, confident","Stylish and self-assured. Good for finance, beauty and fashion."],
 ["Latino man in his mid 30s, athletic build, sportswear","Strong and active. Good for fitness and sports."],
 ["Asian-American woman in her late 20s, minimal modern outfit","Clean, modern look. Good for skincare and tech."],
 ["Young American couple in their late 20s","Good for homes, travel and furniture."],
 ["American family: parents in their 30s with two young children","Warm family life. Good for food, appliances and cars."],
 ["Silver-haired American man in his 60s, warm smile","Trust and experience. Good for finance and health."],
 ["Diverse group of friends in their early 20s","Social fun. Good for drinks, telecom and events."],
 ["Hands only, no face shown","Keeps all focus on the product. Good for POV and unboxing."],
 ["No people, product only","A pure product film with no people."]
];

/* Good format + style + pace combinations by category (from the prompt system, extended for fast-cut ads) */
const COMBOS={
 "property":[["F11","S8"],["F9","S2"],["F1","S1"],["F3","S3"],["F10","S9"]],
 "electronics":[["F22","S21"],["F23","S12"],["F2","S3"],["F5","S14"],["F21","S14"]],
 "home appliance":[["F2","S3"],["F3","S3"],["F21","S14"],["F23","S21"],["F4","S6"]],
 "fashion":[["F24","S12"],["F12","S12"],["F20","S21"],["F4","S6"],["F15","S6"]],
 "beauty and skincare":[["F5","S11"],["F19","S1"],["F3","S3"],["F17","S3"],["F20","S20"]],
 "food and beverage":[["F23","S21"],["F5","S16"],["F10","S9"],["F15","S4"],["F19","S1"]],
 "automotive":[["F13","S5"],["F12","S19"],["F24","S7"],["F7","S5"],["F14","S7"]],
 "sports and fitness":[["F24","S7"],["F7","S7"],["F3","S4"],["F15","S7"],["F22","S7"]],
 "jewelry and watches":[["F5","S1"],["F12","S1"],["F13","S5"],["F10","S9"]],
 "furniture and decor":[["F11","S8"],["F3","S3"],["F4","S6"],["F23","S21"]],
 "healthcare":[["F2","S3"],["F1","S2"],["F9","S2"],["F21","S3"]],
 "banking and finance":[["F2","S3"],["F1","S1"],["F15","S4"],["F22","S21"]],
 "education":[["F1","S6"],["F2","S3"],["F15","S4"],["F22","S10"]],
 "travel and hotels":[["F11","S6"],["F14","S6"],["F24","S19"],["F18","S15"],["F4","S6"]],
 "telecom":[["F24","S12"],["F22","S10"],["F23","S21"],["F18","S15"],["F8","S3"]]
};
const COMBOS_ANY=[["F22","S21"],["F23","S12"],["F24","S7"],["F5","S1"],["F2","S3"]];

const LENS=[[6,"Bumper. One idea, one hit."],[15,"Stories and Reels. The most common social ad."],[30,"Classic spot. Room for a short story."],[45,"A longer story or several features."],[60,"A full commercial: story, features and offer."]];
const PACES={
 cine:{l:"Cinematic",d:"2–4s shots. Smooth and premium, with room to breathe.",avg:3,pad:1.25},
 punchy:{l:"Punchy",d:"1–2s shots. Quick cuts that stay easy to follow. Most social ads.",avg:1.5,pad:1.25},
 hyper:{l:"Hyper",d:"Cuts under 1s. Flashy and high-energy. CapCut chops each clip into micro-shots.",avg:.6,pad:1.5}
};
const SUGGEST={cine:{6:6,15:6,30:12,45:12,60:18},punchy:{6:6,15:12,30:12,45:18,60:18},hyper:{6:6,15:12,30:18,45:18,60:24}};
const FLOWLEN=[4,6,8];

const TRANS=[
 {v:"cut",l:"Hard cut",d:"A straight cut. Clean and fast.",at:"edit",cc:"Straight cut, no transition.",sfx:""},
 {v:"whip",l:"Whip pan",d:"The camera whips sideways with motion blur into the next shot. Shot in Flow.",at:"flow",flow:"ends with a fast whip pan to the right, full motion blur",next:"starts out of a fast whip-pan blur",cc:"Cut in the middle of the blur, where both clips are blurred.",sfx:"Whoosh"},
 {v:"match",l:"Match cut",d:"A shape or movement carries on into the next shot. Shot in Flow.",at:"flow",flow:"ends on a strong shape or movement that the next frame repeats",next:"starts on the same shape or movement as the frame before",cc:"Cut exactly when the shapes or movements line up.",sfx:""},
 {v:"wipe",l:"Hand / object wipe",d:"A hand or object passes over the lens and reveals the next shot. Shot in Flow.",at:"flow",flow:"ends with a hand or object passing across the lens until it covers the frame",next:"starts as a hand or object moves off the lens",cc:"Cut at the moment the frame is fully covered.",sfx:"Swoosh"},
 {v:"spin",l:"Spin",d:"The camera rolls fast into the next shot. Shot in Flow.",at:"flow",flow:"ends with a fast camera roll and motion blur",next:"starts out of a fast camera roll",cc:"Cut in the blur. Optional: Transitions → a spin preset on top.",sfx:"Whoosh"},
 {v:"flash",l:"White flash",d:"2–3 frames of white on the cut. Punchy. Added in CapCut.",at:"edit",cc:"Transitions → a white flash preset, about 0.2s.",sfx:"Camera flash"},
 {v:"zoom",l:"Zoom punch",d:"A quick zoom into the next shot. Added in CapCut.",at:"edit",cc:"Transitions → a zoom-in preset, 0.2–0.3s (or keyframe the scale 100% → 120%).",sfx:"Bass hit"},
 {v:"ramp",l:"Speed ramp",d:"Fast motion that snaps into slow motion. Done in CapCut.",at:"edit",cc:"Select the next piece → Speed → Curve, fast then slow (a ready curve like Montage or Bullet works).",sfx:"Riser into hit"},
 {v:"glitch",l:"Glitch",d:"A digital glitch on the cut. Techy. Added in CapCut.",at:"edit",cc:"Transitions → a glitch preset, 0.2–0.3s.",sfx:"Glitch zap"},
 {v:"leak",l:"Light leak",d:"A warm light burn across the cut. Added in CapCut.",at:"edit",cc:"Transitions → a light leak or burn preset, 0.4s.",sfx:"Shimmer"},
 {v:"dissolve",l:"Dissolve",d:"A soft blend. For calm, premium moments. Added in CapCut.",at:"edit",cc:"Transitions → Dissolve (or Mix), 0.4–0.6s.",sfx:""},
 {v:"dip",l:"Dip to black",d:"A quick fade through black. A pause or a time jump. Added in CapCut.",at:"edit",cc:"Transitions → a fade-through-black preset, 0.4s.",sfx:""}
];
const EDITSFX=[
 ["auto","Match the transition","Uses the usual sound for the chosen cut: whoosh for a whip, bass hit for a zoom punch, and so on."],
 ["none","None","No edit sound at this cut."],
 ["Whoosh","Whoosh","Fast air movement. For whips, spins and fast moves."],
 ["Swoosh","Swoosh","A softer, shorter whoosh. For wipes and slides."],
 ["Bass hit","Bass hit","A deep boom. Makes a cut or reveal feel heavy."],
 ["Riser into hit","Riser into hit","Rising tension that ends in a hit. Put the hit on the reveal."],
 ["Impact","Impact / slam","A hard hit. For slams, stamps and product drops."],
 ["Camera flash","Camera flash","A shutter click with a pop. For white flashes."],
 ["Glitch zap","Glitch zap","A digital crackle. For glitch cuts and tech products."],
 ["Pop","Pop","A light, bubbly pop. For text pop-ins and playful moments."],
 ["Click","Click","A crisp click. For buttons, caps and switches."],
 ["Shimmer","Shimmer / sparkle","A bright twinkle. For shine, beauty and jewelry."],
 ["Record scratch","Record scratch","A comic stop. For comedy beats."],
 ["Ka-ching","Ka-ching","A cash register. For prices and offers."],
 ["Heartbeat","Heartbeat","A low thump. For suspense before a reveal."]
];
const SOUNDS=[["Natural sounds of the action","Flow adds whatever the action would sound like."],["Footsteps","Walking or running."],["A crisp click","A button, cap or switch."],["Fizz and pour","A drink being poured."],["Sizzle","Food cooking."],["Splash","Water or liquid."],["Fabric rustle","Clothes moving."],["Engine rev","A car or bike."],["City street ambience","Traffic and people."],["Crowd cheering","A big, happy crowd."],["Rain","Rain falling."],["Crunch","A bite or a crisp snap."],["Box opening","Cardboard and tissue paper."],["Laughter","People laughing together."],["Silence, then one sharp sound","Builds suspense."]];

const TMETHOD=[
 ["auto","Auto","Short English text (up to 4 words) goes to Flow. Longer text, end cards and Bangla become an image card."],
 ["flow","Level 1 · Flow draws it","Written into the storyboard and the Flow prompt. Cheapest. Check the spelling in every clip."],
 ["image","Level 2 · Image, then animate","ChatGPT makes the frame with the text; Flow animates only what's around the letters; CapCut adds the entrance."],
 ["capcut","Level 3 · Add in CapCut","The clip stays clean. You add the text in CapCut at the time on the cut sheet."]
];
const TANIM=[
 {v:"pop",l:"Pop in",d:"Scales up with a quick bounce, then holds.",sh:"pops in",fl:"pops in with a quick scale bounce, then holds still",cc:"Text → Animation → In → a pop or bounce preset, 0.3s",amb:"a soft light sweep passes across the scene once",cin:"Animation → In → Zoom in, 0.3s",sfx:"Pop"},
 {v:"slam",l:"Slam in",d:"Crashes in from huge to normal size with a small shake. Great for offers.",sh:"slams in",fl:"slams in from very large to normal size, and the camera shakes slightly on impact",cc:"Text → Animation → In → a zoom-out preset (big to normal), 0.2s; add Effects → Shake for 0.2s at the hit",amb:"a quick flash of light and a small camera shake at the very start, then stillness",cin:"Animation → In → Zoom out (big to normal), 0.2s, plus Effects → Shake for 0.2s",sfx:"Impact"},
 {v:"slide",l:"Slide up",d:"Rises from below into place. Clean and calm.",sh:"slides up",fl:"slides up smoothly from below into place, then holds",cc:"Text → Animation → In → a slide-up or rise preset, 0.4s",amb:"a very slow push-in, with gentle movement in the background",cin:"Animation → In → Slide up, 0.4s",sfx:"Swoosh"},
 {v:"type",l:"Typewriter",d:"Types on letter by letter.",sh:"types on",fl:"types on letter by letter, then holds",cc:"Text → Animation → In → Typewriter, about 0.08s per letter",amb:"a very slow push-in",cin:"Animation → In → Fade in, 0.3s (real typing only works with CapCut text, level 3)",sfx:"Click"},
 {v:"words",l:"Word by word",d:"One word at a time, on the beat.",sh:"word by word",fl:"appears one word at a time, each word popping in quickly",cc:"Make one text layer per word; start each 0.2–0.3s after the last, each with In → Pop",amb:"the light pulses gently in time",cin:"Animation → In → Zoom in, 0.3s (real word-by-word only works with CapCut text, level 3)",sfx:"Pop"},
 {v:"shine",l:"Shine sweep",d:"Holds still while a glossy light sweeps across. Premium.",sh:"shine sweep",fl:"holds still while a glossy light sweep passes across the letters",cc:"Text → Animation → Loop → a shine or sweep preset",amb:"a glossy light sweep passes across the whole frame, over the letters, without changing them",cin:"Animation → In → Fade in, 0.2s",sfx:"Shimmer"},
 {v:"count",l:"Number roll",d:"Rolls up like a counter and stops on the final number. For prices and %.",sh:"number roll",fl:"rolls up like a fast counter and stops on the final value",cc:"Make 3–4 text layers counting up (for example 10% → 30% → 50%), 0.1s each; the last one holds, with In → Pop",amb:"the light pulses once at the start, then stays",cin:"Animation → In → Zoom in, 0.2s (a real number roll only works with CapCut text, level 3)",sfx:"Ka-ching"},
 {v:"stamp",l:"Stamp",d:"Stamps down at a slight tilt, like a rubber stamp.",sh:"stamps down",fl:"stamps down onto the frame at a slight tilt, like a rubber stamp",cc:"Rotate the text about −8°, then Animation → In → a zoom-out preset, 0.15s",amb:"a tiny camera shake at the very start, then stillness",cin:"Animation → In → Zoom out, 0.15s, plus a short Shake",sfx:"Impact"},
 {v:"neon",l:"Neon flicker",d:"Flickers on like a neon sign, then glows.",sh:"neon flicker",fl:"flickers on like a neon sign, then glows steadily",cc:"Text → Animation → In → a flicker or blink preset, 0.5s; turn on Glow in the text style",amb:"the glow around the letters pulses softly; the letters themselves never change",cin:"Animation → In → a flicker or blink preset, 0.4s",sfx:"Glitch zap"},
 {v:"hold",l:"No animation",d:"Appears on the cut and holds still.",sh:"holds",fl:"appears on the cut and holds still",cc:"No animation; start the text exactly on the cut",amb:"almost still, with very subtle movement in the background",cin:"No animation; cut straight to it",sfx:""}
];
const TPOS=[["center","Center","In the middle of the frame."],["top","Top third","High in the frame, clear of the face or product."],["lower","Lower third","Low in the frame, above the app buttons."],["product","Next to the product","Beside the product, pointing attention to it."],["full","Full-screen end card","Big, filling the frame. For the last frame."]];
const POSP={center:"in the center of the frame",top:"in the top third of the frame",lower:"in the lower third of the frame, above the bottom safe area",product:"right next to the product",full:"large, as a full-screen end card"};
const TSTYLE=[["Bold white sans-serif letters with a soft shadow","Bold white","Clean and readable on any shot. The safe default."],["Bold white letters on a solid brand-color block","Brand color block","A colored box behind the words. Loud and clear, great for offers."],["Heavy outlined letters","Outlined","Thick letters with an outline. Streetwear and youth energy."],["Thin, elegant serif letters, widely spaced","Luxury serif","Quiet and premium. For jewelry, beauty and property."],["Hand-written marker letters","Hand-written","Personal and playful."],["Glowing neon tube letters","Neon","Night and party energy."]];
const ISSUES=[
 ["product","The product changed","Shape, color, logo or label looks different.","Keep the product exactly as in the product reference images: same shape, colors, logo and label text."],
 ["blend","Frames blended into one shot","The clip drifts from one frame to the next instead of cutting.","Cut hard between the frames at the times given. Each frame is its own shot with its own framing; never blend them."],
 ["length","Wrong length","The clip is longer or shorter than asked.","Make the clip exactly the length given."],
 ["text","Text is misspelled or warped","Letters are wrong, wobbly or melting.","Spell the on-screen text exactly as written, letter for letter, and keep the letters sharp and still. If that is not possible, remove the text completely; it will be added in editing."],
 ["extra","Unwanted text or subtitles","Captions, subtitles or random words appeared.","Remove all subtitles, captions and any text that is not in the prompt."],
 ["music","Music or narration was added","Background music or a narrator voice.","Remove all music and narration. Keep only the sound effects and the SAYS lines."],
 ["face","The person changed","Face, hair or outfit is different.","Keep the same person, face, hair and outfit as in the storyboard and the character reference."],
 ["camera","Wrong shot or camera move","Framing or movement doesn't match the storyboard.","Follow the SHOT / ANGLE and CAMERA notes for these frames exactly."],
 ["slow","Too slow or flat","Not enough energy for the pace.","Make the motion faster and more energetic, with strong camera movement in every second."],
 ["speech","Wrong words or pronunciation","The person says something else or says it wrong.","The person says only the SAYS lines, word for word, with lip movement matching the words."]
];
const LANGS={
 banglish:{l:"Banglish",d:"Bangla mixed with English words. Recommended.",speech:"in casual Banglish (everyday Bangla mixed with common English words); Bangla words are written in Bangla script and pronounced the Bangla way",rule:"Every Bangla word is written in Bangla script and every English word in English letters. Keep this exact spelling.",wps:2.4},
 bangla:{l:"Bangla",d:"All Bangla. Test lip-sync on one clip first.",speech:"in natural spoken Bangla",rule:"Every word is in Bangla script; only brand and product names stay in English letters. Keep this exact spelling.",wps:2.2},
 english:{l:"English",d:"Natural Bangladeshi phrasing.",speech:"in English with natural Bangladeshi phrasing",rule:"",wps:2.6}
};
const CHOICES={
 market:[["US","United States","American cast, places and English."],["BD","Bangladesh","Bangladeshi cast and places. Banglish, Bangla or English."]],
 lang:Object.entries(LANGS).map(([k,v])=>[k,v.l,v.d]),
 vo:[["no","No voiceover","Only on-camera lines and sound effects."],["yes","Voiceover, added later","Adds a VO line to each frame and a timed script to record."]],
 aspect:[["9:16","9:16 vertical","Reels, TikTok, Shorts and Stories."],["16:9","16:9 landscape","YouTube, TV and feed video."]],
 len:LENS.map(([n,d])=>[String(n),n+"s",d]),
 pace:Object.entries(PACES).map(([k,v])=>[k,v.l,v.d]),
 nf:[["auto","Auto",""],["6","6",""],["12","12",""],["18","18",""],["24","24",""]],
 endCard:[["yes","Last frame is the end card","Shows the brand name and call to action, unless you type other text there."],["no","No end card","Leave it out, or type your own text in the last frame."]]
};

/* ---------------- STATE ---------------- */
const KEY="ufw-ads-v1";
const TEXT_KEYS=["name","flow","cat","usp","aud","model","setting","theme","brand","cta","offer","accent","extra","fixExtra"];
function fresh(){const s={market:"BD",lang:"banglish",vo:"no",aspect:"9:16",len:"30",pace:"punchy",nf:"auto",format:"F22",style:"S21",time:"",season:"",cast:"",emotion:"",tstyle:TSTYLE[0][0],endCard:"yes",fixClip:"1",fixIssue:"product",frames:[],dirty:false,chk:{}};TEXT_KEYS.forEach(k=>s[k]="");return s}
let S=fresh();

const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=()=>F.find(f=>f.id===S.format)||F[0];
const sty=()=>STYLES.find(s=>s.id===S.style)||STYLES[0];
const tri=a=>a.map(([v,l,d])=>({v,l,d}));
const pair=a=>a.map(([l,d])=>({v:l,l,d}));
const lbl=(list,v)=>(list.find(x=>x[0]===v)||[,""])[1];
const trOf=v=>TRANS.find(t=>t.v===v)||TRANS[0];
const anOf=v=>TANIM.find(t=>t.v===v)||TANIM[0];
const r1=x=>Math.round(x*10)/10;
const sec=x=>`${+(+x||0).toFixed(1)}s`;
const t1=x=>String(+x.toFixed(1));
const tc=t=>{t=Math.max(0,r1(t));const m=Math.floor(t/60);return `${m}:${(t-m*60).toFixed(1).padStart(4,"0")}`};
const pad2=n=>String(n).padStart(2,"0");
const bangla=t=>/[ঀ-৿]/.test(t);
const words=t=>t.split(/\s+/).filter(w=>w&&!/^[·|•\-–—&+]$/.test(w)).length;
const langEff=()=>S.market==="US"?"english":S.lang;
const nfEff=()=>S.nf==="auto"?SUGGEST[S.pace][S.len]:+S.nf;
const clean=n=>n.replace("⚠ ","");
const CHEV='<svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6l4 4 4-4"/></svg>';

/* ---------------- PICKERS ---------------- */
const P={};
function reg(id,c){P[id]=c}
function textReg(k,list){reg(k,{combo:true,options:()=>pair(typeof list==="function"?list():list),get:()=>S[k],set:v=>{S[k]=v;$("f-"+k).value=v}})}
textReg("cat",CATS);textReg("aud",()=>S.market==="US"?AUD_US:AUD_BD);textReg("model",()=>S.market==="US"?MODELS_US:MODELS_BD);textReg("theme",THEMES);
reg("format",{search:true,options:()=>F.map(f=>({v:f.id,l:clean(f.name),d:f.desc,g:f.g,b:PACES[FPACE[f.id]||"punchy"].l})),get:()=>S.format,set:v=>{if(v!==S.format){S.format=v;reshape(true)}}});
reg("style",{search:true,options:()=>{const r=fmt().recs;return STYLES.map(s=>({v:s.id,l:s.name,d:s.desc,g:s.g,b:r.includes(s.id)?"★ Good fit":""}))},get:()=>S.style,set:v=>S.style=v});
DIALS.forEach(d=>reg(d.k,{options:()=>tri(d.opts),get:()=>S[d.k],set:v=>S[d.k]=v}));
reg("tstyle",{options:()=>TSTYLE.map(([v,l,d])=>({v,l,d})),get:()=>S.tstyle,set:v=>S.tstyle=v});
reg("fixIssue",{options:()=>ISSUES.map(([v,l,d])=>({v,l,d})),get:()=>S.fixIssue,set:v=>S.fixIssue=v});
reg("fixClip",{options:()=>plan().clips.map(c=>({v:String(c.n),l:`Clip ${c.n} · ${c.len}s`,d:`${frLabel(c.fr)}${c.kind==="card"?" · text card":""}`})),get:()=>S.fixClip,set:v=>S.fixClip=v});
const FR=(i,p)=>(S.frames[i]||{})[p];
const setF=(i,p,v)=>{if(S.frames[i]){S.frames[i][p]=v;S.dirty=true}};
for(let i=0;i<24;i++){
  reg("sh"+i,{search:true,options:()=>tri(SHOTS),get:()=>FR(i,"sh"),set:v=>setF(i,"sh",v)});
  reg("an"+i,{options:()=>tri(ANGLES),get:()=>FR(i,"an"),set:v=>setF(i,"an",v)});
  reg("mv"+i,{search:true,options:()=>tri(MOVES),get:()=>FR(i,"mv"),set:v=>setF(i,"mv",v)});
  reg("tr"+i,{search:true,options:()=>TRANS.map(t=>({v:t.v,l:t.l,d:t.d,b:t.at==="flow"?"in Flow":"in CapCut"})),get:()=>FR(i,"tr"),set:v=>setF(i,"tr",v)});
  reg("ex"+i,{search:true,options:()=>tri(EDITSFX),get:()=>FR(i,"ex"),set:v=>setF(i,"ex",v)});
  reg("fx"+i,{combo:true,options:()=>pair(SOUNDS),get:()=>FR(i,"fx"),set:v=>{setF(i,"fx",v);const el=$(`ff${i}-fx`);if(el)el.value=v}});
  reg("tm"+i,{options:()=>tri(TMETHOD),get:()=>FR(i,"tm"),set:v=>setF(i,"tm",v)});
  reg("ta"+i,{options:()=>TANIM.map(t=>({v:t.v,l:t.l,d:t.d})),get:()=>FR(i,"ta"),set:v=>setF(i,"ta",v)});
  reg("tp"+i,{options:()=>tri(TPOS),get:()=>FR(i,"tp"),set:v=>setF(i,"tp",v)});
}

function refresh(id){
  const c=P[id],val=c.get(),o=c.options().find(x=>x.v===val);
  const trg=document.querySelector(`[data-pk="${id}"]`),d=document.querySelector(`[data-pkd="${id}"]`);
  if(trg){
    if(c.combo)trg.innerHTML=CHEV;
    else trg.innerHTML=`<span class="pk-l">${esc(o?o.l:"Choose…")}</span>${CHEV}`;
    trg.setAttribute("aria-haspopup","listbox");if(!trg.hasAttribute("aria-expanded"))trg.setAttribute("aria-expanded","false");
    trg.title=o?o.d:"";
  }
  if(d){
    if(c.combo)d.textContent=o?o.d:(val?"Your own text.":"");
    else d.textContent=o?o.d:"";
    if(id==="format"&&o){const f=fmt();d.innerHTML=`${esc(f.desc)}<br><b style="color:var(--text)">Pacing:</b> ${esc(f.pace)} <b style="color:var(--text)">Suggested pace:</b> ${PACES[FPACE[f.id]||"punchy"].l}.`}
  }
  if(id==="format")$("fmtNote").textContent=fmt().note||"";
}
function refreshAll(){Object.keys(P).forEach(id=>{if(document.querySelector(`[data-pk="${id}"]`))refresh(id)})}

/* popover */
const pop=$("pop"),popq=$("popq"),popl=$("popl");
let cur=null,items=[],active=-1;
function openPk(id,anchor){
  if(cur&&cur.id===id){closePk();return}
  closePk();
  cur={id,anchor};anchor.setAttribute("aria-expanded","true");
  const n=P[id].options().length;
  popq.hidden=!(P[id].search||n>8);popq.value="";
  renderPop();pop.classList.add("open");placePop();
  (popq.hidden?popl:popq).focus({preventScroll:true});
  const s=popl.querySelector("li.active");if(s)s.scrollIntoView({block:"nearest"});
}
function closePk(refocus){
  if(!cur)return;
  cur.anchor.setAttribute("aria-expanded","false");
  pop.classList.remove("open");
  if(refocus&&document.body.contains(cur.anchor))cur.anchor.focus({preventScroll:true});
  cur=null;
}
function renderPop(){
  const c=P[cur.id],q=popq.value.trim().toLowerCase(),val=c.get();
  items=c.options().filter(o=>!q||(o.l+" "+o.d).toLowerCase().includes(q));
  active=Math.max(0,items.findIndex(o=>o.v===val));
  let h="",g=null;
  items.forEach((o,i)=>{
    if(o.g&&o.g!==g){g=o.g;h+=`<li class="grp" role="presentation">${esc(g)}</li>`}
    h+=`<li class="opt${o.v===val?" sel":""}${i===active?" active":""}" role="option" data-i="${i}" aria-selected="${o.v===val}"><span class="o-l">${esc(o.l)}</span><span class="o-b">${esc(o.b||"")}</span><span class="o-d">${esc(o.d)}</span></li>`;
  });
  popl.innerHTML=h||`<li class="empty">No match. ${c.combo?"Type your own text in the box instead.":""}</li>`;
}
function setActive(i,scroll){
  const lis=popl.querySelectorAll("li.opt");if(!lis.length)return;
  active=(i+lis.length)%lis.length;
  lis.forEach(l=>l.classList.toggle("active",+l.dataset.i===active));
  if(scroll)lis[active].scrollIntoView({block:"nearest"});
}
function choose(i){
  const c=P[cur.id],o=items[i];if(!o)return;const id=cur.id;
  closePk(true);c.set(o.v);if(P[id])refresh(id);build();
}
function placePop(){
  if(!cur)return;
  const r=cur.anchor.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;
  const box=P[cur.id].combo?cur.anchor.parentElement.getBoundingClientRect():r;
  const w=Math.min(Math.max(box.width,320),vw-16);
  const left=Math.min(Math.max(8,box.left),vw-w-8);
  const below=vh-r.bottom-12,above=r.top-12,maxH=380;
  pop.style.width=w+"px";pop.style.left=left+"px";
  if(below>=Math.min(maxH,240)||below>=above){pop.style.maxHeight=Math.min(maxH,below)+"px";pop.style.top=(r.bottom+6)+"px"}
  else{pop.style.maxHeight=Math.min(maxH,above)+"px";pop.style.top=Math.max(8,r.top-6-pop.offsetHeight)+"px"}
}
document.addEventListener("keydown",e=>{
  const t=e.target.closest&&e.target.closest("[data-pk]");
  if(t&&(e.key==="ArrowDown"||e.key==="ArrowUp")&&!cur){e.preventDefault();openPk(t.dataset.pk,t)}
});
popl.addEventListener("mousemove",e=>{const li=e.target.closest("li.opt");if(li&&+li.dataset.i!==active)setActive(+li.dataset.i)});
pop.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"){e.preventDefault();setActive(active+1,true)}
  else if(e.key==="ArrowUp"){e.preventDefault();setActive(active-1,true)}
  else if(e.key==="Enter"){e.preventDefault();choose(active)}
  else if(e.key==="Escape"){e.preventDefault();closePk(true)}
  else if(e.key==="Tab"){closePk(true)}
});
popl.tabIndex=-1;
popq.addEventListener("input",()=>{renderPop();placePop()});
document.addEventListener("mousedown",e=>{if(cur&&!pop.contains(e.target)&&!cur.anchor.contains(e.target))closePk()});
addEventListener("resize",placePop);
addEventListener("scroll",e=>{if(cur&&!pop.contains(e.target))placePop()},true);

/* ---------------- FRAMES ---------------- */
function parseBeat(l){const [b,sh,an,mv]=l.split("|");return {b,sh,an,mv}}
function punch(f){
  const tight=f.sh==="ecu"||f.sh==="macro";
  return {b:`Punch-in: a tighter, faster detail of the same moment (${f.b.charAt(0).toLowerCase()+f.b.slice(1)})`,sh:tight?"insert":"ecu",an:f.an,mv:S.pace==="cine"?"rack":"whip",src:null};
}
function resample(base,n){
  const m=base.length;
  if(n===m)return base.map((f,k)=>({...f,src:k}));
  if(n<m){const out=[];for(let k=0;k<n;k++){const j=Math.round(k*(m-1)/(n-1));out.push({...base[j],src:j})}return out}
  const out=[];let extra=n-m;
  if(extra>m-1){out.push({b:"Cold open: a split-second extreme close-up of the product catching the light",sh:"ecu",an:"eye",mv:"ramp",src:null});extra--}
  const gaps=new Set();for(let k=0;k<extra;k++)gaps.add(Math.round(k*(m-2)/Math.max(1,extra-1)));
  base.forEach((f,k)=>{out.push({...f,src:k});if(gaps.has(k))out.push(punch(f))});
  return out.slice(0,n);
}
function defTr(i,n){
  if(i>=n-1)return "cut";
  if(S.pace==="cine")return i%4===3?"dissolve":i%4===1?"match":"cut";
  if(i===n-2)return "flash";
  if(S.pace==="punchy")return i%3===2?"whip":"cut";
  return ["zoom","cut","whip","flash","cut","glitch"][i%6];
}
function fillFrames(){
  const f=fmt(),base=f.frames.map(parseBeat),n=nfEff();
  S.frames=resample(base,n).map((x,i)=>{
    const o={b:x.b,sh:x.sh,an:x.an,mv:x.mv,src:x.src,d:0,tr:defTr(i,n),ex:"auto",fx:"",say:"",vo:"",tx:"",tm:"auto",ta:"pop",tp:"center"};
    if(f.tx&&x.src!=null&&f.tx[x.src]){o.tx=S.offer.trim()||"50% OFF";o.ta="slam"}
    return o;
  });
  const last=S.frames[n-1];if(last){last.ta="pop";last.tp="full"}
  S.dirty=false;fitDur(false);
}
function fitDur(keep){
  const fr=S.frames,n=fr.length,L=+S.len;if(!n)return;
  let w=fr.map((f,i)=>{
    if(keep&&f.d>0)return f.d;
    let x=1;if(i===0)x=.8;if(f.src==null)x=.6;if(f.sh==="hero")x=1.2;if(i===n-1)x=S.endCard==="yes"?1.6:1.2;return x;
  });
  const W=w.reduce((a,b)=>a+b,0),mn=Math.min(.4,L/n);
  fr.forEach((f,i)=>f.d=Math.max(mn,r1(L*w[i]/W)));
  let diff=r1(L-fr.reduce((a,f)=>a+f.d,0));
  for(let guard=0;Math.abs(diff)>=.05&&guard<400;guard++){
    const i=diff>0?fr.length-1:fr.reduce((bi,f,k)=>f.d>fr[bi].d?k:bi,0);
    const step=diff>0?.1:-.1;if(fr[i].d+step<mn)break;fr[i].d=r1(fr[i].d+step);diff=r1(diff-step);
  }
}
/* Called when length, pace, frame count or format change. */
function reshape(fromFormat){
  const n=nfEff();
  if(!S.dirty||fromFormat&&confirm("Replace your edited frames with this format's default frames?")){fillFrames();renderFrames();return}
  if(fromFormat)return;
  if(n!==S.frames.length){
    if(confirm(`Rebuild the shot list with ${n} frames? Your edits to the frames will be replaced.`)){fillFrames();renderFrames()}
    else S.nf=String(S.frames.length);
  }else fitDur(true);
  syncFrames();
}

function txt(i){const f=S.frames[i];if(!f)return "";const t=(f.tx||"").trim();if(t)return t;return i===S.frames.length-1&&S.endCard==="yes"?endText():""}
function endText(){return [S.brand.trim(),S.cta.trim()].filter(Boolean).join(" · ")}
function tEff(i){
  const t=txt(i);if(!t)return "";const f=S.frames[i],m=f.tm;
  if(bangla(t))return m==="capcut"?"capcut":"image";
  if(m!=="auto")return m;
  return words(t)<=4&&f.tp!=="full"?"flow":"image";
}
const LVL={flow:"Level 1",image:"Level 2",capcut:"Level 3"};

/* ---------------- CLIP PLAN ---------------- */
function fitLen(x){return FLOWLEN.find(l=>l>=x-1e-6)||FLOWLEN[FLOWLEN.length-1]}
function plan(){
  const p=PACES[S.pace],N=S.frames.length,boards=[],clips=[],byFrame=[];let n=0;
  for(let b=0;b*6<N;b++){
    const idx=[];for(let k=b*6;k<Math.min(N,b*6+6);k++)idx.push(k);
    const groups=[];let g=null;
    idx.forEach(i=>{
      if(tEff(i)==="image"){groups.push({kind:"card",fr:[i],sum:S.frames[i].d});g=null;return}
      const d=S.frames[i].d;
      if(S.pace==="punchy"&&g&&g.fr.length<3&&(g.sum+d)*p.pad<=8)g.fr.push(i),g.sum+=d;
      else{g={kind:"flow",fr:[i],sum:d};groups.push(g)}
    });
    const bc=[];
    groups.forEach(g=>{
      const need=g.sum*p.pad,len=fitLen(Math.max(4,need)),c={n:++n,kind:g.kind,board:b,fr:g.fr,sum:g.sum,len,over:need>8+1e-6,segs:[]};
      let t=0;const k=len/Math.max(.1,g.sum);
      g.fr.forEach(i=>{const s={i,from:r1(t),to:r1(t+S.frames[i].d*k)};t+=S.frames[i].d*k;c.segs.push(s);byFrame[i]={c,s}});
      c.segs[c.segs.length-1].to=len;
      clips.push(c);bc.push(c);
    });
    boards.push({k:b+1,fr:idx,clips:bc});
  }
  return {boards,clips,byFrame};
}
function frLabel(fr){return fr.length>1?`Frames ${fr[0]+1}–${fr[fr.length-1]+1}`:`Frame ${fr[0]+1}`}
function takes(c,s,i){
  const d=S.frames[i].d,segLen=s.to-s.from;
  if(S.pace==="hyper"&&c.kind==="flow"){
    const k=Math.max(1,Math.round(d/PACES.hyper.avg)),piece=d/k,a=s.from+.2,room=Math.max(0,segLen-.4-piece),out=[];
    for(let j=0;j<k;j++){const st=r1(a+(k===1?room/2:room*j/(k-1)));out.push([st,Math.min(s.to,r1(st+piece))])}
    return out;
  }
  const st=s.from+Math.max(0,(segLen-d)/2);return [[st,Math.min(s.to,st+d)]];
}

/* ---------------- UI BUILD ---------------- */
function renderChoices(){
  document.querySelectorAll("[data-choice]").forEach(el=>{
    const k=el.dataset.choice;let opts=CHOICES[k];
    if(k==="nf")opts=opts.map(o=>o[0]==="auto"?["auto",`Auto · ${SUGGEST[S.pace][S.len]}`,"Suggested for this length and pace."]:o);
    el.innerHTML=opts.map(([v,l,d])=>`<button class="choice" type="button" data-ck="${k}" data-v="${esc(v)}" aria-pressed="${String(S[k])===v}"${d&&el.classList.contains("small")?` title="${esc(d)}"`:""}><b>${esc(l)}</b>${d&&!el.classList.contains("small")?`<span>${esc(d)}</span>`:""}</button>`).join("");
  });
  $("langWrap").hidden=S.market==="US";
}
function renderCombos(){
  const c=S.cat.trim().toLowerCase(),list=COMBOS[c];
  $("comboHint").textContent=list?`Combinations that work well for ${S.cat.trim()}. One click sets the format, style and pace.`:"Pick a category above to see combinations that suit it. Popular picks:";
  $("combos").innerHTML=(list||COMBOS_ANY).map(([f,s])=>{
    const fo=F.find(x=>x.id===f),so=STYLES.find(x=>x.id===s),pc=FPACE[f]||"punchy";
    if(!fo||!so)return "";
    const on=S.format===f&&S.style===s&&S.pace===pc;
    return `<button class="chip" type="button" data-combo="${f}|${s}" aria-pressed="${on}">${esc(clean(fo.name))} + ${esc(clean(so.name))} <i>· ${PACES[pc].l}</i></button>`;
  }).join("");
}
function renderFrames(){
  const n=S.frames.length;let h="";
  for(let i=0;i<n;i++){
    const last=i===n-1;
    h+=`<div class="frame" id="fr${i}">
     <div class="fhead"><span class="fnum">Frame ${i+1}</span><span class="ftime" id="ft${i}"></span><span class="fclip" id="fc${i}"></span>
      <label class="fdur">Length <input type="number" min="0.3" max="20" step="0.1" data-f="${i}:d" aria-label="Frame ${i+1} length in seconds"> s</label></div>
     <input type="text" data-f="${i}:b" aria-label="Frame ${i+1} action" placeholder="What happens in this frame">
     <div class="fgrid">
      <div><div class="tag">Shot</div><button class="pk" type="button" data-pk="sh${i}"></button></div>
      <div><div class="tag">Angle</div><button class="pk" type="button" data-pk="an${i}"></button></div>
      <div><div class="tag">Camera move</div><button class="pk" type="button" data-pk="mv${i}"></button></div>
      <div><div class="tag">Sound in the scene</div><div class="combo"><input type="text" id="ff${i}-fx" data-f="${i}:fx" placeholder="Natural sounds"><button class="pk" type="button" data-pk="fx${i}" aria-label="Sound ideas"></button></div></div>
      ${last?"":`<div><div class="tag">Cut to next</div><button class="pk" type="button" data-pk="tr${i}"></button></div>
      <div><div class="tag">Edit sound at the cut</div><button class="pk" type="button" data-pk="ex${i}"></button></div>`}
     </div>
     <div class="fsplit" style="margin-top:8px">
      <div><div class="tag">Says on camera <small>(optional)</small></div><input type="text" data-f="${i}:say" placeholder="Words the person says, if any"><div class="fwarn" id="fws${i}"></div></div>
      <div class="vo-only"${S.vo==="yes"?"":" hidden"}><div class="tag">Voiceover <small>(added later)</small></div><input type="text" data-f="${i}:vo" placeholder="Narrator line over this frame"><div class="fwarn" id="fwv${i}"></div></div>
     </div>
     <div class="tbox">
      <div class="tag">On-screen text <small>(optional)</small></div>
      <input type="text" data-f="${i}:tx" id="ftx${i}" placeholder="${last?"Leave empty to use the end card: brand name · call to action":"e.g. 50% OFF"}">
      <div class="fgrid" id="tg${i}">
       <div><div class="tag">How</div><button class="pk" type="button" data-pk="tm${i}"></button></div>
       <div><div class="tag">Animation</div><button class="pk" type="button" data-pk="ta${i}"></button></div>
       <div><div class="tag">Position</div><button class="pk" type="button" data-pk="tp${i}"></button></div>
      </div>
      <div class="tnote" id="tn${i}"></div>
     </div>
    </div>`;
  }
  $("frames").innerHTML=h;syncFrames();
}
function syncFrames(){
  S.frames.forEach((f,i)=>{
    document.querySelectorAll(`[data-f^="${i}:"]`).forEach(el=>{const k=el.dataset.f.split(":")[1];el.value=k==="d"?f.d:(f[k]||"")});
    ["sh","an","mv","tr","ex","fx","tm","ta","tp"].forEach(p=>{if(document.querySelector(`[data-pk="${p}${i}"]`))refresh(p+i)});
  });
}
function fitNote(t,d){
  if(!t.trim())return "";
  const w=words(t),cap=Math.max(1,Math.floor(d*LANGS[langEff()].wps));
  return w>cap?`${w} words; about ${cap} fit in ${sec(d)}. Shorten it or make the frame longer.`:"";
}
function frameMeta(pl){
  const N=S.frames.length,L=+S.len;let t=0,tl="";
  S.frames.forEach((f,i)=>{
    const bf=pl.byFrame[i],m=tEff(i),t0=t;t+=f.d;
    const ft=$("ft"+i);if(!ft)return;
    ft.textContent=`${tc(t0)}–${tc(t)}`;
    $("fc"+i).textContent=bf?(bf.c.kind==="card"?`Text card · clip ${bf.c.n}`:`Clip ${bf.c.n} · ${bf.c.len}s`):"";
    $("fr"+i).classList.toggle("card-f",m==="image");
    $("fws"+i).textContent=fitNote(f.say,f.d);
    const fv=$("fwv"+i);if(fv)fv.textContent=fitNote(f.vo,f.d);
    const tx=txt(i);$("tg"+i).hidden=!tx;
    let note="";
    if(tx){
      note=`<span class="lvl">${LVL[m]}</span>`;
      if(m==="flow")note+=`Flow draws <b>"${esc(tx)}"</b> in the clip.`;
      else if(m==="image")note+=`A separate image card with <b>"${esc(tx)}"</b>, animated in Flow. Prompts in step 6C.`;
      else note+=`Add <b>"${esc(tx)}"</b> in CapCut. Details on the cut sheet.`;
      if(bangla(tx)&&f.tm!=="capcut"&&f.tm!=="image")note+=" Bangla text always goes to level 2: video models misspell Bangla letters.";
      else if(m==="flow"&&words(tx)>4)note+=" Long text in Flow often comes out misspelled; level 2 is safer.";
      if(!f.tx.trim())note+=` (End card text from Brand name and Call to action.)`;
    }else if(i===N-1&&S.endCard==="yes")note="Type the Brand name and Call to action in step 2 to fill the end card.";
    $("tn"+i).innerHTML=note;
    const cls=m==="image"?"card":(bf&&bf.c.n%2===0?"alt":"");
    tl+=`<a href="#fr${i}" class="${cls}" style="flex:${Math.max(.05,f.d)} 1 0" title="Frame ${i+1} · ${sec(f.d)}${tx?` · "${esc(tx)}"`:""}">${i+1}${tx?'<span class="tx"></span>':""}</a>`;
  });
  $("tl").innerHTML=tl;
  $("tlaxis").innerHTML=`<span>0:00</span><span>${tc(L/2)}</span><span>${tc(L)}</span>`;
  const sum=r1(t);
  $("durSum").innerHTML=`<span>Frames add up to <b>${sec(sum)}</b> of <b>${L}s</b>.</span>`+(Math.abs(sum-L)>.2?`<span class="bad">${sum>L?"Too long":"Too short"} by ${sec(Math.abs(sum-L))}. Click "Fit lengths".</span>`:"");
}

/* ---------------- PROMPTS ---------------- */
function need(k,ph){const x=S[k].trim();$("f-"+k).classList.toggle("missing",!x);return x||`[${ph}]`}
function brief(i){
  const f=S.frames[i],a=[];
  if(f.sh!=="auto")a.push(lbl(SHOTS,f.sh).toLowerCase());
  if(f.an!=="auto")a.push(lbl(ANGLES,f.an).toLowerCase());
  if(f.mv!=="auto"&&!(f.mv==="whip"&&f.tr==="whip"&&i<S.frames.length-1))a.push(lbl(MOVES,f.mv).toLowerCase());
  const prev=i>0?trOf(S.frames[i-1].tr):null;
  if(prev&&prev.at==="flow"&&prev.next&&tEff(i-1)!=="image")a.push(prev.next);
  if(i<S.frames.length-1){const tr=trOf(f.tr);if(tr.at==="flow"&&tEff(i+1)!=="image")a.push(tr.flow)}
  return a.join(", ");
}
function caption(i){
  const f=S.frames[i],N=S.frames.length;
  const shot=f.sh==="auto"?"":lbl(SHOTS,f.sh),ang=f.an==="auto"?"":lbl(ANGLES,f.an).toLowerCase();
  const L=[`Frame ${i+1} · ${sec(f.d)}`,
   `SHOT / ANGLE: ${[shot,ang].filter(Boolean).join(", ")||"Choose the best shot and angle"}`,
   `CAMERA: ${f.mv==="auto"?"Choose the best camera movement":lbl(MOVES,f.mv)}`,
   `ACTION: ${f.b.trim()||"[describe this frame]"}`];
  if(f.say.trim())L.push(`SAYS: "${f.say.trim()}"`);
  L.push(`SOUND: ${f.fx.trim()||"natural sounds of the action"}`);
  const t=txt(i),m=tEff(i);
  if(t){
    if(m==="flow")L.push(`TEXT (draw it): "${t}" · ${anOf(f.ta).sh} · ${lbl(TPOS,f.tp).toLowerCase()}`);
    else L.push(`TEXT: none in this picture (${m==="image"?"a text card is made later":"added in editing"}); ${f.tp==="full"?"keep the composition simple, with room for a full-screen end card":"leave clean space "+POSP[f.tp]}`);
  }
  if(i<N-1){const tr=trOf(f.tr);if(tr.at==="flow")L.push(`CUT: ${tr.flow}`)}
  return L.join("\n");
}
function styleBlock(){let s=sty().text;if(S.accent.trim())s+=`\nUse subtle accents of ${S.accent.trim()} in wardrobe, props and set details.`;return s}
function textLook(){return S.tstyle+(S.accent.trim()&&/brand-color/.test(S.tstyle)?` (brand color: ${S.accent.trim()})`:"")}
function flowName(){return S.flow.trim()||S.name.trim()||S.cat.trim()||"[product]"}
function tone(){return {real:"Make it cinematic, realistic and professionally directed.",raw:"Make it realistic and professionally directed.",cgi:"Make it cinematic and polished, with seamless photoreal CGI.",anim:"Make it polished and professionally directed."}[sty().tone]}
function speechDesc(){const l=langEff();return l==="english"?(S.market==="US"?"in natural American English":LANGS.english.speech):LANGS[l].speech}
function aspectTxt(){return S.aspect==="9:16"?"9:16 vertical":"16:9 landscape"}

function chatPrompt(){
  const f=fmt(),N=S.frames.length,p=PACES[S.pace],vert=S.aspect==="9:16";
  const name=need("name","Product Name"),cat=need("cat","Category"),usp=need("usp","Core Selling Point");
  let info=`**Product Name:** ${name}\n**Product Category:** ${cat}\n**Core Selling Point:** ${usp}\n`;
  if(S.aud.trim())info+=`**Target Audience:** ${S.aud.trim()}\n`;
  info+=`**Primary Model:** ${S.model.trim()||"Choose people who fit the audience"}\n`;
  info+=`**Market:** ${S.market==="US"?"United States: American people, places and details":"Bangladesh: Bangladeshi people, places and cultural details"}\n`;
  if(S.setting.trim())info+=`**Setting:** ${S.setting.trim()}\n`;
  DIALS.forEach(d=>{if(S[d.k])info+=`**${d.key}:** ${S[d.k]}\n`});
  if(S.theme.trim())info+=`**Commercial Theme:** ${S.theme.trim()}\n`;
  if(S.brand.trim())info+=`**Brand:** ${S.brand.trim()}\n`;
  if(S.offer.trim())info+=`**Offer:** ${S.offer.trim()}\n`;
  if(S.extra.trim())info+=`**Extra Direction:** ${S.extra.trim()}\n`;
  const anySay=S.frames.some(x=>x.say.trim()),anyDraw=S.frames.some((x,i)=>tEff(i)==="flow"),rule=LANGS[langEff()].rule;
  const boards=Math.ceil(N/6);
  const rest=[];for(let b=1;b<boards;b++)rest.push(`${b*6+1}–${Math.min(N,b*6+6)}`);
  return `**Important Instructions**

Do not generate the commercial yet.
Do not generate any video.
Do not generate any image other than the requested storyboard.
Your task is to create a professional commercial storyboard that will later be animated in Google Flow Agent.

Use the uploaded product image(s) as the **exact reference** for the product throughout every frame. Do not redesign, modify, or replace the product. Preserve the product's shape, colors, branding, labels, proportions, materials, and overall appearance in every scene.
Never invent, change, or misspell any text or logo on the product. If the product text is too small to read, keep it small and unreadable rather than inventing new letters.
If a Character Reference Sheet is attached, use that exact person in every frame where a person appears.

---

### Commercial Format

**Format:** ${clean(f.name)}
${f.desc}
**Length and pace:** a ${S.len}-second commercial with a ${p.l.toLowerCase()} pace (${p.d.split(".")[0].toLowerCase()}). This is a fast-cut commercial: every frame is its own shot, and the shot sizes and angles change strongly from frame to frame so every cut feels different.

---

### Visual Style

${styleBlock()}

---

### Product Information

${info.trim()}

---

### Frames

The storyboard must follow these frames in order. The length of each frame in the finished ad is given next to its number.

${S.frames.map((_,i)=>caption(i)).join("\n\n")}

---

### Storyboard Requirements

Create a **${N}-frame storyboard** that tells one complete commercial from beginning to end.
Keep the same model, wardrobe, location, lighting logic, and color grade across all frames unless a frame says otherwise.
${vert?"Draw each panel as a 9:16 vertical picture, arranged in a grid of 3 columns and 2 rows.":"Draw each panel as a 16:9 landscape picture, arranged in a grid of 2 columns and 3 rows."}
Present every frame as an image panel with a black caption bar directly underneath it, outside the picture.
In each caption bar, show the frame number and length in a gold box (for example "3 · 1.5s") and the short lines given for that frame: SHOT / ANGLE, CAMERA, ACTION, and SAYS, SOUND, TEXT and CUT when given.
SOUND lines describe sound effects of what happens on screen only. Never mention music.
Use the exact lines given for each frame.${anySay?`\nWrite the SAYS lines exactly as given.${rule?" "+rule:""}`:""}
Keep the picture area itself clean, with no text on the image${anyDraw?`, except the lines marked "TEXT (draw it)": draw that text inside the picture exactly as spelled, letter for letter, as ${textLook().toLowerCase()}, at the position given`:""}.
When a TEXT line says to leave clean space, keep that part of the picture simple and uncluttered, with no text.

The storyboard should feel like a professionally directed, high-energy commercial rather than ${N} unrelated images.
Ensure the product remains clearly recognisable throughout the entire storyboard.

---

### Output Format

${N<=6?`Generate all ${N} frames inside a single storyboard image.
Do not generate any image other than the storyboard.
Do not generate the final commercial.`:`Do **not** generate all ${N} frames at once.

Instead:
Generate **Frames 1 to 6** inside a single storyboard image.
Each time I type **"Next"**, generate the next group of frames (${rest.map(r=>"Frames "+r).join(", then ")}) inside a new storyboard image.
Never generate two storyboard images in the same response.
Do not generate any image other than the storyboard.
Do not generate the final commercial.
Only generate the first storyboard containing Frames 1 to 6.`}`;
}

function flowPrompt(b,B){
  const p=PACES[S.pace],fc=b.clips.filter(c=>c.kind==="flow"),cards=b.clips.filter(c=>c.kind==="card");
  const first=b.fr[0]+1,last=b.fr[b.fr.length-1]+1;
  if(!fc.length)return `Storyboard ${b.k} has only text-card frames (${frLabel(b.fr)}). Nothing to make from this storyboard: use the text card prompts in step 6C instead.`;
  const multi=fc.some(c=>c.fr.length>1);
  let s=`Animate this ${flowName()} commercial storyboard${B>1?` (storyboard ${b.k} of ${B}, frames ${first}–${last})`:""} as a ${clean(fmt().name)} ad in a ${clean(sty().name)} style, with a ${p.l.toLowerCase()} pace. ${tone()}\n\n`;
  s+=`Make ${fc.length} separate clip${fc.length>1?"s":""}, one for each line below, each exactly the length shown.${multi?" Inside a clip, cut hard at the times given: each frame is its own shot with its own framing. Never blend two frames into one shot.":""}\n`;
  s+=fc.map(c=>{
    const head=`Clip ${c.n} · ${c.len}s · ${frLabel(c.fr)}`;
    if(c.fr.length===1){const br=brief(c.fr[0]);return `${head}${br?": "+br:""}.`}
    return `${head}: `+c.segs.map(g=>`${t1(g.from)}–${t1(g.to)}s Frame ${g.i+1}${brief(g.i)?", "+brief(g.i):""}`).join("; CUT; ")+".";
  }).join("\n");
  if(cards.length)s+=`\nSkip ${cards.map(c=>"Frame "+(c.fr[0]+1)).join(" and ")}: ${cards.length>1?"they are":"it is"} made separately as a text card.`;
  s+=S.pace==="hyper"
    ?`\n\nEach clip is one continuous, high-energy action with strong camera movement from the first to the last second. The editor will cut it into very short shots, so every moment needs a clear subject and motion.`
    :`\n\nThe clips are a little longer than the final shots on purpose, so the editor can trim. Keep the action going until the very end of each clip.`;
  s+=`\n\nFollow every scene exactly as shown in the storyboard, including the notes in the caption bar under each panel. Use the notes only as direction and never show them in the video.`;
  s+=`\nKeep the product exactly as in the reference images in every clip: same shape, colors, logo and label text. If a character reference is attached, keep that exact person.`;
  const says=b.fr.filter(i=>tEff(i)!=="image"&&S.frames[i].say.trim());
  s+=`\nSound: realistic sound effects of what happens on screen, as in the SOUND notes.`+(says.length?` The person says only the SAYS lines, word for word, ${speechDesc()}, with lip movement matching the words.`:" Nobody speaks.")+` No background music, no voiceover and no narration; these are added later in editing.`;
  const tx=b.fr.filter(i=>tEff(i)==="flow");
  s+=tx.length
    ?`\nOn-screen text: show only ${tx.map(i=>`in Frame ${i+1}, "${txt(i)}", which ${anOf(S.frames[i].ta).fl}, ${POSP[S.frames[i].tp]}`).join("; and ")}. Spell every letter exactly as written, as ${textLook().toLowerCase()}. No other text, subtitles or captions.`
    :`\nDo not add subtitles, captions, logos or any on-screen text.`;
  s+=`\nGenerate in ${aspectTxt()} format.`;
  return s;
}

function cardPrompts(c){
  const i=c.fr[0],f=S.frames[i],t=txt(i),full=f.tp==="full",bn=bangla(t),a=anOf(f.ta),N=S.frames.length,st=sty();
  const scene=full
    ?`An end card: the product exactly as in the uploaded reference, hero-lit and centered, on a clean background that fits the style${S.accent.trim()?` with touches of ${S.accent.trim()}`:""}.`
    :`The same scene as Frame ${i+1} of the attached storyboard: ${f.b.trim()||"[describe this frame]"}. ${[f.sh!=="auto"?lbl(SHOTS,f.sh):"",f.an!=="auto"?lbl(ANGLES,f.an).toLowerCase():""].filter(Boolean).join(", ")}. Match its people, place, light and color grade exactly. The product must match the uploaded reference exactly.`;
  const img=`Create ONE image only: a single ${aspectTxt()} frame for a commercial. Not a storyboard: no panels, no caption bar, no frame numbers.

Scene: ${scene}
Visual style: ${clean(st.name)}. ${st.desc}

Text: "${t}"
Spell it exactly as written, letter for letter${bn?", in Bangla script with correct conjuncts and vowel signs; do not transliterate or translate it":""}.
Look: ${textLook()}. Position: ${POSP[f.tp]}. Large, sharp and easy to read on a phone.
Keep the text inside the safe area: away from the top 10% and the bottom 20% of the frame, and away from the right edge where app buttons sit.

No other text, no watermark and no extra logos. Do not change, redesign or misspell the product or its label.`;
  const anim=`Animate this image as one ${c.len}s clip. It is Frame ${i+1}${i===N-1?" (the last frame)":""} of the ${flowName()} commercial.
Keep every letter of the text "${t}" exactly as it is in the image: same spelling, shape, size, color and position. The letters never move, bend, blur, flicker out or change${bn?"; they are Bangla letters, so do not alter a single stroke":""}.
Motion: ${a.amb}. ${full?"A very slow push-in on the product.":f.mv!=="auto"?`Camera: ${lbl(MOVES,f.mv).toLowerCase()}, kept gentle.`:"A very slow push-in."} Keep the product exactly as shown.
Sound: ${f.fx.trim()||"soft natural sound that fits the scene"}. No music, no voiceover, no other text, subtitles or captions.
Generate in ${aspectTxt()} format.`;
  return {img,anim,how:`Entrance in CapCut: select this clip → ${a.cin}. The whole image moves as one, so the letters stay sharp.`};
}

function voScript(){
  const l=langEff(),rows=[];let t=0;
  S.frames.forEach((f,i)=>{const t0=t;t+=f.d;if(f.vo.trim()){const w=words(f.vo),cap=Math.max(1,Math.floor(f.d*LANGS[l].wps));rows.push(`${tc(t0)}–${tc(t)} · Frame ${i+1}\n"${f.vo.trim()}"  (${w} word${w>1?"s":""}${w>cap?`, too long: about ${cap} fit`:", fits"})`)}});
  if(!rows.length)return "Type a voiceover line in the frames where the narrator speaks.";
  const lang=l==="english"?(S.market==="US"?"American English":"English with natural Bangladeshi phrasing"):LANGS[l].l;
  return `VOICEOVER SCRIPT · ${flowName()} · ${S.len}s · ${lang}\nRead it calmly and on time. Record each line separately so it is easy to place.${LANGS[l].rule?"\n"+LANGS[l].rule:""}\n\n`+rows.join("\n\n");
}

function fixPrompt(pl){
  const c=pl.clips.find(x=>String(x.n)===String(S.fixClip))||pl.clips[0];if(!c)return "";
  const is=ISSUES.find(x=>x[0]===S.fixIssue)||ISSUES[0];
  let s=`Remake only Clip ${c.n} (${frLabel(c.fr)}, ${c.len}s). Leave every other clip exactly as it is.\nProblem: ${is[1].toLowerCase()}. ${is[3].replace("exactly the length given",`exactly ${c.len}s`)}`;
  if(S.fixExtra.trim())s+=`\n${S.fixExtra.trim()}`;
  s+=c.kind==="card"?`\nKeep the text "${txt(c.fr[0])}" exactly as in the uploaded image.`:`\nFollow the storyboard and its caption notes for ${frLabel(c.fr).toLowerCase()} exactly.`;
  return s;
}

function cutSheet(pl){
  const rows=[],txtRows=[];let t=0;const N=S.frames.length;
  S.frames.forEach((f,i)=>{
    const bf=pl.byFrame[i],t0=t;t+=f.d;if(!bf)return;
    const c=bf.c,tk=takes(c,bf.s,i),file=`clip-${pad2(c.n)}`;
    const keep=tk.length>1?`Cut into ${tk.length} quick takes of ${sec(f.d/tk.length)}: `+tk.map(x=>`${t1(x[0])}–${t1(x[1])}s`).join(", "):`Keep ${t1(tk[0][0])}–${t1(tk[0][1])}s`;
    let cut="",sfx="";
    if(i<N-1){
      const tr=trOf(f.tr);cut=`→ ${tr.l}: ${tr.cc}`;
      const ex=f.ex==="auto"?tr.sfx:(f.ex==="none"?"":f.ex);
      if(ex)sfx=`SFX ${ex} at ${tc(t)}`;
    }else cut="End of the ad.";
    const tx=txt(i),m=tEff(i),a=anOf(f.ta),tb=[];
    if(tx){
      if(m==="flow")tb.push(`Text in the clip (level 1): "${tx}". Check the spelling; if it's wrong, switch this frame to level 2 or 3.`);
      else if(m==="image")tb.push(`Text card (level 2): "${tx}". ${cardPrompts(c).how}`+(a.sfx?` SFX ${a.sfx} at ${tc(t0)}.`:""));
      else tb.push(`Add text (level 3): "${tx}" · ${lbl(TPOS,f.tp).toLowerCase()} · ${tc(t0)}–${tc(t)} · ${a.l}: ${a.cc}.`+(a.sfx?` SFX ${a.sfx} at ${tc(t0)}.`:""));
    }
    if(f.vo.trim()&&S.vo==="yes")tb.push(`VO: "${f.vo.trim()}"`);
    const src=c.kind==="card"?`${file} (text card)`:file;
    rows.push(`<tr><td class="t">${tc(t0)}–${tc(t)}</td><td><b>F${i+1}</b><small>${esc(sec(f.d))}</small></td><td><b>${esc(src)}</b><small>${esc(keep)}</small></td><td>${esc(cut)}${sfx?`<small>${esc(sfx)}</small>`:""}</td><td>${tb.map(esc).join("<br>")||'<small>—</small>'}</td></tr>`);
    txtRows.push(`${tc(t0)}–${tc(t)} · Frame ${i+1} (${sec(f.d)})\n  From: ${src} · ${keep}\n  ${cut}${sfx?`\n  ${sfx}`:""}${tb.length?"\n  "+tb.join("\n  "):""}`);
  });
  const hy=S.pace==="hyper"?`<caption style="caption-side:top;text-align:left;padding:10px;font-size:12.5px;color:var(--muted)">Hyper pace: each clip is cut into quick takes. Put hard cuts between the takes; a 1-frame white flash between some of them adds energy.</caption>`:"";
  $("cs").innerHTML=hy+`<thead><tr><th>Time in ad</th><th>Frame</th><th>Take from</th><th>Cut and sound</th><th>Text and voiceover</th></tr></thead><tbody>${rows.join("")}</tbody>`;
  $("csText").textContent=`CUT SHEET · ${flowName()} · ${S.len}s · ${PACES[S.pace].l} · ${aspectTxt()}\nClips are named clip-01, clip-02… in Flow order. "Keep" times are seconds inside that clip.${S.pace==="hyper"?"\nHyper pace: each clip is cut into quick takes, with hard cuts between them (a 1-frame white flash between some adds energy).":""}\n\n`+txtRows.join("\n\n");
}

function build(){
  const pl=plan(),N=S.frames.length,B=pl.boards.length;
  frameMeta(pl);
  $("outChat").textContent=chatPrompt();
  $("nextMeta").textContent=B>1?`Send "Next" ${B-1} time${B>2?"s":""}, once after each storyboard is done (${B} storyboards in total).`:"Only one storyboard: no Next needed.";
  $("outFlow").innerHTML=pl.boards.map(b=>`<div class="send"><div class="sh"><span>Flow prompt ${b.k}${B>1?` of ${B}`:""} · with storyboard ${b.k}</span><button class="b primary" type="button" data-copy="flowP${b.k}">Copy</button></div><pre id="flowP${b.k}">${esc(flowPrompt(b,B))}</pre></div>`).join("");
  const cards=pl.clips.filter(c=>c.kind==="card");
  $("outCards").innerHTML=cards.length?cards.map(c=>{const k=cardPrompts(c),i=c.fr[0];return `<div class="cardout"><h3>Frame ${i+1} · "${esc(txt(i))}" · clip ${c.n}</h3>
   <div class="send"><div class="sh"><span>1 · ChatGPT image</span><button class="b primary" type="button" data-copy="cImg${i}">Copy</button></div><p class="how">New chat. Attach your product photos or sheet${S.frames[i].tp==="full"?"":` and the storyboard with Frame ${i+1}`}, paste, send. Check every letter before you download.</p><pre id="cImg${i}">${esc(k.img)}</pre></div>
   <div class="send"><div class="sh"><span>2 · Flow animate</span><button class="b primary" type="button" data-copy="cAn${i}">Copy</button></div><p class="how">In Flow, upload the card image, paste this, tag the image and send.</p><pre id="cAn${i}">${esc(k.anim)}</pre></div>
   <p class="tip">${esc(k.how)}</p></div>`}).join(""):`<p class="empty">No level 2 text cards yet. Frames with longer text, Bangla text or a full-screen end card get their prompts here.</p>`;
  $("voWrap").hidden=S.vo!=="yes";
  if(S.vo==="yes")$("outVO").textContent=voScript();
  if(!pl.clips.some(c=>String(c.n)===String(S.fixClip)))S.fixClip="1";
  refresh("fixClip");
  $("outFix").textContent=fixPrompt(pl);
  cutSheet(pl);
  $("flAspect").textContent=S.aspect;
  $("edExport").textContent=S.aspect==="9:16"?"1080 × 1920 (9:16), 30 fps.":"1920 × 1080 (16:9), 30 fps.";
  /* at a glance */
  const flowSec=pl.clips.reduce((a,c)=>a+c.len,0),texts=S.frames.filter((_,i)=>txt(i)).length;
  $("stats").innerHTML=[[`${S.len}s`,`${PACES[S.pace].l} pace`],[N,"frames"],[B,`storyboard${B>1?"s":""}`],[pl.clips.length,`Flow clips (${flowSec}s)`],[texts,"text lines"],[S.aspect,"shape"]].map(([v,l])=>`<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("");
  const w=[];
  const sum=r1(S.frames.reduce((a,f)=>a+f.d,0));
  if(Math.abs(sum-S.len)>.2)w.push(`Frame lengths add up to ${sec(sum)}, not ${S.len}s. Click "Fit lengths" in the shot list.`);
  ["name","cat","usp"].forEach(k=>{if(!S[k].trim())w.push(`Fill in the ${{name:"product name",cat:"category",usp:"core selling point"}[k]} (step 2).`)});
  S.frames.forEach((f,i)=>{if(fitNote(f.say,f.d))w.push(`Frame ${i+1}: the SAYS line is too long for ${sec(f.d)}.`);if(S.vo==="yes"&&fitNote(f.vo,f.d))w.push(`Frame ${i+1}: the voiceover line is too long for ${sec(f.d)}.`)});
  pl.clips.filter(c=>c.over).forEach(c=>w.push(`Clip ${c.n} needs more than 8s of footage. It's made as 8s; shorten ${frLabel(c.fr).toLowerCase()} or split it into two frames.`));
  if(S.frames.some((f,i)=>S.frames[i].say.trim()&&S.pace==="hyper"))w.push("Speech in a Hyper ad gets cut into tiny pieces. Keep SAYS lines on the longer frames, or use a voiceover instead.");
  $("warns").innerHTML=w.length?w.map(x=>`<li>${esc(x)}</li>`).join(""):`<li class="ok">Everything fits. Copy the prompts in step 6.</li>`;
  $("planLine").innerHTML=`<span><b>${N}</b> frames of about <b>${sec(S.len/N)}</b></span><span><b>${B}</b> storyboard${B>1?"s":""}</span><span><b>${pl.clips.length}</b> Flow clips, <b>${flowSec}s</b> in total</span><span>Spare footage: <b>${Math.round((PACES[S.pace].pad-1)*100)}%</b> or more per clip</span>`;
  renderCombos();
  save();
}

/* ---------------- STORAGE ---------------- */
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){
  try{
    const st=JSON.parse(localStorage.getItem(KEY)||"null");
    if(!st||!Array.isArray(st.frames)||st.frames.length<1||st.frames.length>24)return false;
    S=Object.assign(fresh(),st);
    if(!F.some(f=>f.id===S.format))S.format="F22";
    if(!STYLES.some(s=>s.id===S.style))S.style="S21";
    if(!PACES[S.pace])S.pace="punchy";
    if(!SUGGEST.punchy[S.len])S.len="30";
    return true;
  }catch(e){return false}
}

/* ---------------- EVENTS ---------------- */
async function copy(text,btn){
  let ok=false;
  try{await navigator.clipboard.writeText(text);ok=true}catch(e){
    const t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();
    try{ok=document.execCommand("copy")}catch(_){}t.remove();
  }
  const old=btn.dataset.label||btn.textContent;btn.dataset.label=old;
  btn.textContent=ok?"Copied ✓":"Select and copy by hand";btn.classList.toggle("copied",ok);
  clearTimeout(btn._t);btn._t=setTimeout(()=>{btn.textContent=old;btn.classList.remove("copied")},1800);
}
document.addEventListener("click",e=>{
  const pk=e.target.closest("[data-pk]");if(pk){e.preventDefault();openPk(pk.dataset.pk,pk);return}
  const li=e.target.closest("#popl li.opt");if(li){choose(+li.dataset.i);return}
  const cp=e.target.closest("[data-copy]");if(cp){const el=$(cp.dataset.copy);if(el)copy(el.textContent,cp);return}
  const ct=e.target.closest("[data-copy-text]");if(ct){copy(ct.dataset.copyText,ct);return}
  const co=e.target.closest("[data-combo]");
  if(co){const [f,s]=co.dataset.combo.split("|"),pc=FPACE[f]||"punchy",was=[S.format,S.pace];S.style=s;S.format=f;S.pace=pc;
    if(was[0]!==f||was[1]!==pc)reshape(was[0]!==f);renderChoices();refreshAll();build();return}
  const ch=e.target.closest("[data-ck]");
  if(ch){
    const k=ch.dataset.ck,v=ch.dataset.v,was=S[k];if(was===v)return;S[k]=v;
    if(k==="market"){["aud","model"].forEach(refresh)}
    if(k==="vo")renderFrames();
    if(k==="len"||k==="pace"||k==="nf")reshape(false);
    if(k==="endCard")fitDur(true);
    renderChoices();build();return;
  }
});
document.addEventListener("input",e=>{
  const k=e.target.dataset.k;
  if(k){S[k]=e.target.value;if(P[k])refresh(k);build();return}
  const fk=e.target.dataset.f;
  if(fk){
    const [i,p]=fk.split(":"),f=S.frames[+i];if(!f)return;
    if(p==="d"){const v=parseFloat(e.target.value);f.d=isNaN(v)?0:Math.max(0,Math.min(20,v))}else f[p]=e.target.value;
    S.dirty=true;if(p==="fx")refresh("fx"+i);build();
  }
});
document.addEventListener("change",e=>{const c=e.target.dataset.chk;if(c){S.chk[c]=e.target.checked;save()}});
$("fitDur").onclick=()=>{fitDur(true);syncFrames();build()};
$("resetFrames").onclick=()=>{if(!S.dirty||confirm("Replace all frames with the format's defaults?")){fillFrames();renderFrames();build()}};
$("resetAll").onclick=function(){
  if(this.dataset.arm!=="1"){this.dataset.arm="1";this.textContent="Click again to clear everything";setTimeout(()=>{this.dataset.arm="";this.textContent="Start a new ad"},3000);return}
  this.dataset.arm="";this.textContent="Start a new ad";
  const m=S.market,l=S.lang;S=fresh();S.market=m;S.lang=l;init();scrollTo({top:0});
};
$("loadExample").onclick=()=>{
  if(S.dirty&&!confirm("Replace everything on the page with the example?"))return;
  const m=S.market;
  Object.assign(S,fresh(),{market:"BD",lang:"banglish",name:"Proton M-Earphone Rhythmic",flow:"Proton earphone",cat:"Electronics",usp:"Deep bass, in-line controls, secure fit",aud:"University students, 18–24",model:"Bangladeshi man in his early 20s, curly hair, casual streetwear",setting:"A rooftop in Dhanmondi at blue hour, city lights behind",theme:"Energy and adventure",brand:"Proton",cta:"Order now",offer:"50% OFF",accent:"electric blue",format:"F23",style:"S12",len:"15",pace:"hyper",nf:"auto"});
  fillFrames();
  S.dirty=true;init();
  if(m!==S.market)["aud","model"].forEach(refresh);
};
(function(){
  let t=null;try{t=localStorage.getItem("ugcpb-theme")}catch(e){}
  if(t)document.documentElement.dataset.theme=t;
  $("themeBtn").onclick=()=>{
    const c=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
    const nx=c==="dark"?"light":"dark";document.documentElement.dataset.theme=nx;
    try{localStorage.setItem("ugcpb-theme",nx)}catch(e){}
  };
})();
document.querySelectorAll("[data-mode]").forEach(a=>a.addEventListener("click",()=>{try{localStorage.setItem("ufw-mode",a.dataset.mode)}catch(e){}}));

/* reference sheets (sheets.js): what to do with the PNG in this workflow */
window.RS_NEXT=(k,t)=>({
  html:`Save it as <span class="kv">${t.file}</span>. Attach it in ChatGPT together with the storyboard prompt${k==="product"?" (a couple of real product photos help too)":""}, and upload and tag it in Flow with every storyboard.${k==="expr"?" It is optional; use it next to the character sheet.":""}`,
  send:k==="expr"?"":`The attached ${t.title} is the exact reference for the ${t.who.toLowerCase()} in every frame. Do not redesign or change it.`,
  label:"Add this line under the storyboard prompt"
});

/* ---------------- INIT ---------------- */
$("dials").innerHTML=DIALS.map(d=>`<div><div class="lbl">${d.label}</div><button class="pk" type="button" data-pk="${d.k}"></button><div class="desc" data-pkd="${d.k}"></div></div>`).join("");
$("gloss").innerHTML=[["Shot sizes",SHOTS],["Camera angles",ANGLES],["Camera moves",MOVES],["Transitions",TRANS.map(t=>[t.v,t.l,t.d])],["Text animations",TANIM.map(t=>[t.v,t.l,t.d])]].map(([t,l])=>
  `<h3>${t}</h3>`+l.filter(x=>x[0]!=="auto").map(x=>`<div><b>${esc(x[1])}:</b> ${esc(x[2])}</div>`).join("")).join("");
function init(){
  if(!S.frames.length)fillFrames();
  TEXT_KEYS.forEach(k=>{const el=$("f-"+k);if(el)el.value=S[k]});
  document.querySelectorAll("[data-chk]").forEach(c=>c.checked=!!S.chk[c.dataset.chk]);
  renderChoices();renderFrames();refreshAll();build();
}
load();init();
