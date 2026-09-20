import { describe, expect, it } from "vitest";

import { FILLED_DASHBOARD_SOURCE, PAUSED_DASHBOARD_SOURCE } from "../fixtures";
import { dashboardReadModelSchema, toDashboardReadModel } from "./dashboard";

describe("toDashboardReadModel", () => {
  it("derives portfolio status from lifecycle and current stage", () => {
    const model = toDashboardReadModel(FILLED_DASHBOARD_SOURCE);

    expect(dashboardReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.portfolio[0]).toMatchObject({
      lifecycle: "active",
      currentStage: "draft-generation",
      statusLabel: "Running draft generation",
      statusTone: "active",
    });
    expect(model.portfolio[1]).toMatchObject({
      lifecycle: "draft",
      currentStage: null,
      statusLabel: "Draft not initialized",
      statusTone: "neutral",
    });
  });

  it("emits the six canonical funnel stages in order", () => {
    const model = toDashboardReadModel(FILLED_DASHBOARD_SOURCE);

    expect(model.funnel.map((stage) => stage.key)).toEqual([
      "discovery",
      "website-matching",
      "public-scrape",
      "fact-extraction",
      "draft-generation",
      "human-review",
    ]);
    expect(model.funnel.at(-1)).toEqual({
      key: "human-review",
      label: "Human review",
      count: 14,
    });
  });

  it("converts velocity counts into a per-hour rate over the source window", () => {
    const model = toDashboardReadModel(FILLED_DASHBOARD_SOURCE);

    expect(model.velocity[0]).toEqual({
      key: "discovered",
      label: "Discovered",
      value: 16,
      unit: "per-hour",
    });
    expect(model.velocity.at(-1)).toEqual({
      key: "replied",
      label: "Replied",
      value: 0.5,
      unit: "per-hour",
    });
  });

  it("raises audit alerts only for findings with an observed count", () => {
    const model = toDashboardReadModel(FILLED_DASHBOARD_SOURCE);

    expect(model.auditAlerts.map((alert) => alert.code)).toEqual([
      "missing-citation",
      "thin-record",
    ]);
    expect(model.auditAlerts[0]).toMatchObject({
      severity: "warning",
      message: "2 drafts cite no retained evidence.",
    });
    expect(model.auditAlerts[1].message).toBe(
      "1 listing holds only a business name and city.",
    );
  });

  it("keeps a paused campaign and its empty telemetry renderable", () => {
    const model = toDashboardReadModel(PAUSED_DASHBOARD_SOURCE);

    expect(dashboardReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.portfolio[0]).toMatchObject({
      statusLabel: "Paused during human review",
      statusTone: "warning",
    });
    expect(model.funnel.every((stage) => stage.count === 0)).toBe(true);
    expect(model.velocity.every((metric) => metric.unit === "count")).toBe(
      true,
    );
    expect(model.auditAlerts).toEqual([]);
  });
});
