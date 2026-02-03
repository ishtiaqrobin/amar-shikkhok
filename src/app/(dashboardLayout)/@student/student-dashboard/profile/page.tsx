import { sessionService } from "@/services/session.service";
import { StudentProfileClient } from "./StudentProfileClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
    const { data: sessionData } = await sessionService.getSession();

    if (!sessionData?.session) {
        redirect("/login");
    }

    const userToken = sessionData.session.token;

    return <StudentProfileClient userToken={userToken} />;
}

