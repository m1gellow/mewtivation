// import { FormEvent, useState } from 'react'
// import { TouchLine } from '../TouchLine'
// import css from './index.module.scss'
// import { MainButton } from '../Button'

// export const TaskMenu = () => {
//   const [isActive, setIsActive] = useState(true)
//   const [value, setValue] = useState({
//     name: '',
//     time: {
//       seconds: 0,
//       hours: 0,
//       minutes: 0,
//     },
//   })

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault()

//     console.log(value)
//   }

//   if (isActive) {
//     return (
//       <div className={css.taskMenu}>
//         <div className={css.content}>
//           <form onSubmit={handleSubmit} className={css.form}>
//             <input
//               type="text"
//               name="name"
//               placeholder="task name"
//               onChange={(e) => setValue({ ...value, name: e.target.value })}
//               value={value.name}
//               className={css.input}
//             />

//             <input
//               type="text"
//               name="name"
//               placeholder="task name"
//               onChange={(e) => setValue({ ...value, time: { ...value.time, hours: Number(e.target.value) } })}
//               value={value.time.hours}
//               className={css.input}
//             />
//             <input
//               type="text"
//               name="name"
//               placeholder="task name"
//               onChange={(e) => setValue({ ...value, time: { ...value.time, minutes: Number(e.target.value) } })}
//               value={value.time.minutes}
//               className={css.input}
//             />
//             <input
//               type="text"
//               name="name"
//               placeholder="task name"
//               onChange={(e) => setValue({ ...value, time: { ...value.time, seconds: Number(e.target.value) } })}
//               value={value.time.seconds}
//               className={css.input}
//             />

//             <MainButton type={"submit"} >Add</MainButton>
//           </form>
//         </div>
//         <div>
//           <TouchLine setOpen={setIsActive} isOpen={isActive} />
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className={css.touchLine}>
//         <TouchLine setOpen={setIsActive} isOpen={isActive} />
//       </div>
//     )
//   }
// }
