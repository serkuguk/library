export function LogMethod() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`[LOG] Call ${propertyKey} with arguments:`, args);
            const result = originalMethod.apply(this, args);
            console.log(`[LOG] ${propertyKey} returned:`, result);
            return result;
        };

        return descriptor;
    };
}
