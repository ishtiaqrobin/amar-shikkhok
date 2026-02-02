import { sessionService } from "@/services/session.service";
import { AdminProfileClient } from "./AdminProfileClient";

export default async function AdminProfilePage() {
    const { data: sessionData } = await sessionService.getSession();

    const userToken = sessionData.session.token;

    return <AdminProfileClient userToken={userToken} />;
}
