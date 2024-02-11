"use client";
import React, { useEffect } from "react";
import { deleteVideoAction } from "../actions";
import { useFormState } from "react-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import SubmitButton from "../../common/submit-button";
import { State } from "../../common/state";

const DeleteVideoForm = ({ id,className }: { id: string,className: string }) => {
  const [state, formAction] = useFormState<State, FormData>(
    deleteVideoAction,
    null
  );
  useEffect(() => {
    if (!state) return;

    if (state.status === "error") {
      toast.error(state.message);
    }

    if (state.status === "success") {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className={className}>
      <input type="hidden" name="videoId" value={id} />
      <SubmitButton size={"icon"} variant={"ghost"}>
        <Trash2 className="h-5 w-5" />
      </SubmitButton>
    </form>
  );
};

export default DeleteVideoForm;
