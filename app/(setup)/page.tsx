import InitialModal from "@/components/modals/initial-modal";
import db from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) {
    return redirectToSignIn();
  }

  // load 1st server as general
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileid: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal></InitialModal>;
};

export default SetupPage;
