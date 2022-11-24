import { useState } from "react";
import styles from "./styles.module.css";

export function MockDataButton({ path }: { path: string }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`${styles.button} ml-2`}>
        Mock
      </div>
      <div className={`w-full h-full left-0 top-0 right-0 bottom-0 ${isOpen ? 'fixed' : ''}`}>
        <div id="modal-box"
             className={`sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute ${isOpen ? '' : 'hidden'}`}>
          <span className="text-2xl font-medium">{path}</span>
          <div className={"flex flex-row"}>
            <button className="p-3 bg-green-500 rounded-lg w-full text-white" onClick={setIsOpen.bind(null, false)}>
              Cancel
            </button>
            <button className="p-3 bg-[#4F46E5] rounded-lg w-full text-white !ml-2">
              Save
            </button>
          </div>
          <textarea rows={4} id="basic" placeholder="Enter your review here"
                    className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75" />
        </div>
      </div>
    </>
  )
}
