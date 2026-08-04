"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const translations = {
  en: {
    legal: "Legal & Compliance",
    title: "Privacy Policy",
    lastUpdated: "Last Updated:",
    intro1:
      "Sri Kandhaguru Foundation (“the Foundation”, “we”, “our”, or “us”) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, disclose, and protect the information you provide when you visit our website, make a donation, purchase products, register for events, or otherwise interact with us.",
    intro2:
      "By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy.",
    sec1Title: "1. Information We Collect",
    sec1Desc: "We may collect the following categories of information:",
    sec1Sub1: "Personal Information",
    sec1Sub1Desc:
      "When you interact with our website, we may collect information such as:",
    sec1Sub1List: [
      "Full name",
      "Email address",
      "Mobile or telephone number",
      "Postal or billing address",
      "Shipping address",
      "Date of birth (where required)",
      "Donation details",
      "Event registration details",
      "Purchase history",
      "Any information voluntarily submitted through contact forms or enquiries",
    ],
    sec1Sub2: "Payment Information",
    sec1Sub2Desc1:
      "Payments are processed through secure third-party payment gateways.",
    sec1Sub2Desc2:
      "We do not store your debit card, credit card, UPI PIN, CVV, internet banking credentials, or other sensitive payment information on our servers.",
    sec1Sub3: "Technical Information",
    sec1Sub3Desc:
      "When you visit our website, certain technical information may be collected automatically, including:",
    sec1Sub3List: [
      "IP address",
      "Browser type and version",
      "Device information",
      "Operating system",
      "Date and time of access",
      "Pages visited",
      "Website usage statistics",
      "Referring website",
    ],
    sec2Title: "2. How We Use Your Information",
    sec2Desc: "We use the information collected to:",
    sec2List: [
      "Process donations",
      "Process product orders",
      "Deliver purchased products",
      "Register you for events and programs",
      "Respond to enquiries and support requests",
      "Communicate important updates",
      "Send donation acknowledgements or receipts",
      "Improve our website and services",
      "Maintain website security",
      "Comply with applicable legal obligations",
      "Prevent fraud and misuse",
    ],
    sec2Desc2:
      "Where you have provided consent, we may also send newsletters, event announcements, or updates about the Foundation. You may opt out of such communications at any time.",
    sec3Title: "3. Cookies and Similar Technologies",
    sec3Desc: "Our website may use cookies and similar technologies to:",
    sec3List: [
      "Remember user preferences",
      "Improve website functionality",
      "Analyse website traffic",
      "Enhance user experience",
      "Maintain website security",
    ],
    sec3Desc2:
      "Most web browsers allow you to manage or disable cookies through your browser settings. Please note that disabling cookies may affect certain website features.",
    sec4Title: "4. Sharing of Information",
    sec4Desc1:
      "We respect your privacy and do not sell or rent your personal information.",
    sec4Desc2: "We may share your information only where necessary with:",
    sec4List: [
      "Payment gateway providers",
      "Courier and logistics partners",
      "Website hosting providers",
      "IT and technical support service providers",
      "Event management partners",
      "Government authorities or regulatory bodies where required by law",
    ],
    sec4Desc3:
      "All such parties are expected to protect your information and use it only for the purposes for which it is shared.",
    sec5Title: "5. Data Security",
    sec5Desc1:
      "We implement reasonable administrative, technical, and organisational safeguards to protect your personal information against unauthorised access, loss, misuse, disclosure, alteration, or destruction.",
    sec5Desc2:
      "While we strive to protect your information, no method of electronic transmission or internet storage is completely secure. Therefore, we cannot guarantee absolute security.",
    sec6Title: "6. Data Retention",
    sec6Desc:
      "We retain personal information only for as long as necessary to:",
    sec6List: [
      "Provide our services",
      "Process donations and orders",
      "Maintain financial and legal records",
      "Comply with applicable laws and regulations",
      "Resolve disputes",
      "Enforce our legal agreements",
    ],
    sec6Desc2:
      "Once information is no longer required, it will be securely deleted or anonymised, where appropriate.",
    sec7Title: "7. Your Rights",
    sec7Desc: "Subject to applicable law, you may have the right to:",
    sec7List: [
      "Request access to your personal information.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your personal information where legally permissible.",
      "Withdraw consent for certain processing activities.",
      "Opt out of receiving promotional communications.",
    ],
    sec7Desc2:
      "To exercise any of these rights, please contact us using the details provided below.",
    sec8Title: "8. Children’s Privacy",
    sec8Desc1:
      "Our website is intended for a general audience and is not specifically directed towards children under the age of 18.",
    sec8Desc2:
      "We do not knowingly collect personal information from children without appropriate parental or guardian consent. If we become aware that such information has been collected inadvertently, we will take reasonable steps to delete it.",
    sec9Title: "9. Third-Party Websites",
    sec9Desc1:
      "Our website may contain links to third-party websites or services for your convenience.",
    sec9Desc2:
      "We are not responsible for the privacy practices, content, or security of external websites. We encourage you to review the privacy policies of any third-party websites you visit.",
    sec10Title: "10. International Users",
    sec10Desc:
      "If you access our website from outside India, please note that your information may be processed and stored in India or in other jurisdictions where our service providers operate, subject to applicable laws.",
    sec11Title: "11. Changes to This Privacy Policy",
    sec11Desc1:
      "Sri Kandhaguru Foundation reserves the right to update or modify this Privacy Policy at any time.",
    sec11Desc2:
      "Any changes will become effective immediately upon publication on this website. We encourage users to review this page periodically to stay informed about how their information is protected.",
    sec12Title: "12. Contact Us",
    sec12Desc1:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our handling of your personal information, please contact us:",
    address: "Address: Bhavani, Erode District, Tamil Nadu, India",
    email: "Email:",
    sec12Desc2:
      "We will make reasonable efforts to respond to your enquiry in a timely manner.",
  },
  ta: {
    legal: "சட்ட மற்றும் இணக்கம்",
    title: "தனியுரிமை கொள்கை",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    intro1:
      "ஸ்ரீ கந்தகுரு அறக்கட்டளை (“அறக்கட்டளை”, “நாங்கள்”, “எங்கள்”, அல்லது “எங்களை”) உங்கள் தனியுரிமையை மதிக்கிறது மற்றும் உங்கள் தனிப்பட்ட தகவல்களைப் பாதுகாப்பதில் உறுதியாக உள்ளது. நீங்கள் எங்கள் இணையதளத்தைப் பார்வையிடும்போது, ​​நன்கொடை அளிக்கும்போது, ​​தயாரிப்புகளை வாங்கும் போது, ​​நிகழ்வுகளுக்குப் பதிவு செய்யும் போது அல்லது எங்களுடன் தொடர்பு கொள்ளும்போது நீங்கள் வழங்கும் தகவலை நாங்கள் எவ்வாறு சேகரிக்கிறோம், பயன்படுத்துகிறோம், சேமிக்கிறோம், வெளிப்படுத்துகிறோம் மற்றும் பாதுகாக்கிறோம் என்பதை இந்தத் தனியுரிமைக் கொள்கை விளக்குகிறது.",
    intro2:
      "எங்கள் இணையதளத்தை அணுகுவதன் மூலமோ அல்லது பயன்படுத்துவதன் மூலமோ, இந்த தனியுரிமைக் கொள்கையை நீங்கள் படித்துப் புரிந்து கொண்டீர்கள் என்பதை ஒப்புக்கொள்கிறீர்கள்.",
    sec1Title: "1. நாங்கள் சேகரிக்கும் தகவல்கள்",
    sec1Desc: "பின்வரும் வகையிலான தகவல்களை நாங்கள் சேகரிக்கலாம்:",
    sec1Sub1: "தனிப்பட்ட தகவல்கள்",
    sec1Sub1Desc:
      "எங்கள் இணையதளத்துடன் நீங்கள் தொடர்பு கொள்ளும்போது, ​​பின்வருவன போன்ற தகவல்களை நாங்கள் சேகரிக்கலாம்:",
    sec1Sub1List: [
      "முழு பெயர்",
      "மின்னஞ்சல் முகவரி",
      "மொபைல் அல்லது தொலைபேசி எண்",
      "அஞ்சல் அல்லது பில்லிங் முகவரி",
      "கப்பல் முகவரி",
      "பிறந்த தேதி (தேவைப்படும் இடங்களில்)",
      "நன்கொடை விவரங்கள்",
      "நிகழ்வு பதிவு விவரங்கள்",
      "கொள்முதல் வரலாறு",
      "தொடர்பு படிவங்கள் அல்லது விசாரணைகள் மூலம் தானாக முன்வந்து சமர்ப்பிக்கப்பட்ட எந்த தகவலும்",
    ],
    sec1Sub2: "பணம் செலுத்தும் தகவல்",
    sec1Sub2Desc1:
      "பாதுகாப்பான மூன்றாம் தரப்பு கட்டண நுழைவாயில்கள் மூலம் கொடுப்பனவுகள் செயலாக்கப்படுகின்றன.",
    sec1Sub2Desc2:
      "உங்கள் டெபிட் கார்டு, கிரெடிட் கார்டு, UPI பின், CVV, இணைய வங்கி சான்றுகள் அல்லது பிற முக்கிய கட்டணத் தகவல்களை எங்கள் சர்வர்களில் சேமிப்பதில்லை.",
    sec1Sub3: "தொழில்நுட்ப தகவல்",
    sec1Sub3Desc:
      "நீங்கள் எங்கள் இணையதளத்தைப் பார்வையிடும்போது, ​​உள்ளிட்ட சில தொழில்நுட்பத் தகவல்கள் தானாகவே சேகரிக்கப்படலாம்:",
    sec1Sub3List: [
      "IP முகவரி",
      "உலாவியின் வகை மற்றும் பதிப்பு",
      "சாதனத் தகவல்",
      "இயக்க முறைமை",
      "அணுகல் தேதி மற்றும் நேரம்",
      "பார்வையிட்ட பக்கங்கள்",
      "இணையதள பயன்பாட்டு புள்ளிவிவரங்கள்",
      "குறிப்பிடும் இணையதளம்",
    ],
    sec2Title: "2. உங்கள் தகவலை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்",
    sec2Desc: "சேகரிக்கப்பட்ட தகவலை இதற்குப் பயன்படுத்துகிறோம்:",
    sec2List: [
      "நன்கொடைகளை செயலாக்க",
      "தயாரிப்பு ஆர்டர்களைச் செயலாக்க",
      "வாங்கிய பொருட்களை விநியோகிக்க",
      "நிகழ்வுகள் மற்றும் திட்டங்களுக்கு உங்களைப் பதிவு செய்ய",
      "விசாரணைகள் மற்றும் ஆதரவு கோரிக்கைகளுக்கு பதிலளிக்க",
      "முக்கியமான அறிவிப்புகளைத் தெரிவிக்க",
      "நன்கொடை ஒப்புதல்கள் அல்லது ரசீதுகளை அனுப்ப",
      "எங்கள் இணையதளம் மற்றும் சேவைகளை மேம்படுத்த",
      "இணையதள பாதுகாப்பை பராமரிக்க",
      "பொருந்தக்கூடிய சட்டக் கடமைகளுக்கு இணங்க",
      "மோசடி மற்றும் தவறான பயன்பாட்டைத் தடுக்க",
    ],
    sec2Desc2:
      "நீங்கள் ஒப்புதல் அளித்திருந்தால், நாங்கள் செய்திமடல்கள், நிகழ்வு அறிவிப்புகள் அல்லது அறக்கட்டளை பற்றிய அறிவிப்புகளை அனுப்பலாம். அத்தகைய தகவல்தொடர்புகளிலிருந்து நீங்கள் எந்த நேரத்திலும் விலகலாம்.",
    sec3Title: "3. குக்கீகள் மற்றும் ஒத்த தொழில்நுட்பங்கள்",
    sec3Desc:
      "எங்கள் இணையதளம் குக்கீகள் மற்றும் ஒத்த தொழில்நுட்பங்களைப் பயன்படுத்தலாம்:",
    sec3List: [
      "பயனர் விருப்பங்களை நினைவில் கொள்ள",
      "இணையதள செயல்பாட்டை மேம்படுத்த",
      "இணையதள போக்குவரத்தை பகுப்பாய்வு செய்ய",
      "பயனர் அனுபவத்தை மேம்படுத்த",
      "இணையதள பாதுகாப்பை பராமரிக்க",
    ],
    sec3Desc2:
      "உங்கள் உலாவி அமைப்புகள் மூலம் குக்கீகளை நிர்வகிக்க அல்லது முடக்க பெரும்பாலான இணைய உலாவிகள் உங்களை அனுமதிக்கின்றன. குக்கீகளை முடக்குவது சில இணையதள அம்சங்களைப் பாதிக்கலாம் என்பதை நினைவில் கொள்ளவும்.",
    sec4Title: "4. தகவல்களைப் பகிர்தல்",
    sec4Desc1:
      "உங்கள் தனியுரிமையை நாங்கள் மதிக்கிறோம், மேலும் உங்கள் தனிப்பட்ட தகவலை விற்கவோ அல்லது வாடகைக்கு விடவோ மாட்டோம்.",
    sec4Desc2: "தேவையான இடங்களில் மட்டுமே உங்கள் தகவலைப் பகிரலாம்:",
    sec4List: [
      "பணம் செலுத்தும் நுழைவாயில் வழங்குநர்கள்",
      "கூரியர் மற்றும் தளவாட பங்காளிகள்",
      "இணையதள ஹோஸ்டிங் வழங்குநர்கள்",
      "தகவல் தொழில்நுட்பம் மற்றும் தொழில்நுட்ப ஆதரவு சேவை வழங்குநர்கள்",
      "நிகழ்வு மேலாண்மை கூட்டாளர்கள்",
      "சட்டத்தின்படி தேவைப்படும் இடங்களில் அரசாங்க அதிகாரிகள் அல்லது ஒழுங்குமுறை அமைப்புகள்",
    ],
    sec4Desc3:
      "அத்தகைய தரப்பினர் அனைவரும் உங்கள் தகவலைப் பாதுகாப்பார்கள் என்றும், அது பகிரப்படும் நோக்கங்களுக்காக மட்டுமே அதைப் பயன்படுத்துவார்கள் என்றும் எதிர்பார்க்கப்படுகிறது.",
    sec5Title: "5. தரவு பாதுகாப்பு",
    sec5Desc1:
      "அங்கீகரிக்கப்படாத அணுகல், இழப்பு, தவறாகப் பயன்படுத்துதல், வெளிப்படுத்துதல், மாற்றுதல் அல்லது அழித்தல் ஆகியவற்றிலிருந்து உங்கள் தனிப்பட்ட தகவலைப் பாதுகாக்க நியாயமான நிர்வாக, தொழில்நுட்ப மற்றும் நிறுவனப் பாதுகாப்புகளைச் செயல்படுத்துகிறோம்.",
    sec5Desc2:
      "உங்கள் தகவலைப் பாதுகாக்க நாங்கள் முயற்சிக்கும் அதே வேளையில், எந்தவொரு மின்னணு பரிமாற்ற முறையும் அல்லது இணைய சேமிப்பகமும் முற்றிலும் பாதுகாப்பானது அல்ல. எனவே, முழுமையான பாதுகாப்பிற்கு நாங்கள் உத்தரவாதம் அளிக்க முடியாது.",
    sec6Title: "6. தரவு தக்கவைப்பு",
    sec6Desc:
      "தேவையான வரை மட்டுமே தனிப்பட்ட தகவல்களை நாங்கள் தக்கவைத்துக்கொள்கிறோம்:",
    sec6List: [
      "எங்கள் சேவைகளை வழங்க",
      "நன்கொடைகள் மற்றும் ஆர்டர்களைச் செயலாக்க",
      "நிதி மற்றும் சட்டப் பதிவேடுகளைப் பராமரிக்க",
      "பொருந்தக்கூடிய சட்டங்கள் மற்றும் விதிமுறைகளுக்கு இணங்க",
      "தகராறுகளை தீர்க்க",
      "எங்கள் சட்ட ஒப்பந்தங்களை செயல்படுத்த",
    ],
    sec6Desc2:
      "தகவல் தேவைப்படாத நிலையில், அது பாதுகாப்பாக நீக்கப்படும் அல்லது தகுந்த இடங்களில் அநாமதேயமாக்கப்படும்.",
    sec7Title: "7. உங்கள் உரிமைகள்",
    sec7Desc:
      "பொருந்தக்கூடிய சட்டத்திற்கு உட்பட்டு, உங்களுக்கு பின்வரும் உரிமைகள் இருக்கலாம்:",
    sec7List: [
      "உங்கள் தனிப்பட்ட தகவலை அணுக கோரிக்கை.",
      "தவறான அல்லது முழுமையற்ற தகவலைத் திருத்தக் கோரிக்கை.",
      "சட்டப்பூர்வமாக அனுமதிக்கப்படும் பட்சத்தில் உங்கள் தனிப்பட்ட தகவலை நீக்கக் கோரிக்கை.",
      "சில செயலாக்க நடவடிக்கைகளுக்கான ஒப்புதலைத் திரும்பப் பெறுதல்.",
      "விளம்பர தகவல்தொடர்புகளைப் பெறுவதிலிருந்து விலகுதல்.",
    ],
    sec7Desc2:
      "இந்த உரிமைகளில் ஏதேனும் ஒன்றைப் பயன்படுத்த, கீழே வழங்கப்பட்டுள்ள விவரங்களைப் பயன்படுத்தி எங்களைத் தொடர்பு கொள்ளவும்.",
    sec8Title: "8. குழந்தைகளின் தனியுரிமை",
    sec8Desc1:
      "எங்கள் இணையதளம் பொதுவான பார்வையாளர்களுக்கானது மற்றும் குறிப்பாக 18 வயதிற்குட்பட்ட குழந்தைகளுக்கானது அல்ல.",
    sec8Desc2:
      "பொருத்தமான பெற்றோர் அல்லது பாதுகாவலரின் ஒப்புதலின்றி குழந்தைகளிடமிருந்து தனிப்பட்ட தகவல்களை நாங்கள் வேண்டுமென்றே சேகரிப்பதில்லை. அத்தகைய தகவல்கள் கவனக்குறைவாக சேகரிக்கப்பட்டதை நாங்கள் அறிந்தால், அதை நீக்க நியாயமான நடவடிக்கைகளை எடுப்போம்.",
    sec9Title: "9. மூன்றாம் தரப்பு இணையதளங்கள்",
    sec9Desc1:
      "உங்கள் வசதிக்காக எங்கள் இணையதளத்தில் மூன்றாம் தரப்பு இணையதளங்கள் அல்லது சேவைகளுக்கான இணைப்புகள் இருக்கலாம்.",
    sec9Desc2:
      "வெளிப்புற இணையதளங்களின் தனியுரிமை நடைமுறைகள், உள்ளடக்கம் அல்லது பாதுகாப்பிற்கு நாங்கள் பொறுப்பல்ல. நீங்கள் பார்வையிடும் மூன்றாம் தரப்பு இணையதளங்களின் தனியுரிமைக் கொள்கைகளை மதிப்பாய்வு செய்யுமாறு நாங்கள் உங்களை ஊக்குவிக்கிறோம்.",
    sec10Title: "10. சர்வதேச பயனர்கள்",
    sec10Desc:
      "இந்தியாவுக்கு வெளியிலிருந்து எங்கள் இணையதளத்தை நீங்கள் அணுகினால், உங்கள் தகவல் இந்தியாவில் அல்லது எங்கள் சேவை வழங்குநர்கள் செயல்படும் பிற அதிகார வரம்புகளில், பொருந்தக்கூடிய சட்டங்களுக்கு உட்பட்டு செயலாக்கப்பட்டு சேமிக்கப்படலாம் என்பதை நினைவில் கொள்ளவும்.",
    sec11Title: "11. இந்த தனியுரிமைக் கொள்கையில் மாற்றங்கள்",
    sec11Desc1:
      "எந்த நேரத்திலும் இந்த தனியுரிமைக் கொள்கையைப் புதுப்பிக்க அல்லது மாற்ற ஸ்ரீ கந்தகுரு அறக்கட்டளைக்கு உரிமை உள்ளது.",
    sec11Desc2:
      "இந்த இணையதளத்தில் வெளியிட்டவுடன் எந்த மாற்றமும் உடனடியாக நடைமுறைக்கு வரும். பயனர்கள் தங்கள் தகவல்கள் எவ்வாறு பாதுகாக்கப்படுகின்றன என்பதைப் பற்றி தொடர்ந்து அறிய, இந்தப் பக்கத்தை அவ்வப்போது மதிப்பாய்வு செய்யுமாறு ஊக்குவிக்கிறோம்.",
    sec12Title: "12. எங்களை தொடர்பு கொள்ள",
    sec12Desc1:
      "இந்த தனியுரிமைக் கொள்கை அல்லது உங்கள் தனிப்பட்ட தகவலை நாங்கள் கையாளுவது குறித்து ஏதேனும் கேள்விகள், கவலைகள் அல்லது கோரிக்கைகள் இருந்தால், தயவுசெய்து எங்களை தொடர்பு கொள்ளவும்:",
    address: "முகவரி: பவானி, ஈரோடு மாவட்டம், தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்:",
    sec12Desc2:
      "உங்கள் விசாரணைக்கு சரியான நேரத்தில் பதிலளிக்க நியாயமான முயற்சிகளை மேற்கொள்வோம்.",
  },
  hi: {
    legal: "कानूनी और अनुपालन",
    title: "गोपनीयता नीति",
    lastUpdated: "अंतिम अद्यतन:",
    intro1:
      "श्री कंधगुरु फाउंडेशन (“फाउंडेशन”, “हम”, “हमारा”, या “हमें”) आपकी गोपनीयता को महत्व देता है और आपकी व्यक्तिगत जानकारी की रक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट पर जाते हैं, दान करते हैं, उत्पाद खरीदते हैं, आयोजनों के लिए पंजीकरण करते हैं, या अन्यथा हमारे साथ बातचीत करते हैं, तो हम आपके द्वारा प्रदान की गई जानकारी को कैसे एकत्र करते हैं, उपयोग करते हैं, संग्रहीत करते हैं, प्रकट करते हैं और उसकी रक्षा करते हैं।",
    intro2:
      "हमारी वेबसाइट तक पहुँचने या उसका उपयोग करने से, आप स्वीकार करते हैं कि आपने इस गोपनीयता नीति को पढ़ और समझ लिया है।",
    sec1Title: "1. हम क्या जानकारी एकत्र करते हैं",
    sec1Desc: "हम जानकारी की निम्नलिखित श्रेणियां एकत्र कर सकते हैं:",
    sec1Sub1: "व्यक्तिगत जानकारी",
    sec1Sub1Desc:
      "जब आप हमारी वेबसाइट के साथ बातचीत करते हैं, तो हम ऐसी जानकारी एकत्र कर सकते हैं जैसे:",
    sec1Sub1List: [
      "पूरा नाम",
      "ईमेल पता",
      "मोबाइल या टेलीफोन नंबर",
      "डाक या बिलिंग पता",
      "शिपिंग पता",
      "जन्म तिथि (जहां आवश्यक हो)",
      "दान विवरण",
      "घटना पंजीकरण विवरण",
      "खरीद का इतिहास",
      "संपर्क फ़ॉर्म या पूछताछ के माध्यम से स्वेच्छा से प्रस्तुत की गई कोई भी जानकारी",
    ],
    sec1Sub2: "भुगतान जानकारी",
    sec1Sub2Desc1:
      "भुगतान सुरक्षित तृतीय-पक्ष भुगतान गेटवे के माध्यम से संसाधित किए जाते हैं।",
    sec1Sub2Desc2:
      "हम आपके डेबिट कार्ड, क्रेडिट कार्ड, यूपीआई पिन, सीवीवी, इंटरनेट बैंकिंग क्रेडेंशियल या अन्य संवेदनशील भुगतान जानकारी को हमारे सर्वर पर संग्रहीत नहीं करते हैं।",
    sec1Sub3: "तकनीकी जानकारी",
    sec1Sub3Desc:
      "जब आप हमारी वेबसाइट पर जाते हैं, तो कुछ तकनीकी जानकारी स्वचालित रूप से एकत्र की जा सकती है, जिनमें शामिल हैं:",
    sec1Sub3List: [
      "आईपी पता",
      "ब्राउज़र प्रकार और संस्करण",
      "उपकरण की जानकारी",
      "ऑपरेटिंग सिस्टम",
      "पहुंच की तिथि और समय",
      "देखे गए पृष्ठ",
      "वेबसाइट उपयोग आंकड़े",
      "संदर्भित वेबसाइट",
    ],
    sec2Title: "2. हम आपकी जानकारी का उपयोग कैसे करते हैं",
    sec2Desc: "हम एकत्रित जानकारी का उपयोग इसके लिए करते हैं:",
    sec2List: [
      "दान की प्रक्रिया",
      "उत्पाद ऑर्डर की प्रक्रिया",
      "खरीदे गए उत्पादों का वितरण",
      "घटनाओं और कार्यक्रमों के लिए आपको पंजीकृत करें",
      "पूछताछ और सहायता अनुरोधों का जवाब दें",
      "महत्वपूर्ण अपडेट संप्रेषित करें",
      "दान पावती या रसीदें भेजें",
      "हमारी वेबसाइट और सेवाओं में सुधार करें",
      "वेबसाइट सुरक्षा बनाए रखें",
      "लागू कानूनी दायित्वों का पालन करें",
      "धोखाधड़ी और दुरुपयोग रोकें",
    ],
    sec2Desc2:
      "जहां आपने सहमति दी है, हम न्यूज़लेटर, कार्यक्रम घोषणाएं या फाउंडेशन के बारे में अपडेट भी भेज सकते हैं। आप किसी भी समय ऐसे संचार प्राप्त करने से ऑप्ट आउट कर सकते हैं।",
    sec3Title: "3. कुकीज़ और समान तकनीकें",
    sec3Desc: "हमारी वेबसाइट कुकीज़ और समान तकनीकों का उपयोग कर सकती है:",
    sec3List: [
      "उपयोगकर्ता प्राथमिकताओं को याद रखें",
      "वेबसाइट कार्यक्षमता में सुधार करें",
      "वेबसाइट ट्रैफ़िक का विश्लेषण करें",
      "उपयोगकर्ता अनुभव बढ़ाएँ",
      "वेबसाइट सुरक्षा बनाए रखें",
    ],
    sec3Desc2:
      "अधिकांश वेब ब्राउज़र आपको अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ प्रबंधित या अक्षम करने की अनुमति देते हैं। कृपया ध्यान दें कि कुकीज़ अक्षम करने से कुछ वेबसाइट सुविधाएँ प्रभावित हो सकती हैं।",
    sec4Title: "4. जानकारी साझा करना",
    sec4Desc1:
      "हम आपकी गोपनीयता का सम्मान करते हैं और आपकी व्यक्तिगत जानकारी को बेचते या किराए पर नहीं देते हैं।",
    sec4Desc2: "हम आपकी जानकारी केवल आवश्यक होने पर ही साझा कर सकते हैं:",
    sec4List: [
      "भुगतान गेटवे प्रदाता",
      "कूरियर और रसद भागीदार",
      "वेबसाइट होस्टिंग प्रदाता",
      "आईटी और तकनीकी सहायता सेवा प्रदाता",
      "इवेंट प्रबंधन भागीदार",
      "जहां कानून द्वारा आवश्यक हो वहां सरकारी अधिकारी या नियामक निकाय",
    ],
    sec4Desc3:
      "ऐसी सभी पार्टियों से अपेक्षा की जाती है कि वे आपकी जानकारी की रक्षा करें और इसका उपयोग केवल उन उद्देश्यों के लिए करें जिनके लिए इसे साझा किया गया है।",
    sec5Title: "5. डेटा सुरक्षा",
    sec5Desc1:
      "हम आपकी व्यक्तिगत जानकारी को अनधिकृत पहुंच, हानि, दुरुपयोग, प्रकटीकरण, परिवर्तन या विनाश से बचाने के लिए उचित प्रशासनिक, तकनीकी और संगठनात्मक सुरक्षा उपाय लागू करते हैं।",
    sec5Desc2:
      "हालाँकि हम आपकी जानकारी की सुरक्षा करने का प्रयास करते हैं, कोई भी इलेक्ट्रॉनिक ट्रांसमिशन या इंटरनेट स्टोरेज विधि पूरी तरह से सुरक्षित नहीं है। इसलिए, हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।",
    sec6Title: "6. डेटा प्रतिधारण",
    sec6Desc:
      "हम व्यक्तिगत जानकारी केवल तब तक रखते हैं जब तक इसके लिए आवश्यक हो:",
    sec6List: [
      "हमारी सेवाएँ प्रदान करें",
      "दान और आदेशों को संसाधित करें",
      "वित्तीय और कानूनी रिकॉर्ड बनाए रखें",
      "लागू कानूनों और विनियमों का अनुपालन करें",
      "विवाद सुलझाएं",
      "हमारे कानूनी समझौतों को लागू करें",
    ],
    sec6Desc2:
      "एक बार जानकारी की आवश्यकता नहीं रह जाने पर, इसे सुरक्षित रूप से हटा दिया जाएगा या जहां उपयुक्त हो वहां गुमनाम कर दिया जाएगा।",
    sec7Title: "7. आपके अधिकार",
    sec7Desc: "लागू कानून के अधीन, आपको निम्नलिखित अधिकार हो सकते हैं:",
    sec7List: [
      "अपनी व्यक्तिगत जानकारी तक पहुंच का अनुरोध करें।",
      "गलत या अधूरी जानकारी में सुधार का अनुरोध करें।",
      "जहां कानूनी रूप से अनुमेय हो, अपनी व्यक्तिगत जानकारी को हटाने का अनुरोध करें।",
      "कुछ प्रसंस्करण गतिविधियों के लिए सहमति वापस लें।",
      "प्रचार संचार प्राप्त करने से ऑप्ट आउट करें।",
    ],
    sec7Desc2:
      "इनमें से किसी भी अधिकार का प्रयोग करने के लिए, कृपया नीचे दिए गए विवरणों का उपयोग करके हमसे संपर्क करें।",
    sec8Title: "8. बच्चों की गोपनीयता",
    sec8Desc1:
      "हमारी वेबसाइट आम दर्शकों के लिए है और विशेष रूप से 18 वर्ष से कम उम्र के बच्चों के लिए निर्देशित नहीं है।",
    sec8Desc2:
      "हम उचित माता-पिता या अभिभावक की सहमति के बिना जानबूझकर बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं। यदि हमें पता चलता है कि ऐसी जानकारी अनजाने में एकत्र की गई है, तो हम इसे हटाने के लिए उचित कदम उठाएंगे।",
    sec9Title: "9. तृतीय-पक्ष वेबसाइटें",
    sec9Desc1:
      "हमारी वेबसाइट में आपकी सुविधा के लिए तृतीय-पक्ष वेबसाइटों या सेवाओं के लिंक हो सकते हैं।",
    sec9Desc2:
      "हम बाहरी वेबसाइटों की गोपनीयता प्रथाओं, सामग्री या सुरक्षा के लिए ज़िम्मेदार नहीं हैं। हम आपको उन तृतीय-पक्ष वेबसाइटों की गोपनीयता नीतियों की समीक्षा करने के लिए प्रोत्साहित करते हैं जिन पर आप जाते हैं।",
    sec10Title: "10. अंतर्राष्ट्रीय उपयोगकर्ता",
    sec10Desc:
      "यदि आप भारत के बाहर से हमारी वेबसाइट तक पहुँचते हैं, तो कृपया ध्यान दें कि आपकी जानकारी लागू कानूनों के अधीन, भारत में या अन्य न्यायालयों में जहाँ हमारे सेवा प्रदाता काम करते हैं, संसाधित और संग्रहीत की जा सकती है।",
    sec11Title: "11. इस गोपनीयता नीति में परिवर्तन",
    sec11Desc1:
      "श्री कंधगुरु फाउंडेशन को किसी भी समय इस गोपनीयता नीति को अद्यतन या संशोधित करने का अधिकार सुरक्षित है।",
    sec11Desc2:
      "कोई भी परिवर्तन इस वेबसाइट पर प्रकाशन के तुरंत बाद प्रभावी हो जाएगा। हम उपयोगकर्ताओं को अपनी जानकारी की सुरक्षा के बारे में सूचित रहने के लिए समय-समय पर इस पृष्ठ की समीक्षा करने के लिए प्रोत्साहित करते हैं।",
    sec12Title: "12. हमसे संपर्क करें",
    sec12Desc1:
      "यदि आपके पास इस गोपनीयता नीति या हमारे द्वारा आपकी व्यक्तिगत जानकारी को संभालने के संबंध में कोई प्रश्न, चिंताएं या अनुरोध हैं, तो कृपया हमसे संपर्क करें:",
    address: "पता: भवानी, इरोड जिला, तमिलनाडु, भारत",
    email: "ईमेल:",
    sec12Desc2: "हम समय पर आपकी पूछताछ का जवाब देने के लिए उचित प्रयास करेंगे।",
  },
};

export default function PrivacyPolicy() {
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
              <p>{t.intro1}</p>
              <p>{t.intro2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec1Title}
              </h2>
              <p>{t.sec1Desc}</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">
                {t.sec1Sub1}
              </h3>
              <p>{t.sec1Sub1Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec1Sub1List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">
                {t.sec1Sub2}
              </h3>
              <p>{t.sec1Sub2Desc1}</p>
              <p>{t.sec1Sub2Desc2}</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">
                {t.sec1Sub3}
              </h3>
              <p>{t.sec1Sub3Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec1Sub3List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec2Title}
              </h2>
              <p>{t.sec2Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec2List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.sec2Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec3Title}
              </h2>
              <p>{t.sec3Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec3List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.sec3Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec4Title}
              </h2>
              <p>{t.sec4Desc1}</p>
              <p>{t.sec4Desc2}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec4List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.sec4Desc3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec5Title}
              </h2>
              <p>{t.sec5Desc1}</p>
              <p>{t.sec5Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec6Title}
              </h2>
              <p>{t.sec6Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec6List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.sec6Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec7Title}
              </h2>
              <p>{t.sec7Desc}</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
                {t.sec7List.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.sec7Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec8Title}
              </h2>
              <p>{t.sec8Desc1}</p>
              <p>{t.sec8Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec9Title}
              </h2>
              <p>{t.sec9Desc1}</p>
              <p>{t.sec9Desc2}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec10Title}
              </h2>
              <p>{t.sec10Desc}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec11Title}
              </h2>
              <p>{t.sec11Desc1}</p>
              <p>{t.sec11Desc2}</p>
            </section>

            <section className="space-y-4 mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t.sec12Title}
              </h2>
              <p>{t.sec12Desc1}</p>
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
              <p className="mt-4">{t.sec12Desc2}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
