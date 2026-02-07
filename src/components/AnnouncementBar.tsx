
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Megaphone } from "lucide-react";

const AnnouncementBar = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const announcementsRef = ref(db, "announcements");
        const unsubscribe = onValue(announcementsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const active = Object.values(data)
                    .filter((a: any) => a.enabled);
                setAnnouncements(active);
                setIsVisible(true);
            } else {
                setAnnouncements([]);
            }
        });

        return () => unsubscribe();
    }, []);

    if (announcements.length === 0 || !isVisible) return null;

    // Calculate total text length for duration
    const totalLength = announcements.reduce((acc, curr: any) => acc + (curr.text?.length || 0), 0);
    const duration = Math.max(20, totalLength * 0.2);

    return (
        <div className="bg-[#FFD700] text-black py-2.5 relative overflow-hidden z-40 top-[96px] md:top-[128px] fixed w-full shadow-md border-y border-yellow-500">
            <div className="flex items-center">
                <div className="bg-accent z-10 px-4 flex items-center gap-2 shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
                    <Megaphone className="w-4 h-4 animate-pulse" />
                    <span className="font-bold text-sm uppercase tracking-wider hidden sm:inline">Update</span>
                </div>
                <div className="flex-1 overflow-hidden relative flex">
                    <motion.div
                        className="whitespace-nowrap flex items-center gap-8 pl-4"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: duration,
                            ease: "linear",
                        }}
                    >
                        {announcements.map((item: any, index) => (
                            <span key={index} className="inline-flex items-center mr-4">
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-700 hover:underline font-bold"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <span className="font-medium">{item.text}</span>
                                )}
                                {index < announcements.length - 1 && (
                                    <span className="mx-4 text-black/40 font-bold">•</span>
                                )}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
