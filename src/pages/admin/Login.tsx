
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
    const { user, loading: authLoading } = useAuth(); // Use context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && user) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [user, authLoading, navigate]);

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Prevent flash of login form
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            navigate("/admin/dashboard");
        } catch (error: any) {
            toast({
                title: "Login Failed",
                description: error.message || "Invalid credentials",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                        Admin Login
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Sign in to manage the application
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full btn-primary-gradient"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
