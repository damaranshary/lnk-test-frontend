import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { register as registerUser} from "../../api/axios/authAxios";
import {
  RegisterRequest as RegisterUserRequest,
  RegisterSchema as RegisterUserSchema,
} from "../../types/userTypes";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const navigate = useNavigate();

  const registerSchema: yup.ObjectSchema<RegisterUserSchema> = yup
    .object()
    .shape({
      name: yup.string().required("Nama harus diisi"),
      email: yup.string().email().required("email harus diisi"),
      password: yup
        .string()
        .min(8, "password setidaknya harus terdiri dari 8 karakter")
        .required("password harus diisi"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "password tidak sama")
        .required("konfirmasi password harus diisi"),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleOnSubmit = async (data: RegisterUserSchema) => {
    const payload: RegisterUserRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    await registerUser(payload)
      .then(() => {
        alert("Berhasil mendaftar, silahkan login");
        navigate("/login");
      })
      .catch((err) => alert(err.message))
      .finally(() => reset());
  };

  useEffect(() => {
    if (!errors.email && !errors.password && !errors.confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errors.email, errors.password, errors.confirmPassword]);

  return (
    <main className="sm:bg-top-right flex min-h-screen flex-row bg-contain bg-no-repeat sm:bg-[url('assets/register-bg.png')] md:bg-right">
      <div className="flex w-full flex-col gap-y-2 self-center sm:mx-auto sm:w-[600px] sm:gap-y-5 md:ms-10 md:w-7/12 lg:ms-20 lg:w-6/12 xl:ms-32 xl:w-5/12 2xl:ms-40 2xl:w-4/12">
        <Link to="/">
          <h1 className="mt-3 text-center text-3xl font-bold text-primary md:text-start">
            LNK-TEST
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mb-10 flex w-full flex-col rounded-2xl border-gray-200 bg-white px-4 pb-10 pt-5 shadow-md sm:border sm:px-10 sm:pt-10"
        >
          <h1 className="mb-3 text-center text-2xl font-semibold">Daftar</h1>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              {...register("name")}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="rounded-xl border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              {...register("confirmPassword")}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
          <div className="text-end">
            <span>
              Sudah punya akun?
              <Link to="/login" className="font-semibold text-primary">
                {" "}
                masuk disini
              </Link>
            </span>
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="mx-auto mt-4 w-60 self-center rounded-full bg-primary p-2 px-5 font-semibold text-white hover:bg-accent disabled:bg-gray-100 disabled:hover:cursor-not-allowed md:hover:cursor-pointer"
              disabled={isDisabled}
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
