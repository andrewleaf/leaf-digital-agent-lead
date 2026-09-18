import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DiscoveryYieldCardProps = {
  estimateLabel: string | null;
  confidence: number | null;
  className?: string;
};

function ringColor(confidence: number | null) {
  if (confidence === null) {
    return "#94A3B8";
  }
  return confidence >= 80 ? "#059669" : "#D97706";
}

function ConfidenceRing({ confidence }: { confidence: number | null }) {
  const size = 56;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const known = confidence !== null;
  const clamped = known ? Math.min(100, Math.max(0, confidence)) : 0;
  const offset = circumference - (clamped / 100) * circumference;
  const color = ringColor(confidence);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth={stroke}
      />
      {known ? (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ) : null}
    </svg>
  );
}

export function DiscoveryYieldCard({
  estimateLabel,
  confidence,
  className,
}: DiscoveryYieldCardProps) {
  const confidenceCopy =
    confidence === null ? "Unknown" : `${Math.round(confidence)}%`;

  return (
    <Card
      className={cn(
        "gap-3 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="px-3 pt-3 pb-0">
        <CardTitle className="text-[15px] leading-5 font-semibold tracking-normal text-[#0F172A]">
          Estimated Discovery Yield:
          {estimateLabel ? (
            <span className="font-normal text-[#475569]"> {estimateLabel}</span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3 px-3 pb-3">
        <ConfidenceRing confidence={confidence} />
        <p className="text-[13px] leading-[18px] text-[#0F172A]">
          <span className="font-medium">Confidence:</span>{" "}
          <span className="text-[#475569]">{confidenceCopy}</span>
        </p>
      </CardContent>
    </Card>
  );
}
