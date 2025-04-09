import { HStack, Loading } from "../../base";

export function FullPageLoading() {
  return (
    <HStack className="fixed top-0 right-0 bottom-0 left-0 items-center justify-center bg-default-50/50">
      <HStack className="bg-white rounded-2xl p-8 shadow">
        <Loading size="lg" className="w-9 h-9 text-primary" />
      </HStack>
    </HStack>
  );
}
