export interface IApp {
  lang?: string
  notch?: {
    top: number | null
    bottom: number | null
  }
  actualHeight: number
}
