import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { type AppAbility } from '../permissions/ability';

interface AbilityContextType {
    ability: AppAbility;
}

const AbilityContext = createContext<AbilityContextType | undefined>(undefined);

interface AbilityProviderProps {
    children: ReactNode;
    ability: AppAbility;
}

export function AbilityProvider({ children, ability }: AbilityProviderProps) {
    return (
        <AbilityContext.Provider value={{ ability }}>
            {children}
        </AbilityContext.Provider>
    );
}

export function useAbility() {
    const context = useContext(AbilityContext);
    if (context === undefined) {
        throw new Error('useAbility must be used within an AbilityProvider');
    }
    return context.ability;
} 