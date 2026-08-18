import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-background p-6 text-center">
          <p className="text-base font-medium text-foreground">یه مشکلی پیش اومد</p>
          <p className="text-sm text-muted-foreground">لطفاً اپ رو دوباره باز کن</p>
        </div>
      )
    }
    return this.props.children
  }
}
