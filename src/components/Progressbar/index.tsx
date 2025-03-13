import css from './index.module.scss'

export const Progressbar = ({ progress }: { progress: number }) => {
  return (
    <div className={css.progressbar}>
      <div className={css.progressLine} style={{ width: `${progress}%` }} />
    </div>
  )
}
