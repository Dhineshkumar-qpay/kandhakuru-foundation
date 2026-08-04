"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const translations = {
  en: {
    legal: "Legal & Compliance",
    title: "Disclaimer",
    lastUpdated: "Last Updated:",
    s1Title: "General Disclaimer",
    s1P1: "The information provided on the Sri Kandhaguru Foundation website (“Website”) is published in good faith and is intended solely for general informational, educational, spiritual, and charitable purposes. While we strive to keep all information accurate, complete, and up to date, Sri Kandhaguru Foundation makes no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, completeness, suitability, or availability of the Website or the information, products, services, or related content contained on the Website.",
    s1P2: "Any reliance you place on such information is strictly at your own risk.",
    s2Title: "Spiritual Guidance Disclaimer",
    s2P1: "The teachings, meditation practices, Shiva Kriya Yogam techniques, workshops, retreats, videos, publications, and other spiritual resources offered through this Website are intended to support personal spiritual growth, self-awareness, and holistic well-being.",
    s2P2: "Spiritual experiences and outcomes differ from person to person. Sri Kandhaguru Foundation does not guarantee any specific spiritual, emotional, physical, financial, or personal results from participating in its programs or following its teachings.",
    s3Title: "Health & Wellness Disclaimer",
    s3P1: "The yoga, meditation, breathing techniques (pranayama), wellness guidance, Ayurvedic lifestyle suggestions, and other practices shared by the Foundation are educational in nature and are not intended to diagnose, treat, cure, or prevent any disease or medical condition.",
    s3P2: "The content on this Website should not be considered a substitute for professional medical advice, diagnosis, or treatment.",
    s3P3: "If you have any existing medical condition, respiratory illness, mental health concern, are pregnant, recovering from surgery, or have any other health-related issues, you should consult a qualified healthcare professional before participating in any spiritual or wellness practices offered by the Foundation.",
    s3P4: "Never ignore professional medical advice or delay seeking treatment because of information obtained from this Website.",
    s4Title: "Educational Content Disclaimer",
    s4P1: "Articles, videos, books, online courses, and other educational materials published on this Website are intended for informational and educational purposes only.",
    s4P2: "The Foundation makes reasonable efforts to ensure the accuracy of the information but does not warrant that all content is free from errors or omissions.",
    s5Title: "Donations Disclaimer",
    s5P1: "Donations made through this Website are voluntary contributions intended to support the charitable, spiritual, educational, humanitarian, and temple-related activities of Sri Kandhaguru Foundation.",
    s5P2: "While the Foundation endeavors to utilize donations responsibly and transparently, specific projects, activities, or timelines may change due to operational requirements, regulatory approvals, funding priorities, or unforeseen circumstances.",
    s5P3: "Unless otherwise required by applicable law, donations are generally non-refundable.",
    s6Title: "Official Store Disclaimer",
    s6P1: "Products available through the Official Store, including spiritual books, devotional items, meditation resources, wellness products, and related materials, are intended to support personal spiritual practice and well-being.",
    s6P2: "These products are not intended to diagnose, treat, cure, or prevent any medical condition. Individual experiences and benefits may vary.",
    s6P3: "Product images are for illustrative purposes only. Actual products may vary slightly in colour, packaging, design, or appearance.",
    s7Title: "External Links Disclaimer",
    s7P1: "This Website may contain links to third-party websites for your convenience or additional information.",
    s7P2: "Sri Kandhaguru Foundation does not control, endorse, or guarantee the content, accuracy, availability, or privacy practices of any external websites. Accessing third-party websites is entirely at your own discretion and risk.",
    s8Title: "Website Availability",
    s8P1: "While every effort is made to ensure uninterrupted access to the Website, Sri Kandhaguru Foundation does not guarantee that the Website will always be available, secure, error-free, or free from viruses or other harmful components.",
    s8P2: "The Foundation shall not be liable for any temporary interruptions, technical issues, maintenance, or circumstances beyond its reasonable control that may affect access to the Website.",
    s9Title: "Limitation of Liability",
    s9P1: "To the fullest extent permitted by applicable law, Sri Kandhaguru Foundation, its trustees, volunteers, employees, teachers, affiliates, and representatives shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:",
    s9L: [
      "Use of or inability to use the Website.",
      "Reliance on information provided on the Website.",
      "Participation in Foundation programs or events.",
      "Donations or purchases made through the Website.",
      "Technical errors, interruptions, or system failures.",
      "Use of third-party websites linked from this Website."
    ],
    s9P2: "Your use of the Website and participation in Foundation activities is entirely at your own risk.",
    s10Title: "Intellectual Property",
    s10P1: "All content published on this Website, including text, logos, images, videos, graphics, publications, course materials, and other intellectual property, belongs to Sri Kandhaguru Foundation unless otherwise stated.",
    s10P2: "No content may be copied, reproduced, modified, distributed, or used for commercial purposes without prior written permission from the Foundation.",
    s11Title: "Changes to This Disclaimer",
    s11P1: "Sri Kandhaguru Foundation reserves the right to modify or update this Disclaimer at any time without prior notice.",
    s11P2: "Any changes will become effective immediately upon publication on this Website.",
    s12Title: "Contact Us",
    s12P1: "If you have any questions regarding this Disclaimer, please contact:",
    address: "Address: Bhavani, Erode District, Tamil Nadu, India",
    email: "Email:"
  },
  ta: {
    legal: "சட்ட மற்றும் இணக்கம்",
    title: "பொறுப்புத் துறப்பு",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    s1Title: "பொதுவான பொறுப்புத்துறப்பு",
    s1P1: "ஸ்ரீ கந்தகுரு அறக்கட்டளை இணையதளத்தில் (“இணையதளம்”) வழங்கப்பட்டுள்ள தகவல்கள் நல்லெண்ணத்துடன் வெளியிடப்பட்டுள்ளன, மேலும் அவை பொதுவான தகவல், கல்வி, ஆன்மீகம் மற்றும் தொண்டு நோக்கங்களுக்காக மட்டுமே. அனைத்து தகவல்களையும் துல்லியமான, முழுமையான மற்றும் புதுப்பித்த நிலையில் வைத்திருக்க நாங்கள் முயற்சி செய்யும் அதே வேளையில், இணையதளம் அல்லது அதில் உள்ள தகவல்கள், தயாரிப்புகள், சேவைகள் அல்லது தொடர்புடைய உள்ளடக்கத்தின் துல்லியம், நம்பகத்தன்மை, முழுமை, பொருத்தம் அல்லது கிடைக்கும் தன்மை குறித்து ஸ்ரீ கந்தகுரு அறக்கட்டளை எந்தவொரு பிரதிநிதித்துவமோ அல்லது உத்தரவாதமோ (வெளிப்படையான அல்லது மறைமுகமான) வழங்கவில்லை.",
    s1P2: "அத்தகைய தகவல்களை நீங்கள் நம்புவது முற்றிலும் உங்கள் சொந்த பொறுப்பிலானது.",
    s2Title: "ஆன்மீக வழிகாட்டுதல் பொறுப்புத்துறப்பு",
    s2P1: "இந்த இணையதளத்தின் மூலம் வழங்கப்படும் போதனைகள், தியானப் பயிற்சிகள், சிவ கிரியா யோக நுட்பங்கள், பட்டறைகள், பின்வாங்கல்கள், வீடியோக்கள், வெளியீடுகள் மற்றும் பிற ஆன்மீக வளங்கள் தனிப்பட்ட ஆன்மீக வளர்ச்சி, சுய விழிப்புணர்வு மற்றும் முழுமையான நல்வாழ்வை ஆதரிக்கும் நோக்கம் கொண்டவை.",
    s2P2: "ஆன்மீக அனுபவங்களும் விளைவுகளும் நபருக்கு நபர் வேறுபடும். ஸ்ரீ கந்தகுரு அறக்கட்டளை அதன் திட்டங்களில் பங்கேற்பதால் அல்லது அதன் போதனைகளைப் பின்பற்றுவதன் மூலம் எந்தவொரு குறிப்பிட்ட ஆன்மீக, உணர்ச்சி, உடல், நிதி அல்லது தனிப்பட்ட முடிவுகளுக்கும் உத்தரவாதம் அளிக்காது.",
    s3Title: "சுகாதாரம் மற்றும் ஆரோக்கியம் பொறுப்புத்துறப்பு",
    s3P1: "அறக்கட்டளையால் பகிரப்படும் யோகா, தியானம், சுவாச நுட்பங்கள் (பிராணயாமா), ஆரோக்கிய வழிகாட்டுதல், ஆயுர்வேத வாழ்க்கை முறை பரிந்துரைகள் மற்றும் பிற நடைமுறைகள் இயற்கையில் கல்வியானவை, மேலும் எந்தவொரு நோயையும் அல்லது மருத்துவ நிலையையும் கண்டறிய, சிகிச்சையளிக்க, குணப்படுத்த அல்லது தடுக்கும் நோக்கம் கொண்டவை அல்ல.",
    s3P2: "இந்த இணையதளத்தில் உள்ள உள்ளடக்கம் தொழில்முறை மருத்துவ ஆலோசனை, நோயறிதல் அல்லது சிகிச்சைக்கான மாற்றாகக் கருதப்படக்கூடாது.",
    s3P3: "உங்களுக்கு ஏற்கனவே ஏதேனும் மருத்துவ நிலை, சுவாச நோய், மனநலக் கவலை, கர்ப்பமாக இருந்தால், அறுவை சிகிச்சையிலிருந்து குணமடைபவர் அல்லது வேறு ஏதேனும் உடல்நலம் தொடர்பான பிரச்சினைகள் இருந்தால், அறக்கட்டளை வழங்கும் எந்தவொரு ஆன்மீக அல்லது ஆரோக்கிய நடைமுறைகளிலும் பங்கேற்பதற்கு முன்பு தகுதிவாய்ந்த சுகாதார நிபுணரை அணுக வேண்டும்.",
    s3P4: "இந்த இணையதளத்தில் இருந்து பெறப்பட்ட தகவலின் காரணமாக தொழில்முறை மருத்துவ ஆலோசனையை ஒருபோதும் புறக்கணிக்க வேண்டாம் அல்லது சிகிச்சை பெறுவதில் தாமதம் செய்ய வேண்டாம்.",
    s4Title: "கல்வி உள்ளடக்கம் பொறுப்புத்துறப்பு",
    s4P1: "கட்டுரைகள், வீடியோக்கள், புத்தகங்கள், ஆன்லைன் படிப்புகள் மற்றும் இந்த இணையதளத்தில் வெளியிடப்படும் பிற கல்விப் பொருட்கள் தகவல் மற்றும் கல்வி நோக்கங்களுக்காக மட்டுமே.",
    s4P2: "அறக்கட்டளை தகவலின் துல்லியத்தை உறுதிப்படுத்த நியாயமான முயற்சிகளை மேற்கொள்கிறது, ஆனால் அனைத்து உள்ளடக்கமும் பிழைகள் அல்லது விடுபடல்கள் இல்லாமல் இருப்பதற்கு உத்தரவாதம் அளிக்காது.",
    s5Title: "நன்கொடைகள் பொறுப்புத்துறப்பு",
    s5P1: "இந்த இணையதளம் மூலம் வழங்கப்படும் நன்கொடைகள் ஸ்ரீ கந்தகுரு அறக்கட்டளையின் தொண்டு, ஆன்மீகம், கல்வி, மனிதாபிமானம் மற்றும் கோவில் தொடர்பான செயல்பாடுகளை ஆதரிக்கும் நோக்கிலான தன்னார்வ பங்களிப்பாகும்.",
    s5P2: "அறக்கட்டளை நன்கொடைகளை பொறுப்புடனும் வெளிப்படைத்தன்மையுடனும் பயன்படுத்த முயற்சித்தாலும், செயல்பாட்டுத் தேவைகள், ஒழுங்குமுறை ஒப்புதல்கள், நிதி முன்னுரிமைகள் அல்லது எதிர்பாராத சூழ்நிலைகள் காரணமாக குறிப்பிட்ட திட்டங்கள், நடவடிக்கைகள் அல்லது காலக்கெடு மாறலாம்.",
    s5P3: "பொருந்தக்கூடிய சட்டத்தால் தேவைப்படாவிட்டால், நன்கொடைகள் பொதுவாகத் திரும்பப் பெறப்படாது.",
    s6Title: "அதிகாரப்பூர்வ ஸ்டோர் பொறுப்புத்துறப்பு",
    s6P1: "அதிகாரப்பூர்வ ஸ்டோர் மூலம் கிடைக்கும் ஆன்மீகப் புத்தகங்கள், பக்திப் பொருட்கள், தியான வளங்கள், ஆரோக்கியப் பொருட்கள் மற்றும் தொடர்புடைய பொருட்கள் உள்ளிட்ட தயாரிப்புகள் தனிப்பட்ட ஆன்மீகப் பயிற்சி மற்றும் நல்வாழ்வை ஆதரிக்கும் நோக்கம் கொண்டவை.",
    s6P2: "இந்த தயாரிப்புகள் எந்தவொரு மருத்துவ நிலையையும் கண்டறிய, சிகிச்சையளிக்க, குணப்படுத்த அல்லது தடுக்கும் நோக்கம் கொண்டவை அல்ல. தனிப்பட்ட அனுபவங்களும் நன்மைகளும் மாறுபடலாம்.",
    s6P3: "தயாரிப்பு படங்கள் விளக்க நோக்கங்களுக்காக மட்டுமே. உண்மையான தயாரிப்புகள் நிறம், பேக்கேஜிங், வடிவமைப்பு அல்லது தோற்றத்தில் சற்று மாறுபடலாம்.",
    s7Title: "வெளிப்புற இணைப்புகள் பொறுப்புத்துறப்பு",
    s7P1: "இந்த இணையதளம் உங்கள் வசதிக்காக அல்லது கூடுதல் தகவல்களுக்காக மூன்றாம் தரப்பு இணையதளங்களுக்கான இணைப்புகளைக் கொண்டிருக்கலாம்.",
    s7P2: "எந்தவொரு வெளிப்புற இணையதளங்களின் உள்ளடக்கம், துல்லியம், கிடைக்கும் தன்மை அல்லது தனியுரிமை நடைமுறைகளை ஸ்ரீ கந்தகுரு அறக்கட்டளை கட்டுப்படுத்தாது, அங்கீகரிக்காது அல்லது உத்தரவாதம் அளிக்காது. மூன்றாம் தரப்பு இணையதளங்களை அணுகுவது முற்றிலும் உங்கள் சொந்த விருப்பம் மற்றும் பொறுப்பிலானது.",
    s8Title: "இணையதளம் கிடைக்கும் தன்மை",
    s8P1: "இணையதளத்தை தடையின்றி அணுகுவதை உறுதிசெய்ய அனைத்து முயற்சிகளும் மேற்கொள்ளப்பட்டாலும், இணையதளம் எப்போதும் கிடைக்கும், பாதுகாப்பானதாக, பிழையற்றதாக அல்லது வைரஸ்கள் அல்லது பிற தீங்கு விளைவிக்கும் கூறுகளிலிருந்து விடுபட்டு இருக்கும் என்று ஸ்ரீ கந்தகுரு அறக்கட்டளை உத்தரவாதம் அளிக்காது.",
    s8P2: "இணையதள அணுகலைப் பாதிக்கக்கூடிய தற்காலிக இடையூறுகள், தொழில்நுட்ப சிக்கல்கள், பராமரிப்பு அல்லது அதன் நியாயமான கட்டுப்பாட்டிற்கு அப்பாற்பட்ட சூழ்நிலைகளுக்கு அறக்கட்டளை பொறுப்பாகாது.",
    s9Title: "பொறுப்பின் வரம்பு",
    s9P1: "பொருந்தக்கூடிய சட்டத்தால் அனுமதிக்கப்பட்ட அதிகபட்ச அளவிற்கு, ஸ்ரீ கந்தகுரு அறக்கட்டளை, அதன் அறங்காவலர்கள், தொண்டர்கள், ஊழியர்கள், ஆசிரியர்கள், துணை நிறுவனங்கள் மற்றும் பிரதிநிதிகள் பின்வருவனவற்றால் எழும் எந்தவொரு நேரடி, மறைமுக, தற்செயலான, விளைவான, சிறப்பு அல்லது தண்டனைக்குரிய சேதங்களுக்கும் பொறுப்பேற்க மாட்டார்கள்:",
    s9L: [
      "இணையதளத்தின் பயன்பாடு அல்லது பயன்படுத்த இயலாமை.",
      "இணையதளத்தில் வழங்கப்பட்ட தகவல்களை நம்பியிருப்பது.",
      "அறக்கட்டளை திட்டங்கள் அல்லது நிகழ்வுகளில் பங்கேற்பது.",
      "இணையதளம் மூலம் செய்யப்படும் நன்கொடைகள் அல்லது கொள்முதல்.",
      "தொழில்நுட்ப பிழைகள், குறுக்கீடுகள் அல்லது கணினி செயலிழப்புகள்.",
      "இந்த இணையதளத்தில் இருந்து இணைக்கப்பட்ட மூன்றாம் தரப்பு இணையதளங்களின் பயன்பாடு."
    ],
    s9P2: "இணையதளத்தை நீங்கள் பயன்படுத்துவது மற்றும் அறக்கட்டளை நடவடிக்கைகளில் பங்கேற்பது முற்றிலும் உங்கள் சொந்த ஆபத்திலானது.",
    s10Title: "அறிவுசார் சொத்து",
    s10P1: "இந்த இணையதளத்தில் வெளியிடப்பட்டுள்ள உரை, லோகோக்கள், படங்கள், வீடியோக்கள், கிராபிக்ஸ், வெளியீடுகள், பாடப் பொருட்கள் மற்றும் பிற அறிவுசார் சொத்துக்கள் உட்பட அனைத்து உள்ளடக்கங்களும் வேறுவிதமாகக் கூறப்படாவிட்டால் ஸ்ரீ கந்தகுரு அறக்கட்டளைக்குச் சொந்தமானது.",
    s10P2: "அறக்கட்டளையின் முன் எழுத்துப்பூர்வ அனுமதியின்றி எந்த உள்ளடக்கத்தையும் நகலெடுக்க, மீண்டும் உருவாக்க, மாற்றியமைக்க, விநியோகிக்க அல்லது வணிக நோக்கங்களுக்காகப் பயன்படுத்தக் கூடாது.",
    s11Title: "இந்த பொறுப்புத்துறப்பில் மாற்றங்கள்",
    s11P1: "முன்னறிவிப்பின்றி எந்த நேரத்திலும் இந்த பொறுப்புத்துறப்பை மாற்றியமைக்கவோ அல்லது புதுப்பிக்கவோ ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு உரிமை உள்ளது.",
    s11P2: "எந்த மாற்றங்களும் இந்த இணையதளத்தில் வெளியிடப்பட்டவுடன் உடனடியாக நடைமுறைக்கு வரும்.",
    s12Title: "எங்களை தொடர்பு கொள்ள",
    s12P1: "இந்த பொறுப்புத்துறப்பு குறித்து உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், தயவுசெய்து தொடர்பு கொள்ளவும்:",
    address: "முகவரி: பவானி, ஈரோடு மாவட்டம், தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்:"
  },
  hi: {
    legal: "कानूनी और अनुपालन",
    title: "अस्वीकरण",
    lastUpdated: "अंतिम अद्यतन:",
    s1Title: "सामान्य अस्वीकरण",
    s1P1: "श्री कंधगुरु फाउंडेशन वेबसाइट (“वेबसाइट”) पर दी गई जानकारी सद्भावना से प्रकाशित की गई है और पूरी तरह से सामान्य सूचनात्मक, शैक्षिक, आध्यात्मिक और धर्मार्थ उद्देश्यों के लिए है। हालाँकि हम सभी जानकारी को सटीक, पूर्ण और अद्यतित रखने का प्रयास करते हैं, श्री कंधगुरु फाउंडेशन वेबसाइट या वेबसाइट पर मौजूद जानकारी, उत्पादों, सेवाओं या संबंधित सामग्री की सटीकता, विश्वसनीयता, पूर्णता, उपयुक्तता या उपलब्धता के संबंध में किसी भी प्रकार का कोई प्रतिनिधित्व या वारंटी (स्पष्ट या निहित) नहीं देता है।",
    s1P2: "ऐसी किसी भी जानकारी पर आपका कोई भी भरोसा पूरी तरह से आपके अपने जोखिम पर है।",
    s2Title: "आध्यात्मिक मार्गदर्शन अस्वीकरण",
    s2P1: "इस वेबसाइट के माध्यम से पेश की जाने वाली शिक्षाएं, ध्यान प्रथाएं, शिव क्रिया योग तकनीकें, कार्यशालाएं, रिट्रीट, वीडियो, प्रकाशन और अन्य आध्यात्मिक संसाधन व्यक्तिगत आध्यात्मिक विकास, आत्म-जागरूकता और समग्र कल्याण का समर्थन करने के लिए हैं।",
    s2P2: "आध्यात्मिक अनुभव और परिणाम एक व्यक्ति से दूसरे व्यक्ति में भिन्न होते हैं। श्री कंधगुरु फाउंडेशन अपने कार्यक्रमों में भाग लेने या अपनी शिक्षाओं का पालन करने से किसी भी विशिष्ट आध्यात्मिक, भावनात्मक, शारीरिक, वित्तीय या व्यक्तिगत परिणाम की गारंटी नहीं देता है।",
    s3Title: "स्वास्थ्य एवं कल्याण अस्वीकरण",
    s3P1: "फाउंडेशन द्वारा साझा किए गए योग, ध्यान, साँस लेने की तकनीक (प्राणायाम), कल्याण मार्गदर्शन, आयुर्वेदिक जीवन शैली के सुझाव और अन्य अभ्यास प्रकृति में शैक्षिक हैं और इनका उद्देश्य किसी बीमारी या चिकित्सा स्थिति का निदान, उपचार, इलाज या रोकथाम करना नहीं है।",
    s3P2: "इस वेबसाइट की सामग्री को पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं माना जाना चाहिए।",
    s3P3: "यदि आपको पहले से ही कोई चिकित्सीय स्थिति, श्वसन संबंधी बीमारी, मानसिक स्वास्थ्य संबंधी चिंता है, आप गर्भवती हैं, सर्जरी से उबर रही हैं, या कोई अन्य स्वास्थ्य संबंधी समस्या है, तो आपको फाउंडेशन द्वारा प्रस्तावित किसी भी आध्यात्मिक या कल्याणकारी अभ्यास में भाग लेने से पहले एक योग्य स्वास्थ्य देखभाल पेशेवर से परामर्श लेना चाहिए।",
    s3P4: "इस वेबसाइट से प्राप्त जानकारी के कारण पेशेवर चिकित्सा सलाह को कभी भी नजरअंदाज न करें या उपचार लेने में देरी न करें।",
    s4Title: "शैक्षिक सामग्री अस्वीकरण",
    s4P1: "इस वेबसाइट पर प्रकाशित लेख, वीडियो, किताबें, ऑनलाइन पाठ्यक्रम और अन्य शैक्षिक सामग्री केवल सूचनात्मक और शैक्षिक उद्देश्यों के लिए हैं।",
    s4P2: "फाउंडेशन जानकारी की सटीकता सुनिश्चित करने के लिए उचित प्रयास करता है लेकिन यह वारंट नहीं करता है कि सभी सामग्री त्रुटियों या चूक से मुक्त है।",
    s5Title: "दान अस्वीकरण",
    s5P1: "इस वेबसाइट के माध्यम से दिए गए दान श्री कंधगुरु फाउंडेशन की धर्मार्थ, आध्यात्मिक, शैक्षिक, मानवीय और मंदिर से संबंधित गतिविधियों का समर्थन करने के लिए स्वैच्छिक योगदान हैं।",
    s5P2: "जबकि फाउंडेशन दान का जिम्मेदारी और पारदर्शी ढंग से उपयोग करने का प्रयास करता है, परिचालन आवश्यकताओं, विनियामक अनुमोदन, वित्त पोषण प्राथमिकताओं, या अप्रत्याशित परिस्थितियों के कारण विशिष्ट परियोजनाएं, गतिविधियां या समयसीमाएं बदल सकती हैं।",
    s5P3: "जब तक लागू कानून द्वारा अन्यथा आवश्यक न हो, दान आम तौर पर गैर-वापसी योग्य है।",
    s6Title: "आधिकारिक स्टोर अस्वीकरण",
    s6P1: "आधिकारिक स्टोर के माध्यम से उपलब्ध उत्पाद, जिनमें आध्यात्मिक किताबें, भक्ति आइटम, ध्यान संसाधन, कल्याण उत्पाद और संबंधित सामग्रियां शामिल हैं, व्यक्तिगत आध्यात्मिक अभ्यास और कल्याण का समर्थन करने के लिए हैं।",
    s6P2: "इन उत्पादों का उद्देश्य किसी चिकित्सीय स्थिति का निदान, उपचार, इलाज या रोकथाम करना नहीं है। व्यक्तिगत अनुभव और लाभ भिन्न हो सकते हैं।",
    s6P3: "उत्पाद छवियां केवल उदाहरणात्मक उद्देश्यों के लिए हैं। वास्तविक उत्पाद रंग, पैकेजिंग, डिज़ाइन या स्वरूप में थोड़ा भिन्न हो सकते हैं।",
    s7Title: "बाहरी लिंक अस्वीकरण",
    s7P1: "आपकी सुविधा या अतिरिक्त जानकारी के लिए इस वेबसाइट में तृतीय-पक्ष वेबसाइटों के लिंक हो सकते हैं।",
    s7P2: "श्री कंधगुरु फाउंडेशन किसी भी बाहरी वेबसाइट की सामग्री, सटीकता, उपलब्धता या गोपनीयता प्रथाओं को नियंत्रित, समर्थन या गारंटी नहीं देता है। तृतीय-पक्ष वेबसाइटों तक पहुंच पूरी तरह से आपके अपने विवेक और जोखिम पर है।",
    s8Title: "वेबसाइट उपलब्धता",
    s8P1: "हालाँकि वेबसाइट तक निर्बाध पहुंच सुनिश्चित करने के लिए हर संभव प्रयास किया जाता है, श्री कंधगुरु फाउंडेशन इस बात की गारंटी नहीं देता है कि वेबसाइट हमेशा उपलब्ध, सुरक्षित, त्रुटि मुक्त, या वायरस या अन्य हानिकारक घटकों से मुक्त होगी।",
    s8P2: "फाउंडेशन किसी भी अस्थायी रुकावट, तकनीकी समस्या, रखरखाव, या अपने उचित नियंत्रण से परे परिस्थितियों के लिए उत्तरदायी नहीं होगा जो वेबसाइट तक पहुंच को प्रभावित कर सकती हैं।",
    s9Title: "दायित्व की सीमा",
    s9P1: "लागू कानून द्वारा अनुमत पूर्ण सीमा तक, श्री कंधगुरु फाउंडेशन, इसके ट्रस्टी, स्वयंसेवक, कर्मचारी, शिक्षक, सहयोगी और प्रतिनिधि इससे उत्पन्न होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, परिणामी, विशेष या दंडात्मक नुकसान के लिए उत्तरदायी नहीं होंगे:",
    s9L: [
      "वेबसाइट का उपयोग या उपयोग करने में असमर्थता।",
      "वेबसाइट पर दी गई जानकारी पर निर्भरता।",
      "फाउंडेशन कार्यक्रमों या कार्यक्रमों में भागीदारी।",
      "वेबसाइट के माध्यम से दिया गया दान या खरीदारी।",
      "तकनीकी त्रुटियाँ, रुकावटें, या सिस्टम विफलताएँ।",
      "इस वेबसाइट से जुड़ी तृतीय-पक्ष वेबसाइटों का उपयोग।"
    ],
    s9P2: "वेबसाइट का आपका उपयोग और फाउंडेशन गतिविधियों में भागीदारी पूरी तरह से आपके अपने जोखिम पर है।",
    s10Title: "बौद्धिक संपदा",
    s10P1: "इस वेबसाइट पर प्रकाशित सभी सामग्री, जिसमें टेक्स्ट, लोगो, चित्र, वीडियो, ग्राफिक्स, प्रकाशन, पाठ्यक्रम सामग्री और अन्य बौद्धिक संपदा शामिल है, श्री कंधगुरु फाउंडेशन की है, जब तक कि अन्यथा न कहा गया हो।",
    s10P2: "फाउंडेशन की पूर्व लिखित अनुमति के बिना किसी भी सामग्री की प्रतिलिपि, पुनरुत्पादन, संशोधन, वितरण या व्यावसायिक उद्देश्यों के लिए उपयोग नहीं किया जा सकता है।",
    s11Title: "इस अस्वीकरण में परिवर्तन",
    s11P1: "श्री कंधगुरु फाउंडेशन बिना किसी पूर्व सूचना के किसी भी समय इस अस्वीकरण को संशोधित या अद्यतन करने का अधिकार सुरक्षित रखता है।",
    s11P2: "कोई भी परिवर्तन इस वेबसाइट पर प्रकाशन के तुरंत बाद प्रभावी होगा।",
    s12Title: "हमसे संपर्क करें",
    s12P1: "यदि इस अस्वीकरण के संबंध में आपके कोई प्रश्न हैं, तो कृपया संपर्क करें:",
    address: "पता: भवानी, इरोड जिला, तमिलनाडु, भारत",
    email: "ईमेल:"
  }
};

export default function Disclaimer() {
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
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s1Title}</h2>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s2Title}</h2>
              <p>{t.s2P1}</p>
              <p>{t.s2P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s3Title}</h2>
              <p>{t.s3P1}</p>
              <p>{t.s3P2}</p>
              <p>{t.s3P3}</p>
              <p>{t.s3P4}</p>
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
              <p>{t.s5P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s6Title}</h2>
              <p>{t.s6P1}</p>
              <p>{t.s6P2}</p>
              <p>{t.s6P3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s7Title}</h2>
              <p>{t.s7P1}</p>
              <p>{t.s7P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s8Title}</h2>
              <p>{t.s8P1}</p>
              <p>{t.s8P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s9Title}</h2>
              <p>{t.s9P1}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.s9L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.s9P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s10Title}</h2>
              <p>{t.s10P1}</p>
              <p>{t.s10P2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s11Title}</h2>
              <p>{t.s11P1}</p>
              <p>{t.s11P2}</p>
            </section>

            <section className="space-y-4 mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t.s12Title}</h2>
              <p>{t.s12P1}</p>
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
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
