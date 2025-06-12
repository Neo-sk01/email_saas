import { Mail } from "@/app/mail/components/mail";
import { UserButton } from "@clerk/nextjs";
import { cookies } from "next/headers";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="md:hidden">
        <UserButton />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
