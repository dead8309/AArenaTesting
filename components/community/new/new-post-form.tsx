'use client'

import { createCommunityPostAction } from "@/components/community/action";
import { communityPostSchema } from "@/components/community/schema/community-post-schema";
import { State } from "@/components/domain/common/state";
import SubmitButton from "@/components/domain/common/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const NewPostForm = () => {
  const router = useRouter();
  const [state, fromAction] = useFormState<State, FormData>(
    createCommunityPostAction,
    null
  );
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    setErrors,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: communityPostSchema,
    onSubmit() {},
  });

  useEffect(() => {
    if (!state) return;

    console.log(state);
    if (state.status === "error") {
      toast.error(state.message);
      if (state.error?.path) {
        setErrors({
          [state.error?.path]: state.error.message,
        });
      }
    }

    if (state.status === "success") {
      resetForm();
      toast.success(state.message);
      router.push("/community");
    }
  }, [state, setErrors]);

  return (
    <div>
      <form action={fromAction}>
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(errors.title && "border-red-500")}
            />
            <p className="text-red-500">{errors.title}</p>
          </div>
          <div className="w-full">
            <Label htmlFor="content">Content</Label>
            <Textarea
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(errors.content && "border-red-500")}
            />
            <p className="text-red-500">{errors.content}</p>
          </div>
          <div>
            <SubmitButton>Create</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
