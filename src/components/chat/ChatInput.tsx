import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'

const formSchema = z.object({
  message: z.string().trim().min(1),
})

type FormValues = z.infer<typeof formSchema>

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { message: '' },
  })

  const submit = (values: FormValues) => {
    onSend(values.message.trim())
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex items-end gap-2 border-t border-border bg-background p-3"
    >
      <Textarea
        {...register('message')}
        placeholder={t('chat.placeholder')}
        rows={1}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(submit)()
          }
        }}
        className="max-h-32"
      />
      <Button type="submit" size="icon" disabled={!isValid || disabled} aria-label={t('chat.send')}>
        <SendHorizontal className="h-4 w-4 rtl:-scale-x-100" />
      </Button>
    </form>
  )
}
