import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSettingsStore, type ThemeMode } from '@/store/settingsStore'
import { useState } from 'react'

const formSchema = z.object({
  apiEndpoint: z
    .string()
    .trim()
    .refine((val) => val === '' || /^https?:\/\/.+/.test(val), {
      message: 'آدرس باید با http:// یا https:// شروع بشه',
    }),
})

type FormValues = z.infer<typeof formSchema>

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  const theme = useSettingsStore((s) => s.theme)
  const setTheme = useSettingsStore((s) => s.setTheme)
  const language = useSettingsStore((s) => s.language)
  const setLanguage = useSettingsStore((s) => s.setLanguage)
  const apiEndpoint = useSettingsStore((s) => s.apiEndpoint)
  const setApiEndpoint = useSettingsStore((s) => s.setApiEndpoint)
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { apiEndpoint },
  })

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: t('settings.themeLight') },
    { value: 'dark', label: t('settings.themeDark') },
    { value: 'system', label: t('settings.themeSystem') },
  ]

  const onSubmit = (values: FormValues) => {
    setApiEndpoint(values.apiEndpoint)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Link
          to="/"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowRight className="h-5 w-5 rtl:rotate-180" />
        </Link>
        <h1 className="text-base font-semibold">{t('settings.title')}</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <section>
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">{t('settings.theme')}</h2>
          <div className="flex gap-2">
            {themeOptions.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                variant={theme === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">{t('settings.language')}</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={language === 'fa' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('fa')}
            >
              فارسی
            </Button>
            <Button
              type="button"
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('en')}
            >
              English
            </Button>
          </div>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">{t('settings.apiEndpoint')}</h2>
          <Input {...register('apiEndpoint')} placeholder="https://api.example.com" dir="ltr" />
          <p className="text-xs text-muted-foreground">{t('settings.apiEndpointHelp')}</p>
          {errors.apiEndpoint && (
            <p className="text-xs text-destructive">{errors.apiEndpoint.message}</p>
          )}
          <Button type="submit" size="sm">
            {saved ? t('settings.saved') : t('settings.save')}
          </Button>
        </form>
      </div>
    </div>
  )
}
