import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

import AdminNav from "~/components/AdminNav";
import Link from "next/link";
import Meta from "~/components/Meta";

export default function Analytics() {
  return (
    <>
      <Meta />
      <main className="min-h-screen bg-stone-100">
        <AdminNav />
        <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-8">
          <img
            className="object-cover"
            alt="underconstruction"
            src={"/underconstruction-gif.gif"}
          />
          <Link
            href={"/admin"}
            className="w-1/3 rounded-full bg-amber-200 px-4 py-3 text-center font-semibold transition-all ease-in-out hover:bg-amber-300"
          >
            Back to Admin
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (!session.user.username) {
    return {
      redirect: {
        destination: "/admin/register-username",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
