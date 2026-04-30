import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Compass, Users, Eye, Lightbulb, Layers, Rocket, Target, Loader2, Check, FileText, Download, ArrowRight, BookOpen, Settings2, RefreshCw, ChevronDown } from 'lucide-react';

// ============== HARAMAIN BRAND TOKENS ==============
const BRAND = {
  charcoal: '#25343F',
  gold: '#BB9661',
  green: '#006654',
  terracotta: '#BB5A1C',
  cream: '#F5F1E8',
  ink: '#1A2530',
  pearl: '#FAF8F3',
  mist: '#E8E2D4',
};

// ============== METHODOLOGY DATA (FROM KUMAR'S BOOK) ==============
const MODES = [
  {
    id: 1,
    code: 'sense_intent',
    nameAr: 'استشعار النية',
    nameEn: 'Sense Intent',
    icon: Compass,
    color: BRAND.terracotta,
    question: 'أين العالم يتجه؟ وأين يجب أن نتحرك؟',
    description: 'استشعار التغيرات والاتجاهات وصياغة النية الأولية للمبادرة',
    mindsets: [
      'استشعار الظروف المتغيرة',
      'رؤية المشهد الكامل',
      'استشراف الاتجاهات',
      'إعادة صياغة المشكلات',
      'تكوين النية',
    ],
    methods: [
      {
        id: '1.2',
        nameAr: 'مسح الإعلام الشائع',
        nameEn: 'Popular Media Scan',
        purpose: 'رصد ما يُقال في الإعلام والمنصات حول التحدي',
        input: 'موضوع التحدي وكلمات مفتاحية',
        output: 'قائمة برؤى من المحادثات الإعلامية الحديثة',
      },
      {
        id: '1.3',
        nameAr: 'الحقائق الجوهرية',
        nameEn: 'Key Facts',
        purpose: 'استخراج الحقائق الأساسية والإحصاءات المهمة',
        input: 'موضوع التحدي',
        output: '10-15 حقيقة جوهرية مرتبة حسب الأهمية',
      },
      {
        id: '1.11',
        nameAr: 'استكشاف من-إلى',
        nameEn: 'From…To Exploration',
        purpose: 'تحديد الانتقال من الوضع الحالي إلى الطموح المستقبلي',
        input: 'الوضع الراهن للتجربة',
        output: 'مصفوفة تحولات (من → إلى) لأبعاد متعددة',
      },
      {
        id: '1.14',
        nameAr: 'بيان النية',
        nameEn: 'Intent Statement',
        purpose: 'صياغة بيان واضح ومُلهم لنية المبادرة',
        input: 'مخرجات الأدوات السابقة',
        output: 'بيان نية متماسك (3-5 جمل)',
      },
    ],
  },
  {
    id: 2,
    code: 'know_context',
    nameAr: 'فهم السياق',
    nameEn: 'Know Context',
    icon: Layers,
    color: BRAND.charcoal,
    question: 'في أي سياق نعمل؟ ومن المنافسون والمكمّلون؟',
    description: 'دراسة البيئة المحيطة والنماذج المماثلة والتحديات المؤسسية',
    mindsets: [
      'معرفة تاريخ السياق',
      'فهم الحدود',
      'رؤية المنظومة الكاملة',
      'فهم أصحاب المصلحة',
      'استخدام النماذج الذهنية',
    ],
    methods: [
      {
        id: '2.7',
        nameAr: 'النماذج المشابهة',
        nameEn: 'Analogous Models',
        purpose: 'دراسة كيف تعالج صناعات أخرى تحديات مشابهة',
        input: 'التحدي + قطاعات مشابهة (مطارات، فنادق، ملاعب)',
        output: '5-7 نماذج تطبيقية مع الدروس المستفادة',
      },
      {
        id: '2.11',
        nameAr: 'تحليل سوات',
        nameEn: 'SWOT Analysis',
        purpose: 'تحليل نقاط القوة والضعف والفرص والتهديدات',
        input: 'التحدي والسياق المؤسسي',
        output: 'مصفوفة سوات رباعية',
      },
      {
        id: '2.12',
        nameAr: 'استشارة خبراء المجال',
        nameEn: 'Subject Matter Experts',
        purpose: 'محاكاة استشارة خبراء متخصصين',
        input: 'التحدي + تخصصات الخبراء',
        output: 'آراء وتوصيات من 4-5 منظورات تخصصية',
      },
      {
        id: '2.13',
        nameAr: 'نقاشات مجموعات الاهتمام',
        nameEn: 'Interest Groups Discussion',
        purpose: 'استكشاف آراء المجموعات المختلفة المعنية',
        input: 'التحدي + المجموعات المستهدفة',
        output: 'تحليل لمواقف وتطلعات كل مجموعة',
      },
    ],
  },
  {
    id: 3,
    code: 'know_people',
    nameAr: 'معرفة الناس',
    nameEn: 'Know People',
    icon: Users,
    color: BRAND.green,
    question: 'من هم الضيوف فعلياً؟ وما احتياجاتهم غير المنطوقة؟',
    description: 'فهم عميق للضيوف عبر برسوناتهم المتنوعة',
    mindsets: [
      'ملاحظة كل شيء',
      'بناء التعاطف',
      'الانغماس في الحياة اليومية',
      'الإصغاء بانفتاح',
      'البحث عن المشكلات والاحتياجات',
    ],
    methods: [
      {
        id: '3.4',
        nameAr: 'العوامل الإنسانية الخمسة',
        nameEn: 'Five Human Factors',
        purpose: 'تحليل أبعاد الضيف الجسدية والمعرفية والاجتماعية والثقافية والعاطفية',
        input: 'البرسونا المستهدفة',
        output: 'تحليل خماسي الأبعاد لكل برسونا',
      },
      {
        id: '3.5',
        nameAr: 'إطار POEMS',
        nameEn: 'POEMS Framework',
        purpose: 'تحليل شامل: الناس، البيئات، الأشياء، الرسائل، الخدمات',
        input: 'سياق التجربة',
        output: 'إطار خماسي لكل عناصر التجربة',
      },
      {
        id: '3.6',
        nameAr: 'الزيارة الميدانية',
        nameEn: 'Field Visit',
        purpose: 'محاكاة زيارة ميدانية لرصد التجربة في موقعها',
        input: 'موقع التجربة + البرسونا',
        output: 'ملاحظات ميدانية مُهيكلة',
      },
      {
        id: '3.8',
        nameAr: 'المقابلة الإثنوغرافية',
        nameEn: 'Ethnographic Interview',
        purpose: 'محاكاة مقابلات عميقة مع برسونا متنوعة',
        input: 'البرسونا + موضوع التجربة',
        output: 'اقتباسات ورؤى من 3-5 برسونا',
      },
    ],
  },
  {
    id: 4,
    code: 'frame_insights',
    nameAr: 'صياغة الرؤى',
    nameEn: 'Frame Insights',
    icon: Eye,
    color: BRAND.gold,
    question: 'ما الأنماط التي تظهر؟ وما الرؤى التي يجب أن نبني عليها؟',
    description: 'تحويل البيانات إلى رؤى وأنماط ومبادئ تصميمية',
    mindsets: [
      'استكشاف الأنظمة',
      'البحث عن الأنماط',
      'بناء النظرة الشاملة',
      'تحديد الفرص',
      'تطوير المبادئ التوجيهية',
    ],
    methods: [
      {
        id: '4.1',
        nameAr: 'من الملاحظات إلى الرؤى',
        nameEn: 'Observations to Insights',
        purpose: 'تحويل الملاحظات الميدانية إلى رؤى عميقة',
        input: 'ملاحظات من طور Know People',
        output: 'قائمة برؤى مُصاغة (10-15 رؤية)',
      },
      {
        id: '4.16',
        nameAr: 'خريطة التجربة المؤثرة',
        nameEn: 'Compelling Experience Map',
        purpose: 'رسم خريطة للحظات المؤثرة في رحلة الضيف',
        input: 'رحلة الضيف الكاملة',
        output: 'خريطة بصرية للحظات المهمة',
      },
      {
        id: '4.17',
        nameAr: 'خريطة رحلة الضيف',
        nameEn: 'User Journey Map',
        purpose: 'تفصيل رحلة الضيف خطوة بخطوة مع نقاط الألم',
        input: 'البرسونا المستهدفة + سياق التجربة',
        output: 'خريطة رحلة بمراحل وعواطف ونقاط ألم',
      },
      {
        id: '4.18',
        nameAr: 'إطار التلخيص',
        nameEn: 'Summary Framework',
        purpose: 'تنظيم كل ما تم تعلمه في إطار واحد',
        input: 'مخرجات الأطوار السابقة',
        output: 'إطار تلخيصي شامل',
      },
      {
        id: '4.19',
        nameAr: 'توليد المبادئ التصميمية',
        nameEn: 'Design Principles Generation',
        purpose: 'استخراج المبادئ التي ستوجه توليد الأفكار',
        input: 'الرؤى المستخرجة',
        output: '5-8 مبادئ تصميمية واضحة',
      },
    ],
  },
  {
    id: 5,
    code: 'explore_concepts',
    nameAr: 'استكشاف المفاهيم',
    nameEn: 'Explore Concepts',
    icon: Lightbulb,
    color: BRAND.terracotta,
    question: 'ما المفاهيم الجريئة التي يمكن أن تخدم الضيف بشكل أفضل؟',
    description: 'توليد أفكار ومفاهيم مبتكرة للمبادرات',
    mindsets: [
      'تحدي الافتراضات',
      'الوقوف في المستقبل',
      'استكشاف الأطراف',
      'البحث عن قيمة مضافة واضحة',
      'سرد قصص المستقبل',
    ],
    methods: [
      {
        id: '5.1',
        nameAr: 'من المبادئ إلى الفرص',
        nameEn: 'Principles to Opportunities',
        purpose: 'تحويل المبادئ التصميمية إلى فرص ابتكار',
        input: 'المبادئ التصميمية من الطور 4',
        output: 'قائمة فرص ابتكار محددة',
      },
      {
        id: '5.2',
        nameAr: 'خريطة الفرص الذهنية',
        nameEn: 'Opportunity Mind Map',
        purpose: 'تفريع الفرص إلى مفاهيم وأفكار فرعية',
        input: 'فرص الابتكار الرئيسية',
        output: 'خريطة ذهنية متفرعة',
      },
      {
        id: '5.5',
        nameAr: 'جلسة توليد الأفكار',
        nameEn: 'Ideation Session',
        purpose: 'الجلسة الأساسية لتوليد كم كبير من الأفكار',
        input: 'الفرص + المبادئ',
        output: '20-30 فكرة مبادرة بصياغة "ماذا لو"',
      },
      {
        id: '5.6',
        nameAr: 'مصفوفة توليد المفاهيم',
        nameEn: 'Concept-Generating Matrix',
        purpose: 'توليد مفاهيم عند تقاطع البرسونا والفرص',
        input: 'البرسونا + الفرص',
        output: 'مصفوفة ثنائية الأبعاد بمفاهيم',
      },
      {
        id: '5.14',
        nameAr: 'سيناريوهات المفاهيم',
        nameEn: 'Concept Scenarios',
        purpose: 'سرد قصصي لتطبيق المفاهيم في الواقع',
        input: 'أفضل المفاهيم',
        output: 'سيناريوهات قصصية لـ 3-5 مفاهيم',
      },
    ],
  },
  {
    id: 6,
    code: 'frame_solutions',
    nameAr: 'صياغة الحلول',
    nameEn: 'Frame Solutions',
    icon: Target,
    color: BRAND.charcoal,
    question: 'أي المفاهيم يمكن أن تتكامل لتشكل حلولاً متينة؟',
    description: 'تجميع المفاهيم في حلول متكاملة وتقييمها',
    mindsets: [
      'تصور حلول شاملة',
      'تصور الخيارات',
      'إصدار أحكام قيمة',
      'تخيل السيناريوهات',
      'هيكلة الحلول',
    ],
    methods: [
      {
        id: '6.2',
        nameAr: 'تقييم المفاهيم',
        nameEn: 'Concept Evaluation',
        purpose: 'تقييم المفاهيم وفق معايير القيمة والجدوى',
        input: 'قائمة المفاهيم المولّدة',
        output: 'مصفوفة تقييم مع درجات',
      },
      {
        id: '6.6',
        nameAr: 'رسم الحلول البياني',
        nameEn: 'Solution Diagramming',
        purpose: 'رسم الحلول كأنظمة متكاملة',
        input: 'أفضل المفاهيم',
        output: 'وصف الحل كنظام بمكوناته وعلاقاته',
      },
      {
        id: '6.10',
        nameAr: 'تقييم الحلول',
        nameEn: 'Solution Evaluation',
        purpose: 'تقييم الحلول النهائية وفق أبعاد متعددة',
        input: 'الحلول المقترحة',
        output: 'تقييم متعدد الأبعاد للحلول',
      },
      {
        id: '6.11',
        nameAr: 'خارطة الحلول',
        nameEn: 'Solution Roadmap',
        purpose: 'ترتيب الحلول في خارطة زمنية',
        input: 'الحلول المُقيّمة',
        output: 'خارطة طريق بمراحل وأولويات',
      },
    ],
  },
  {
    id: 7,
    code: 'realize_offerings',
    nameAr: 'تحقيق العروض',
    nameEn: 'Realize Offerings',
    icon: Rocket,
    color: BRAND.green,
    question: 'كيف ننقل الحلول إلى أرض الواقع؟',
    description: 'تحويل الحلول إلى مبادرات قابلة للتنفيذ',
    mindsets: [
      'تكرار النماذج الأولية',
      'التقييم في الواقع',
      'تحديد الاستراتيجيات',
      'التنفيذ في الواقع',
      'إيصال الرؤية',
    ],
    methods: [
      {
        id: '7.1',
        nameAr: 'خارطة الطريق الاستراتيجية',
        nameEn: 'Strategy Roadmap',
        purpose: 'صياغة خارطة طريق استراتيجية للمبادرات',
        input: 'الحلول المعتمدة',
        output: 'خارطة طريق استراتيجية بمراحل',
      },
      {
        id: '7.5',
        nameAr: 'خطة التنفيذ',
        nameEn: 'Implementation Plan',
        purpose: 'تفصيل خطوات تنفيذ كل مبادرة',
        input: 'المبادرة المختارة',
        output: 'خطة تنفيذية بمهام ومسؤولين وزمن',
      },
      {
        id: '7.8',
        nameAr: 'بيان الرؤية',
        nameEn: 'Vision Statement',
        purpose: 'صياغة رؤية مُلهمة للمبادرة',
        input: 'الحلول والمبادرات',
        output: 'بيان رؤية ملهم ومختصر',
      },
      {
        id: '7.9',
        nameAr: 'الموجز التنفيذي للمبادرة',
        nameEn: 'Innovation Brief',
        purpose: 'الوثيقة التنفيذية النهائية للمبادرة',
        input: 'كل مخرجات الأطوار',
        output: 'موجز تنفيذي شامل وجاهز للقيادة',
      },
    ],
  },
];

// ============== AI ENGINE - CALLS CLAUDE FOR EACH METHOD ==============
async function runMethod(method, mode, challenge, previousOutputs) {
  const contextSummary = Object.entries(previousOutputs)
    .map(([key, val]) => `[${key}]: ${typeof val === 'string' ? val.substring(0, 500) : JSON.stringify(val).substring(0, 500)}`)
    .join('\n\n');

  const systemPrompt = `أنت خبير في منهجية Vijay Kumar من كتاب "101 Design Methods" متخصص في تحسين تجربة الضيف في المسجد الحرام والمسجد النبوي.

تطبق الأداة "${method.nameAr} (${method.nameEn})" من الطور "${mode.nameAr} (${mode.nameEn})".

غرض الأداة: ${method.purpose}
المُخرج المتوقع: ${method.output}

السياق المتراكم من الأطوار السابقة:
${contextSummary || 'لا توجد مخرجات سابقة'}

أرجع النتيجة بصيغة JSON فقط، بدون أي نص خارج JSON. الهيكل:
{
  "summary": "ملخص في جملتين لما أنتجته الأداة",
  "items": [
    {"title": "عنوان البند", "content": "محتوى تفصيلي"}
  ],
  "key_takeaway": "الاستنتاج الجوهري الذي ينقل لطور الأداة التالية"
}

كن محدداً، عملياً، ومُرتكزاً على سياق الحرمين. اكتب بالعربية الفصحى المهنية.`;

  const userPrompt = `التحدي / المبادرة المقترحة:
"${challenge}"

طبّق الأداة الآن وأنتج المخرجات.`;

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        max_tokens: 3000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error('API error: ' + response.status + ' - ' + errText);
    }
    const data = await response.json();
    const text = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .replace(/```json|```/g, '')
      .trim();
    return JSON.parse(text);
  } catch (err) {
    console.error('Method error:', err);
    throw err;
  }
}

// ============== MAIN APP ==============
export default function ExperienceEngine() {
  const [screen, setScreen] = useState('home'); // home | session | results
  const [challenge, setChallenge] = useState('');
  const [sessionData, setSessionData] = useState({
    challenge: '',
    currentMode: 0,
    currentMethod: 0,
    outputs: {}, // keyed by method.id
    completed: [],
  });

  // Load saved session
  useEffect(() => {
    try {
      const saved = localStorage.getItem('current-session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challenge) {
          setSessionData(parsed);
          setChallenge(parsed.challenge);
        }
      }
    } catch (e) {}
  }, []);

  // Auto-save session
  useEffect(() => {
    if (sessionData.challenge) {
      try {
        localStorage.setItem('current-session', JSON.stringify(sessionData));
      } catch (e) {}
    }
  }, [sessionData]);

  const startSession = (text) => {
    const newData = {
      challenge: text,
      currentMode: 0,
      currentMethod: 0,
      outputs: {},
      completed: [],
    };
    setSessionData(newData);
    setScreen('session');
  };

  const resetSession = async () => {
    setSessionData({ challenge: '', currentMode: 0, currentMethod: 0, outputs: {}, completed: [] });
    setChallenge('');
    setScreen('home');
    try { localStorage.removeItem('current-session'); } catch (e) {}
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${BRAND.pearl} 0%, ${BRAND.cream} 100%)`,
      fontFamily: '"Tajawal", "Sakkal Majalla", "Segoe UI", sans-serif',
      color: BRAND.ink,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Amiri:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .arabesque-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, ${BRAND.gold}08 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${BRAND.green}08 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, ${BRAND.terracotta}05 0%, transparent 50%);
        }
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${BRAND.gold}, transparent);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: ${BRAND.mist}; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: ${BRAND.gold}; border-radius: 3px; }
      `}</style>

      {screen === 'home' && <HomeScreen onStart={startSession} hasSession={!!sessionData.challenge} onResume={() => setScreen('session')} onReset={resetSession} />}
      {screen === 'session' && <SessionScreen sessionData={sessionData} setSessionData={setSessionData} onComplete={() => setScreen('results')} onHome={() => setScreen('home')} />}
      {screen === 'results' && <ResultsScreen sessionData={sessionData} onRestart={resetSession} onBack={() => setScreen('session')} />}
    </div>
  );
}

// ============== HOME SCREEN ==============
function HomeScreen({ onStart, hasSession, onResume, onReset }) {
  const [text, setText] = useState('');

  return (
    <div className="arabesque-pattern" style={{ minHeight: '100vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header crest */}
        <div style={{ textAlign: 'center', marginBottom: 48 }} className="fade-in">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 20px',
            border: `1px solid ${BRAND.gold}40`,
            borderRadius: 999,
            background: `${BRAND.pearl}`,
            marginBottom: 24,
          }}>
            <Sparkles size={14} style={{ color: BRAND.gold }} />
            <span style={{ fontSize: 13, color: BRAND.charcoal, letterSpacing: 0.5 }}>
              منهجية Kumar — 101 Design Methods
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Amiri", serif',
            fontSize: 56,
            fontWeight: 700,
            color: BRAND.charcoal,
            margin: '0 0 16px 0',
            lineHeight: 1.1,
            letterSpacing: -1,
          }}>
            محرّك تحسين التجربة
          </h1>

          <div className="gold-line" style={{ width: 120, margin: '0 auto 20px' }}></div>

          <p style={{
            fontSize: 18,
            color: BRAND.charcoal,
            opacity: 0.75,
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            نظام مُهيكل لتوليد وتحسين مبادرات تجربة الضيف في الحرمين الشريفين
            <br />
            وفق منهجية Vijay Kumar للابتكار التصميمي
          </p>
        </div>

        {/* Resume card */}
        {hasSession && (
          <div className="fade-in" style={{
            background: BRAND.charcoal,
            color: BRAND.cream,
            padding: 24,
            borderRadius: 16,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 4 }}>جلسة سابقة محفوظة</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>هل تريد استئناف العمل؟</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={onReset} style={{
                padding: '10px 16px',
                background: 'transparent',
                color: BRAND.cream,
                border: `1px solid ${BRAND.cream}40`,
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
              }}>بدء جديد</button>
              <button onClick={onResume} style={{
                padding: '10px 20px',
                background: BRAND.gold,
                color: BRAND.charcoal,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 600,
              }}>استئناف</button>
            </div>
          </div>
        )}

        {/* Input card */}
        <div className="fade-in" style={{
          background: 'white',
          borderRadius: 20,
          padding: 40,
          boxShadow: `0 1px 0 ${BRAND.gold}20, 0 20px 60px ${BRAND.charcoal}10`,
          border: `1px solid ${BRAND.mist}`,
        }}>
          <label style={{
            display: 'block',
            fontSize: 14,
            color: BRAND.charcoal,
            opacity: 0.7,
            marginBottom: 12,
            fontWeight: 500,
          }}>
            أدخِل التحدي أو المبادرة المقترحة
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="مثال: تحسين تجربة الإرشاد في صحن المطاف خلال موسم رمضان للضيوف من كبار السن..."
            rows={5}
            style={{
              width: '100%',
              padding: 16,
              border: `1.5px solid ${BRAND.mist}`,
              borderRadius: 12,
              fontFamily: 'inherit',
              fontSize: 16,
              color: BRAND.ink,
              background: BRAND.pearl,
              resize: 'vertical',
              direction: 'rtl',
              lineHeight: 1.7,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = BRAND.gold}
            onBlur={(e) => e.target.style.borderColor = BRAND.mist}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.6 }}>
              7 أطوار · 30 أداة · مخرجات تفصيلية
            </div>
            <button
              onClick={() => text.trim() && onStart(text.trim())}
              disabled={!text.trim()}
              style={{
                padding: '14px 32px',
                background: text.trim() ? BRAND.charcoal : BRAND.mist,
                color: text.trim() ? BRAND.cream : BRAND.charcoal,
                border: 'none',
                borderRadius: 12,
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                fontSize: 16,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
              }}
            >
              ابدأ المعالجة
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* Modes preview */}
        <div className="fade-in" style={{ marginTop: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="gold-line" style={{ width: 80, margin: '0 auto 12px' }}></div>
            <div style={{ fontSize: 14, color: BRAND.charcoal, opacity: 0.6, letterSpacing: 1 }}>
              الأطوار السبعة
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {MODES.map((mode, idx) => {
              const Icon = mode.icon;
              return (
                <div key={mode.id} style={{
                  padding: 20,
                  background: 'white',
                  border: `1px solid ${BRAND.mist}`,
                  borderRadius: 12,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: mode.color,
                  }}></div>
                  <Icon size={20} style={{ color: mode.color, marginBottom: 8 }} />
                  <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 2 }}>طور {mode.id}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.charcoal, lineHeight: 1.3 }}>
                    {mode.nameAr}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== SESSION SCREEN ==============
function SessionScreen({ sessionData, setSessionData, onComplete, onHome }) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const currentMode = MODES[sessionData.currentMode];
  const currentMethod = currentMode?.methods[sessionData.currentMethod];
  const Icon = currentMode?.icon || Compass;

  const isMethodDone = currentMethod && sessionData.outputs[currentMethod.id];
  const isLastMethod = sessionData.currentMethod === currentMode?.methods.length - 1;
  const isLastMode = sessionData.currentMode === MODES.length - 1;

  const totalMethods = MODES.reduce((s, m) => s + m.methods.length, 0);
  const completedCount = Object.keys(sessionData.outputs).length;
  const progress = Math.round((completedCount / totalMethods) * 100);

  const runCurrentMethod = async () => {
    if (!currentMethod || running) return;
    setRunning(true);
    setError('');
    try {
      const result = await runMethod(currentMethod, currentMode, sessionData.challenge, sessionData.outputs);
      setSessionData(prev => ({
        ...prev,
        outputs: { ...prev.outputs, [currentMethod.id]: { ...result, methodId: currentMethod.id, methodNameAr: currentMethod.nameAr, modeId: currentMode.id, modeNameAr: currentMode.nameAr } },
      }));
    } catch (e) {
      setError('تعذر توليد المخرجات. حاول مرة أخرى.');
    } finally {
      setRunning(false);
    }
  };

  const goNext = () => {
    if (isLastMethod) {
      if (isLastMode) {
        onComplete();
      } else {
        setSessionData(prev => ({ ...prev, currentMode: prev.currentMode + 1, currentMethod: 0 }));
      }
    } else {
      setSessionData(prev => ({ ...prev, currentMethod: prev.currentMethod + 1 }));
    }
  };

  const goPrev = () => {
    if (sessionData.currentMethod > 0) {
      setSessionData(prev => ({ ...prev, currentMethod: prev.currentMethod - 1 }));
    } else if (sessionData.currentMode > 0) {
      const prevMode = MODES[sessionData.currentMode - 1];
      setSessionData(prev => ({ ...prev, currentMode: prev.currentMode - 1, currentMethod: prevMode.methods.length - 1 }));
    }
  };

  const jumpTo = (modeIdx, methodIdx) => {
    setSessionData(prev => ({ ...prev, currentMode: modeIdx, currentMethod: methodIdx }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0 }}>
      {/* Sidebar */}
      <aside style={{
        background: BRAND.charcoal,
        color: BRAND.cream,
        padding: 24,
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
      }} className="scrollbar-thin">
        <button onClick={onHome} style={{
          background: 'transparent',
          border: 'none',
          color: BRAND.gold,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <ChevronRight size={14} />
          الرئيسية
        </button>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>التحدي</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
            {sessionData.challenge.length > 150 ? sessionData.challenge.substring(0, 150) + '...' : sessionData.challenge}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, opacity: 0.5 }}>التقدم</span>
            <span style={{ fontSize: 12, color: BRAND.gold }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: `${BRAND.cream}20`, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: BRAND.gold, transition: 'width 0.3s' }}></div>
          </div>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 6 }}>{completedCount} من {totalMethods} أداة</div>
        </div>

        {/* Modes & Methods nav */}
        {MODES.map((mode, mIdx) => {
          const ModeIcon = mode.icon;
          const isActive = mIdx === sessionData.currentMode;
          return (
            <div key={mode.id} style={{ marginBottom: 16 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 0',
                fontSize: 13,
                fontWeight: 600,
                color: isActive ? BRAND.gold : BRAND.cream,
              }}>
                <ModeIcon size={14} />
                <span>{mode.id}. {mode.nameAr}</span>
              </div>
              <div style={{ paddingRight: 22 }}>
                {mode.methods.map((method, idx) => {
                  const isCurrent = isActive && idx === sessionData.currentMethod;
                  const isDone = !!sessionData.outputs[method.id];
                  return (
                    <button
                      key={method.id}
                      onClick={() => jumpTo(mIdx, idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 8px',
                        width: '100%',
                        background: isCurrent ? `${BRAND.gold}20` : 'transparent',
                        border: 'none',
                        color: isCurrent ? BRAND.gold : BRAND.cream,
                        opacity: isCurrent ? 1 : (isDone ? 0.95 : 0.55),
                        fontSize: 12,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textAlign: 'right',
                        borderRadius: 6,
                        marginBottom: 2,
                      }}
                    >
                      <span style={{
                        width: 14, height: 14, borderRadius: '50%',
                        border: `1px solid ${isDone ? BRAND.gold : `${BRAND.cream}40`}`,
                        background: isDone ? BRAND.gold : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {isDone && <Check size={10} style={{ color: BRAND.charcoal }} strokeWidth={3} />}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {method.id} {method.nameAr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${BRAND.cream}15` }}>
          <button onClick={onComplete} disabled={completedCount === 0} style={{
            width: '100%',
            padding: '12px',
            background: completedCount > 0 ? BRAND.gold : 'transparent',
            color: completedCount > 0 ? BRAND.charcoal : `${BRAND.cream}40`,
            border: completedCount > 0 ? 'none' : `1px solid ${BRAND.cream}20`,
            borderRadius: 8,
            cursor: completedCount > 0 ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 600,
          }}>
            عرض النتائج النهائية
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ padding: '40px 48px', overflowY: 'auto', background: BRAND.pearl }} className="scrollbar-thin arabesque-pattern">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Mode header */}
          <div className="fade-in" style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: currentMode.color, fontWeight: 600, letterSpacing: 1 }}>
                طور {currentMode.id} من 7
              </span>
              <div style={{ flex: 1, height: 1, background: `${currentMode.color}30` }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{
                width: 48, height: 48,
                background: currentMode.color,
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}>
                <Icon size={24} />
              </div>
              <div>
                <h2 style={{ fontFamily: '"Amiri", serif', fontSize: 32, margin: 0, color: BRAND.charcoal }}>
                  {currentMode.nameAr}
                </h2>
                <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.5 }}>
                  {currentMode.nameEn}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 16, color: BRAND.charcoal, opacity: 0.75, fontStyle: 'italic', margin: 0 }}>
              "{currentMode.question}"
            </p>
          </div>

          {/* Method card */}
          <div key={currentMethod.id} className="fade-in" style={{
            background: 'white',
            borderRadius: 16,
            padding: 32,
            border: `1px solid ${BRAND.mist}`,
            boxShadow: `0 4px 20px ${BRAND.charcoal}08`,
            marginBottom: 24,
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 10px',
              background: `${currentMode.color}15`,
              color: currentMode.color,
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 6,
              marginBottom: 12,
            }}>
              أداة {currentMethod.id} · {sessionData.currentMethod + 1} من {currentMode.methods.length}
            </div>

            <h3 style={{ fontSize: 28, margin: '0 0 4px 0', color: BRAND.charcoal, fontFamily: '"Amiri", serif' }}>
              {currentMethod.nameAr}
            </h3>
            <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.5, marginBottom: 20 }}>
              {currentMethod.nameEn}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              <InfoBlock label="الغرض" value={currentMethod.purpose} color={currentMode.color} />
              <InfoBlock label="المُدخل" value={currentMethod.input} color={currentMode.color} />
              <InfoBlock label="المُخرج" value={currentMethod.output} color={currentMode.color} />
            </div>

            {!isMethodDone && !running && (
              <button onClick={runCurrentMethod} style={{
                width: '100%',
                padding: '14px',
                background: currentMode.color,
                color: 'white',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Sparkles size={16} />
                تطبيق هذه الأداة
              </button>
            )}

            {running && (
              <div style={{
                padding: 24,
                background: BRAND.pearl,
                borderRadius: 10,
                textAlign: 'center',
                color: BRAND.charcoal,
              }}>
                <Loader2 size={28} style={{ color: currentMode.color, animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ marginTop: 12, fontSize: 14 }}>جاري تطبيق الأداة وتوليد المخرجات...</div>
              </div>
            )}

            {error && <div style={{ padding: 12, background: '#fee', color: '#a33', borderRadius: 8, marginTop: 12, fontSize: 13 }}>{error}</div>}

            {isMethodDone && <MethodOutput output={sessionData.outputs[currentMethod.id]} color={currentMode.color} onRerun={runCurrentMethod} />}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <button onClick={goPrev} disabled={sessionData.currentMode === 0 && sessionData.currentMethod === 0} style={{
              padding: '12px 24px',
              background: 'transparent',
              color: BRAND.charcoal,
              border: `1px solid ${BRAND.mist}`,
              borderRadius: 10,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <ChevronRight size={16} />
              السابق
            </button>

            <button onClick={goNext} disabled={!isMethodDone} style={{
              padding: '12px 28px',
              background: isMethodDone ? BRAND.charcoal : BRAND.mist,
              color: isMethodDone ? BRAND.cream : BRAND.charcoal,
              border: 'none',
              borderRadius: 10,
              cursor: isMethodDone ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {isLastMethod && isLastMode ? 'عرض النتائج' : 'التالي'}
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoBlock({ label, value, color }) {
  return (
    <div style={{ padding: 12, background: BRAND.pearl, borderRadius: 8, border: `1px solid ${color}15` }}>
      <div style={{ fontSize: 11, color, fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 13, color: BRAND.charcoal, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function MethodOutput({ output, color, onRerun }) {
  if (!output) return null;
  return (
    <div className="fade-in" style={{ marginTop: 8 }}>
      <div style={{
        padding: 16,
        background: `${color}08`,
        borderRight: `3px solid ${color}`,
        borderRadius: 8,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>الملخص</div>
        <div style={{ fontSize: 14, color: BRAND.charcoal, lineHeight: 1.7 }}>{output.summary}</div>
      </div>

      {output.items && output.items.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: BRAND.charcoal, opacity: 0.6, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>
            المخرجات التفصيلية
          </div>
          {output.items.map((item, idx) => (
            <div key={idx} style={{
              padding: 14,
              background: 'white',
              border: `1px solid ${BRAND.mist}`,
              borderRadius: 8,
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  minWidth: 24, height: 24,
                  background: `${color}15`,
                  color, fontSize: 12, fontWeight: 700,
                  borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{idx + 1}</div>
                <div style={{ flex: 1 }}>
                  {item.title && <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.charcoal, marginBottom: 4 }}>{item.title}</div>}
                  <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.85, lineHeight: 1.6 }}>{item.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {output.key_takeaway && (
        <div style={{
          padding: 14,
          background: BRAND.charcoal,
          color: BRAND.cream,
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, color: BRAND.gold, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>الخلاصة الجوهرية</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>{output.key_takeaway}</div>
        </div>
      )}

      <button onClick={onRerun} style={{
        padding: '8px 14px',
        background: 'transparent',
        color: BRAND.charcoal,
        border: `1px solid ${BRAND.mist}`,
        borderRadius: 6,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 12,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <RefreshCw size={12} />
        إعادة التطبيق
      </button>
    </div>
  );
}

// ============== RESULTS SCREEN ==============
function ResultsScreen({ sessionData, onRestart, onBack }) {
  const [generating, setGenerating] = useState(false);
  const [finalInitiatives, setFinalInitiatives] = useState(null);

  const generateFinalInitiatives = async () => {
    setGenerating(true);
    try {
      const allOutputs = Object.values(sessionData.outputs).map(o => 
        `${o.modeNameAr} - ${o.methodNameAr}: ${o.summary} | ${o.key_takeaway}`
      ).join('\n');

      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          max_tokens: 5000,
          system: `أنت خبير ابتكار في الهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي. تستخلص المبادرات النهائية من تطبيق منهجية Vijay Kumar الكاملة.

أرجع JSON فقط بهذا الهيكل:
{
  "executive_summary": "ملخص تنفيذي للنتائج (4-5 جمل)",
  "initiatives": [
    {
      "title": "اسم المبادرة",
      "rationale": "المبرر المبني على الرؤى",
      "value_proposition": "القيمة المقدمة للضيف",
      "target_personas": ["البرسونا 1", "البرسونا 2"],
      "implementation_phases": ["مرحلة 1", "مرحلة 2", "مرحلة 3"],
      "success_metrics": ["مؤشر 1", "مؤشر 2"],
      "priority": "عالية | متوسطة | منخفضة"
    }
  ]
}

أنتج 5-7 مبادرات متماسكة ومتنوعة.`,
          messages: [{ role: 'user', content: `التحدي الأصلي: "${sessionData.challenge}"\n\nمخرجات جميع الأطوار والأدوات:\n${allOutputs}\n\nاستخلص المبادرات النهائية الآن.` }],
        }),
      });
      const data = await response.json();
      const text = data.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n')
        .replace(/```json|```/g, '')
        .trim();
      setFinalInitiatives(JSON.parse(text));
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (!finalInitiatives && Object.keys(sessionData.outputs).length > 0) {
      generateFinalInitiatives();
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }} className="arabesque-pattern">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <button onClick={onBack} style={{
            background: 'transparent',
            border: 'none',
            color: BRAND.charcoal,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <ChevronRight size={16} />
            العودة للجلسة
          </button>
          <button onClick={onRestart} style={{
            padding: '8px 16px',
            background: 'transparent',
            color: BRAND.charcoal,
            border: `1px solid ${BRAND.mist}`,
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
          }}>
            بدء جلسة جديدة
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: BRAND.gold, letterSpacing: 2, marginBottom: 8 }}>النتائج النهائية</div>
          <h1 style={{ fontFamily: '"Amiri", serif', fontSize: 42, color: BRAND.charcoal, margin: '0 0 12px 0' }}>
            المبادرات المُولّدة
          </h1>
          <div className="gold-line" style={{ width: 100, margin: '0 auto' }}></div>
        </div>

        {/* Challenge recap */}
        <div style={{
          background: BRAND.charcoal,
          color: BRAND.cream,
          padding: 24,
          borderRadius: 12,
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 11, color: BRAND.gold, letterSpacing: 1, marginBottom: 8 }}>التحدي الأصلي</div>
          <div style={{ fontSize: 16, lineHeight: 1.7 }}>{sessionData.challenge}</div>
        </div>

        {generating && !finalInitiatives && (
          <div style={{
            padding: 60,
            background: 'white',
            borderRadius: 16,
            textAlign: 'center',
            border: `1px solid ${BRAND.mist}`,
          }}>
            <Loader2 size={40} style={{ color: BRAND.gold, animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ marginTop: 16, fontSize: 16, color: BRAND.charcoal }}>
              جاري استخلاص المبادرات النهائية...
            </div>
            <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.5, marginTop: 8 }}>
              نُجمّع مخرجات {Object.keys(sessionData.outputs).length} أداة
            </div>
          </div>
        )}

        {finalInitiatives && (
          <>
            <div style={{
              background: 'white',
              padding: 32,
              borderRadius: 16,
              marginBottom: 24,
              border: `1px solid ${BRAND.mist}`,
              borderTop: `4px solid ${BRAND.gold}`,
            }}>
              <div style={{ fontSize: 12, color: BRAND.gold, letterSpacing: 1, marginBottom: 12, fontWeight: 700 }}>
                الملخص التنفيذي
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.8, color: BRAND.charcoal }}>
                {finalInitiatives.executive_summary}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: BRAND.charcoal, opacity: 0.6, letterSpacing: 1, marginBottom: 16, fontWeight: 700 }}>
                المبادرات المقترحة ({finalInitiatives.initiatives.length})
              </div>
              {finalInitiatives.initiatives.map((init, idx) => <InitiativeCard key={idx} init={init} index={idx} />)}
            </div>
          </>
        )}

        {/* All methods outputs collapsible */}
        <AllMethodsAccordion outputs={sessionData.outputs} />
      </div>
    </div>
  );
}

function InitiativeCard({ init, index }) {
  const [expanded, setExpanded] = useState(false);
  const priorityColor = init.priority === 'عالية' ? BRAND.terracotta : init.priority === 'متوسطة' ? BRAND.gold : BRAND.green;

  return (
    <div style={{
      background: 'white',
      border: `1px solid ${BRAND.mist}`,
      borderRadius: 12,
      marginBottom: 12,
      overflow: 'hidden',
    }}>
      <div onClick={() => setExpanded(!expanded)} style={{
        padding: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 36, height: 36,
          background: BRAND.charcoal,
          color: BRAND.gold,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Amiri", serif',
          fontSize: 18,
          fontWeight: 700,
          flexShrink: 0,
        }}>{index + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: BRAND.charcoal, marginBottom: 4 }}>{init.title}</div>
          <div style={{ fontSize: 13, color: BRAND.charcoal, opacity: 0.7, lineHeight: 1.5 }}>{init.value_proposition}</div>
        </div>
        <div style={{
          padding: '4px 10px',
          background: `${priorityColor}15`,
          color: priorityColor,
          fontSize: 11,
          fontWeight: 700,
          borderRadius: 6,
          flexShrink: 0,
        }}>{init.priority}</div>
        <ChevronDown size={18} style={{ color: BRAND.charcoal, opacity: 0.4, transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </div>
      {expanded && (
        <div className="fade-in" style={{ padding: '0 20px 20px', borderTop: `1px solid ${BRAND.mist}` }}>
          <DetailRow label="المبرر" value={init.rationale} />
          <DetailRow label="البرسونا المستهدفة" value={init.target_personas?.join(' · ')} />
          <DetailRow label="مراحل التنفيذ" items={init.implementation_phases} />
          <DetailRow label="مؤشرات النجاح" items={init.success_metrics} />
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, items }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 11, color: BRAND.charcoal, opacity: 0.5, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      {value && <div style={{ fontSize: 13, color: BRAND.charcoal, lineHeight: 1.6 }}>{value}</div>}
      {items && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((it, i) => (
            <div key={i} style={{ fontSize: 13, color: BRAND.charcoal, lineHeight: 1.5, paddingRight: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', right: 0, color: BRAND.gold }}>◆</span>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AllMethodsAccordion({ outputs }) {
  const [open, setOpen] = useState(false);
  const grouped = MODES.map(mode => ({
    mode,
    items: mode.methods.map(m => ({ method: m, output: outputs[m.id] })).filter(x => x.output),
  })).filter(g => g.items.length > 0);

  return (
    <div style={{ marginTop: 32 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%',
        padding: 16,
        background: 'white',
        border: `1px solid ${BRAND.mist}`,
        borderRadius: 12,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 600,
        color: BRAND.charcoal,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={16} />
          مخرجات جميع الأدوات المُطبَّقة ({Object.keys(outputs).length})
        </span>
        <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div className="fade-in" style={{ marginTop: 12 }}>
          {grouped.map(g => {
            const Icon = g.mode.icon;
            return (
              <div key={g.mode.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Icon size={16} style={{ color: g.mode.color }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: g.mode.color }}>طور {g.mode.id}: {g.mode.nameAr}</span>
                </div>
                {g.items.map(({ method, output }) => (
                  <div key={method.id} style={{
                    background: 'white',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 6,
                    borderRight: `3px solid ${g.mode.color}`,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.charcoal, marginBottom: 6 }}>
                      {method.id} {method.nameAr}
                    </div>
                    <div style={{ fontSize: 12, color: BRAND.charcoal, opacity: 0.8, lineHeight: 1.6 }}>
                      {output.summary}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
