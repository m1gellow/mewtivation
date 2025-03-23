// import { useEffect } from "react"

// export const useOutsideClick = (refMenu, refButton, callback) => {
//     const handleClick = (e) => {
//         if(ref.current && !refMenu.current.contains(e.target) || !refButton.current.contains(e.target)){
//             callback();
//         }
//     }

//     useEffect(() => {
//         document.addEventListener("click", handleClick)
//         return () => {
//             document.removeEventListener('click', handleClick)
//         }
//     }, [])
// }