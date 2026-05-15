"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { FormSection, FormFieldLabel } from "./FormSection";
import { ImageSlot } from "./ImageSlot";
import { ServiceTierGrid } from "./ServiceTierCard";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { useCreateCenter } from "../hooks/useCreateCenter";
import { useCreateCenterStore } from "../state/createCenter.store";

const TIER_KEYS = ["STANDARD_WASH", "PREMIUM_DETAIL", "PRESIDENTIAL_LUXE"] as const;

const schema = z.object({
  name: z.string().min(2, "Required"),
  phone: z.string().min(8, "Required"),
  address: z.string().min(5, "Required"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
    
  accountHolderName: z.string().min(3, "Required"),
  accountNumber: z.string().min(12, "Required"),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC")
    .or(z.literal("")),
  images: z
    .array(z.url())
    .min(1, "Upload at least one facility image"),
  serviceTiers: z
    .array(z.enum(TIER_KEYS))
    .min(1, "Select at least one service tier"),
});
type FormValues = z.infer<typeof schema>;

export function CreateCenterForm() {
  const { register, handleSubmit, setValue, control, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      images: [],
      serviceTiers: [],
    },
  });
  const create = useCreateCenter();
  const { imageUrls, selectedTiers } = useCreateCenterStore();

  useEffect(() => {
    const images = Object.values(imageUrls).filter(
      (u): u is string => typeof u === "string",
    );
    setValue("images", images, {
      shouldValidate: formState.isSubmitted,
    });
  }, [imageUrls, setValue, formState.isSubmitted]);

  useEffect(() => {
    setValue("serviceTiers", selectedTiers, {
      shouldValidate: formState.isSubmitted,
    });
  }, [selectedTiers, setValue, formState.isSubmitted]);

  function buildPayload(values: FormValues) {
    return {
      name: values.name,
      phone: values.phone,
      address: values.address,
      latitude: values.latitude,
      longitude: values.longitude,
      images: values.images,
      serviceTiers: values.serviceTiers,
      accountHolderName: values.accountHolderName,
      accountNumber: values.accountNumber,
      ifscCode: values.ifscCode,
    };
  }

  const submit = handleSubmit((v) =>
    create.mutate({ payload: buildPayload(v), mode: "submit" }),
  );
  const draft = handleSubmit((v) =>
    create.mutate({ payload: buildPayload(v), mode: "draft" }),
  );

  return (
    <form onSubmit={submit} className="flex flex-col gap-12" noValidate>
      <FormSection
        title="Facility Identity"
        description="Core branding and contact infrastructure for the new wash center."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Center Name" error={formState.errors.name?.message}>
            <Input
              placeholder="e.g. Azure Luxe Downtown"
              {...register("name")}
            />
          </Field>
          <Field label="Mobile Number" error={formState.errors.phone?.message}>
            <Input placeholder="+91 98765 43210" {...register("phone")} />
          </Field>
          <Field
            label="Official Address"
            error={formState.errors.address?.message}
            className="md:col-span-2"
          >
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <AddressAutocomplete
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onSelect={({ address, latitude, longitude }) => {
                    setValue("address", address, { shouldValidate: true });
                    setValue("latitude", latitude, { shouldValidate: true });
                    setValue("longitude", longitude, { shouldValidate: true });
                  }}
                  invalid={!!formState.errors.address}
                  placeholder="Start typing address — pick a suggestion to auto-fill lat/lon"
                />
              )}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Visual Presence"
        description="Geo-coordinates and facility imagery for digital mapping."
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Latitude" error={formState.errors.latitude?.message}>
              <Input
                type="number"
                step="any"
                placeholder="40.7128"
                {...register("latitude", {
                  setValueAs: (v) =>
                    v === "" || v === null || v === undefined ? undefined : Number(v),
                })}
              />
            </Field>
            <Field label="Longitude" error={formState.errors.longitude?.message}>
              <Input
                type="number"
                step="any"
                placeholder="-74.0060"
                {...register("longitude", {
                  setValueAs: (v) =>
                    v === "" || v === null || v === undefined ? undefined : Number(v),
                })}
              />
            </Field>
          </div>
          <div>
            <FormFieldLabel>Facility Showcase (3 slots)</FormFieldLabel>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <ImageSlot slot="main" label="Main Exterior" />
              <ImageSlot slot="detailing" label="Detailing Area" />
              <ImageSlot slot="interior" label="Interior Bay" />
            </div>
            {formState.errors.images ? (
              <p className="text-xs text-danger px-2 mt-2">
                {formState.errors.images.message}
              </p>
            ) : null}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Operational Logic"
        description="Service offerings and financial disbursement infrastructure."
      >
        <div className="flex flex-col gap-6">
          <div>
            <FormFieldLabel>Service Tiers</FormFieldLabel>
            <div className="mt-3">
              <ServiceTierGrid />
            </div>
            {formState.errors.serviceTiers ? (
              <p className="text-xs text-danger px-2 mt-2">
                {formState.errors.serviceTiers.message}
              </p>
            ) : null}
          </div>

          <div>
            <FormFieldLabel>Settlement Account</FormFieldLabel>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Account Holder Name" error={formState.errors.accountHolderName?.message}>
                <Input
                  placeholder="Azure Luxe Operations LLC"
                  {...register("accountHolderName")}
                />
              </Field>
              <Field label="Account Number" error={formState.errors.accountNumber?.message}>
                <Input
                  placeholder="**** **** 4492"
                  {...register("accountNumber")}
                />
              </Field>
              <Field
                label="IFSC / Swift Code"
                error={formState.errors.ifscCode?.message}
              >
                <Input placeholder="HDFC0009876" {...register("ifscCode")} />
              </Field>
            </div>
          </div>
        </div>
      </FormSection>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={draft}
          disabled={create.isPending}
        >
          Save Draft
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={create.isPending}
          className="px-8"
        >
          {create.isPending ? "Saving…" : "Initialize Onboarding"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <FormFieldLabel>{label}</FormFieldLabel>
      {children}
      {error ? <p className="text-xs text-danger px-2">{error}</p> : null}
    </div>
  );
}
