"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, LogIn } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";

export default function LoginPage() {
  const { login, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

 
  useEffect(() => {
    if (!loading && user) {
      setIsRedirecting(true);
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await login(form.email, form.password);

    } catch (err: unknown) {
      toast.error(`Login Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();

    } catch (err: unknown) {
      toast.error(`Google Login Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  if (loading || isRedirecting) {
    return <LoadingSpinner />;
  }


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 dark:from-background dark:to-muted">
        <ToastContainer position="top-right" autoClose={3000} />
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary flex items-center justify-center gap-2">
              <LogIn className="w-7 h-7 text-primary" /> Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-foreground">Password</label>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-9 text-muted-foreground hover:text-primary"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={loginLoading || googleLoading}
              >
                {loginLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                {loginLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <Button
              variant="outline"
              onClick={handleGoogle}
              disabled={googleLoading || loginLoading}
              className="w-full mt-4 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z" /><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z" /><path fill="#FBBC05" d="M10.67 28.09a14.5 14.5 0 0 1 0-8.18l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.29l7.98-6.2z" /><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.38 0-11.87-3.59-14.33-8.79l-7.98 6.2C6.73 42.52 14.82 48 24 48z" /><path fill="none" d="M0 0h48v48H0z" /></g></svg>
              {googleLoading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
              {googleLoading ? "Loading..." : "Login with Google"}
            </Button>
            <div className="mt-6 text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-semibold">Sign Up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}