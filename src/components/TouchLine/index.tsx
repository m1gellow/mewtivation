import css from './index.module.scss'

export const TouchLine = ({ setOpen, isOpen }: { setOpen: (arg0: boolean) => void; isOpen: boolean }) => {
  const isItOpen = isOpen

  return <div className={css.touchLine} onClick={() => setOpen(!isItOpen)} />
}
