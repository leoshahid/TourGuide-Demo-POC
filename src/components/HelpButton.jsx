import React from 'react'
export default function HelpButton({onClick}){
  return (
    <button className="secondary" onClick={onClick} title="Replay guided tour">
      ❓ Help / Replay Tour
    </button>
  )
}
