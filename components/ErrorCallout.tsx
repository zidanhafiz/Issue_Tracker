import { Callout } from "@radix-ui/themes";

const ErrorCallout = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <Callout.Root
      size='1'
      color='red'
    >
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorCallout
