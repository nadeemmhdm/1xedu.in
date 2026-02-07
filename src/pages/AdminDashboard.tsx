
import { useEffect, useState } from "react";
import { database, auth } from "@/lib/firebase";
import { ref, onValue, set, remove } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

import Footer from "@/components/Footer";
import { LogOut, Link as LinkIcon, Trash2, Calendar, Mail, User, MessageSquare, Phone } from "lucide-react";
import SEO from "@/components/SEO";

interface Submission {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
    timestamp: number;
}

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [currentLink, setCurrentLink] = useState("");
    const [newLink, setNewLink] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/admin/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        const submissionsRef = ref(database, 'contact_submissions');
        const linkRef = ref(database, 'config/registration_link');

        const unsubSubmissions = onValue(submissionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedSubmissions = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    ...value,
                }));
                // Sort by timestamp descending
                setSubmissions(parsedSubmissions.sort((a, b) => b.timestamp - a.timestamp));
            } else {
                setSubmissions([]);
            }
        });

        const unsubLink = onValue(linkRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCurrentLink(data);
                setNewLink(data);
            }
        });

        return () => {
            unsubSubmissions();
            unsubLink();
        };
    }, []);

    const handleUpdateLink = async () => {
        try {
            await set(ref(database, 'config/registration_link'), newLink);
            toast.success("Registration link updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update link");
        }
    };

    const handleDeleteSubmission = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            try {
                await remove(ref(database, `contact_submissions/${id}`));
                toast.success("Submission deleted");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete submission");
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/admin/login");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <SEO title="Admin Dashboard" />
            <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage website content and submissions</p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                <div className="grid gap-6 md:gap-8">
                    {/* Registration Link Management */}
                    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="border-b bg-white/50 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                    <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg md:text-xl">Registration Link</CardTitle>
                                    <CardDescription className="text-xs md:text-sm">Main destination URL</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                                <div className="grid w-full gap-2">
                                    <label className="text-sm font-medium">Destination URL</label>
                                    <Input
                                        placeholder="https://..."
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        className="h-10 md:h-11 bg-white"
                                    />
                                </div>
                                <Button
                                    onClick={handleUpdateLink}
                                    className="h-10 md:h-11 w-full md:w-auto btn-primary-gradient whitespace-nowrap"
                                >
                                    Update Link
                                </Button>
                            </div>
                            <div className="mt-4 p-3 md:p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                                <p className="text-xs md:text-sm text-blue-800 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                    <span className="font-semibold shrink-0">Current Active Link:</span>
                                    <a href={currentLink} target="_blank" rel="noreferrer" className="underline hover:text-blue-600 truncate block w-full">
                                        {currentLink || "Not set"}
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Submissions */}
                    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="border-b bg-white/50 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg md:text-xl">Contact Submissions</CardTitle>
                                    <CardDescription className="text-xs md:text-sm">Manage inquiries</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {submissions.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">No submissions yet</h3>
                                    <p className="text-gray-500">New contact form submissions will appear here.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-gray-50/50">
                                            <TableRow>
                                                <TableHead className="w-[180px]">Date</TableHead>
                                                <TableHead>User Details</TableHead>
                                                <TableHead className="w-[150px]">Phone</TableHead>
                                                <TableHead className="w-[300px]">Message</TableHead>
                                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {submissions.map((sub) => (
                                                <TableRow key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <TableCell className="align-top">
                                                        <div className="flex items-center gap-2 text-gray-500">
                                                            <Calendar className="w-4 h-4" />
                                                            <span className="text-sm font-medium">
                                                                {new Date(sub.timestamp).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-400 pl-6">
                                                            {new Date(sub.timestamp).toLocaleTimeString()}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="align-top">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 font-medium">
                                                                <User className="w-4 h-4 text-gray-400" />
                                                                {sub.name}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Mail className="w-4 h-4 text-gray-400" />
                                                                {sub.email}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="align-top">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            <span>{sub.phoneNumber || "N/A"}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="align-top">
                                                        <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                                                            {sub.message}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell className="text-right align-top">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleDeleteSubmission(sub.id)}
                                                            title="Delete Submission"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
