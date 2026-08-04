"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const translations = {
  en: {
    legal: "Legal & Compliance",
    title: "Terms & Conditions",
    lastUpdated: "Last Updated:",
    s1Title: "1. Introduction",
    s1P1: "Welcome to the official website of Sri Kandhaguru Foundation (“the Foundation”, “we”, “our”, or “us”).",
    s1P2: "Sri Kandhaguru Foundation is a non-profit spiritual organization dedicated to sharing the sacred teachings of Mahaavatar Babaji Shiva Kriya Yogam while promoting spiritual growth, humanitarian service, holistic well-being, and the preservation of India’s spiritual heritage.",
    s1P3: "By accessing, browsing, donating, purchasing products, registering for events, or otherwise using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with these Terms, please discontinue use of the website.",
    s2Title: "2. Eligibility",
    s2P1: "By using this website, you confirm that:",
    s2L: [
      "You are at least 18 years of age or are using the website under the supervision of a parent or legal guardian.",
      "You have the legal capacity to enter into binding agreements.",
      "All information provided by you is true, accurate, and complete.",
    ],
    s3Title: "3. Website Usage",
    s3P1: "You agree to use this website only for lawful purposes.",
    s3P2: "You shall not:",
    s3L: [
      "Use the website for fraudulent or illegal activities.",
      "Attempt unauthorized access to any part of the website or its servers.",
      "Introduce viruses, malware, or harmful code.",
      "Copy, reproduce, modify, or distribute website content without permission.",
      "Disrupt the normal functioning or security of the website.",
      "Misrepresent your identity or impersonate another individual or organization.",
    ],
    s3P3: "We reserve the right to suspend or terminate access for any misuse of the website.",
    s4Title: "4. Spiritual Teachings & Educational Content",
    s4P1: "The Foundation provides:",
    s4L: [
      "Shiva Kriya Yogam teachings",
      "Meditation sessions",
      "Spiritual retreats",
      "Workshops",
      "Seminars",
      "Online learning resources",
      "Wellness guidance",
      "Devotional literature",
    ],
    s4P2: "All information is intended solely for educational, spiritual, and personal development purposes.",
    s4P3: "Our teachings are not intended to replace professional medical, psychological, legal, financial, or other professional advice.",
    s5Title: "5. Health Disclaimer",
    s5P1: "Meditation, pranayama, yogic practices, and wellness techniques may not be suitable for everyone.",
    s5P2: "Individuals with existing medical conditions, respiratory disorders, pregnancy, mental health concerns, or other health issues should consult a qualified healthcare professional before participating in any practice offered by the Foundation.",
    s5P3: "Participation in any program is voluntary and at your own responsibility.",
    s5P4: "The Foundation shall not be liable for any health-related consequences arising from participation.",
    s6Title: "6. Donations",
    s6P1: "The Foundation gratefully accepts voluntary donations to support:",
    s6L: [
      "Temple construction and renovation",
      "Annadanam (Food Distribution)",
      "Spiritual education",
      "Rural welfare initiatives",
      "Healthcare camps",
      "Educational assistance",
      "Humanitarian relief",
      "Cultural and heritage preservation",
    ],
    s6P2: "All donations are voluntary.",
    s6P3: "Unless required by applicable law, donations are non-refundable after successful processing.",
    s6P4: "The Foundation reserves the right to refuse, cancel, or refund donations where legally required or where fraudulent activity is suspected.",
    s6P5: "Donation receipts will be issued where applicable.",
    s7Title: "7. Temple Construction Contributions",
    s7P1: "Contributions made specifically toward temple construction or renovation will be utilized solely for activities connected with those projects.",
    s7P2: "Project timelines may vary depending upon approvals, funding availability, weather conditions, government regulations, and other unforeseen circumstances.",
    s7P3: "Images and progress updates displayed on the website are for informational purposes.",
    s8Title: "8. Official Store",
    s8P1: "The Foundation operates an Official Store offering:",
    s8L: [
      "Spiritual books",
      "Meditation guides",
      "Devotional items",
      "Wellness products",
      "Spiritual accessories",
      "Educational resources",
    ],
    s8P2: "Product availability is subject to stock.",
    s8P3: "The Foundation reserves the right to discontinue products or modify pricing without prior notice.",
    s8P4: "Product images are for representation purposes and actual products may vary slightly.",
    s9Title: "9. Orders & Payments",
    s9P1: "When placing an order, you agree that:",
    s9L: [
      "All information provided is accurate.",
      "Payment information belongs to you or is used with proper authorization.",
      "Orders are subject to verification.",
    ],
    s9P2: "Payments are processed securely through trusted third-party payment gateways.",
    s9P3: "The Foundation does not store complete credit card, debit card, or banking credentials.",
    s9P4: "An order confirmation acknowledges receipt of your order and does not constitute acceptance until payment verification and processing are completed.",
    s10Title: "10. Shipping & Delivery",
    s10P1: "Orders are shipped to the address provided during checkout.",
    s10P2: "Estimated delivery times are approximate.",
    s10P3: "Delivery delays may occur due to:",
    s10L: [
      "Weather conditions",
      "Public holidays",
      "Transportation disruptions",
      "Courier partner delays",
      "Natural disasters",
      "Government restrictions",
    ],
    s10P4:
      "The Foundation is not responsible for delays beyond its reasonable control.",
    s10P5:
      "Customers are responsible for providing accurate shipping information.",
    s11Title: "11. Returns & Refunds",
    s11P1:
      "Physical products received damaged, defective, or incorrect should be reported within 7 days of delivery.",
    s11P2: "Upon verification, the Foundation may offer:",
    s11L1: ["Replacement", "Exchange", "Refund"],
    s11P3:
      "Refunds will be processed using the original payment method wherever applicable.",
    s11P4: "The following are generally non-refundable:",
    s11L2: [
      "Donations",
      "Event registrations",
      "Online courses",
      "Digital downloads",
      "Downloadable spiritual resources",
      "Used products",
      "Customized items",
    ],
    s12Title: "12. Event Registrations",
    s12P1: "The Foundation organizes:",
    s12L: [
      "Spiritual retreats",
      "Meditation workshops",
      "Yoga sessions",
      "Seminars",
      "Online events",
    ],
    s12P2:
      "Schedules, speakers, venues, and formats may change without prior notice.",
    s12P3:
      "The Foundation reserves the right to postpone, reschedule, or cancel events due to unforeseen circumstances.",
    s13Title: "13. Intellectual Property",
    s13P1: "All content available on this website, including:",
    s13L: [
      "Logos",
      "Trademarks",
      "Text",
      "Images",
      "Videos",
      "Audio",
      "Books",
      "Course materials",
      "Graphics",
      "Designs",
      "Downloads",
      "Publications",
    ],
    s13P2:
      "is owned by or licensed to Sri Kandhaguru Foundation and is protected under applicable copyright, trademark, and intellectual property laws.",
    s13P3:
      "No content may be copied, reproduced, republished, distributed, or commercially exploited without prior written permission.",
    s14Title: "14. User Content",
    s14P1: "If you submit:",
    s14L: [
      "Testimonials",
      "Reviews",
      "Comments",
      "Feedback",
      "Photographs",
      "Videos",
    ],
    s14P2:
      "you grant the Foundation a worldwide, royalty-free, non-exclusive license to use, publish, reproduce, and display such content for educational, promotional, and organizational purposes.",
    s14P3:
      "You confirm that your submissions do not violate the rights of any third party.",
    s15Title: "15. Third-Party Services",
    s15P1:
      "Our website may contain links to third-party websites or use third-party services including payment gateways, social media platforms, video hosting, analytics providers, and communication tools.",
    s15P2:
      "The Foundation is not responsible for the content, availability, security, or privacy practices of these third-party services.",
    s15P3: "Users access such services at their own discretion.",
    s16Title: "16. Privacy",
    s16P1: "Your use of this website is also governed by our Privacy Policy.",
    s16P2:
      "By using this website, you consent to the collection, storage, and processing of your information in accordance with our Privacy Policy.",
    s17Title: "17. Disclaimer of Warranties",
    s17P1:
      "The website and its content are provided on an “as is” and “as available” basis.",
    s17P2:
      "While we strive to maintain accurate and up-to-date information, we make no warranties regarding:",
    s17L: [
      "Accuracy",
      "Completeness",
      "Reliability",
      "Availability",
      "Suitability",
      "Continuous operation",
    ],
    s17P3:
      "We do not guarantee that the website will be uninterrupted, secure, or free from technical errors.",
    s18Title: "18. Limitation of Liability",
    s18P1:
      "To the maximum extent permitted by applicable law, Sri Kandhaguru Foundation, its trustees, volunteers, employees, teachers, affiliates, and partners shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:",
    s18L: [
      "Use of the website",
      "Participation in Foundation activities",
      "Purchases",
      "Donations",
      "Reliance on website content",
      "Website interruptions",
      "Technical failures",
    ],
    s18P2: "Your use of the website is entirely at your own risk.",
    s19Title: "19. Indemnification",
    s19P1:
      "You agree to indemnify and hold harmless Sri Kandhaguru Foundation, its trustees, volunteers, employees, affiliates, and representatives from any claims, losses, liabilities, damages, expenses, or legal costs arising from:",
    s19L: [
      "Violation of these Terms",
      "Misuse of the website",
      "Violation of applicable laws",
      "Infringement of third-party rights",
    ],
    s20Title: "20. Suspension or Termination",
    s20P1:
      "The Foundation reserves the right to suspend or terminate access to the website, services, or user accounts without prior notice if these Terms are violated or if required by law.",
    s21Title: "21. Changes to the Terms",
    s21P1: "These Terms & Conditions may be updated from time to time.",
    s21P2:
      "Revised versions become effective immediately upon publication on the website.",
    s21P3:
      "Continued use of the website constitutes acceptance of the revised Terms.",
    s22Title: "22. Governing Law",
    s22P1:
      "These Terms shall be governed by and interpreted in accordance with the laws of India.",
    s22P2:
      "Any disputes arising from these Terms or the use of the website shall be subject to the exclusive jurisdiction of the courts having jurisdiction over the Foundation’s registered office.",
    s23Title: "23. Contact Information",
    s23P1:
      "For any questions regarding these Terms & Conditions, please contact:",
    address: "Address: Bhavani, Erode District, Tamil Nadu, India",
    email: "Email:",
  },
  ta: {
    legal: "சட்ட மற்றும் இணக்கம்",
    title: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    s1Title: "1. அறிமுகம்",
    s1P1: "ஸ்ரீ கந்தகுரு அறக்கட்டளையின் (“அறக்கட்டளை”, “நாங்கள்”, “எங்கள்”, அல்லது “எங்களை”) அதிகாரப்பூர்வ இணையதளத்திற்கு வரவேற்கிறோம்.",
    s1P2: "ஸ்ரீ கந்தகுரு அறக்கட்டளை ஒரு இலாப நோக்கற்ற ஆன்மீக அமைப்பாகும், இது ஆன்மீக வளர்ச்சி, மனிதாபிமான சேவை, முழுமையான நல்வாழ்வு மற்றும் இந்தியாவின் ஆன்மீக பாரம்பரியத்தை பாதுகாக்கும் அதே வேளையில் மஹா அவதார் பாபாஜியின் சிவ கிரியா யோகத்தின் புனிதமான போதனைகளை பகிர்ந்து கொள்வதற்காக அர்ப்பணிக்கப்பட்டுள்ளது.",
    s1P3: "இந்த இணையதளத்தை அணுகுவதன் மூலமோ, உலாவுவதன் மூலமோ, நன்கொடை அளிப்பதன் மூலமோ, தயாரிப்புகளை வாங்குவதன் மூலமோ, நிகழ்வுகளுக்குப் பதிவு செய்வதன் மூலமோ அல்லது பயன்படுத்துவதன் மூலமோ, இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளை நீங்கள் படித்து, புரிந்து கொண்டீர்கள், மேலும் அவற்றுக்குக் கட்டுப்பட ஒப்புக்கொள்கிறீர்கள் என்பதை ஒப்புக்கொள்கிறீர்கள்.",
    s2Title: "2. தகுதி",
    s2P1: "இந்த இணையதளத்தைப் பயன்படுத்துவதன் மூலம், பின்வருவனவற்றை உறுதிப்படுத்துகிறீர்கள்:",
    s2L: [
      "உங்களுக்கு குறைந்தபட்சம் 18 வயது அல்லது பெற்றோர் அல்லது சட்டப்பூர்வ பாதுகாவலரின் மேற்பார்வையில் இணையதளத்தைப் பயன்படுத்துகிறீர்கள்.",
      "பிணைப்பு ஒப்பந்தங்களில் நுழைவதற்கான சட்டத் திறன் உங்களுக்கு உள்ளது.",
      "நீங்கள் வழங்கிய அனைத்து தகவல்களும் உண்மை, துல்லியமான மற்றும் முழுமையானவை.",
    ],
    s3Title: "3. இணையதள பயன்பாடு",
    s3P1: "இந்த இணையதளத்தை சட்டப்பூர்வ நோக்கங்களுக்காக மட்டுமே பயன்படுத்த ஒப்புக்கொள்கிறீர்கள்.",
    s3P2: "நீங்கள் செய்யக்கூடாதவை:",
    s3L: [
      "மோசடி அல்லது சட்டவிரோத செயல்களுக்கு இணையதளத்தை பயன்படுத்த வேண்டாம்.",
      "இணையதளம் அல்லது அதன் சேவையகங்களின் எந்தப் பகுதிக்கும் அங்கீகரிக்கப்படாத அணுகலை முயற்சிக்க வேண்டாம்.",
      "வைரஸ்கள், தீம்பொருள் அல்லது தீங்கு விளைவிக்கும் குறியீட்டை அறிமுகப்படுத்த வேண்டாம்.",
      "அனுமதியின்றி இணையதள உள்ளடக்கத்தை நகலெடுக்க, இனப்பெருக்கம் செய்ய, மாற்ற அல்லது விநியோகிக்க வேண்டாம்.",
      "இணையதளத்தின் இயல்பான செயல்பாடு அல்லது பாதுகாப்பை சீர்குலைக்க வேண்டாம்.",
      "உங்கள் அடையாளத்தை தவறாகப் பிரதிநிதித்துவப்படுத்தவோ அல்லது பிற நபரையோ அமைப்பையோ ஆள்மாறாட்டம் செய்யவோ வேண்டாம்.",
    ],
    s3P3: "இணையதளத்தை தவறாகப் பயன்படுத்தினால் அணுகலைத் தற்காலிகமாக நிறுத்தி வைக்க அல்லது நிறுத்த எங்களுக்கு உரிமை உண்டு.",
    s4Title: "4. ஆன்மீக போதனைகள் மற்றும் கல்வி உள்ளடக்கம்",
    s4P1: "அறக்கட்டளை வழங்குகிறது:",
    s4L: [
      "சிவ கிரியா யோகம் போதனைகள்",
      "தியான அமர்வுகள்",
      "ஆன்மீக பின்வாங்கல்கள்",
      "பயிலரங்குகள்",
      "கருத்தரங்குகள்",
      "ஆன்லைன் கற்றல் வளங்கள்",
      "ஆரோக்கிய வழிகாட்டுதல்",
      "பக்தி இலக்கியம்",
    ],
    s4P2: "அனைத்து தகவல்களும் கல்வி, ஆன்மீகம் மற்றும் தனிப்பட்ட வளர்ச்சி நோக்கங்களுக்காக மட்டுமே.",
    s4P3: "எங்கள் போதனைகள் தொழில்முறை மருத்துவ, உளவியல், சட்ட, நிதி அல்லது பிற தொழில்முறை ஆலோசனைகளை மாற்றுவதற்காக அல்ல.",
    s5Title: "5. சுகாதார பொறுப்புத்துறப்பு",
    s5P1: "தியானம், பிராணயாமா, யோகப் பயிற்சிகள் மற்றும் ஆரோக்கிய நுட்பங்கள் அனைவருக்கும் பொருந்தாது.",
    s5P2: "ஏற்கனவே உள்ள மருத்துவ நிலைமைகள், சுவாசக் கோளாறுகள், கர்ப்பம், மனநலக் கவலைகள் அல்லது பிற சுகாதாரப் பிரச்சினைகள் உள்ளவர்கள் அறக்கட்டளை வழங்கும் எந்தவொரு நடைமுறையிலும் பங்கேற்பதற்கு முன்பு தகுதிவாய்ந்த சுகாதார நிபுணரை அணுக வேண்டும்.",
    s5P3: "எந்தவொரு திட்டத்திலும் பங்கேற்பது தன்னார்வமானது மற்றும் உங்கள் சொந்த பொறுப்பிலானது.",
    s5P4: "பங்கேற்பதால் ஏற்படும் உடல்நலம் தொடர்பான எந்த விளைவுகளுக்கும் அறக்கட்டளை பொறுப்பாகாது.",
    s6Title: "6. நன்கொடைகள்",
    s6P1: "ஆதரவளிப்பதற்காக அறக்கட்டளை தன்னார்வ நன்கொடைகளை நன்றியுடன் ஏற்றுக்கொள்கிறது:",
    s6L: [
      "கோவில் கட்டுமானம் மற்றும் சீரமைப்பு",
      "அன்னதானம்",
      "ஆன்மீக கல்வி",
      "கிராமப்புற நலத்திட்டங்கள்",
      "மருத்துவ முகாம்கள்",
      "கல்வி உதவி",
      "மனிதாபிமான நிவாரணம்",
      "கலாச்சார மற்றும் பாரம்பரிய பாதுகாப்பு",
    ],
    s6P2: "அனைத்து நன்கொடைகளும் தன்னார்வமானவை.",
    s6P3: "பொருந்தக்கூடிய சட்டத்தின்படி தேவைப்படாவிட்டால், வெற்றிகரமான செயலாக்கத்திற்குப் பிறகு நன்கொடைகள் திரும்பப் பெறப்படாது.",
    s6P4: "சட்டப்பூர்வமாக தேவைப்படும் இடங்களில் அல்லது மோசடி நடவடிக்கை என சந்தேகிக்கப்படும் இடங்களில் நன்கொடைகளை மறுக்க, ரத்து செய்ய அல்லது திருப்பி அளிக்க அறக்கட்டளைக்கு உரிமை உண்டு.",
    s6P5: "பொருந்தும் இடங்களில் நன்கொடை ரசீதுகள் வழங்கப்படும்.",
    s7Title: "7. கோவில் கட்டுமான பங்களிப்புகள்",
    s7P1: "கோவில் கட்டுமானம் அல்லது புனரமைப்புக்காக குறிப்பாக செய்யப்படும் பங்களிப்புகள் அந்தத் திட்டங்கள் தொடர்பான நடவடிக்கைகளுக்கு மட்டுமே பயன்படுத்தப்படும்.",
    s7P2: "ஒப்புதல்கள், நிதி கிடைக்கும் தன்மை, வானிலை நிலைமைகள், அரசாங்க விதிமுறைகள் மற்றும் பிற எதிர்பாராத சூழ்நிலைகளைப் பொறுத்து திட்ட காலக்கெடு மாறுபடலாம்.",
    s7P3: "இணையதளத்தில் காட்டப்படும் படங்கள் மற்றும் முன்னேற்ற புதுப்பிப்புகள் தகவல் நோக்கங்களுக்காக.",
    s8Title: "8. அதிகாரப்பூர்வ ஸ்டோர்",
    s8P1: "அறக்கட்டளை அதிகாரப்பூர்வ அங்காடியை இயக்குகிறது:",
    s8L: [
      "ஆன்மீக புத்தகங்கள்",
      "தியான வழிகாட்டிகள்",
      "பக்தி பொருட்கள்",
      "ஆரோக்கிய தயாரிப்புகள்",
      "ஆன்மீக பாகங்கள்",
      "கல்வி வளங்கள்",
    ],
    s8P2: "தயாரிப்பு கிடைக்கும் தன்மை இருப்புக்கு உட்பட்டது.",
    s8P3: "முன்னறிவிப்பின்றி தயாரிப்புகளை நிறுத்தவோ அல்லது விலையை மாற்றவோ அறக்கட்டளைக்கு உரிமை உண்டு.",
    s8P4: "தயாரிப்பு படங்கள் பிரதிநிதித்துவ நோக்கங்களுக்காக மற்றும் உண்மையான தயாரிப்புகள் சற்று மாறுபடலாம்.",
    s9Title: "9. ஆர்டர்கள் மற்றும் கொடுப்பனவுகள்",
    s9P1: "ஆர்டர் செய்யும்போது, ​​நீங்கள் ஒப்புக்கொள்கிறீர்கள்:",
    s9L: [
      "வழங்கப்பட்ட அனைத்து தகவல்களும் துல்லியமானவை.",
      "கட்டணத் தகவல் உங்களுக்குச் சொந்தமானது அல்லது முறையான அங்கீகாரத்துடன் பயன்படுத்தப்படுகிறது.",
      "ஆர்டர்கள் சரிபார்ப்புக்கு உட்பட்டவை.",
    ],
    s9P2: "நம்பகமான மூன்றாம் தரப்பு கட்டண நுழைவாயில்கள் மூலம் பாதுகாப்பாக கொடுப்பனவுகள் செயலாக்கப்படுகின்றன.",
    s9P3: "முழு கிரெடிட் கார்டு, டெபிட் கார்டு அல்லது வங்கிச் சான்றுகளை அறக்கட்டளை சேமிப்பதில்லை.",
    s9P4: "ஆர்டர் உறுதிப்படுத்தல் உங்கள் ஆர்டரைப் பெற்றதை ஒப்புக்கொள்கிறது மற்றும் கட்டண சரிபார்ப்பு மற்றும் செயலாக்கம் முடியும் வரை ஏற்பைக் கொண்டிருக்காது.",
    s10Title: "10. கப்பல் மற்றும் விநியோகம்",
    s10P1: "செக்அவுட்டின் போது வழங்கப்பட்ட முகவரிக்கு ஆர்டர்கள் அனுப்பப்படும்.",
    s10P2: "மதிப்பிடப்பட்ட விநியோக நேரங்கள் தோராயமானவை.",
    s10P3: "டெலிவரி தாமதங்கள் ஏற்படலாம்:",
    s10L: [
      "வானிலை நிலைமைகள்",
      "பொது விடுமுறை நாட்கள்",
      "போக்குவரத்து இடையூறுகள்",
      "கூரியர் பங்குதாரர் தாமதங்கள்",
      "இயற்கை பேரழிவுகள்",
      "அரசாங்க கட்டுப்பாடுகள்",
    ],
    s10P4:
      "அதன் நியாயமான கட்டுப்பாட்டிற்கு அப்பாற்பட்ட தாமதங்களுக்கு அறக்கட்டளை பொறுப்பல்ல.",
    s10P5: "துல்லியமான கப்பல் தகவல்களை வழங்குவதற்கு வாடிக்கையாளர்கள் பொறுப்பு.",
    s11Title: "11. வருவாய் மற்றும் பணத்தைத் திரும்பப் பெறுதல்",
    s11P1:
      "சேதமடைந்த, குறைபாடுள்ள அல்லது தவறான உடல் பொருட்கள் பெறப்பட்டால், டெலிவரி செய்யப்பட்ட 7 நாட்களுக்குள் தெரிவிக்கப்பட வேண்டும்.",
    s11P2: "சரிபார்க்கப்பட்டதும், அறக்கட்டளை வழங்கலாம்:",
    s11L1: ["மாற்று", "பரிமாற்றம்", "திரும்பப்பெறுதல்"],
    s11P3:
      "பொருந்தக்கூடிய இடங்களில் அசல் கட்டண முறையைப் பயன்படுத்தி பணத்தைத் திரும்பப் பெறுதல் செயல்படுத்தப்படும்.",
    s11P4: "பின்வருபவை பொதுவாக திரும்பப் பெற முடியாதவை:",
    s11L2: [
      "நன்கொடைகள்",
      "நிகழ்வு பதிவுகள்",
      "ஆன்லைன் படிப்புகள்",
      "டிஜிட்டல் பதிவிறக்கங்கள்",
      "தரவிறக்கம் செய்யக்கூடிய ஆன்மீக வளங்கள்",
      "பயன்படுத்தப்பட்ட பொருட்கள்",
      "தனிப்பயனாக்கப்பட்ட பொருட்கள்",
    ],
    s12Title: "12. நிகழ்வு பதிவுகள்",
    s12P1: "அறக்கட்டளை ஏற்பாடு செய்கிறது:",
    s12L: [
      "ஆன்மீக பின்வாங்கல்கள்",
      "தியான பட்டறைகள்",
      "யோகா அமர்வுகள்",
      "கருத்தரங்குகள்",
      "ஆன்லைன் நிகழ்வுகள்",
    ],
    s12P2:
      "அட்டவணைகள், பேச்சாளர்கள், இடங்கள் மற்றும் வடிவங்கள் முன்னறிவிப்பின்றி மாறலாம்.",
    s12P3:
      "எதிர்பாராத சூழ்நிலைகள் காரணமாக நிகழ்வுகளை ஒத்திவைக்க, மீண்டும் திட்டமிட அல்லது ரத்து செய்ய அறக்கட்டளைக்கு உரிமை உண்டு.",
    s13Title: "13. அறிவுசார் சொத்து",
    s13P1: "இந்த இணையதளத்தில் கிடைக்கும் அனைத்து உள்ளடக்கங்களும்:",
    s13L: [
      "லோகோக்கள்",
      "வர்த்தக முத்திரைகள்",
      "உரை",
      "படங்கள்",
      "வீடியோக்கள்",
      "ஆடியோ",
      "புத்தகங்கள்",
      "பாடப் பொருட்கள்",
      "கிராபிக்ஸ்",
      "வடிவமைப்புகள்",
      "பதிவிறக்கங்கள்",
      "வெளியீடுகள்",
    ],
    s13P2:
      "ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு சொந்தமானது அல்லது உரிமம் பெற்றது மற்றும் பொருந்தக்கூடிய பதிப்புரிமை, வர்த்தக முத்திரை மற்றும் அறிவுசார் சொத்து சட்டங்களின் கீழ் பாதுகாக்கப்படுகிறது.",
    s13P3:
      "முன் எழுத்துப்பூர்வ அனுமதியின்றி எந்த உள்ளடக்கத்தையும் நகலெடுக்க, மீண்டும் உருவாக்க, மறுபிரசுரம் செய்ய, விநியோகிக்க அல்லது வணிக ரீதியாக பயன்படுத்தக்கூடாது.",
    s14Title: "14. பயனர் உள்ளடக்கம்",
    s14P1: "நீங்கள் சமர்ப்பித்தால்:",
    s14L: [
      "சான்றுகள்",
      "விமர்சனங்கள்",
      "கருத்துகள்",
      "பின்னூட்டம்",
      "புகைப்படங்கள்",
      "வீடியோக்கள்",
    ],
    s14P2:
      "கல்வி, விளம்பர மற்றும் நிறுவன நோக்கங்களுக்காக அத்தகைய உள்ளடக்கத்தைப் பயன்படுத்த, வெளியிட, இனப்பெருக்கம் செய்ய மற்றும் காண்பிக்க, உலகளாவிய, ராயல்டி இல்லாத, பிரத்தியேகமற்ற உரிமத்தை நீங்கள் அறக்கட்டளைக்கு வழங்குகிறீர்கள்.",
    s14P3:
      "உங்கள் சமர்ப்பிப்புகள் எந்தவொரு மூன்றாம் தரப்பினரின் உரிமைகளையும் மீறாது என்பதை நீங்கள் உறுதிப்படுத்துகிறீர்கள்.",
    s15Title: "15. மூன்றாம் தரப்பு சேவைகள்",
    s15P1:
      "எங்கள் இணையதளத்தில் மூன்றாம் தரப்பு இணையதளங்களுக்கான இணைப்புகள் இருக்கலாம் அல்லது பேமெண்ட் கேட்வேகள், சமூக ஊடக தளங்கள், வீடியோ ஹோஸ்டிங், பகுப்பாய்வு வழங்குநர்கள் மற்றும் தகவல் தொடர்பு கருவிகள் உள்ளிட்ட மூன்றாம் தரப்பு சேவைகளைப் பயன்படுத்தலாம்.",
    s15P2:
      "இந்த மூன்றாம் தரப்பு சேவைகளின் உள்ளடக்கம், கிடைக்கும் தன்மை, பாதுகாப்பு அல்லது தனியுரிமை நடைமுறைகளுக்கு அறக்கட்டளை பொறுப்பல்ல.",
    s15P3: "பயனர்கள் அத்தகைய சேவைகளை தங்கள் சொந்த விருப்பப்படி அணுகலாம்.",
    s16Title: "16. தனியுரிமை",
    s16P1:
      "இந்த இணையதளத்தின் உங்கள் பயன்பாடு எங்கள் தனியுரிமைக் கொள்கையால் நிர்வகிக்கப்படுகிறது.",
    s16P2:
      "இந்த இணையதளத்தைப் பயன்படுத்துவதன் மூலம், எங்களின் தனியுரிமைக் கொள்கையின்படி உங்களின் தகவல்களைச் சேகரிப்பதற்கும், சேமிப்பதற்கும், செயலாக்குவதற்கும் நீங்கள் ஒப்புக்கொள்கிறீர்கள்.",
    s17Title: "17. உத்தரவாதங்களின் மறுப்பு",
    s17P1:
      "இணையதளம் மற்றும் அதன் உள்ளடக்கம் “உள்ளபடியே” மற்றும் “கிடைக்கும்படியே” அடிப்படையில் வழங்கப்படுகின்றன.",
    s17P2:
      "துல்லியமான மற்றும் புதுப்பித்த தகவலைப் பராமரிக்க நாங்கள் முயற்சிக்கும்போது, ​​இதன் தொடர்பாக நாங்கள் எந்த உத்தரவாதமும் அளிக்கவில்லை:",
    s17L: [
      "துல்லியம்",
      "முழுமை",
      "நம்பகத்தன்மை",
      "கிடைக்கும் தன்மை",
      "பொருத்தம்",
      "தொடர்ச்சியான செயல்பாடு",
    ],
    s17P3:
      "இணையதளம் தடையற்றதாகவோ, பாதுகாப்பானதாகவோ அல்லது தொழில்நுட்ப பிழைகள் இல்லாததாகவோ இருக்கும் என்று நாங்கள் உத்தரவாதம் அளிக்கவில்லை.",
    s18Title: "18. பொறுப்பின் வரம்பு",
    s18P1:
      "பொருந்தக்கூடிய சட்டத்தால் அனுமதிக்கப்பட்ட அதிகபட்ச வரம்பிற்கு, ஸ்ரீ கந்தகுரு அறக்கட்டளை, அதன் அறங்காவலர்கள், தொண்டர்கள், ஊழியர்கள், ஆசிரியர்கள், துணை நிறுவனங்கள் மற்றும் கூட்டாளர்கள் எந்தவொரு நேரடி, மறைமுக, தற்செயலான, விளைவான, சிறப்பு அல்லது தண்டனைக்குரிய சேதங்களுக்கும் பொறுப்பேற்க மாட்டார்கள்:",
    s18L: [
      "இணையதளத்தின் பயன்பாடு",
      "அறக்கட்டளை நடவடிக்கைகளில் பங்கேற்பது",
      "கொள்முதல்",
      "நன்கொடைகள்",
      "இணையதள உள்ளடக்கத்தை நம்பியிருப்பது",
      "இணையதள குறுக்கீடுகள்",
      "தொழில்நுட்ப தோல்விகள்",
    ],
    s18P2:
      "இணையதளத்தை நீங்கள் பயன்படுத்துவது முற்றிலும் உங்கள் சொந்த ஆபத்திலானது.",
    s19Title: "19. இழப்பீடு",
    s19P1:
      "எழும் எந்தவொரு உரிமைகோரல்கள், இழப்புகள், பொறுப்புகள், சேதங்கள், செலவுகள் அல்லது சட்டச் செலவுகளிலிருந்து ஸ்ரீ கந்தகுரு அறக்கட்டளை, அதன் அறங்காவலர்கள், தொண்டர்கள், பணியாளர்கள், துணை நிறுவனங்கள் மற்றும் பிரதிநிதிகளுக்கு இழப்பீடு வழங்கவும் பாதிப்பில்லாமல் வைத்திருக்கவும் நீங்கள் ஒப்புக்கொள்கிறீர்கள்:",
    s19L: [
      "இந்த விதிமுறைகளின் மீறல்",
      "இணையதளத்தின் தவறான பயன்பாடு",
      "பொருந்தக்கூடிய சட்டங்களை மீறுதல்",
      "மூன்றாம் தரப்பு உரிமைகளை மீறுதல்",
    ],
    s20Title: "20. இடைநிறுத்தம் அல்லது நிறுத்துதல்",
    s20P1:
      "இந்த விதிமுறைகள் மீறப்பட்டாலோ அல்லது சட்டப்படி தேவைப்பட்டாலோ முன்னறிவிப்பின்றி இணையதளம், சேவைகள் அல்லது பயனர் கணக்குகளுக்கான அணுகலை இடைநிறுத்தவோ அல்லது நிறுத்தவோ அறக்கட்டளைக்கு உரிமை உள்ளது.",
    s21Title: "21. விதிமுறைகளில் மாற்றங்கள்",
    s21P1:
      "இந்த விதிமுறைகள் மற்றும் நிபந்தனைகள் அவ்வப்போது புதுப்பிக்கப்படலாம்.",
    s21P2:
      "திருத்தப்பட்ட பதிப்புகள் இணையதளத்தில் வெளியிடப்பட்டவுடன் உடனடியாக நடைமுறைக்கு வரும்.",
    s21P3:
      "இணையதளத்தின் தொடர்ச்சியான பயன்பாடு திருத்தப்பட்ட விதிமுறைகளை ஏற்றுக்கொள்வதாக அமையும்.",
    s22Title: "22. ஆளும் சட்டம்",
    s22P1:
      "இந்த விதிமுறைகள் இந்தியாவின் சட்டங்களுக்கு இணங்க நிர்வகிக்கப்படும் மற்றும் விளக்கப்படும்.",
    s22P2:
      "இந்த விதிமுறைகள் அல்லது இணையதளத்தின் பயன்பாட்டினால் எழும் எந்தவொரு தகராறுகளும் அறக்கட்டளையின் பதிவு செய்யப்பட்ட அலுவலகத்தின் மீது அதிகார வரம்பைக் கொண்ட நீதிமன்றங்களின் பிரத்தியேக அதிகார வரம்பிற்கு உட்பட்டது.",
    s23Title: "23. தொடர்புத் தகவல்",
    s23P1:
      "இந்த விதிமுறைகள் மற்றும் நிபந்தனைகள் தொடர்பான ஏதேனும் கேள்விகளுக்கு, தயவுசெய்து தொடர்பு கொள்ளவும்:",
    address: "முகவரி: பவானி, ஈரோடு மாவட்டம், தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்:",
  },
  hi: {
    legal: "कानूनी और अनुपालन",
    title: "नियम और शर्तें",
    lastUpdated: "अंतिम अद्यतन:",
    s1Title: "1. परिचय",
    s1P1: "श्री कंधगुरु फाउंडेशन (“फाउंडेशन”, “हम”, “हमारा”, या “हमें”) की आधिकारिक वेबसाइट पर आपका स्वागत है।",
    s1P2: "श्री कंधगुरु फाउंडेशन एक गैर-लाभकारी आध्यात्मिक संगठन है जो आध्यात्मिक विकास, मानवीय सेवा, समग्र कल्याण और भारत की आध्यात्मिक विरासत के संरक्षण को बढ़ावा देते हुए महावतार बाबाजी शिव क्रिया योग की पवित्र शिक्षाओं को साझा करने के लिए समर्पित है।",
    s1P3: "इस वेबसाइट को एक्सेस करने, ब्राउज़ करने, दान करने, उत्पाद खरीदने, घटनाओं के लिए पंजीकरण करने या अन्यथा उपयोग करने से, आप स्वीकार करते हैं कि आपने इन नियमों और शर्तों को पढ़, समझ लिया है और इनसे बाध्य होने के लिए सहमत हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया वेबसाइट का उपयोग बंद कर दें।",
    s2Title: "2. पात्रता",
    s2P1: "इस वेबसाइट का उपयोग करके, आप पुष्टि करते हैं कि:",
    s2L: [
      "आपकी आयु कम से कम 18 वर्ष है या माता-पिता या कानूनी अभिभावक की देखरेख में वेबसाइट का उपयोग कर रहे हैं।",
      "आपके पास बाध्यकारी समझौते करने की कानूनी क्षमता है।",
      "आपके द्वारा प्रदान की गई सभी जानकारी सत्य, सटीक और पूर्ण है।",
    ],
    s3Title: "3. वेबसाइट उपयोग",
    s3P1: "आप इस वेबसाइट का उपयोग केवल वैध उद्देश्यों के लिए करने के लिए सहमत हैं।",
    s3P2: "आप नहीं करेंगे:",
    s3L: [
      "धोखाधड़ी या अवैध गतिविधियों के लिए वेबसाइट का उपयोग करें।",
      "वेबसाइट या इसके सर्वर के किसी भी हिस्से तक अनधिकृत पहुंच का प्रयास करें।",
      "वायरस, मैलवेयर, या हानिकारक कोड पेश करें।",
      "बिना अनुमति के वेबसाइट सामग्री की प्रतिलिपि बनाना, पुनरुत्पादन करना, संशोधित करना या वितरित करना।",
      "वेबसाइट के सामान्य कामकाज या सुरक्षा को बाधित करें।",
      "अपनी पहचान गलत बताएं या किसी अन्य व्यक्ति या संगठन का रूप धारण करें।",
    ],
    s3P3: "हम वेबसाइट के किसी भी दुरुपयोग के लिए पहुंच को निलंबित या समाप्त करने का अधिकार सुरक्षित रखते हैं।",
    s4Title: "4. आध्यात्मिक शिक्षाएं और शैक्षिक सामग्री",
    s4P1: "फाउंडेशन प्रदान करता है:",
    s4L: [
      "शिव क्रिया योग शिक्षाएं",
      "ध्यान सत्र",
      "आध्यात्मिक रिट्रीट",
      "कार्यशालाएं",
      "संगोष्ठियाँ",
      "ऑनलाइन शिक्षण संसाधन",
      "कल्याण मार्गदर्शन",
      "भक्ति साहित्य",
    ],
    s4P2: "सभी जानकारी केवल शैक्षिक, आध्यात्मिक और व्यक्तिगत विकास उद्देश्यों के लिए है।",
    s4P3: "हमारी शिक्षाओं का उद्देश्य पेशेवर चिकित्सा, मनोवैज्ञानिक, कानूनी, वित्तीय या अन्य पेशेवर सलाह को प्रतिस्थापित करना नहीं है।",
    s5Title: "5. स्वास्थ्य अस्वीकरण",
    s5P1: "ध्यान, प्राणायाम, यौगिक अभ्यास और कल्याण तकनीकें हर किसी के लिए उपयुक्त नहीं हो सकती हैं।",
    s5P2: "मौजूदा चिकित्सा स्थितियों, श्वसन संबंधी विकारों, गर्भावस्था, मानसिक स्वास्थ्य संबंधी चिंताओं या अन्य स्वास्थ्य समस्याओं वाले व्यक्तियों को फाउंडेशन द्वारा प्रस्तावित किसी भी अभ्यास में भाग लेने से पहले एक योग्य स्वास्थ्य देखभाल पेशेवर से परामर्श करना चाहिए।",
    s5P3: "किसी भी कार्यक्रम में भागीदारी स्वैच्छिक है और आपकी अपनी जिम्मेदारी पर है।",
    s5P4: "भागीदारी से उत्पन्न होने वाले किसी भी स्वास्थ्य संबंधी परिणाम के लिए फाउंडेशन उत्तरदायी नहीं होगा।",
    s6Title: "6. दान",
    s6P1: "फाउंडेशन समर्थन के लिए स्वैच्छिक दान कृतज्ञतापूर्वक स्वीकार करता है:",
    s6L: [
      "मंदिर निर्माण एवं जीर्णोद्धार",
      "अन्नदान",
      "आध्यात्मिक शिक्षा",
      "ग्रामीण कल्याण पहल",
      "स्वास्थ्य शिविर",
      "शैक्षिक सहायता",
      "मानवीय राहत",
      "सांस्कृतिक एवं विरासत संरक्षण",
    ],
    s6P2: "सभी दान स्वैच्छिक हैं।",
    s6P3: "जब तक लागू कानून द्वारा आवश्यक न हो, सफल प्रसंस्करण के बाद दान गैर-वापसी योग्य है।",
    s6P4: "फाउंडेशन उन स्थानों पर दान को अस्वीकार करने, रद्द करने या वापस करने का अधिकार सुरक्षित रखता है जहां कानूनी रूप से आवश्यक हो या जहां धोखाधड़ी गतिविधि का संदेह हो।",
    s6P5: "जहां लागू हो वहां दान रसीदें जारी की जाएंगी।",
    s7Title: "7. मंदिर निर्माण में योगदान",
    s7P1: "विशेष रूप से मंदिर निर्माण या नवीनीकरण के लिए किए गए योगदान का उपयोग पूरी तरह से उन परियोजनाओं से जुड़ी गतिविधियों के लिए किया जाएगा।",
    s7P2: "अनुमोदन, धन की उपलब्धता, मौसम की स्थिति, सरकारी नियमों और अन्य अप्रत्याशित परिस्थितियों के आधार पर परियोजना की समय-सीमा भिन्न हो सकती है।",
    s7P3: "वेबसाइट पर प्रदर्शित चित्र और प्रगति अद्यतन सूचनात्मक उद्देश्यों के लिए हैं।",
    s8Title: "8. आधिकारिक स्टोर",
    s8P1: "फाउंडेशन एक आधिकारिक स्टोर संचालित करता है जिसमें पेशकश की जाती है:",
    s8L: [
      "आध्यात्मिक पुस्तकें",
      "ध्यान गाइड",
      "भक्ति वस्तुएं",
      "कल्याण उत्पाद",
      "आध्यात्मिक सहायक उपकरण",
      "शैक्षिक संसाधन",
    ],
    s8P2: "उत्पाद की उपलब्धता स्टॉक के अधीन है।",
    s8P3: "फाउंडेशन बिना पूर्व सूचना के उत्पादों को बंद करने या कीमत को संशोधित करने का अधिकार सुरक्षित रखता है।",
    s8P4: "उत्पाद छवियां प्रतिनिधित्व उद्देश्यों के लिए हैं और वास्तविक उत्पाद थोड़े भिन्न हो सकते हैं।",
    s9Title: "9. आदेश एवं भुगतान",
    s9P1: "ऑर्डर देते समय, आप सहमत होते हैं कि:",
    s9L: [
      "प्रदान की गई सभी जानकारी सटीक है।",
      "भुगतान की जानकारी आपकी है या उचित प्राधिकरण के साथ उपयोग की जाती है।",
      "आदेश सत्यापन के अधीन हैं।",
    ],
    s9P2: "विश्वसनीय तृतीय-पक्ष भुगतान गेटवे के माध्यम से भुगतान सुरक्षित रूप से संसाधित किए जाते हैं।",
    s9P3: "फाउंडेशन पूर्ण क्रेडिट कार्ड, डेबिट कार्ड या बैंकिंग क्रेडेंशियल संग्रहीत नहीं करता है।",
    s9P4: "एक आदेश पुष्टिकरण आपके आदेश की प्राप्ति को स्वीकार करता है और भुगतान सत्यापन और प्रसंस्करण पूरा होने तक स्वीकृति का गठन नहीं करता है।",
    s10Title: "10. शिपिंग एवं डिलीवरी",
    s10P1: "ऑर्डर चेकआउट के दौरान दिए गए पते पर भेज दिए जाते हैं।",
    s10P2: "अनुमानित डिलीवरी समय अनुमानित हैं।",
    s10P3: "डिलीवरी में देरी के कारण हो सकते हैं:",
    s10L: [
      "मौसम की स्थिति",
      "सार्वजनिक छुट्टियाँ",
      "परिवहन व्यवधान",
      "कूरियर पार्टनर की देरी",
      "प्राकृतिक आपदाएं",
      "सरकारी प्रतिबंध",
    ],
    s10P4: "फाउंडेशन अपने उचित नियंत्रण से परे देरी के लिए ज़िम्मेदार नहीं है।",
    s10P5: "सटीक शिपिंग जानकारी प्रदान करने के लिए ग्राहक ज़िम्मेदार हैं।",
    s11Title: "11. रिटर्न और रिफंड",
    s11P1:
      "क्षतिग्रस्त, दोषपूर्ण या गलत प्राप्त भौतिक उत्पादों की सूचना डिलीवरी के 7 दिनों के भीतर दी जानी चाहिए।",
    s11P2: "सत्यापन पर, फाउंडेशन पेशकश कर सकता है:",
    s11L1: ["प्रतिस्थापन", "विनियम", "धनवापसी"],
    s11P3:
      "जहां लागू हो, मूल भुगतान विधि का उपयोग करके रिफंड की प्रक्रिया की जाएगी।",
    s11P4: "निम्नलिखित आम तौर पर गैर-वापसी योग्य हैं:",
    s11L2: [
      "दान",
      "ईवेंट पंजीकरण",
      "ऑनलाइन पाठ्यक्रम",
      "डिजिटल डाउनलोड",
      "डाउनलोड करने योग्य आध्यात्मिक संसाधन",
      "प्रयुक्त उत्पाद",
      "अनुकूलित वस्तुएं",
    ],
    s12Title: "12. ईवेंट पंजीकरण",
    s12P1: "फाउंडेशन आयोजन करता है:",
    s12L: [
      "आध्यात्मिक रिट्रीट",
      "ध्यान कार्यशालाएं",
      "योग सत्र",
      "संगोष्ठियाँ",
      "ऑनलाइन कार्यक्रम",
    ],
    s12P2:
      "शेड्यूल, स्पीकर, स्थान और प्रारूप बिना किसी पूर्व सूचना के बदल सकते हैं।",
    s12P3:
      "अप्रत्याशित परिस्थितियों के कारण फाउंडेशन घटनाओं को स्थगित करने, पुनर्निर्धारित करने या रद्द करने का अधिकार सुरक्षित रखता है।",
    s13Title: "13. बौद्धिक संपदा",
    s13P1: "इस वेबसाइट पर उपलब्ध सभी सामग्री, जिनमें शामिल हैं:",
    s13L: [
      "लोगो",
      "ट्रेडमार्क",
      "मूलपाठ",
      "इमेजिस",
      "वीडियो",
      "ऑडियो",
      "पुस्तकें",
      "पाठ्य सामग्री",
      "ग्राफिक्स",
      "डिजाइन",
      "डाउनलोड",
      "प्रकाशन",
    ],
    s13P2:
      "श्री कंधगुरु फाउंडेशन के स्वामित्व या लाइसेंस प्राप्त है और लागू कॉपीराइट, ट्रेडमार्क और बौद्धिक संपदा कानूनों के तहत संरक्षित है।",
    s13P3:
      "बिना पूर्व लिखित अनुमति के किसी भी सामग्री की प्रतिलिपि, पुनरुत्पादन, पुनर्प्रकाशन, वितरण या व्यावसायिक रूप से शोषण नहीं किया जा सकता है।",
    s14Title: "14. उपयोगकर्ता सामग्री",
    s14P1: "यदि आप सबमिट करते हैं:",
    s14L: [
      "प्रशंसापत्र",
      "समीक्षा",
      "टिप्पणियाँ",
      "प्रतिक्रिया",
      "तस्वीरें",
      "वीडियो",
    ],
    s14P2:
      "आप शैक्षिक, प्रचारक और संगठनात्मक उद्देश्यों के लिए ऐसी सामग्री का उपयोग, प्रकाशन, पुनरुत्पादन और प्रदर्शित करने के लिए फाउंडेशन को दुनिया भर में, रॉयल्टी-मुक्त, गैर-अनन्य लाइसेंस प्रदान करते हैं।",
    s14P3:
      "आप पुष्टि करते हैं कि आपके सबमिशन किसी भी तीसरे पक्ष के अधिकारों का उल्लंघन नहीं करते हैं।",
    s15Title: "15. तृतीय-पक्ष सेवाएँ",
    s15P1:
      "हमारी वेबसाइट में तृतीय-पक्ष वेबसाइटों के लिंक हो सकते हैं या भुगतान गेटवे, सोशल मीडिया प्लेटफॉर्म, वीडियो होस्टिंग, एनालिटिक्स प्रदाताओं और संचार उपकरणों सहित तृतीय-पक्ष सेवाओं का उपयोग किया जा सकता है।",
    s15P2:
      "फाउंडेशन इन तृतीय-पक्ष सेवाओं की सामग्री, उपलब्धता, सुरक्षा या गोपनीयता प्रथाओं के लिए ज़िम्मेदार नहीं है।",
    s15P3: "उपयोगकर्ता अपने विवेक से ऐसी सेवाओं तक पहुंचते हैं।",
    s16Title: "16. गोपनीयता",
    s16P1:
      "इस वेबसाइट का आपका उपयोग हमारी गोपनीयता नीति द्वारा भी शासित होता है।",
    s16P2:
      "इस वेबसाइट का उपयोग करके, आप हमारी गोपनीयता नीति के अनुसार अपनी जानकारी के संग्रह, भंडारण और प्रसंस्करण के लिए सहमति देते हैं।",
    s17Title: "17. वारंटी का अस्वीकरण",
    s17P1:
      "वेबसाइट और उसकी सामग्री “जैसा है” और “जैसा उपलब्ध है” के आधार पर प्रदान की जाती है।",
    s17P2:
      "हालाँकि हम सटीक और अद्यतन जानकारी बनाए रखने का प्रयास करते हैं, हम इनके संबंध में कोई वारंटी नहीं देते हैं:",
    s17L: [
      "शुद्धता",
      "पूर्णता",
      "विश्वसनीयता",
      "उपलब्धता",
      "उपयुक्तता",
      "निरंतर संचालन",
    ],
    s17P3:
      "हम इस बात की गारंटी नहीं देते हैं कि वेबसाइट निर्बाध, सुरक्षित या तकनीकी त्रुटियों से मुक्त होगी।",
    s18Title: "18. दायित्व की सीमा",
    s18P1:
      "लागू कानून द्वारा अनुमत अधिकतम सीमा तक, श्री कंधगुरु फाउंडेशन, इसके ट्रस्टी, स्वयंसेवक, कर्मचारी, शिक्षक, सहयोगी और भागीदार किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, परिणामी, विशेष या दंडात्मक क्षति के लिए उत्तरदायी नहीं होंगे:",
    s18L: [
      "वेबसाइट का उपयोग",
      "फाउंडेशन गतिविधियों में भागीदारी",
      "खरीद",
      "दान",
      "वेबसाइट सामग्री पर निर्भरता",
      "वेबसाइट रुकावटें",
      "तकनीकी विफलताएँ",
    ],
    s18P2: "वेबसाइट का आपका उपयोग पूरी तरह से आपके अपने जोखिम पर है।",
    s19Title: "19. क्षतिपूर्ति",
    s19P1:
      "आप किसी भी दावे, हानि, देनदारियों, क्षति, व्यय या कानूनी लागत से श्री कंधगुरु फाउंडेशन, इसके ट्रस्टियों, स्वयंसेवकों, कर्मचारियों, सहयोगियों और प्रतिनिधियों को क्षतिपूर्ति करने और हानिरहित रखने के लिए सहमत हैं:",
    s19L: [
      "इन शर्तों का उल्लंघन",
      "वेबसाइट का दुरुपयोग",
      "लागू कानूनों का उल्लंघन",
      "तीसरे पक्ष के अधिकारों का उल्लंघन",
    ],
    s20Title: "20. निलंबन या समाप्ति",
    s20P1:
      "यदि इन शर्तों का उल्लंघन किया जाता है या यदि कानून द्वारा आवश्यक हो तो फाउंडेशन बिना किसी पूर्व सूचना के वेबसाइट, सेवाओं या उपयोगकर्ता खातों तक पहुंच को निलंबित या समाप्त करने का अधिकार सुरक्षित रखता है।",
    s21Title: "21. शर्तों में परिवर्तन",
    s21P1: "इन नियमों और शर्तों को समय-समय पर अद्यतन किया जा सकता है।",
    s21P2:
      "संशोधित संस्करण वेबसाइट पर प्रकाशन के तुरंत बाद प्रभावी हो जाते हैं।",
    s21P3: "वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाएगा।",
    s22Title: "22. शासी कानून",
    s22P1:
      "इन शर्तों को भारत के कानूनों के अनुसार शासित और व्याख्यायित किया जाएगा।",
    s22P2:
      "इन शर्तों या वेबसाइट के उपयोग से उत्पन्न होने वाला कोई भी विवाद फाउंडेशन के पंजीकृत कार्यालय पर अधिकार क्षेत्र रखने वाले न्यायालयों के विशेष क्षेत्राधिकार के अधीन होगा।",
    s23Title: "23. संपर्क जानकारी",
    s23P1:
      "इन नियमों और शर्तों के संबंध में किसी भी प्रश्न के लिए, कृपया संपर्क करें:",
    address: "पता: भवानी, इरोड जिला, तमिलनाडु, भारत",
    email: "ईमेल:",
  },
};

export default function TermsAndConditions() {
  const { language } = useLanguage();
  const t =
    translations[language as keyof typeof translations] || translations.en;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[0rem] shadow-[0_10px_40px_rgb(0,0,0,0.05)] border border-gray-100 p-8 md:p-14"
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-brand-primary"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase">
              {t.legal}
            </span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-brand-primary"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-semibold text-gray-900 mb-10 tracking-tight">
            {t.title}
          </h1>

          <div className="space-y-8 text-gray-600 leading-relaxed text-lg font-light text-justify">
            <p className="text-gray-500 text-base border-b border-gray-100 pb-6">
              <strong>{t.lastUpdated}</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s1Title}
              </h2>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
              <p>{t.s1P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s2Title}
              </h2>
              <p>{t.s2P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s2L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s3Title}
              </h2>
              <p>{t.s3P1}</p>
              <p>{t.s3P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s3L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s3P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s4Title}
              </h2>
              <p>{t.s4P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s4L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s4P2}</p>
              <p>{t.s4P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s5Title}
              </h2>
              <p>{t.s5P1}</p>
              <p>{t.s5P2}</p>
              <p>{t.s5P3}</p>
              <p>{t.s5P4}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s6Title}
              </h2>
              <p>{t.s6P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s6L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s6P2}</p>
              <p>{t.s6P3}</p>
              <p>{t.s6P4}</p>
              <p>{t.s6P5}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s7Title}
              </h2>
              <p>{t.s7P1}</p>
              <p>{t.s7P2}</p>
              <p>{t.s7P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s8Title}
              </h2>
              <p>{t.s8P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s8L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s8P2}</p>
              <p>{t.s8P3}</p>
              <p>{t.s8P4}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s9Title}
              </h2>
              <p>{t.s9P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s9L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s9P2}</p>
              <p>{t.s9P3}</p>
              <p>{t.s9P4}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s10Title}
              </h2>
              <p>{t.s10P1}</p>
              <p>{t.s10P2}</p>
              <p>{t.s10P3}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s10L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s10P4}</p>
              <p>{t.s10P5}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s11Title}
              </h2>
              <p>{t.s11P1}</p>
              <p>{t.s11P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s11L1.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s11P3}</p>
              <p>{t.s11P4}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s11L2.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s12Title}
              </h2>
              <p>{t.s12P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s12L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s12P2}</p>
              <p>{t.s12P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s13Title}
              </h2>
              <p>{t.s13P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s13L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s13P2}</p>
              <p>{t.s13P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s14Title}
              </h2>
              <p>{t.s14P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s14L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s14P2}</p>
              <p>{t.s14P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s15Title}
              </h2>
              <p>{t.s15P1}</p>
              <p>{t.s15P2}</p>
              <p>{t.s15P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s16Title}
              </h2>
              <p>{t.s16P1}</p>
              <p>{t.s16P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s17Title}
              </h2>
              <p>{t.s17P1}</p>
              <p>{t.s17P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s17L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s17P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s18Title}
              </h2>
              <p>{t.s18P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s18L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s18P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s19Title}
              </h2>
              <p>{t.s19P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s19L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s20Title}
              </h2>
              <p>{t.s20P1}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s21Title}
              </h2>
              <p>{t.s21P1}</p>
              <p>{t.s21P2}</p>
              <p>{t.s21P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s22Title}
              </h2>
              <p>{t.s22P1}</p>
              <p>{t.s22P2}</p>
            </section>

            <section className="space-y-4 mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.s23Title}
              </h2>
              <p>{t.s23P1}</p>
              <div className="bg-gray-50 p-6 rounded-xl mt-4 border border-gray-200">
                <p className="font-semibold text-gray-900">
                  Sri Kandhaguru Foundation
                </p>
                <p>{t.address}</p>
                <p>
                  {t.email}{" "}
                  <a
                    href="mailto:srikandhagurufoundation@gmail.com"
                    className="text-brand-primary font-medium hover:underline break-all"
                  >
                    srikandhagurufoundation@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
