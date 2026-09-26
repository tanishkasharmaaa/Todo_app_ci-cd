
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RegistrationInputValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInputValues>();
  
  

  const onSubmit: SubmitHandler<RegistrationInputValues> = async (data) => {
    console.log("Registration Data:", data);

    // Get existing registration data from localStorage
    const registrationData = localStorage.getItem("RegistrationData");

    if (registrationData) {
      const parsedRegistrationData = JSON.parse(registrationData);

      if (parsedRegistrationData.email === data.email) {
        toast("Email already exists", {
          duration: 4000,
        });

        return;
      }
    }

    // Save new registration data
    localStorage.setItem("RegistrationData", JSON.stringify(data));

    toast("Registration completed successfully 🎉", {
      duration: 4000,
    });

    // Clear form
    reset();

    // Navigate to login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">
              Registration
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your account to get started
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 outline-none transition ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />

              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 outline-none transition ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              aria-label="register"
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

