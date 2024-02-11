"use client";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { createResourceAction } from "../action";
import { State } from "../../common/state";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "../../common/submit-button";
import { Label } from "@/components/ui/label";
import { createResourceSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";

interface ResourceFormProps {
  domain: string;
}

const ResourceForm = ({ domain }: ResourceFormProps) => {
  const [state, fromAction] = useFormState<State, FormData>(
    createResourceAction,
    null
  );
  const [showDialog, setShowDialog] = useState(false);

  const { values, errors, handleBlur, handleChange, setErrors, resetForm, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        url: "",
        domain: domain,
      },
      validationSchema: createResourceSchema,
      onSubmit(){}
    });

  useEffect(() => {
    if (!state) return;

    console.log(state);
    if (state.status === "error") {
      toast.error(state.message)
      if (state.error?.path) {
        setErrors({
          [state.error?.path]: state.error.message,
        });
      }
    }

    if (state.status === "success") {
      resetForm();
      toast.success(state.message);
      setShowDialog(false);
    }
  }, [state, setErrors]);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              Add a resource <PlusCircle className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add a resource to <span className="font-bold">{domain}</span>
              </DialogTitle>
              <DialogDescription>
                Add a resource to the domain. This could be a video, article,
                book, etc.
              </DialogDescription>
            </DialogHeader>
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
                <div className="w-full">
                  <Label htmlFor="url">Resource url</Label>
                  <Input
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(errors.url && "border-red-500")}
                  />
                  <p className="text-red-500">{errors.url}</p>
                </div>
                <Input type="hidden" name="domain" value={values.domain} />
                <div>
                  <SubmitButton>Submit</SubmitButton>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResourceForm;

/*

*/
