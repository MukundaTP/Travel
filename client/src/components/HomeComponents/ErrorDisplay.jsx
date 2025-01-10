import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ErrorDisplay = ({ error, refetch }) => (
  <div className="flex items-center justify-center min-h-[400px] px-4">
    <Alert variant="destructive" className="max-w-lg">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        {error?.data?.message || error?.error || "Failed to load reviews"}
      </AlertDescription>
      <Button variant="outline" className="mt-4" onClick={refetch}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </Alert>
  </div>
);

export default ErrorDisplay;
