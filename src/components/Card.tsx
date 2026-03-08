import React from "react";



export function HighlightCard ({children}: {children : React.ReactElement}){
    return (
          <div className="backdrop-blur-xl justify-between flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
            {children}
          </div>
    )
}