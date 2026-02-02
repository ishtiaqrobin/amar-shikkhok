import { userService } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // const { data } = await userService.getSession()

  // console.log("User from getSession", data)

  return (
    <div>
      <h1>This is the about page.</h1>
    </div>
  );
}
