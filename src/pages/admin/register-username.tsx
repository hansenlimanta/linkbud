import Head from "next/head";
import { useState, useEffect } from "react";
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
  const [usernames, setUsernames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: usernamesApi } = api.user.getAllUserNames.useQuery();
  const updateUsername = api.user.updateUsername.useMutation({
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      router.push("/admin");
    },
  });
  const [isFocus, setIsFocus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUsername.mutate({ username: data.username });
  };
  useEffect(() => {
    if (usernamesApi) {
      const newArray = usernamesApi.map((item) => {
        if (item.username !== null) {
          return item.username;
        } else {
          return "";
        }
      });
      setUsernames(newArray);
    }
  }, [usernamesApi]);
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
          <div className="flex w-full flex-col items-start justify-center">
            <div
              className={`mt-6 flex h-fit w-full items-center justify-start overflow-hidden rounded-md border-2 bg-zinc-300 ${
                errors.username
                  ? isFocus
                    ? "border-red-600 outline outline-offset-1"
                    : "border-red-600 outline-none"
                  : isFocus
                  ? "border-transparent outline outline-offset-1"
                  : "border-transparent outline-none hover:border-gray-400"
              }`}
            >
              <p className="cursor-default px-4 py-2 pr-0 text-gray-500">
                link.bud/
              </p>
              <span className="w-full">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Please enter a username",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    onBlur: () => setIsFocus(false),
                    pattern: {
                      value: /^[a-zA-Z0-9_.]*$/,
                      message:
                        "Usernames may only contain letters, numbers, underscores ('_') and periods ('.')",
                    },
                    validate: (value) =>
                      !usernames?.includes(value) ||
                      "Username is already taken",
                  })}
                  onFocus={() => setIsFocus(true)}
                  className="h-full w-full bg-inherit p-2 focus:outline-none"
                />
              </span>
            </div>
            {errors.username && (
              <p className="ml-4 mt-1 text-sm text-red-600">
                {errors.username?.message}
              </p>
            )}
          </div>
          <p>
            By continuing, you agree to receive offers, news and updates from
            Linkbud
          </p>
          <button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            className={`w-full rounded-full py-3 font-semibold transition-all ${
              !isDirty || !isValid
                ? "cursor-default bg-slate-200 text-gray-500"
                : "cursor-pointer bg-lime-300 text-black hover:bg-lime-400"
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
