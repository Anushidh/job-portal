import 'reflect-metadata';

export function Injectable() {
  return function (constructor: any) {
    return constructor;
  };
}

export class DIContainer {
  private dependencies = new Map<string, any>();

  register(key: string, dependency: any) {
    this.dependencies.set(key, dependency);
  }

  resolve<T>(constructor: new (...args: any[]) => T): T {
    // Get the constructor's parameter types
    const paramTypes = Reflect.getMetadata('design:paramtypes', constructor) || [];
    
    // Resolve dependencies
    const resolvedParams = paramTypes.map((paramType: any) => {
      // Check if we have a registered dependency for this type
      const matchingDependency = Array.from(this.dependencies.values()).find(
        dep => dep instanceof paramType
      );
      
      if (matchingDependency) return matchingDependency;
      
      // If no matching dependency, try to create a new instance
      try {
        return new paramType();
      } catch (error) {
        console.error(`Could not resolve dependency for ${paramType.name}`, error);
        throw new Error(`Dependency not found for ${paramType.name}`);
      }
    });

    // Create and return an instance of the constructor with resolved dependencies
    return new constructor(...resolvedParams);
  }
}

export const diContainer = new DIContainer();