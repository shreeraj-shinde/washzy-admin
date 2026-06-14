"use client";

import { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { FormSection, FormFieldLabel } from "./FormSection";
import { ImageSlot } from "./ImageSlot";
import { ServiceTierGrid } from "./ServiceTierCard";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { useCreateCenter } from "../hooks/useCreateCenter";
import { useCreateCenterStore } from "../state/createCenter.store";
import { toApiError } from "@/shared/lib/apiClient";

const TIER_KEYS = [
  "STANDARD_WASH",
  "PREMIUM_DETAIL",
  "PRESIDENTIAL_LUXE",
] as const;

const schema = z.object({
  name: z.string().min(2, "Center name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid mobile number (e.g. +91 98765 43210)")
    .max(15, "Enter a valid mobile number (e.g. +91 98765 43210)"),
  address: z.string().min(5, "Enter a complete address"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between −90 and 90")
    .max(90, "Latitude must be between −90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between −180 and 180")
    .max(180, "Longitude must be between −180 and 180"),
  accountHolderName: z
    .string()
    .min(3, "Enter the account holder's full name"),
  accountNumber: z
    .string()
    .min(9, "Account number must be 9–18 digits")
    .max(18, "Account number must be 9–18 digits"),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code — format: HDFC0001234")
    .or(z.literal("")),
  images: z.array(z.url()).min(1, "Upload at least one facility image"),
  serviceTiers: z
    .array(z.enum(TIER_KEYS))
    .min(1, "Select at least one service tier"),
});
type FormValues = z.infer<typeof schema>;

export function CreateCenterForm() {
  const { register, handleSubmit, setValue, control, formState, setError } =
    useForm<FormValues>({
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

  // Maps API field names (backend) to form field names (frontend)
  const applyApiFieldErrors = useCallback(
    (details: unknown) => {
      const fieldMap: Record<string, keyof FormValues> = {
        name: "name",
        phone: "phone",
        mobile: "phone",
        mobileNumber: "phone",
        address: "address",
        latitude: "latitude",
        longitude: "longitude",
        accountHolderName: "accountHolderName",
        accountNumber: "accountNumber",
        ifscCode: "ifscCode",
        images: "images",
        serviceTiers: "serviceTiers",
      };

      if (Array.isArray(details)) {
        for (const item of details) {
          if (
            item &&
            typeof item === "object" &&
            "field" in item &&
            "message" in item
          ) {
            const key = fieldMap[item.field as string];
            if (key) setError(key, { message: item.message as string });
          }
        }
      } else if (details && typeof details === "object") {
        for (const [field, message] of Object.entries(
          details as Record<string, unknown>,
        )) {
          const key = fieldMap[field];
          if (key && typeof message === "string") {
            setError(key, { message });
          }
        }
      }
    },
    [setError],
  );

  useEffect(() => {
    if (!create.isError) return;
    const apiError = toApiError(create.error);
    if (apiError.details) applyApiFieldErrors(apiError.details);
  }, [create.isError, create.error, applyApiFieldErrors]);

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

  const errors = formState.errors;

  return (
    <form onSubmit={submit} className="flex flex-col gap-12" noValidate>
      <FormSection
        title="Facility Identity"
        description="Core branding and contact infrastructure for the new wash center."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Center Name" error={errors.name?.message}>
            <Input
              placeholder="e.g. Azure Luxe Downtown"
              invalid={!!errors.name}
              {...register("name")}
            />
          </Field>
          <Field label="Mobile Number" error={errors.phone?.message}>
            <Input
              placeholder="+91 98765 43210"
              invalid={!!errors.phone}
              {...register("phone")}
            />
          </Field>
          <Field label="Official Address" error={errors.address?.message} className="md:col-span-2">
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
                  invalid={!!errors.address}
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
            <Field label="Latitude" error={errors.latitude?.message}>
              <Input
                type="number"
                step="any"
                placeholder="40.7128"
                invalid={!!errors.latitude}
                {...register("latitude", {
                  setValueAs: (v) =>
                    v === "" || v === null || v === undefined
                      ? undefined
                      : Number(v),
                })}
              />
            </Field>
            <Field label="Longitude" error={errors.longitude?.message}>
              <Input
                type="number"
                step="any"
                placeholder="-74.0060"
                invalid={!!errors.longitude}
                {...register("longitude", {
                  setValueAs: (v) =>
                    v === "" || v === null || v === undefined
                      ? undefined
                      : Number(v),
                })}
              />
            </Field>
          </div>
          <div>
            <FormFieldLabel>Facility Showcase (3 slots)</FormFieldLabel>
            <div
              className={`mt-3 grid grid-cols-3 gap-3 rounded-2xl transition-shadow ${errors.images ? "ring-2 ring-danger" : ""}`}
            >
              <ImageSlot slot="main" label="Main Exterior" />
              <ImageSlot slot="detailing" label="Detailing Area" />
              <ImageSlot slot="interior" label="Interior Bay" />
            </div>
            {errors.images ? (
              <p className="text-xs text-danger px-1 mt-2">{errors.images.message}</p>
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
            <div
              className={`mt-3 rounded-2xl transition-shadow ${errors.serviceTiers ? "ring-2 ring-danger" : ""}`}
            >
              <ServiceTierGrid />
            </div>
            {errors.serviceTiers ? (
              <p className="text-xs text-danger px-1 mt-2">{errors.serviceTiers.message}</p>
            ) : null}
          </div>

          <div>
            <FormFieldLabel>Settlement Account</FormFieldLabel>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Account Holder Name" error={errors.accountHolderName?.message}>
                <Input
                  placeholder="Azure Luxe Operations LLC"
                  invalid={!!errors.accountHolderName}
                  {...register("accountHolderName")}
                />
              </Field>
              <Field label="Account Number" error={errors.accountNumber?.message}>
                <Input
                  placeholder="**** **** 4492"
                  invalid={!!errors.accountNumber}
                  {...register("accountNumber")}
                />
              </Field>
              <Field label="IFSC / Swift Code" error={errors.ifscCode?.message}>
                <Input
                  placeholder="HDFC0009876"
                  invalid={!!errors.ifscCode}
                  {...register("ifscCode")}
                />
              </Field>
            </div>
          </div>
        </div>
      </FormSection>

      <div className="flex flex-col gap-4 pt-4">
        {create.isError ? (
          <div className="flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-danger" />
            <div>
              <p className="text-sm font-medium text-danger">
                {toApiError(create.error).code === "UNKNOWN"
                  ? "Something went wrong"
                  : toApiError(create.error).code.replace(/_/g, " ")}
              </p>
              <p className="mt-0.5 text-xs text-danger/80">
                {toApiError(create.error).message}
              </p>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-end gap-4">
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
      {error ? <p className="text-xs text-danger px-1">{error}</p> : null}
    </div>
  );
}
