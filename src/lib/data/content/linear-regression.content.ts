import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "Linear regression draws the line (or curve) that sits as close as possible to your points, measured by squared vertical distance. Raise the polynomial degree and the same method can fit bends and wiggles.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Imagine every point is tied to the line with a little vertical spring. Long springs pull much harder than short ones, because the pull grows with the square of the stretch. The line settles where the total tension is as small as possible.",
        "A polynomial fit is the same trick with extra ingredients. Instead of only x, the model may use x², x³ and so on, so the curve can bend. The maths does not change: it is still a weighted sum, just of more features.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Turn each x into a row of features: 1, x, x², up to the chosen degree.",
        "Measure the error as the mean of squared residuals, the vertical gaps between points and curve.",
        "Optionally add a ridge penalty that charges for large weights (the intercept is never penalised).",
        "Solve the resulting linear equations directly. There is no training loop: the best weights come out in one step.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The coloured curve is the fitted model. With Show residuals on, each point gets a thin segment to the curve: those are the errors the model is trying to shrink, and the MSE in the stats is their average squared length.",
        "R² tells you how much better the fit is than a flat line at the mean y. For degree 3 or below the stats also print the fitted equation, so you can read the slope and intercept directly.",
      ],
    },
  ],
  tryThis: [
    "On **Line**, leave Polynomial degree at 1 and drag a single point far up. Watch the whole line tilt towards it: squared error makes one outlier very loud.",
    "Switch to **Curve** and step Polynomial degree from 1 to 2. R² should jump, because the data really is a parabola.",
    "Pick **Wave**, lower the point count, and push Polynomial degree to 12. The curve threads every point and swings wildly between them. Now raise Ridge penalty (λ) and watch it calm down.",
    "Try **Outliers** with degree 1 and compare the fit with and without the stray points (shift-click to erase them).",
  ],
  maths: [
    { label: "Model", formula: "ŷ = w₀ + w₁x + w₂x² + … + w_d xᵈ" },
    { label: "Loss", formula: "L(w) = (1/n) Σᵢ (yᵢ − ŷᵢ)² + λ Σⱼ₌₁ᵈ wⱼ²" },
    { label: "Closed form", formula: "w = (XᵀX + nλI′)⁻¹ Xᵀy   (I′ skips the intercept)" },
    { label: "Residual", formula: "rᵢ = yᵢ − ŷᵢ" },
    { label: "R²", formula: "R² = 1 − Σ rᵢ² / Σ (yᵢ − ȳ)²" },
  ],
  strengths: [
    "Fast, exact and easy to interpret.",
    "Coefficients tell you how y changes with x.",
    "Polynomial features add flexibility without new maths.",
  ],
  weaknesses: [
    "Squared error lets outliers drag the fit around.",
    "High degrees overfit and explode at the edges.",
    "You must choose the shape (degree) up front.",
  ],
};
