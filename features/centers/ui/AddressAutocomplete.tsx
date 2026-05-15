"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type Suggestion = {
  placeId: string;
  primaryText: string;
  secondaryText: string;
};

type SelectedPlace = {
  address: string;
  latitude: number;
  longitude: number;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: SelectedPlace) => void;
  invalid?: boolean;
  placeholder?: string;
  rows?: number;
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  invalid,
  placeholder,
  rows = 3,
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionToken] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skipNextFetch = useRef(false);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    if (!API_KEY) return;
    if (!value || value.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": API_KEY,
            },
            body: JSON.stringify({
              input: value,
              sessionToken,
              includedRegionCodes: ["in"],
            }),
          },
        );
        const json = await res.json();
        const parsed: Suggestion[] = (json.suggestions ?? [])
          .map((s: { placePrediction?: { placeId: string; structuredFormat?: { mainText?: { text: string }; secondaryText?: { text: string } } } }) => {
            const p = s.placePrediction;
            if (!p) return null;
            return {
              placeId: p.placeId,
              primaryText: p.structuredFormat?.mainText?.text ?? "",
              secondaryText: p.structuredFormat?.secondaryText?.text ?? "",
            };
          })
          .filter(Boolean) as Suggestion[];
        setSuggestions(parsed);
        setOpen(parsed.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, sessionToken]);

  async function pick(s: Suggestion) {
    if (!API_KEY) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${s.placeId}?sessionToken=${sessionToken}`,
        {
          headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "formattedAddress,location",
          },
        },
      );
      const json = await res.json();
      const address: string = json.formattedAddress ?? `${s.primaryText}, ${s.secondaryText}`;
      const lat: number | undefined = json.location?.latitude;
      const lng: number | undefined = json.location?.longitude;
      if (typeof lat !== "number" || typeof lng !== "number") return;
      skipNextFetch.current = true;
      onChange(address);
      onSelect({ address, latitude: lat, longitude: lng });
      setOpen(false);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <MapPin
          size={16}
          className="absolute left-4 top-5 text-text-muted pointer-events-none"
        />
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-2xl bg-border py-4 pl-12 pr-10 text-base text-navy-900 placeholder:text-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none",
            invalid && "ring-2 ring-danger",
          )}
        />
        {loading ? (
          <Loader2
            size={16}
            className="absolute right-4 top-5 text-text-muted animate-spin"
          />
        ) : null}
      </div>
      {open && suggestions.length > 0 ? (
        <ul className="absolute z-20 mt-2 w-full rounded-2xl bg-white shadow-lg border border-border max-h-72 overflow-auto">
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                onClick={() => pick(s)}
                className="w-full text-left px-4 py-3 hover:bg-teal-50 flex items-start gap-3"
              >
                <MapPin
                  size={14}
                  className="mt-1 text-teal-700 flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-navy-900">
                    {s.primaryText}
                  </span>
                  <span className="text-xs text-text-muted">
                    {s.secondaryText}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {!API_KEY ? (
        <p className="text-xs text-danger px-2 mt-1">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set
        </p>
      ) : null}
    </div>
  );
}
