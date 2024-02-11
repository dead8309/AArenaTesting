"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SubmitButton from "../../common/submit-button";
import { State } from "../../common/state";
import { createFeedbackAction } from "../actions";
import { createFeedbackSchema } from "../schema";

const FeedbackForm = ({ domain }: { domain: string }) => {
  const [state, fromAction] = useFormState<State, FormData>(
    createFeedbackAction,
    null
  );

  const { values, errors, handleBlur, handleChange, setErrors, resetForm } =
    useFormik({
      initialValues: {
        content: "",
        domain: domain,
      },
      validationSchema: createFeedbackSchema,
      onSubmit() {},
    });

  useEffect(() => {
    if (!state) return;

    console.log(state);
    if (state.status === "error") {
      if (state.error?.path) {
        setErrors({
          [state.error?.path]: state.error.message,
        });
      }
    }

    if (state.status === "success") {
      resetForm();
      toast.success(state.message);
    }
  }, [state, setErrors]);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-bold tracking-tight">Post a feedback</h3>
      <form action={fromAction}>
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <Input
              placeholder="Enter your feedback"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(errors.content && "border-red-500")}
            />
            <p className="text-red-500">{errors.content}</p>
          </div>
          <Input type="hidden" name="domain" value={values.domain} />
          <div>
            <SubmitButton>Submit</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
