"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const translations = {
  en: {
    legal: "Order & Shipping",
    title: "Shipping & Delivery Policy",
    lastUpdated: "Last Updated:",
    intro: "Thank you for shopping with Sri Kandhaguru Foundation. We are committed to delivering your orders safely and efficiently. This Shipping & Delivery Policy outlines how we process, ship, and deliver products purchased through our Official Store.",
    s1Title: "1. Order Processing",
    s1L: [
      "Orders are processed after successful payment confirmation.",
      "Orders are typically processed within 2–5 business days, excluding weekends, public holidays, and festival holidays.",
      "During periods of high demand, special events, or promotional campaigns, processing times may be longer.",
      "Once your order has been processed and dispatched, you will receive a confirmation notification, where applicable."
    ],
    s2Title: "2. Shipping Locations",
    s2P1: "We currently ship across India.",
    s2P2: "If international shipping is introduced in the future, the availability of shipping destinations, applicable charges, customs duties, and delivery timelines will be communicated on the Website before the order is placed.",
    s3Title: "3. Delivery Timeline",
    s3P1: "Estimated delivery times after dispatch are as follows:",
    s3L1_strong: "Metro Cities:",
    s3L1_text: "Approximately 3–7 business days",
    s3L2_strong: "Other Cities & Towns:",
    s3L2_text: "Approximately 5–10 business days",
    s3L3_strong: "Remote or Rural Areas:",
    s3L3_text: "Approximately 7–14 business days",
    s3P2: "These timelines are estimates and may vary depending on the delivery location and courier partner.",
    s4Title: "4. Shipping Charges",
    s4P1: "Shipping charges, if applicable, will be displayed during the checkout process before payment is completed.",
    s4P2: "The Foundation may occasionally offer free shipping on selected products, promotional campaigns, or orders meeting specified criteria.",
    s5Title: "5. Delivery Partners",
    s5P1: "Orders are delivered through trusted third-party courier and logistics providers.",
    s5P2: "Once an order has been handed over to the courier partner, delivery timelines are governed by the courier’s operational processes. While we work closely with our delivery partners, Sri Kandhaguru Foundation cannot guarantee exact delivery dates.",
    s6Title: "6. Delivery Delays",
    s6P1: "Although we strive to ensure timely delivery, delays may occur due to circumstances beyond our reasonable control, including but not limited to:",
    s6L: [
      "Severe weather conditions",
      "Natural disasters",
      "Public holidays or festivals",
      "Government restrictions",
      "Transportation disruptions",
      "Strikes or labour disputes",
      "Courier service delays",
      "Incorrect or incomplete delivery addresses",
      "Unavailability of the recipient at the delivery location"
    ],
    s6P2: "Sri Kandhaguru Foundation shall not be held responsible for delays arising from such circumstances.",
    s7Title: "7. Incorrect Shipping Information",
    s7P1: "Customers are responsible for providing accurate and complete shipping details, including:",
    s7L: [
      "Recipient’s name",
      "Delivery address",
      "Contact number",
      "Postal code"
    ],
    s7P2: "The Foundation shall not be liable for delays, failed deliveries, or additional charges resulting from incorrect or incomplete shipping information provided by the customer.",
    s8Title: "8. Delivery Attempts",
    s8P1: "If the courier partner is unable to deliver the package due to the recipient’s absence or other delivery-related issues, additional delivery attempts may be made in accordance with the courier partner’s policies.",
    s8P2: "If a shipment is returned to us because delivery could not be completed, we may contact you to arrange re-dispatch. Additional shipping charges may apply.",
    s9Title: "9. Damaged or Missing Shipments",
    s9P1: "Customers are requested to inspect the package upon delivery.",
    s9P2: "If you receive:",
    s9L1: [
      "A damaged package,",
      "A defective product,",
      "An incorrect item, or",
      "An incomplete order,"
    ],
    s9P3: "please contact us within 7 days of delivery with:",
    s9L2: [
      "Your order number,",
      "A description of the issue, and",
      "Clear photographs of the product and packaging."
    ],
    s9P4: "We will review the matter and, where appropriate, arrange a replacement, exchange, or refund in accordance with our Cancellation & Refund Policy.",
    s10Title: "10. Digital Products and Online Services",
    s10P1: "Certain offerings, such as:",
    s10L: [
      "Online spiritual courses,",
      "Downloadable publications,",
      "Digital meditation resources,",
      "Event registrations, and",
      "Virtual sessions,"
    ],
    s10P2: "do not require physical shipping. Access details or confirmation will be provided electronically through the email address or contact information supplied during registration or purchase.",
    s11Title: "11. Order Tracking",
    s11P1: "Where tracking is available through our courier partner, shipment details or tracking information will be shared with you after your order has been dispatched.",
    s12Title: "12. Force Majeure",
    s12P1: "Sri Kandhaguru Foundation shall not be responsible for delays or failures in delivery resulting from events beyond its reasonable control, including but not limited to natural disasters, pandemics, war, civil unrest, government actions, transportation disruptions, power failures, internet outages, or other force majeure events.",
    s13Title: "13. Changes to This Policy",
    s13P1: "Sri Kandhaguru Foundation reserves the right to amend or update this Shipping & Delivery Policy at any time without prior notice.",
    s13P2: "Any changes will become effective immediately upon publication on this Website.",
    s14Title: "14. Contact Us",
    s14P1: "If you have any questions regarding shipping, delivery, or your order, please contact us:",
    address: "Address: Bhavani, Erode District, Tamil Nadu, India",
    email: "Email:",
    s14P2: "We will make every reasonable effort to assist you and respond to your enquiry promptly."
  },
  ta: {
    legal: "ஆர்டர் மற்றும் ஷிப்பிங்",
    title: "ஷிப்பிங் மற்றும் டெலிவரி கொள்கை",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    intro: "ஸ்ரீ கந்தகுரு அறக்கட்டளையில் ஷாப்பிங் செய்ததற்கு நன்றி. உங்கள் ஆர்டர்களை பாதுகாப்பாகவும் திறமையாகவும் வழங்குவதற்கு நாங்கள் கடமைப்பட்டுள்ளோம். எங்கள் அதிகாரப்பூர்வ ஸ்டோர் மூலம் வாங்கிய தயாரிப்புகளை நாங்கள் எவ்வாறு செயலாக்குகிறோம், அனுப்புகிறோம் மற்றும் வழங்குகிறோம் என்பதை இந்த ஷிப்பிங் & டெலிவரி கொள்கை கோடிட்டுக் காட்டுகிறது.",
    s1Title: "1. ஆர்டர் செயலாக்கம்",
    s1L: [
      "வெற்றிகரமான கட்டண உறுதிப்படுத்தலுக்குப் பிறகு ஆர்டர்கள் செயலாக்கப்படும்.",
      "வார இறுதி நாட்கள், பொது விடுமுறை நாட்கள் மற்றும் திருவிழா விடுமுறை நாட்கள் தவிர்த்து, ஆர்டர்கள் பொதுவாக 2–5 வணிக நாட்களுக்குள் செயலாக்கப்படும்.",
      "அதிக தேவை, சிறப்பு நிகழ்வுகள் அல்லது விளம்பரப் பிரச்சாரங்களின் போது, ​​செயலாக்க நேரங்கள் அதிகமாக இருக்கலாம்.",
      "உங்கள் ஆர்டர் செயலாக்கப்பட்டு அனுப்பப்பட்டதும், பொருந்தக்கூடிய இடங்களில் உறுதிப்படுத்தல் அறிவிப்பைப் பெறுவீர்கள்."
    ],
    s2Title: "2. கப்பல் இடங்கள்",
    s2P1: "நாங்கள் தற்போது இந்தியா முழுவதும் அனுப்புகிறோம்.",
    s2P2: "எதிர்காலத்தில் சர்வதேச ஷிப்பிங் அறிமுகப்படுத்தப்பட்டால், ஆர்டர் செய்யப்படுவதற்கு முன்பு ஷிப்பிங் இடங்களின் கிடைக்கும் தன்மை, பொருந்தக்கூடிய கட்டணங்கள், சுங்க வரிகள் மற்றும் டெலிவரி காலக்கெடு ஆகியவை இணையதளத்தில் தெரிவிக்கப்படும்.",
    s3Title: "3. டெலிவரி காலக்கெடு",
    s3P1: "அனுப்பிய பிறகு மதிப்பிடப்பட்ட விநியோக நேரங்கள் பின்வருமாறு:",
    s3L1_strong: "மெட்ரோ நகரங்கள்:",
    s3L1_text: "சுமார் 3-7 வணிக நாட்கள்",
    s3L2_strong: "பிற நகரங்கள் & நகரங்கள்:",
    s3L2_text: "சுமார் 5-10 வணிக நாட்கள்",
    s3L3_strong: "தொலைதூர அல்லது கிராமப்புற பகுதிகள்:",
    s3L3_text: "சுமார் 7-14 வணிக நாட்கள்",
    s3P2: "இந்த காலக்கெடு தோராயமானவை மற்றும் டெலிவரி இடம் மற்றும் கூரியர் கூட்டாளரைப் பொறுத்து மாறுபடலாம்.",
    s4Title: "4. கப்பல் கட்டணங்கள்",
    s4P1: "ஷிப்பிங் கட்டணங்கள், பொருந்தினால், கட்டணம் முடிவதற்கு முன் செக் அவுட் செயல்பாட்டின் போது காண்பிக்கப்படும்.",
    s4P2: "தேர்ந்தெடுக்கப்பட்ட தயாரிப்புகள், விளம்பரப் பிரச்சாரங்கள் அல்லது குறிப்பிட்ட அளவுகோல்களைப் பூர்த்தி செய்யும் ஆர்டர்களில் அறக்கட்டளை எப்போதாவது இலவச ஷிப்பிங்கை வழங்கலாம்.",
    s5Title: "5. டெலிவரி பார்ட்னர்கள்",
    s5P1: "நம்பகமான மூன்றாம் தரப்பு கூரியர் மற்றும் தளவாட வழங்குநர்கள் மூலம் ஆர்டர்கள் வழங்கப்படுகின்றன.",
    s5P2: "கூரியர் பார்ட்னரிடம் ஆர்டர் ஒப்படைக்கப்பட்டதும், டெலிவரி டைம்லைன்கள் கூரியரின் செயல்பாட்டு செயல்முறைகளால் நிர்வகிக்கப்படும். எங்கள் டெலிவரி பார்ட்னர்களுடன் நாங்கள் நெருக்கமாகப் பணிபுரியும் போது, ​​ஸ்ரீ கந்தகுரு அறக்கட்டளை சரியான விநியோகத் தேதிகளுக்கு உத்தரவாதம் அளிக்க முடியாது.",
    s6Title: "6. விநியோக தாமதங்கள்",
    s6P1: "சரியான நேரத்தில் விநியோகத்தை உறுதிசெய்ய நாங்கள் பாடுபடுகிறோம் என்றாலும், எங்கள் நியாயமான கட்டுப்பாட்டிற்கு அப்பாற்பட்ட சூழ்நிலைகள் காரணமாக தாமதங்கள் ஏற்படலாம், ஆனால் அவை மட்டும் அல்ல:",
    s6L: [
      "கடுமையான வானிலை",
      "இயற்கை பேரழிவுகள்",
      "பொது விடுமுறை அல்லது திருவிழாக்கள்",
      "அரசாங்க கட்டுப்பாடுகள்",
      "போக்குவரத்து இடையூறுகள்",
      "வேலைநிறுத்தங்கள் அல்லது தொழிலாளர் தகராறுகள்",
      "கூரியர் சேவை தாமதம்",
      "தவறான அல்லது முழுமையற்ற விநியோக முகவரிகள்",
      "டெலிவரி இடத்தில் பெறுநர் கிடைக்கவில்லை"
    ],
    s6P2: "இத்தகைய சூழ்நிலைகளால் ஏற்படும் தாமதங்களுக்கு ஸ்ரீ கந்தகுரு அறக்கட்டளை பொறுப்பாகாது.",
    s7Title: "7. தவறான கப்பல் தகவல்",
    s7P1: "துல்லியமான மற்றும் முழுமையான ஷிப்பிங் விவரங்களை வழங்குவதற்கு வாடிக்கையாளர்கள் பொறுப்பு:",
    s7L: [
      "பெறுநரின் பெயர்",
      "டெலிவரி முகவரி",
      "தொடர்பு எண்",
      "அஞ்சல் குறியீடு"
    ],
    s7P2: "தாமதங்கள், தோல்வியுற்ற டெலிவரிகள் அல்லது வாடிக்கையாளர் வழங்கிய தவறான அல்லது முழுமையற்ற ஷிப்பிங் தகவலால் ஏற்படும் கூடுதல் கட்டணங்களுக்கு அறக்கட்டளை பொறுப்பாகாது.",
    s8Title: "8. விநியோக முயற்சிகள்",
    s8P1: "பெறுநரின் வருகை அல்லது டெலிவரி தொடர்பான பிற சிக்கல்கள் காரணமாக கூரியர் பார்ட்னரால் பேக்கேஜை டெலிவரி செய்ய முடியாவிட்டால், கூரியர் பார்ட்னரின் கொள்கைகளுக்கு இணங்க கூடுதல் விநியோக முயற்சிகள் மேற்கொள்ளப்படலாம்.",
    s8P2: "டெலிவரி முடிக்க முடியாததால் ஏற்றுமதி எங்களுக்குத் திருப்பித் தரப்பட்டால், மீண்டும் அனுப்புவதற்கு நாங்கள் உங்களைத் தொடர்பு கொள்ளலாம். கூடுதல் ஷிப்பிங் கட்டணங்கள் விதிக்கப்படலாம்.",
    s9Title: "9. சேதமடைந்த அல்லது விடுபட்ட ஏற்றுமதிகள்",
    s9P1: "டெலிவரி செய்யப்பட்ட பேக்கேஜை சரிபார்க்க வாடிக்கையாளர்கள் கேட்டுக் கொள்ளப்படுகிறார்கள்.",
    s9P2: "நீங்கள் பெற்றால்:",
    s9L1: [
      "சேதமடைந்த தொகுப்பு,",
      "ஒரு குறைபாடுள்ள தயாரிப்பு,",
      "தவறான உருப்படி, அல்லது",
      "முழுமையற்ற உத்தரவு,"
    ],
    s9P3: "டெலிவரி செய்த 7 நாட்களுக்குள் எங்களை தொடர்பு கொள்ளவும்:",
    s9L2: [
      "உங்கள் ஆர்டர் எண்,",
      "சிக்கலின் விளக்கம் மற்றும்",
      "தயாரிப்பு மற்றும் பேக்கேஜிங்கின் தெளிவான புகைப்படங்கள்."
    ],
    s9P4: "நாங்கள் விஷயத்தை மதிப்பாய்வு செய்வோம், மேலும் எங்களின் ரத்துசெய்தல் & பணத்தைத் திரும்பப்பெறுதல் கொள்கையின்படி மாற்றுதல், பரிமாற்றம் அல்லது பணத்தைத் திரும்பப் பெறுதல் ஆகியவற்றை ஏற்பாடு செய்வோம்.",
    s10Title: "10. டிஜிட்டல் தயாரிப்புகள் மற்றும் ஆன்லைன் சேவைகள்",
    s10P1: "சில சலுகைகள், எடுத்துக்காட்டாக:",
    s10L: [
      "ஆன்லைன் ஆன்மீக படிப்புகள்,",
      "தரவிறக்கம் செய்யக்கூடிய வெளியீடுகள்,",
      "டிஜிட்டல் தியான வளங்கள்,",
      "நிகழ்வு பதிவுகள், மற்றும்",
      "மெய்நிகர் அமர்வுகள்,"
    ],
    s10P2: "உடல் கப்பல் தேவையில்லை. பதிவு அல்லது வாங்குதலின் போது வழங்கப்பட்ட மின்னஞ்சல் முகவரி அல்லது தொடர்புத் தகவல் மூலம் அணுகல் விவரங்கள் அல்லது உறுதிப்படுத்தல் மின்னணு முறையில் வழங்கப்படும்.",
    s11Title: "11. ஆர்டர் கண்காணிப்பு",
    s11P1: "எங்கள் கூரியர் பார்ட்னர் மூலம் கண்காணிப்பு கிடைக்கும் பட்சத்தில், உங்கள் ஆர்டர் அனுப்பப்பட்ட பிறகு, ஏற்றுமதி விவரங்கள் அல்லது கண்காணிப்புத் தகவல் உங்களுடன் பகிரப்படும்.",
    s12Title: "12. படை மஜ்யூர்",
    s12P1: "இயற்கைப் பேரழிவுகள், பெருந்தொற்றுநோய்கள், போர், உள்நாட்டு அமைதியின்மை, அரசாங்க நடவடிக்கைகள், போக்குவரத்துத் தடைகள், மின்தடை, இணையத் தடைகள் அல்லது பிற ஃபோர்ஸ் மஜ்யூர் நிகழ்வுகள் உள்ளிட்ட ஆனால் அவற்றின் நியாயமான கட்டுப்பாட்டிற்கு அப்பாற்பட்ட நிகழ்வுகளால் டெலிவரியில் ஏற்படும் தாமதங்கள் அல்லது தோல்விகளுக்கு ஸ்ரீ கந்தகுரு அறக்கட்டளை பொறுப்பாகாது.",
    s13Title: "13. இந்தக் கொள்கையில் மாற்றங்கள்",
    s13P1: "முன்னறிவிப்பின்றி எந்த நேரத்திலும் இந்த ஷிப்பிங் & டெலிவரி கொள்கையை திருத்தவோ அல்லது புதுப்பிக்கவோ ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு உரிமை உள்ளது.",
    s13P2: "இந்த இணையதளத்தில் வெளியிடப்பட்டவுடன் எந்த மாற்றங்களும் உடனடியாக நடைமுறைக்கு வரும்.",
    s14Title: "14. எங்களை தொடர்பு கொள்ள",
    s14P1: "ஷிப்பிங், டெலிவரி அல்லது உங்கள் ஆர்டர் தொடர்பாக ஏதேனும் கேள்விகள் இருந்தால், எங்களைத் தொடர்பு கொள்ளவும்:",
    address: "முகவரி: பவானி, ஈரோடு மாவட்டம், தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்:",
    s14P2: "உங்களுக்கு உதவவும், உங்கள் விசாரணைக்கு உடனடியாக பதிலளிக்கவும் ஒவ்வொரு நியாயமான முயற்சியையும் மேற்கொள்வோம்."
  },
  hi: {
    legal: "ऑर्डर एवं शिपिंग",
    title: "शिपिंग और डिलीवरी नीति",
    lastUpdated: "अंतिम अद्यतन:",
    intro: "श्री कंधगुरु फाउंडेशन से खरीदारी के लिए धन्यवाद। हम आपके ऑर्डर सुरक्षित और कुशलता से वितरित करने के लिए प्रतिबद्ध हैं। यह शिपिंग और डिलीवरी नीति रेखांकित करती है कि हम अपने आधिकारिक स्टोर के माध्यम से खरीदे गए उत्पादों को कैसे संसाधित, शिप और वितरित करते हैं।",
    s1Title: "1. ऑर्डर प्रोसेसिंग",
    s1L: [
      "सफल भुगतान की पुष्टि के बाद ऑर्डर संसाधित किए जाते हैं।",
      "ऑर्डर आमतौर पर सप्ताहांत, सार्वजनिक छुट्टियों और त्योहार की छुट्टियों को छोड़कर 2-5 व्यावसायिक दिनों के भीतर संसाधित किए जाते हैं।",
      "उच्च मांग, विशेष आयोजनों या प्रचार अभियानों की अवधि के दौरान, प्रसंस्करण समय अधिक हो सकता है।",
      "एक बार जब आपका ऑर्डर संसाधित और भेज दिया जाएगा, तो आपको एक पुष्टिकरण सूचना प्राप्त होगी, जहां लागू हो।"
    ],
    s2Title: "2. शिपिंग स्थान",
    s2P1: "हम वर्तमान में पूरे भारत में शिप करते हैं।",
    s2P2: "यदि भविष्य में अंतरराष्ट्रीय शिपिंग शुरू की जाती है, तो ऑर्डर देने से पहले शिपिंग गंतव्यों की उपलब्धता, लागू शुल्क, सीमा शुल्क और वितरण समयसीमा वेबसाइट पर सूचित की जाएगी।",
    s3Title: "3. डिलीवरी टाइमलाइन",
    s3P1: "प्रेषण के बाद अनुमानित वितरण समय इस प्रकार है:",
    s3L1_strong: "मेट्रो शहर:",
    s3L1_text: "लगभग 3-7 कार्यदिवस",
    s3L2_strong: "अन्य शहर एवं कस्बे:",
    s3L2_text: "लगभग 5-10 कार्यदिवस",
    s3L3_strong: "दूरस्थ या ग्रामीण क्षेत्र:",
    s3L3_text: "लगभग 7-14 कार्यदिवस",
    s3P2: "ये समयसीमा अनुमानित हैं और डिलीवरी स्थान और कूरियर भागीदार के आधार पर भिन्न हो सकती हैं।",
    s4Title: "4. शिपिंग शुल्क",
    s4P1: "शिपिंग शुल्क, यदि लागू हो, भुगतान पूरा होने से पहले चेकआउट प्रक्रिया के दौरान प्रदर्शित किया जाएगा।",
    s4P2: "फाउंडेशन कभी-कभी चयनित उत्पादों, प्रचार अभियानों या निर्दिष्ट मानदंडों को पूरा करने वाले ऑर्डर पर मुफ्त शिपिंग की पेशकश कर सकता है।",
    s5Title: "5. डिलीवरी पार्टनर्स",
    s5P1: "ऑर्डर विश्वसनीय तृतीय-पक्ष कूरियर और लॉजिस्टिक प्रदाताओं के माध्यम से वितरित किए जाते हैं।",
    s5P2: "एक बार जब किसी कूरियर पार्टनर को ऑर्डर सौंप दिया जाता है, तो डिलीवरी की समयसीमा कूरियर की परिचालन प्रक्रियाओं द्वारा नियंत्रित होती है। हालाँकि हम अपने डिलीवरी भागीदारों के साथ मिलकर काम करते हैं, श्री कंधगुरु फाउंडेशन सटीक डिलीवरी तारीखों की गारंटी नहीं दे सकता है।",
    s6Title: "6. डिलीवरी में देरी",
    s6P1: "हालाँकि हम समय पर डिलीवरी सुनिश्चित करने का प्रयास करते हैं, हमारे उचित नियंत्रण से परे परिस्थितियों के कारण देरी हो सकती है, जिनमें निम्न शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं:",
    s6L: [
      "गंभीर मौसम की स्थिति",
      "प्राकृतिक आपदाएं",
      "सार्वजनिक छुट्टियाँ या त्यौहार",
      "सरकारी प्रतिबंध",
      "परिवहन व्यवधान",
      "हड़ताल या श्रम विवाद",
      "कूरियर सेवा में देरी",
      "गलत या अपूर्ण डिलीवरी पते",
      "डिलीवरी स्थान पर प्राप्तकर्ता की अनुपलब्धता"
    ],
    s6P2: "श्री कंधगुरु फाउंडेशन ऐसी परिस्थितियों से होने वाली देरी के लिए जिम्मेदार नहीं होगा।",
    s7Title: "7. गलत शिपिंग जानकारी",
    s7P1: "सटीक और पूर्ण शिपिंग विवरण प्रदान करने के लिए ग्राहक जिम्मेदार हैं, जिनमें शामिल हैं:",
    s7L: [
      "प्राप्तकर्ता का नाम",
      "डिलीवरी का पता",
      "संपर्क संख्या",
      "पिन कोड"
    ],
    s7P2: "ग्राहक द्वारा दी गई गलत या अधूरी शिपिंग जानकारी के परिणामस्वरूप देरी, विफल डिलीवरी या अतिरिक्त शुल्क के लिए फाउंडेशन उत्तरदायी नहीं होगा।",
    s8Title: "8. डिलीवरी का प्रयास",
    s8P1: "यदि कूरियर पार्टनर प्राप्तकर्ता की अनुपस्थिति या डिलीवरी से संबंधित अन्य मुद्दों के कारण पैकेज वितरित करने में असमर्थ है, तो कूरियर पार्टनर की नीतियों के अनुसार अतिरिक्त डिलीवरी प्रयास किए जा सकते हैं।",
    s8P2: "यदि कोई शिपमेंट हमें वापस कर दिया जाता है क्योंकि डिलीवरी पूरी नहीं हो सकी, तो हम पुनः प्रेषण की व्यवस्था करने के लिए आपसे संपर्क कर सकते हैं। अतिरिक्त शिपिंग शुल्क लागू हो सकते हैं।",
    s9Title: "9. क्षतिग्रस्त या गुम शिपमेंट",
    s9P1: "ग्राहकों से अनुरोध है कि डिलीवरी पर पैकेज का निरीक्षण करें।",
    s9P2: "अगर आप प्राप्त करते हैं:",
    s9L1: [
      "क्षतिग्रस्त पैकेज,",
      "एक दोषपूर्ण उत्पाद,",
      "एक गलत आइटम, या",
      "एक अधूरा ऑर्डर,"
    ],
    s9P3: "कृपया डिलीवरी के 7 दिनों के भीतर हमसे संपर्क करें:",
    s9L2: [
      "आपका ऑर्डर नंबर,",
      "मुद्दे का विवरण, और",
      "उत्पाद और पैकेजिंग की स्पष्ट तस्वीरें।"
    ],
    s9P4: "हम मामले की समीक्षा करेंगे और जहां उपयुक्त होगा, हमारी रद्दीकरण और धनवापसी नीति के अनुसार प्रतिस्थापन, विनिमय या धनवापसी की व्यवस्था करेंगे।",
    s10Title: "10. डिजिटल उत्पाद और ऑनलाइन सेवाएँ",
    s10P1: "कुछ पेशकशें, जैसे:",
    s10L: [
      "ऑनलाइन आध्यात्मिक पाठ्यक्रम,",
      "डाउनलोड करने योग्य प्रकाशन,",
      "डिजिटल ध्यान संसाधन,",
      "ईवेंट पंजीकरण, और",
      "आभासी सत्र,"
    ],
    s10P2: "भौतिक शिपिंग की आवश्यकता नहीं है। पंजीकरण या खरीद के दौरान आपूर्ति किए गए ईमेल पते या संपर्क जानकारी के माध्यम से प्रवेश विवरण या पुष्टिकरण इलेक्ट्रॉनिक रूप से प्रदान किया जाएगा।",
    s11Title: "11. ऑर्डर ट्रैकिंग",
    s11P1: "जहां हमारे कूरियर पार्टनर के माध्यम से ट्रैकिंग उपलब्ध है, आपका ऑर्डर भेजे जाने के बाद शिपमेंट विवरण या ट्रैकिंग जानकारी आपके साथ साझा की जाएगी।",
    s12Title: "12. अप्रत्याशित घटना",
    s12P1: "श्री कंधगुरु फाउंडेशन अपने उचित नियंत्रण से परे घटनाओं के परिणामस्वरूप वितरण में देरी या विफलताओं के लिए जिम्मेदार नहीं होगा, जिनमें प्राकृतिक आपदाएं, महामारी, युद्ध, नागरिक अशांति, सरकारी कार्य, परिवहन व्यवधान, बिजली की विफलता, इंटरनेट आउटेज, या अन्य अप्रत्याशित घटनाएं शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं।",
    s13Title: "13. इस नीति में परिवर्तन",
    s13P1: "श्री कंधगुरु फाउंडेशन बिना किसी पूर्व सूचना के किसी भी समय इस शिपिंग और डिलीवरी नीति में संशोधन या अद्यतन करने का अधिकार सुरक्षित रखता है।",
    s13P2: "कोई भी परिवर्तन इस वेबसाइट पर प्रकाशन के तुरंत बाद प्रभावी हो जाएगा।",
    s14Title: "14. हमसे संपर्क करें",
    s14P1: "यदि शिपिंग, डिलीवरी या आपके ऑर्डर के संबंध में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:",
    address: "पता: भवानी, इरोड जिला, तमिलनाडु, भारत",
    email: "ईमेल:",
    s14P2: "हम आपकी सहायता करने और आपकी पूछताछ का तुरंत जवाब देने का हर संभव प्रयास करेंगे।"
  }
};

export default function ShippingPolicy() {
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
              <strong>{t.lastUpdated}</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <section className="space-y-4">
              <p>{t.intro}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s1Title}</h2>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s1L.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s2Title}</h2>
              <p>{t.s2P1}</p>
              <p>{t.s2P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s3Title}</h2>
              <p>{t.s3P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                <li><strong>{t.s3L1_strong}</strong> {t.s3L1_text}</li>
                <li><strong>{t.s3L2_strong}</strong> {t.s3L2_text}</li>
                <li><strong>{t.s3L3_strong}</strong> {t.s3L3_text}</li>
              </ul>
              <p className="mt-4">{t.s3P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s4Title}</h2>
              <p>{t.s4P1}</p>
              <p>{t.s4P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s5Title}</h2>
              <p>{t.s5P1}</p>
              <p>{t.s5P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s6Title}</h2>
              <p>{t.s6P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s6L.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s6P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s7Title}</h2>
              <p>{t.s7P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s7L.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s7P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s8Title}</h2>
              <p>{t.s8P1}</p>
              <p>{t.s8P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s9Title}</h2>
              <p>{t.s9P1}</p>
              <p>{t.s9P2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s9L1.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s9P3}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s9L2.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s9P4}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s10Title}</h2>
              <p>{t.s10P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s10L.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-4">{t.s10P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s11Title}</h2>
              <p>{t.s11P1}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s12Title}</h2>
              <p>{t.s12P1}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s13Title}</h2>
              <p>{t.s13P1}</p>
              <p>{t.s13P2}</p>
            </section>

            <section className="space-y-4 mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s14Title}</h2>
              <p>{t.s14P1}</p>
              <div className="bg-gray-50 p-6 rounded-xl mt-4 border border-gray-200">
                <p className="font-semibold text-gray-900">Sri Kandhaguru Foundation</p>
                <p>{t.address}</p>
                <p>
                  {t.email}{" "}
                  <a href="mailto:srikandhagurufoundation@gmail.com" className="text-brand-primary font-medium hover:underline break-all">
                    srikandhagurufoundation@gmail.com
                  </a>
                </p>
              </div>
              <p className="mt-4">{t.s14P2}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
