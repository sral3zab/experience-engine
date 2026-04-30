# محرّك تحسين التجربة — نسخة Vercel

نظام مُهيكل لتوليد وتحسين مبادرات تجربة الضيف في الحرمين الشريفين، مبني على منهجية Vijay Kumar.

---

## دليل النشر على Vercel — 5 خطوات

### الخطوة 1 — إنشاء حساب Vercel

1. ادخل إلى [vercel.com](https://vercel.com)
2. اضغط **Sign Up**
3. اختر **Continue with GitHub** (الأسهل — يربطك بـ GitHub مباشرة)
4. وافق على الصلاحيات

### الخطوة 2 — رفع المشروع على GitHub

إذا كان مستودعك القديم لا يزال موجوداً، يمكنك تحديث ملفاته. وإلا:

1. أنشئ مستودعاً جديداً على GitHub باسم `experience-engine-vercel`
2. ارفع جميع ملفات هذا المشروع إلى المستودع
3. تأكد من رفع مجلد `api` ومجلد `src` وكل الملفات

### الخطوة 3 — استيراد المشروع في Vercel

1. في لوحة تحكم Vercel، اضغط **Add New** ← **Project**
2. اختر مستودع `experience-engine-vercel` من القائمة
3. اضغط **Import**
4. **اترك جميع الإعدادات الافتراضية** (Vercel سيكتشف Vite تلقائياً)
5. **لا تضغط Deploy بعد** — انتقل للخطوة التالية

### الخطوة 4 — إضافة مفتاح API ⭐

قبل الضغط على Deploy:

1. اضغط على **Environment Variables** في صفحة الاستيراد
2. أضف:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** الصق مفتاح API الذي حصلت عليه من Anthropic
3. اضغط **Add**

### الخطوة 5 — انشر الموقع

1. اضغط زر **Deploy**
2. انتظر دقيقة أو دقيقتين حتى يكتمل البناء
3. ستحصل على رابط جاهز مثل: `https://experience-engine-vercel.vercel.app`

---

## ميزات Vercel مقارنة بـ Netlify

- **مهلة Edge Functions:** 5 دقائق (مقابل 50 ثانية في Netlify)
- **سرعة أعلى** عبر شبكة Vercel العالمية
- **مجاني تماماً** للاستخدام المتوسط

---

## الاستخدام

1. افتح رابط موقعك
2. أدخل التحدي أو المبادرة
3. تنقّل بين الأطوار السبعة
4. في نهاية الجلسة، احصل على المبادرات المُولّدة

---

## بنية المشروع

```
experience-engine-vercel/
├── api/
│   └── claude.js              # Vercel Edge Function
├── src/
│   ├── App.jsx                # التطبيق الرئيسي
│   ├── main.jsx
│   └── index.css
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                # إعدادات Vercel
└── .gitignore
```

---

## التكلفة

- **Vercel:** مجاني للاستخدام المتوسط
- **Claude API:** ~$0.05 لكل جلسة كاملة (30 أداة)

---

## المشاكل الشائعة

**"تعذر توليد المخرجات"**
→ تحقق من إضافة `ANTHROPIC_API_KEY` في Environment Variables، ثم أعد النشر من تبويب Deployments.

**Build Failed**
→ تأكد من رفع جميع الملفات بما فيها `package.json` و `vite.config.js`.

**API Error 401**
→ مفتاح API غير صحيح. تحقق منه من Anthropic Console.
