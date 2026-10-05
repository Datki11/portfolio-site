export type Point3D = { x: number; y: number; z: number };
export type OrbitView = { pitch: number; yaw: number; spread: number };
export const restingView: OrbitView = { pitch: -0.25, yaw: -0.35, spread: 1 };
export function orbitPoint(angle: number, ring: number): Point3D {
  const radius = 103 + ring * 19;
  const tilt = [-0.6, 0.65, 1.4][ring];
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * Math.cos(tilt),
    z: Math.sin(angle) * radius * Math.sin(tilt),
  };
}
export function project(point: Point3D, view: OrbitView) {
  const x = point.x * Math.cos(view.yaw) + point.z * Math.sin(view.yaw);
  const z = -point.x * Math.sin(view.yaw) + point.z * Math.cos(view.yaw);
  const y = point.y * Math.cos(view.pitch) - z * Math.sin(view.pitch);
  const depth = point.y * Math.sin(view.pitch) + z * Math.cos(view.pitch);
  const scale = 420 / (420 - depth * view.spread);
  return {
    x: 220 + x * view.spread * scale,
    y: 190 + y * view.spread * scale,
    scale,
    depth,
  };
}
export function orbitPath(ring: number, view: OrbitView) {
  return (
    Array.from({ length: 97 }, (_, i) => {
      const p = project(orbitPoint((i / 96) * Math.PI * 2, ring), view);
      return `${i ? "L" : "M"}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    }).join(" ") + "Z"
  );
}
export const nodeAngles = [3.8, 0.05, 2.0];
