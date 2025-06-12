import { UserButton } from "@clerk/nextjs"
import { cookies } from "next/headers"

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout")
  return (
    <>
      <div className="md:hidden">
        <UserButton />
      </div>
      <div className="hidden flex-col md:flex">
      </div>
    </>
  )
}
