
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful");
            navigate("/admin/dashboard");
        } catch (error: any) {
            console.error(error);
            toast.error("Invalid credentials or login error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/20 relative overflow-hidden">
            <SEO title="Admin Login" description="Secure login for 1XEdu administrators." />
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-4 md:p-8 relative z-10"
            >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">
                            Admin Access
                        </h1>
                        <p className="text-white/60 text-sm">
                            Secure login for 1XEdu administrators
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/80">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@1xedu.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 h-12 rounded-xl focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/80">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 h-12 rounded-xl focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link
                            to="/"
                            className="text-white/40 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
                        >
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-4 text-center w-full text-white/20 text-xs">
                © 2026 1XEdu Business Meet. All rights reserved.
            </div>
        </div>
    );
};

export default AdminLogin;
