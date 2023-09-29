export interface IApp {
  lang: "ar" | "en"
  notch?: {
    top: number | null
    bottom: number | null
  }
  actualHeight?: number
}
