"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthProvider";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsRedirecting(true);
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);


  if (loading || isRedirecting) {
    return <LoadingSpinner />;
  }

  return null;
}