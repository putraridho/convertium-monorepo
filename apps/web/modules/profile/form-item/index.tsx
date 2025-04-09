import { Typography, VStack } from "@convertium/ui";

interface ProfileItemProps {
  label: string;
  required?: boolean;
}

export function ProfileFormItem({ label, required, children }: React.PropsWithChildren<ProfileItemProps>) {
  return (
    <VStack gap={1}>
      <Typography as="span" size="sm" weight="medium" className="text-default-500">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </Typography>
      {children}
    </VStack>
  );
}
