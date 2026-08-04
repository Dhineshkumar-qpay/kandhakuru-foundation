"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const translations = {
  en: {
    legal: "Legal & Compliance",
    title: "Cancellation & Refund Policy",
    lastUpdated: "Last Updated:",
    introP1: "At Sri Kandhaguru Foundation, we are committed to maintaining transparency and fairness in all transactions. This Cancellation & Refund Policy outlines the terms applicable to donations, purchases, event registrations, and other services offered through our website.",
    introP2: "By making a donation, purchasing products, or registering for programs through our website, you agree to the terms of this policy.",
    s1Title: "1. Donations",
    s1P1: "Donations made to Sri Kandhaguru Foundation are voluntary contributions that support our spiritual, charitable, educational, humanitarian, and temple-related initiatives.",
    s1P2: "These include, but are not limited to:",
    s1L1: [
      "Temple construction and renovation",
      "Annadanam (Food Distribution)",
      "Spiritual education and outreach",
      "Community welfare programs",
      "Healthcare initiatives",
      "Educational assistance",
      "Heritage preservation"
    ],
    s1P3: "As donations are utilized to further these charitable objectives, all donations are generally non-refundable once the payment has been successfully processed.",
    s1P4: "However, a refund may be considered only under exceptional circumstances, including:",
    s1L2: [
      "Duplicate payment due to a technical error.",
      "Incorrect amount charged because of a payment gateway issue.",
      "Unauthorized transaction verified by the Foundation and the payment service provider."
    ],
    s1P5: "Approved refunds will be processed to the original payment method within a reasonable timeframe, subject to banking and payment gateway processing times.",
    s2Title: "2. Event Registrations",
    s2P1: "The Foundation organizes various spiritual activities, including:",
    s2L1: [
      "Meditation sessions",
      "Shiva Kriya Yogam workshops",
      "Retreats",
      "Seminars",
      "Online courses",
      "Spiritual gatherings"
    ],
    s2Sub1: "Cancellation by Participants",
    s2P2: "If you are unable to attend an event, cancellation requests must be submitted in writing to the Foundation before the event begins.",
    s2P3: "Refund eligibility, if applicable, will depend on the nature of the event, expenses already incurred, and the cancellation timeline.",
    s2P4: "Certain events may be specifically designated as non-refundable, and this will be communicated during registration.",
    s2Sub2: "Cancellation by the Foundation",
    s2P5: "Sri Kandhaguru Foundation reserves the right to postpone, reschedule, relocate, or cancel any event due to unforeseen circumstances, including but not limited to insufficient registrations, adverse weather, venue constraints, government regulations, or force majeure events.",
    s2P6: "Where an event is cancelled by the Foundation, participants may be offered one of the following, at the Foundation’s discretion:",
    s2L2: [
      "Rescheduling to a future event.",
      "Transfer of registration to another eligible program.",
      "Full or partial refund of the registration fee, where applicable."
    ],
    s2P7: "The Foundation shall not be responsible for any travel, accommodation, or incidental expenses incurred by participants.",
    s3Title: "3. Official Store Purchases",
    s3P1: "The Foundation’s Official Store offers spiritual books, devotional items, wellness products, meditation resources, and other related merchandise.",
    s3Sub1: "Order Cancellation",
    s3P2: "Orders may be cancelled only if they have not yet been processed or dispatched.",
    s3P3: "Once an order has been shipped, cancellation requests cannot be accepted.",
    s3P4: "The Foundation reserves the right to cancel any order due to:",
    s3L1: [
      "Product unavailability.",
      "Pricing or typographical errors.",
      "Payment verification issues.",
      "Suspected fraudulent activity.",
      "Legal or regulatory requirements."
    ],
    s3P5: "If an order is cancelled by the Foundation after payment has been received, the amount paid will be refunded to the original payment method.",
    s4Title: "4. Returns",
    s4P1: "Customers should inspect their order immediately upon delivery.",
    s4P2: "Returns may be accepted only in the following situations:",
    s4L1: [
      "Incorrect product received.",
      "Product received in a damaged condition.",
      "Manufacturing defect.",
      "Missing items in the package."
    ],
    s4P3: "To initiate a return, customers must contact the Foundation within 7 days of receiving the product and provide:",
    s4L2: [
      "Order number.",
      "Description of the issue.",
      "Clear photographs of the product and packaging."
    ],
    s4P4: "Returned products must be unused, in their original condition, and accompanied by the original packaging wherever reasonably possible.",
    s4P5: "The Foundation reserves the right to inspect returned products before approving any replacement or refund.",
    s5Title: "5. Non-Returnable Items",
    s5P1: "The following items are generally not eligible for return or refund:",
    s5L1: [
      "Donations.",
      "Digital downloads.",
      "Online courses.",
      "Downloadable educational materials.",
      "Event registrations marked as non-refundable.",
      "Gift vouchers (if applicable).",
      "Personalized or custom-made products.",
      "Products damaged due to misuse or improper handling after delivery."
    ],
    s6Title: "6. Refund Process",
    s6P1: "Once a refund request has been reviewed and approved, the refund will be initiated using the original payment method.",
    s6P2: "Processing times may vary depending on the payment gateway, banking institution, or card issuer. While the Foundation will make reasonable efforts to process approved refunds promptly, the actual credit timeline is subject to the policies of the respective financial institutions.",
    s7Title: "7. Failed or Duplicate Transactions",
    s7P1: "If your bank account has been debited but you have not received an order confirmation or donation acknowledgement, please contact us with the relevant transaction details.",
    s7P2: "In cases involving duplicate payments or technical errors, the Foundation will investigate the matter in coordination with the payment gateway and process any eligible refund after verification.",
    s8Title: "8. Changes to This Policy",
    s8P1: "Sri Kandhaguru Foundation reserves the right to amend or update this Cancellation & Refund Policy at any time. Any changes will take effect immediately upon publication on this website.",
    s9Title: "9. Contact Us",
    s9P1: "For any questions regarding cancellations or refunds, or to request assistance with a transaction, please contact:",
    address: "Address: Bhavani, Erode District, Tamil Nadu, India",
    email: "Email:",
    s9P2: "We will make every reasonable effort to respond to your enquiry as promptly as possible."
  },
  ta: {
    legal: "சட்ட மற்றும் இணக்கம்",
    title: "ரத்து மற்றும் பணத்தைத் திரும்பப்பெறுதல் கொள்கை",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    introP1: "ஸ்ரீ கந்தகுரு அறக்கட்டளையில், அனைத்து பரிவர்த்தனைகளிலும் வெளிப்படைத்தன்மை மற்றும் நேர்மையைப் பேணுவதற்கு நாங்கள் கடமைப்பட்டுள்ளோம். எங்கள் இணையதளம் மூலம் வழங்கப்படும் நன்கொடைகள், கொள்முதல், நிகழ்வு பதிவுகள் மற்றும் பிற சேவைகளுக்குப் பொருந்தும் விதிமுறைகளை இந்த ரத்துசெய்தல் மற்றும் பணத்தைத் திரும்பப்பெறுதல் கொள்கை கோடிட்டுக் காட்டுகிறது.",
    introP2: "எங்கள் இணையதளம் மூலம் நன்கொடை அளிப்பதன் மூலமாகவோ, தயாரிப்புகளை வாங்குவதன் மூலமாகவோ அல்லது திட்டங்களுக்குப் பதிவு செய்வதன் மூலமாகவோ, இந்தக் கொள்கையின் விதிமுறைகளுக்கு நீங்கள் ஒப்புக்கொள்கிறீர்கள்.",
    s1Title: "1. நன்கொடைகள்",
    s1P1: "ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு வழங்கப்படும் நன்கொடைகள், எங்கள் ஆன்மீக, தொண்டு, கல்வி, மனிதாபிமான மற்றும் கோவில் தொடர்பான முயற்சிகளை ஆதரிக்கும் தன்னார்வ பங்களிப்பாகும்.",
    s1P2: "இவை உள்ளடங்கும், ஆனால் இவை மட்டும் அல்ல:",
    s1L1: [
      "கோவில் கட்டுமானம் மற்றும் சீரமைப்பு",
      "அன்னதானம் (உணவு விநியோகம்)",
      "ஆன்மீக கல்வி",
      "சமூக நலத்திட்டங்கள்",
      "சுகாதார முயற்சிகள்",
      "கல்வி உதவி",
      "பாரம்பரிய பாதுகாப்பு"
    ],
    s1P3: "இந்தத் தொண்டு நோக்கங்களை மேம்படுத்துவதற்காக நன்கொடைகள் பயன்படுத்தப்படுவதால், கட்டணம் வெற்றிகரமாகச் செயலாக்கப்பட்டவுடன் அனைத்து நன்கொடைகளும் பொதுவாகத் திரும்பப் பெறப்படாது.",
    s1P4: "இருப்பினும், பின்வருபவை உட்பட விதிவிலக்கான சூழ்நிலைகளில் மட்டுமே பணத்தைத் திரும்பப் பெறுவது பரிசீலிக்கப்படலாம்:",
    s1L2: [
      "தொழில்நுட்பப் பிழையால் நகல் கட்டணம்.",
      "கட்டண நுழைவாயில் சிக்கல் காரணமாக தவறான தொகை வசூலிக்கப்பட்டது.",
      "அறக்கட்டளை மற்றும் கட்டண சேவை வழங்குநரால் அங்கீகரிக்கப்படாத பரிவர்த்தனை சரிபார்க்கப்பட்டது."
    ],
    s1P5: "அங்கீகரிக்கப்பட்ட பணத்தைத் திரும்பப் பெறுதல்கள், வங்கி மற்றும் கட்டண நுழைவாயில் செயலாக்க நேரங்களுக்கு உட்பட்டு, நியாயமான காலக்கெடுவுக்குள் அசல் கட்டண முறையிலேயே செயலாக்கப்படும்.",
    s2Title: "2. நிகழ்வு பதிவுகள்",
    s2P1: "அறக்கட்டளை பல்வேறு ஆன்மீக நடவடிக்கைகளை ஏற்பாடு செய்கிறது, அவற்றுள்:",
    s2L1: [
      "தியான அமர்வுகள்",
      "சிவ கிரியா யோகம் பட்டறைகள்",
      "ஆன்மீக பின்வாங்கல்கள்",
      "கருத்தரங்குகள்",
      "ஆன்லைன் படிப்புகள்",
      "ஆன்மீக கூட்டங்கள்"
    ],
    s2Sub1: "பங்கேற்பாளர்களால் ரத்து",
    s2P2: "உங்களால் ஒரு நிகழ்வில் கலந்து கொள்ள முடியாவிட்டால், நிகழ்வு தொடங்குவதற்கு முன் அறக்கட்டளைக்கு எழுத்துப்பூர்வமாக ரத்து கோரிக்கைகளை சமர்ப்பிக்க வேண்டும்.",
    s2P3: "பணத்தைத் திரும்பப்பெறும் தகுதி, பொருந்துமானால், நிகழ்வின் தன்மை, ஏற்கனவே செய்யப்பட்ட செலவுகள் மற்றும் ரத்துசெய்தல் காலக்கெடு ஆகியவற்றைப் பொறுத்தது.",
    s2P4: "சில நிகழ்வுகள் குறிப்பாக திரும்பப் பெற முடியாதவை என நியமிக்கப்படலாம், இது பதிவின் போது தெரிவிக்கப்படும்.",
    s2Sub2: "அறக்கட்டளை மூலம் ரத்து",
    s2P5: "போதிய பதிவுகள், பாதகமான வானிலை, இடக் கட்டுப்பாடுகள், அரசாங்க விதிமுறைகள் அல்லது பிற எதிர்பாராத நிகழ்வுகள் உள்ளிட்ட, ஆனால் அவை மட்டும் அல்லாமல், எதிர்பாராத சூழ்நிலைகள் காரணமாக எந்தவொரு நிகழ்வையும் ஒத்திவைக்க, மீண்டும் திட்டமிட, இடமாற்றம் செய்ய அல்லது ரத்து செய்ய ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு உரிமை உண்டு.",
    s2P6: "அறக்கட்டளையால் நிகழ்வு ரத்துசெய்யப்பட்டால், அறக்கட்டளையின் விருப்பப்படி பங்கேற்பாளர்களுக்கு பின்வருவனவற்றில் ஒன்று வழங்கப்படலாம்:",
    s2L2: [
      "எதிர்கால நிகழ்வுக்கு மாற்றியமைத்தல்.",
      "பதிவை தகுதியான வேறொரு திட்டத்திற்கு மாற்றுதல்.",
      "பொருந்தும் இடங்களில் பதிவுக் கட்டணத்தின் முழு அல்லது பகுதி திரும்பப் பெறுதல்."
    ],
    s2P7: "பங்கேற்பாளர்களால் ஏற்படும் எந்தவொரு பயணம், தங்குமிடம் அல்லது தற்செயலான செலவுகளுக்கு அறக்கட்டளை பொறுப்பாகாது.",
    s3Title: "3. அதிகாரப்பூர்வ ஸ்டோர் கொள்முதல்",
    s3P1: "அறக்கட்டளையின் அதிகாரப்பூர்வ அங்காடி ஆன்மீகப் புத்தகங்கள், பக்திப் பொருட்கள், ஆரோக்கியப் பொருட்கள், தியான வளங்கள் மற்றும் பிற தொடர்புடைய பொருட்களை வழங்குகிறது.",
    s3Sub1: "ஆர்டர் ரத்து",
    s3P2: "ஆர்டர்கள் இன்னும் செயலாக்கப்படாவிட்டாலோ அல்லது அனுப்பப்படாவிட்டாலோ மட்டுமே ரத்து செய்யப்படலாம்.",
    s3P3: "ஆர்டர் அனுப்பப்பட்டவுடன், ரத்து கோரிக்கைகள் ஏற்கப்படாது.",
    s3P4: "இதன் காரணமாக எந்தவொரு ஆர்டரையும் ரத்து செய்ய அறக்கட்டளைக்கு உரிமை உண்டு:",
    s3L1: [
      "தயாரிப்பு கிடைக்கவில்லை.",
      "விலை அல்லது அச்சுக்கலை பிழைகள்.",
      "கட்டண சரிபார்ப்பு சிக்கல்கள்.",
      "சந்தேகத்திற்குரிய மோசடி நடவடிக்கை.",
      "சட்ட அல்லது ஒழுங்குமுறை தேவைகள்."
    ],
    s3P5: "பணம் பெறப்பட்ட பிறகு அறக்கட்டளையால் ஆர்டர் ரத்து செய்யப்பட்டால், செலுத்தப்பட்ட தொகை அசல் கட்டண முறைக்குத் திருப்பித் தரப்படும்.",
    s4Title: "4. வருவாய் (Returns)",
    s4P1: "வாடிக்கையாளர்கள் டெலிவரி செய்யப்பட்டவுடன் தங்கள் ஆர்டரை உடனடியாக சரிபார்க்க வேண்டும்.",
    s4P2: "பின்வரும் சூழ்நிலைகளில் மட்டுமே வருவாய் ஏற்கப்படும்:",
    s4L1: [
      "தவறான தயாரிப்பு பெறப்பட்டது.",
      "தயாரிப்பு சேதமடைந்த நிலையில் பெறப்பட்டது.",
      "உற்பத்தி குறைபாடு.",
      "தொகுப்பில் விடுபட்ட பொருட்கள்."
    ],
    s4P3: "திரும்பப் பெறுவதைத் தொடங்க, வாடிக்கையாளர்கள் தயாரிப்பைப் பெற்ற 7 நாட்களுக்குள் அறக்கட்டளையைத் தொடர்புகொண்டு வழங்க வேண்டும்:",
    s4L2: [
      "ஆர்டர் எண்.",
      "சிக்கலின் விளக்கம்.",
      "தயாரிப்பு மற்றும் பேக்கேஜிங்கின் தெளிவான புகைப்படங்கள்."
    ],
    s4P4: "திரும்பப் பெறப்பட்ட தயாரிப்புகள் பயன்படுத்தப்படாத நிலையில், அவற்றின் அசல் நிலையில் இருக்க வேண்டும், மேலும் சாத்தியமான இடங்களில் அசல் பேக்கேஜிங்குடன் இருக்க வேண்டும்.",
    s4P5: "எந்தவொரு மாற்றீட்டையும் அல்லது பணத்தைத் திரும்பப்பெறுவதையும் அங்கீகரிக்கும் முன், திரும்பப் பெறப்பட்ட தயாரிப்புகளைச் சரிபார்க்க அறக்கட்டளைக்கு உரிமை உண்டு.",
    s5Title: "5. திரும்பப் பெற முடியாத பொருட்கள்",
    s5P1: "பின்வரும் உருப்படிகள் பொதுவாக திரும்பப் பெற அல்லது பணத்தைத் திரும்பப் பெறத் தகுதி பெறாது:",
    s5L1: [
      "நன்கொடைகள்.",
      "டிஜிட்டல் பதிவிறக்கங்கள்.",
      "ஆன்லைன் படிப்புகள்.",
      "தரவிறக்கம் செய்யக்கூடிய கல்விப் பொருட்கள்.",
      "பணத்தைத் திரும்பப்பெற முடியாதவை எனக் குறிக்கப்பட்ட நிகழ்வுப் பதிவுகள்.",
      "பரிசு வவுச்சர்கள் (பொருந்தினால்).",
      "தனிப்பயனாக்கப்பட்ட அல்லது பிரத்தியேகமாக உருவாக்கப்பட்ட தயாரிப்புகள்.",
      "டெலிவரிக்குப் பிறகு தவறான பயன்பாடு அல்லது முறையற்ற கையாளுதலால் சேதமடைந்த பொருட்கள்."
    ],
    s6Title: "6. பணத்தைத் திரும்பப்பெறும் செயல்முறை",
    s6P1: "பணத்தைத் திரும்பப்பெறுவதற்கான கோரிக்கை மதிப்பாய்வு செய்யப்பட்டு அங்கீகரிக்கப்பட்டவுடன், அசல் கட்டண முறையைப் பயன்படுத்தி பணத்தைத் திரும்பப்பெறுதல் தொடங்கப்படும்.",
    s6P2: "கட்டண நுழைவாயில், வங்கி நிறுவனம் அல்லது கார்டு வழங்குநரைப் பொறுத்து செயலாக்க நேரங்கள் மாறுபடலாம். அங்கீகரிக்கப்பட்ட பணத்தைத் திரும்பப்பெறுதல்களை உடனடியாகச் செயல்படுத்த அறக்கட்டளை நியாயமான முயற்சிகளை மேற்கொள்ளும் அதே வேளையில், உண்மையான கிரெடிட் காலக்கெடு संबंधित நிதி நிறுவனங்களின் கொள்கைகளுக்கு உட்பட்டது.",
    s7Title: "7. தோல்வியுற்ற அல்லது நகல் பரிவர்த்தனைகள்",
    s7P1: "உங்கள் வங்கிக் கணக்கு டெபிட் செய்யப்பட்டு, ஆர்டர் உறுதிப்படுத்தல் அல்லது நன்கொடை ஒப்புதல் கிடைக்கவில்லை என்றால், தொடர்புடைய பரிவர்த்தனை விவரங்களுடன் எங்களைத் தொடர்பு கொள்ளவும்.",
    s7P2: "நகல் கட்டணங்கள் அல்லது தொழில்நுட்பப் பிழைகள் உள்ள சந்தர்ப்பங்களில், அறக்கட்டளை பணம் செலுத்துவதற்கான நுழைவாயிலின் ஒருங்கிணைப்புடன் விஷயத்தை விசாரித்து, சரிபார்த்த பிறகு தகுதியான பணத்தைத் திரும்பப் பெறும்.",
    s8Title: "8. இந்தக் கொள்கையில் மாற்றங்கள்",
    s8P1: "எந்த நேரத்திலும் இந்த ரத்துசெய்தல் மற்றும் பணத்தைத் திரும்பப்பெறுதல் கொள்கையை திருத்தவோ அல்லது புதுப்பிக்கவோ ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு உரிமை உள்ளது. இந்த இணையதளத்தில் வெளியிடப்பட்டவுடன் எந்த மாற்றங்களும் உடனடியாக நடைமுறைக்கு வரும்.",
    s9Title: "9. எங்களை தொடர்பு கொள்ள",
    s9P1: "ரத்துசெய்தல் அல்லது பணத்தைத் திரும்பப்பெறுதல் தொடர்பான ஏதேனும் கேள்விகளுக்கு அல்லது பரிவர்த்தனைக்கான உதவியைக் கோர, தயவுசெய்து தொடர்பு கொள்ளவும்:",
    address: "முகவரி: பவானி, ஈரோடு மாவட்டம், தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்:",
    s9P2: "உங்களின் விசாரணைக்கு கூடிய விரைவில் பதிலளிக்க ஒவ்வொரு நியாயமான முயற்சியையும் மேற்கொள்வோம்."
  },
  hi: {
    legal: "कानूनी और अनुपालन",
    title: "रद्दीकरण और धनवापसी नीति",
    lastUpdated: "अंतिम अद्यतन:",
    introP1: "श्री कंधगुरु फाउंडेशन में, हम सभी लेनदेन में पारदर्शिता और निष्पक्षता बनाए रखने के लिए प्रतिबद्ध हैं। यह रद्दीकरण और धनवापसी नीति हमारी वेबसाइट के माध्यम से पेश किए गए दान, खरीद, कार्यक्रम पंजीकरण और अन्य सेवाओं पर लागू शर्तों की रूपरेखा तैयार करती है।",
    introP2: "दान देकर, उत्पाद खरीदकर, या हमारी वेबसाइट के माध्यम से कार्यक्रमों के लिए पंजीकरण करके, आप इस नीति की शर्तों से सहमत हैं।",
    s1Title: "1. दान",
    s1P1: "श्री कंधगुरु फाउंडेशन को दिया गया दान स्वैच्छिक योगदान है जो हमारे आध्यात्मिक, धर्मार्थ, शैक्षिक, मानवीय और मंदिर से संबंधित पहलों का समर्थन करता है।",
    s1P2: "इनमें शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं:",
    s1L1: [
      "मंदिर निर्माण एवं जीर्णोद्धार",
      "अन्नदान (भोजन वितरण)",
      "आध्यात्मिक शिक्षा और आउटरीच",
      "सामुदायिक कल्याण कार्यक्रम",
      "स्वास्थ्य देखभाल पहल",
      "शैक्षिक सहायता",
      "विरासत संरक्षण"
    ],
    s1P3: "चूंकि दान का उपयोग इन धर्मार्थ उद्देश्यों को आगे बढ़ाने के लिए किया जाता है, एक बार भुगतान सफलतापूर्वक संसाधित हो जाने के बाद आम तौर पर सभी दान गैर-वापसी योग्य होते हैं।",
    s1P4: "हालाँकि, रिफंड पर केवल असाधारण परिस्थितियों में ही विचार किया जा सकता है, जिनमें शामिल हैं:",
    s1L2: [
      "तकनीकी त्रुटि के कारण डुप्लीकेट भुगतान।",
      "भुगतान गेटवे समस्या के कारण गलत राशि काटी गई।",
      "फाउंडेशन और भुगतान सेवा प्रदाता द्वारा सत्यापित अनधिकृत लेनदेन।"
    ],
    s1P5: "स्वीकृत रिफंड को बैंकिंग और भुगतान गेटवे प्रसंस्करण समय के अधीन, उचित समय सीमा के भीतर मूल भुगतान विधि में संसाधित किया जाएगा।",
    s2Title: "2. ईवेंट पंजीकरण",
    s2P1: "फाउंडेशन विभिन्न आध्यात्मिक गतिविधियों का आयोजन करता है, जिनमें शामिल हैं:",
    s2L1: [
      "ध्यान सत्र",
      "शिव क्रिया योग कार्यशालाएँ",
      "आध्यात्मिक रिट्रीट",
      "संगोष्ठियाँ",
      "ऑनलाइन पाठ्यक्रम",
      "आध्यात्मिक सभाएँ"
    ],
    s2Sub1: "प्रतिभागियों द्वारा रद्दीकरण",
    s2P2: "यदि आप किसी कार्यक्रम में शामिल होने में असमर्थ हैं, तो कार्यक्रम शुरू होने से पहले फाउंडेशन को लिखित रूप में रद्दीकरण अनुरोध प्रस्तुत किया जाना चाहिए।",
    s2P3: "धनवापसी पात्रता, यदि लागू हो, घटना की प्रकृति, पहले से किए गए खर्च और रद्दीकरण समयरेखा पर निर्भर करेगी।",
    s2P4: "कुछ घटनाओं को विशेष रूप से गैर-वापसी योग्य के रूप में नामित किया जा सकता है, और पंजीकरण के दौरान इसकी सूचना दी जाएगी।",
    s2Sub2: "फाउंडेशन द्वारा रद्दीकरण",
    s2P5: "श्री कंधगुरु फाउंडेशन अप्रत्याशित परिस्थितियों के कारण किसी भी कार्यक्रम को स्थगित करने, पुनर्निर्धारित करने, स्थानांतरित करने या रद्द करने का अधिकार सुरक्षित रखता है, जिसमें अपर्याप्त पंजीकरण, प्रतिकूल मौसम, स्थान की बाधाएं, सरकारी नियम या अप्रत्याशित घटनाएं शामिल हैं, लेकिन ये इन्हीं तक सीमित नहीं हैं।",
    s2P6: "जहां फाउंडेशन द्वारा कोई कार्यक्रम रद्द कर दिया जाता है, प्रतिभागियों को फाउंडेशन के विवेक पर निम्नलिखित में से एक की पेशकश की जा सकती है:",
    s2L2: [
      "भविष्य की किसी घटना के लिए पुनर्निर्धारण।",
      "पंजीकरण को किसी अन्य पात्र कार्यक्रम में स्थानांतरित करना।",
      "पंजीकरण शुल्क की पूरी या आंशिक वापसी, जहां लागू हो।"
    ],
    s2P7: "प्रतिभागियों द्वारा किए गए किसी भी यात्रा, आवास, या आकस्मिक व्यय के लिए फाउंडेशन जिम्मेदार नहीं होगा।",
    s3Title: "3. आधिकारिक स्टोर खरीद",
    s3P1: "फाउंडेशन का आधिकारिक स्टोर आध्यात्मिक किताबें, भक्ति आइटम, कल्याण उत्पाद, ध्यान संसाधन और अन्य संबंधित माल प्रदान करता है।",
    s3Sub1: "ऑर्डर रद्द करना",
    s3P2: "ऑर्डर तभी रद्द किए जा सकते हैं जब उन्हें अभी तक संसाधित या भेजा न गया हो।",
    s3P3: "एक बार ऑर्डर भेजे जाने के बाद, रद्दीकरण अनुरोध स्वीकार नहीं किए जा सकते।",
    s3P4: "फाउंडेशन को निम्नलिखित कारणों से किसी भी आदेश को रद्द करने का अधिकार सुरक्षित है:",
    s3L1: [
      "उत्पाद की अनुपलब्धता.",
      "मूल्य निर्धारण या मुद्रण संबंधी त्रुटियाँ.",
      "भुगतान सत्यापन समस्याएँ.",
      "संदिग्ध धोखाधड़ी गतिविधि.",
      "कानूनी या विनियामक आवश्यकताएँ."
    ],
    s3P5: "यदि भुगतान प्राप्त होने के बाद फाउंडेशन द्वारा ऑर्डर रद्द कर दिया जाता है, तो भुगतान की गई राशि मूल भुगतान विधि में वापस कर दी जाएगी।",
    s4Title: "4. रिटर्न",
    s4P1: "ग्राहकों को डिलीवरी के तुरंत बाद अपने ऑर्डर का निरीक्षण करना चाहिए।",
    s4P2: "रिटर्न केवल निम्नलिखित स्थितियों में ही स्वीकार किया जा सकता है:",
    s4L1: [
      "गलत उत्पाद प्राप्त हुआ.",
      "उत्पाद क्षतिग्रस्त स्थिति में प्राप्त हुआ.",
      "विनिर्माण दोष.",
      "पैकेज में गायब वस्तुएँ."
    ],
    s4P3: "रिटर्न शुरू करने के लिए, ग्राहकों को उत्पाद प्राप्त होने के 7 दिनों के भीतर फाउंडेशन से संपर्क करना होगा और प्रदान करना होगा:",
    s4L2: [
      "ऑर्डर संख्या.",
      "मुद्दे का विवरण.",
      "उत्पाद और पैकेजिंग की स्पष्ट तस्वीरें."
    ],
    s4P4: "लौटाए गए उत्पाद अप्रयुक्त, अपनी मूल स्थिति में होने चाहिए और जहां तक ​​संभव हो मूल पैकेजिंग के साथ होने चाहिए।",
    s4P5: "फाउंडेशन किसी भी प्रतिस्थापन या रिफंड को मंजूरी देने से पहले लौटाए गए उत्पादों का निरीक्षण करने का अधिकार सुरक्षित रखता है।",
    s5Title: "5. गैर-वापसी योग्य वस्तुएं",
    s5P1: "निम्नलिखित आइटम आम तौर पर रिटर्न या रिफंड के लिए योग्य नहीं हैं:",
    s5L1: [
      "दान।",
      "डिजिटल डाउनलोड।",
      "ऑनलाइन पाठ्यक्रम।",
      "डाउनलोड करने योग्य शैक्षिक सामग्री।",
      "ईवेंट पंजीकरण गैर-वापसी योग्य के रूप में चिह्नित।",
      "उपहार वाउचर (यदि लागू हो)।",
      "व्यक्तिगत या कस्टम-निर्मित उत्पाद।",
      "डिलीवरी के बाद दुरुपयोग या अनुचित संचालन के कारण क्षतिग्रस्त उत्पाद।"
    ],
    s6Title: "6. रिफंड प्रक्रिया",
    s6P1: "एक बार रिफंड अनुरोध की समीक्षा और अनुमोदन हो जाने के बाद, मूल भुगतान विधि का उपयोग करके रिफंड शुरू किया जाएगा।",
    s6P2: "भुगतान गेटवे, बैंकिंग संस्थान या कार्ड जारीकर्ता के आधार पर प्रसंस्करण समय भिन्न हो सकता है। जबकि फाउंडेशन स्वीकृत रिफंड को तुरंत संसाधित करने के लिए उचित प्रयास करेगा, वास्तविक क्रेडिट समयरेखा संबंधित वित्तीय संस्थानों की नीतियों के अधीन है।",
    s7Title: "7. विफल या डुप्लिकेट लेनदेन",
    s7P1: "यदि आपके बैंक खाते से डेबिट किया गया है लेकिन आपको कोई ऑर्डर पुष्टिकरण या दान पावती प्राप्त नहीं हुई है, तो कृपया प्रासंगिक लेनदेन विवरण के साथ हमसे संपर्क करें।",
    s7P2: "डुप्लिकेट भुगतान या तकनीकी त्रुटियों से जुड़े मामलों में, फाउंडेशन भुगतान गेटवे के समन्वय में मामले की जांच करेगा और सत्यापन के बाद किसी भी पात्र रिफंड की प्रक्रिया करेगा।",
    s8Title: "8. इस नीति में परिवर्तन",
    s8P1: "श्री कंधगुरु फाउंडेशन किसी भी समय इस रद्दीकरण और धनवापसी नीति में संशोधन या अद्यतन करने का अधिकार सुरक्षित रखता है। कोई भी परिवर्तन इस वेबसाइट पर प्रकाशन के तुरंत बाद प्रभावी होगा।",
    s9Title: "9. हमसे संपर्क करें",
    s9P1: "रद्दीकरण या रिफंड के संबंध में किसी भी प्रश्न के लिए, या किसी लेनदेन में सहायता का अनुरोध करने के लिए, कृपया संपर्क करें:",
    address: "पता: भवानी, इरोड जिला, तमिलनाडु, भारत",
    email: "ईमेल:",
    s9P2: "हम यथाशीघ्र आपकी पूछताछ का उत्तर देने का हर संभव प्रयास करेंगे।"
  }
};

export default function RefundPolicy() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

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
              <p>{t.introP1}</p>
              <p>{t.introP2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s1Title}</h2>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s1L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s1P3}</p>
              <p>{t.s1P4}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s1L2.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s1P5}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s2Title}</h2>
              <p>{t.s2P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s2L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">{t.s2Sub1}</h3>
              <p>{t.s2P2}</p>
              <p>{t.s2P3}</p>
              <p>{t.s2P4}</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">{t.s2Sub2}</h3>
              <p>{t.s2P5}</p>
              <p>{t.s2P6}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s2L2.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s2P7}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s3Title}</h2>
              <p>{t.s3P1}</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">{t.s3Sub1}</h3>
              <p>{t.s3P2}</p>
              <p>{t.s3P3}</p>
              <p>{t.s3P4}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s3L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s3P5}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s4Title}</h2>
              <p>{t.s4P1}</p>
              <p>{t.s4P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s4L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s4P3}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s4L2.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s4P4}</p>
              <p>{t.s4P5}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s5Title}</h2>
              <p>{t.s5P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s5L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s6Title}</h2>
              <p>{t.s6P1}</p>
              <p>{t.s6P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s7Title}</h2>
              <p>{t.s7P1}</p>
              <p>{t.s7P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s8Title}</h2>
              <p>{t.s8P1}</p>
            </section>

            <section className="space-y-4 mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s9Title}</h2>
              <p>{t.s9P1}</p>
              <div className="bg-gray-50 p-6 rounded-xl mt-4 border border-gray-200">
                <p className="font-semibold text-gray-900">Sri Kandhaguru Foundation</p>
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
              <p className="mt-4">{t.s9P2}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
