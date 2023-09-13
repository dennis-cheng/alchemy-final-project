import dynamic from "next/dynamic"

const ApproveForm = dynamic(
  () =>
    import("@/components/approveForm").then((module) => ({
      default: module.ApproveForm,
    })),
  {
    ssr: false,
  }
)

export default function Approve() {
  return (
    <section>
      <ApproveForm />
    </section>
  )
}
