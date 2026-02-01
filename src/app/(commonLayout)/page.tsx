import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();

  console.log("data", data);

  return (
    <div>
      <Button variant="outline">Click Here</Button>
    </div>
  );
}
