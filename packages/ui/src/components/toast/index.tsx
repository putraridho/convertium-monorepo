"use client";

import { cn } from "@convertium/utils";
import { CheckCircle, WarningCircle, X, XCircle } from "@phosphor-icons/react";
import rht, { Toast as RHTProps, Toaster as RHTToaster, ToasterProps } from "react-hot-toast";
import { Button, HStack, Typography, VStack } from "../../base";

interface ToastPayload {
  title?: string;
  description?: string;
}

interface ToastProps extends RHTProps, ToastPayload {
  variant?: "success" | "warning" | "danger" | "default";
}

function Toast({ title, description, className, variant = "default", ...t }: ToastProps) {
  return (
    <HStack
      gap={3}
      className={cn(
        t.visible ? "animate-enter" : "animate-leave",
        "relative items-start w-80 p-4 rounded-xl",
        variant === "default" && "bg-default-100 text-black",
        variant === "success" && "bg-green-50 text-success",
        variant === "warning" && "bg-orange-50 text-warning",
        variant === "danger" && "bg-red-50 text-danger",
        className,
      )}
    >
      <>
        {variant === "success" && <CheckCircle size={20} weight="bold" className="text-success" />}

        {variant === "warning" && <WarningCircle size={20} weight="bold" className="text-warning" />}

        {variant === "danger" && <XCircle size={20} weight="bold" className="text-danger" />}
      </>

      <VStack gap={1} className="flex-1">
        {title && (
          <Typography size="xs" weight="semibold" className="text-inherit">
            {title}
          </Typography>
        )}
        {description && (
          <Typography size="xs" className="text-default-500">
            {description}
          </Typography>
        )}
      </VStack>
      <Button
        iconOnly
        color={variant}
        variant="light"
        className="rounded-full min-w-6 w-6 h-6 -my-0.5 -mr-0.5"
        onPress={() => rht.dismiss(t.id)}
      >
        <X size={12} weight="bold" />
      </Button>
    </HStack>
  );
}

export const toast = {
  default: ({ title, description }: ToastPayload) =>
    rht.custom((t) => <Toast variant="default" title={title} description={description} {...t} />),
  success: ({ title, description }: ToastPayload) =>
    rht.custom((t) => <Toast variant="success" title={title} description={description} {...t} />),
  warning: ({ title, description }: ToastPayload) =>
    rht.custom((t) => <Toast variant="warning" title={title} description={description} {...t} />),
  danger: ({ title, description }: ToastPayload) =>
    rht.custom((t) => <Toast variant="danger" title={title} description={description} {...t} />),
};

export function Toaster(props: ToasterProps) {
  return (
    <RHTToaster
      gutter={8}
      position="bottom-center"
      toastOptions={{
        duration: 5000,
      }}
      {...props}
    />
  );
}
