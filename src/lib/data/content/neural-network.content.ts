import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";

export const content: AlgorithmContent = {
  summary:
    "A neural network stacks layers of simple units that each compute a weighted sum and a bend. Trained with backpropagation, the layers learn their own features, so the network can draw almost any boundary.",
  sections: [
    {
      title: "The idea",
      paragraphs: [
        "Each neuron is a tiny logistic-regression-like unit: it draws a soft line and reports which side you are on. The next layer combines those lines into corners and bands, and the layer after that combines those into blobs and spirals.",
        "Nobody tells the network which lines to draw. It starts with random weights and keeps adjusting them in whatever direction reduces its error, a bit like sculpting by many small chisel taps.",
      ],
    },
    {
      title: "How it learns",
      steps: [
        "Initialise the weights randomly.",
        "Forward pass: push every point through the layers to get class probabilities from a softmax.",
        "Measure the cross-entropy loss against the true labels.",
        "Backward pass: use the chain rule to find how much each weight contributed to the loss.",
        "Update every weight with Adam, which adapts the step size per weight. Repeat.",
      ],
    },
    {
      title: "Reading the picture",
      paragraphs: [
        "The background shows the predicted class at every point, shaded by confidence. Press play and watch it evolve from a vague tilt into a shape that wraps around the data.",
        "The stats track epoch, loss, accuracy and the number of parameters. A falling loss with a frozen boundary means the network is just becoming more confident about what it already knows.",
      ],
    },
  ],
  tryThis: [
    "On **Moons** with the defaults, press play. The boundary curves around both moons within a few hundred epochs.",
    "Load **Spiral**, set Hidden layers to 3 and Neurons per layer to 16. Spirals need depth; compare with 1 layer of 4 neurons.",
    "Switch Activation to ReLU. Boundaries become piecewise straight, with visible corners, instead of smooth tanh curves.",
    "Set Weight decay (λ) high on a noisy **Moons**. The boundary stays smoother and refuses to chase individual points.",
  ],
  maths: [
    { label: "Layer", formula: "h⁽ˡ⁾ = g(W⁽ˡ⁾ h⁽ˡ⁻¹⁾ + b⁽ˡ⁾)" },
    { label: "Activations", formula: "tanh(z),   ReLU(z) = max(0, z),   σ(z) = 1 / (1 + e⁻ᶻ)" },
    { label: "Output", formula: "P(y = k | x) = softmax(W⁽ᴸ⁾ h⁽ᴸ⁻¹⁾ + b⁽ᴸ⁾)ₖ" },
    { label: "Loss", formula: "L = −(1/n) Σᵢ log P(yᵢ | xᵢ) + (λ/2) Σ ‖W‖²" },
    { label: "Adam", formula: "m ← β₁m + (1−β₁)g,  v ← β₂v + (1−β₂)g²,  θ ← θ − η m̂ / (√v̂ + ε)" },
  ],
  strengths: [
    "Can learn almost any boundary given enough units.",
    "Learns its own features instead of needing hand-made ones.",
    "Scales to images, audio and text.",
  ],
  weaknesses: [
    "Many hyperparameters and random starts to manage.",
    "Hard to interpret what each weight means.",
    "Overfits small datasets without regularisation.",
  ],
};
