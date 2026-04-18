import { createNoise3D } from "simplex-noise";

// Create a single instance of 3D noise generator
const noise3D = createNoise3D();

export const simplex = {
  noise3D: (x: number, y: number, z: number) => {
    // Map output from [-1, 1] to [0, 1] if needed, or return raw
    // The spec expects raw [-1, 1] for the noise check
    return noise3D(x, y, z);
  }
};
