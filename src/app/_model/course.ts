export interface Course {
  id: string;
  moduleCoef: { [moduleName: string]: number }; // Map of module name to coefficient
}