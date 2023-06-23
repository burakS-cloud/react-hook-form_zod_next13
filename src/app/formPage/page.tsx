"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Counter from "@/components/counter.component";

const FormPage = () => {
  const style = {
    inputs: {
      padding: ".2rem",
      marginBottom: "1rem",
      marginTop: ".3rem",
    },
    error: {
      color: "red",
      marginTop: "-.75rem",
      marginBottom: ".5rem",
    },
  };

  const validationSchema = z
    .object({
      firstName: z.string().min(2).max(20),
      lastName: z.string().min(2).max(20),
      age: z.number().min(1).max(100),
      email: z.string().email(),
      password: z
        .string()
        .min(5, {
          message: "Password must be at least 5 characters long.",
        })
        .max(20),
      confirmPassword: z
        .string()
        .min(5, {
          message: "Password confirmation must be at least 5 characters long.",
        })
        .max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  type FormData = z.infer<typeof validationSchema>;

  const submitData = (data: FormData) => {
    console.log("IT WORKED:", data);
  };

  //   console.log("firstname error type:", errors.firstName?.type);
  //   console.log("age error type:", errors.age?.type);
  //   console.log("confirmPassword error type:", errors.confirmPassword?.type);
  //   console.log("email error type:", errors.email?.type);
  //   console.log("error.confirmPassword:", errors.confirmPassword?.type);
  const lengthError = (
    errorType: unknown,
    field: string,
    minVal?: string,
    maxVal?: string
  ) => {
    let errorMessage = "";
    switch (errorType) {
      case "too_small":
        minVal = minVal || "2"; // Assign default value if minVal is undefined or falsy

        errorMessage = `${field} must contain at least ${minVal} characters`;
        return errorMessage;

      case "too_big":
        maxVal = maxVal || "20"; // Assign default value if maxVal is undefined or falsy
        errorMessage = `${field} must contain no more than ${maxVal} characters`;
        return errorMessage;

      //   case "invalid_type":
      //     return errMessage;

      case "custom":
        return "custom";
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "8rem",
        }}
      >
        <form
          onSubmit={handleSubmit(submitData)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            padding: "2rem",
          }}
        >
          <label htmlFor="">First Name</label>
          <input style={style.inputs} type="text" {...register("firstName")} />
          {lengthError(errors.firstName?.type, "firstName") && (
            <span style={style.error}>
              {lengthError(errors.firstName?.type, "firstName")}
            </span>
          )}
          <label htmlFor="">Last Name</label>
          <input style={style.inputs} type="text" {...register("lastName")} />
          {lengthError(errors.lastName?.type, "lastName") && (
            <span style={style.error}>
              {lengthError(errors.lastName?.type, "lastName")}
            </span>
          )}
          <label htmlFor="">Age</label>
          <input
            style={style.inputs}
            type="number"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age?.message && (
            <span style={style.error}>{errors.age.message}</span>
          )}
          {/* {lengthError(
            errors.age?.type,
            errors.age?.message,
            "age",
            "1",
            "100"
          ) && (
            <span style={style.error}>
              {lengthError(
                errors.age?.type,
                errors.age?.message,
                "age",
                "1",
                "100"
              )}
            </span>
          )} */}
          <label htmlFor="">Email</label>
          <input
            style={style.inputs}
            formNoValidate
            type="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <span style={style.error}>{errors.email?.message}</span>
          )}
          <label htmlFor="">Password</label>
          <input
            style={style.inputs}
            type="password"
            {...register("password")}
          />
          {<span style={style.error}>{errors.password?.message}</span>}

          <label htmlFor="">Confirm Password</label>
          <input
            style={style.inputs}
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span style={style.error}>{errors.confirmPassword.message}</span>
          )}
          {/* {lengthError(
            errors.confirmPassword?.type,
            "confirmPassword",
            "5"
          ) && (
            <span style={style.error}>
              {lengthError(
                errors.confirmPassword?.type,
                "confirmPassword",
                "5"
              ) !== "custom"
                ? lengthError(
                    errors.confirmPassword?.type,
                    "confirmPassword",
                    "5"
                  )
                : errors.confirmPassword?.message}
            </span>
          )} */}
          <button>Submit</button>
        </form>
      </div>
      <Counter />
    </>
  );
};

export default FormPage;
