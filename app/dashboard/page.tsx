"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { db } from "../config/config";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, UserCircle2, Mail } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";


interface UserProfile {
  name: string;
  email: string;
  createdAt?: Timestamp | string | null;
}

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      router.push("/login");
    }
    if (user) {
      const fetchProfile = async () => {
        setProfileLoading(true);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setError("Profile not found");
          }
        } catch (err: unknown) {
          console.error("Profile fetch error:", err);
          setError("Failed to load profile");
        } finally {
          setProfileLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setIsRedirecting(true);
      router.push("/login");
    } catch (err: unknown) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    } finally {
      setLogoutLoading(false);
    }
  };


  const formatCreatedAt = (createdAt: Timestamp | string | null | undefined): string => {
    if (!createdAt) {
      return "Setting up profile...";
    }

    try {
      if (createdAt && typeof createdAt === 'object' && 'toDate' in createdAt) {
        return (createdAt as Timestamp).toDate().toLocaleString();
      }
      if (typeof createdAt === 'string') {
        return new Date(createdAt).toLocaleString();
      }
      return "Setting up profile...";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date unavailable";
    }
  };

  if (loading || isRedirecting) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary flex items-center justify-center gap-2">
            <UserCircle2 className="w-8 h-8 text-primary" /> Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profileLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : profile ? (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-4 mb-2">
                <UserCircle2 className="w-16 h-16 text-primary" />
              </div>
              <div className="text-xl font-semibold text-foreground">{profile.name}</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> {profile.email}
              </div>
              <div className="text-sm text-muted-foreground">
                Joined: {formatCreatedAt(profile.createdAt)}
              </div>
              <Button
                onClick={handleLogout}
                className="mt-6 w-full flex items-center justify-center gap-2"
                disabled={logoutLoading}
                variant="destructive"
              >
                {logoutLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                {logoutLoading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <div className="text-red-500 text-center">Profile not found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}