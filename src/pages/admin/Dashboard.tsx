
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db, firebaseConfig } from "@/lib/firebase"; // Import config
import { ref, update, onValue, set } from "firebase/database";
import { initializeApp, getApp, deleteApp } from "firebase/app"; // For secondary app
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Auth types
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Users, LogOut, MessageSquare, Search, Megaphone, Loader2, Pencil, Trash2, Plus, Settings } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const ContactsTab = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    useEffect(() => {
        const messagesRef = ref(db, "contact_submissions");

        // Added error handling to onValue
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by createdAt desc, handle missing dates safely
                list.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                setMessages(list);
            } else {
                setMessages([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firebase read error:", error);
            setError("Failed to load submissions. Permission denied or network error.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filtered = messages.filter(m =>
        (m.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.subject || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <p className="text-sm text-muted-foreground">View inquiries from the website contact form.</p>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Search className="w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Search by name, email, subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin w-4 h-4" /> Loading...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-gray-500">No messages found.</TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                                            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{row.name}</div>
                                            <div className="text-xs text-gray-500">{row.email}</div>
                                        </TableCell>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell className="max-w-xs truncate">{row.message}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedMessage(row)}>View</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-lg">
                                                    <DialogHeader>
                                                        <DialogTitle>{row.subject}</DialogTitle>
                                                        <DialogDescription>
                                                            From: {row.name} ({row.email})<br />
                                                            Date: {new Date(row.createdAt).toLocaleString()}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap text-sm">
                                                        {row.message}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

const AnnouncementsTab = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [newText, setNewText] = useState("");
    const [newLink, setNewLink] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const announcementsRef = ref(db, "announcements");
        const unsubscribe = onValue(announcementsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setAnnouncements(list.reverse());
            } else {
                setAnnouncements([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async () => {
        if (!newText.trim()) return;
        setLoading(true);
        try {
            const { push } = await import("firebase/database");
            await push(ref(db, "announcements"), {
                text: newText,
                link: newLink,
                enabled: true,
                createdAt: new Date().toISOString()
            });
            setNewText("");
            setNewLink("");
            toast({ title: "Added", description: "Announcement added successfully." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to add.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string, text: string, link: string, enabled: boolean) => {
        try {
            await update(ref(db, `announcements/${id}`), { text, link, enabled });
            setEditingId(null);
            toast({ title: "Updated", description: "Announcement updated." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to update.", variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const { remove } = await import("firebase/database");
            await remove(ref(db, `announcements/${id}`));
            toast({ title: "Deleted", description: "Announcement removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Website Announcements</CardTitle>
                <p className="text-sm text-muted-foreground">Manage scrolling announcements. You can also add a redirect link.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Announcement text..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            placeholder="Link (optional)..."
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleAdd} disabled={loading} size="icon">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="border rounded-md divide-y">
                    {announcements.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">No announcements yet.</div>
                    ) : (
                        announcements.map((item) => (
                            <div key={item.id} className="p-3 flex items-center gap-3">
                                <Switch
                                    checked={item.enabled}
                                    onCheckedChange={(c) => handleUpdate(item.id, item.text, item.link || "", c)}
                                />
                                {editingId === item.id ? (
                                    <div className="flex-1 flex gap-2">
                                        <Input
                                            id={`edit-text-${item.id}`}
                                            defaultValue={item.text}
                                            placeholder="Text"
                                            className="flex-1"
                                        />
                                        <Input
                                            id={`edit-link-${item.id}`}
                                            defaultValue={item.link}
                                            placeholder="Link"
                                            className="flex-1"
                                        />
                                        <Button size="sm" onClick={() => {
                                            const t = (document.getElementById(`edit-text-${item.id}`) as HTMLInputElement).value;
                                            const l = (document.getElementById(`edit-link-${item.id}`) as HTMLInputElement).value;
                                            handleUpdate(item.id, t, l, item.enabled);
                                        }}>Save</Button>
                                    </div>
                                ) : (
                                    <div className={`flex-1 flex flex-col ${!item.enabled && 'opacity-50'}`}>
                                        <span className="text-sm font-medium">{item.text}</span>
                                        {item.link && <span className="text-xs text-muted-foreground truncate max-w-[200px]">{item.link}</span>}
                                    </div>
                                )}
                                <div className="flex gap-1">
                                    {editingId !== item.id && (
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingId(item.id)}>
                                            <Pencil className="w-3 h-3" />
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const SettingsTab = () => {
    const [registerLink, setRegisterLink] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const linkRef = ref(db, "settings/registerLink");
        const unsubscribe = onValue(linkRef, (snapshot) => {
            if (snapshot.exists()) {
                setRegisterLink(snapshot.val());
            } else {
                setRegisterLink(""); // Default or empty
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await set(ref(db, "settings/registerLink"), registerLink);
            toast({ title: "Saved", description: "Registration link updated successfully." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Manage global website configurations.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="regLink">Register Button Link</Label>
                    <div className="flex gap-2">
                        <Input
                            id="regLink"
                            placeholder="https://pages.razorpay.com/..."
                            value={registerLink}
                            onChange={(e) => setRegisterLink(e.target.value)}
                        />
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">This link will be used for all "Register Now" buttons on the website.</p>
                </div>
            </CardContent>
        </Card>
    );
};

const AdminDashboard = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/admin/login");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Admin Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold font-display">Admin Dashboard</h1>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {isAdmin ? "Admin" : "Team Member"}
                        </span>
                    </div>
                    <Button variant="ghost" onClick={() => logout().then(() => navigate("/admin/login"))}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="submissions" className="space-y-6">
                    <TabsList className="w-full flex-wrap h-auto gap-2 justify-start md:justify-center bg-transparent md:bg-muted p-0 md:p-1">
                        <TabsTrigger value="submissions" className="flex-1 min-w-[140px] data-[state=active]:bg-primary data-[state=active]:text-white shadow-md border md:border-none">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Submissions
                        </TabsTrigger>
                        <TabsTrigger value="announcements" className="flex-1 min-w-[140px] data-[state=active]:bg-primary data-[state=active]:text-white shadow-md border md:border-none">
                            <Megaphone className="w-4 h-4 mr-2" />
                            Announcements
                        </TabsTrigger>
                        <TabsTrigger value="team" className="flex-1 min-w-[140px] data-[state=active]:bg-primary data-[state=active]:text-white shadow-md border md:border-none">
                            <Users className="w-4 h-4 mr-2" />
                            Team Management
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex-1 min-w-[140px] data-[state=active]:bg-primary data-[state=active]:text-white shadow-md border md:border-none">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="submissions">
                        <ContactsTab />
                    </TabsContent>

                    <TabsContent value="announcements">
                        <AnnouncementsTab />
                    </TabsContent>

                    <TabsContent value="team">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Management</CardTitle>
                                <p className="text-sm text-muted-foreground">Create accounts for your team members.</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200 mb-4">
                                        <strong>Improved:</strong> You can now create team accounts without being logged out.
                                    </div>

                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const form = e.target as HTMLFormElement;
                                        const email = (form.elements.namedItem('teamEmail') as HTMLInputElement).value;
                                        const password = (form.elements.namedItem('teamPassword') as HTMLInputElement).value;
                                        const name = (form.elements.namedItem('teamName') as HTMLInputElement).value;

                                        if (!email || !password) return;

                                        // Use a Secondary App to create user without disrupting current Admin session
                                        const secondaryAppName = "SecondaryApp";
                                        let secondaryApp;
                                        try {
                                            secondaryApp = getApp(secondaryAppName);
                                        } catch (e) {
                                            secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
                                        }

                                        try {
                                            const secondaryAuth = getAuth(secondaryApp);

                                            // 1. Create the user on Secondary Auth (does NOT affect main auth)
                                            const userCred = await createUserWithEmailAndPassword(secondaryAuth, email, password);

                                            // 2. Save their profile to Realtime DB (using main DB instance is fine)
                                            await set(ref(db, `users/${userCred.user.uid}`), {
                                                email,
                                                name,
                                                role: 'team',
                                                createdAt: new Date().toISOString()
                                            });

                                            toast({ title: "Team Member Created", description: `Account for ${name} created successfully.` });
                                            form.reset();

                                            // 3. Sign out secondary auth to be clean
                                            await signOut(secondaryAuth);
                                            // Cleanup app if possible, or just leave it for reuse
                                            deleteApp(secondaryApp).catch(() => { });

                                        } catch (error: any) {
                                            console.error(error);
                                            toast({ title: "Error", description: error.message, variant: "destructive" });
                                        }
                                    }} className="max-w-md space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="teamName">Name</Label>
                                            <Input id="teamName" name="teamName" required placeholder="John Team" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="teamEmail">Email</Label>
                                            <Input id="teamEmail" name="teamEmail" type="email" required placeholder="team@1xedu.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="teamPassword">Password</Label>
                                            <Input id="teamPassword" name="teamPassword" type="password" required placeholder="******" />
                                        </div>
                                        <Button type="submit" className="w-full btn-primary-gradient">Create Team Account</Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <SettingsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;
