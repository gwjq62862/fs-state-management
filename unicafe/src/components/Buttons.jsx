import { useShallow } from "zustand/react/shallow"
import { useVoteStore } from "../../store/voteStore"
const Buttons = () => {
  const {goodFn,neutralFn,badFn } = useVoteStore(
    useShallow((state) => ({
      goodFn: state.goodFn,
      neutralFn: state.neutralFn,
      badFn: state.badFn,
    }))
  )
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={()=>goodFn()} >good</button>
      <button onClick={()=>neutralFn()}>neutral</button>
      <button onClick={()=>badFn()}>bad</button>
    </div>
  )
}

export default Buttons
