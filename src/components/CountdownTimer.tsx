import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {timeUnits.map((unit, index) => (
                <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-2xl md:text-4xl font-bold text-white font-mono">
                            {String(unit.value).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-white/60 text-xs md:text-sm uppercase tracking-wider font-medium">
                        {unit.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default CountdownTimer;
