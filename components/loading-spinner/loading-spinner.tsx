import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading...</p>
        </div>
    </div>
);