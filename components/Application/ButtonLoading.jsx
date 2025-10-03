import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const ButtonLoading = ({
  type,
  className,
  loading,
  text,
  onClick,
  ...props
}) => {
  return (
    <Button
      size="sm"
      className={cn("", className)}
      type={type}
      text={text}
      {...props}
      disabled={loading}
      onClick={onClick}
    >
      {loading && <Loader2Icon className="animate-spin" />}
      {text}
    </Button>
  );
};

export default ButtonLoading;
