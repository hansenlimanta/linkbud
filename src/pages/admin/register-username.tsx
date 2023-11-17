import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { signOut } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
};

export default function RegisterUsername() {
  const router = useRouter();
  const { data: usernames } = api.user.getAllUserNames.useQuery();
  const updateUsername = api.user.updateUsername.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });
  const [isFocus, setIsFocus] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    //   e.preventDefault();
    //   updateUsername.mutate({ username: username });
  };

  return (
    <>
      <Head>
        <title>Linkbud Admin</title>
        <meta name="description" content="linkbud admin" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="h-screen bg-stone-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto flex h-full w-[620px] flex-col items-center justify-start gap-6 pt-40"
        >
          <h1 className="text-5xl font-extrabold">Welcome to Linkbud!</h1>
          <p>Choose your Linkbud username. You can always change it later.</p>
          <div
            onClick={() => setIsFocus(true)}
            className={
              "my-6 flex h-fit w-full items-center justify-start overflow-hidden rounded-md bg-zinc-300 " +
              `${isFocus ? "outline outline-offset-1" : "outline-none"}`
            }
          >
            <p className="cursor-default px-4 py-2 pr-0 text-gray-500">
              link.bud/
            </p>
            <span className="w-full">
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="h-full w-full bg-inherit p-2 focus:outline-none"
              />
            </span>
          </div>
          <p>
            By continuing, you agree to receive offers, news and updates from
            Linkbud
          </p>
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className={`w-full rounded-full py-3 font-semibold transition-all ${
              !isDirty || !isValid
                ? "cursor-default bg-slate-200"
                : "cursor-pointer bg-lime-300 hover:bg-lime-400 "
            }`}
          >
            Continue
          </button>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer text-blue-800 underline hover:text-blue-600"
            >
              Login with different account
            </span>
          </p>
        </form>
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
  if (session.user.username) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
