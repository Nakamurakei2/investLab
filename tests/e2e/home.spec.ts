import { expect, test } from "@playwright/test";

test("home page shows the InvestLab environment", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "投資シミュレーション環境" })).toBeVisible();
});
