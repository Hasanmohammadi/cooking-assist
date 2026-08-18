# Cooking Assist

دستیار آشپزی مبتنی بر هوش مصنوعی — وب‌اپ React + TypeScript که با Capacitor به یه اپ اندروید تبدیل می‌شه.

## استک فنی
Vite · React · TypeScript · Capacitor · shadcn/ui · Tailwind CSS · React Router · TanStack Query · Zustand · React Hook Form + Zod · Axios · i18next · Vitest · ESLint + Prettier · Husky

## توسعه‌ی لوکال (روی سیستم خودت)

پیش‌نیاز: [Node.js نسخه ۲۰ به بالا](https://nodejs.org)، [pnpm](https://pnpm.io) و Git.

```bash
npm install -g pnpm   # اگه از قبل نصب نکردی

git clone <آدرس ریپازیتوری خودت>
cd cooking-assist
pnpm install
pnpm dev
```

اپ روی `http://localhost:5173` بالا میاد (نسخه‌ی وب، برای تست سریع UI بدون نیاز به گوشی).

### دستورهای مفید
```bash
pnpm dev       # اجرای لوکال
pnpm build     # ساخت نسخه‌ی production (خروجی در dist/)
pnpm test      # اجرای تست‌ها با Vitest
pnpm lint      # بررسی ESLint
pnpm format    # فرمت‌کردن با Prettier
```

> بعد از اولین `pnpm install`، یه فایل `pnpm-lock.yaml` ساخته می‌شه — حتماً همون رو هم commit/push کن، چون هم نسخه‌ها رو قفل می‌کنه و هم بعداً می‌شه cache گیت‌هاب اکشن رو باهاش سریع‌تر کرد.

## ساخت APK (بدون نیاز به Android Studio)

هر بار که به شاخه‌ی `main` پوش کنی، **GitHub Actions** خودکار:
1. پروژه رو build می‌کنه
2. پلتفرم اندروید Capacitor رو می‌سازه
3. `minSdkVersion` رو ۲۴ (اندروید ۷) و `targetSdkVersion` رو ۳۶ (اندروید ۱۶) تنظیم می‌کنه
4. یه APK دیباگ می‌سازه

برای دیدن نتیجه: تب **Actions** توی گیت‌هاب → آخرین اجرا → بخش **Artifacts** → دانلود `cooking-assist-apk`.

> ⚠️ این APK **دیباگه، برای تست روی گوشی خودته**. برای انتشار توی Google Play باید یه نسخه‌ی release امضاشده بسازیم (کلید امضا/keystore) — وقتی به اون مرحله رسیدیم بهم بگو تا اضافه‌ش کنم.

### اگه خودت لوکال کار می‌کنی و می‌خوای عوض کنی
هر تغییری که لوکال دادی رو با `git push` بفرست؛ همون Workflow خودکار دوباره اجرا می‌شه و APK جدید می‌سازه. نیازی به آپلود دستی فایل توی گیت‌هاب نیست (که قبلاً با پوشه‌های نقطه‌دار مثل `.github` مشکل داشتیم) — چون `git push` همه‌چیز رو درست منتقل می‌کنه.

## ساختار پروژه

```
src/
  components/
    ui/          → کامپوننت‌های پایه shadcn (Button, Input, Textarea)
    chat/        → ChatWindow, MessageBubble, ChatInput
  pages/         → ChatPage, SettingsPage
  hooks/         → useChat, useNetworkStatus, useThemeEffect, useBackButton
  services/      → aiService (چت‌بات), pushNotifications, cameraService
  store/         → Zustand: settingsStore (تم/زبان/آدرس بک‌اند), chatStore (تاریخچه)
  i18n/          → فارسی و انگلیسی، locales/fa.json و en.json
  lib/           → axiosClient, capacitorStorage (ذخیره‌سازی آفلاین)
```

## وصل کردن هوش مصنوعی واقعی

فایل `src/services/aiService.ts` فعلاً یه پاسخ نمونه (mock) برمی‌گردونه. وقتی بک‌اندت آماده شد:
1. توی اپ برو تنظیمات (⚙️) و آدرس بک‌اند رو وارد کن، یا
2. مقدار پیش‌فرض `apiEndpoint` رو توی `src/store/settingsStore.ts` عوض کن

**نکته‌ی امنیتی مهم:** کلید API هوش مصنوعی (OpenAI/Anthropic/...) هرگز نباید داخل کد اپ موبایل باشه — قابل استخراجه. باید یه بک‌اند واسط داشته باشی که کلید اونجا امن بمونه و اپ فقط با اون بک‌اند حرف بزنه.

## طراحی (وقتی رسید)

وقتی طرح نهایی رو فرستادی:
- رنگ‌ها/توکن‌ها: `src/index.css` (متغیرهای CSS بالای فایل)
- فونت: همون‌جا `@import` فونت رو عوض کن و `tailwind.config.js` → `fontFamily.sans`
- آیکون/اسپلش‌اسکرین: با `@capacitor/assets` (که در devDependencies هست) می‌شه خودکار از یه لوگوی ساده همه‌ی سایزها رو ساخت

## قابلیت‌هایی که آماده ولی غیرفعالن (تا وقتی لازمشون بشه)

| قابلیت | وضعیت |
|---|---|
| Push Notification | سرویسش آماده‌ست (`services/pushNotifications.ts`) ولی جایی صدا زده نمی‌شه |
| Camera | سرویسش آماده‌ست (`services/cameraService.ts`)، برای وقتی قابلیت اسکن/عکس غذا اضافه بشه |
| Deep Link | هنوز تنظیم نشده — نیاز به یه دامنه یا scheme مشخص داره؛ وقتی مشخص شد اضافه‌ش می‌کنم |

## موارد پوشش داده‌شده طبق مشخصات

- ✅ Android 7+ (minSdk 24) تا Android 16 (targetSdk 36)
- ✅ موبایل و تبلت (بدون محدودیت سایز صفحه)
- ✅ Portrait و Landscape
- ✅ دارک مود (خودکار از سیستم + قابل تغییر دستی)
- ✅ RTL کامل (فارسی پیش‌فرض)
- ✅ فونت داینامیک (واحدهای rem، پیرو تنظیمات سیستم)
- ✅ آفلاین برای اطلاعات ذخیره‌شده (تاریخچه‌ی چت با Capacitor Preferences)
- ❌ Location / Contacts / SMS / Bluetooth — طبق خواسته‌ت اضافه نشدن
