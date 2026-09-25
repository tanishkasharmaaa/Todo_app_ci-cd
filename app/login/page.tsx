
"use client";

import { redirect } from "next/navigation";
import {useForm,SubmitHandler} from "react-hook-form"
import { toast } from "sonner";

interface LoginInputValues{
    email:string,
    password:string
}
export default function Login(){
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<LoginInputValues>()

    const onSubmit:SubmitHandler<LoginInputValues>=async(data)=>{
        let getRegistrationData = localStorage.getItem("RegistrationData");
        if(getRegistrationData){
            let registrationData = JSON.parse(getRegistrationData);
            
            if(registrationData.email===data.email && registrationData.password===data.password){
                localStorage.setItem("LoginData",JSON.stringify(data));
                toast("Login completed successfully 🎉",
                {
                    duration:4000,
                }
                )
                // Clear form after successful login
                reset();
                redirect("/todos");
            }
            else{
                toast("Invalid credentials",{duration:4000})
            }
        }
        else{
          toast("Please register first",{duration:4000})
        }
    }
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-xl">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">
              Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your account to get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name */}
           

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
                className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 outline-none transition
                  ${
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
                className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 outline-none transition
                  ${
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
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            You don't have an account?{" "}
            <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"  onClick={()=>window.location.replace("/registration")}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
    )
}