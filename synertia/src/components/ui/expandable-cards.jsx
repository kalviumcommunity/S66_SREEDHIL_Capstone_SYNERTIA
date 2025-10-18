import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { X } from "lucide-react";

export function ExpandableCardDemo({ tasks }) {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 h-full w-full z-10 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-50"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-4 w-4 text-gray-900" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200 text-2xl"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`assignee-${active.title}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 text-base mt-2"
                                        >
                                            Assigned to: {active.assignee}
                                        </motion.p>
                                    </div>
                                    <motion.button
                                        layoutId={`button-${active.title}-${id}`}
                                        className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gray-200 text-gray-900"
                                        onClick={() => setActive(null)}
                                    >
                                        Close
                                    </motion.button>
                                </div>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-600 text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                                >
                                    <div className="w-full">
                                        <p className="text-sm text-gray-600 mb-4">
                                            {active.description}
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Status:</span>
                                                <span className={`px-3 py-1 rounded-full text-sm ${active.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        active.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {active.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Priority:</span>
                                                <span className={`px-3 py-1 rounded-full text-sm ${active.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                        active.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {active.priority}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Deadline:</span>
                                                <span className="text-sm text-gray-600">{active.deadline || 'No deadline'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Progress:</span>
                                                <span className="text-sm text-gray-600">{active.progress || '0%'}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <h4 className="font-semibold mb-2">Task Details:</h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-line">
                                                {active.details || 'No additional details available.'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="w-full gap-4 grid grid-cols-1">
                {tasks.map((task, index) => (
                    <motion.div
                        layoutId={`card-${task.title}-${id}`}
                        key={`card-${task.title}-${id}`}
                        onClick={() => setActive(task)}
                        className="p-4 flex flex-col hover:bg-gray-100 dark:hover:bg-slate-600 rounded-xl cursor-pointer bg-white dark:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-600"
                    >
                        <div className="flex gap-4 flex-col w-full">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <motion.h3
                                        layoutId={`title-${task.title}-${id}`}
                                        className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg"
                                    >
                                        {task.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`assignee-${task.title}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-sm mt-1"
                                    >
                                        Assigned to: {task.assignee}
                                    </motion.p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                        task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'
                                    }`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {task.status}
                                </span>
                                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}
